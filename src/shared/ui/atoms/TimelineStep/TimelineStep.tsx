import React, { ReactNode } from 'react';
import styles from './TimelineStep.module.scss';

interface TimelineStepProps {
  /**
   * Step number or label
   */
  number?: string | number;

  /**
   * Step title or heading
   */
  title?: string | ReactNode;

  /**
   * Step description or content
   */
  description?: string | ReactNode;

  /**
   * Is this the active/current step
   */
  isActive?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Timeline Step Component
 *
 * Represents a single step in a timeline or process flow.
 * Can be marked as active for visual distinction.
 */
export const TimelineStep: React.FC<TimelineStepProps> = ({
  number,
  title,
  description,
  isActive = false,
  className,
}) => {
  const timelineClasses = `${styles.timelineStep} ${isActive ? styles.active : ''} ${className || ''}`.trim();

  return (
    <div className={timelineClasses}>
      {number !== undefined && (
        <div className={styles.stepNumber}>
          <span className={styles.numberText}>{number}</span>
        </div>
      )}

      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
};

export type { TimelineStepProps };
