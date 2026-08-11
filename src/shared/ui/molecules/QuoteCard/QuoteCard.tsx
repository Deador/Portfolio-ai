import React, { ReactNode } from 'react';
import styles from './QuoteCard.module.scss';
import { MessageQuestionIcon } from './icons/MessageQuestionIcon';
import { QuoteElement } from '../../atoms/QuoteElement/QuoteElement';

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
        <QuoteElement name={leftName} quote={leftQuote} align="start" />

        {/* Center Icon */}
        <div className={styles.centerIcon}>
          <MessageQuestionIcon />
        </div>

        <QuoteElement name={rightName} quote={rightQuote} align="end" />
      </div>
    </section>
  );
};

export type { QuoteCardProps };
