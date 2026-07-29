import React, { ReactNode } from 'react';
import styles from './Title.module.scss';

type TitleSize = 'L' | 'M';

interface TitleProps {
  /**
   * Title size variant: 'L' for large (800px), 'M' for medium (720px)
   */
  size?: TitleSize;

  /**
   * Title content - string or ReactNode
   */
  children: string | ReactNode;

  /**
   * HTML heading level (for semantics)
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Title Component
 *
 * Main title/heading with two size variants.
 * Used for section headings and prominent titles.
 */
export const Title: React.FC<TitleProps> = ({
  size = 'L',
  children,
  as: HeadingTag = 'h2',
  className,
}) => {
  const titleClasses = `${styles.title} ${styles[size]} ${className || ''}`.trim();

  return (
    <HeadingTag className={titleClasses}>
      {children}
    </HeadingTag>
  );
};

export type { TitleProps };
