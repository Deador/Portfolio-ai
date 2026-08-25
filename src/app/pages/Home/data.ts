// Home content data
// Типизированный контент главной страницы, отделён от UI.
// Значения — из Figma (канвас «Главная» 33291:4230).

import showreel1 from '../../../content/home/images/showreel-1.png';
import showreel2 from '../../../content/home/images/showreel-2.png';
import showreel3 from '../../../content/home/images/showreel-3.png';
import caseEkvairing from '../../../content/home/images/case-ekvairing.png';
import caseChatPlatform from '../../../content/home/images/case-chat-platform.png';
import caseMobileBank from '../../../content/home/images/preview-mobile-bank.png';

export interface ShowreelFrame {
  src: string;
  alt: string;
}

export interface HomeExperienceItem {
  company: string;
  /**
   * Тег в строке с названием компании (тёмный Tag default — статус,
   * напр. «текущее место»), как в Figma 33291:4250 (карта 1).
   */
  statusBadge?: string;
  /**
   * Тег периода под названием (Tag light), как в Figma 33291:4250 (карты 2–3).
   */
  periodBadge?: string;
  /**
   * Подпись роли рядом с тегом периода (напр. «единственный дизайнер продукта»).
   */
  roleNote?: string;
  bullets: string[];
}

export interface HomeCaseItem {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  /**
   * Внутренний маршрут (`/case/*`) или внешний URL (`https://*`,
   * открывается в новой вкладке). Без `href` карточка не ссылочная.
   */
  href?: string;
}

export interface HomeSkill {
  title: string;
  description: string;
}

export interface HomeHeroData {
  heading: string;
  description: string;
  ctaText: string;
  showreelFrames: ShowreelFrame[];
  marqueeText: string;
}

export interface HomeContent {
  hero: HomeHeroData;
  experience: HomeExperienceItem[];
  cases: HomeCaseItem[];
  skills: HomeSkill[];
}

export const homeContent: HomeContent = {
  hero: {
    heading: 'Меня зовут Илья. Пять лет проектирую B2B- и B2C-продукты в банках',
    description:
      'Эквайринг с нуля, enterprise-платформа коммуникации на 285+ сотрудников, виртуальный помощник в инвестиционном продукте. Работал с командами разработки, аналитиками и бизнесом.',
    ctaText: 'Смотреть кейсы',
    showreelFrames: [
      // Порядок показа = порядок в массиве (Figma «Ассеты» 33313:3555,
      // узлы showreel01 → showreel02 → showreel03).
      { src: showreel1, alt: 'Showreel — работы' },
      { src: showreel2, alt: 'Showreel — работы' },
      { src: showreel3, alt: 'Showreel — работы' },
    ],
    marqueeText: 'Продуктовый дизайнер сложных банковских систем',
  },
  experience: [
    {
      company: 'БКС банк',
      statusBadge: 'текущее место',
      periodBadge: '2025 — н.в.',
      bullets: [
        'Виртуальный помощник (B2C) — собрал процесс работы над продуктом с нуля',
        'Перевёл брокеров на единую платформу — 285+ сотрудников',
        'Спроектировал рабочее место контакт-центра',
        '~1,5 млн ₽ — годовые лицензии вендора',
      ],
    },
    {
      company: 'Simbirsoft (Ак Барс банк)',
      periodBadge: '2022 – 2025',
      roleNote: 'единственный дизайнер продукта',
      bullets: [
        'Эквайринг с нуля (B2B) — сократил обработку заявок с 18 дней → 2 дня',
        'Редизайн онлайн банка — +3% CSAT, –11% обращений в поддержку',
        'Внедрил дизайн-ревью — –39% дефектов на фронте',
      ],
    },
    {
      company: 'Simbirsoft (начало карьеры)',
      periodBadge: '2021 – 2022',
      bullets: [
        'Адаптация в продуктовой команде',
        'Конструктор квизов и админка для менеджеров банка (быстрый запуск любых опросов)',
      ],
    },
  ],
  cases: [
    {
      title: 'Система обработки заявок на эквайринг',
      subtitle: 'Финтех, btb приложение, разработка с нуля',
      image: caseEkvairing,
      imageAlt: 'Система обработки заявок на эквайринг',
      href: '/case/acquiring',
    },
    {
      title: 'Единая платформа коммуникации',
      subtitle: 'Финтех, b2b приложение, масштабирование на брокеров и контакт-центр',
      image: caseChatPlatform,
      imageAlt: 'Единая платформа коммуникации',
      href: '/case/chat',
    },
    {
      title: 'Редизайн онлайн банка',
      subtitle: 'Финтех, мобильное приложение, UX исследования, гипотезы',
      image: caseMobileBank,
      imageAlt: 'Редизайн онлайн банка — мобильное приложение',
      // Кейс в редизайне — ведёт на версию старого сайта (новая вкладка).
      href: 'https://trifonovilyades.tilda.ws/case01',
    },
  ],
  skills: [
    {
      title: 'Продуктовый дизайн',
      description:
        'Проектирование сложных B2B и B2C интерфейсов, создание сценариев (user flow), интерактивных прототипов, развитие дизайн-систем под задачи бизнеса',
    },
    {
      title: 'Исследования и данные',
      description:
        'Глубинные интервью, юзабилити-тесты, A/B-эксперименты, анализ метрик, отзывов и обращений в поддержку',
    },
    {
      title: 'Работа с командой',
      description:
        'Дизайн-ревью, наставничество, коммуникация с разработкой, аналитикой и бизнесом, защита решений',
    },
  ],
};