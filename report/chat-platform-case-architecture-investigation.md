# Отчёт: JSON-driven архитектура кейса «Chat Platform» («Единая платформа коммуникации»)

**Дата:** 2026-08-11
**Статус:** Исследование и архитектурное предложение. Код не менялся, ассеты не экспортированы.
**Область:** Аудит Figma → компонентная модель → JSON-модель для перевода кейса на CaseRenderer (schemaVersion 2).
**Источник:** Figma file `i3ANEQ3o83zbqvSqYGSYBC`, канвас кейса `32153:7885` «Единая чат платформа».
**Ссылка:** https://www.figma.com/design/i3ANEQ3o83zbqvSqYGSYBC/...?node-id=32153-7885
**Аудитор:** AI agent (frontend / design system engineer)

> Правила работы: `docs/ai-philosophy.md`, `docs/architecture.md`, `docs/design-system.md`,
> `docs/json-case-study-architecture.md`, `docs/figma-workflow.md`, `docs/tokens.md`.
> Решения сверены с фактической структурой Figma-дерева, а не только с названиями frame.

---

## 1. Executive summary

Кейс «Chat Platform» — это история миграции брокеров и контактного центра банка на единую платформу коммуникации.
В отличие от кейса «Эквайринг», где почти вся страница была собрана из DS-компонентов, в этом кейсе примерно **половина
контента** живёт в свободных «story-блоках» (`FRAME`, не компоненты), собранных вручную из текста, скриншотов и
диаграмм.

**Ключевой вывод аудита: 10 из 17 секций переиспользуют существующие React-компоненты без изменений.**
Нужны **3 новых organism** + **1 расширение существующего molecule** + **1 composite-обёртка**, чтобы покрыть кейс
полностью.

Рекомендуемая модель:

| Тип | Компонент | Покрывает |
|---|---|---|
| reuse | `HeroSection`, `ProblemSection`, `GoalsSection`, `PersonaSection`, `FeatureSection` (×2), `ContextSection`, `RetrospectiveSection`, `ResultsSection`, `ReflectionSection` | 10 секций |
| extend | `RolesTable` (заголовки колонок + shared-role строки), `QuoteCard` (реальная иконка message-question, выверка layout) | gap map + Decision |
| create | `TextImageSection` (title + description + image + опц. highlight/cards) | story-блоки 6.4, 6.5, 6.7, 6.8 |
| create | `ChipsSection` (title + description + chips) | story-блок 6.6 |
| create | `QuoteSection` (title + description + N × QuoteCard) | Decision Section |
| create | `PersonaRolesSection` (composite, blocks[]) | «uf»-группа Persona + RolesTable |

Структура JSON не меняется (schemaVersion **2**, механизм `blocks[]`), реестр CaseRenderer пополняется 4 новыми
компонентами. Изображения и иконки — по существующим правилам экспорта, но с **одним уточнением правила**:
композитные медиа (диаграммы, панели «фон + скриншот») экспортируются целиком как один PNG.

---

## 2. Figma audit

Канвас `32153:7885` «Единая чат платформа» (background `#F6F7F8`).

```
32153:7885 Единая чат платформа (FRAME)
├── 32153:7887 content (FRAME, col, gap 80, pad 20/0/0)
│   ├── 32153:7888 Header (INSTANCE 1863:6922)                 ← app-level, НЕ контент кейса
│   └── 32153:7889 structures (FRAME, col, pad 0/32, gap 160)
│       ├── 32153:9989  Hero Section           (INSTANCE 1799:7130)
│       ├── 32153:10013 Problem Section        (INSTANCE 1799:7282)
│       ├── 32153:10056 Goals Section          (INSTANCE 1799:7325)
│       ├── 32153:7960  uf                     (FRAME, col, gap 48)        ← группа Persona + RolesTable
│       │   ├── 32153:10075 Persona Section    (INSTANCE 1799:7422)
│       │   └── 32153:7992  gap map            (FRAME): title + desc + RolesTable (#33278:2394, COMPONENT)
│       ├── 32153:8032  (анонимный FRAME, col, gap 120)                    ← «история решения»
│       │   ├── 32153:11030 Feature Section    (INSTANCE 1799:7552)  — рекомендация
│       │   ├── 32153:11006 Feature Section    (INSTANCE 1799:7552)  — замещение
│       │   ├── 32153:10972 Context Section    (INSTANCE 1756:15678)
│       │   ├── 32153:8176  FRAME story-блок 6.4 — сценарии входящих/исходящих
│       │   ├── 32153:8197  FRAME story-блок 6.5 — контекст обращения оператора
│       │   ├── 32153:8228  FRAME story-блок 6.6 — рабочее место контактного центра
│       │   ├── 32153:8242  FRAME story-блок 6.7 — пауза обращения
│       │   └── 32153:8267  FRAME story-блок 6.8 — подстатусы
│       ├── 32153:10893 Decision Section       (INSTANCE 1799:8124)  — содержит 2 × Quote Card
│       ├── 32153:10767 Retrospective Section  (INSTANCE 1799:8167)
│       ├── 32153:10708 Results Section        (INSTANCE 1799:8246)
│       ├── 32153:10747 Reflection Section     (INSTANCE 1799:7177)
│       └── 32153:8520  footer                 (FRAME)                       ← app-level, НЕ контент кейса
```

Наблюдения по структуре:

- **Header и Footer** — элементы глобального лейаута (RootLayout), а не content-секции кейса. В `case.json` не попадают.
- **`uf` (32153:7960)** и **анонимный wrapper (32153:8032)** — простые FRAME без `componentId`. Это «группирующие»
  обёртки с собственной вертикальной ритмикой (gap 48 и gap 120 против стандартных 160 у `structures`).
- **Story-блоки 6.4–6.8** — свободные FRAME (`EL-6de21383`: title + description + контент). Не компоненты DS.
- **Decision Section** — INSTANCE `1799:8124` с тем же именем, что у эквайринга, но **другая композиция**:
  заголовок + 2 × Quote Card (тёмные карточки с цитатами «заказчик → мой ответ»).
- **RolesTable** (`33278:2394`) размещена на канвасе как COMPONENT (не INSTANCE); заголовок и описание —
  отдельные тексты вне компонента.
- Маркеры `{ts1}**…**{/ts1}` — Figma-токен жирного начертания **внутри одного текстового узла** (заголовки карточек
  6.5, «Что изменилось»). Это деталь Figma-реализации, в JSON не переносится (см. §7).

---

## 3. Section inventory

Порядок сверху вниз, node-id с канваса кейса.

| # | Секция | Node | Figma type | Component name | Дети | Image | Icons |
|---|---|---|---|---|---|---|---|
| 1 | Hero | `32153:9989` | INSTANCE | Hero Section (`1799:7130`) | Title (SIze=L), Slot-картинка, rows ×4 RowInfoProject | да (mockup) | — |
| 2 | Problem | `32153:10013` | INSTANCE | Problem Section (`1799:7282`) | Title (M), Paragraph + Citate(+ava), cards ×3 CommonCard(insight) | да (avatar) | — |
| 3 | Goals | `32153:10056` | INSTANCE | Goals Section (`1799:7325`) | Title (M), cards ×3 CommonCard(number) | нет | — |
| 4 | Persona | `32153:10075` | INSTANCE | Persona Section (`1799:7422`) | Title (M) + desc, PersonaCard ×2 | нет | Money, Phone (56×56) |
| 5 | Gap map | `32153:7992` / table `33278:2394` | FRAME + COMPONENT | RolesTable (`33278:2394`) | title + desc + таблица «Подразделение / Возможности» | нет | — |
| 6 | Feature #1 | `32153:11030` | INSTANCE | Feature Section (`1799:7552`) | Title (M) + desc, Slot 1216×761, MetricCard ×3 (short) | да | — |
| 7 | Feature #2 | `32153:11006` | INSTANCE | Feature Section (`1799:7552`) | Title (M) + desc, Slot 1216×761, MetricCard ×2 (long) | да | — |
| 8 | Context | `32153:10972` | INSTANCE | Context Section (`1756:15678`) | Title (M) + desc, img 556×582, rows ×2, card(risk) | да | Warning (DS) |
| 9 | Story 6.4 | `32153:8176` | FRAME | — | Title + desc + диаграмма 1216×730 (TimelineStep ×8 + пиллы) | да (диаграмма) | 8 × 40px (в диаграмме) |
| 10 | Story 6.5 | `32153:8197` | FRAME | — | Title (без desc) + панель 1216×359 + карточки ×3 (number+title+desc) | да (панель) | — |
| 11 | Story 6.6 | `32153:8228` | FRAME | — | Title + desc + chips ×3 (одна строка текста) | нет | — |
| 12 | Story 6.7 | `32153:8242` | FRAME | — | Title + desc + диаграмма 1216×752 (TimelineStep ×6 + 2 скрина) + карточка «Что изменилось» | да ×2 (в диаграмме) | 6 × 40px (в диаграмме) |
| 13 | Story 6.8 | `32153:8267` | FRAME | — | Title + desc + панель 1216×450 (2 скрина) + карточка «Что изменилось» | да ×2 | — |
| 14 | Decision | `32153:10893` | INSTANCE | Decision Section (`1799:8124`) | Title (M) + desc, QuoteCard ×2 (тёмные, message-question) | нет | message-question (DS) |
| 15 | Retrospective | `32153:10767` | INSTANCE | Retrospective Section (`1799:8167`) | Title (M), CommonCard ×3 (lesson, тёмная панель) | нет | — |
| 16 | Results | `32153:10708` | INSTANCE | Results Section (`1799:8246`) | Title (M), Results ×4 (3×L, 1×M) | нет | — |
| 17 | Reflection | `32153:10747` | INSTANCE | Reflection Section (`1799:7177`) | Title + paragraph + reflection rows (header + 4 items) | нет | — |

---

## 4. Existing components

Все React-компоненты уже существуют и зарегистрированы (см. `src/shared/ui` и `src/entities/case/CaseRenderer.tsx`).
Проверка проводилась по фактическим пропсам (не по именам).

### Полное переиспользование (без изменений)

| Figma-секция | React-компонент | Почему подходит |
|---|---|---|
| Hero | `HeroSection` | Title L + image slot 1216×794 + rows — контракт совпадает с эквайрингом |
| Problem | `ProblemSection` | Title + Paragraph + Citate(avatar) + insight-cards — контракт совпадает |
| Goals | `GoalsSection` | Title + number-cards (CommonCard `number`) |
| Persona | `PersonaSection` | Title + desc + PersonaCard[icon, tagText, title, desc] — ровно как в эквайринге |
| Feature ×2 | `FeatureSection` | Title + image slot 1216×761 + MetricCard (short/long) |
| Context | `ContextSection` | Title + image 556×582 + rows + risk-card — контракт совпадает |
| Retrospective | `RetrospectiveSection` | Title + lesson-cards на тёмной панели (`--quote-card-background` уже есть в CSS) |
| Results | `ResultsSection` | Title + Results (L/M) |
| Reflection | `ReflectionSection` | title, paragraph, header, items[] |

### Расширение (почти подходит)

| Компонент | Что не совпадает | Требуемое расширение |
|---|---|---|
| `RolesTable` | 1) Заголовки жёстко «Роль» / «Основные задачи», а в кейсе «Подразделение» / «Возможности»; 2) строки кейса имеют вторичную подпись («Оператор» или синяя «Оба подразделения») и чип «Shared role», а текущая модель — только `role + version + tasks` | См. §5.1 |
| `QuoteCard` | 1) Центральная иконка — заглушка «+» (React), в Figma — `message-question`; 2) layout требует сверки с текущим Figma-компонентом `1799:7963` | См. §5.4 |

### Ключевое расхождение

- `DecisionSection` (React, из эквайринга) — `{ titleProps, paragraph, tag, image, noteTitle, noteText }` — **не совпадает**
  с кейсом Chat, где Decision Section = `{ titleProps, cards: QuoteCard[] }`. Это **другая семантика** одной и той же
  Figma-ноды `1799:8124` (DS-компонент «Decision Section» был пересобран). Полагаться на существующий `DecisionSection`
  нельзя → новый organism `QuoteSection` (§5.3).

---

## 5. New components proposal

### 5.1 `RolesTable` — расширение API (molecule)

**Проблема.** Текущая модель строки `{ role, version, tasks }` и жёсткие заголовки не покрывают чат-кейс:
- заголовки «Подразделение» / «Возможности» (вместо «Роль» / «Основные задачи»);
- строки с вторичной подписью: серый «Оператор» (Брокеры, Контакт-центр) и синяя «Оба подразделения» + чип «Shared role»
  (Супервизор, Админ).

**Предложение — расширить, не создавать второй компонент** (правило design-system: prefer extending existing API):

```ts
interface RolesTableRow {
  role?: string;      // пилюля роли
  label?: string;     // вторичная подпись: "Версия 1.0" | "Оператор" | "Оба подразделения"
  shared?: boolean;   // true → синяя подпись + чип "Shared role"
  tasks?: string;
}

interface RolesTableProps {
  title?: string;
  description?: string;
  headRole?: string;    // по умолчанию "Роль"
  headTasks?: string;   // по умолчанию "Основные задачи"
  rows?: RolesTableRow[];
}
```

**Миграция:** в `acquiring/case.json` ключ `version` переименовать в `label` (3 строки, механическая правка).
Обратная совместимость не требуется, т.к. JSON — контент, а не публичное API.

---

### 5.2 `TextImageSection` — новый organism

**Назначение.** Story-блок кейса: заголовок (+ описание) + медиа + опциональный поддерживающий блок.
Покрывает 4 из 5 story-блоков (6.4, 6.5, 6.7, 6.8), которые в Figma собраны вручную и повторяют одну композицию.

```text
TextImageSection

Purpose:
Секция-история с заголовком, описанием, одним визуальным ассетом
и опциональным поддерживающим блоком ("Что изменилось" | нумерованные карточки).

Props:
- titleProps?: TitleProps              (size M; children; description? — description опционален: в 6.5 его нет)
- image?: ContentAsset                 (полноширинное изображение, натуральная высота, радиус)
- highlight?: { title: string; paragraphs: string[] }   // карточка "Что изменилось"
- cards?: Array<Pick<MetricCardProps, 'number'|'title'|'description'|'type'>>

Variants:
- базовый (image)                                        → 6.4
- + highlight (карточка "Что изменилось")               → 6.7, 6.8
- + cards (нумерованные карточки = MetricCard)          → 6.5

Does not control:
- page-specific content
- размеры/пропорции изображения (natural height, не фиксированный слот)
- spacing, цвета, типографику, радиусы (только токены)
- inline-жирность `{ts1}**…**{/ts1}` (JSON декомпозирует title/description)
```

**Почему один компонент, а не «SmallImageSection / LargeImageSection / WhatChangedSection»:**
- все четыре блока имеют идентичную композицию `Header + медиа (+ подпись)`; разница только в опциональном хвосте
  (highlight / cards / ничего);
- разница «маленькой» и «большой» картинки — это **разная нативная высота PNG**, а не семантика компонента:
  контейнер рендерит `img { width: 100%; height: auto }` (естественная пропорция), поэтому 1216×359 и 1216×752
  обрабатываются одинаково;
- `highlight` и `cards` взаимоисключающие и используются по очереди — компонент остаётся тонким (3 контент-пропса).

> Альтернатива (см. §12): разнести в `TextImageSection` (только image) и `WhatChangedSection` (image + highlight).
> Не рекомендую: это дублирование header + image layout.

**Важно про 6.5:** карточки в Figma — это одна текстовая нода `{ts1}**title**{/ts1}\n\n description`. В JSON они
разбиваются на семантические `title` + `description` и рендерятся как `MetricCard` (`type: "short"`). Бейдж в Figma —
круг (ELLIPSE), у MetricCard — скруглённый квадрат: см. §12 (нужно решение).

---

### 5.3 `QuoteSection` — новый organism

**Назначение.** Секция «решения/переговоры»: заголовок + описание + N тёмных QuoteCard
(«запрос бизнеса → мой ответ»). Покрывает Decision Section `32153:10893`.

```text
QuoteSection

Purpose:
Секция из заголовка и списка QuoteCard (диалог "заказчик → дизайнер").

Props:
- titleProps?: TitleProps
- cards?: Array<Pick<QuoteCardProps, 'leftName'|'leftQuote'|'rightName'|'rightQuote'>>

Variants:
- отсутствуют (одна форма)

Does not control:
- контент цитат
- иконку message-question (DS-chrome внутри QuoteCard)
- цвета, spacing, типографику (токены)
```

**Почему не `blocks[]`:** все дочерние элементы однотипные (N × QuoteCard) — это массив в `content.cards`,
а не гетерогенная композиция. `blocks[]` оставлен для гетерогенных составов (см. §6).

---

### 5.4 `QuoteCard` — корректировка (molecule, не создание)

- Заменить центральную иконку-заглушку «+» на реальный `message-question` (outline, `1563:7779`, 56×56) как
  React-SVG **DS-chrome** (по правилу figma-workflow: DS-хром не сериализуется в JSON).
- Проверить layout против текущего Figma-компонента `1799:7963` (тёмная карточка, два блока «имя + текст»).
- В реестр CaseRenderer QuoteCard добавлять не нужно — её рендерит `QuoteSection` внутри.

---

### 5.5 `ChipsSection` — новый organism

**Назначение.** Заголовок + описание + ряд текстовых «чипов» (белые карточки с одной строкой текста).
Покрывает story-блок 6.6 (приоритеты контактного центра).

```text
ChipsSection

Purpose:
Секция из заголовка, описания и списка коротких тезисов-чипов.

Props:
- titleProps?: TitleProps
- chips?: string[]

Variants:
- отсутствуют

Does not control:
- контент чипов
- размеры, цвета, радиусы (токены)
```

**Почему новый компонент:** ни `Tag` (мелкая пилюля 4/8), ни `CommonCard` (требует variant + title) не подходят —
это отдельный визуальный паттерн «белая карточка с одной строкой». Единственное использование в кейсе, но паттерн
коротких тезисов повторяем в портфолио. Самый «слабый» кандидат из предложения — можно отложить (§12).

---

### 5.6 `PersonaRolesSection` — composite-обёртка (entity/organism)

**Назначение.** Группа «Persona + RolesTable» из `uf` (`32153:7960`): две самостоятельные секции с тесной связью
(внутренний gap 48 против стандартных 160).

```text
PersonaRolesSection

Purpose:
Композитная обёртка (по прецеденту MVPGrowthSection): PersonaSection + RolesTable.

Props:
- children?: ReactNode   // рендерит blocks[] из CaseRenderer

Layout:
- колонка с внутренним gap 48px (токен) — отличие от стандартного 160
```

**Почему composite через `blocks[]`:** layout группировки (gap 48) реализует React, а не JSON (§3.2
json-case-study-architecture). Механизм `blocks[]` уже работает в CaseRenderer. Альтернатива — разнести на две
топ-уровневые секции с gap 160 (потеря визуальной группировки, см. §12).

---

## 6. Composite sections / `blocks[]`

В кейсе ровно **один** гетерогенный композит:

| Composite | Node | Состав | Предложение |
|---|---|---|---|
| «uf» (Persona + Roles) | `32153:7960` | PersonaSection + RolesTable (с title/desc) | `PersonaRolesSection` + `blocks[]` |

Остальные секции однотипные по своему содержимому, поэтому реализуются через `content`, а не `blocks[]`:
- `QuoteSection` — список однотипных QuoteCard через `content.cards`;
- `TextImageSection` — highlight/cards через `content`.

Имя `PersonaRolesSection` сохраняется как стабильное Figma/React-имя фрейма (конвенция §3.2).

---

## 7. Image-section analysis

Вопрос: «размер изображения — семантика компонента или layout-вариант?»

**Ответ: layout-вариант. Все секции с картинками имеют одинаковую семантическую композицию
`Header + Image (+ подпись)`, а разница в размере — это нативная высота PNG.**

Сравнение медиа-блоков:

| Секция | Медиа | Размер | Структура |
|---|---|---|---|
| Feature #1/#2 | полнозальный скриншот | 1216×761 | фиксированный слот (существующий `FeatureSection`) |
| Context | панель «фон + скриншот» | 556×582 | фиксированный слот (существующий `ContextSection`) |
| Story 6.4 | диаграмма | 1216×730 | натуральная высота |
| Story 6.5 | панель «фон + скриншот» | 1216×359 | натуральная высота |
| Story 6.7 | диаграмма + 2 скрина | 1216×752 | натуральная высота |
| Story 6.8 | панель из 2 скринов | 1216×450 | натуральная высота |

Выводы:

1. **Существующие слоты** (`FeatureSection` 1216×761, `ContextSection` 556×582) переиспользуются для фиксированных
   композиций без изменений.
2. **Story-блоки** рендерят медиа с **натуральной высотой** (`width:100%; height:auto`) — поэтому
   «маленькое/большое/другая ширина» обрабатываются одним `TextImageSection` без вариантов размера.
   Никаких `width`/`height` в JSON нет.
3. **Диаграммы 6.4, 6.7** и **панели 6.5, 6.8** экспортируются **целиком как один PNG** (фон + скриншоты + плашки),
   а не как отдельные IMAGE-ноды — см. §9 и уточнение правила в §12.

---

## 8. Two-image section analysis

В кейсе две секции с двумя картинками: **6.7 «Пауза обращения»** и **6.8 «Подстатусы»**.

| Секция | Изображения | Позиции | Семантика |
|---|---|---|---|
| 6.7 | `image 836` (724×203), `image 837` (688×228) | оба внутри одной диаграммы 1216×752, привязаны к шагам TimelineStep | «было → стало» внутри флоу |
| 6.8 | `image 838` (335×464), `image 839` (744×421) | два панельных блока side-by-side внутри панели 1216×450 | «было → стало» |

Выводы:

- **Это НЕ один самостоятельный паттерн и НЕ частный случай обычной image-section.** В обоих случаях две картинки —
  часть **единой композиции-панели** (диаграмма / коллаж), а не две независимые image-секции.
- Размеры разные, семантика одинаковая («до → после»), но позиции/рамы разные (внутри флоу vs side-by-side).
- **Отдельный компонент «TwoImageSection» НЕ нужен.** Модель на перспективу 5–20 кейсов: композиция из нескольких
  изображений + плашки = **один медиа-ассет** (экспорт всей панели PNG). Это устойчиво, т.к. любой нетривиальный
  коллаж/диаграмму дешевле и надёжнее хранить как картинку, чем раскладывать на 5–20 React-компонентов с абсолютным
  позиционированием.
- Исключение (пересмотреть позже): если диаграммы-флоу с TimelineStep повторятся в 3+ кейсах с идентичной структурой,
  можно вынести `FlowDiagram`-компонент. Сегодня это over-engineering.

---

## 9. Asset inventory

### 9.1 Raster-изображения (10 уникальных imageRef)

| # | Node | Имя ноды | Контекст | Размер | imageRef / crop | Экспорт | JSON src | figmaNode |
|---|---|---|---|---|---|---|---|---|
| 1 | `32153:9989;1799:7087` | `image` | Hero slot (внутри mockup GROUP `…;1799:7084`) | 1130×704 | `b3d8…`, crop `68c58a` | **весь mockup GROUP** (браузер-рама + скрин) | `images/hero.png` | `32153:9989;1799:7084` |
| 2 | `32153:10013;1799:7226;1799:7134` | `ava` | Citate avatar | 56×56 | `d1de…` | ELLIPSE | `images/ava.png` | `I32153:10013;1799:7226;1799:7134` |
| 3 | `I32153:11030;1799:7428;32153:11029` | `image 841` | Feature #1 slot | 1216×761 | `e0d7…` | RECTANGLE | `images/feature01.png` | `I32153:11030;1799:7428;32153:11029` |
| 4 | `I32153:11006;1799:7428;32153:11005` | `image 841` | Feature #2 slot | 1216×761 | `f862…` | RECTANGLE | `images/feature02.png` | `I32153:11006;1799:7428;32153:11005` |
| 5 | `I32153:10972;1792:16289;32153:10971` | `image 840` | Context панель 556×582 | 572×582 | `f138…` | **весь панельный FRAME** `…;1725:16760` | `images/context.png` | `I32153:10972;1725:16760` |
| 6 | `32153:8180` (диаграмма) | `img02` | Story 6.4 диаграмма | 1216×730 | — | **весь FRAME** | `images/flows-in-out.png` | `32153:8180` |
| 7 | `32153:8204` | `image 834` | Story 6.5 панель | 688×331 | `74b8…`, crop `2eafb4` | **весь GROUP `img05`** `32153:8202` | `images/operator-context.png` | `32153:8202` |
| 8 | `32153:8258` / `32153:8259` | `image 836/837` | Story 6.7 диаграмма | 724×203 / 688×228 | `79f4…`, `5e3d…` | **весь FRAME `img02`** `32153:8247` | `images/pause-flow.png` | `32153:8247` |
| 9 | `32153:8275` / `32153:8278` | `image 838/839` | Story 6.8 панель | 335×464 / 744×421 | `bafa…`, `2e76…` (crop `5ecc38`) | **весь FRAME `img02`** `32153:8272` | `images/substatuses.png` | `32153:8272` |

Правила:
- Имя файла = **семантический src-ключ** (правило 6 figma-workflow: «file name = node name OR src key»). Имена нод
  в кейсе повторяются (`img02` ×3, `image 841` ×2) и не несут смысла, поэтому src-ключ — единственный надёжный
  вариант (см. §12).
- Композитные медиа (диаграммы, панели с фоном, mockup) экспортируются **целиком как один PNG**; `figmaNode` указывает
  на составной FRAME/GROUP. Это уточнение правила 1 figma-workflow (см. §12).

### 9.2 Content-иконки (контентные, экспортируются в `icons/*.svg`)

| Icon | componentId | Node | Контекст | Размер |
|---|---|---|---|---|
| `Money_duotone_line` | `1728:15535` | `I32153:10075;1799:7386;1798:4262` | PersonaCard «Персональные брокеры» (left-icon swap) | 56×56 |
| `Phone_duotone_line` | `1728:15544` | `I32153:10075;1799:7404;1798:4262` | PersonaCard «Контактный центр» (left-icon swap) | 56×56 |

### 9.3 DS-chrome иконки (React, НЕ сериализуются)

| Icon | componentId | Где | Действие |
|---|---|---|---|
| `Warning / Circle_Warning` | `1718:22463` | Risk-card Context | уже есть (`CommonCard/icons/WarningIcon.tsx`) |
| `message-question` (outline) | `1563:7779` | QuoteCard ×2 | заменить «+» в `QuoteCard` на реальный SVG |
| `logo` header / footer, `Arrow_Left_M` footer | — | глобальные | app-level, вне кейса |
| `Chat`, `User`, `Send`, `Search`, `Group`, `Done_round_duotone`, `Eye`, `Lock`, `Winter_duotone`, `Time_duotone_line` | — | внутри диаграмм 6.4/6.7 | **запечены в PNG-диаграммы**, не экспортируются |

---

## 10. Proposed JSON schema / examples

`case.json` сохраняет schemaVersion **2**. Представительные примеры для каждого типа секции:

```jsonc
// 1. Существующий компонент (Hero)
{
  "component": "HeroSection",
  "figmaNode": "32153:9989",
  "key": "hero",
  "content": {
    "titleProps": {
      "size": "L",
      "children": "Единая платформа коммуникации для клиентских подразделений банка",
      "description": "Перевёл брокеров на новую платформу и заложил основу для миграции контактного центра..."
    },
    "image": { "type": "image", "src": "images/hero.png", "figmaNode": "I32153:9989;1799:7084", "alt": "Интерфейс единой платформы коммуникации" },
    "rows": [
      { "label": "Тип", "value": "Enterprise-платформа" },
      { "label": "Роль", "value": "Единственный дизайнер продукта" },
      { "label": "Команда", "value": "12 человек, PM, аналитики, разработчики, qa" },
      { "label": "Платформа", "value": "Web" }
    ]
  }
}
```

```jsonc
// 2. Композит Persona + RolesTable (PersonaRolesSection, blocks[])
{
  "component": "PersonaRolesSection",
  "figmaNode": "32153:7960",
  "key": "personas-roles",
  "blocks": [
    {
      "component": "PersonaSection",
      "figmaNode": "32153:10075",
      "content": {
        "titleProps": { "size": "M", "children": "Фокус и пользователи", "description": "Платформа уже работала у финансовых советников (100к+ обращений)..." },
        "personas": [
          { "icon": { "type": "icon", "src": "icons/Money_duotone_line.svg", "figmaNode": "I32153:10075;1799:7386;1798:4262" }, "tagText": "VIP", "title": "Персональные брокеры", "description": "Работают с VIP-клиентами..." },
          { "icon": { "type": "icon", "src": "icons/Phone_duotone_line.svg", "figmaNode": "I32153:10075;1799:7404;1798:4262" }, "tagText": "High load", "title": "Контактный центр", "description": "Обрабатывает массовый поток..." }
        ]
      }
    },
    {
      "component": "RolesTable",
      "figmaNode": "33278:2394",
      "content": {
        "title": "Платформа поддерживала роли для обоих подразделений",
        "description": "Разные подразделения работали в одном продукте...",
        "headRole": "Подразделение",
        "headTasks": "Возможности",
        "rows": [
          { "role": "Брокеры", "label": "Оператор", "tasks": "• Отображение статуса клиента (VIP-уровень) рядом с чатом\n• Сквозная история..." },
          { "role": "Контакт-центр", "label": "Оператор", "tasks": "• Минималистичный интерфейс под высокую нагрузку\n• Настройка очередей..." },
          { "role": "Супервизор", "label": "Оба подразделения", "shared": true, "tasks": "• Дашборд с метриками отдела в реальном времени\n• Ручное распределение обращений..." },
          { "role": "Админ", "label": "Оба подразделения", "shared": true, "tasks": "• Настройка таймеров, тем, прав доступа\n• Включение/отключение сбора оценок" }
        ]
      }
    }
  ]
}
```

```jsonc
// 3. Story-блок: секция с маленькой картинкой (6.5) — TextImageSection + cards
{
  "component": "TextImageSection",
  "figmaNode": "32153:8197",
  "key": "operator-context",
  "content": {
    "titleProps": { "size": "M", "children": "Оператор получал контекст обращения до подключения к диалогу" },
    "image": { "type": "image", "src": "images/operator-context.png", "figmaNode": "32153:8202", "alt": "Контекст обращения перед подключением оператора" },
    "cards": [
      { "type": "short", "number": 1, "title": "Саммари вместо чтения всей переписки", "description": "Оператор видел суть обращения сразу после подключения к диалогу." },
      { "type": "short", "number": 2, "title": "Саммари не скрывало детали", "description": "При необходимости оператор мог открыть полный диалог и проверить контекст обращения." },
      { "type": "short", "number": 3, "title": "Маршрутизация начиналась до подключения оператора", "description": "ИИ определял контекст обращения и помогал направить клиента в нужное подразделение." }
    ]
  }
}
```

```jsonc
// 4. Story-блок: секция с большим изображением-диаграммой (6.4) — TextImageSection, базовый
{
  "component": "TextImageSection",
  "figmaNode": "32153:8176",
  "key": "scenarios-split",
  "content": {
    "titleProps": {
      "size": "M",
      "children": "Разделили сценарии коммуникации для входящих и исходящих обращений",
      "description": "Ввели разные правила работы интерфейса в зависимости от того, кто инициировал переписку."
    },
    "image": { "type": "image", "src": "images/flows-in-out.png", "figmaNode": "32153:8180", "alt": "Схема входящих и исходящих обращений" }
  }
}
```

```jsonc
// 5. Story-блок с двумя изображениями (6.7) — TextImageSection + highlight
{
  "component": "TextImageSection",
  "figmaNode": "32153:8242",
  "key": "pause-flow",
  "content": {
    "titleProps": {
      "size": "M",
      "children": "Пауза обращения не стала скрытым закрытием",
      "description": "Первоначально обращение исчезало из работы после постановки на паузу..."
    },
    "image": { "type": "image", "src": "images/pause-flow.png", "figmaNode": "32153:8247", "alt": "Сценарий работы с паузой обращения" },
    "highlight": {
      "title": "Что изменилось",
      "paragraphs": [
        "Первоначально обращение полностью исчезало из зоны видимости сотрудника после постановки на паузу.",
        "Я предложил сохранить возможность вернуть его в работу до автоматического закрытия..."
      ]
    }
  }
}
```

```jsonc
// 6. Уникальная секция: chips (6.6) — ChipsSection
{
  "component": "ChipsSection",
  "figmaNode": "32153:8228",
  "key": "cc-workspace",
  "content": {
    "titleProps": {
      "size": "M",
      "children": "После брокеров начал проектировать рабочее место контактного центра",
      "description": "В отличие от брокеров, сотрудники контактного центра работали с массовым потоком обращений..."
    },
    "chips": ["Высокая скорость ответа", "Управление очередями", "Автоматические таймеры"]
  }
}
```

```jsonc
// 7. Существующий компонент со списком однотипных карточек (Decision) — QuoteSection
{
  "component": "QuoteSection",
  "figmaNode": "32153:10893",
  "key": "decisions",
  "content": {
    "titleProps": {
      "size": "M",
      "children": "Не все требования заказчиков попадали в интерфейс",
      "description": "Моя задача была не только проектировать решения, но и объяснять, почему некоторые идеи создают новые проблемы для пользователей."
    },
    "cards": [
      { "leftName": "Руководители КЦ", "leftQuote": "Давайте покажем на дашборде время в каждом подстатусе для всех сотрудников.", "rightName": "Мой ответ", "rightQuote": "Это не про мониторинг в реальном времени..." },
      { "leftName": "Руководитель брокеров", "leftQuote": "Добавим в карточку клиента паспорт, счета, сделки и всю историю", "rightName": "Мой ответ", "rightQuote": "Карточка в чате нужна для быстрого контекста..." }
    ]
  }
}
```

**Правило `{ts1}`:** маркеры `{ts1}**…**{/ts1}` и `\n\n` внутри одного текстового узла Figma в JSON **не переносятся**.
Семантически узел декомпозируется: жирный сегмент → `title`, остальное → `description` (или `paragraphs[]`).

---

## 11. Existing React mapping

| # | Figma-секция | React-компонент | Статус | Действие |
|---|---|---|---|---|
| 1 | Hero `32153:9989` | `HeroSection` | registered | reuse |
| 2 | Problem `32153:10013` | `ProblemSection` | registered | reuse |
| 3 | Goals `32153:10056` | `GoalsSection` | registered | reuse |
| 4 | Persona `32153:10075` | `PersonaSection` | registered | reuse |
| 5 | RolesTable `33278:2394` | `RolesTable` | registered | **extend** (headers + label/shared) |
| 6 | Feature #1 `32153:11030` | `FeatureSection` | registered | reuse |
| 7 | Feature #2 `32153:11006` | `FeatureSection` | registered | reuse |
| 8 | Context `32153:10972` | `ContextSection` | registered | reuse |
| 9 | Story 6.4 `32153:8176` | `TextImageSection` | **new** | create + register |
| 10 | Story 6.5 `32153:8197` | `TextImageSection` | **new** | create + register |
| 11 | Story 6.6 `32153:8228` | `ChipsSection` | **new** | create + register |
| 12 | Story 6.7 `32153:8242` | `TextImageSection` | **new** | create + register |
| 13 | Story 6.8 `32153:8267` | `TextImageSection` | **new** | create + register |
| 14 | Decision `32153:10893` | `QuoteSection` | **new** | create + register (QuoteCard внутри) |
| 15 | Retrospective `32153:10767` | `RetrospectiveSection` | registered | reuse |
| 16 | Results `32153:10708` | `ResultsSection` | registered | reuse |
| 17 | Reflection `32153:10747` | `ReflectionSection` | registered | reuse |
| — | «uf» `32153:7960` | `PersonaRolesSection` | **new** (composite) | create + register |

Реестр CaseRenderer пополняется: `TextImageSection`, `ChipsSection`, `QuoteSection`, `PersonaRolesSection`.

---

## 12. Needs confirmation

```
Вопрос 1. RolesTable: заголовки и shared-роль.
Контракт: { role, label, shared?, tasks } + headRole/headTasks? Или оставить version и добавить subrole/shared?
My recommendation: единый label + boolean shared; version в acquiring/case.json переименовать в label
(механическая правка 3 строк). headRole/headTasks с дефолтами.
Why: одна вторичная подпись вместо трёх полей (version/subrole/unit); shared — чисто визуальный вариант.
```

```
Вопрос 2. TextImageSection: highlight и cards в одном компоненте или разнести?
My recommendation: один компонент TextImageSection { titleProps, image, highlight?, cards? }.
Why: 4 блока имеют идентичную композицию Header + медиа; хвост (highlight/cards) — опциональный блок,
взаимоисключающий. Разделение на WhatChangedSection + TextImageSection = дублирование header + image.
```

```
Вопрос 3. Бейдж карточек 6.5: круг (ELLIPSE) против скруглённого квадрата у MetricCard.
My recommendation: использовать MetricCard (type=short), отличием формы бейджа пренебречь
или поправить MetricCard, если владелец настаивает на точном соответствии.
Why: семантика карточек = нумерованные факты с описанием, идентична MetricCard; форма бейджа — деталь,
а не вариант компонента.
```

```
Вопрос 4. Экспорт композитных медиа (диаграммы/панели/mockup).
Правило 1 figma-workflow говорит "экспортируй внутреннюю IMAGE-ноду, не слот".
В кейсе 5 композиций (hero mockup, context панель, диаграммы 6.4/6.7, панели 6.5/6.8),
которые как один PNG теряют смысл при разборе на внутренние IMAGE.
My recommendation: уточнить правило — "если слот содержит композицию (фон + скриншоты / диаграмму),
экспортировать весь составной FRAME/GROUP как один PNG; figmaNode = составная нода".
Why: иначе диаграммы распадаются на бесполезные куски; это единственный способ сохранить fidelity.
```

```
Вопрос 5. Имена файлов изображений: ноды повторяются (img02 ×3, image 841 ×2) и не несут смысла.
My recommendation: имя файла = семантический src-ключ (hero.png, flows-in-out.png, pause-flow.png...),
figmaNode связывает файл с нодой. Правило 6 figma-workflow это уже разрешает.
Why: правило "имя = имя ноды" здесь не работает из-за дубликатов; src-ключ детерминирован и понятен AI.
```

```
Вопрос 6. «uf»-группировка: PersonaRolesSection (composite, gap 48) или разнести на две секции (gap 160)?
My recommendation: composite PersonaRolesSection (прецедент MVPGrowthSection).
Why: сохраняет тесную визуальную связку персона-роли и внутренний gap 48; flatten даёт 160 и ломает ритм.
```

```
Вопрос 7. ChipsSection — новый компонент ради одного использования.
My recommendation: создать (тонкий организм, повторяемый паттерн коротких тезисов), но это самый
отменяемый кандидат: можно оставить 6.6 на потом или решить иначе.
Why: Tag/CommonCard не покрывают "белая карточка с одной строкой"; паттерн прост и вероятен в других кейсах.
```

```
Вопрос 8. Decision Section: Figma-нода называется "Decision Section" (1799:8124) и в эквайринге, и в чате,
но композиции разные (в чате — Quote Cards). React DecisionSection занят эквайрингом.
My recommendation: новый organism QuoteSection (семантическое имя), существующий DecisionSection не трогаем.
Why: переиспользование имени DecisionSection сломает эквайринг; QuoteSection отражает суть (цитаты-диалоги).
```

```
Вопрос 9. Рифма секций: структуры 160 / wrapper 120 / uf 48.
Flatten → все секции на 160.
My recommendation: сохранить 160 по умолчанию (caseRenderer), композит uf — 48. Разницу 120→160
у wrapper#8032 принять (незначительная; композитная обёртка ради 40px = over-engineering).
Why: JSON не должен нести layout; 120 против 160 — ритмическая деталь, не семантика.
```

```
Вопрос 10. Пропорции изображений в TextImageSection: натуральная высота (width 100%, height auto).
My recommendation: да, натуральная высота (медиа = полноширинная PNG, высота из пропорций).
Why: единственный способ единообразно показать 1216×359 и 1216×752 без size-вариантов.
```

---

## 13. Recommended implementation plan

1. **Расширение `RolesTable`** (molecule): `label` вместо/в дополнение к `version`, опц. `shared`, опц.
   `headRole`/`headTasks`. Миграция `acquiring/case.json` (`version` → `label`).
2. **`QuoteCard`**: заменить «+» на реальный `message-question` SVG (DS-chrome); сверка layout с Figma `1799:7963`.
3. **Новые компоненты**: `TextImageSection`, `ChipsSection`, `QuoteSection`, `PersonaRolesSection`
   (organism/entity) + `.module.scss` + `.stories.tsx` (по правилу design-system §9).
4. **Реестр CaseRenderer**: добавить 4 новых компонента в `sectionComponents`.
5. **Экспорт ассетов** по уточнённому правилу (§12, Q4/Q5): 9 изображений в `src/content/cases/chat/images/`,
   2 content-иконки в `src/content/cases/chat/icons/`.
6. **`src/content/cases/chat/case.json`**: 17 секций по модели §10 (schemaVersion 2, blocks[] для uf).
7. **Storybook**: стори `Case/CaseRenderer/Chat` (валидация JSON на старте); визуальный диф секций с Figma
   по `figmaNode`.
8. **Проверки**: `type-check`, `lint`, `vite build`, `build-storybook`.

---

## 14. Risks / trade-offs

| Риск | Митигация |
|---|---|
| **RolesTable API-изменение** затрагивает acquiring/case.json | Механическая миграция `version`→`label`; JSON — контент, не публичное API |
| **TextImageSection с highlight+cards** может выглядеть «всеядным» | Всего 3 контент-пропса, взаимоисключающие хвосты; альтернатива (разделение) в §12 |
| **Экспорт композиций одним PNG** отклоняется от буквы правила 1 figma-workflow | Уточнение правила (Q4); обратная совместимость: простые IMAGE-ноды по-прежнему экспортируются по старому правилу |
| **Дубликаты имён нод** (`img02`, `image 841`) ломают конвенцию имён | src-ключ как имя файла (разрешено правилом 6); figmaNode — единственный канал связи с Figma |
| **Story-блоки — свободные FRAME, не компоненты** → возможен дрейф при рефакторинге Figma | figmaNode на каждом блоке; сверка по ноде в workflow |
| **Decision Section (Figma) с двумя композициями** под одним именем | Новый `QuoteSection`; не трогаем React `DecisionSection` (эквайринг) |
| **`{ts1}`-маркеры** при автоматическом переносе текста | Правило декомпозиции title/description (§10); валидация на ревью |
| **Разные вертикальные ритмы** (160/120/48) при flatten | Композит uf сохраняет 48; 120→160 принято (Q9) |

---

## Итоговая рекомендация

**Кейс Chat Platform переводится на JSON-driven рендеринг без изменения схемы (schemaVersion 2).**

- **Переиспользуем (10 секций):** HeroSection, ProblemSection, GoalsSection, PersonaSection, FeatureSection (×2),
  ContextSection, RetrospectiveSection, ResultsSection, ReflectionSection.
- **Расширяем (2 компонента):** RolesTable (заголовки + label/shared), QuoteCard (иконка message-question).
- **Создаём (4 компонента):** `TextImageSection` (story-блоки 6.4/6.5/6.7/6.8), `ChipsSection` (6.6),
  `QuoteSection` (Decision), `PersonaRolesSection` (composite Persona + Roles).
- **Ассеты:** 9 изображений (включая 5 композитных медиа одним PNG) + 2 контент-иконки
  (Money, Phone). Диаграммы с TimelineStep — картинки, а не компоненты.

Главный критерий качества: при добавлении следующих 5–20 кейсов эта модель **не плодит компоненты на каждый размер
картинки** (натуральная высота PNG), **не создаёт компонент ради одной пары изображений** (панель = один ассет),
**не ломает существующий эквайринг** (только точечные расширения), и **остаётся собираемой AI** — каждый блок
описывается `{ component, figmaNode, content|blocks }` без layout-знаний в JSON.

STOP — ожидается решение владельца.
