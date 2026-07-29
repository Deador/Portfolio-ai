import React, { ReactNode } from 'react';
import styles from './ContextSection.module.scss';
import { Title, TitleProps } from '../../molecules/Title/Title';
import { ContextSectionRow, ContextSectionRowProps } from '../../molecules/ContextSectionRow/ContextSectionRow';
import { CommonCard, CommonCardProps } from '../../molecules/CommonCard/CommonCard';

interface ContextSectionProps {
  titleProps?: Partial<TitleProps>;
  image?: ReactNode;
  rows?: Array<Pick<ContextSectionRowProps, 'title' | 'description'>>;
  card?: Pick<CommonCardProps, 'variant' | 'title' | 'description'>;
  className?: string;
}

export const ContextSection: React.FC<ContextSectionProps> = ({
  titleProps = { size: 'M', children: 'Context' },
  image,
  rows = [
    { title: 'Row 1', description: 'Description' },
    { title: 'Row 2', description: 'Description' },
    { title: 'Row 3', description: 'Description' },
    { title: 'Row 4', description: 'Description' },
  ],
  card = { variant: 'insight', title: 'Insight', description: 'Details' },
  className,
}) => {
  return (
    <section className={`${styles.contextSection} ${className || ''}`.trim()}>
      <div className={styles.container}>
        <Title size={titleProps.size as 'M' | 'L'} {...titleProps} />
        <div className={styles.contentRow}>
          <div className={styles.imageSlot}>{image}</div>
          <div className={styles.infoBlock}>
            <div className={styles.rowsList}>
              {rows.map((r, i) => (
                <ContextSectionRow key={i} title={r.title} description={r.description} />
              ))}
            </div>
            <CommonCard variant={card.variant as any} title={card.title} description={card.description} />
          </div>
        </div>
      </div>
    </section>
  );
};

export type { ContextSectionProps };
