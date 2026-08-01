import React from 'react';
import styles from './ReflectionSection.module.scss';
import { ReflectionRows } from '../../molecules/ReflectionRows/ReflectionRows';

interface ReflectionSectionProps {
  /**
   * Main heading text (40px)
   */
  title?: string;

  /**
   * Main takeaway paragraph (24px)
   */
  paragraph?: string;

  /**
   * Reflection rows header text (18px)
   */
  header?: string;

  /**
   * List of reflection items
   */
  items?: Array<string>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ReflectionSection Component
 *
 * Final reflection with a big title, takeaway paragraph,
 * and a list of responsibility items.
 * Dimensions: 768px × 598px
 */
export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
  title = 'Main conclusion',
  paragraph = 'Description',
  header = 'Reflection Header',
  items = [
    'Item one',
    'Item two',
    'Item three',
    'Item four',
  ],
  className,
}) => {
  return (
    <section className={`${styles.reflectionSection} ${className || ''}`.trim()}>
      <div className={styles.headerBlock}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.paragraph}>{paragraph}</p>
      </div>
      <ReflectionRows header={header} items={items} />
    </section>
  );
};

export type { ReflectionSectionProps };
