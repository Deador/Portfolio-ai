# Отчет: главная страница — аудит и предложение архитектуры (заново в текущем проекте)

**Дата:** 2026-08-13
**Статус:** Этап 0–3 завершены (изучение проекта, аудит старой главной, аудит Figma, mapping, архитектура, риски, план). Код не изменялся — ждём подтверждения владельца.
**Область:** Реализация главной страницы заново внутри текущего проекта (React/SCSS/tokens/DS), без переноса кода из старого проекта; сохранение motion-поведения.
**Эталон:** `docs/architecture.md`, `docs/design-system.md`, `docs/tokens.md`, `docs/json-case-study-architecture.md`, `docs/figma-workflow.md`, `docs/project-context.md`, `docs/agents/frontend-engineer.md`
**Аудитор:** AI agent (senior frontend / design system engineer)

> Задача: новая Home по архитектуре текущего проекта, визуально = актуальный Figma (узел `33291:4230`, file `i3ANEQ3o83zbqvSqYGSYBC`), motion = старая главная (`C:\Users\mp3ps\Documents\portfolio`). Старый код и Figma-переменные НЕ переносятся как есть.

---

## 1. Architecture audit — что уже есть в текущем проекте

**Уже реализовано и готово к использованию:**

- **Routing:** `src/app/router/index.tsx` — `/` → `HomePage` (плейсхолдер), `/case/:slug` → `CasePage` → `CaseRenderer`. `RootLayout` (`src/app/layouts/RootLayout.tsx`) — absolute overlay-шапка (`Header`, z-100) + `<main>`.
- **Tokens** (`src/shared/tokens/tokens.scss`, source `docs/tokens.md`): 17 colors, 13 spacing (4–160px), 5 radius, 20 typography (Onest, загружен через Google Fonts в `index.html`), 1 effect, 2 layout tokens; breakpoints (`_breakpoints.scss`): tablet 1024 / mobile 768, desktop-first `max-width`.
- **DS компоненты (Atoms):** `Button` (link|filled), `Tag`, `Paragraph`, `QuoteElement`, `Citate`, `TimelineStep`.
- **(Molecules):** `Title` (size L/M), `RowInfoProject`, `Results`, `CommonCard` (5 вариантов), `MetricCard`, `QuoteCard`, `PersonaCard`, `ContextSectionRow`, `ReflectionRows`, `RolesTable`.
- **(Organisms):** `Header`, `HeroSection`, `Problem/Goals/Persona/Feature/Context/Decision/Retrospective/Results/Reflection/Growth/TextImage/Chips/QuoteSection`.
- **Entities:** `CaseRenderer` (JSON-реестр), `MVPGrowthSection`, `PersonaRolesSection`; контент `src/content/cases/{acquiring,chat}` + `AssetResolver`.
- **Стили:** global + utilities + SCSS Modules, никаких hardcoded `@media` вне partial; Storybook 7 с viewports 320–1280, `defaultViewport: desktop`.

**Чего нет (не started по `project-status.md`):** Footer, Home, мобильная адаптация (для кейсов есть), home-контент.

**Необходимо:** `HomePage` собрать из новых, home-специфичных секций; не трогать `CaseRenderer`/JSON; `Button`/`Title`/`Header`/`Logo` переиспользовать или аккуратно расширить.

---

## 2. Old Home audit — старая главная (C:\Users\mp3ps\Documents\portfolio)

Проект — экспорт Figma Make (`@figma/my-make-file`), Tailwind 4 + shadcn/ui + MUI. Не git-репозиторий.

### Page structure (текущий `App.tsx`)

```text
Home (App.tsx)
├── Header          (sticky, backdrop-blur, logo "IT", nav: Telegram / Contact / Resume)
├── Hero            (имя/заголовок/bio/achievements + Unsplash-фото)
├── Experience      (3 карточки опыта, hover-эффекты)
├── FeaturedProjects (6 карточек, фильтр-пиллы, hover scale)
├── Skills          (4 колонки списков)
└── Footer          (контакт + CTA + соцсети)
```

### Animation map (по фактическому коду)

| Анимация/поведение | Файл | Триггер | Детали | Переносимость |
|---|---|---|---|---|
| Sticky header + blur | `Header.tsx` | scroll | `sticky top-0 z-50 bg-white/95 backdrop-blur` | Поведение уже есть в новом `Header` (overlay, не sticky) |
| Smooth scroll к футеру | `Header.tsx` | клик "Contact" | `footer.scrollIntoView({behavior:'smooth'})` | Поведение переносимо (scroll-to-anchor) |
| Hover карточек (shadow/border/scale img) | `Experience.tsx`, `FeaturedProjects.tsx` | hover | `transition-all duration-300`, `group-hover:scale-105 duration-500` | CSS-переходы, переносимы |
| Фильтр проектов | `FeaturedProjects.tsx` | click | `useState` переключение пиллов | НЕ в актуальном Figma (нет фильтра) |
| Hover-иконки (телега/соцсети) | `FeaturedProjects.tsx` и др. | hover | `transition-colors` | Переносимо |

### ⚠️ Важная находка — «сложные анимации»

Сложные анимации в старом проекте находятся в компонентах, которые **НЕ смонтированы в `App.tsx`**:

- `PortfolioCanvas.tsx` — **Three.js/WebGL** «бесконечный канвас»: тёмный grid, металлический центр-объект, `requestAnimationFrame`-цикл, плавающие ноды (sin-боббинг), `PointLight` за мышью, raycasting-клики, орбитальные project-ноды, камера pan/zoom/wheel.
- `NodeInfo.tsx`, `ProjectDetail.tsx` — `motion`/`AnimatePresence` glass-панели (opacity+scale, 0.3s).
- `MobileFallback.tsx` — фолбэк для мобильных.

Компоненты написаны под **другой** концепт (infinite canvas из `src/imports/product-designer-portfolio.md`) и не используются текущей старой главной.

**Вывод:** текущая старая главная — простая Tailwind-страница; «сложный motion», который нельзя потерять, технически живёт в неиспользуемых компонентах и не соответствует ни структуре старой главной, ни актуальному Figma. **Нужно решение владельца** (см. «Вопросы», Q1).

---

## 3. Figma audit — «Главная» (узел `33291:4230`, file `i3ANEQ3o83zbqvSqYGSYBC`)

Фон страницы `#E7E7EE`. Полная структура:

```text
Главная (33291:4230) — фон #E7E7EE
├── main — HERO, фон #060C17 (тёмный), ~1354px tall
│   ├── logo (SVG 63×63, по центру сверху, x689)
│   ├── [GIF] "text 3" 1440×132 на y218 — анимированная текст-полоса (gifRef c2ea...)
│   ├── "image 814" 577×400 (432,388) — showreel-картинка (imageRef 545f...)
│   ├── hero-текстблок 540px, gap 32:
│   │   ├── H1 28px Medium #EEEEEE «Меня зовут Илья. Проектирую сложные банковские системы»
│   │   ├── P 16/24 #EEEEEE «Запустил с нуля эквайринг, масштабировал чат-платформу…»
│   │   └── CTA pill «Смотреть кейсы» + стрелка 48×48 (border 1px #EEEEEE, radius 999)
│   ├── scroll-индикатор 20×102 (710,798)
│   └── badge «UI/UX» pill (bg #2E343F, radius 999, top-right)
├── content (column, gap 80, начинается ниже hero)
│   ├── ОПЫТ — заголовок 68px Medium + 3 карточки (white, radius 24, padding 24)
│   │   └── карточка: [компания 24/32 #000 + badge «текущее место»/«2022–2025»] + буллеты (точка #D9D9D9 + 16px #212121)
│   ├── КЕЙСЫ — заголовок 68px Medium + 5 карточек-кейсов (512px, radius 24, padding 64/24/24)
│   │   ├── title + подпись + tinted-image-slot (512×384, radius 16) + mockup (tablet/phone) absolute
│   │   └── navigation: линия #B1B1B1 + стрелки ◀ ▶ (56×56)
│   ├── SKILLS — фон #060C17, «Чем могу помочь вашему бизнесу?»
│   │   ├── H 28px Medium #EEEEEE + подзаголовок 16/24
│   │   ├── 3 ряда: иконка 56×56 + [заголовок #AEAEAE + описание #EEEEEE] + делинитель #292D37
│   │   └── декор «sheet» (EXPERT/UX, circle, фото)
│   └── button up — круг 120×120 #FFFFFF, стрелка + «Наверх» 14/16 #1E1E1E
```

**Ключевое:**
- **Showreel:** на hero-блоке картинка — showreel, по словам владельца **авто-ротация 3 кейсов с интервалом**. В Figma это статичный `imageRef` на узле `image 814` + анимированный GIF на `text 3`. → авто-ротацию надо реализовать как **поведение** (3 кадра + таймер + кроссфейд).
- **Footer в Figma отсутствует** (страница кончается «Наверх»). Старая главная — с футером.
- **Расхождения внутри макета:** badge «текущее место» залит `#060C17`, а badge периодов в карточках 2–3 — `#8C8C8C` (несогласованность); local style `Title/H2` в макете = **68px Medium 500**, тогда как token проекта `Title/H2` = 32px SemiBold.

**Изображения к экспорту из Figma (по правилам `docs/figma-workflow.md`):** showreel ×3 (из nodes `image 814` + вероятные соседние кадры), mockup-скрины 5 кейсов (эквайринг `82e5...`, онлайн-банк `a3a6...`, автокредит `2d17...`, страховая `a179...`, обучение `406b...` — с учётом `needsCropping`/`filenameSuffix`), логи, иконка/стрелки, фон-skills images (`c700...`, `6730...`), circle.

---

## 4. Token mapping — Figma → текущая DS

| Figma value | Existing token | Decision | Reason |
|---|---|---|---|
| `#060C17` (hero/skills bg) | — | ❌ нового токена нет | Ближайший `--color-background-dark #1f1f1f` визуально другой (синий чёрный). **Добавить**, напр. `--color-background-hero` |
| `#E7E7EE` (page bg) | `--color-background-primary #f6f7f8` | ⚠️ маппинг в Question | Близкий светло-серый, но темнее; fidelity → новый токен |
| `#EEEEEE` (текст на тёмном) | `--color-content-white #f0f0f0` | ✅ маппинг | Почти идентично |
| `#212121` (текст карточек опыта) | `--color-content-primary #1e1e1e` | ✅ маппинг | Почти идентично |
| `#1E1E1E` / `#000000` (заголовки) | `--color-content-primary` | ✅ маппинг | |
| `#AEAEAE` (заголовки skills) | `--color-content-tertiary #adadad` | ✅ маппинг | Почти идентично |
| `#B1B1B1` (линия nav карусели) | `--color-content-tertiary #adadad` | ✅ маппинг | |
| `#D9D9D9` (точки-буллеты) | `--color-avatar-placeholder #d9dade` | ⚠️ токен с другим значением | Семантически чужой коллекции; кандидат в новый нейтральный маркер |
| `#8C8C8C` (badge периодов) | — | ❌ нового нет | Neut-градиент; кандидат в новый токен |
| `#2E343F` (пилл «UI/UX») | — | ❌ нового нет | Кандидат в новый токен или карточки решения |
| `#292D37` (делинители 1px) | — | ❌ нового нет | Кандидат в новый токен |
| radius `999` (пиллы) | max `--radius-24` | ⚠️ нет пилл-токена | **Добавить** `--radius-pill: 999px` |
| radius `24` / `16` (карточки) | `--radius-24` / `--radius-16` | ✅ маппинг | |
| **68px Medium** (заголовки Опыт/Кейсы) | `--title-h-result` 56/700, `--title-h1` 40/600 | ❌ точного нет | Figma local `Title/H2`=68px Medium конфликтует с DS. Кандидат `--title-display: 500 68px/1.3`. **Требует решения владельца** (см. Q3) |
| **28px Medium** (вводные H1/подзаголовки) | `--text-xl` 24/400 | ❌ точного нет | Кандидат `--title-h2-home` / map→text-xl. Требует решения (Q3) |
| `24/32` имя компании | `--title-h3` 500 24/1.3 | ✅ маппинг | 500/24px; line-height близко |
| `16/24` тело | `--text-s` 16/1.5 (24px) | ✅ маппинг | |
| `14/16` «Наверх» | `--text-s-xs` 14/16 | ✅ маппинг | |
| spacing `80` (gap блоков) | `--spacing-x20` | ✅ маппинг | |
| spacing `120` (gap секций) | — (max 160) | ⚠️ | Кандидат `--spacing-x30: 120px` (Q3) |
| spacing `64` (padding карточек кейсов) | — (`x15` 60, `x18` 72) | ⚠️ | Кандидат `--spacing-x16: 64px` (Q3) |
| spacing `32` / `24` / `16` / `8` | `x8`/`x6`/`x4`/`x2` | ✅ маппинг | |

**Итог:** ~5 новых цветов (hero-bg, page-bg?, маркер/делинители/пилл-серые), 1 radius (pill), 2–3 typography (display 68, intro 28), 1–2 spacing (120, 64). Все новые значения — **из Figma, не из головы**; первоначально обсудить с владельцем (Q3).

---

## 5. Component mapping

| Figma block | Existing component | New | Decision |
|---|---|---|---|
| Hero (тёмный, showreel, CTA) | `HeroSection` (case-вариант, другой дизайн) | `HomeHeroSection` | **Новый, page-specific** (в `Home/`) |
| Logo (по центру геро) | `Logo` | — | **Переиспользовать** `Logo` |
| CTA-pill «Смотреть кейсы» | `Button` (link\|filled) | расширить `Button` | **Рекомендую** новый `variant="outline"` (border 1px + pill radius) — расширение DS, без дубликата (Q4) |
| scroll-индикатор | — | `HomeScrollIndicator` | page-specific, в составе hero |
| Пилл «UI/UX» | `Tag` | —/расширить | `Tag` слишком специфичен (тёмный); **решение Q4** |
| Заголовки «Опыт/Кейсы» | `Title` (size L/M) | — | Переиспользовать `Title`, если появится display-токен; иначе локальный размер |
| Карточки опыта | `CommonCard` (не тот паттерн) | `HomeExperienceCard` (или композиция в `HomeExperienceSection`) | Новый, page-specific |
| Карусель кейсов + карточки | — | `HomeCasesSection` + `HomeCaseCard` | Новый, page-specific; паттерн слайдера (Q5) |
| Skills | — | `HomeSkillsSection` | Новый, page-specific |
| «Наверх» кнопка | — | `HomeScrollTopButton` | page-specific |
| Footer | — | (нет в Figma) | **вопрос Q2** |

Правило выдержано: в `shared` выносим только универсальное (`Button`+variant, `Logo`, `Tag`); всё home-специфичное — в `Home/`.

---

## 6. Proposed Home architecture

```text
src/
├── app/pages/Home/                       ← новая папка (страница)
│   ├── HomePage.tsx                      ← страница (композиция секций)
│   ├── HomePage.module.scss
│   ├── sections/
│   │   ├── HomeHero/
│   │   ├── HomeExperience/
│   │   ├── HomeCases/                    ← карусель + карточка кейса
│   │   ├── HomeSkills/
│   │   └── HomeScrollTop/
│   ├── hooks/                            ← showreel-таймер, carousel-state, scroll-to-top
│   └── data.ts                           ← типизированный home-контент (тексты, опыт, кейсы, скиллы)
├── content/home/images/                  ← экспортированные из Figma ассеты home
├── shared/ui/atoms/Button/+variant        ← расширение (outline/pill)
└── shared/tokens/tokens.scss (+tokens.md) ← новые токены (после решения)
```

Принципы:
- Страница остаётся **обычной страницей** (роут `/` уже есть) — не отдельное мини-приложение.
- Контент отделён от UI через `data.ts` (типизированный), UI не знает про JSON-кейсы. `CaseRenderer`/JSON **не трогаем**.
- Секции — page-scoped, ничего не дублируем в `shared` без реальной переиспользуемости.
- **Требует расширения `architecture.md`:** добавление папки `src/app/pages/Home/*` — это документируемое решение (Q6).

---

## 7. Risks

1. **Carousel (Кейсы):** 5 карточек × 512px = переполнение. Без готового слайдера в зависимостях (в текущем проекте нет framer-motion/embla). Варианты: CSS scroll-snap + авто-progress + стрелки (без зависимостей) **или** добавить `embla-carousel-react` (уже есть в старом проекте). Требует решения (Q5).
2. **Showreel auto-rotation:** нужны 3 кадра (экспорт из Figma), таймер с паузой на hover, кроссфейд, `prefers-reduced-motion`. Большая часть контента — скриншоты кейсов (мелкий текст → нечитаемость на мобильных, как у кейсов).
3. **GIF «text 3»:** в Figma — анимированный GIF поверх hero; в проде: экспорт `.gif` как `<img>` — ок, но тяжеловесно/недостижимо по качеству; альтернатива — перерисовать как CSS-анимацию. Решение (Q7).
4. **Header на тёмном hero:** текущий `RootLayout`/`Header` заточен под светлые страницы (тёмный текст, dark-CB). На тёмном hero нужен инвертированный вариант. Минимум — вариант/prop у `Header` или home-специфичная шапка.
5. **Token gaps:** новые значения (тёмный `#060C17`, page-bg, 68px, 28px, 120/64, pill) — токены источник истины; молча добавлять нельзя (решение владельца).
6. **Внутренние расхождения макета:** badge `#060C17` vs `#8C8C8C`; local `Title/H2 68px` vs DS 32px; отсутствие футера. Report, не исправлять молча.
7. **«Сложные анимации» из старого проекта не смонтированы** в его главной (Three.js/motion). Есть риск «переносить то, чего нет» → спросить владельца.

---

## 8. Implementation plan

1. **Approval:** ответы на Q1–Q6 + утверждение новых токенов.
2. **Tokens:** добавить согласованные токены в `tokens.scss` + `docs/tokens.md`.
3. **Exports (Figma):** по правилам `docs/figma-workflow.md` выгрузить в `src/content/home/images/`: showreel ×3, mockup ×5 (кейсы), logo/иконки (при необходимости), декор-фоны skills.
4. **Data layer:** `Home/data.ts` (тексты hero, опыт ×3, кейсы ×5, skills ×3) + типы.
5. **DS-расширения:** `Button` variant `outline` (pill), при необходимости `Tag` variant / новый цвет. Storybook-стори.
6. **Секции (page-scoped):** `HomeHero` (тёмный, showreel-кроссфейд, CTA, scroll-indicator, «UI/UX»), `HomeExperience`, `HomeCases` (слайдер+arrows), `HomeSkills`, `HomeScrollTop`. SCSS Modules + токены + breakpoints.
7. **Router/Layout:** `/` → `HomePage` (уже маршрут), решить судьбу `Header` на home (variant на тёмном) и Footer (вопрос Q2).
8. **Responsive:** desktop-first, viewports 320/375/430/768/1024/1280+: карусель (mobile — scroll-snap), карточки опыта в колонку, hero-текст, height hero, кнопка «Наверх».
9. **Animation integration:** showreel (таймер+пауза), авто-прокрутка карусели, scroll-to-top, hover-переходы (из старого), smooth-scroll; уважать `prefers-reduced-motion`.
10. **Validation:** `npm run type-check`, `lint`, `build`, `build-storybook`; Storybook-стори для каждой секции + страницы; ручная сверка с Figma и со старой главной (motion).

---

## ❓ Вопросы — жду подтверждения

1. **Какие «сложные анимации» из старого проекта сохранить?** В его главной (`App.tsx`) только: sticky header, smooth scroll, hover-переходы, фильтр-FeaturedProjects. Three.js «infinite canvas» и motion-панели (`PortfolioCanvas/ProjectDetail/NodeInfo`) — **не смонтированы** в старой главной и не соответствуют актуальному Figma. Сохранять ли их поведение, или motion-интересы = showreel + карусель + hover/scroll?
2. **Footer:** в актуальном Figma его нет, в старой главной есть. Ставить ли футер на новую главную (и тогда какой — есть черновики?).
3. **Новые токены** (hero-bg `#060C17`, page-bg `#E7E7EE`, display-заголовок 68px, intro 28px, spacing 120/64, radius-pill, серые `#8C8C8C/#2E343F/#292D37/#D9D9D9`) — утвердить?
4. **CTA «Смотреть кейсы» и пилл «UI/UX»:** расширять `Button` (`variant="outline"`) и `Tag`, или делать home-специфичные?
5. **Карусель кейсов:** без зависимостей (scroll-snap + авто) или добавить `embla-carousel-react` (есть в старом проекте)? Сколько карточек видимо одновременно и нужна ли авто-прокрутка?
6. **Папка `src/app/pages/Home/*`** — подтвердить (небольшое расширение `architecture.md`).
7. **GIF-полоса «text 3»** — экспорт GIF как есть, или перерисовать CSS-анимацией?

---

## ✅ Решения владельца (ответы)

1. **Showreel** — оставить (авто-ротация кадров). Реализовано: 1 кадр сейчас + механизм кроссфейд-ротации (`useShowreel`).
2. **Footer** — отдельная задача, на главную пока не ставить.
3. **Токены:** hero-bg `#060C17` — да (`--color-background-hero`); page-bg → существующий `--color-background-primary`; 68px — создать `--title-display`; 28px → использовать существующий 24px-токен заголовков (не создавать новый); создать по правилам ДС (добавлен также `--color-background-hero-line: #292d37` для делинителей skills, spacing `--spacing-x16/x30`).
4. **Button** — расширять (не круглые, существующий `--radius-8`): добавлен `type="outline"` + `inverted`. Теги — готовый `Tag`.
5. **Кейсы** — 3 карточки в ряд, stretch 100%, без карусели, со ссылками. 3-я карточка — заглушка «Скоро» (Mobile Banking), изображение из Figma, без ссылки.
6. **Папка** `src/app/pages/Home/*` — да (обновлена `architecture.md`).
7. **GIF** — вставить как есть. ⚠️ `text-3.gif` = 15 МБ — для production нужна оптимизация.

## 📌 Статус реализации

- Реализовано: токены, DS-расширения (Button/Header/Title), `pages/Home/*` (data + useShowreel + HomeHero + HomeExperience + HomeCases/HomeCaseCard + HomeSkills + HomeScrollTop + стори), роутер с `headerTheme`, удалён старый плейсхолдер. Проверки (type-check/lint/build/build-storybook) зелёные.
- Не реализовано (осознанные упрощения): декоративный «sheet» в Skills (фото/круг выгружены), футер.
- Внимание: в Figma у рядов навыков **нет** иконок 56×56 (в аудите выше они упоминались ошибочно) — только `[title] + [description]` и делинители `#292D37`.