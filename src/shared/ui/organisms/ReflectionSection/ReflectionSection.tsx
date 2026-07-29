import React from 'react';
import styles from './ReflectionSection.module.scss';
import { ReflectionRows, ReflectionRowsProps } from '../../molecules/ReflectionRows/ReflectionRows';

interface ReflectionSectionProps {
  /**
   * Header text
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
 * Section for reflection with a title and bulleted list items.
 * Dimensions: 768px × 323px
 */
export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
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
      <ReflectionRows header={header} items={items} />
    </section>
  );
};

export type { ReflectionSectionProps };
