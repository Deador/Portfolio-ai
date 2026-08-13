import React from 'react';
import styles from './HomeSkillsSection.module.scss';
import { HomeSkill } from '../../data';
import { HomeScrollTopButton } from '../HomeScrollTop/HomeScrollTopButton';
import skillsSheet from '../../../../../content/home/images/skills-sheet.png';

interface HomeSkillsSectionProps {
  /**
   * Section heading (28px heading → DS title 24px)
   */
  heading: string;

  /**
   * Section description
   */
  description: string;

  /**
   * Skill rows: [title] + [description] + divider
   */
  items: HomeSkill[];

  /**
   * Scroll-to-top handler (button «Наверх» on the dark zone bottom)
   */
  onScrollTop?: () => void;
}

/**
 * HomeSkillsSection
 *
 * Секция «Навыки» на тёмном фоне (hero):
 * светлая зона 278px (переход из «Кейсов»), декоративный «sheet»
 * (Figma 33291:4367, единый PNG), тёмная зона с заголовком,
 * рядами навыков и кнопкой «Наверх».
 */
export const HomeSkillsSection: React.FC<HomeSkillsSectionProps> = ({
  heading,
  description,
  items,
  onScrollTop,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.darkZone}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.list}>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <div className={styles.skillRow}>
                  <h3 className={styles.skillTitle}>{item.title}</h3>
                  <p className={styles.skillDescription}>{item.description}</p>
                </div>
                {index < items.length - 1 && (
                  <div className={styles.divider} aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={styles.scrollTop}>
          <HomeScrollTopButton onScrollTop={onScrollTop} />
        </div>
      </div>

      <img
        src={skillsSheet}
        alt=""
        className={styles.sheet}
        aria-hidden="true"
      />
    </section>
  );
};