import React, { ReactNode } from 'react';
import styles from './DecisionSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';

interface DecisionSectionProps {
  /**
   * Section title props
   */
  titleProps?: TitleProps;

  /**
   * Short description under the title
   */
  paragraph?: string | ReactNode;

  /**
   * Small tag/label text
   */
  tag?: string;

  /**
   * Timeline image or placeholder (1216px × 768px)
   */
  image?: ReactNode;

  /**
   * Note block title
   */
  noteTitle?: string;

  /**
   * Note block text
   */
  noteText?: string | ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * DecisionSection Component
 *
 * Shows how design decisions were validated with users
 * before development, with a title, description, tag and timeline.
 */
export const DecisionSection: React.FC<DecisionSectionProps> = ({
  titleProps = { size: 'M', children: 'Decision' },
  paragraph = 'Description',
  tag = 'Tag',
  image,
  noteTitle = 'Note title',
  noteText = 'Note text',
  className,
}) => {
  return (
    <section className={`${styles.decisionSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title {...titleProps} />
          <p className={styles.paragraph}>{paragraph}</p>
          <span className={styles.tag}>{tag}</span>
        </div>

        <div className={styles.imageSlot}>{image}</div>

        <div className={styles.noteBlock}>
          <p className={styles.noteTitle}>{noteTitle}</p>
          <p className={styles.noteText}>{noteText}</p>
        </div>
      </div>
    </section>
  );
};

export type { DecisionSectionProps };
