import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styles from './CasePage.module.scss';
import CaseStudyAcquiring from './CaseStudyAcquiring';

/**
 * CasePage
 * Router wrapper for case study pages
 * 
 * Routes case slugs to specific case study components:
 * - /case/acquiring → CaseStudyAcquiring
 * - /case/* → 404 or placeholder
 */
const CasePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Route to specific case study component based on slug
  if (slug === 'acquiring') {
    return <CaseStudyAcquiring />;
  }

  // Unknown case - show placeholder
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Case Study</h1>
        <p className={styles.text}>
          Case: <strong>{slug}</strong>
        </p>
        <p className={styles.text}>
          This case study is not yet available.
        </p>
      </div>
    </main>
  );
};

export default CasePage;
