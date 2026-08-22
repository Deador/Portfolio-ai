# Session Summary

## What was completed

### Скролл-реставрация при навигации (вариант B, 22.08.2026)

Проблема: SPA-роутинг не сбрасывает позицию окна — «проскролленная главная → кейс» открывался
с той же высоты. Решение: компонент `src/app/router/ScrollToTop.tsx` (useEffect по pathname →
window.scrollTo top 0, behavior 'instant' — перекрывает глобальный CSS scroll-behavior: smooth),
смонтирован в RootLayout. Кнопки назад/вперёд тоже ведут в топ (реставрацию позиций можно
добавить позже через <ScrollRestoration />). Проверки: type-check/lint/build ✅.

**Файлы:** `src/app/router/ScrollToTop.tsx` (новый), `src/app/layouts/RootLayout.tsx`.

### Showreel: адаптивный слот без кропа (вариант 2, 22.08.2026)

Чтобы не резалось ничего при разных пропорциях кадров (1.533/1.531/1.444), слот перестал быть
жёстким: активный кадр рендерится в потоке и задаёт высоту своей натуральной пропорцией,
неактивные — `display:none`, предыдущий кадр кладётся абсолютным слоем поверх нового
и гаснет keyframes-анимацией (кроссфейд сохранён). Высота блока меняется между кадрами
(376↔400px) в момент кроссфейда. `prefers-reduced-motion`: уходит анимация за 0.01s
(marquee-правило сохранено). Проверки: type-check/lint/build ✅ (164 модуля), build-storybook ✅.

**Файлы:** `sections/HomeHero/HomeHero.tsx|.module.scss`.

### Showreel кадр 3: перевыгрузка по новой ссылке (22.08.2026)

Владелец дал новый узел для третьего кадра: `image 816` **33316:9823** (imageRef свежий).
Перевыгружен @2x как `showreel-3.png` — **2290×1586** (~530KB), заменил старый 1386×960.
Пропорция нового кадра 1.4439 — узкая (как у прежнего 693×480), поэтому в слоте 1216:793
при cover теряет ~5.9% высоты; кадры 1–2 без изменений видны полностью. Build ✅.

**Файлы:** `src/content/home/images/showreel-3.png` (перезаписан).

### Showreel: исправление ошибочной обрезки ассетов (22.08.2026)

**Признанная ошибка:** «вариант 1» (центровая обрезка файлов под 577:400) был бесполезен визуально —
object-fit: cover и так скрывал ровно те же края, а файлы разошлись с Figma-источником
(−144px ширины у кадров 1–2). Отсюда «ничего не изменилось» + расхождение ассетов с макетом.

**Исправление:**
- Все три файла выгружены заново из Figma в полном размере (@2x, узлы 33313:8547/3553/9817) —
  снова идентичны макету: 2432×1586 / 2432×1588 / 1386×960.
- Слот showreel переведён на пропорцию ассетов: `aspect-ratio: 1216/793` (было 577/400).
  Кадры 1–2 теперь видны полностью без кропа; кадр 3 (1.4438 vs 1.5337) теряет ~6% по высоте
  при cover. Высота слота на hero изменилась 400→377px.
- Открытый пункт: для полного соответствия кадру 3 нужна его версия в пропорции ~1216×794
  от дизайнера.

Проверки: `type-check`/`lint`/`build` ✅ (164 модуля), `build-storybook` ✅.

**Файлы:** `src/content/home/images/showreel-1|2|3.png` (переэкспортированы),
`sections/HomeHero/HomeHero.module.scss`.

### Showreel: кадрирование ассетов под слот 577:400 (22.08.2026)

Причина обрезки кадров 1–2: их пропорции (1.533/1.532) шире слота 577×400 (1.4425), object-fit: cover
срезал ~6% ширины; кадр 3 совпадал почти точно. По решению владельца (вариант 1) выполнена
центровая обрезка файлов под пропорцию слота (System.Drawing, без изменения кода):
showreel-1 2432×1586 → **2288×1586** (−72px с краёв), showreel-2 2432×1588 → **2291×1588** (−70px),
showreel-3 1386×960 → **1385×960** (~1px, символически). Все кадры теперь заполняют слот полностью
и кадрируются единообразно. Build ✅.

**Файлы:** `src/content/home/images/showreel-1|2|3.png` (перезаписаны).

### Showreel: 3 кадра подключены, ротация активирована (22.08.2026)

Ассеты выгружены из секции «Ассеты» Figma (33313:3555) по правилам экспорта изображений
(IMAGE-fill узлы, свежие imageRef): showreel-1.png (узел 33313:8547), showreel-2.png (33313:3553),
showreel-3.png (33313:9817) — @2x 2432×1586/1588/1386×960, суммарно ~830KB.
В data.ts добавлены импорты и три записи в `showreelFrames` в порядке 1→2→3 (порядок показа).
Механизм useShowreel активировался автоматически (count=3): кроссфейд каждые 4с, пауза при наведении,
prefers-reduced-motion учтён. Проверки: `type-check`/`lint`/`build` ✅ (164 модуля).

**Файлы:** `src/content/home/images/showreel-1|2|3.png`, `pages/Home/data.ts`.

### Теги карточек «Опыта» + удаление бейджа UI/UX (22.08.2026)

**1) Бейдж «UI/UX» на hero удалён** (решение владельца): блок из HomeHero.tsx, стили `.badge`
(desktop+mobile), поле `badge` из HomeHeroData. Вариант Tag.inverted остался в DS, но теперь
не используется — кандидат на чистку.

**2) Теги карточек «Опыт» приведены к DS-компоненту tag 1799:6218 (вариант A владельца):**
- Карта 1 «БКС банк» («текущее место») → `Tag variant="default"` (тёмный #1F1F1F r8, попиксельно =
  Figma-компонент), тег в строке с названием.
- Карты 2–3 Simbirsoft (периоды) → `Tag light`, тег ПОД названием отдельной строкой, как в Figma
  (33291:4285 column gap 8).
- Механика: флаг `badgeInline?: boolean` в `HomeExperienceItem` (data.ts) управляет вариантом и
  позицией; `.cardHeaderStacked` в scss (column, gap x2).
- Осознанные отклонения от рукодельных плашек канваса зафиксированы: #060C17→#1F1F1F,
  #8C8C8C→light-плашка, метрики DS-тега (14 Medium, 4/8). Новых вариантов/токенов не создано.

Проверки: `type-check`/`lint`/`build` ✅ (162 модуля), `build-storybook` ✅.

**Файлы:** `sections/HomeHero/HomeHero.tsx|.module.scss`, `pages/Home/data.ts`,
`sections/HomeExperience/HomeExperienceSection.tsx|.module.scss`.

### Правило background-white в кнопках + hover «Наверх» (22.08.2026)

Решение владельца: заливки поверхностей в кнопках — только `background-*` токены, не content-white/fff.
Проверка: CTA hover-фон и «Наверх» дефолтный фон **уже** `--color-background-white` ✅.
Исправлено: заливка круга иконки CTA в normal `content-white` → `--color-background-white`
(HomeHero.module.scss). Hover-пара CTA не изменилась (круг primary / глиф background-white).

**Hover «Наверх» реализован по согласованию:** `background-color: --color-background-secondary`
(#E2E4E7, ступень Background-шкалы) + существующая тень; transition расширен на background-color
(HomeScrollTopButton.module.scss). Build ✅.

**Файлы:** `sections/HomeHero/HomeHero.module.scss`,
`sections/HomeScrollTop/HomeScrollTopButton.module.scss`.

### Кнопка «Наверх»: настоящая стрелка из Figma + a11y (22.08.2026)

Аудит узла 33291:4380 выявил: в коде был самодельный «шеврон» (strokeWidth 2, без древка), зазор
стрелка→текст 4px против 0px в макете, отсутствие focus-visible.

**Вариант A реализован:**
- Новый DS-chrome компонент `src/shared/assets/ArrowUp/ArrowUp.tsx` — настоящий глиф из инстанса
  I33291:4380;228:653 (древко + наконечник вверх, 32×32, штрих 2, currentColor).
- `HomeScrollTopButton.tsx`: шеврон заменён на `<ArrowUp />`.
- scss: gap 4px → 0 (контент-блок 48px по центру, как в Figma); добавлен
  `&:focus-visible { outline: 2px solid var(--color-content-primary); outline-offset: 2px }`.

Проверки: `type-check`/`lint`/`build` ✅ (162 модуля), `build-storybook` ✅.

**Файлы:** `src/shared/assets/ArrowUp/ArrowUp.tsx` (новый),
`sections/HomeScrollTop/HomeScrollTopButton.tsx|.module.scss`.

### Иконка CTA из Figma: компонент ArrowDownRight (22.08.2026)

Владелец попросил вариант B: настоящая иконка стрелки из макета вместо самодельной SVG.
Экспорт инстанса I33291:4236;228:624 раскрыл реальный дизайн: **залитый круг #EEEEEE + диагональная
стрелка ↘ #14181F** (семейство Arrow / Arrow_Left_M, 48×48), без контурного кольца.

**Куда положена:** `src/shared/assets/ArrowDownRight/ArrowDownRight.tsx` — React-компонент DS-chrome
по правилу docs/figma-workflow.md («DS-chrome icons stay React components in the Design System»),
по образцу Logo. НЕ в content/home/images (там только контентные растровые ассеты) и не в
content/cases/*/icons (то — для JSON-контента кейсов). Цвета через CSS-переменные:
`--arrow-circle-color` (default currentColor) и `--arrow-glyph-color`.

**Hover-фикс:** `.ctaArrow` больше не хардкодит белый цвет. Пары цветов в HomeHero.module.scss:
normal = круг content-white / глиф hero-фон; hover = круг content-primary / глиф белый.
Иконка полностью перекрашивается при наведении. Старая рамка 1px удалена (в Figma её нет).
Локальная SVG ArrowIcon (20×20) удалена.

Проверки: `type-check`/`lint`/`build` ✅ (161 модуль), `build-storybook` ✅.

**Файлы:** `src/shared/assets/ArrowDownRight/ArrowDownRight.tsx` (новый),
`sections/HomeHero/HomeHero.tsx|.module.scss`.

### Радиус CTA «Смотреть кейсы»: 8px → 16px (22.08.2026)

**Найденный баг:** `shape="pill"` (999px) никогда не применялся к кнопке hero — в Button.module.scss
`.pill` объявлен раньше, чем `.filled`/`.outline`, при равной специфичности побеждает позднее правило,
поэтому радиус оставался 8px базового outline (латентный баг атома, зафиксирован как tech debt).
**Решение владельца:** радиус 16px только для этой кнопки (999px сочтён избыточным), атом не трогать.
**Реализация:** в HomeHero убран нерабочий `shape="pill"`, добавлен `className={styles.cta}`;
в HomeHero.module.scss — `.textBlock .cta { border-radius: var(--radius-16) }` (двухклассовый селектор
гарантирует приоритет над одноклассовыми правилами модуля Button). Остальные кнопки проекта без изменений.
Проверки: `type-check`/`lint`/`build` ✅, `build-storybook` ✅.

**Файлы:** `sections/HomeHero/HomeHero.tsx|.module.scss`.

### Токен бегущей строки: жирность 600 → 500 (22.08.2026)

Решение владельца: `--title-marquee` изменён с `600 120px/1.3` на **`500 120px/1.3`** (Onest Medium).
Синхронизировано: `tokens.scss`, `docs/tokens.md` (таблица Title/Marquee + примечание). Build ✅.

**Файлы:** `src/shared/tokens/tokens.scss`, `docs/tokens.md`.

### Фикс цвета логотипа в шапке (22.08.2026)

Владелец: логотип на главной должен быть `content-white`, на светлых страницах — как есть.
**Корень дефекта:** глобальное правило `a { color: var(--color-content-primary) }` (_global.scss)
перебивало наследование для `<Link>` вокруг Logo, из-за чего `currentColor` логотипа резолвился
в #1E1E1E даже на тёмном hero (механизм `.inverted { color: content-white }` не доходил до SVG).
**Фикс:** одно правило `.logoContainer a { color: inherit }` в Header.module.scss — специфичность
(0,1,1) > глобального `a`; inverted → белый, default → унаследованный primary (без изменений).
Глобальный `a`, Button и другие ссылки не тронуты. Проверки: `type-check`/`lint`/`build` ✅,
`build-storybook` ✅.

**Файлы:** `src/shared/ui/organisms/Header/Header.module.scss`.

### Итерация «ExpertCard» (22.08.2026) — вертикальный срез после homepage-audit-v2

Владелец заморозил остальные секции и заказал доводку одного блока: декоративная карточка
«EXPERT UX» (sheet, Figma group `33291:4367`), пересекающая границу светлой/тёмной зон в секции Навыков.

**Анализ:** прежняя реализация — единый PNG `skills-sheet.png` absolute top:0 + `.darkZone` margin-top 256px
(оверхрайд итерации 3.2 «~30%» вместо y278 из Figma). Геометрически работало, но: значение границы
расходилось с Figma, композит был растровым (нельзя менять слои), z-order внутри коллажа был запечён.

**Реализовано** (только этот блок):
- Экспортированы слои из Figma по правилам figma-workflow: `skills-photo-1.png` (узел 4376, @2x 1012×680),
  `skills-photo-2-20c43a.png` (узел 4378, cropTransform + suffix из Figma), `circle2.svg` (узел 4379).
- `ExpertCard` пересобран слоями DOM в `HomeSkillsSection` (.tsx): подложка #EF9FAA 532×320 r24 → фото1
  (клип 380×223 @14,143; img 506×340 −1/−20) → фото2 (234×270 @274,96, r 0 0 24 0) → бар #BB6B76 100×12 r4
  @246,354 → текст EXPERT 52 Bold + UX 40 Bold (+72/+41) rgba(52,21,57,.5) @184,260 → круг circle2 167×165 @24,0.
- Layout-модель: `.section { position: relative }`, `.expertCard { position: absolute; top:0; left:50%;
  translateX(-50%) }` идёт **в DOM после** `.darkZone` → рисуется поверх обоих фонов без z-index/отрицательных margin.
- **Геометрия Figma восстановлена точно**: `.darkZone` margin-top 278px (узел 4338 y278) — отменяет оверрайд
  итерации 3.2 (256px); перекрытие листа тёмной зоной = 88px (24%), как в макете. Заголовок секции на y446,
  зазор от листа 80px.
- Удалён устаревший `skills-sheet.png`.

**Решения (задокументированы в коде):** декоративные цвета блока — локальные custom properties с узлами Figma
(не глобальные токены; кандидат в токены при переиспользовании); EXPERT/UX — точные значения 52/40px Bold Onest;
z-order бара и текста поднят над фото (в дереве Figma они ниже фото, но полупрозрачный текст — «водяной знак»
поверх коллажа по дизайн-замыслу; строгое дерево сделало бы его невидимым).

**Проверки:** `type-check` ✅, `lint` ✅, `build` ✅ (161 модуль, skills-sheet отсутствует в dist),
`build-storybook` ✅. Визуальная QA на 1280/1024/768/430/375 — за владельцем (модель не читает изображения);
ожидаемая геометрия описана в отчёте сессии.

**Дофикс после ревью владельца («блок стоит не так»):** найдено схлопывание вертикальных отступов —
`margin-top: 278px` у `.darkZone` коллапсировал через `.section` (position:relative не создаёт BFC), из-за чего
absolute-`.expertCard { top: 0 }` якорился к началу тёмной зоны и карточка ложилась целиком на тёмный фон
(это же объясняет жалобу итерации 3.2 «лист лежит на тёмном блоке»). Исправлено: светлая зона — явный
`.section { padding-top: 278px }`, у `.darkZone` margin убран; на mobile — `padding-top: 0`. Absolute-якорь
считается от padding-box секции → карточка остаётся на самом верху секции, тёмная зона начинается ровно на y278.
Повторно: build ✅, build-storybook ✅.

**Замена слоёв на единое изображение (решение владельца):** послойная DOM-сборка ExpertCard заменена
на единый PNG из Figma group **33306:1132** («sheet», 532×320 @2x 1064×640 — розовая карточка + фото +
EXPERT UX, без круга circle2). Позиция сохранена одобренной: `.sheet { top: 46px }` — контент листа на
канвасе занимает y46…y366, поэтому перекрытие тёмной зоны 88px и зазор до заголовка 80px неизменны.
Удалены ассеты слоёв `skills-photo-1.png`, `skills-photo-2-20c43a.png`, `circle2.svg`. Повторно:
`type-check`/`lint`/`build` ✅ (159 модулей), `build-storybook` ✅.

**Возврат круга circle2 с вращением:** по узлу 33291:4379 (векторный бейдж: диск #341539, текст по
окружности и росчерк #FFB1CD) — circle2.svg выгружен заново. Обёртка `.sheet` (532×366) содержит два слоя:
лист (top:46) + круг @ x24/y0 поверх (DOM-порядок → рисуется сверху). Вращение CSS-keyframes
`rotate(0→360deg)` **12s linear infinite** по часовой (период — решение владельца; тайминг Figma-прототипа
недоступен), только transform (GPU), `prefers-reduced-motion` отключает. Геометрия одобренной позиции
не изменилась (низ листа y366, перекрытие 88px). Проверки: `type-check`/`lint`/`build` ✅ (160 модулей),
`build-storybook` ✅.

**Файлы:** `sections/HomeSkills/HomeSkillsSection.tsx|.module.scss`,
`src/content/home/images/skills-sheet.png|circle2.svg`.

### Аудит Homepage v2 (22.08.2026) — исследовательский этап, код не менялся

Проведено полное ревью текущей главной (`src/app/pages/Home/*`) против трёх источников:
свежая выгрузка Figma-канваса «Главная» `33291:4230` (узлы 4231/4236/4250/4318/4337 перечитаны),
legacy-проект (`C:\Users\mp3ps\Documents\portfolio`) и архитектура текущего проекта.
Прочитаны README/AGENTS/project-context/architecture/design-system/tokens/ai-philosophy/figma-workflow/frontend-engineer + parity/report-ы прошлых сессий.

**Итог:** пересборка не нужна — точечный refactor. Соответствие Figma ~85% → после правок ~95%.

Ключевые находки (детали в `report/homepage-audit-v2.md`, §11):
- 🔴 Карточка кейса: плоский gap 32 между title/subtitle/slot; в Figma текстовый блок gap **16** (`EL-d8a3e5e9`).
- 🔴 Плейсхолдер 3-й карты кейса — заменить композитом из узла `33291:4321`.
- 🟠 Бейдж «UI/UX»: Tag.inverted даёт 14px/pad 4·8, в Figma 16px/pad 10 (#2E343F pill совпадает).
- 🟠 Subtitle кейса `--text-m`(16/22.4) vs Figma 16/24 → `--text-s`.
- 🟢 Опыт: dot margin-top 7→6 и пиксельная типографика; orphan `scroll.svg` удалить.
- ❓ Открытые вопросы Q1–Q7: хедер на главной (в Figma только центрированный лого), подрезка marquee (120px текст в полосе 132px), H1 24 vs 28px, флюид заголовков на 320–430, вариант Tag для бейджей опыта, позиция бейджа в картах 2/3, навигация карусели.
- Legacy: сложных анимаций в активном коде нет (motion/rAF только в неиспользуемых компонентах) — терять нечего; hover-scale из legacy отсутствует и в Figma → не возвращать.
- DS-аудит: raw colors/typography = 0; хардкод — только локальная геометрия узлов Figma (прокомментирована); кандидаты в токены `--layout-header-height`, `--radius-pill` — только через согласование.

**Осознанные отклонения от Figma зафиксированы** (не считать ошибками): cap контента 1280 vs 1376, darkZone margin-top 256 vs y278, H1 24px, Tag вместо точных бейджей, 3 карты без карусели, chat-карточка вне макета.

Проверки: не запускались (код не менялся).

## Files changed
- `report/homepage-audit-v2.md` — новый отчёт аудита (14 разделов).
- `docs/session/session-summary.md` — обновлён.

## Components created
- Код не менялся, компоненты не создавались.



Владелец ответил на открытые вопросы и заказал итерацию 3 «чисто дизайн из Figma». Реализовано:

- **Кейсы**: 3 карточки; изображения-превью из Figma (композиты «тинт-подложка + девайс»): `case-ekvairing.png` (зелёный тинт `rgba(0,155,58,.18)`) и `case-chat-platform.png` (синий тинт `rgba(33,117,240,.18)`), выгружены @2x (928×768 = 464×384). Третья карточка «Редизайн онлайн банка» — временно превью чат-платформы («поставь пока любую»). Слот карточки: `aspect-ratio: 464/384`, `object-fit: fill` (без кропа). Навигация карусели не делалась (владелец: «навигацию не делай пока»). Ссылки на `/case/*` сохранены, заголовки — `--color-content-primary`.
- **Hero**:
  - Гифка-полоса **132px ниже шапки** (`padding-top: calc(48px + var(--spacing-x5)*2 + 132px)` = 220px; шапка 88px: высота 48 + отступы 2×20; Figma y218).
  - Снизу секции **120px** (`padding-bottom: var(--spacing-x30)`).
  - **Scroll-индикатор** (Figma y798) перенесён **между showreel и текстом** (10px ниже showreel, 64px до текста); вёрстка переведена с `<img scroll.svg>` на инлайн-SVG (линия + «мышь» + точка) с **CSS-анимацией точки** `@keyframes scrollDot` (движение вниз + затухание, 1.8s infinite). Старый скролл-индикатор в старом проекте отсутствует (проверено), анимация сделана по компоненту Figma `scroll` (33291:3334).
  - **Бейдж «UI/UX»** — `#2E343F` (новый токен `--color-background-hero-badge`), пилла, поверх гифки справа (top 305px, right 0 — Figma y305).
  - **CTA** — пилла (999px) + круглая стрелка **48×48** (контур 1px `content-white` + стрелка 20px). Атом `Button` расширен по правилам DS: пропсы `shape="pill"` и `icon`.
  - H1 — остаётся **24px** (владелец: «оставь 24px, не критично»).
- **Опыт**: gap компания→буллеты **16px** (`x4`), буллет→буллет **12px** (`x3`); цвета — `--color-content-primary` (не #000000/#212121); точка 8px сохранена; теги-бейджи — `Tag variant="light"` (светлый пилла из рол-таблицы RolesTable).
- **DS-расширения**: `Tag` — `variant: 'default' | 'light' | 'inverted'` (light = роль-пилла из RolesTable, inverted = hero-бейдж `#2E343F`), добавлены стори Light/Inverted; `Button` — `shape: 'rounded' | 'pill'`, `icon?: ReactNode`, outline переведён на `--text-s` (16px), добавлена стори PillInverted.
- **Ассеты**: добавлены `case-chat-platform.png`, `case-ekvairing.png`; **удалены** осиротевшие `case-acquiring-1c3967.png`, `case-banking.png` (после замены в `data.ts`).

**Проверки:** `type-check` ✅, `lint` ✅, `build` ✅, `build-storybook` ✅.

**Файлы:** `src/shared/tokens/tokens.scss` (токен hero-badge), `atoms/Tag/*` (варианты + стори), `atoms/Button/*` (shape/icon + стори), `sections/HomeHero/*` (гифка/скролл/бейдж/CTA), `sections/HomeExperience/*` (отступы + light-тег), `sections/HomeCases/HomeCaseCard.module.scss` (слот 464/384 + fill), `pages/Home/data.ts` (изображения кейсов), `content/home/images/*` (2 новых, 2 удалены).

### Итерация 3.1 — ширина контента + CSS-бегущая строка вместо GIF

По указанию владельца:

- **Ограничение ширины главной** «по аналогии со страницей кейса»: `HomePage.module.scss .content` — `max-width: var(--layout-page-max)` (1280px) + `margin: 0 auto` (как `CaseRenderer.pageContainer`), гуттеры 32px. Раньше секции «Опыт»/«Кейсы» растягивались на 1376. Обновлены комментарии в `HomeExperienceSection.module.scss`/`HomeCasesSection.module.scss`. Фон hero и тёмная зона «Навыков» остаются полноширинными (фоновые зоны макета).
- **Токен `--title-marquee`**: `600 120px/1.3 var(--font-family-onest)` (Onest SemiBold, hero текст-полоса из Figma GIF `text 3`; владелец уточнил 80px → 120px). Добавлен в `tokens.scss` (Title Styles, 10 шт.), `docs/tokens.md` (Typography 21→22, TOTAL 63→64), `docs/token-reference.md`.
- **CSS-бегущая строка вместо GIF**: компонент `Marquee` в `HomeHero.tsx` (два идентичных дубля по 5 повторов фразы «Проектирую дизайн мобильных и веб интерфейсов» + разделитель ` - `, `translateX(-50%)` = бесшовный цикл, `animation: marquee 30s linear infinite`). `data.ts`: `gifSrc` удалён из `HomeHeroData`, добавлен `marqueeText`. `HomeHero.module.scss`: `.gif` → `.marquee` (высота 132px из Figma, `align-items: center`, overflow hidden), keyframes `marquee`, `@media (prefers-reduced-motion: reduce)` отключает анимацию; на mobile полоса скрыта (как была гифка). **Удалён файл `text-3.gif`** (15 МБ больше не грузится; dist без него).
- **Скорость бегущей строки замедлена** в 4 раза: `30s → 120s` за цикл (~120px/s, фраза в поле зрения ~12s — читается).
- **skill-sheet.png**: добавлен `margin-top: var(--spacing-x20)` (80px) секции «Навыки» — отступ 80px между карточками кейсов и листом (по указанию владельца). Перекрытие листа с тёмной зоной сохранено (Figma: лист y0, тёмная зона y278 → ~24% ≈ «~30%» по словам владельца).
- Отступ hero→«Опыт» по указанию владельца оставлен как есть (hero `padding-bottom` 120px + секция «Опыт» `padding-top` 80px; пункт про 80px между hero и «Опыт» отменён — «забудь»).

**Проверки:** `lint` ✅, `type-check` ✅, `build` ✅ (159 модулей, GIF нет в dist), `build-storybook` ✅.

**Замечание:** токен 120px/1.3 = 156px строки, полоса 132px — текст центрирован и подрезается сверху/снизу (~12px); при необходимости увеличить высоту полосы или вернуть 80px.

Выполнена полная сверка реализации главной (`src/app/pages/Home/*`) с канвасом Figma «Главная» `33291:4230` (узел `33291:4230`, все подузлы считывались по-узлу). Составлен отчёт **`report/home-page-figma-parity-report.md`** (без изменений кода).

**Вывод:** реализация — «похожий черновик», визуально далека от макета. Ключевые расхождения:
- 🔴 Слот изображения карточек кейсов: в Figma цветная тинт-подложка (rgba 0.18) + перекрывающий device-mockup (планшет/iphone); в коде — cover-обрезка изображения (у онлайн-банка портретный телефон режется в ландшафтный слот 512×384).
- 🔴 Блок Кейсов в Figma — карусель из 5 карточек (эквайринг, онлайн-банк, автокредит, страховая, обучение) + разделитель #B1B1B1 и стрелки 56×56; в коде 3 карточки (2+«Скоро») без навигации (частично по решению владельца).
- 🔴 Декоративный «sheet» в Навыках (розовая карточка #EF9FAA, фото, круг circle2 #341539, EXPERT UX) — не реализован.
- 🔴 Hero: GIF прижат к верху и под оверлей-хедером (в Figma GIF на y=218, logo 63×63 по центру); хедер-навигации на главной в Figma нет.
- 🟠 CTA: текст 14px vs 16px, стрелка 20 vs 48; бейджи Tag (14px/#1f1f1f) vs Figma (#060C17/#8C8C8C, pill, 16px); H1 24 vs 28px; scroll-индикатор не там; gap карточек опыта 8/8 vs 16/12; gap title→subtitle кейсов 32 vs 16; колонка заголовка ряда навыков hug vs fill.
- 🟡 Мелкие: цвета #212121/#000000, line-height 22.4 vs 24, точка 7 vs 6px, плотность вертикальных отступов.

Отмечены решения владельца (Q1–Q7), которые сохраняются: 3 карточки кейсов, 28→24px, Tag, CTA без пилла; часть из них помечена рекомендацией пересмотреть (H1 hero 28px, бейджи серые #8C8C8C).

**Файлы:** `report/home-page-figma-parity-report.md` (новый), `docs/session/session-summary.md` (обновлён).

### Разбор отступов в секциях (по запросу владельца + анализ старого проекта)

Владелец указал, что отступы в секциях не сверены, и попросил внимательно изучить старый React-портфолио (`C:\Users\mp3ps\Documents\portfolio`). Итог анализа добавлен в отчёт как раздел **8 «Отступы в секциях»**.

**Старый проект** (`src/app/components/*`, Tailwind): каждая секция — `max-w-7xl mx-auto px-8 py-20` = контейнер 1280 по центру, гуттеры 32px, вертикальный ритм 80px, разделители `border-t`. Это «язык отступов» портфолио: 80px-шаг + гуттеры 32px.

**Figma** (по координатам узлов): страница 1440, секции полноширинные (не центрированы в 1216); hero → «Опыт» = **80px** (main 4231 кончается 1354, content 4248 на y1434); «Опыт» → «Кейсы» = **120px** ✓; «Кейсы» → «Навыки» = 0px, но переход через светлую зону ~278px + декоративный sheet; Опыт: контент **1376** (padding 0/32), карточки растянуты ~**448px**; Кейсы heading→cards ~40px; Skills: контент от y168, кнопка на y1174 (высота 1302).

**Расхождения в коде (добавлены в таблицу):**
- 🔴 18: секции центрированы `max-width: 1216` vs полноширинные 1376 → карточки ~395 vs ~448px.
- 🟠 19: hero → «Опыт» = 56px vs 80px (`HomeHero.module.scss` padding-bottom).
- 🔴 20: резкий обрыв «Кейсы»→«Навыки» vs светлая зона + sheet (дубль п.2).
- 🟠 21: тёмная зона Навыков 60px padding vs ~168px сверху/≈300px низ.
- 🟡 22: Кейсы heading→cards 32 vs ~40px.

Порядок доработок в отчёте обновлён: **отступы/ширина секций — первым пунктом**.

### Доработка отступов в секциях (по согласованию владельца)

Начаты правки по порядку доработок №1 (только отступы). Реализовано:

- **Ширина секций «Опыт»/«Кейсы»**: убрана обрезка `max-width: 1216` → полноширинные (гуттеры 32px от `.content` HomePage), карточки растянуты ~448px на 1440 (Figma 1376).
- **hero → «Опыт» = 80px** (`HomeHero` padding-bottom `x14`→`x20`).
- **«Кейсы» → «Навыки»**: светлая зона **278px** (продолжение фона страницы) + декоративный **«sheet»**. Группа Figma `33291:4367` выгружена единым PNG с прозрачностью `skills-sheet.png` (1064×732 @2x = 532×366), позиционирована absolute по центру, пересекает границу светлого/тёмного. Отдельные `skills-photo-1/2`, `circle2.svg` удалены.
- **Тёмная зона Навыков**: `min-height 1024` (Figma 4338), контент от **168px**, кнопка «Наверх» перенесена внутрь тёмной зоны (`margin-top: auto`, Figma y1174).
- **Кейсы: заголовок → карточки = 40px** (`x8`→`x10`).
- **Навыки: колонки ряда** — заголовок и описание `flex: 1` (fill ≈50/50, Figma).
- Mobile: sheet скрыт, светлая зона убрана, тёмная зона `min-height: 0`.

**Файлы:** `HomeExperienceSection|HomeCasesSection|HomeHero|HomeSkillsSection|HomePage` (tsx/scss/stories), `HomeScrollTopButton` перемещён в состав Skills, `report/home-page-figma-parity-report.md` (+ раздел «Статус выполнения»).

**Проверки:** `type-check` ✅, `lint` ✅, `build` ✅, `build-storybook` ✅.

### Итерация 3.2 — позиционирование «sheet»: перекрытие тёмной зоны ~30% высоты листа

По уточнению владельца («картинка накладывается нижним краем на ~30% своей высоты на таблицу с навыками, остальная часть — на блоке кейсы»; раньше лист «просто лежал на тёмном блоке и перекрывал заголовок»):

- `.darkZone` `margin-top: 278px → 256px` в `HomeSkillsSection.module.scss`. Геометрия: лист 532×366 (Figma `33291:4367`, y0); тёмная зона (`33291:4338`) начинается на **y256** внутри секции → перекрытие = 366 − 256 = **110px = 30.05%** высоты листа. Верхние 256px (~70%) листа — на блоке кейсов, нижние 110px — на тёмной зоне.
- Отступ 80px от кейсов до листа сохранён (`margin-top: var(--spacing-x20)` на `.section`).
- Заголовок «Чем могу помочь вашему бизнесу?»: раньше y446 (278+168), теперь y424 (256+168) — лист (низ на y366) заголовок не перекрывает (зазор ~58px).
- Обновлены комментарии в шапке файла и у `.darkZone` (было 278px / «~24%»).

**Проверки:** `lint` ✅, `type-check` ✅, `build` ✅ (159 модулей, `skills-sheet-Bj3Rxrm_.png` в dist), `build-storybook` ✅.

**Файл:** `src/app/pages/Home/sections/HomeSkills/HomeSkillsSection.module.scss` (комментарии + `margin-top: 256px`).

**Визуальную сверку делает владелец** (модель не читает изображения): проверить в Storybook/browser, что нижние ~110px листа заходят на тёмную зону, а заголовок «Чем могу помочь…» виден ниже листа.

## Files changed
- `src/app/pages/Home/sections/HomeSkills/HomeSkillsSection.module.scss` — итерация 3.2: `.darkZone` `margin-top: 256px` (было 278px) + комментарии.
- `report/home-page-figma-parity-report.md` — новый отчёт о расхождениях с макетом; дополнен разделом 8 «Отступы в секциях» (+ строки 18–22 в сводной таблице, обновлён порядок доработок), добавлен «Статус выполнения» (2026-08-13).
- `docs/session/session-summary.md` — обновлён.
- **Доработка отступов:** `sections/HomeExperience/HomeExperienceSection.module.scss`, `sections/HomeCases/HomeCasesSection.module.scss` (убрана обрезка 1216), `sections/HomeHero/HomeHero.module.scss` (padding-bottom 80px), `sections/HomeSkills/HomeSkillsSection.tsx|.module.scss|.stories.tsx` (светлая зона 278px + sheet + тёмная зона min-height 1024 + кнопка «Наверх» внутри), `HomePage.tsx|.module.scss` (убран scrollTop-обёртка, `onScrollTop` в Skills).
- `src/content/home/images/` — добавлен `skills-sheet.png` (композит 1064×732 @2x); **удалены** `skills-photo-1.png`, `skills-photo-2-20c43a.png`, `circle2.svg`.
- `report/figma-reference-skills.png` — референс-рендер секции (1440×1302) для сверки.

## Components created
- Отчёт (документ), код не менялся.

### Реализация главной страницы (Home page) из Figma

Полная пересборка главной страницы в текущем проекте (без переноса кода старого репозитория). Все визуальные решения согласованы с владельцем через Q1–Q7 аудита (`report/home-page-rebuild-audit.md`).

**Решения владельца:** showreel оставить; футер отдельной задачей; hero-bg `#060C17` — новый токен; page-bg → существующий `--color-background-primary`; 68px-заголовки — новый токен; 28px-заголовки → существующий 24px-токен заголовков; Button расширять (не круглые, `--radius-8`); теги → готовый `Tag`; кейсы — 3 карточки в ряд (stretch 100%), без карусели, со ссылками; папка `src/app/pages/Home/*`; GIF вставить как есть; 3-я карточка кейса — заглушка «Скоро» (Mobile Banking, изображение из Figma); showreel — пока 1 кадр + механизм кроссфейд-ротации.

- **Экспорт ассетов** из Figma (канвас «Главная» `33291:4230`) в `src/content/home/images/`: `showreel-1.png`, `text-3.gif`, `case-acquiring-1c3967.png` (кроп), `case-banking.png`, `skills-photo-1.png`, `skills-photo-2-20c43a.png` (кроп), `scroll.svg`, `circle2.svg`.
- **Токены** (`tokens.scss` + `docs/tokens.md`, значения из Figma): `--color-background-hero: #060c17`, `--color-background-hero-line: #292d37`, `--spacing-x16: 64px`, `--spacing-x30: 120px`, `--title-display: 500 68px/1.3 Onest`. Итог tokens.md: Colors 19, Spacing 15, Typography 21, **TOTAL 63**.
- **DS-расширения:** `Button` — `type="outline"` + проп `inverted` (+ стори Outline/OutlineInverted/FilledInverted); `Header` — проп `theme: 'default' | 'inverted'` (+ стори Inverted); `Title` — размер `XL` → `--title-display`.
- **Страница `Home/`** (`src/app/pages/Home/`): `data.ts` (типизированный контент hero/experience/cases/skills), `hooks/useShowreel.ts` (кроссфейд-ротация), секции `HomeHero` (тёмный, GIF-полоса, showreel, CTA outline inverted + стрелка, scroll-индикатор, бейдж UI/UX через `Tag`), `HomeExperienceSection` (3 белых карточки, буллеты), `HomeCasesSection` + `HomeCaseCard` (3 в ряд, RouterLink; «Скоро» — без ссылки), `HomeSkillsSection` (тёмный фон, ряды title+description + делинители `--color-background-hero-line`), `HomeScrollTopButton` (круглая 120×120, страничная, не DS Button). Стори для каждой секции.
- **Роутер/layout:** `RootLayout` получил проп `headerTheme`; `/` использует `headerTheme="inverted"` (светлый хедер на тёмном hero), `/case/:slug` — default. Старые `src/app/pages/HomePage.tsx` + `HomePage.module.scss` (плейсхолдер) удалены.
- **Доки:** `docs/architecture.md` — папки `pages/Home/` и `content/home/images/`.

**Проверки:** `type-check` ✅, `lint` ✅ (0 errors), `vite build` ✅, `build-storybook` ✅.

## Files changed

- `src/shared/tokens/tokens.scss`, `docs/tokens.md` — новые токены (hero, hero-line, spacing x16/x30, title-display).
- `src/shared/ui/atoms/Button/Button.tsx|.module.scss|.stories.tsx` — outline + inverted.
- `src/shared/ui/organisms/Header/Header.tsx|.module.scss|.stories.tsx` — theme inverted.
- `src/shared/ui/molecules/Title/Title.tsx|.module.scss|.stories.tsx` — size XL.
- `src/app/router/index.tsx` — HomePage из `pages/Home/`, headerTheme per-route, убран LayoutWrapper/Outlet.
- `src/app/layouts/RootLayout.tsx` — проп `headerTheme`, проброс в Header.
- `src/app/pages/Home/` — новый: `data.ts`, `hooks/useShowreel.ts`, `HomePage.tsx|.module.scss`, `sections/HomeHero/*`, `sections/HomeExperience/*`, `sections/HomeCases/*`, `sections/HomeSkills/*`, `sections/HomeScrollTop/*` (каждый с `.stories.tsx`).
- `src/content/home/images/` — 8 выгруженных ассетов (новые).
- `src/app/pages/HomePage.tsx`, `src/app/pages/HomePage.module.scss` — **удалены** (заменены на `pages/Home/HomePage.tsx`).
- `docs/architecture.md` — обновлена структура папок.

## Components created

- `HomeHero` (+ `HomeHero.module.scss`, `HomeHero.stories.tsx`)
- `HomeExperienceSection` (+ scss + stories)
- `HomeCasesSection` (+ scss + stories), `HomeCaseCard` (+ scss + stories)
- `HomeSkillsSection` (+ scss + stories)
- `HomeScrollTopButton` (+ scss + stories)
- `useShowreel` (хук кроссфейд-ротации)
- `data.ts` (типы + `homeContent`)

## Remaining issues

1. Визуальная QA сегодняшней пачки в браузере: ExpertCard (граница/вращение круга), showreel (адаптивная высота, без кропа), теги «Опыта», кнопки (радиус 16/hover), белый логотип шапки, marquee Medium 500, отступ 160px до «Навыков».
2. Showreel кадр 3: пропорция 1.4439 против 1.5337 у кадров 1–2 — для идеала нужен ассет ~1216×794 от дизайнера.
3. Tag variant `inverted` остался в DS без потребителей после удаления бейджа UI/UX — кандидат на чистку.
4. Открытые вопросы аудита v2: хедер главной (Q1), H1 24 vs 28px (Q3), флюид заголовков на 320–430 (Q4), метрики Tag для RolesTable/«Скоро» (база атома).
5. Tech debt: латентный баг `Button.pill` (перебивается `.outline/.filled` при равной специфичности); Sass legacy-js-api warnings.
6. Не выполнена **Итерация A** из homepage-audit-v2 («Кейсы»): gap16 title→subtitle, subtitle → `--text-s`, реальное изображение 3-й карты (узел 33291:4321), удаление orphan `scroll.svg`.
7. Дальше по бэклогу: карусель кейсов (линия #B1B1B1 + стрелки 56×56), футер.

## Next recommended task

**Итерация A «Кейсы»** (план из homepage-audit-v2 §14): gap16 в текстовом блоке карточки кейса + subtitle `--text-s` + реальное изображение 3-й карты (узел 33291:4321) + удаление orphan `scroll.svg`. Перед этим — визуальная QA сегодняшних правок владельцем.

## Suggested prompt for the next session

```text
Продолжи проект portfolio-ai. Сегодняшние правки главной закоммичены (381fc28, 871ccda и далее).
Сначала: визуальная QA главной в браузере (ExpertCard+circle2, showreel адаптивный, теги Опыта,
кнопки CTA/Наверх, логотип шапки, marquee 500, отступ 160px до Навыков).
Затем Итерация A «Кейсы»:
1. HomeCaseCard: обернуть header+subtitle в текстовый блок gap 16 (--spacing-x4); до слота остаётся 32 (--spacing-x8).
2. Subtitle: --text-m → --text-s (16/24, как style_b31ccdd7 в Figma).
3. Заменить плейсхолдер 3-й карты «Редизайн онлайн банка»: композит из Figma узла 33291:4321 @2x → src/content/home/images/, подключить в data.ts.
4. Удалить неиспользуемый src/content/home/images/scroll.svg.
Проверки: npm.cmd run type-check, lint, build, build-storybook. Завершить обновлением session-summary.
```

---

## Архив предыдущих сессий

### Итерация 3 — hero/кейсы/опыт по чистому дизайну Figma (все ответы владельца получены)

Не забудь: правила — AGENTS.md (boot: README → project-context → architecture → json-case-study-architecture), все визуальные значения из Figma и токенов, сессии завершай обновлением docs/session/session-summary.md.
