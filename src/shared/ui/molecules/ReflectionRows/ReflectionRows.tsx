import React, { ReactNode } from 'react';
import styles from './ReflectionRows.module.scss';

interface ReflectionRowsProps {
  /**
   * Header text above the list
   */
  header?: string | ReactNode;

  /**
   * Array of list items (bullet points)
   * Each item is a string or ReactNode
   */
  items?: Array<string | ReactNode>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ReflectionRows Component
 *
 * List of bulleted items for Reflection Section.
 * Displays a header followed by a list of dash-prefixed items.
 *
 * Dimensions: 768px × 173px (for 4 items)
 * Flex column with 12px gap
 * Gray text (secondary color)
 */
export const ReflectionRows: React.FC<ReflectionRowsProps> = ({
  header = 'Header',
  items = [
    'Item one',
    'Item two',
    'Item three',
    'Item four',
  ],
  className,
}) => {
  return (
    <div className={`${styles.reflectionRows} ${className || ''}`.trim()}>
      {/* Header */}
      <p className={styles.header}>{header}</p>

      {/* List Items */}
      {items.map((item, index) => (
        <div key={index} className={styles.listItem}>
          <span className={styles.bullet}>—</span>
          <span className={styles.text}>{item}</span>
        </div>
      ))}
    </div>
  );
};

export type { ReflectionRowsProps };
