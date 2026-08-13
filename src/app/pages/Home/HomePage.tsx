import React from 'react';
import styles from './HomePage.module.scss';
import { homeContent } from './data';
import { HomeHero } from './sections/HomeHero/HomeHero';
import { HomeExperienceSection } from './sections/HomeExperience/HomeExperienceSection';
import { HomeCasesSection } from './sections/HomeCases/HomeCasesSection';
import { HomeSkillsSection } from './sections/HomeSkills/HomeSkillsSection';

/**
 * HomePage
 * Главная страница портфолио (композиция секций из Figma).
 */
const HomePage: React.FC = () => {
  const handleCtaClick = () => {
    document.getElementById('home-cases')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      <HomeHero data={homeContent.hero} onCtaClick={handleCtaClick} />

      <div className={styles.content}>
        <div className={styles.block}>
          <HomeExperienceSection title="Опыт" items={homeContent.experience} />
        </div>
        <div className={styles.block}>
          <HomeCasesSection id="home-cases" title="Кейсы" items={homeContent.cases} />
        </div>
      </div>

      <HomeSkillsSection
        heading="Чем могу помочь вашему бизнесу?"
        description="Работал в продуктовых командах двух банков. Развивал дизайн-систему для веба и Android, адаптировал её под сложные B2B-продукты (чат-платформа, эквайринг). Защищал решения перед бизнесом и стейкхолдерами."
        items={homeContent.skills}
        onScrollTop={handleScrollTop}
      />
    </div>
  );
};

export default HomePage;