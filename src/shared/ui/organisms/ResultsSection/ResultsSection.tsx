import React from 'react';
import styles from './ResultsSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { Results, ResultsProps } from '../../molecules/Results/Results';

interface ResultsSectionProps {
  titleProps?: TitleProps;
  results?: Array<Pick<ResultsProps, 'size' | 'title' | 'description'>>;
  className?: string;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  titleProps = { size: 'M', children: 'Results' },
  results = [
    { size: 'L', title: 'Result 1', description: 'Details' },
    { size: 'L', title: 'Result 2', description: 'Details' },
    { size: 'L', title: 'Result 3', description: 'Details' },
    { size: 'L', title: 'Result 4', description: 'Details' },
    { size: 'L', title: 'Result 5', description: 'Details' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.resultsSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />
        <div className={styles.resultsBlock}>
          {results.map((r, i) => (
            <Results key={i} size={r.size} title={r.title} description={r.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { ResultsSectionProps };
