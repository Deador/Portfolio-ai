import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import { Header } from '../../shared/ui/organisms/Header/Header';
import { Logo } from '../../shared/assets/Logo/Logo';
import { ScrollToTop } from '../router/ScrollToTop';

interface RootLayoutProps {
  /**
   * Page content to render
   */
  children: ReactNode;

  /**
   * Header theme: 'inverted' (светлый текст) для тёмного hero Home,
   * 'default' — для светлых страниц кейсов
   */
  headerTheme?: 'default' | 'inverted';
}

/**
 * RootLayout
 * Main layout wrapper for all pages
 * Contains: Header + Page Content
 */
const RootLayout: React.FC<RootLayoutProps> = ({ children, headerTheme = 'default' }) => {

  return (
    <div className={styles.root}>
      <ScrollToTop />
      <header className={styles.headerWrapper}>
        <Header
          theme={headerTheme}
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
