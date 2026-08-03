import React, { Children, ReactNode } from 'react';
import styles from './MVPGrowthSection.module.scss';

interface MVPGrowthSectionProps {
  children?: ReactNode;
}

export const MVPGrowthSection: React.FC<MVPGrowthSectionProps> = ({ children }) => {
  const blocks = Children.toArray(children);
  const [persona = null, table = null, card = null] = blocks;

  return (
    <div className={styles.mvpSection}>
      {persona}
      <div className={styles.gapMapBlock}>
        {table}
        <div className={styles.gapCardSlot}>{card}</div>
      </div>
    </div>
  );
};
