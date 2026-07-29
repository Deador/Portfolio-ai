import React, { ReactNode } from 'react';
import styles from './QuoteElement.module.scss';

interface QuoteElementProps {
  /**
   * Author/source name
   */
  name?: string;

  /**
   * Quote text content
   */
  quote?: string | ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Quote Element Component
 *
 * Semantic quote block with author attribution.
 * Used in testimonials, case studies, and featured quotes.
 */
export const QuoteElement: React.FC<QuoteElementProps> = ({
  name = 'Name',
  quote = 'Text',
  className,
}) => {
  return (
    <blockquote className={`${styles.quoteElement} ${className || ''}`.trim()}>
      <div className={styles.author}>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.quoteBox}>
        <p className={styles.quoteText}>{quote}</p>
      </div>
    </blockquote>
  );
};

export type { QuoteElementProps };
