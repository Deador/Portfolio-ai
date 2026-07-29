import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonType = 'link' | 'filled';

interface ButtonProps {
  /**
   * Button variant: 'link' for text-only, 'filled' for dark background
   */
  type?: ButtonType;

  /**
   * Button text content
   */
  text?: string | ReactNode;

  /**
   * HTML button element type attribute
   */
  htmlType?: 'button' | 'submit' | 'reset';

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Button Component
 *
 * Semantic button with two variants:
 * - link: Text-only button (Text/M, primary color)
 * - filled: Dark button with background (Text/S, white text)
 *
 * All styling uses design tokens exclusively.
 */
export const Button: React.FC<ButtonProps> = ({
  type = 'link',
  text = 'Label',
  htmlType = 'button',
  onClick,
  className,
}) => {
  const buttonClasses = `${styles.button} ${styles[type]} ${className || ''}`.trim();

  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={buttonClasses}
    >
      {text}
    </button>
  );
};

export type { ButtonProps };
