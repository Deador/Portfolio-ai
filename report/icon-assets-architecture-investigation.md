# Icon Assets Architecture — Investigation

**Дата:** 2026-08-10
**Статус:** Исследование завершено; Вариант B предварительно одобрен владельцем; внесены обязательные уточнения архитектуры (код и файлы не изменялись)
**Область:** JSON-driven Case Study архитектура, работа с иконками (ассеты `type: 'icon'`)
**Эталон:** `docs/json-case-study-architecture.md`, `docs/figma-workflow.md`, фактический код `src/lib/content-parser/**`, Figma file `i3ANEQ3o83zbqvSqYGSYBC`

> Цель: решить, как организовать иконки so, чтобы AI/frontend-агент мог сам находить иконку в Figma, экспортировать её и корректно ссылаться из JSON — без ручного экспорта дизайнером.

---

## 1. Текущая реализация

### Content-слой

Фактический путь — `src/content/cases/<slug>/` (в доках записан как `content/cases/<slug>/`):

```
src/content/cases/acquiring/
├── case.json
└── images/            # 9 png, имя файла = имя узла Figma, формат .png
```

### AssetResolver (`src/lib/content-parser/`)

- `assetTypes.ts` — единственный тип `ImageAsset { type:'image', src, figmaNode?, alt? }`; glob `import.meta.glob('/src/content/cases/*/images/*.png', { eager, query:'?url', import:'default' })`; `isImageAsset`, `resolveImageSrc`.
- `AssetResolver.tsx` — `<img>` с классом `.image`, dev-плейсхолдер при отсутствии файла.
- `resolveContent.ts` — рекурсивная обходка; `isImageAsset(value)` → `createElement(AssetResolver)`.
- `CaseRenderer` — `SUPPORTED_SCHEMA_VERSION = 2`; единственный discriminate-путь ассетов — `image`.

### Компоненты, принимающие icon / ReactNode

| Компонент | Проп | Статус |
|---|---|---|
| `PersonaCard.icon` (`PersonaCard.tsx:19`) | `ReactNode \| null` | контейнер 72×72 (`avatar/background`, radius 999), иконка 56×56 внутри. **Сейчас нигде не заполняется** → плейсхолдер |
| `PersonaSection.personas[]` | прокидывает `PersonaCard` | не передаёт `icon` |
| `GrowthSection.items[].persona` | прокидывает `PersonaCard` | не передаёт `icon` |
| `CommonCard` (variant `risk`) | жёстко рендерит `WarningIcon` | frame-хром компонента, без пропса |
| `HeroSection/ContextSection/FeatureSection/DecisionSection.image` | `ReactNode` | уже переведены на `type:'image'` |

### Система иконок в коде

Отсутствует. Единственная иконка — рукописный `WarningIcon.tsx` (`CommonCard/icons/`, 24×24, `currentColor`). Иконковых библиотек в `package.json` нет, `*.svg` в бандл не импортируются, спец-настройки vite для svg нет.

### Figma-реальность

- В файле есть **общая страница `icons`** (#1727:15733): иконки-компоненты 24×24, собранные из `IMAGE-SVG` + strokes + дуотоновые заливки (User, Send, Search, File_dock_duotone_line, Folder, …).
- В канвасе кейса иконки подставляются как **instance / `IMAGE-SVG`-узлы с `componentId`** внутри слота (у PersonaCard это instance-swap `left-icon`). Это векторные иконки, **не** растровые изображения.
- Уникальные иконки кейса «Эквайринг» (6 шт.):

| Иконка (имя узла Figma) | componentId | Вхождений в кейсе |
|---|---|---|
| `User_alt_duotone_line` | 1821:5171 | 4 (MVP persona 1 + 3 growth) |
| `Folder` | 1810:7614 | 1 |
| `File_dock_duotone_line` | 1807:7567 | 1 |
| `Line_duotone` | 1809:7608 | 1 |
| `Chield_check_duotone_line` | 1821:5327 | 1 |
| `ITO_duotone` | 1821:5339 | 1 |

Плюс `Warning / Circle_Warning` (1718:22463) — хром risk-карточки (не контент).

### Возможность автоматического экспорта SVG

`figma_download_figma_images` поддерживает загрузку векторных узлов по `nodeId` как SVG (пустой `imageRef`) — то же MCP-механизм, что для PNG. Автоматический «Figma → icons/*.svg» технически доступен уже сейчас.

---

## 2. Найденные ограничения

1. `isImageAsset` — единственная ветка дискриминации. `{ type:'icon' }` сейчас пройдёт через `resolveContent.ts` как обычный объект → `PersonaCard.icon` получит plain object и сломает рендер.
2. `WarningIcon` — ручная копия Figma-иконки в коде (вечный «ручной экспорт»), не генерируется из Figma.
3. Иконки персон физически отсутствуют в репозитории, несмотря на то что в Figma они подставлены в каждую PersonaCard.
4. Нет условности «иконка — это контент или DS-хром»: `Folder`/`User_alt_*` — контент (дизайнер выбрал иконку под персону), `Warning` — хром (определяется вариантом карточки).

---

## 3. Вариант A — общая библиотека `src/content/assets/icons/`

**Плюсы:**
- ноль дублирования: одна копия иконки на все кейсы;
- совпадает с природой иконок — в Figma это уже общий `icons`-канвас (shared-библиотека);
- масштабируется на 5–10 кейсов.

**Минусы:**
- второй glob-корень и второе правило «когда иконка shared»;
- ломает единообразие с уже работающим пайплайном изображений (кейс-локальные);
- риск преждевременного shared asset registry (против §8 `json-case-study-architecture.md` для MVP);
- кейс перестаёт быть self-contained.

## 4. Вариант B — case-specific `src/content/cases/<slug>/icons/`

**Плюсы:**
- полный паритет с images: та же папка-паттерн, тот же `src`-относительный путь, тот же glob-принцип;
- агент экспортирует «как нарисовано в канвасе кейса» — источник истины совпадает с картинками;
- кейс самодостаточен; новый уровень абстракции не вводится;
- минимальное изменение `AssetResolver` (добавить один glob-паттерн и одну ветку типа).

**Минусы:**
- возможное дублирование между кейсами (набор персонных иконок почти наверняка повторится в «Чат-платформе»);
- нет встроенного dedupe.

## 5. Гибрид (рекомендуемый)

Двухуровневая модель по **природе иконки**, а не по папке:

- **Content-иконки** (выбираются под контент: persona-иконки) → **кейс-локал** (`<slug>/icons/`), пайплайн как у images.
- **DS-хром иконки** (Warning у risk, логотип шапки) → **остаются React-компонентами в Design System**, в JSON не попадают. `WarningIcon` при этом подтверждается фигма-сверкой, но не становится контент-ассетом.
- **Dedupe по имени узла Figma**: имена детерминированы → копии идентичны; при появлении второго кейса с той же иконкой можно промоутить файл в shared (отдельное решение, не для сейчас).

---

## 6. Рекомендуемая структура папок

```
src/content/cases/<slug>/
├── case.json
├── images/            # растровые (как сейчас)
└── icons/             # *.svg иконки контента этого кейса
```

## 7. Предлагаемая JSON-модель

Расширение discriminated union §3.3 (добавляется значение `'icon'`; `schemaVersion` остаётся 2 — изменение аддитивное):

```json
{
  "type": "icon",
  "src": "icons/User_alt_duotone_line.svg",
  "figmaNode": "I1816:6289;1799:7386;1798:4262",
  "alt": "Менеджер"
}
```

`image` и `icon` **нужно различать**: `type` уже задуман как дискриминатор; разный способ рендера (`<img>` с `object-fit` против иконки в слоте/`aria-hidden`), разные потребители.

Поведение `alt` у `type:'icon'` задано в §14.1 (обязательное уточнение).

## 8. Правила именования

- Имя файла = **имя узла/компонента Figma** (`User_alt_duotone_line.svg`) — перенос правила §4.2 кейсовых ассетов на SVG.
- Санитайз только недопустимых символов (пробелы/`/` в именах типа `Warning / Circle_Warning` → `-`); такие иконки — DS-хром и в контент не попадают.
- Семантика содержимого — только в `alt`, не в имени файла.

## 9. Правила Figma → SVG export

1. Иконку искать в **канвасе кейса**: `IMAGE-SVG`/INSTANCE-узел с `componentId` внутри слота (не слот, не враппер) — по тем же 7 правилам `docs/figma-workflow.md`, что для изображений.
2. Re-fetch свежих данных перед экспортом (аналог актуальности `imageRef`).
3. Скачивать как **вектор SVG** через `figma_download_figma_images` (nodeId + `fileName='<имя узла>.svg'`, без `imageRef`).
4. `figmaNode` в JSON = id instance-узла иконки в канвасе кейса.
5. `alt` — по умолчанию `""` (декоративные иконки недоступны для скринридера); задаётся явно в JSON, только если иконка несёт смысл. `src` как fallback для `alt` не использовать (см. §14.1).

## 10. Изменения в AssetResolver

- `assetTypes.ts`: `IconAsset { type:'icon', src, figmaNode?, alt? }`, `isIconAsset`, glob `/src/content/cases/*/icons/*.svg` (eager, `?url`), `resolveIconSrc`.
- `AssetResolver.tsx`: union `ImageAsset | IconAsset`; `<img>` с классом по типу; для `icon` — `object-fit: contain` (SVG без внутреннего padding, геометрия слота контролируется React/CSS, контракт PersonaCard 72×72 / 56×56); `alt` для icon по умолчанию `""`, для image — `asset.alt ?? asset.src`; dev-плейсхолдер по типу.
- `resolveContent.ts`: **общий asset dispatch** по `value.type`:
  - `'image'` → `isImageAsset` → `AssetResolver`;
  - `'icon'` → `isIconAsset` → `AssetResolver`;
  - любое другое значение `type` → dev-warning «unknown asset type» + безопасная деградация (плейсхолдер/пропуск);
  - любой объект с полем `type` (не строка / не поддержанный тип) не должен попадать в ReactNode как plain object (см. §14.2).

## 11. Изменения в case.json

- В каждый persona (секции `1806:7456`, `1816:6289`, `1834:6346`) добавить `icon: { type:'icon', src:'icons/<Name>.svg', figmaNode:'…;1798:4262' }` по фактическим Figma-узлам (6 уникальных иконок; `User_alt_duotone_line` — 4 ссылки на один файл).
- `CommonCard` risk **не** получает иконку из JSON (хром — на компоненте).

## 12. Изменения в AI/frontend workflow

- Шаг аудита канваса: агент собирает `IMAGE-SVG`/иконку (componentId + имя) наряду с растровыми image-узлами.
- Новый шаг экспорта: SVG (иконки) рядом с PNG (изображения).
- Резолвер и JSON-ссылки одинаковы для обоих типов — разница только в `type` и папке.
- `PersonaCard.icon` «оживёт» без правок карточки: `PersonaSection`/`GrowthSection` уже прокидывают `icon`.

---

## 13. Выводы по спорным пунктам

| Вопрос | Решение |
|---|---|
| Где хранить | `case/icons/` (Вариант B) |
| Case-specific или shared | case-specific на данном этапе |
| Избежание дублирования | детерминированное имя = имя узла Figma + dev-подсказка резолвера, без жёсткого регистра |
| Как отличить иконку от изображения | иконка = `IMAGE-SVG`/component с `componentId` без растрового `imageRef`; изображение = узел с `fills.type==='IMAGE'→imageRef` |
| Имя файла | имя узла Figma → `.svg` |
| Автоматический SVG из Figma | `figma_download_figma_images` по nodeId (вектор) |
| `figmaNode` у иконки | да, обязателен |
| Метаданные | `alt` по умолчанию `""`; явно задаётся только если иконка несёт смысл; `name`/`id` избыточны (имя в `src`, `key` у блоков) |
| Различие image/icon | discriminated union по `type` + switch в `resolveContent` |
| Вид в case.json | `{ type:'icon', src, figmaNode?, alt? }` |
| PersonaCard | `icon` → `<AssetResolver asset={iconAsset}>`; сама карточка не меняется |
| Иконка в нескольких кейсах | копия в каждый кейс; при повторении — промоут в shared |
| Shared asset registry | отложить (против §8 для MVP) |
| Лучший вариант для AI-first | Вариант B |

---

## 14. Обязательные уточнения архитектуры

### 14.1 Accessibility для icon

- Для `type:'icon'` значение `alt` **по умолчанию равно `""`** (пустая строка).
- `src` **не используется как fallback** для `alt` (в отличие от image-рендера) — скринридер не должен зачитывать имя файла/узла.
- Если иконка действительно несёт смысл — `alt` явно задаётся в JSON.
- Декоративные иконки остаются недоступными для скринридера.

### 14.2 Безопасная деградация неизвестного asset type

- Добавление `{ type:'icon' }` в JSON **до** поддержки `icon` в `resolveContent.ts` **не должно приводить к runtime-ошибке** (сейчас `{ type:'icon' }` провалился бы в ветку plain object → «Objects are not valid as a React child»).
- Нужен **общий asset guard** для объектов с полем `type`: если тип неизвестен/не поддержан → **dev-warning** + **безопасный плейсхолдер/пропуск**, а не попадание plain object в ReactNode.
- Это часть архитектуры `AssetResolver` (общий dispatch по `type`), а не разовая проверка конкретно `icon`.

### 14.3 SVG sizing

- Icon-asset рендерится через **существующий asset slot** с `object-fit: contain`.
- Учитывает текущий контракт `PersonaCard`: контейнер 72×72, иконка 56×56.
- SVG **не должен визуально упираться в границы контейнера** из-за отсутствия внутреннего padding.
- Padding в сам SVG-файл **не добавлять** — геометрия слота контролируется React/CSS (класс `AssetResolver`), не контентом.

---

## 15. Решение владельца (предварительно одобрено)

| Пункт | Решение |
|---|---|
| Подход | **case-specific icons** (Вариант B) |
| Папка | **`icons/`** (`src/content/cases/<slug>/icons/`) |
| Формат | **SVG** |
| `type` | **`icon`** (отдельный discriminated asset type) |
| `figmaNode` | **обязателен** |
| `alt` | **`""` по умолчанию** (см. §14.1) |
| Экспорт | **автоматически агентом из Figma** (`figma_download_figma_images`, nodeId, вектор) |
| Shared registry | **не вводим сейчас** (промоут позже, детерминированными именами) |
| DS-хром | **не сериализуем в JSON** (Warning и подобные остаются React-компонентами) |
| Неизвестный asset type | **dev-warning + безопасная деградация** (общий asset guard) |
| SVG sizing | **через asset slot / `object-fit: contain`**, padding в SVG не добавлять |

---

> **Recommended approach:** Вариант B — case-specific иконки в `src/content/cases/<slug>/icons/*.svg`, расширение discriminated union ассета значением `type:'icon'` (schemaVersion остаётся 2), `figmaNode` обязателен, имя файла = имя узла Figma, `alt` по умолчанию `""`, экспорт через `figma_download_figma_images` по nodeId как SVG; иконки-DS-хрома (Warning/header) в контент не выносить и оставить React-компонентами; неизвестный asset type → dev-warning + безопасная деградация через общий asset guard; рендер через asset slot c `object-fit: contain`; отдельного shared asset registry сейчас не вводить — промоут в shared делается позже, детерминированными именами, когда появится второй кейс с повторяющейся иконкой.