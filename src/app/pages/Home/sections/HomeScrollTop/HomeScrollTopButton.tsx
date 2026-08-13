import React from 'react';
import styles from './HomeScrollTopButton.module.scss';

interface HomeScrollTopButtonProps {
  /**
   * Visible label under the arrow
   */
  label?: string;

  /**
   * Scroll handler
   */
  onScrollTop?: () => void;
}

/**
 * HomeScrollTopButton
 *
 * Круглая кнопка «Наверх» (страничный компонент Home,
 * круглая по Figma; не является DS Button).
 */
export const HomeScrollTopButton: React.FC<HomeScrollTopButtonProps> = ({
  label = 'Наверх',
  onScrollTop,
}) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onScrollTop}
      aria-label={label}
    >
      <svg
        className={styles.arrow}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 22.5L16 10.5L28 22.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.label}>{label}</span>
    </button>
  );
};