import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import { Header } from '../../shared/ui/organisms/Header/Header';
import { Logo } from '../../shared/assets/Logo/Logo';

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

  return (
    <div className={styles.root}>
      <header className={styles.headerWrapper}>
        <Header
          logo={<Link to="/" aria-label="На главную"><Logo /></Link>}
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
