import React from 'react';
import styles from './HomeExperienceSection.module.scss';
import { Title } from '../../../../../shared/ui/molecules/Title/Title';
import { Tag } from '../../../../../shared/ui/atoms/Tag/Tag';
import { HomeExperienceItem } from '../../data';

interface HomeExperienceSectionProps {
  /**
   * Section heading (display, 68px)
   */
  title: string;

  /**
   * Experience cards
   */
  items: HomeExperienceItem[];
}

/**
 * HomeExperienceSection
 *
 * Секция «Опыт»: заголовок + карточки компаний
 * (белые, radius 24, padding 24) с буллетами.
 */
export const HomeExperienceSection: React.FC<HomeExperienceSectionProps> = ({
  title,
  items,
}) => {
  return (
    <section className={styles.section}>
      <Title size="XL">{title}</Title>

      <div className={styles.cards}>
        {items.map((item, index) => (
          <article key={index} className={styles.card}>
            {/* Figma 33291:4250: статусный тег — в строке с названием
                (тёмный default), теги периодов — под названием (light). */}
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderRow}>
                <h3 className={styles.company}>{item.company}</h3>
                {item.statusBadge && <Tag variant="default" text={item.statusBadge} />}
              </div>

              {item.periodBadge && (
                <div className={styles.cardHeaderRow}>
                  <Tag variant="light" text={item.periodBadge} />
                </div>
              )}

              {item.roleNote && <span className={styles.roleNote}>{item.roleNote}</span>}
            </div>

            <ul className={styles.bullets}>
              {item.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className={styles.bullet}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.bulletText}>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};