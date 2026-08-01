import React from 'react';
import styles from './GoalsSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { CommonCard, CommonCardProps } from '../../molecules/CommonCard/CommonCard';

interface GoalsSectionProps {
  titleProps?: TitleProps;
  cards?: Array<Pick<CommonCardProps, 'variant' | 'title' | 'description' | 'number'>>;
  className?: string;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  titleProps = { size: 'M', children: 'Goals' },
  cards = [
    { variant: 'insight', title: 'Goal 1', description: 'Description' },
    { variant: 'insight', title: 'Goal 2', description: 'Description' },
    { variant: 'insight', title: 'Goal 3', description: 'Description' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.goalsSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />
        <div className={styles.cardsRow}>
          {cards.map((card, i) => (
            <CommonCard key={i} variant={card.variant} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { GoalsSectionProps };
