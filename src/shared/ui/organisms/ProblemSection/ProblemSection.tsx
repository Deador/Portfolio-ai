import React, { ReactNode } from 'react';
import styles from './ProblemSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { Citate } from '../../atoms/Citate/Citate';
import { CommonCard, CommonCardProps } from '../../molecules/CommonCard/CommonCard';

interface ProblemSectionProps {
  /**
   * Section title props
   */
  titleProps?: TitleProps;

  /**
   * Paragraph title (semibold line)
   */
  paragraphTitle?: string;

  /**
   * Paragraph/body text
   */
  paragraph?: string;

  /**
   * Citation/quote
   */
  cite?: { text: string; source?: string; avatar?: ReactNode };

  /**
   * 3 Common Card items
   */
  cards?: Array<Pick<CommonCardProps, 'variant' | 'title' | 'description'>>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ProblemSection Component
 *
 * Problem section with:
 * - Title
 * - Paragraph + Citate side by side
 * - 3 CommonCard components
 */
export const ProblemSection: React.FC<ProblemSectionProps> = ({
  titleProps = {
    size: 'M',
    children: 'Problem',
  },
  paragraphTitle = 'Paragraph title',
  paragraph = 'Description',
  cite = { text: 'Citation text', source: 'Source' },
  cards = [
    { variant: 'insight', title: 'Card 1', description: 'Description' },
    { variant: 'insight', title: 'Card 2', description: 'Description' },
    { variant: 'insight', title: 'Card 3', description: 'Description' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.problemSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        {/* Title */}
        <Title {...titleProps} />

        {/* Body (Paragraph + Citate, then Cards) */}
        <div className={styles.body}>
          <div className={styles.contentRow}>
            <div className={styles.paragraphBlock}>
              <h3 className={styles.paragraphTitle}>{paragraphTitle}</h3>
              <p className={styles.paragraphText}>{paragraph}</p>
            </div>
            <div className={styles.citateSlot}>
              <Citate text={cite.text} source={cite.source} avatar={cite.avatar} />
            </div>
          </div>

          <div className={styles.cardsRow}>
            {cards.map((card, index) => (
              <CommonCard
                key={index}
                className={styles.problemCard}
                variant={card.variant}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export type { ProblemSectionProps };
