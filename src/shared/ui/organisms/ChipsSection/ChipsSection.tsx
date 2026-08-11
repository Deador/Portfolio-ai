import React from 'react';
import styles from './ChipsSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';

interface ChipsSectionProps {
  /**
   * Section title props
   */
  titleProps?: TitleProps;

  /**
   * Short thesis chips (one text line each)
   */
  chips?: string[];

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ChipsSection Component
 *
 * Section with a title, description and a row of short white text chips.
 */
export const ChipsSection: React.FC<ChipsSectionProps> = ({
  titleProps = { size: 'M', children: 'Chips' },
  chips = ['Chip'],
  className,
}) => {
  return (
    <section className={`${styles.chipsSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />
        <div className={styles.chipsRow}>
          {chips.map((chip, i) => (
            <span key={i} className={styles.chip}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export type { ChipsSectionProps };
