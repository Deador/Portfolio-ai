# Homepage Audit v2 — ревью текущей реализации против Figma и legacy

Дата: 22.08.2026
Статус: исследовательский этап, код не менялся
Источники:
- **Figma** (visual source of truth): канвас «Главная» `33291:4230`, файл `i3ANEQ3o83zbqvSqYGSYBC` — данные выгружены заново по узлам `4230/4231/4236/4250/4318/4337`
- **Legacy**: `C:\Users\mp3ps\Documents\portfolio` (React + Tailwind) — reference поведения
- **Текущий проект**: `src/app/pages/Home/*` — source of truth архитектуры
Предыдущие отчёты: `report/home-page-rebuild-audit.md`, `report/home-page-figma-parity-report.md` (13.08), `report/iteration-3-change-list.md`

---

## 1. Executive Summary

Главная уже реализована в архитектуре текущего проекта (`pages/Home/*`) и после итераций 1–3.2 находится в хорошем состоянии: структура повторяет Figma-канвас, все визуальные значения идут из токенов, используются DS-атомы (`Button`, `Tag`, `Title`), у каждой секции есть Storybook-стори.

**Пересобирать ничего не нужно.** Базовое действие — точечный refactor.

Ключевые выводы:

1. **Сохранить**: композицию страницы, hero (marquee вместо GIF — решение владельца, scroll-индикатор с анимацией, showreel), «Опыт», слоты кейсов с композитными PNG, «Навыки» со sheet, кнопку «Наверх». Всё это соответствует Figma или является задокументированным решением владельца.
2. **Исправить** (ошибки реализации, оставшиеся от итераций):
   - внутренний gap карточки кейса: title→subtitle = 32px, в Figma текстовый блок gap **16px**;
   - бейдж «UI/UX»: шрифт 14px vs Figma 16px, padding 4/8 vs 10;
   - мелкая типографика «Опыта» (см. §3).
3. **Из legacy терять нечего**: сложных анимаций в активном коде legacy нет (только CSS-hover). Поведение (smooth-scroll, hover-тени) уже воспроизведено.
4. **Осознанные отклонения от Figma** (решения владельца, сохраняются): хедер с навигацией на главной, cap контента 1280 vs полноширинные 1376, H1 24px vs 28px, darkZone margin-top 256 vs y278, 3 карточки без карусели, chat-карточка вне макета.
5. **Открытые вопросы** (§13): высота полосы marquee vs 120px текст, судьба 28px-заголовков, навигация карусели, футер.

Оценка визуального соответствия на 1440: ~85% (после правок из §11 → ~95%).

---

## 2. Current Homepage Structure

```text
src/app/pages/Home/
├── HomePage.tsx (+ HomePage.module.scss)
│   ├── роль: композиция секций, smooth-scroll CTA→#home-cases, scrollTo top
│   ├── page-specific; фон --color-background-primary
│   └── .content: max-width --layout-page-max (1280), центр, гуттеры x8(32), gap x30(120)
├── data.ts
│   ├── типизированный контент (HomeContent) — отделён от UI ✓
│   └── импортирует изображения из src/content/home/images (page-level composition — допустимо)
├── hooks/useShowreel.ts
│   ├── кроссфейд-ротация кадров (setInterval + pause/resume + prefers-reduced-motion)
│   └── сейчас count=1 → ротация неактивна (механизм на будущее)
└── sections/
    ├── HomeHero/ (.tsx/.module.scss/.stories.tsx)
    │   ├── Marquee (inline): CSS-анимация translateX(-50%), 120s linear, reduced-motion ✓
    │   ├── ScrollIndicator (inline SVG 20×102 + @keyframes scrollDot 1.8s)
    │   ├── showreel: img кроссфейд 0.6s (useShowreel), hover pause/resume
    │   ├── textBlock: h1 (--title-h3) + p (--text-s) + Button outline/pill/inverted + ctaArrow (круг 48×48, border content-white)
    │   └── badge: Tag variant="inverted", absolute top:305 right:0
    ├── HomeExperience/
    │   └── Title XL (--title-display) + 3 article-карточки: company h3 + Tag light + ul-буллеты (dot 8px)
    ├── HomeCases/
    │   ├── HomeCasesSection: Title XL + ряд cards gap x4(16)
    │   └── HomeCaseCard: Link | article («Скоро» Tag) + title + subtitle + imageSlot (композит PNG, aspect 464/384, fill)
    ├── HomeSkills/
    │   ├── .darkZone: margin-top 256px (светлая зона), min-height 1024, bg hero
    │   ├── .inner 648px: header (540, gap24) + list (gap24: skillRow gap16 fill/fill + divider #292D37)
    │   ├── scrollTop внутри тёмной зоны (margin-top:auto)
    │   └── sheet: absolute PNG 532×366, top:0, центр
    └── HomeScrollTop/ (круглая кнопка 120×120, страничная — не DS Button)

Связанное:
├── app/router/index.tsx      → `/` = RootLayout headerTheme="inverted" + HomePage
├── app/layouts/RootLayout.tsx → Header overlay (absolute поверх контента)
└── content/home/images/      → showreel-1, case-ekvairing, case-chat-platform, skills-sheet, scroll.svg (orphan!)
```

DS-компоненты, используемые Home: `Button` (outline+pill+inverted+icon), `Tag` (default/light/inverted), `Title` (XL). Расширения атомов под главную сделаны по правилам DS (варианты, не дубликаты) — корректно.

---

## 3. Current Homepage ↔ Figma

Данные Figma выгружены заново (22.08). Сверка сверху вниз.

| Section | Figma node / значения | Current component | Visual match | Arch match | Action |
|---|---|---|---|---|---|
| Хедер главной | лого 63×63 центр `(689,24)`; навигации нет (`4237`) | полный Header overlay inverted | ❌ расхождение | ✓ (роутер/лейаут) | ❓ needs decision (владелец; см. §13 Q1) |
| Текст-полоса | GIF `4246` y218, 1440×132 | CSS Marquee 132px, старт y220 | ✅ подход одобрен (GIF→CSS, реш.) | ✓ local | ✅ keep; 🔧 вопрос подрезки текста (§13 Q2) |
| Showreel | `image 814` 577×400 @(432,388) | `.showreel` 577×400, кроссфейд | ✅ | ✓ | ✅ keep |
| Scroll-индикатор | инстанс `scroll` 20×102 @(710,798) — между showreel и текстом | inline SVG между showreel и текстом, dot-анимация | ✅ | ✓ local | ✅ keep |
| Hero H1 | `4234`: Onest Medium **28px/1.2** #EEE, w540 | `--title-h3` 24px/1.3 | 🟡 осознанно (реш.) | ✓ токен | ❓ подтвердить 24px (Q3) |
| Hero описание | `4235`: 16/24 #EEE | `--text-s` ✅ | ✅ | ✅ keep |
| CTA | `4236`: pill999, pad12/16, gap8, stroke #EEE 1px, Text/S 16, стрелка 48×48 | Button outline pill inverted (font `--text-s` 16 ✓, pad x3/x4 ✓, gap x2 ✓) + круг-стрелка 48 | ✅ (круг вокруг стрелки — одобренная интерпретация) | ✓ DS extension | ✅ keep |
| Бейдж UI/UX | `4381`: pill999 #2E343F, pad10, текст **16/24**, @(1337,305) | Tag inverted (#2E343F pill ✓) top305/right0, но `--text-s-medium` **14px**, pad x1/x2 | 🟡 | ✓ DS extension | 🔧 adjust: 16px + pad 10 |
| Hero низ | контент до ~y1230, main до 1354 (~124 тёмного) + 80 светлого до «Опыт» | padding-bottom x30 (120) + section padding-top x20 (80) | ✅ | ✅ keep |
| Заголовки секций | Title/H2 68 Medium 1.3, центр | Title XL `--title-display` | ✅ | ✅ keep |
| Опыт: ряд карточек | `4253` gap16 | `.cards` gap x4 ✅ | ✅ | ✅ keep |
| Опыт: карточка | `EL-d6045a1d` p24 r24 #FFF; header row gap8; компания→буллеты **16** (`EL-2dbb33d4`); буллеты **12** (`EL-1519dabc`) | p24 r24 white ✓, header gap8 ✓, gap16 ✓, bullets gap12 ✓ | ✅ | ✅ keep |
| Опыт: компания | 24/**32** #000000 (`style_1b9b4ec7`) | `--title-h3` 24/**31.2** #1e1e1e | 🟡 пиксель | ✅ токен | 🔧 опционально |
| Опыт: буллеты | Text/M 16/22.4 #212121; dot 8×8 #D9D9D9 offset **6** | `--text-m` ✓/#1e1e1e; dot 8 #D9DADE mt **7** | 🟡 пиксель | ✅ токен | 🔧 опционально (mt 7→6) |
| Опыт: бейджи | pill pad 2/6, текст 16: «текущее место» #060C17, периоды **#8C8C8C**; в карточках 2/3 бейдж **под** заголовком (column) | Tag default (#1f1f1f r8 14px) / light (#ECEDEE pill); всегда в строку | 🟡 упрощение (реш. «готовый Tag») | ✓ | ❓ уточнить вариант Tag (§13 Q5); позиция бейджа карточек 2/3 🟡 |
| Кейсы: структура | карусель 5 карт **512px fixed** + nav: линия 1224×1 **#B1B1B1** + стрелки **56×56** gap8 (`4328/4331/4334`) | 3 stretch-карточки, nav нет | ❌ осознанно (реш.: 3 карты, «навигацию не делай») | ✓ | ✅(реш.) / отложено |
| Кейсы: chat-карточка | отсутствует в макете | добавлена 2-й картой | ❌ осознанно (реш.) | ✓ | ✅(реш.) |
| Кейс: карточка | `layout_c3d933f8` pad **64/24/24** r24 gap32 w512; текстовый блок `EL-d8a3e5e9` gap **16** (title 24/32, subtitle 16/24); затем 32 до слота | pad 64/24/24 ✓ r24 ✓; **плоский gap 32 между title/subtitle/slot** | 🔴 gap title→subtitle 32≠16 | ✓ | 🔧 fix: вложить header+subtitle в блок gap16 |
| Кейс: subtitle | 16/**24** (`style_b31ccdd7`) | `--text-m` 16/**22.4** | 🟡 | ✅ токен | 🔧 использовать `--text-s` (16/24) |
| Кейс: слот изображения | tint rgba(.18) r16 h384 + device-mockup absolute y220 с перекрытием | композитные PNG 464×384, object-fit fill | ✅ подход одобрен (итерация 3) | ✓ | ✅ keep; 🔴 заменить плейсхолдер 3-й карты (узел `33291:4321`) |
| Ширина контента | полноширинные секции, контент **1376** | `.content` max-width **1280** | ❌ осознанно (реш. 3.1 «как страница кейса») | ✓ токен | ✅(реш.), зафиксировано |
| Навыки: светлая зона | skills group `4337`; тёмная зона `4338` на **y278** (перекрытие sheet 88px ≈ 24%) | `.darkZone` margin-top **256** (перекрытие 110px = 30%) | ❌ осознанно (реш. 3.2 «~30%») | ✓ | ✅(реш.), зафиксировано |
| Навыки: sheet | `4367` @(454,0) 532×366 | PNG absolute top0 center 532×366 | ✅ | ✓ | ✅ keep |
| Навыки: контент | `4350` w648 @(x396,y168) gap80; header 540 gap24; list gap**24**; rows gap**16** fill/fill; title **#AEAEAE**; divider stroke **#292D37** | всё совпадает (#ADADAD≈#AEAEAE через tertiary) | ✅ | ✅ keep |
| Навыки: заголовок | 28px/1.2 #EEE | `--title-h3` 24px | 🟡 осознанно (реш.) | ❓ тот же Q3 |
| Кнопка «Наверх» | `4380` 120×120, стрелка 32, «Наверх» 14/16, белая, @(660,1174) внутри тёмной зоны | точное соответствие | ✅ | ✓ страничный | ✅ keep |

Легенда Action: ✅ keep · 🔧 adjust · ♻️ refactor · 🧱 rebuild · ❌ remove · ❓ needs decision

---

## 4. Current Homepage ↔ Legacy Homepage

Legacy (`C:\Users\mp3ps\Documents\portfolio`): App.tsx рендерит Header/Hero/Experience/FeaturedProjects/Skills/Footer. Компоненты PortfolioCanvas, NodeInfo, ProjectDetail, MobileFallback **не используются** App'ом (осиротевшие).

Задача этапа — найти потерянное при переносе поведение.

| Behavior | Legacy | Current | Figma/reference | Action |
|---|---|---|---|---|
| Sticky header (`sticky top-0 z-50 bg-white/95 backdrop-blur`) | есть | нет — абсолютный overlay-хедер | На макете главной хедера-навигации нет вообще | keep current (не возвращать) |
| Hover карточек проектов (border + shadow-xl + image `scale-105` 500ms) | есть | box-shadow только (`--shadow-element`) | В Figma hover не задан | keep current; scale не возвращать — нет в Figma (приоритет Figma) |
| Smooth scroll (Header «Contact» → footer) | есть | CTA → `#home-cases`, «Наверх» → top | Соответствует новой структуре | ✅ перенесено |
| Scroll-driven animations, parallax, GSAP/Framer, IntersectionObserver, rAF, sticky-эффекты | **отсутствуют** в активном коде (`motion` импортируют только неиспользуемые NodeInfo/ProjectDetail; rAF — только в неиспользуемом PortfolioCanvas) | n/a | — | **ничего не потеряно, восстанавливать нечего** |
| Ритм отступов `max-w-7xl px-8 py-20` (1280 / гуттеры 32 / шаг 80) | да | сохранён (cap 1280, гуттеры 32, шаги 80/120) | совпадает с новым макетом | ✅ |

**Вывод:** реконструкция ничего существенного из legacy-поведения не потеряла. Единственный паттерн, которого нет в current (image scale on hover), отсутствует и в Figma — по правилам приоритета он не нужен.

---

## 5. Design System Audit

Проверка на отход AI-generated главной от DS.

**Что чисто:**
- Raw colors в стилях Home: **0** — все цвета через семантические токены.
- Raw typography: **0** — все шрифты через `--title-*`/`--text-*`.
- Дубликатов Button/Card/Tag/Typography нет; расширения сделаны вариантами существующих атомов.
- Breakpoints только из shared partial `_breakpoints.scss` (@use), захардкоженных media-query нет.
- CSS Modules везде, inline styles отсутствуют, `@use` вместо `@import`.

**Хардкод-геометрия (значения из координат Figma, локальные для страницы):**

| Значение | Где | Оценка |
|---|---|---|
| `padding-top: calc(48px + var(--spacing-x5)*2 + 132px)` | HomeHero | ⚠️ связан с высотой шапки (tech debt уже зафиксирован в project-status.md). Кандидат: токен `--layout-header-height`. Без решения владельца не вводить |
| `height: 132px` (marquee), `top: 305px` (badge), `margin-top: 10px` (scroll) | HomeHero | ок — локальная геометрия узлов Figma, прокомментирована |
| `width: 577px`, aspect-ratio 577/400 | HomeHero | ок — размер ассета |
| `margin-top: 256px`, `min-height: 1024px`, `max-width: 648px`, `width: 540px`, `padding: 168px…`, `532×366` | HomeSkills | ок — геометрия узлов `4338/4350/4351/4367`, прокомментирована |
| `border-radius: 999px` (pills, dot) | HomeHero/HomeScrollTop/Tag.light/inverted | паттерн повторяется в 5+ местах. Кандидат: `--radius-pill: 999px`. Без решения не вводить |
| `120px/88px` кнопка «Наверх», `8px` dot | локальные размеры компонентов | ок |

**Неиспользуемое:**
- `src/content/home/images/scroll.svg` — orphan (scroll-индикатор переведён на inline SVG в итерации 3). Кандидат на удаление.

**Вывод:** отхода от DS нет. Все кандидаты в новые токены (`--layout-header-height`, `--radius-pill`) — только через согласование (правило Этапа 5: не создавать молча).

---

## 6. Token Mapping

Сопоставление значений актуальной Figma с существующими токенами проекта.

| Figma value (узел) | Existing token | Status |
|---|---|---|
| #060C17 фон hero/skills | `--color-background-hero` | match |
| #292D37 делинители | `--color-background-hero-line` | match |
| #2E343F бейдж UI/UX | `--color-background-hero-badge` | match (ручной токен, доками зафиксирован) |
| #EEEEEE текст на тёмном | `--color-content-white` (#F0F0F0) | closest match — расхождение EEEEEE/F0F0F0 заметно только попиксельно; existing token приоритетен |
| #1E1E1E основной текст | `--color-content-primary` | match |
| #000000 / #212121 (карточки Опыта/Кейсов) | `--color-content-primary` | closest — raw black в код не переносим |
| #AEAEAE заголовки рядов навыков | `--color-content-tertiary` (#ADADAD) | closest |
| #D9D9D9 точки буллетов / линия scroll | `--color-avatar-placeholder` (#D9DADE) | closest |
| Title/H2 68 Medium 1.3 | `--title-display` | match |
| H1 hero/skills 28 Medium 1.2 | `--title-h3` (24px) | отклонение по решению владельца; если вернём 28 — кандидат `--title-intro` (не создавать молча) |
| Text/S 16 (CTA, описания) | `--text-s` (16/1.5=24) | match по метрикам 16/24 |
| Text/M 16/22.4 | `--text-m` | match |
| 16/24 subtitle кейса | `--text-s` | closest (сейчас стоит `--text-m` 22.4 → заменить) |
| Spacing 4/8/12/16/20/24/32/40/48/64/80/120 | `--spacing-x1…x30` | match |
| radius 24 / 16 | `--radius-24` / `--radius-16` | match |
| pill 999px | нет токена | missing — кандидат `--radius-pill` (согласовать) |
| #B1B1B1 линия карусели (отложена) | нет | missing — решить при реализации навигации (ближайший tertiary #ADADAD) |
| rgba-тинты слотов кейсов | запечены в композитные PNG | n/a (одобренный подход) |

Правило соблюдено: новые токены не создавались молча; все «closest» замены используют существующие семантические токены.

---

## 7. Component Audit

| Component | Вердикт | Обоснование |
|---|---|---|
| `pages/Home/HomePage.tsx` + scss | **Keep** | тонкая композиция, обработчики скролла, токены |
| `pages/Home/data.ts` | **Keep** | типизированный контент, отделён от UI; обновить только контент 3-й карты |
| `hooks/useShowreel` | **Keep** | спящий механизм (1 кадр); чистый, учитывает reduced-motion |
| `sections/HomeHero` | **Refactor (лёгкий)** | поправить типографику бейджа; решение по marquee-подрезке; иначе чистый |
| `Marquee` / `ScrollIndicator` (внутри HomeHero) | **Local** | page-specific паттерны; в shared не выносить (использование в единственном экземпляре) |
| `sections/HomeExperienceSection` | **Keep** (+опциональная полировка: mt точки 7→6) | соответствует Figma |
| `sections/HomeCasesSection` | **Keep** | |
| `sections/HomeCaseCard` | **Refactor** | вложить header+subtitle в текстовый блок gap16; пересмотреть токен subtitle |
| `sections/HomeSkillsSection` | **Keep** | геометрия соответствует Figma + оверрайды владельца задокументированы |
| `sections/HomeScrollTopButton` | **Keep** | точное соответствие `4380` |
| DS `Button` (outline/pill/inverted/icon) | **Keep** | расширение API было согласовано, дублей нет |
| DS `Tag` (default/light/inverted) | **Keep** / возможно **adjust** вариантов (Q5) | цвета/шрифт бейджей опыта расходятся с Figma-пиллами |
| DS `Title` XL | **Keep** | |

Replace/Extract/Remove: замен нет; extract не требуется; remove — только ассет `scroll.svg`.

---

## 8. Motion / Interaction Audit

Текущий инвентарь motion:

| Механизм | Реализация | Figma/legacy reference | Статус |
|---|---|---|---|
| Marquee loop | CSS keyframes, `translateX(-50%)`, 120s linear infinite, два дубля группы | Figma: GIF `4246` (анимированная полоса) | ✅ осознанная замена; скорость согласована (замедлена ×4) |
| Scroll-dot анимация | CSS `@keyframes scrollDot` 1.8s ease-in-out infinite | Figma-компонент `scroll` статичен; анимация — авторская интерпретация (одобрена) | ✅ keep |
| Showreel кроссфейд | `useShowreel` + opacity transition 0.6s, pause on hover, reduced-motion | Решение владельца (showreel «1 кадр + механизм ротации») | ✅ keep (спит) |
| Card/button hover | `box-shadow: var(--shadow-element)` transition 0.2s | В Figma hover не специфицирован | ✅ достаточно |
| Smooth scroll | `scrollIntoView({behavior:'smooth'})` (CTA), `window.scrollTo` («Наверх») | Legacy-паттерн | ✅ |
| Reduced-motion | отключает marquee и showreel-ротацию | a11y best practice | ✅ |

GSAP / Framer Motion / IntersectionObserver / rAF / глобальные listeners: **не требуются** — ни Figma, ни legacy их не задают для главной. Новую animation architecture не создаём (правило Этапа 10).

Единственное открытое motion-решение — поведение стрелок карусели, если владелец её утвердит (сейчас отложено).

---

## 9. Responsive Audit

Модель проекта: desktop-first, shared partial `_breakpoints.scss` (tablet ≤1024, mobile ≤768), гуттеры 32→24(tablet)/16(mobile). JSON-driven кейсы не затрагиваем.

Текущее поведение Home:

| Range | Поведение | Оценка |
|---|---|---|
| 1440+ | контент 1280 по центру, hero/skills полноширинные | ✅ |
| 1024–1440 | то же, карточки сжимаются (flex 1 1 0) | ✅ |
| ≤1024 (tablet) | карточки Опыта/Кейсов → колонка; паддинги hero меньше | ✅ консистентно с моделью |
| ≤768 (mobile) | marquee/badge/scroll скрыты; sheet скрыт, светлая зона убрана, darkZone min-height:0; skillRow → колонка; «Наверх» 88×88; гуттеры 16, gap блоков 48 | ✅ разумно, соответствует модели |
| 320–430 | showreel `max-width:100%` ok; заголовки **не флюидны**: `--title-display` 68px остаётся 68px (Title XL без media-override), H1 24px ok | ⚠️ 68px на 320px даст 2–3 строки с переносами — проверить визуально; в Figma мобильного макета главной нет |

Проблемы/вопросы:
1. Нет HomeMobile/HomeDesktop — ✅ правило соблюдено.
2. Флюидность `--title-display` на 320–430 — единственный реальный риск; мобильного макета в Figma нет → решение владельца (оставить как есть / добавить mobile-размер в Title).
3. `aspect-ratio 464/384` слотов на узких экранах делает превью низковатым — приемлемо, проверить визуально.

---

## 10. Target Architecture

Структура после исправлений — **без изменений иерархии**; меняются только внутренности двух секций и контент:

```text
src/app/pages/Home/
├── HomePage.tsx                 # keep
├── HomePage.module.scss         # keep
├── data.ts                      # keep (обновить изображение 3-й карты)
├── hooks/useShowreel.ts         # keep
└── sections/
    ├── HomeHero/                # refactor-lite: бейдж 16px/pad10; (опц.) marquee-высота
    │   ├── HomeHero.tsx
    │   ├── HomeHero.module.scss
    │   └── HomeHero.stories.tsx
    ├── HomeExperience/          # keep (+опц. dot mt 7→6)
    ├── HomeCases/
    │   ├── HomeCasesSection.*   # keep
    │   └── HomeCaseCard.*       # refactor: text-block gap16, subtitle token
    ├── HomeSkills/              # keep
    └── HomeScrollTop/           # keep

src/content/home/images/
└── …                            # +case-banking.png (из узла 33291:4321), −scroll.svg (orphan)
```

Никаких новых папок, новых слоёв, нового animation-слоя. Архитектура соответствует `docs/architecture.md`.

---

## 11. Required Changes

Приоритизированный список изменений (для будущих итераций, код сейчас не трогаем):

| # | Изменение | Тип | Приоритет | Файлы |
|---|---|---|---|---|
| 1 | Карточка кейса: обернуть header+subtitle в текстовый блок с gap 16 (сейчас плоский gap 32) | fix | 🔴 | `HomeCaseCard.tsx/.module.scss` |
| 2 | Заменить изображение-плейсхолдер 3-й карты «Редизайн онлайн банка» на композит из Figma (узел `33291:4321`: тинт rgba(0,177,114,.18) + iphone 348×704) | asset/content | 🔴 | `content/home/images/`, `data.ts` |
| 3 | Бейдж «UI/UX»: текст 14→16px, padding →10px (уточнить Tag.inverted или локальный override) | fix | 🟠 | `Tag.module.scss` или `HomeHero.module.scss` |
| 4 | Subtitle кейса: `--text-m`(22.4) → `--text-s`(16/24) под метрики Figma | fix | 🟠 | `HomeCaseCard.module.scss` |
| 5 | Marquee: решить подрезку текста 120px/1.3 (156px) в полосе 132px — высота полосы vs размер шрифта (Q2) | decision+fix | 🟠 | `tokens.scss`/`HomeHero.module.scss` |
| 6 | Удалить orphan `content/home/images/scroll.svg` | cleanup | 🟢 | assets |
| 7 | Опыт: dot margin-top 7→6; (опц.) компания/цвета привести к токенам строго | polish | 🟢 | `HomeExperienceSection.module.scss` |
| 8 | H1 hero/skills 24 vs 28px — подтвердить или вернуть 28 (Q3) | decision | 🟠 | tokens + Hero/Skills |
| 9 | Бейджи опыта: приблизить Tag к Figma (#060C17/#8C8C8C, текст 16) или зафиксировать отказ (Q5) | decision | 🟡 | `Tag` |
| 10 | Позиция бейджа в карточках Опыта 2/3 (под заголовком, как в Figma) или зафиксировать inline | decision | 🟢 | `HomeExperienceSection` |
| 11 | Флюидность `--title-display` на 320–430 (Q4) | decision | 🟢 | `Title` |
| 12 | Хедер на главной: лого по центру vs полный Header (Q1) | decision | 🔴 | router/RootLayout/Header |

Отдельно (за рамками аудита, отложены владельцем): навигация карусели кейсов, футер.

---

## 12. Risks

1. **Хедер-решение (№12)** затрагивает роутинг/лейаут — изменение общего каркаса, требует отдельного согласования.
2. **Tag.inverted правка (№3)** — это DS-атом; изменение затронет стори/других потребителей. Правильнее уточнить вариант, а не хардкодить локально.
3. **Композитные PNG слотов** фиксируют контент в растр: при смене текстов/устройств в Figma нужен реэкспорт (осознанный компромисс итерации 3).
4. **Осознанные отклонения** (1280 cap, 256px, 24px H1, Tag-упрощение) документированы здесь и в session-summary — при следующих сверках не считать их ошибками.
5. Marquee: `translateX(-50%)` предполагает равную ширину двух групп — при изменении текста/количества повторов следить за бесшовностью.
6. Мобильная вёрстка главной не имеет Figma-референса — любые mobile-правки являются интерпретацией, а не fidelity.

---

## 13. Open Questions

| # | Вопрос | Контекст |
|---|---|---|
| Q1 | Оставляем полный Header на главной или делаем лого по центру без навигации (как на канвасе Figma `4237`)? | влияет на router/RootLayout |
| Q2 | Подрезка бегущей строки: увеличить высоту полосы (>132px) или уменьшить `--title-marquee`? | замечание из итерации 3.1 |
| Q3 | H1 hero и заголовок навыков: окончательно 24px или вернуть 28px из Figma? | parity-отчёт рекомендовал 28 |
| Q4 | Нужна ли флюидная типографика заголовков на 320–430 (макета mobile нет)? | §9 |
| Q5 | Бейджи опыта: довести Tag до Figma-видa (#060C17/#8C8C8C, 16px, pill, паддинги 2/6) или остаёмся на упрощении? | DS-атом, менять осторожно |
| Q6 | Позиция бейджа периода в карточках Опыта 2/3: под заголовком (как в Figma) или в строке? | §3 |
| Q7 | Когда возвращаемся к навигации карусели (линия #B1B1B1 + стрелки 56×56) — тогда же решится токен #B1B1B1? | отложено владельцем |

---

## 14. Recommended Implementation Order

Малыми итерациями, каждая с проверками `type-check / lint / build / build-storybook`:

1. **Итерация A (fix-пачка карточек кейсов)**: №1 (gap16) + №4 (subtitle token) + №2 (реальное изображение 3-й карты) + №6 (удаление scroll.svg). Одна смысловая зона — «Кейсы».
2. **Итерация B (hero-полировка)**: №3 (бейдж 16px/pad10) + решение Q2 (marquee) + возможный №8 (H1) после ответа.
3. **Итерация C (полировка Опыта)**: №7 + ответы Q5/Q6.
4. **Отдельное решение**: №12 (хедер) — только после явного ответа владельца.
5. Дальше по плану владельца: карусель (Q7), футер, мобильная типографика (Q4).

---

*Аудит завершён. Код не менялся. Следующий шаг — подтверждение владельцем списка §11 и ответов на §13.*
