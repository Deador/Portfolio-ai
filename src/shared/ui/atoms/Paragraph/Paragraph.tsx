import React, { ReactNode } from 'react';
import styles from './Paragraph.module.scss';

interface ParagraphProps {
  /**
   * Paragraph content - string or ReactNode
   */
  children: string | ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Paragraph Component
 *
 * Semantic text block with design-token-based typography.
 * Used for body text, descriptions, and content blocks.
 */
export const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
  return (
    <p className={`${styles.paragraph} ${className || ''}`.trim()}>
      {children}
    </p>
  );
};

export type { ParagraphProps };
