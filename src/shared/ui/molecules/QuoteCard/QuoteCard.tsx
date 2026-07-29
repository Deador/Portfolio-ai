import React, { ReactNode } from 'react';
import styles from './QuoteCard.module.scss';

interface QuoteCardProps {
  /**
   * Left side quote section content
   */
  leftName?: string;
  leftQuote?: string | ReactNode;

  /**
   * Right side quote section content
   */
  rightName?: string;
  rightQuote?: string | ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * QuoteCard Component
 *
 * Dark card displaying two featured quotes side by side.
 * Typically used for testimonials or case study highlights.
 * Dimensions: 1216px × 284px (fixed)
 */
export const QuoteCard: React.FC<QuoteCardProps> = ({
  leftName = 'Name',
  leftQuote = 'Text',
  rightName = 'Name',
  rightQuote = 'Text',
  className,
}) => {
  return (
    <section className={`${styles.quoteCard} ${className || ''}`.trim()}>
      <div className={styles.quoteGrid}>
        {/* Left Quote */}
        <div className={styles.quoteBlock}>
          <div className={styles.author}>
            <span className={styles.authorName}>{leftName}</span>
          </div>
          <div className={styles.quoteBox}>
            <p className={styles.quoteText}>{leftQuote}</p>
          </div>
        </div>

        {/* Center Icon */}
        <div className={styles.centerIcon}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="28" cy="28" r="28" fill="white" fillOpacity="0.1" />
            <path
              d="M28 14C20.268 14 14 20.268 14 28s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path d="M28 24v8M24 28h8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Right Quote */}
        <div className={styles.quoteBlock}>
          <div className={styles.author}>
            <span className={styles.authorName}>{rightName}</span>
          </div>
          <div className={styles.quoteBox}>
            <p className={styles.quoteText}>{rightQuote}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export type { QuoteCardProps };
