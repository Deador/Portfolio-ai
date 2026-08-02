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
   * Avatar shown above the citation card
   */
  avatar?: ReactNode;

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
  avatar,
  className,
}) => {
  return (
    <cite className={`${styles.citate} ${className || ''}`.trim()}>
      <div className={styles.avatar}>
        {avatar ?? <span className={styles.avatarPlaceholder} aria-hidden="true" />}
      </div>
      {source && <p className={styles.name}>{source}</p>}
      <p className={styles.citateText}>{text}</p>
    </cite>
  );
};

export type { CitateProps };
