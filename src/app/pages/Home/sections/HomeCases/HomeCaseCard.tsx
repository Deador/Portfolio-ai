import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeCaseCard.module.scss';
import { HomeCaseItem } from '../../data';

interface HomeCaseCardProps {
  /**
   * Case card content
   */
  item: HomeCaseItem;
}

const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

/**
 * HomeCaseCard
 *
 * Карточка кейса: заголовок + описание + изображение.
 * `href` — внутренний маршрут (`/case/*` → RouterLink) или внешний URL
 * (`http(s)://` → `<a>` в новой вкладке), иначе `<article>` без ссылки.
 */
export const HomeCaseCard: React.FC<HomeCaseCardProps> = ({ item }) => {
  const content = (
    <>
      <div className={styles.textBlock}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.subtitle}>{item.subtitle}</p>
      </div>
      <div className={styles.imageSlot}>
        <img src={item.image} alt={item.imageAlt} className={styles.image} />
      </div>
    </>
  );

  if (!item.href) {
    return <article className={styles.card}>{content}</article>;
  }

  if (isExternalHref(item.href)) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={item.href} className={styles.card}>
      {content}
    </Link>
  );
};