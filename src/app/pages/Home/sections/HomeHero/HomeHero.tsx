import React from 'react';
import styles from './HomeHero.module.scss';
import { Button } from '../../../../../shared/ui/atoms/Button/Button';
import { Tag } from '../../../../../shared/ui/atoms/Tag/Tag';
import { useShowreel } from '../../hooks/useShowreel';
import { HomeHeroData } from '../../data';

interface HomeHeroProps {
  /**
   * Hero content (heading, description, CTA, showreel frames, GIF)
   */
  data: HomeHeroData;

  /**
   * CTA «Смотреть кейсы» click handler (scroll to cases)
   */
  onCtaClick?: () => void;
}

const ArrowIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * ScrollIndicator
 *
 * Скролл-индикатор из Figma (20×102): линия + «мышь» + анимированная точка.
 * Анимация точки (движение вниз + затухание) — ключевой элемент hero.
 */
const ScrollIndicator: React.FC = () => (
  <div className={styles.scrollIndicator}>
    <svg
      width="20"
      height="102"
      viewBox="0 0 20 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect className={styles.scrollLine} x="11" y="0" width="1" height="64" />
      <rect
        className={styles.scrollMouse}
        x="0.5"
        y="70.5"
        width="19"
        height="31"
        rx="9.5"
      />
      <circle className={styles.scrollDot} cx="10" cy="88" r="4" />
    </svg>
  </div>
);

// Повторов фразы в одной группе (для бесшовного цикла группа должна
// быть шире вьюпорта; с размером 120px достаточно 5 шт.)
const MARQUEE_ITEMS = 5;

const renderMarqueeGroup = (key: string, text: string) => (
  <span key={key} className={styles.marqueeGroup}>
    {Array.from({ length: MARQUEE_ITEMS }).map((_, index) => (
      <span key={index} className={styles.marqueeItem}>
        {text}
        <span className={styles.marqueeSeparator} aria-hidden="true">{' - '}</span>
      </span>
    ))}
  </span>
);

/**
 * Marquee
 *
 * Текст-полоса вместо GIF «text 3» (Figma 33291:4246): бегущая строка
 * «Проектирую дизайн мобильных и веб интерфейсов - » на всю ширину.
 * Два идентичных дубля + translateX(-50%) дают бесшовный цикл.
 */
const Marquee: React.FC<{ text: string }> = ({ text }) => (
  <div className={styles.marquee} aria-hidden="true">
    <div className={styles.marqueeTrack}>
      {renderMarqueeGroup('first', text)}
      {renderMarqueeGroup('second', text)}
    </div>
  </div>
);

/**
 * HomeHero
 *
 * Тёмный hero главной страницы (фон #060C17):
 * GIF-полоса (132px ниже шапки), showreel с кроссфейдом,
 * анимированный scroll-индикатор, заголовок, CTA-пилла,
 * бейдж «UI/UX» (#2E343F).
 */
export const HomeHero: React.FC<HomeHeroProps> = ({ data, onCtaClick }) => {
  const { activeIndex, pause, resume } = useShowreel({
    count: data.showreelFrames.length,
  });

  return (
    <section className={styles.hero}>
      <Marquee text={data.marqueeText} />

      <div className={styles.content}>
        <div
          className={styles.showreel}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {data.showreelFrames.map((frame, index) => (
            <img
              key={index}
              src={frame.src}
              alt={frame.alt}
              className={`${styles.showreelFrame} ${index === activeIndex ? styles.active : ''}`}
            />
          ))}
        </div>

        <ScrollIndicator />

        <div className={styles.textBlock}>
          <h1 className={styles.heading}>{data.heading}</h1>
          <p className={styles.description}>{data.description}</p>
          <Button
            type="outline"
            shape="pill"
            inverted
            text={data.ctaText}
            icon={
              <span className={styles.ctaArrow}>
                <ArrowIcon />
              </span>
            }
            onClick={onCtaClick}
          />
        </div>
      </div>

      <div className={styles.badge}>
        <Tag variant="inverted" text={data.badge} />
      </div>
    </section>
  );
};