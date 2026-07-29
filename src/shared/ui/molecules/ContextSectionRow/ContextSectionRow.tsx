import React, { ReactNode } from 'react';
import styles from './ContextSectionRow.module.scss';

interface ContextSectionRowProps {
  /**
   * Row title (Text/H3, 24px, semibold)
   */
  title?: string | ReactNode;

  /**
   * Row description (Text/M, 16px, regular)
   */
  description?: string | ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ContextSectionRow Component
 *
 * Single row with title and description for Context Section.
 * Used to display key context information in pairs.
 *
 * Dimensions: 620px × 68px
 * Flex column with 12px gap
 * Text/H3 + Text/M typography
 */
export const ContextSectionRow: React.FC<ContextSectionRowProps> = ({
  title = 'Title',
  description = 'Description',
  className,
}) => {
  return (
    <div className={`${styles.contextRow} ${className || ''}`.trim()}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export type { ContextSectionRowProps };
