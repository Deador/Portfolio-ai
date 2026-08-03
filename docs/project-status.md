# Project Status

## Done

✅ Design tokens (`src/shared/tokens/tokens.scss`)

✅ Typography

✅ Atoms: Button, Citate, Paragraph, QuoteElement, Tag, TimelineStep

✅ Molecules: CommonCard (insight / number / risk / callout), ContextSectionRow, MetricCard, PersonaCard, QuoteCard, ReflectionRows, Results, RolesTable, RowInfoProject, Title

✅ Organisms: Header, HeroSection, ProblemSection, GoalsSection, ContextSection, PersonaSection, FeatureSection, DecisionSection, RetrospectiveSection, ResultsSection, ReflectionSection, GrowthSection

✅ RootLayout с прозрачной overlay-шапкой — фон страницы виден под шапкой (шапка absolute поверх контента)

✅ Роутер: `/` и `/case/:slug`

✅ JSON-driven рендеринг кейсов: `CaseRenderer` (src/entities/case) + `AssetResolver` (src/lib/content-parser), рекурсивные `blocks[]`, dev-warning на unknown component, проверка `schemaVersion`

✅ Кейс «Эквайринг» рендерится из `case.json` через `CasePage` (флаг `USE_JSON_RENDERER`); хардкод-страница остаётся до подтверждения паритета

✅ 9 изображений кейса выгружены из Figma по правилу экспорта (имя = имя узла, `.png`): hero-main, metrics, task, process, flows, feature01-03, ava — все `figmaNode`/`imageRef` актуальны

✅ Аватар цитаты подключён (схема `cite{text, source?, avatar?}`), `imageRef` сверен с Figma MCP

✅ Проверки: `type-check`, `lint`, production `build`, `build-storybook` проходят

---

## In progress

- Подтверждение визуального паритета JSON-рендера (`Case/CaseRenderer/Acquiring`) и хардкод-страницы (`Pages/CaseStudyAcquiring`) в Storybook, сверка секций с Figma по `figmaNode`
- Главная страница — пока плейсхолдер (фоновая переменная не выбрана)

---

## Not started

- Footer
- Остальные кейсы (Chat Platform, Mobile Banking)
- Мобильная адаптация
- `validate`-утилита для case.json (§8 json-case-study-architecture.md)

---

## Technical debt

- Паддинг кейса 108px привязан к высоте шапки (48px) — вынести в переменную
- Sass `legacy-js-api` deprecation warnings при сборке
- Storybook docs для компонентов
- Плейсхолдер AssetResolver — только dev-fallback при отсутствии файла изображения

---

## Current priority

Подтвердить визуальный паритет JSON-рендера кейса «Эквайринг», удалить хардкод-страницу, затем выбрать фоновую переменную для главной страницы и собрать её по макету.
