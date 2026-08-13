import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeCaseCard.module.scss';
import { Tag } from '../../../../../shared/ui/atoms/Tag/Tag';
import { HomeCaseItem } from '../../data';

interface HomeCaseCardProps {
  /**
   * Case card content
   */
  item: HomeCaseItem;
}

/**
 * HomeCaseCard
 *
 * Карточка кейса: заголовок + описание + изображение.
 * Если передан `href` — оборачивается в RouterLink,
 * иначе рендерится как `<article>` (заглушка «Скоро»).
 */
export const HomeCaseCard: React.FC<HomeCaseCardProps> = ({ item }) => {
  const content = (
    <>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{item.title}</h3>
        {item.comingSoon && <Tag text="Скоро" />}
      </div>
      <p className={styles.subtitle}>{item.subtitle}</p>
      <div className={styles.imageSlot}>
        <img src={item.image} alt={item.imageAlt} className={styles.image} />
      </div>
    </>
  );

  if (item.href) {
    return (
      <Link to={item.href} className={styles.card}>
        {content}
      </Link>
    );
  }

  return (
    <article className={styles.card}>
      {content}
    </article>
  );
};