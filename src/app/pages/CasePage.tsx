import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './CasePage.module.scss';
import { CaseRenderer } from '../../entities/case/CaseRenderer';
import acquiringCase from '../../content/cases/acquiring/case.json';
import chatCase from '../../content/cases/chat/case.json';

const caseDocuments: Record<string, unknown> = {
  acquiring: acquiringCase,
  chat: chatCase,
};

/**
 * CasePage
 * Router wrapper for case study pages
 *
 * Routes case slugs to specific case study components:
 * - /case/acquiring → CaseRenderer (JSON-driven)
 * - /case/chat → CaseRenderer (JSON-driven)
 * - /case/* → 404 or placeholder
 */
const CasePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const caseData = caseDocuments[slug ?? ''];

  if (caseData) {
    return <CaseRenderer caseData={caseData as Parameters<typeof CaseRenderer>[0]['caseData']} />;
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
