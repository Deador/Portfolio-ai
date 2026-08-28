import React from 'react';
import styles from './Header.module.scss';
import { Button } from '../../atoms/Button/Button';

type HeaderTheme = 'default' | 'inverted';

interface HeaderProps {
  /**
   * Header theme: 'default' for light surfaces, 'inverted' for dark hero
   */
  theme?: HeaderTheme;

  /**
   * Logo/branding element
   */
  logo?: React.ReactNode;

  /**
   * First navigation button text
   */
  button1Text?: string;

  /**
   * First navigation button link (renders it as `<a>` when set)
   */
  button1Href?: string;

  /**
   * First navigation button anchor target, e.g. '_blank' to open in a new tab
   */
  button1Target?: string;

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
   * CTA link target (renders CTA as `<a>` instead of `<button>` when set)
   */
  ctaHref?: string;

  /**
   * CTA anchor target, e.g. '_blank' to open in a new tab
   */
  ctaTarget?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Header Component
 *
 * Global header with logo, navigation links, and CTA button.
 * Dimensions: max-width = layout/content-max, height 48px (desktop)
 *
 * Structure:
 * - Logo container (left side, flexible)
 * - Navigation container (right side)
 *   - Up to 4 link buttons (text-only)
 *   - 1 CTA button (filled)
 *
 * `theme="inverted"` switches navigation + CTA to a light palette
 * for use over dark sections (e.g. the Home hero).
 */
export const Header: React.FC<HeaderProps> = ({
  theme = 'default',
  logo,
  button1Text = 'Телеграмм',
  button1Href,
  button1Target,
  button2Text = 'Прочие контакты',
  button3Text = 'Label',
  showButton3 = false,
  button4Text = 'Label',
  showButton4 = false,
  ctaText = 'Резюме',
  onCtaClick,
  ctaHref,
  ctaTarget,
  className,
}) => {
  const inverted = theme === 'inverted';

  return (
    <header className={`${styles.header} ${styles[theme]} ${className || ''}`.trim()}>
      {/* Logo Container */}
      <div className={styles.logoContainer}>
        {logo}
      </div>

      {/* Navigation Container */}
      <div className={styles.navContainer}>
        <Button
          type="link"
          inverted={inverted}
          text={button1Text}
          href={button1Href}
          target={button1Target}
        />
        <Button type="link" inverted={inverted} text={button2Text} />

        {showButton3 && <Button type="link" inverted={inverted} text={button3Text} />}
        {showButton4 && <Button type="link" inverted={inverted} text={button4Text} />}

        <Button
          type="filled"
          inverted={inverted}
          text={ctaText}
          onClick={onCtaClick}
          href={ctaHref}
          target={ctaTarget}
        />
      </div>
    </header>
  );
};

export type { HeaderProps };
