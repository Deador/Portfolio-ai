import React from 'react';
import styles from './HomeScrollTopButton.module.scss';
import { ArrowUp } from '../../../../../shared/assets/ArrowUp/ArrowUp';

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
      <ArrowUp />
      <span className={styles.label}>{label}</span>
    </button>
  );
};