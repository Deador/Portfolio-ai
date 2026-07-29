import React from 'react';
import styles from './Tag.module.scss';

interface TagProps {
  /**
   * Tag text content
   */
  text?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Tag Component
 *
 * Small, dark badge for labeling and categorization.
 * Fully semantic and reusable.
 */
export const Tag: React.FC<TagProps> = ({ text = 'Text', className }) => {
  return (
    <span className={`${styles.tag} ${className || ''}`.trim()}>
      {text}
    </span>
  );
};

export type { TagProps };
