import React, { ReactNode } from 'react';
import styles from './MetricCard.module.scss';

type MetricCardType = 'short' | 'long';

interface MetricCardProps {
  /**
   * Card variant: 'short' for compact, 'long' for expanded
   */
  type?: MetricCardType;

  /**
   * Badge number shown in the numbered icon
   */
  number?: string | number;

  /**
   * Main title/metric value
   */
  title?: string | ReactNode;

  /**
   * Secondary description text
   */
  description?: string | ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * MetricCard Component
 *
 * Displays key metrics or statistics with two layout variants:
 * - short: Compact card with numbered icon (292px × 340px)
 * - long: Expanded card with gray background (600px × auto)
 *
 * All styling uses design tokens exclusively.
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  type = 'short',
  number = 1,
  title = 'Title',
  description = 'Description',
  className,
}) => {
  const isShort = type === 'short';
  const isLong = type === 'long';

  const cardClasses = `${styles.card} ${styles[type]} ${className || ''}`.trim();

  return (
    <div className={cardClasses}>
      <div className={styles.badge}>
        <span className={styles.badgeText}>{number}</span>
      </div>

      {isShort && (
        <>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </>
      )}

      {isLong && (
        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </div>
  );
};

export type { MetricCardProps };
