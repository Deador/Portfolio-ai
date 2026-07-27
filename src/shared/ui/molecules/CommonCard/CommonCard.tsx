import React, { ReactNode } from 'react';
import styles from './CommonCard.module.scss';
import { WarningIcon } from './icons/WarningIcon';

type CommonCardVariant = 'insight' | 'risk' | 'callout' | 'lesson' | 'number';

interface CommonCardProps {
  /**
   * Card variant determines styling and layout
   */
  variant: CommonCardVariant;

  /**
   * Main content - accepts string or ReactNode for rich formatting
   */
  title: string | ReactNode;

  /**
   * Secondary content - optional, not used for number variant
   */
  description?: string | ReactNode;

  /**
   * Badge number for number variant - ignored for other variants
   */
  number?: string | number;

  /**
   * Additional CSS classes for override
   */
  className?: string;
}

/**
 * CommonCard Component
 *
 * Versatile card component with 5 variants for different content types:
 * - insight: Simple white card for key findings
 * - risk: White card with warning icon for risks/alerts
 * - callout: White card with left border accent for important notes
 * - lesson: Dark card for numbered lessons/steps
 * - number: White card with absolute-positioned number badge
 *
 * All styling uses design tokens exclusively. No hardcoded values.
 */
export const CommonCard: React.FC<CommonCardProps> = ({
  variant,
  title,
  description,
  number,
  className,
}) => {
  const cardClasses = `${styles.card} ${styles[variant]} ${className || ''}`.trim();

  return (
    <article className={cardClasses}>
      {variant === 'risk' && (
        <div className={styles.riskIcon}>
          <WarningIcon />
        </div>
      )}

      {variant === 'number' && (
        <div className={styles.numberBadge}>
          <span className={styles.numberBadgeText}>{number}</span>
        </div>
      )}

      <div className={styles.content}>
        {variant === 'lesson' && number !== undefined && (
          <span className={styles.lessonNumber}>
            {String(number).padStart(2, '0')}
          </span>
        )}

        <h2 className={styles.title}>{title}</h2>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {variant === 'callout' && (
          <p className={styles.description}>Text</p>
        )}
      </div>
    </article>
  );
};

export type { CommonCardProps };
