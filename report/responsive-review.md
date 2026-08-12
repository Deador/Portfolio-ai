# Ревью адаптивной модели CaseRenderer

**Дата:** 2026-08-12
**Область:** адаптив кейсов «Эквайринг» и «Единая платформа коммуникации» (JSON-driven CaseRenderer)
**Формат:** ревью без изменений кода — оценка по блокам + список рекомендаций.

---

## 1. Общая оценка

Архитектурно модель **крепкая**:

- Desktop-first, CSS-only: `case.json` и `CaseRenderer` не тронуты, viewport-логики в TSX нет (кроме одного `span`-капшена в RolesTable).
- Единый источник breakpoints — `_breakpoints.scss` (`tablet 1024`, `mobile 768`, миксины `up-to/tablet/mobile`); во всём `src` больше нет ни одного hardcoded `@media`. Единственные остатки значений 1216/768px — см. §3.1.
- Layout передана в токены (`--layout-content-max`, `--layout-page-max`); секции переведены на `width: 100%; max-width: …`.
- Desktop-геометрия сохраняется по построению (`100% + max-width 1216` внутри контейнера 1216 = те же 1216px).
- Storybook-вьюпорты 320–1280 добавлены.

**Главный дефект, ради которого всё делалось, устранён:** при viewport < 1280px больше нет горизонтального overflow.

Оговорка: модель проверена сборкой (type-check/lint/build/build-storybook) и статическим аудитом, но **не проверена визуально в Storybook** на реальных вьюпортах — это первый пункт рекомендаций.

---

## 2. Оценка по блокам

Легенда: 🟢 хорошо · 🟡 допустимо с оговоркой · 🟠 нужно улучшить

### Контейнер / Page
| Блок | Оценка | Комментарий |
|------|--------|-------------|
| `.pageContainer` (gutter 32/24/16, gap 160→80) | 🟢 | Корректно; верхний padding `108px` на mobile не изменён — см. риск шапки §3.4 |
| Секции `width:100% + max-width: layout-content-max` | 🟢 | Единообразно во всех организмах |
| Image-слоты → `aspect-ratio` (1216/794, 1216/761, 1216/768, 556/582) | 🟢 | Пропорции сохранены; `object-fit: cover` по Figma |

### Молекулы
| Блок | Оценка | Комментарий |
|------|--------|-------------|
| Title (L/M/description, max 720px) | 🟢 | Fluid, переносится |
| MetricCard `.short` (292×340 → mobile 100%×auto) | 🟡 | **height переопределён только на ≤768**; на tablet 769–1024 сохраняется 340px + `overflow: clip` → риск обрезки при переполнении текста на узких карточках (~230px) |
| MetricCard `.long` | 🟢 | fluid |
| CommonCard `.number` (height 160 → mobile auto) | 🟡 | **тоже только ≤768**; на tablet фикс. 160px + абсолютный бейдж 56px «выпирает» на −28px вверх — риск наезда на предыдущую секцию |
| RowInfoProject (286×46 → mobile 100%×auto) | 🟢 | Гибко |
| QuoteElement (472 → fluid, mobile none) | 🟢 | `max-width: 472px` + `flex` — корректно |
| QuoteCard (2×472 + иконка → column ≤1024) | 🟢 | Иконка-разделитель скрыта (декоративный хром) — решение здравое |
| RolesTable (строки stacked ≤768, mobile-caption) | 🟢 | Единственная TSX-правка — минимальная; на tablet остаётся 2 колонки |
| QuoteElement `.name` `white-space: nowrap` | 🟡 | На 320px длинные имена могут выйти за край |
| ContextSectionRow / ReflectionRows | 🟢 | Текстовые блоки, fluid |

### Организмы
| Блок | Оценка | Комментарий |
|------|--------|-------------|
| HeroSection | 🟢 | rowsContainer `flex-wrap` + RowInfoProject→100% — ок |
| ProblemSection (contentRow → column ≤1024, cards ≤768) | 🟢 | |
| GoalsSection (cards → column ≤768) | 🟡 | 4 карточки на tablet 769–1024 сжимаются до ~170px и растягивают фикс. высоту — см. CommonCard.number |
| PersonaSection (cards «column ≤768», flex-wrap) | 🟡 | На tablet 3 карточки в ряд по ~230–300px при `flex:1 1 0; min-width:0` — **не переносятся**, давятся вместо перестроения 2+1 |
| FeatureSection (metrics → column ≤768) | 🟡 | На tablet 3–4 метрики по ~226px с фикс. высотой 340px — пограничный случай |
| ContextSection (contentRow → column ≤1024) | 🟢 | |
| TextImageSection (cards min 320, wrap; column ≤768) | 🟢 | `min-width:320` + wrap — на tablet сам даёт 2+1 |
| DecisionSection (noteBlock 800) | 🟢 | |
| ChipsSection (row → column ≤768) | 🟢 | На tablet 3 чипа по flex-1 — ок |
| QuoteSection / RetrospectiveSection / ResultsSection / ReflectionSection / GrowthSection | 🟢 | Стопки, паддинги, gap — корректно; Growth image 782→100% ≤1024 |

### Entities / Layout
| Блок | Оценка | Комментарий |
|------|--------|-------------|
| MVPGrowthSection (gapCard 520→100% ≤768) | 🟢 | |
| PersonaRolesSection (gap 48→32 ≤768) | 🟢 | |
| RootLayout (headerWrapper padding 8/16 mobile) | 🟢 | см. риск шапки §3.4 |
| Header (flex-wrap + height auto mobile) | 🟡 | **`max-width: 1216px` не затокенирован** — единственное нарушение правила «никого хардкода 1216» |

---

## 3. Найденные проблемы

### 3.1 Остатки хардкода
- `Header.module.scss:8` — `max-width: 1216px` (должен быть `var(--layout-content-max)` для консистентности).
- `ReflectionSection.module.scss:8` / `ReflectionRows.module.scss:10` — `max-width: 768px` (семантическое значение, не breakpoint) — ок, но стоит задокументировать как content-max-reflexion.

### 3.2 Фикс. высоты на tablet (769–1024)
`MetricCard.short { height: 340px }` и `CommonCard.number { height: 160px }` переопределены только на ≤768. На tablet при узких колонках контент может обрезаться (`overflow: clip`) или «выпирать» (бейдж −28px). Десктоп-высота была рассчитана на полноразмерный текст.

### 3.3 Сжатие multi-card рядов на tablet
PersonaSection/GoalsSection/FeatureSection stacking происходит на ≤768. В интервале 769–1024 карточки остаются в ряду и **сжимаются** (`flex:1 1 0`) до ~170–230px (соц. контент не переносится, а именно давится). Для карточек больше подходит wrap 2+1 на tablet, а не squeeze в 1 ряд.

### 3.4 Шапка-overlay на мобильных
`.headerWrapper` остаётся `position: absolute`; при `flex-wrap` на 320px шапка может занимать 2 строки. Верхний padding контейнера зафиксирован `108px` на всех вьюпортах — риск наезда оверлея на первый заголовок секции. По расчётам (≥84 < 108) вероятно проходит, но требует визуальной проверки.

### 3.5 Типографика на mobile
Сознательно не введена (в Figma/токенах отсутствует). Заголовки 32–56px на 320px переносятся — приемлемо. `nowrap` в `.name` — единственное рискованное место.

---

## 4. Рекомендации (без кода, по приоритету)

| # | Что | Где | Эффект |
|---|-----|-----|--------|
| 1 | **Визуально проверить модель в Storybook** на 320/375/430/768/1024/1280 для обоих кейсов (роль RolesTable stacked, QuoteCard column, aspect-ratio image-слоты, gap 160→80, шапка на 320) | Storybook | Подтвердить/опровергнуть §3.4 и §3.2 |
| 2 | **`min-width` у карточек multi-card рядов** (Persona, Feature metrics, Goals): вместо «squeeze в 1 ряд» дать перенос 2+1 на 769–1024 («растягивание» карточек через wrap, а не сжатие) | PersonaSection, FeatureSection, GoalsSection | Карточки читаются тонкими/ средними, не давятся |
| 3 | **Фикс. высоты → `min-height` / auto также на ≤1024** для `.short` и `.number` (или снижать только столбиком, а на tablet отдавать 2–3 колонки с `min-height`) | MetricCard, CommonCard | Исключить обрезку текста и «выпирающий» бейдж |
| 4 | **Затокенировать** `Header max-width: 1216px` → `var(--layout-content-max)` | Header.module.scss | Единый источник, закрыть единственный хардкод |
| 5 | **Снять `white-space: nowrap`** с `.name` (или добавить `overflow-wrap: break-word`) | QuoteElement | Безопасность длинных имён на 320px |
| 6 | **Шапка на mobile**: проверить перекрытие; при необходимости — увеличить верхний отступ контейнера на ≤768 или перевести шапку в поток | CaseRenderer.container / RootLayout | Гарантия отсутствия наезда оверлея |
| 7 | **Роли таблицы на tablet**: на 769–1024 оставить 2 колонки, но проверить широкие задачи (при переполнении — stacked так же, как ≤768) | RolesTable | Читаемость длинных tasks-текстов |
| 8 | **Задокументировать `max-width: 768px`** Reflection как осознанный content-лимит (не breakpoint) | tokens.md | Ясность |
| 9 | **Composite PNG** (flows-in-out, operator-context, pause-flow, substatuses, hero-main, task, process, metrics, feature01-03): на 320–430px мелкий текст нечитаем — контентная задача, не CSS; план: mobile-пересборка ассетов или дозум | assets cases | Полное мобильное качество |

---

## 5. Вердикт

Модель производственно готова по построению (нет overflow, JSON-агностик, расширяема на 5–20 кейсов). Блоки в интервале 320–768 — 🟢/🟡. Основной пограничный интервал — **769–1024 (tablet)**: там сходятся фикс. высоты, squeeze multi-card рядов и шапка-оверлей. Рекомендации 1–3 закрывают приоритетные риски; 4–9 — консистентность и качество.