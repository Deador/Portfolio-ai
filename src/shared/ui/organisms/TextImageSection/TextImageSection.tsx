import React, { ReactNode } from 'react';
import styles from './TextImageSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { MetricCard, MetricCardProps } from '../../molecules/MetricCard/MetricCard';

interface TextImageHighlight {
  /**
   * Highlight card title ("Что изменилось")
   */
  title: string;

  /**
   * Highlight paragraphs
   */
  paragraphs?: string[];
}

interface TextImageSectionProps {
  /**
   * Section title props (description is optional)
   */
  titleProps?: TitleProps;

  /**
   * Full-width media asset with natural height (diagram or panel)
   */
  image?: ReactNode;

  /**
   * Optional supporting card "Что изменилось" (mutually exclusive with cards)
   */
  highlight?: TextImageHighlight;

  /**
   * Optional numbered cards (mutually exclusive with highlight)
   */
  cards?: Array<Pick<MetricCardProps, 'type' | 'number' | 'title' | 'description'>>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TextImageSection Component
 *
 * Story block: title (+ description) + one full-width visual asset with natural
 * height + an optional supporting block (highlight card or numbered cards).
 */
export const TextImageSection: React.FC<TextImageSectionProps> = ({
  titleProps = { size: 'M', children: 'Story' },
  image,
  highlight,
  cards = [],
  className,
}) => {
  return (
    <section className={`${styles.textImageSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />

        {image && <div className={styles.imageSlot}>{image}</div>}

        {highlight && (
          <div className={styles.highlightCard}>
            <p className={styles.highlightTitle}>{highlight.title}</p>
            {(highlight.paragraphs ?? []).length > 0 && (
              <div className={styles.highlightBody}>
                {highlight.paragraphs!.map((p, i) => (
                  <p key={i} className={styles.highlightParagraph}>
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {cards.length > 0 && (
          <div className={styles.cardsRow}>
            {cards.map((card, i) => (
              <MetricCard
                key={i}
                type={card.type}
                number={card.number}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export type { TextImageSectionProps };
