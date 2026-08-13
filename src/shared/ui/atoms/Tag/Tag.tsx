import React from 'react';
import styles from './Tag.module.scss';

type TagVariant = 'default' | 'light' | 'inverted';

interface TagProps {
  /**
   * Tag text content
   */
  text?: string;

  /**
   * Tag variant:
   * - default: dark pill (labeling, e.g. «Скоро»)
   * - light: light pill (RolesTable role pill, e.g. experience badges)
   * - inverted: dark pill for light text on dark surfaces (hero badge «UI/UX»)
   */
  variant?: TagVariant;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Tag Component
 *
 * Small pill for labeling and categorization.
 * Variants mirror Figma component properties.
 */
export const Tag: React.FC<TagProps> = ({
  text = 'Text',
  variant = 'default',
  className,
}) => {
  const classes = [
    styles.tag,
    variant !== 'default' ? styles[variant] : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {text}
    </span>
  );
};

export type { TagProps };