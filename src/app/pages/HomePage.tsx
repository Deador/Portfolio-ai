import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { CommonCard } from '../../shared/ui/molecules/CommonCard/CommonCard';

/**
 * HomePage
 * Main landing page for the portfolio
 */
const HomePage: React.FC = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Portfolio</h1>
        <p className={styles.subtitle}>
          Senior Product Designer | Design Systems | Frontend Engineering
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Case Studies</h2>
          <p className={styles.text}>
            <Link to="/case/acquiring">Система обработки заявок на эквайринг</Link>
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Component Demo</h2>
          <div className={styles.demo}>
            <CommonCard
              variant="insight"
              title="Design System Example"
              description="This is the CommonCard component in the Insight variant. All styling uses design tokens."
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Project Info</h2>
          <p className={styles.text}>
            This portfolio demonstrates a production-ready AI-first workflow:
            Figma → Design System → React → Storybook → Production.
          </p>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
