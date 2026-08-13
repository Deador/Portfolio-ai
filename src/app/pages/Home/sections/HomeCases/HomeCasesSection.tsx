import React from 'react';
import styles from './HomeCasesSection.module.scss';
import { Title } from '../../../../../shared/ui/molecules/Title/Title';
import { HomeCaseItem } from '../../data';
import { HomeCaseCard } from './HomeCaseCard';

interface HomeCasesSectionProps {
  /**
   * Section heading (display, 68px)
   */
  title: string;

  /**
   * Case cards (3 в ряд, растягиваются на 100%)
   */
  items: HomeCaseItem[];

  /**
   * Anchor id (CTA «Смотреть кейсы» скроллит сюда)
   */
  id?: string;
}

/**
 * HomeCasesSection
 *
 * Секция «Кейсы»: заголовок + ряд карточек кейсов.
 * Карточки растягиваются на всю ширину ряда (3 в ряд).
 */
export const HomeCasesSection: React.FC<HomeCasesSectionProps> = ({
  title,
  items,
  id,
}) => {
  return (
    <section id={id} className={styles.section}>
      <Title size="XL">{title}</Title>

      <div className={styles.cards}>
        {items.map((item, index) => (
          <HomeCaseCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};