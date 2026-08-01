import React, { ReactNode } from 'react';
import styles from './GrowthSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { PersonaCard, PersonaCardProps } from '../../molecules/PersonaCard/PersonaCard';

interface GrowthSectionItem {
  /**
   * Image or placeholder element (782px wide)
   */
  image?: ReactNode;

  /**
   * Persona card shown next to the image
   */
  persona: Omit<PersonaCardProps, 'className'>;
}

interface GrowthSectionProps {
  /**
   * Section title props
   */
  titleProps?: TitleProps;

  /**
   * Stacked rows of image + persona card
   */
  items?: GrowthSectionItem[];

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * GrowthSection Component
 *
 * Shows how the platform evolved: stacked rows of an image
 * with a persona card describing the change.
 */
export const GrowthSection: React.FC<GrowthSectionProps> = ({
  titleProps = { size: 'M', children: 'Growth' },
  items = [],
  className,
}) => {
  return (
    <section className={`${styles.growthSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />
        <div className={styles.rows}>
          {items.map((item, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.imageSlot}>{item.image}</div>
              <PersonaCard {...item.persona} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export type { GrowthSectionProps };
