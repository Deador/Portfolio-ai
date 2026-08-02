# Отчет: сверка секций кейса с Figma-дизайном

**Дата:** 2026-08-02
**Статус:** Готово к согласованию (код не изменялся)
**Область:** Сверка реализации (React/SCSS) с Figma для узлов:
- `1799-8882` — Problem Section (Common Card, тип Insight)
- `1799-8906` — Goals Section (Common Card, тип Number)
- `1806-5773` — Context Section (Common Card, тип Risk)

**Эталон:** Figma file `i3ANEQ3o83zbqvSqYGSYBC`, токены `docs/tokens.md`
**Аудитор:** AI agent (code review vs Figma)

> Примечание: `component-inventory.md` в репозитории отсутствует — инвентаризация выполнена по фактическому коду.

---

## 1. Резюме

Точность реализации: **78%**

Базовая структура секций (ширины, gap, радиусы, padding, цвета) совпадает с Figma. Найдена одна **критическая** ошибка: в Goals Section номера-бейджи («цифры сверху») не рендерятся, потому что компонент не передаёт проп `number`. Остальные отклонения — точечные расхождения в типографике (line-height) и внутренних отступах.

---

## 2. Найденные проблемы

### Проблема 1 — КРИТИЧЕСКАЯ

Severity: **Critical**

Расположение: `GoalsSection` → `CommonCard` (вариант number)

Ожидается (Figma): Goals Section содержит 4 Number Card, каждая с бейджем 56×56, выступающим над верхней кромкой карточки (`y: -28`), тёмным фоном `#1E1E1E`, радиусом 16 и цифрой в стиле `Title/H3`. Именно это и есть «цифры сверху».

Фактически (реализация): `GoalsSection.tsx:27` рендерит `<CommonCard ... title={card.title} description={card.description} />` и **не передаёт `card.number`**. Разметка бейджа (`numberBadge`) в `CommonCard` существует, но недостижима — номера не отображаются вовсе.

Рекомендация: передать `number={card.number}` в map в `GoalsSection` (как уже сделано в `RetrospectiveSection.tsx:27`).

---

### Проблема 2

Severity: **Medium**

Расположение: `CommonCard` — вариант insight (`CommonCard.module.scss:14-29`)

Ожидается (Figma): заголовок и описание Insight Card используют `Text/S` — 16px / **line-height 24px** (стиль `Text/S (851:3095)`).

Фактически: используется `--text-m` = 16px / **22.4px**. Line-height на 1.6px короче на строку; заметно по трём карточкам подряд в Problem Section.

Рекомендация: использовать `font: var(--text-s)` для `.insight .title` и `.insight .description`.

---

### Проблема 3

Severity: **Medium**

Расположение: `CommonCard` — вариант risk / `ContextSection`

Ожидается (Figma): Risk Card (`1806-5773`) содержит только **иконку + заголовок + описание**. Иконка находится в собственном фрейме; слот-подпись (label) отсутствует (`componentProperties` = только Description и Title).

Фактически: `ContextSection` получает `label: 'Системный подход'`, а `CommonCard` рендерит `.eyebrow` с иконкой **и текстом** `eyebrowText` в `--title-h4-strong` — дополнительный элемент, которого нет в Figma-узле. Добавляет лишнюю строку и меняет вертикальный ритм.

Рекомендация: убрать `label` из вызова Risk Card (или убрать текст подписи из варианта risk), чтобы соответствовать дизайну.

---

### Проблема 4

Severity: **Minor**

Расположение: `CommonCard` — вариант risk (`CommonCard.module.scss:34-50`)

Ожидается (Figma): внутри Risk Card отступ между заголовком и описанием — **12px** (внутренний фрейм текста `gap: 12`).

Фактически: `.content` использует `gap: inherit` → наследует **16px** (gap карточки).

Рекомендация: задать `.risk .content` явный gap **12px** (`var(--spacing-x3)`).

---

### Проблема 5

Severity: **Minor**

Расположение: `CommonCard` — вариант number (`CommonCard.module.scss:118-136`)

Ожидается (Figma): Number Card имеет фиксированную высоту **160px** (vertical fixed).

Фактически: `.number` не задаёт высоту — карточка «обнимает» контент (~112px). Четыре карточки Goals на 48px ниже дизайна.

Рекомендация: добавить `height: 160px` (значение из Figma).

---

### Проблема 6

Severity: **Minor**

Расположение: `ContextSection` (`ContextSection.module.scss:51-53`)

Ожидается (Figma): Risk Card лежит в обёртке с **padding-top: 16px** (`padding: 16px 0 0`), т.е. сдвинута на 16px вниз относительно строк.

Фактически: `.cardSlot` без верхнего padding — карточка начинается сразу после gap секции (в сумме 32px вместо 32px gap + 16px отступа).

Рекомендация: добавить `padding-top: var(--spacing-x4)` в `.cardSlot`.

---

### Проблема 7

Severity: **Minor**

Расположение: `Citate` (`Citate.module.scss:25-37`) — внутри Problem Section

Ожидается (Figma): имя — `Text/S` (16/24) `#787878`; текст цитаты — `Text/S` `#000000`.

Фактически: имя и цитата используют `--text-m` (16/22.4); цвет цитаты — `--color-content-primary` `#1e1e1e`. Расхождение line-height (24 vs 22.4); цвет почти идентичен.

Рекомендация: использовать `font: var(--text-s)` для имени и текста цитаты.

---

### Проблема 8

Severity: **Minor**

Расположение: `ProblemSection` (`ProblemSection.module.scss:41-47`)

Ожидается (Figma): заголовок параграфа (H4) — заливка `#000000`.

Фактически: `--color-content-primary` `#1e1e1e`. Разница визуально незначительна; семантический токен корректен — оставить токен. Отмечено для полноты.

---

### Проблема 9

Severity: **Minor**

Расположение: `CommonCard` (все варианты) — иерархия заголовков

Ожидается (Figma): карточки — контентные блоки ниже заголовка секции (H2).

Фактически: каждый заголовок карточки — `<h2>` (`CommonCard.tsx:85`). В Problem/Goals/Context секциях заголовок секции уже H2 (а в Problem заголовок параграфа — `<h3>`), что даёт дублирующиеся H2 и сломанный порядок (h2 → h3 → h2).

Рекомендация: сделать уровень заголовка настраиваемым (например, проп `headingLevel`) или понизить до h3/h4 внутри секций.

---

### Проблема 10

Severity: **Minor**

Расположение: `CommonCard` — вариант insight, выравнивание

Ожидается (Figma): текст Insight Card центрируется на уровне компонента (`Text/S (851:3095)` CENTER), `alignItems: stretch`.

Фактически: вариант insight сам текст не центрирует — полагается на переопределение `.problemCard { text-align: center }` в `ProblemSection`. Отдельно взятый компонент рендерит текст по левому краю.

Рекомендация: перенести `text-align: center` в вариант `.insight` (и задать центрирование заголовка для варианта number).

---

## 3. Реализовано корректно

- **Problem Section:** ширина 1216px, gap секции 72, gap блока 32, gap строки 72, gap карточек 16; параграф 560px/gap 24; цитата 460px/padding 40/32/32/gap 8/радиус 12/фон `#ECEDEE`; карточки по 394.67px (flex `1 1 0` даёт точное `(1216-32)/3`).
- **Аватар Citate:** круг 56px, `top:-28px`, `left:32px` — совпадает с абсолютной позицией Figma `(32,-28)`.
- **Строка Goals Section:** 4 карточки по 292px (gap 16) — совпадает с Figma; бейдж корректно центрирован через `left:50%`/translateX (в Figma `x:118` = центр карточки шириной 292px).
- **Стили бейджа number** (когда достижим): 56×56, радиус 16, фон `#1e1e1e`, `--title-h3` `#f0f0f0`, верх `-28px` — точно.
- **Risk Card:** padding 24, радиус 20, обводка `#adadad` 1px, заголовок `--text-m-strong` (primary), описание primary — совпадает с Figma (цвета верны, включая primary у описания).
- **Context Section:** gap секции 48, gap строки 40, изображение 556×582 радиус 24, ширина карточки 520, gap строк 32 — совпадает.
- **Молекула Title:** H2 32px/600, ширина 720, описание `Text/M` primary — совпадает с Context Section (описание там `#1E1E1E`).
- Все цвета, отступы и радиусы берутся из дизайн-токенов (без хардкода).

---

## 4. Файлы, требующие изменений

1. `src/shared/ui/organisms/GoalsSection/GoalsSection.tsx` — передать проп `number` (Critical)
2. `src/shared/ui/molecules/CommonCard/CommonCard.module.scss` — типографика insight (`--text-s`); gap контента risk (12px); фиксированная высота number (160px); центрирование текста insight/number
3. `src/shared/ui/organisms/ContextSection/ContextSection.tsx` + `src/app/pages/CaseStudyAcquiring.tsx` — не передавать `label` в risk-карточки
4. `src/shared/ui/organisms/ContextSection/ContextSection.module.scss` — верхний отступ 16px у слота карточки
5. `src/shared/ui/atoms/Citate/Citate.module.scss` — типографика `--text-s`
6. `src/shared/ui/molecules/CommonCard/CommonCard.tsx` — настраиваемый уровень заголовка (доступность)

---

## 5. Примечания

- Отчёт выполнен без изменения кода, патчи не формировались.
- Изменения будут внесены только после согласования с владельцем проекта.
