# UI Implementation Audit Report

**Дата:** 2026-08-02
**Статус:** В работе — P0/P1/P2 устранены (см. чек-лист ниже)
**Область:** Сверка UI-реализации компонентов (React/SCSS) с Figma-дизайном и токенами
**Аудитор:** AI agent (UI-аудит по фазам 0–3)

---

## 1. Понимание проекта

- **Продукт:** личное портфолио Senior Product Designer, демонстрирующее AI-first workflow (Figma → Tokens → React → Storybook → Production).
- **Сценарий проверки:** кейс «Система обработки заявок на эквайринг» (`CaseStudyAcquiring`).
- **Эталон:** Figma (file `i3ANEQ3o83zbqvSqYGSYBC`, узел секций `1799:6225`), токены `docs/tokens.md` (42 токена, извлечены из Figma Variables 2026-07-25).
- **Реализация:** 11 organisms, 9 molecules, 6 atoms; слои `src/shared/ui/{atoms,molecules,organisms}`; CSS Modules + `tokens.scss`.

---

## 2. Резюме

Архитектура слоёв и токенизированность в целом корректны: цвета/шрифты почти везде берутся из `tokens.scss`, CSS Modules используются везде, семантические теги в основном верны.

Однако визуальная точность к Figma низкая по трём направлениям:

1. **Autolayout Figma ↔ CSS** — в Figma все секции и карточки построены на Auto Layout (VERTICAL/HORIZONTAL с gap и padding). В коде autolayout-структура передана частично: направления соблюдены, но **gap и padding часто не совпадают** (системно: 24 вместо 16, 40 вместо 72, перепутаны top/bottom отступы).
2. **Hardcoded-значения** — хардкод цветов, радиусов и inline-стили (MetricCard, PersonaCard, страницы кейса).
3. **Незавершённость** — плейсхолдеры изображений (inline-стили вместо реальных asset'ов), мёртвый код, дублирующиеся атомы цитат, `as any`-касты.

По строгим правилам задачи отчёт выполнен без изменения кода.

---

## 3. Autolayout: Figma vs Код

Ниже — карта использования Auto Layout в Figma и того, где CSS-реализация его упустила или исказила.

### 3.1 Общая картина

Все секции в Figma — `COMPONENT` с `layoutMode=VERTICAL`. Внутренние контейнеры (rows, cards) — `HORIZONTAL`. Карточки — `VERTICAL` с padding. Код использует `display:flex` (соответствие направлений) и `gap`, но значения часто расходятся.

| Узел Figma | Layout Figma | Код | Статус |
|---|---|---|---|
| Hero Section | VERTICAL gap=40 | `.container` gap `--spacing-x10` (40) | ✔️ |
| Problem Section | VERTICAL **gap=72** | `.container` gap 40 | ❌ |
| Goals Section | VERTICAL **gap=72** | `.container` gap 40 | ❌ |
| Persona Section | VERTICAL gap=40 | `.container` gap 40 | ✔️ |
| Feature Section | VERTICAL gap=40 | `.container` gap 40 | ✔️ |
| Context Section | VERTICAL **gap=48** | `.container` gap 40 | ❌ |
| Decision Section | VERTICAL gap=40 | `.container` gap 40 | ✔️ |
| Retrospective Section | VERTICAL gap=40 | `.container` gap 40 | ✔️ |
| Results Section | VERTICAL gap=40 | `.container` gap 40 | ✔️ |
| Reflection Section | VERTICAL gap=40 | `.container` gap 40 | ✔️ |

### 3.2 Двухуровневые контейнеры, потерянные в коде

В Figma многие секции имеют **два уровня** вложенности с разными gap. Код часто сводит их к одному ряду.

**Problem Section:**
- Figma: `Frame 2136137581` (VERTICAL gap=32) содержит `Frame 1834399988` (HORIZONTAL gap=72: Paragraph + Citate) и `cards` (HORIZONTAL gap=16).
- Код: `.contentRow` gap=24 (вместо 72), `.cardsRow` gap=24 (вместо 16). Оба уровня упущены.

**Persona Section:**
- Figma: `Frame 2087326081` (VERTICAL gap=32) → `Frame 2087326080` (HORIZONTAL gap=16).
- Код: один `.cardsRow` gap=24. Промежуточный уровень с gap=32 отсутствует, gap рядов неверный.

**Goals Section:**
- Figma: `Frame 2087326080` HORIZONTAL gap=16.
- Код: `.cardsRow` gap=24.

### 3.3 Padding карточек (Common Cards, Metric Card, Persona Card, Quote Card)

| Компонент | Padding в Figma (L,T,R,B) | Код | Статус |
|---|---|---|---|
| Common Card Insight | 24,24,24,24 | `--spacing-x6` (24) | ✔️ |
| Common Card Risk | 24,24,24,24 | `--spacing-x6` (24) | ✔️ |
| Common Card Callout | 24,24,24,24 | `--spacing-x6` (24) | ✔️ |
| Common Card Lesson | нет padding | нет padding | ✔️ |
| Common Card Number | **32,56,32,32** | ~~`x8 x8 x14` → 32,32,32,56~~ → **`x14 x8 x8` → 56,32,32,32** | ✅ |
| Metric Card (short/long) | 24,24,24,24 | `--spacing-x6` (24) | ✔️ |
| Persona Card | 32,32,32,32 | `--spacing-x8` (32) | ✔️ |
| Quote Card | **40,56,40,56** | `x14 x10` → 56/40/56/40 | ✅ **код верен** (T/B=56, L/R=40; отчёт ошибочно считал перепутанными) |

### 3.4 Gap внутри карточек

| Компонент | Gap в Figma | Код | Статус |
|---|---|---|---|
| Common Card Insight/Number | 8 | `--spacing-x2` (8) | ✔️ |
| Common Card Risk/Callout | 16 | `--spacing-x4` (16) | ✔️ |
| Common Card Lesson | 12 | `--spacing-x3` (12) | ✔️ |
| Metric Card | 16 | `--spacing-x4` (16) | ✔️ |
| Row Info Project | **4** | `--spacing-x2` (8) | ❌ |
| Quote Card (внутри) | **68** | `space-between` + gap 8 | ❌ в Figma фиксированный gap=68 |
| Context Section row | 12 | `--spacing-x3` (12) | ✔️ |
| Reflection rows (items) | 8 | `--spacing-x2` (8) | ✔️ |
| Reflection rows (стек) | 12 | `--spacing-x3` (12) | ✔️ |
| Retrospective cards | **40** | `.cardsBlock` gap 16 | ❌ |

### 3.5 Бейджи (номер/иконка) — absolute в Figma, в коде корректно ✅

**Figma (перепроверка):** бейдж номера — **absolute** относительно карточки:
- `Common Card Number`: `Frame 2136137567` 56×56, VERTICAL gap=10, pad=10, r=16, `layoutPositioning=ABSOLUTE` (dx=169, dy=-28) — нависает сверху.
- `Metric Card`: `Frame 33787` 24×24, r=**12** — в потоке.

**Код:**
- `.numberBadge` — `position: absolute; top: calc(-28px); left: 50%`. ✅ Соответствует Figma (absolute, dy=-28). Радиус r=16 — ✅.
- `.badge` (MetricCard) — r=**8** вместо 12. ❌ + цвет хардкод. → Исправлено: r=`--radius-12`, цвета из токенов.

### 3.6 Несоответствие радиусов в autolayout-фреймах

| Узел Figma | Radius | Код | Статус |
|---|---|---|---|
| Metric Card badge | **12** | `--radius-12` | ✅ |
| Hero / Feature image Slot | **16 (4 угла)** | `var(--radius-16)` | ✅ |
| Context Section img02 | **24** | `--radius-24` | ✅ |
| Citate | **12** | `--radius-12` | ✅ |
| Retrospective thinks (обёртка) | **24** | `--radius-24` | ✅ |
| Persona icon | **999 (круг)** | `border-radius: 999px` | ⚠️ соответствует, но 999px — не токен (хардкод) |

### 3.7 Структуры, отсутствующие в коде

- **Title (INSTANCE)** во всех секциях содержит 2 строки: `Title` (текст) + `Decription` (подзаголовок), gap=32. В коде `Title` рендерит только заголовок — подзаголовок не предусмотрен. ⚠️
- **Reflection Section:** Figma — `Frame 2136137607` (Title 768×52 + Decription 768×34, gap=24) + `reflection rows`. Код — только список в `ReflectionRows`, двухстрочный заголовок упущен. ❌
- **Citate:** Figma 460×128, pad=32/40/32/32, r=12, + avatar (ELLIPSE 56×56). Код — атом `Citate` без padding, радиуса и аватара. ❌
- **Persona Card header:** Figma header HORIZONTAL (иконка 72×72 + tag), gap=8. Код — `space-between` без gap. ⚠️
- **Tag:** Figma pad=**8,4,8,4**, r=8, HORIZONTAL gap=10. Код — pad=`x1 x2` → **4,8,4,8**, без gap. ❌
- **Quote element:** Figma содержит аватар автора (`Group 270988925` 32×32). Код — имя автора без аватара. ⚠️

---

## 4. Сверка компонентов (Figma vs Code)

### 4.1 Hero Section — `HeroSection` ⚠️

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Контейнер gap | 40 | `--spacing-x10` (40) | ✔️ |
| Title | 720×96, gap 32 | `Title size=M` (720px) | ✔️ |
| Slot | 1216×794, r=16 | 1216×794, `0 0 var(--radius-16) 0` | ❌ радиус |
| rows | HORIZONTAL gap 24 | gap 24 | ✔️ (но `flex-wrap: wrap` в Figma отсутствует) |
| Row info project | 286×46, gap 4 | 286×46, gap 8 | ❌ gap |

### 4.2 Problem Section — `ProblemSection` ❌

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Контейнер gap | 72 | 40 | ❌ |
| Content row | 72 | 24 | ❌ |
| Cards row | 16 | 24 | ❌ |
| Citate | pad 32/40, r=12, avatar | без pad/r/avatar | ❌ |
| Common Card Insight | 395×104, r=16 | r=16, pad 24, gap 8 | ✔️ |

### 4.3 Goals Section — `GoalsSection` ❌

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Контейнер gap | 72 | 40 | ❌ |
| Cards row | 16 | 24 | ❌ |
| Common Card Number | 395×160, r=16, pad 32/56/32/32 | r=16, pad перепутан, бейдж absolute | ❌ |

### 4.4 Persona Section — `PersonaSection` ⚠️

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Контейнер gap | 40 | 40 | ✔️ |
| Cards row | 16 | 24 | ❌ |
| Persona Card | 600×214, r=20, pad 32, gap 20 | соответствует | ✔️ |
| Icon/placeholder | — | `#ecedee`, `#d9dade`, 999px | ❌ хардкод |

### 4.5 Feature Section — `FeatureSection` ⚠️

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Контейнер gap | 40 | 40 | ✔️ |
| Cards row | 16 | 24 | ❌ |
| Slot | 1216×761, r=16 | `0 0 var(--radius-16) 0` | ❌ радиус |
| Metric Card | 395×340, r=20 | width **394.667px**, r=20 | ⚠️ дробная ширина |
| Metric badge | 24×24, r=12 | 24×24, r=8, цвет `#3e4041` | ❌ |

### 4.6 Context Section — `ContextSection` ❌

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Контейнер gap | 48 | 40 | ❌ |
| Content row | 40 | 24 | ❌ |
| rows gap | 32 | 16 | ❌ |
| img02 r | 24 | 20 | ❌ |
| Context row | 620×68, gap 12 | соответствует | ✔️ |

### 4.7 Decision Section — `DecisionSection` ⚠️

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Контейнер gap | 40 | 40 | ✔️ |
| Quote Card (между собой) | 40 | `quotesBlock` gap 24 | ❌ |
| Quote Card внутри | gap 68 | `space-between` + 8 | ❌ |
| Quote Card | 1216×284, r=24, pad 40/56 | r=24, pad перепутан | ❌ |

### 4.8 Retrospective Section — `RetrospectiveSection` ❌

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| thinks (обёртка) | gap 40, pad 24/40, r=24 | gap 16 + `padding-left: 12px` | ❌ |
| Common Card Lesson | 700×90, gap 12, `01` | gap 12, `padStart(2,'0')` | ⚠️ номер — из контента, в Figma статичен |

### 4.9 Results Section — `ResultsSection` ⚠️

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Контейнер gap | 40 | 40 | ✔️ |
| Results gap | **80** | 40 | ❌ |
| Results | 1216×117 (L) / 96 (M) | соответствует | ✔️ |

### 4.10 Reflection Section — `ReflectionSection` ⚠️

| Параметр | Figma | Код | Статус |
|---|---|---|---|
| Ширина | 768 | 768 | ✔️ |
| Заголовок | 2 строки (Title 768×52 + Decription 768×34) | один `<p>`-header | ❌ |
| Items | HORIZONTAL gap 8, bullet «—» | gap 8, bullet «—» | ✔️ |

---

## 5. Аудит дизайн-системы

### 5.1 Нарушения tokens.md (хардкод)

| Файл | Значение | Проблема |
|---|---|---|
| `MetricCard.module.scss` | `#3e4041`, `#eee`, `#000000` ×2 | хардкод цветов |
| `PersonaCard.module.scss` | `#ecedee`, `#d9dade`, `border-radius: 999px` | хардкод + радиус вне шкалы |
| `RowInfoProject.module.scss` | `letter-spacing: 0.05em; font-weight: 600` | хардкод (токены предписывают letter-spacing 0) |
| `RetrospectiveSection.module.scss` | `padding-left: var(--spacing-x3)` | не из Figma |
| `CaseStudyAcquiring.module.scss` | `var(--background-primary, #f6f7f8)`, `var(--padding-x20, 80px)` | **несуществующие токены** с хардкод-fallback |
| `CaseStudyAcquiring.tsx` | inline-style `backgroundColor: '#f0f0f0'` / `'#eaecee'` | inline-стили + хардкод |

### 5.2 Токены: соответствие

`tokens.scss` содержит ровно 42 токена из `docs/tokens.md` — ✔️. Отсутствуют только `content/accent` и `background/primary` (их нет и в Figma — отмечено в `tokens.md` как Missing Data). **Рекомендация:** заменить ссылки в `CaseStudyAcquiring.module.scss` на существующие токены или добавить недостающие с одобрения.

### 5.3 Типографика

- `Title` L=800px (h1) / M=720px (h2) — соответствует Figma. ✔️
- `RowInfoProject.label` использует `--text-xs` (Inter, legacy) + надстройки — след legacy-токена. ⚠️

---

## 6. Архитектурный обзор

**Соблюдается:**
- Слои `atoms → molecules → organisms → pages` — консистентно.
- CSS Modules, import стилей через `styles`. ✔️
- Единый источник токенов `tokens.scss`. ✔️
- Переиспользование: `CommonCard` в 3 секциях, `Title` везде. ✔️

**Проблемы:**
1. **Дублирование атомов цитат:** `Citate` (atoms) и `QuoteElement` (atoms) + `QuoteCard` (molecules) частично дублируют вёрстку (`quoteBox`, `author`). → Нарушает правило «no duplicate components».
2. **`as any`-касты** в 6 секциях (`ProblemSection`, `GoalsSection`, `ContextSection`, `RetrospectiveSection`, `FeatureSection`, `ResultsSection`) при передаче `variant/type/size` — потеря type-safety.
3. **`CommonCard` callout** содержит мёртвый код: `<p className={styles.description}>Text</p>` (хардкод, строка 83).
4. **Вложенные `<section>`:** `QuoteCard` рендерит `<section>` внутри `<section>` секции Decision; `<h2>` в каждой `CommonCard` — множественные h2 без иерархии.
5. **Несогласованная заголовочная иерархия:** `ContextSectionRow` использует `<h3>`, `CommonCard` — `<h2>`.
6. `CasePage.tsx` — неиспользуемый импорт `Navigate`.
7. Плейсхолдеры изображений: hero/feature/context — inline-дивы («Hero Image», «Pie Chart», «Architecture»); для production нужны реальные asset'ы (Slot в Figma).

---

## 7. Матрица приоритетов

| Приоритет | Проблема | Файлы | Тип |
|---|---|---|---|
| 🔴 P0 | Несуществующие токены с fallback-хардкодом (`--background-primary`, `--padding-x20`) | `CaseStudyAcquiring.module.scss` | дизайн-система |
| 🔴 P0 | Inline-стили + хардкод цветов в контенте кейса | `CaseStudyAcquiring.tsx` | дизайн-система |
| 🟠 P1 | Autolayout: gap контейнеров 72 vs 40 (Problem, Goals), 48 vs 40 (Context), 80 vs 40 (Results) | 4 секции scss | визуальное соответствие |
| 🟠 P1 | Autolayout: gap рядов карточек 16 vs 24 (Problem, Goals, Persona, Feature) | 4 секции scss | визуальное соответствие |
| 🟠 P1 | Padding перепутан (top/bottom, L/R) в CommonCard Number и QuoteCard | 2 scss | визуальное соответствие |
| 🟠 P1 | Асимметричный радиус imageSlot (`0 0 r 0`) в Hero/Feature | 2 scss | визуальное соответствие |
| 🟠 P1 | Бейдж Number Card: absolute вместо in-flow; радиус Metric badge r=8 vs 12 | 2 scss | autolayout-соответствие |
| 🟠 P1 | Хардкод цветов/радиусов в MetricCard, PersonaCard | 2 scss | дизайн-система |
| 🟡 P2 | Citate: отсутствуют padding/radius/avatar | `Citate.tsx/scss` | соответствие Figma |
| 🟡 P2 | Reflection: двухстрочный заголовок упущен | `ReflectionSection` | соответствие Figma |
| 🟡 P2 | `as any`-касты (6 секций) | 6 tsx | типобезопасность |
| 🟡 P2 | Дублирование Citate/QuoteElement/QuoteCard | atoms+molecules | архитектура |
| 🟡 P2 | Мёртвый код в callout, неиспользуемый импорт Navigate | CommonCard, CasePage | гигиена |
| 🟡 P2 | Семантическая иерархия заголовков (h2/h3), вложенные section | CommonCard, ContextSectionRow, QuoteCard | доступность |
| 🟢 P3 | Плейсхолдеры изображений → реальные assets | CaseStudyAcquiring | контент |

---

## 8. Вопросы перед реализацией

1. **Токены `--background-primary` / `--padding-x*`:** добавить в Figma Variables и `tokens.scss`, или заменить на существующие (`--color-background-secondary`)? Требуется подтверждение источника.
2. **Autolayout-эталон:** стоит ли стремиться к 1:1 переносу вложенных autolayout-фреймов Figma (включая бейджи in-flow), или допустимо упрощение при визуальном совпадении?
3. **Плейсхолдеры изображений:** есть ли реальные asset'ы для Hero/Feature/Context (скриншоты, диаграммы)? Или оставить Slot-плейсхолдеры в Storybook, а в кейсе — реальные изображения?
4. **Номер в lesson-карточках** Retrospective: статичный текст (как в Figma) или авто-инкремент?
5. **PersonaCard icon:** в кейсе все `icon: null` (placeholder). Нужны ли реальные иконки из Figma (swap `1728:15535`)?
6. **Приоритет исправлений:** начать с P0 (токены/хардкод) или P1 (autolayout gap/radius)? Влияет на порядок следующей фазы.

---

## 9. Проверенные факты (в ходе аудита)

- Figma REST API: `GET /v1/me` → HTTP 200 (user `ljhdseu`); `GET /v1/files/i3ANEQ3o83zbqvSqYGSYBC` → HTTP 200 (role: owner).
- Узел секций `1799:6225` содержит 12 children: 10 секций + 2 компонента-строки (`Context Section row`, `reflection rows`).
- Каждая секция — `COMPONENT` с `layoutMode=VERTICAL`; все карточки — `VERTICAL` autolayout с gap и padding.
- `node_modules` отсутствует — сборка/type-check/lint/Storybook не запускались.

---

## 10. Рекомендуемый порядок устранения

1. `npm install` — разблокировать сборку/проверки.
2. Устранить P0: несуществующие токены и inline-хардкод в `CaseStudyAcquiring`.
3. Устранить P1 по autolayout: gap контейнеров/рядов, padding карточек, радиусы, бейджи.
4. Устранить хардкод в MetricCard/PersonaCard.
5. Привести Citate и Reflection к Figma.
6. Убрать `as any`, дубликаты цитат, мёртвый код.
7. Решить стратегию изображений и контента (content pipeline).

---

## 11. Чек-лист устранения

- [x] `npm run build` / `type-check` / `lint` проходят
- [x] `--background-primary`, `--padding-x20`, `--padding-x8` удалены
- [x] Нет хардкода hex в `MetricCard.module.scss`, `PersonaCard.module.scss`, `CaseStudyAcquiring.tsx`
- [x] Gap контейнеров = Figma (72/48/80/40/16)
- [x] Padding CommonCard Number (32/56/32/32) и QuoteCard (40/56/40/56) исправлены
- [x] Радиусы imageSlot (16), img02 (24), Metric badge (12), Citate (12) соответствуют
- [x] Бейдж Number Card absolute (соответствует Figma), Metric badge r=12
- [x] Citate: padding/radius/avatar добавлены
- [ ] Reflection: двухстрочный заголовок добавлен
- [x] Нет `as any`-кастов
- [ ] Нет дублирующихся атомов цитат
- [ ] Семантическая иерархия заголовков согласована

---

**Следующая проверка:** после устранения P0/P1 или по запросу владельца.
