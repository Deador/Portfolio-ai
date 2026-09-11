import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 *
 * SPA-навигация не сбрасывает позицию окна сама: при переходе
 * «проскролленная главная → кейс» страница кейса открывалась бы
 * с той же высоты. Компонент сбрасывает скролл при смене pathname.
 *
 * behavior: 'instant' перекрывает глобальный CSS scroll-behavior: smooth
 * (_global.scss) — иначе переход между маршрутами анимировался бы.
 *
 * history.scrollRestoration переводится в 'manual': без этого браузер сам
 * восстанавливает сохранённую позицию скролла при переходе назад/вперёд
 * (например, вернуться на «/» с той же прокруткой, что была у блока
 * «Кейсы») — это восстановление срабатывает отдельно от React и позже
 * эффекта ниже, из-за чего перебивает наш scrollTo(0,0) при нажатии «Назад».
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};
