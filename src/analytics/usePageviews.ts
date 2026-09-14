import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ymHit } from './ym';

/**
 * usePageviews
 *
 * Ручная отправка pageview на каждое изменение pathname+search. Ручная —
 * потому что init в index.html идёт с defer:true (обязательно для SPA:
 * без него Метрика уже отправила бы автоматический просмотр на загрузке,
 * и он задвоился бы с этим первым ручным hit).
 *
 * Для первого hit referer — внешний источник перехода
 * (window.__ymInitialReferrer, снятый в index.html до инициализации
 * счётчика), для всех следующих — предыдущий URL в приложении.
 *
 * document.title к моменту этого эффекта уже корректен: usePageviews
 * вызывается в RootLayout, который является родителем CasePage/HomePage —
 * React всегда вызывает эффекты дочерних компонентов раньше родительских
 * в одном коммите, поэтому эффект CasePage, выставляющий свой title,
 * гарантированно отрабатывает до этого эффекта (и на монтировании, и при
 * переходах). Явно прокидывать title через конфиг роута не требуется.
 *
 * lastProcessedKeyRef защищает от двойной отправки в React.StrictMode
 * (dev-режим синхронно вызывает эффект: effect → cleanup → effect ещё раз
 * с теми же зависимостями при монтировании). Сравнение — только с
 * непосредственно предыдущим ключом, поэтому настоящий повторный заход на
 * тот же URL позже (после других переходов) не блокируется.
 */
export function usePageviews(): void {
  const { pathname, search } = useLocation();
  const prevHrefRef = useRef<string | null>(null);
  const isFirstHitRef = useRef(true);
  const lastProcessedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const key = `${pathname}${search}`;

    if (lastProcessedKeyRef.current === key) {
      // StrictMode дважды вызвал этот же эффект с теми же зависимостями —
      // hit уже отправлен первым вызовом, второй раз этого не делаем.
      // Обнуляем ключ, чтобы не заблокировать настоящий будущий заход
      // на этот же путь.
      lastProcessedKeyRef.current = null;
      return;
    }

    lastProcessedKeyRef.current = key;

    const currentHref = window.location.href;
    const referer = isFirstHitRef.current
      ? window.__ymInitialReferrer ?? ''
      : prevHrefRef.current ?? '';

    ymHit(currentHref, { title: document.title, referer });

    isFirstHitRef.current = false;
    prevHrefRef.current = currentHref;
  }, [pathname, search]);
}
