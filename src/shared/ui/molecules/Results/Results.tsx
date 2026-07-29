import React, { ReactNode } from 'react';
import styles from './Results.module.scss';

type ResultsSize = 'L' | 'M';

interface ResultsProps {
  /**
   * Results block size: 'L' for large, 'M' for medium
   */
  size?: ResultsSize;

  /**
   * Main heading/title
   */
  title?: string | ReactNode;

  /**
   * Description or content
   */
  description?: string | ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Results Component
 *
 * Component for displaying key results or outcomes.
 * Two size variants: L (1216px × 117px) and M (1216px × 96px)
 */
export const Results: React.FC<ResultsProps> = ({
  size = 'L',
  title = 'Title',
  description = 'Description',
  className,
}) => {
  const resultsClasses = `${styles.results} ${styles[size]} ${className || ''}`.trim();

  return (
    <div className={resultsClasses}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
};

export type { ResultsProps };
