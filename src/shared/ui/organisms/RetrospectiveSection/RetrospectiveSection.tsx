import React from 'react';
import styles from './RetrospectiveSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { CommonCard, CommonCardProps } from '../../molecules/CommonCard/CommonCard';

interface RetrospectiveSectionProps {
  titleProps?: TitleProps;
  cards?: Array<Pick<CommonCardProps, 'variant' | 'title' | 'description' | 'number'>>;
  className?: string;
}

export const RetrospectiveSection: React.FC<RetrospectiveSectionProps> = ({
  titleProps = { size: 'M', children: 'Retrospective' },
  cards = [
    { variant: 'lesson', number: 1, title: 'Learning 1', description: 'Details' },
    { variant: 'lesson', number: 2, title: 'Learning 2', description: 'Details' },
    { variant: 'lesson', number: 3, title: 'Learning 3', description: 'Details' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.retrospectiveSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />
        <div className={styles.cardsBlock}>
          {cards.map((c, i) => (
            <CommonCard key={i} variant={c.variant} title={c.title} description={c.description} number={c.number} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { RetrospectiveSectionProps };
