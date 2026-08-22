import React from 'react';

/**
 * ArrowDownRight
 *
 * Иконка CTA из Figma: залитый круг + диагональная стрелка вниз-вправо.
 * Источник: инстанс I33291:4236;228:624 (семейство Arrow / Arrow_Left_M,
 * 48×48) внутри кнопки «Смотреть кейсы» канваса «Главная» 33291:4230.
 *
 * DS-chrome иконка — живёт React-компонентом в Design System
 * (docs/figma-workflow.md, «Content icons vs DS-chrome»), как Logo.
 *
 * Перекраска через CSS-переменные (наследование от цвета кнопки):
 * - --arrow-circle-color: заливка круга (по умолчанию currentColor —
 *   следует цвету текста кнопки: белый на тёмном hero, тёмный на hover);
 * - --arrow-glyph-color: цвет стрелки (должен контрастировать с кругом;
 *   задаётся вызывающей стороной для обычного и hover-состояния).
 */
export const ArrowDownRight: React.FC = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="24"
      cy="24"
      r="24"
      fill="var(--arrow-circle-color, currentColor)"
    />
    <path
      d="M19.0503 19.0503L28.9498 28.9498"
      stroke="var(--arrow-glyph-color)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.9497 20.4645V28.9498L20.4644 28.9498"
      stroke="var(--arrow-glyph-color)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
