import React, { ReactNode } from 'react';
import styles from './RowInfoProject.module.scss';

interface RowInfoProjectProps {
  /**
   * Label/key for the row
   */
  label?: string | ReactNode;

  /**
   * Value/content for the row
   */
  value?: string | ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * RowInfoProject Component
 *
 * Single information row for project metadata display.
 * Typically used for: role, timeline, tools, status, etc.
 * Dimensions: 286px × 46px (fixed)
 */
export const RowInfoProject: React.FC<RowInfoProjectProps> = ({
  label = 'Label',
  value = 'Value',
  className,
}) => {
  return (
    <div className={`${styles.rowInfoProject} ${className || ''}`.trim()}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export type { RowInfoProjectProps };
