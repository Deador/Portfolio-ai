import React, { ReactNode } from 'react';
import styles from './QuoteElement.module.scss';
import { UserIcon } from './icons/UserIcon';

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
   * Author block alignment: 'start' (left) or 'end' (right)
   */
  align?: 'start' | 'end';

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
  align = 'start',
  className,
}) => {
  return (
    <blockquote className={`${styles.quoteElement} ${className || ''}`.trim()}>
      <div className={`${styles.author} ${styles[align]}`}>
        <UserIcon />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.quoteBox}>
        <p className={styles.quoteText}>{quote}</p>
      </div>
    </blockquote>
  );
};

export type { QuoteElementProps };
