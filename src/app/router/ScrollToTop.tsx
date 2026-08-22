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
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};
