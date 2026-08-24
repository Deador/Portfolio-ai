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
  badge: string;
  /**
   * Тег в строке с названием компании (тёмный Tag default — статус,
   * напр. «текущее место»). Без флага — период: тег под названием
   * отдельной строкой (Tag light), как в Figma 33291:4250 (карты 2–3).
   */
  badgeInline?: boolean;
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
    heading: 'Меня зовут Илья. Проектирую сложные банковские системы',
    description:
      'Запустил с нуля эквайринг, масштабировал чат-платформу на 300+ сотрудников и провёл редизайн мобильного приложения. Работал с командами разработки, аналитиками и бизнесом.',
    ctaText: 'Смотреть кейсы',
    showreelFrames: [
      // Порядок показа = порядок в массиве (Figma «Ассеты» 33313:3555,
      // узлы showreel01 → showreel02 → showreel03).
      { src: showreel1, alt: 'Showreel — работы' },
      { src: showreel2, alt: 'Showreel — работы' },
      { src: showreel3, alt: 'Showreel — работы' },
    ],
    marqueeText: 'Проектирую дизайн мобильных и веб интерфейсов',
  },
  experience: [
    {
      company: 'БКС банк',
      badge: 'текущее место',
      badgeInline: true,
      bullets: [
        '~1,5 млн ₽ экономии в год (отключение подписок брокеров)',
        'Масштабирование чат-платформы на брокеров и контакт-центр',
        '2 новых отдела, 300+ сотрудников',
        'Ролевая модель: оператор, супервизор, админ',
        'Сложный кейс: замещающие брокеры (ошибка → решение)',
      ],
    },
    {
      company: 'Simbirsoft (Ак Барс банк)',
      badge: '2022 – 2025',
      bullets: [
        'Эквайринг с нуля (B2B) — сократил обработку заявок с 18 дней → 2 дня',
        'Редизайн онлайн банка — +3% CSAT, –11% обращений в поддержку',
      ],
    },
    {
      company: 'Simbirsoft (начало карьеры)',
      badge: '2021 – 2022',
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