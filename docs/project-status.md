# Project Status

## Done

✅ Design tokens (`src/shared/tokens/tokens.scss`)

✅ Typography

✅ Atoms: Button, Citate, Paragraph, QuoteElement, Tag, TimelineStep

✅ Molecules: CommonCard (insight / number / risk / callout), ContextSectionRow, MetricCard, PersonaCard, QuoteCard, ReflectionRows, Results, RolesTable, RowInfoProject, Title

✅ Organisms: Header, HeroSection, ProblemSection, GoalsSection, ContextSection, PersonaSection, FeatureSection, DecisionSection, RetrospectiveSection, ResultsSection, ReflectionSection, GrowthSection

✅ RootLayout с прозрачной overlay-шапкой — фон страницы виден под шапкой (шапка absolute поверх контента)

✅ Кейс «Эквайринг» (`/case/acquiring`) — страница собрана из 13 секций

✅ Роутер: `/` и `/case/:slug`

✅ Проверки: `type-check`, `lint`, production `build` проходят

---

## In progress

- Сверка секций кейса с макетом Figma (Hero, Feature, Results, Reflection, Growth — ещё есть плейсхолдеры изображений)
- Главная страница — пока плейсхолдер (фоновая переменная не выбрана)

---

## Not started

- Footer
- Остальные кейсы (Chat Platform, Mobile Banking)
- Мобильная адаптация

---

## Technical debt

- Плейсхолдеры изображений: pie chart, аватары, hero-изображение 1216×794
- Паддинг кейса 108px привязан к высоте шапки (48px) — вынести в переменную
- Sass `legacy-js-api` deprecation warnings при сборке
- Storybook docs для компонентов

---

## Current priority

Довести кейс «Эквайринг» до полного соответствия Figma, затем выбрать фоновую переменную для главной страницы и собрать её по макету.
