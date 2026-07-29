import React, { ReactNode } from 'react';
import styles from './Citate.module.scss';

interface CitateProps {
  /**
   * Citation text content
   */
  text?: string | ReactNode;

  /**
   * Source or attribution
   */
  source?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Citate Component
 *
 * Semantic citation block for quoting external sources.
 * Used for testimonials, references, and attributed quotes.
 */
export const Citate: React.FC<CitateProps> = ({
  text = 'Text',
  source,
  className,
}) => {
  return (
    <cite className={`${styles.citate} ${className || ''}`.trim()}>
      <p className={styles.citateText}>{text}</p>
      {source && <p className={styles.citateSource}>— {source}</p>}
    </cite>
  );
};

export type { CitateProps };
