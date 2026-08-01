import React from 'react';
import styles from './RolesTable.module.scss';

interface RolesTableRow {
  /**
   * Role name shown in the tag pill
   */
  role?: string;

  /**
   * Version label below the role
   */
  version?: string;

  /**
   * Bullet list of tasks
   */
  tasks?: string;
}

interface RolesTableProps {
  /**
   * Block title (centered)
   */
  title?: string;

  /**
   * Block description (centered)
   */
  description?: string;

  /**
   * Table rows
   */
  rows?: RolesTableRow[];

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * RolesTable Component
 *
 * Table of roles, versions and their tasks.
 * Rendered as white rounded cells with subtle borders.
 */
export const RolesTable: React.FC<RolesTableProps> = ({
  title = 'Roles',
  description = 'Description',
  rows = [],
  className,
}) => {
  return (
    <div className={`${styles.rolesTable} ${className || ''}`.trim()}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.table}>
        <div className={`${styles.tableRow} ${styles.tableHead}`}>
          <span className={styles.headRole}>Роль</span>
          <span className={styles.headTasks}>Основные задачи</span>
        </div>

        {rows.map((row, i) => (
          <div key={i} className={styles.tableRow}>
            <div className={styles.roleCell}>
              <span className={styles.rolePill}>{row.role}</span>
              <span className={styles.version}>{row.version}</span>
            </div>
            <p className={styles.tasks}>{row.tasks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export type { RolesTableProps };
