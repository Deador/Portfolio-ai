import React from 'react';

/**
 * ArrowUp
 *
 * Стрелка вверх 32×32 из Figma: инстанс I33291:4380;228:653
 * (семейство Arrow / Arrow_Left_M) внутри кнопки «Наверх» канваса
 * «Главная» 33291:4230. Древко + наконечник, штрих 2, скруглённые концы.
 *
 * DS-chrome иконка — живёт React-компонентом в Design System
 * (docs/figma-workflow.md, «Content icons vs DS-chrome»).
 * Цвет наследуется через currentColor от родителя.
 */
export const ArrowUp: React.FC = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M16 25.3335L16 6.66683"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14.6667L16 6.66675L24 14.6667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
