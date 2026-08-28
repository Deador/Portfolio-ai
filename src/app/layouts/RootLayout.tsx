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
          button1Href="https://t.me/HoverGod"
          button1Target="_blank"
          button2Text="+7 (906) 223-66-34"
          ctaText="Резюме"
          ctaHref="https://drive.google.com/file/d/1xjcWK2DL6VyBrXz1AkAH3rLRFGMT6L3P/view?usp=sharing"
          ctaTarget="_blank"
        />
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default RootLayout;
