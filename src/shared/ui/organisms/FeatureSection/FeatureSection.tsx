import React, { ReactNode } from 'react';
import styles from './FeatureSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { MetricCard, MetricCardProps } from '../../molecules/MetricCard/MetricCard';

interface FeatureSectionProps {
  titleProps?: Partial<TitleProps>;
  image?: ReactNode;
  metrics?: Array<Pick<MetricCardProps, 'type' | 'title' | 'description'>>;
  className?: string;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  titleProps = { size: 'M', children: 'Feature' },
  image,
  metrics = [
    { type: 'short', title: 'Metric 1', description: 'Details' },
    { type: 'short', title: 'Metric 2', description: 'Details' },
    { type: 'short', title: 'Metric 3', description: 'Details' },
  ],
  className,
}) => {
  return (
    <section className={`${styles.featureSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title size={titleProps.size as 'M' | 'L'} {...titleProps} />
        <div className={styles.imageSlot}>{image}</div>
        <div className={styles.metricsRow}>
          {metrics.map((m, i) => (
            <MetricCard key={i} type={m.type as any} title={m.title} description={m.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { FeatureSectionProps };
