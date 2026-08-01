import React, { ReactNode } from 'react';
import styles from './HeroSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { RowInfoProject } from '../../molecules/RowInfoProject/RowInfoProject';

interface HeroSectionProps {
  /**
   * Title props for the section
   */
  titleProps?: TitleProps;

  /**
   * Image or content element (1216px × 794px with radius 16px)
   */
  image?: ReactNode;

  /**
   * Row info project data - array of 4 items
   * Each item has: label and value
   */
  rows?: Array<{ label: string; value: string }>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HeroSection Component
 *
 * Hero section with:
 * - Title (centered, size M - 720px × 96px)
 * - Image slot (1216px × 794px, border-radius 16px)
 * - 4 info rows at bottom (286px each × 46px)
 *
 * Total dimensions: 1216px × 1016px
 * Flex column with 40px gap between sections
 *
 * All styling uses design tokens exclusively.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  titleProps = {
    size: 'M',
    children: 'Title',
  },
  image,
  rows = [
    { label: 'Label', value: 'Value' },
    { label: 'Label', value: 'Value' },
    { label: 'Label', value: 'Value' },
    { label: 'Label', value: 'Value' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.heroSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        {/* Title */}
        <Title {...titleProps} />

        {/* Image Slot */}
        <div className={styles.imageSlot}>
          {image}
        </div>

        {/* Info Rows */}
        <div className={styles.rowsContainer}>
          {rows.map((row, index) => (
            <RowInfoProject
              key={index}
              label={row.label}
              value={row.value}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { HeroSectionProps };
