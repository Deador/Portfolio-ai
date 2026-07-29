import React from 'react';
import styles from './DecisionSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { QuoteCard, QuoteCardProps } from '../../molecules/QuoteCard/QuoteCard';

interface DecisionSectionProps {
  titleProps?: Partial<TitleProps>;
  quotes?: Array<Omit<QuoteCardProps, 'className'>>;
  className?: string;
}

export const DecisionSection: React.FC<DecisionSectionProps> = ({
  titleProps = { size: 'M', children: 'Decision' },
  quotes = [
    { leftName: 'Author 1', leftQuote: 'Quote 1', rightName: 'Author 2', rightQuote: 'Quote 2' },
    { leftName: 'Author 3', leftQuote: 'Quote 3', rightName: 'Author 4', rightQuote: 'Quote 4' },
    { leftName: 'Author 5', leftQuote: 'Quote 5', rightName: 'Author 6', rightQuote: 'Quote 6' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.decisionSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title size={titleProps.size as 'M' | 'L'} {...titleProps} />
        <div className={styles.quotesBlock}>
          {quotes.map((q, i) => (
            <QuoteCard key={i} {...q} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { DecisionSectionProps };
