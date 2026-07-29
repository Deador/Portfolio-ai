import React, { ReactNode } from 'react';
import styles from './PersonaCard.module.scss';
import { Tag } from '../../atoms/Tag/Tag';

interface PersonaCardProps {
  /**
   * Persona title or name
   */
  title?: string | ReactNode;

  /**
   * Persona description
   */
  description?: string | ReactNode;

  /**
   * Icon or avatar component - accepts ReactNode
   */
  icon?: ReactNode | null;

  /**
   * Tag text shown in top-right
   */
  tagText?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * PersonaCard Component
 *
 * Card component for displaying user personas or team members.
 * Features an icon/avatar, title, description, and tag.
 * Dimensions: 600px (fixed)
 *
 * All styling uses design tokens exclusively.
 */
export const PersonaCard: React.FC<PersonaCardProps> = ({
  title = 'Title',
  description = 'Description',
  icon = null,
  tagText = 'Tag',
  className,
}) => {
  return (
    <article className={`${styles.personaCard} ${className || ''}`.trim()}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          {icon || <div className={styles.placeholderIcon} />}
        </div>
        <Tag text={tagText} />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
};

export type { PersonaCardProps };
