import React from 'react';
import styles from './RolesTable.module.scss';

interface RolesTableRow {
  /**
   * Role name shown in the tag pill
   */
  role?: string;

  /**
   * Secondary caption below the role: "Версия 1.0" | "Оператор" | "Оба подразделения"
   */
  label?: string;

  /**
   * Shared role: renders the label in accent color + "Shared role" chip
   */
  shared?: boolean;

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
   * First column header text
   */
  headRole?: string;

  /**
   * Second column header text
   */
  headTasks?: string;

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
  headRole = 'Роль',
  headTasks = 'Основные задачи',
  rows = [],
  className,
}) => {
  return (
    <div className={`${styles.rolesTable} ${className || ''}`.trim()}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.table}>
        <div className={`${styles.tableRow} ${styles.tableHead}`}>
          <span className={styles.headRole}>{headRole}</span>
          <span className={styles.headTasks}>{headTasks}</span>
        </div>

        {rows.map((row, i) => (
          <div key={i} className={styles.tableRow}>
            <div className={styles.roleCell}>
              <span className={styles.rolePill}>{row.role}</span>
              {row.label && (
                <span className={`${styles.label} ${row.shared ? styles.labelShared : ''}`}>
                  {row.label}
                </span>
              )}
              {row.shared && <span className={styles.sharedRole}>Shared role</span>}
            </div>
            <p className={styles.tasks}>{row.tasks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export type { RolesTableProps };
