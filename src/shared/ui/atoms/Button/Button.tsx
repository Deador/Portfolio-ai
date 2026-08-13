import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonType = 'link' | 'filled' | 'outline';

type ButtonShape = 'rounded' | 'pill';

interface ButtonProps {
  /**
   * Button variant: 'link' for text-only, 'filled' for dark background,
   * 'outline' for bordered transparent button
   */
  type?: ButtonType;

  /**
   * Shape: 'rounded' (default, radius 8) or 'pill' (full radius)
   */
  shape?: ButtonShape;

  /**
   * Inverted theme: light text/border for use on dark backgrounds
   */
  inverted?: boolean;

  /**
   * Button text content
   */
  text?: string | ReactNode;

  /**
   * Optional trailing icon (e.g. round arrow in the hero CTA)
   */
  icon?: ReactNode;

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
 * Semantic button with three variants:
 * - link: Text-only button (Text/M, primary color)
 * - filled: Dark button with background (Text/S, white text)
 * - outline: Transparent button with 1px border (Text/S, primary color)
 *
 * `shape="pill"` switches to a full-radius pill (hero CTA).
 * `icon` renders a trailing element after the text (e.g. round arrow).
 * `inverted` switches the palette to light colors for dark surfaces.
 * All styling uses design tokens exclusively.
 */
export const Button: React.FC<ButtonProps> = ({
  type = 'link',
  shape = 'rounded',
  inverted = false,
  text = 'Label',
  icon,
  htmlType = 'button',
  onClick,
  className,
}) => {
  const buttonClasses = [
    styles.button,
    styles[type],
    shape === 'pill' ? styles.pill : '',
    inverted ? styles.inverted : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type={htmlType}
      onClick={onClick}
      className={buttonClasses}
    >
      {text}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export type { ButtonProps };