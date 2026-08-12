# Отчет: адаптив CaseRenderer — аудит и модель адаптации

**Дата:** 2026-08-12
**Статус:** Phase 1 (аудит) + Phase 2 (предложение) завершены; код не изменялся
**Область:** Адаптивная модель кейсов «Эквайринг» и «Единая платформа коммуникации» (JSON-driven CaseRenderer)
**Эталон:** `docs/architecture.md`, `docs/design-system.md`, `docs/tokens.md`, `docs/json-case-study-architecture.md`, `docs/figma-workflow.md`
**Аудитор:** AI agent (senior frontend / design system engineer)

> Задача: сделать полноценный адаптив кейсов через единую адаптивную модель CaseRenderer.
> JSON должен остаться viewport-agnostic, CaseRenderer — общей точкой рендера, desktop — без регрессии.

---

## 1. Резюме

Проект **полностью desktop-only**: ни одного `@media` во всём `src`, ни одного breakpoint-токена. Каждая секция захардкожена в ширину `1216px`, контейнер — `max-width: 1280px` с боковыми паддингами 32px. При viewport < 1280px секции физически выходят за пределы контейнера → **горизонтальный overflow уже на 1279px**.

Дизайн-система готова к адаптиву (токены, SCSS Modules, desktop-first — подтверждено `project-context.md`), но адаптивное поведение не было спроектировано. Никаких meta-fix, `clamp`, `minmax`/grid и кастомных viewports в Storybook нет.

---

## 2. Иерархия layout

```
CaseRenderer.pageContainer
  max-width: 1280px
  padding: 108px top / 32px sides      ← 108px = header overlay (48) + 60
  gap между секциями: --spacing-x40 (160px)
      └─ .section (flex, justify-content: center)
            └─ <section>  width: 1216px (фиксированная) | Reflection 768px
```

Header — absolute overlay (высота 48px, max-width 1216px, padding 32px сверху) поверх контента (RootLayout).

---

## 3. Данные аудита

### 3.1 Существующие breakpoints

**Нет.** `@media` в коде отсутствует полностью. В `docs/project-context.md` только декларация стратегии: «Desktop-first with responsive layouts for tablet and mobile». Mobile-канвасов и mobile-значений в Figma нет (предположение, требует подтверждения владельца).

### 3.2 Spacing tokens (4px scale)

`x1=4, x2=8, x3=12, x4=16, x5=20, x6=24, x8=32, x10=40, x12=48, x14=56, x15=60, x18=72, x20=80, x40=160` (13 токенов). Mobile-специфичных значений нет.

### 3.3 Typography tokens

Полная система: `--title-*` (20–56px Bold/SemiBold/Medium), `--text-*` (14–24px), все 0 letter-spacing, Onest. Mobile-шкалы типографики **нет**. Заголовки 32–56px переносимы на 320px без правок — адаптив типографики сегодня не требуется.

### 3.4 Container / layout

| Уровень | Текущее значение |
|---|---|
| `.pageContainer` | `max-width: 1280px`, padding `108px / 32px`, gap секций `160px` |
| Секции | `width: 1216px` (13 организмов + QuoteCard), Reflection `768px`, Decision `noteBlock 800px` |
| Header | `max-width: 1216px`, absolute overlay, `height: 48px` |
| Глобальное `img` | `max-width: 100%; height: auto` (уже корректная база) |

### 3.5 Image-слоты (фикс. размеры, `object-fit: cover`)

| Секция | Desktop slot | Проблема на mobile |
|---|---|---|
| HeroSection | 1216×794 | обрезка/уменьшение, нужен ratio |
| FeatureSection | 1216×761 | ratio |
| DecisionSection | 1216×768 | ratio |
| ContextSection | 556×582 | ratio |
| GrowthSection | 782px ширина | фикс. ширина → 100% |
| TextImageSection | `100% auto` | уже корректно ✓ |

---

## 4. Матрица секций: Desktop → Mobile

| Section | Desktop | Mobile (≤768) | Что меняется |
| ------- | ------- | ------ | ------------ |
| **HeroSection** | 1216; image 1216×794 cover; rows (flex-wrap) | image → ratio, fluid; rows стопкой | image ratio; фикс. ширина → 100% + max-w |
| **ProblemSection** | paragraphBlock 560 + citateSlot 460 в ряд; cardsRow 3×insight | столбец: paragraph → citate → cards | contentRow → column |
| **GoalsSection** | cardsRow, 4×number (height 160 фикс.) | стопка 1 колонка; height auto | direction + фикс. высота → auto |
| **PersonaSection** | cardsRow, `flex-wrap`, 3×PersonaCard (flex 1 1 0) | 1 колонка | нужно min-width/стопка — сейчас flex-basis 0 «сжимает» карточки до ~110px |
| **RolesTable** | roleCell 300 + tasks flex; description 700 | **stacked rows**: роль+label → tasks ниже | компонент RolesTable (CSS / mobile-caption) |
| **FeatureSection** | image 1216×761 cover; metricsRow (flex 1 1 0) | image ratio; метрики стопкой; `.short` height 340 → auto | image ratio; row → column; MetricCard |
| **ContextSection** | image 556×582 + infoBlock (rows 620, card 520) | столбец; image ratio; infoBlock 100% | contentRow → column; фикс. 620/520 → 100% |
| **TextImageSection** | image fluid ✓; highlightCard 800; cardsRow (min 320) | highlight/cards 100%; cards → 1 стопка | width 800 → 100%/max-w; cards column |
| **ChipsSection** | chipsRow 3×flex-1 | 1 колонка | row → column |
| **QuoteSection / QuoteCard** | 1216; quoteGrid: 2×472 + иконка 56 | **стопка**: левая цитата → (иконка скрыта) → правая | QuoteElement 472 → 100%; centerIcon скрыть |
| **PersonaRolesSection** | gap 48 (x12) | gap 32 (x8) | gap |
| **RetrospectiveSection** | 1216; dark-панель padding 40/24; cards столбцом ✓ | панель padding 24/16 | padding |
| **ResultsSection** | resultsBlock gap 80; результаты центрированы (56/40px) | gap 48 (x12); титры переносятся | gap |
| **ReflectionSection** | 768, margin-right auto | 100% / max-w 768 | фикс. ширина → fluid |
| **DecisionSection** | header 720; image 1216×768 cover; noteBlock 800 | header 100%; image ratio; noteBlock 100% | width-фиксы → fluid; image ratio |
| **GrowthSection** | row: image 782 + PersonaCard | столбец: image (fluid) над карточкой | row → column; imageSlot width 100% |

## 5. Ключевые проблемы

1. **Критическая:** фикс. ширина секций 1216px → overflow страницы при viewport < 1280px.
2. **PersonaSection:** `flex: 1 1 0` + `wrap` без `min-width` → карточки сжимаются до нечитаемых на средних/малых ширинах.
3. **RolesTable:** столбцы 300px + flex → на ≤430px таблица нечитаема; требуется stacked-представление.
4. **QuoteCard:** две цитаты по 472px + центральная иконка в одну строку — не помещается.
5. **Фикс. высоты:** MetricCard.short 340px, CommonCard.number 160px, RowInfoProject 46px — рассчитаны только под desktop-текст.
6. **Image-слоты:** `cover` + фикс. высота → на mobile контент «обрезается»; нужен `aspect-ratio`.
7. **Композитные PNG** (chat: `flows-in-out`, `operator-context`, `pause-flow`, `substatuses`; acquiring: `hero-main`, `task`, `process`, `metrics`, `feature01-03`) — на 320–430px мелкий текст внутри PNG нечитаем. Это **контентная** проблема (не CSS), блокировкой адаптива не является.

---

## 6. Предложение модели адаптива (Phase 2)

### Принципы

- **Desktop-first**, CSS-only; `case.json` и `CaseRenderer` не трогаем.
- Все правки — SCSS-модули + минимальное расширение токенов; TSX-правки не требуются (исключение-кандидат — mobile-caption в RolesTable).
- Существующие токены использованы везде; новых произвольных значений не вводим.

### Breakpoints (минимум, текущих нет)

- `bp-tablet: 1024px` — контейнер gutter 32→24.
- `bp-mobile: 768px` — основной: стопки, gutter 16, gap секций 160→80.

### Новые компоненты системы

- `src/shared/styles/_breakpoints.scss`: Sass-переменные `$bp-tablet`/`$bp-mobile` + миксин `up-to($width)`; `@use` в SCSS-модулях — единая точка отсчёта.
- Токены layout (extraction существующих значений): `--layout-content-max: 1216px`, `--layout-page-max: 1280px`.

### Уровни изменений

| Уровень | Что |
|---|---|
| **Design-token** | `--layout-content-max`, `--layout-page-max`; `_breakpoints.scss`; обновить `docs/tokens.md` |
| **CSS-only** | все организмы, QuoteCard, Title, ContextSectionRow, ReflectionRows, MVPGrowthSection, PersonaRolesSection, CaseRenderer.container, RootLayout, Header |
| **Component-level** | RolesTable: mobile-caption «Возможности» (один span, `display:none` → виден на ≤768) |
| **Архитектурные** | нет |

### Ключевые правила

1. Секции: `width: 1216px` → `width: 100%; max-width: var(--layout-content-max)`.
2. Все multi-column rows при ≤768 → `flex-direction: column` (карточки стопкой, без горизонтального скролла).
3. Image-слоты: фикс. высота → `aspect-ratio` (1216/794, 1216/761, 1216/768, 556/582).
4. Фикс. высоты карточек → `auto` (MetricCard.short, CommonCard.number, RowInfoProject).
5. RolesTable → stacked rows; QuoteCard → stacked цитаты (иконка-разделитель скрыта — декоративный DS-chrome).
6. Типографика: сохраняем существующие токены на всех viewport'ах (mobile-шкалы нет, ничего не выдумываем).

### Desktop regression

Изменения построены так, что desktop (≥1024) сохраняет текущую геометрию 1:1:
`width: 100% + max-width: 1216` внутри контейнера 1216 = те же 1216px; gutter и gap не меняются.

---

## 7. Affected files (план)

- `src/shared/tokens/tokens.scss`, `docs/tokens.md` — layout-токены.
- `src/shared/styles/_breakpoints.scss` — новый partial.
- `src/entities/case/CaseRenderer.module.scss`, `MVPGrowthSection.module.scss`, `PersonaRolesSection/PersonaRolesSection.module.scss`.
- `src/app/layouts/RootLayout.module.scss`; `src/shared/ui/organisms/Header/Header.module.scss`.
- Организмы: Hero, Problem, Goals, Persona, Feature, Context, Decision, Retrospective, Results, Reflection, Quote, Chips, TextImage, Growth.
- Молекулы: Title, MetricCard, CommonCard, RowInfoProject, QuoteElement, QuoteCard, RolesTable, ContextSectionRow, ReflectionRows.
- `.storybook/preview.ts` — кастомные viewports (320/375/430/768/1280) для быстрой проверки обоих кейсов.
- `docs/session/session-summary.md` — обновление в конце сессии.

## 8. Risks

- `@use` partial в CSS-модулях — пути относительность файлов (проверится билдом).
- `aspect-ratio` — современные браузеры ок.
- Специфичность Flex-оверрайдов при column-layout (проверится билдом и визуально).
- Mobile-значений в Figma нет — все mobile-значения берём только из существующих токенов (правки значений согласуются с владельцем заранее).

---

## 9. Validation-план (Phase 4)

- `npm run type-check`, `npm run lint`, `vite build`, `build-storybook`.
- Визуальная проверка обоих кейсов на 320 / 375 / 430 / 768 / 1024 / 1280.
- Подтверждение: нет горизонтального scroll, нет элементов за viewport, таблицы/карточки читаемы, изображения сохраняют пропорции, desktop не деградировал.

## 10. Boundary check (criteria готовности)

1. Оба кейса адаптивны ✓ (план)
2. JSON остаётся viewport-agnostic ✓ — никаких `mobileImageWidth`/`mobileVariant`
3. CaseRenderer остаётся общей точкой рендера ✓ — не изменяется
4. Нет мобильных компонентов-дублей ✓
5. Нет горизонтального overflow ✓ (план)
6. Таблицы/карточки читаемы на 320–430 ✓ (план: stacked)
7. Изображения сохраняют пропорции ✓ (ratio)
8. Desktop без регрессии ✓ (план)
9. Адаптивные правила в DS / shared components ✓
10. Масштабируется на следующие 5–20 кейсов ✓ (CSS-only + токены)