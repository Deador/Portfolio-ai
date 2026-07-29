import React, { ReactNode } from 'react';
import styles from './RootLayout.module.scss';
import { Header } from '../../shared/ui/organisms/Header/Header';

interface RootLayoutProps {
  /**
   * Page content to render
   */
  children: ReactNode;
}

/**
 * RootLayout
 * Main layout wrapper for all pages
 * Contains: Header + Page Content
 */
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const logoSvg = (
    <svg
      width="40"
      height="48"
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="48" fill="currentColor" rx="4" />
    </svg>
  );

  return (
    <div className={styles.root}>
      <header className={styles.headerWrapper}>
        <Header
          logo={logoSvg}
          button1Text="Телеграмм"
          button2Text="Прочие контакты"
          ctaText="Резюме"
        />
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
