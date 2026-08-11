import React from 'react';
import styles from './QuoteSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { QuoteCard, QuoteCardProps } from '../../molecules/QuoteCard/QuoteCard';

interface QuoteSectionProps {
  /**
   * Section title props
   */
  titleProps?: TitleProps;

  /**
   * Quote cards (dialogue "customer → designer")
   */
  cards?: Array<Pick<QuoteCardProps, 'leftName' | 'leftQuote' | 'rightName' | 'rightQuote'>>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * QuoteSection Component
 *
 * Section with a title and a list of dark QuoteCards
 * ("запрос бизнеса → мой ответ").
 */
export const QuoteSection: React.FC<QuoteSectionProps> = ({
  titleProps = { size: 'M', children: 'Decisions' },
  cards = [],
  className,
}) => {
  return (
    <section className={`${styles.quoteSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />
        <div className={styles.cardsList}>
          {cards.map((card, i) => (
            <QuoteCard
              key={i}
              leftName={card.leftName}
              leftQuote={card.leftQuote}
              rightName={card.rightName}
              rightQuote={card.rightQuote}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { QuoteSectionProps };
