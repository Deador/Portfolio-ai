import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './CasePage.module.scss';

/**
 * CasePage
 * Individual case study page
 * Placeholder for future case study implementation
 */
const CasePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Case Study</h1>
        <p className={styles.text}>
          Case: <strong>{slug}</strong>
        </p>
        <p className={styles.text}>
          This page is a placeholder for future case study implementation.
        </p>
      </div>
    </main>
  );
};

export default CasePage;
