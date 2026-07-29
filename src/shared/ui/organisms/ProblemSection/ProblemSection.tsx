import React, { ReactNode } from 'react';
import styles from './ProblemSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Citate } from '../../atoms/Citate/Citate';
import { CommonCard, CommonCardProps } from '../../molecules/CommonCard/CommonCard';

interface ProblemSectionProps {
  /**
   * Section title props
   */
  titleProps?: Partial<TitleProps>;

  /**
   * Paragraph/problem description
   */
  paragraph?: string | ReactNode;

  /**
   * Citation/quote
   */
  cite?: { text: string; source?: string };

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
 * - Title (Size S, 42px)
 * - Paragraph + Citate side by side
 * - 3 CommonCard components
 *
 * Total dimensions: 1216px × 378px
 */
export const ProblemSection: React.FC<ProblemSectionProps> = ({
  titleProps = {
    size: 'M',
    children: 'Problem',
  },
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
        <Title
          size={titleProps.size as 'M' | 'L'}
          {...titleProps}
        />

        {/* Content Row (Paragraph + Citate) */}
        <div className={styles.contentRow}>
          <Paragraph>{paragraph}</Paragraph>
          <Citate text={cite.text} source={cite.source} />
        </div>

        {/* Cards Row */}
        <div className={styles.cardsRow}>
          {cards.map((card, index) => (
            <CommonCard
              key={index}
              variant={card.variant as any}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { ProblemSectionProps };
