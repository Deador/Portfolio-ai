import React, { ReactNode } from 'react';
import styles from './FeatureSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { MetricCard, MetricCardProps } from '../../molecules/MetricCard/MetricCard';

interface FeatureSectionProps {
  titleProps?: TitleProps;
  image?: ReactNode;
  metrics?: Array<Pick<MetricCardProps, 'type' | 'number' | 'title' | 'description'>>;
  className?: string;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  titleProps = { size: 'M', children: 'Feature' },
  image,
  metrics = [
    { type: 'short', number: 1, title: 'Metric 1', description: 'Details' },
    { type: 'short', number: 2, title: 'Metric 2', description: 'Details' },
    { type: 'short', number: 3, title: 'Metric 3', description: 'Details' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.featureSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title {...titleProps} />
        <div className={styles.imageSlot}>{image}</div>
        <div className={styles.metricsRow}>
          {metrics.map((m, i) => (
            <MetricCard key={i} type={m.type} number={m.number} title={m.title} description={m.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { FeatureSectionProps };
