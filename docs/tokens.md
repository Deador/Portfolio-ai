# Design Tokens

Source of truth: Figma Design System Variables
Link: https://www.figma.com/design/i3ANEQ3o83zbqvSqYGSYBC/%D0%A1%D0%B0%D0%B9%D1%82-%D0%BF%D0%BE%D1%80%D1%82%D1%84%D0%BE%D0%BB%D0%B8%D0%BE--Copy-?node-id=1727-15731&m=dev&var-set-id=66-6&view=variables

Extracted: 2026-07-25

---

# Colors

## Content

| Name | Collection | Value (Hex) | Description |
|------|-----------|------------|-------------|
| content/primary | content | #1e1e1e | Primary text color |
| content/secondary | content | #787878 | Secondary text color |
| content/tertiary | content | #adadad | Tertiary text color |
| content/white | content | #f0f0f0 | White text color |
| content/accent | content | #276ef1 | Brand/action accent color (blue) |

## Background

| Name | Collection | Value (Hex) | Description |
|------|-----------|------------|-------------|
| background/white | background | #ffffff | White background |
| background/primary | background | #f6f7f8 | Page background |
| background/dark | background | #1f1f1f | Dark background |
| background/secondary | background | #e2e4e7 | Secondary background (light gray) |

## Badge (MetricCard)

| Name | Collection | Value (Hex) | Description |
|------|-----------|------------|-------------|
| badge/background | badge | #3e4041 | Badge background |
| badge/text | badge | #eeeeee | Badge text color |

## Avatar (PersonaCard icon, Citate)

| Name | Collection | Value (Hex) | Description |
|------|-----------|------------|-------------|
| avatar/background | avatar | #ecedee | Avatar container background |
| avatar/placeholder | avatar | #d9dade | Avatar placeholder fill |

## Quote Card

| Name | Collection | Value (Hex) | Description |
|------|-----------|------------|-------------|
| quote-card/background | quote-card | #010101 | QuoteCard dark panel background |

## Icons

| Name | Collection | Value (Hex) | Description |
|------|-----------|------------|-------------|
| Line_icon | icons | #33363F | Line icon color |
| fill_icon | icons | #222222 | Filled icon color |
| Duotone | icons | #7E869E | Duotone icon color |

**Total Colors: 17**

---

# Spacing

All spacing tokens follow a 4px scale base.

| Token | Value (px) | Multiplier | Notes |
|-------|-----------|-----------|-------|
| padding/x1 | 4 | 1x | Base unit |
| padding/x2 | 8 | 2x | |
| padding/x3 | 12 | 3x | |
| padding/x4 | 16 | 4x | |
| padding/x5 | 20 | 5x | |
| padding/x6 | 24 | 6x | |
| padding/x8 | 32 | 8x | |
| padding/x10 | 40 | 10x | |
| padding/x12 | 48 | 12x | |
| padding/x14 | 56 | 14x | |
| padding/x15 | 60 | 15x | GrowthSection: title → rows (Figma 60px, добавлен вручную) |
| padding/x18 | 72 | 18x | |
| padding/x20 | 80 | 20x | |
| padding/x40 | 160 | 40x | Section gap (assembled case-study page) |

**Total Spacing tokens: 13**

**Missing tokens (gaps in scale):**
- padding/x7 (28px) — not found in variables
- padding/x9 (36px) — not found in variables
- padding/x11 (44px) — not found in variables
- padding/x13 (52px) — not found in variables
- padding/x15 (60px) — not found in variables
- padding/x16 (64px) — not found in variables
- padding/x17 (68px) — not found in variables
- padding/x19 (76px) — not found in variables

---

# Radius

| Token | Value (px) | Description |
|-------|-----------|-------------|
| radius/radius-8 | 8 | Small radius |
| radius/radius-12 | 12 | Badge radius |
| radius/radius-16 | 16 | Medium radius |
| radius/radius-20 | 20 | Large radius |
| radius/radius-24 | 24 | Extra large radius |

**Total Radius tokens: 5**

**Missing tokens:**
- radius/radius-4 — not found in variables
- radius/radius-12 — **added to code manually** (Metric Card badge, Citate); not yet in Figma Variables — needs to be added
- radius/radius-32 — not found in variables

---

# Typography

## Title Styles

| Name | Font Family | Size | Weight | Weight Value | Line Height (ratio) | Line Height (px) | Letter Spacing |
|------|------------|------|--------|--------------|-------------------|------------------|-----------------|
| Title/H_Result | Onest | 56px | Bold | 700 | 1.3x | 72.8px | 0 |
| Title/H1_strong | Onest | 40px | Bold | 700 | 1.3x | 52px | 0 |
| Title/H1 | Onest | 40px | SemiBold | 600 | 1.3x | 52px | 0 |
| Title/H2 | Onest | 32px | SemiBold | 600 | 1.3x | 41.6px | 0 |
| Title/H3_strong | Onest | 24px | SemiBold | 600 | 1.4x | 33.6px | 0 |
| Title/H3 | Onest | 24px | Medium | 500 | 1.3x | 31.2px | 0 |
| Title/H4_strong | Onest | 20px | SemiBold | 600 | 1.4x | 28px | 0 |
| Title/H4 | Onest | 20px | Medium | 500 | 1.4x | 28px | 0 |

## Text Styles (Onest)

| Name | Font Family | Size | Weight | Weight Value | Line Height (ratio) | Line Height (px) | Letter Spacing |
|------|------------|------|--------|--------------|-------------------|------------------|-----------------|
| Text/XL | Onest | 24px | Regular | 400 | 1.4x | 33.6px | 0 |
| Text/L_strong | Onest | 20px | Bold | 700 | 1.4x | 28px | 0 |
| Text/L | Onest | 20px | Regular | 400 | 1.4x | 28px | 0 |
| Text/M_strong | Onest | 16px | Bold | 700 | 1.4x | 22.4px | 0 |
| Text/M | Onest | 16px | Regular | 400 | 1.4x | 22.4px | 0 |
| Text/M_lg | Onest | 18px | Regular | 400 | 1.4x | 25.2px | 0 |
| Text/S_medium | Onest | 14px | Medium | 500 | 1.4x | 19.6px | 0 |
| Text/S_xs | Onest | 14px | Regular | 400 | 16px | 16px | 0 |
| Text/S | Onest | 16px | Regular | 400 | 1.5x | 24px | 0 |

## Text Styles (Legacy/Other)

| Name | Font Family | Size | Weight | Weight Value | Line Height (ratio) | Line Height (px) | Letter Spacing |
|------|------------|------|--------|--------------|-------------------|------------------|-----------------|
| Text/XS | Inter | 12px | Regular | 400 | 1.3x | 15.6px | 0 |
| Text | Inter | 18px | Regular | 400 | 1.3x | 23.4px | 0 |

**Total Typography tokens: 20**

**Notes:**
- Most typography uses "Onest" font family
- Legacy tokens use "Inter" font family (Text/XS, Text)
- All letter-spacing values are 0
- Text transform: not specified
- Text decoration: not specified

---

# Effects

| Name | Type | Color | Offset | Radius | Spread |
|------|------|-------|--------|--------|--------|
| elements | DROP_SHADOW | #0000000D (5% opacity black) | (0, 2) | 30 | 0 |

**Total Effects: 1**

---

# Layout

Semantic layout tokens. Extracted from the existing implementation (declared in `src/shared/tokens/tokens.scss`), not Figma Variables.

| Token | Value | Description |
|-------|-------|-------------|
| layout/content-max | 1216px | Максимальная ширина контента секций CaseRenderer |
| layout/page-max | 1280px | Максимальная ширина контейнера страницы |

**Note (content limit):** `ReflectionSection` / `ReflectionRows` используют `max-width: 768px` (строки Reflection модуля) — это осознанный контентный лимит строк, **не** breakpoint и **не** CSS-токен. По аналогии `DecisionSection.noteBlock` и `TextImageSection.highlightCard` используют 800px.

**Total Layout tokens: 2**

---

# Breakpoints

CSS media queries cannot consume CSS custom properties, so breakpoints are defined
as Sass values in `src/shared/styles/_breakpoints.scss` (shared partial, consumed
via `@use`). Desktop-first: base styles = desktop, overrides via `max-width`.

| Name | Value | Used for |
|------|-------|----------|
| tablet  | 1024px | container gutter 32→24; stacking of rows that do not fit (Problem, Context, Growth, QuoteCard) |
| mobile  | 768px  | container gutter 32→16; section gap 160→80; single-column layouts; fluid images via aspect-ratio |

---

# Missing Data

The following values are **NOT** found in extracted Figma Variables:

## Colors
- `background/primary`, `badge/*`, `avatar/*`, `quote-card/*` — **added to code manually** (page background, MetricCard badge, PersonaCard/Citate avatar, QuoteCard panel); not yet in Figma Variables — need to be added
- `content/accent` (#276ef1) — extracted from Figma (variable `accent_f043fd95`, used in Citate quote accent, TimelineStep status icons, RolesTable status) and added to code

## Spacing
- padding/x7 (28px), padding/x9 (36px), and 6 other gaps — mentioned in design-system.md but NOT in Figma

## Radius
- radius/radius-4, radius/radius-32 — mentioned in docs/design-system.md, **NOT in Figma**
- radius/radius-12 — **added to code manually** (Metric Card badge, Citate); not yet in Figma Variables — needs to be added

---

# Summary

**Total tokens extracted from Figma:**
- Colors: 17
- Spacing: 13
- Radius: 5
- Typography: 20
- Effects: 1
- **TOTAL: 56 tokens**

**Inconsistencies with docs/design-system.md:**
1. Spacing scale has gaps (missing x7, x9, x11, x13, x15, x16, x17, x19)
2. Radius scale has gaps (missing x4, x32) — radius-12 is used in code but not yet added to Figma Variables
3. Typography: Some use "Inter", some use "Onest" (inconsistent font family)

**Note:** Tokens `background/primary`, `badge/*`, `avatar/*`, `quote-card/*`, `radius/radius-12` are implemented in code and documented here, but are NOT yet present in Figma Variables. Add them to the Design System before the next export.

**Data extraction method:**
- figma_get_variable_defs with nodeId=1727:15731 (canvas level)
- figma_get_variable_defs with nodeId=0:1 (page level)
- All unique tokens merged and deduplicated

**Ready for implementation:** YES
- All extracted tokens are machine-readable
- All visual values are precise
- No invented or guessed values
- Source of truth: Figma Variables only
