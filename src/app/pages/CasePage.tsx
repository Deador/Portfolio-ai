import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CasePage.module.scss';
import { CaseRenderer } from '../../entities/case/CaseRenderer';
import acquiringCase from '../../content/cases/acquiring/case.json';
import chatCase from '../../content/cases/chat/case.json';

const caseDocuments: Record<string, unknown> = {
  acquiring: acquiringCase,
  chat: chatCase,
};

const SITE_URL = 'https://trifonovprod.ru';

const DEFAULT_SEO = {
  title: 'Илья Трифонов — продуктовый дизайнер сложных банковских систем',
  description:
    'Пять лет проектирую B2B- и B2C-продукты в банках: эквайринг с нуля, enterprise-платформа коммуникации на 285+ сотрудников, виртуальный помощник в инвестиционном продукте.',
  url: SITE_URL,
  image: `${SITE_URL}/og-cover.png`,
  imageWidth: '1200',
  imageHeight: '630',
};

interface CaseSeo {
  title: string;
  description: string;
  path: string;
  image: string;
  imageWidth: string;
  imageHeight: string;
}

// SEO-тексты и превью не берутся из case.json (контент кейса не трогаем) —
// изображения те же файлы, что в карточках секции «Кейсы» на главной
// (src/content/home/images/case-*.png), скопированы в public/ под
// стабильными именами: исходники в src/content хешируются при сборке
// Vite, стабильный абсолютный URL для og:image нужен только из public/.
const CASE_SEO: Record<string, CaseSeo> = {
  acquiring: {
    title: 'Система обработки заявок на эквайринг — Илья Трифонов',
    description:
      'Внутренняя B2B-платформа банка: объединил работу менеджеров, службы безопасности и инженеров в одном процессе. Срок подключения эквайринга сократился с 18 до 2 дней.',
    path: '/case/acquiring',
    image: `${SITE_URL}/og-acquiring.png`,
    imageWidth: '928',
    imageHeight: '768',
  },
  chat: {
    title: 'Единая платформа коммуникации для подразделений банка — Илья Трифонов',
    description:
      'Enterprise-платформа: перевёл персональных брокеров с вендорского решения, 285+ сотрудников, ролевая модель на четыре роли.',
    path: '/case/chat',
    image: `${SITE_URL}/og-chat.png`,
    imageWidth: '928',
    imageHeight: '768',
  },
};

function setMetaAttr(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

function applySeo(seo: { title: string; description: string; url: string; image: string; imageWidth: string; imageHeight: string }) {
  document.title = seo.title;
  setMetaAttr('meta[name="description"]', 'content', seo.description);
  setMetaAttr('meta[property="og:title"]', 'content', seo.title);
  setMetaAttr('meta[property="og:description"]', 'content', seo.description);
  setMetaAttr('meta[property="og:url"]', 'content', seo.url);
  setMetaAttr('meta[property="og:image"]', 'content', seo.image);
  setMetaAttr('meta[property="og:image:width"]', 'content', seo.imageWidth);
  setMetaAttr('meta[property="og:image:height"]', 'content', seo.imageHeight);
  setMetaAttr('meta[name="twitter:title"]', 'content', seo.title);
  setMetaAttr('meta[name="twitter:description"]', 'content', seo.description);
  setMetaAttr('meta[name="twitter:image"]', 'content', seo.image);
  setMetaAttr('link[rel="canonical"]', 'href', seo.url);
}

/**
 * CasePage
 * Router wrapper for case study pages
 *
 * Routes case slugs to specific case study components:
 * - /case/acquiring → CaseRenderer (JSON-driven)
 * - /case/chat → CaseRenderer (JSON-driven)
 * - /case/* → 404 or placeholder
 */
const CasePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const caseData = caseDocuments[slug ?? ''];
  const seo = CASE_SEO[slug ?? ''];

  useEffect(() => {
    if (!seo) {
      return undefined;
    }

    applySeo({ ...seo, url: `${SITE_URL}${seo.path}` });

    return () => {
      applySeo(DEFAULT_SEO);
    };
  }, [seo]);

  if (caseData) {
    return <CaseRenderer caseData={caseData as Parameters<typeof CaseRenderer>[0]['caseData']} />;
  }

  // Unknown case - show placeholder
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Case Study</h1>
        <p className={styles.text}>
          Case: <strong>{slug}</strong>
        </p>
        <p className={styles.text}>
          This case study is not yet available.
        </p>
      </div>
    </main>
  );
};

export default CasePage;
