import React from 'react';
import styles from './Header.module.scss';
import { Button } from '../../atoms/Button/Button';

interface HeaderProps {
  /**
   * Logo/branding element
   */
  logo?: React.ReactNode;

  /**
   * First navigation button text
   */
  button1Text?: string;

  /**
   * Second navigation button text
   */
  button2Text?: string;

  /**
   * Third navigation button text (hidden by default)
   */
  button3Text?: string;

  /**
   * Show third button
   */
  showButton3?: boolean;

  /**
   * Fourth navigation button text (hidden by default)
   */
  button4Text?: string;

  /**
   * Show fourth button
   */
  showButton4?: boolean;

  /**
   * CTA button text (filled variant)
   */
  ctaText?: string;

  /**
   * CTA button click handler
   */
  onCtaClick?: () => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Header Component
 *
 * Global header with logo, navigation links, and CTA button.
 * Dimensions: 1216px × 48px (fixed)
 *
 * Structure:
 * - Logo container (left side, flexible)
 * - Navigation container (right side)
 *   - Up to 4 link buttons (text-only)
 *   - 1 CTA button (filled)
 */
export const Header: React.FC<HeaderProps> = ({
  logo,
  button1Text = 'Телеграмм',
  button2Text = 'Прочие контакты',
  button3Text = 'Label',
  showButton3 = false,
  button4Text = 'Label',
  showButton4 = false,
  ctaText = 'Резюме',
  onCtaClick,
  className,
}) => {
  return (
    <header className={`${styles.header} ${className || ''}`.trim()}>
      {/* Logo Container */}
      <div className={styles.logoContainer}>
        {logo}
      </div>

      {/* Navigation Container */}
      <div className={styles.navContainer}>
        <Button type="link" text={button1Text} />
        <Button type="link" text={button2Text} />

        {showButton3 && <Button type="link" text={button3Text} />}
        {showButton4 && <Button type="link" text={button4Text} />}

        <Button
          type="filled"
          text={ctaText}
          onClick={onCtaClick}
        />
      </div>
    </header>
  );
};

export type { HeaderProps };
