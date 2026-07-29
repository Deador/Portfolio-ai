import React from 'react';
import styles from './RetrospectiveSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { CommonCard, CommonCardProps } from '../../molecules/CommonCard/CommonCard';

interface RetrospectiveSectionProps {
  titleProps?: Partial<TitleProps>;
  cards?: Array<Pick<CommonCardProps, 'variant' | 'title' | 'description'>>;
  className?: string;
}

export const RetrospectiveSection: React.FC<RetrospectiveSectionProps> = ({
  titleProps = { size: 'M', children: 'Retrospective' },
  cards = [
    { variant: 'insight', title: 'Learning 1', description: 'Details' },
    { variant: 'insight', title: 'Learning 2', description: 'Details' },
    { variant: 'insight', title: 'Learning 3', description: 'Details' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.retrospectiveSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title size={titleProps.size as 'M' | 'L'} {...titleProps} />
        <div className={styles.cardsBlock}>
          {cards.map((c, i) => (
            <CommonCard key={i} variant={c.variant as any} title={c.title} description={c.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { RetrospectiveSectionProps };
