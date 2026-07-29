# Missing Design Tokens — Implementation Report

**Date:** 2026-07-29  
**Status:** Components implemented with temporary hardcoded hex values  
**Priority:** High — Must be resolved before production

---

## Overview

During implementation of new components from Figma designs, several color values were needed that are **not present in `docs/tokens.md`** and `src/shared/tokens/tokens.scss`.

These components contain **temporary hardcoded hex values** and must be updated once proper design tokens are defined.

---

## Affected Components

### 1. MetricCard (src/shared/ui/molecules/MetricCard/)

**Issue:** Badge styling uses undefined tokens

**File:** `MetricCard.module.scss`

**Hardcoded values:**
```scss
Line 69:  background-color: #3e4041;  // Badge background
Line 76:  color: #eee;                // Badge text color
Line 51:  color: #000000;             // Long variant title
Line 56:  color: #000000;             // Long variant description
```

**Source:** Figma design (1799:6208 - Metric Card)

**Required tokens:**
- `--color-badge-background` or similar: `#3e4041`
- `--color-badge-text` or similar: `#eee` (or use existing `--color-content-white`?)
- `--color-text-black` or use existing: `#000000` (differs from `--color-content-primary: #1e1e1e`)

---

### 2. PersonaCard (src/shared/ui/molecules/PersonaCard/)

**Issue:** Avatar and placeholder icon use undefined background colors

**File:** `PersonaCard.module.scss`

**Hardcoded values:**
```scss
Line 29:  background-color: #ecedee;  // Avatar circle background
Line 38:  background-color: #d9dade;  // Placeholder icon background
```

**Source:** Figma design (1799:6195 - Persona Card)

**Required tokens:**
- `--color-avatar-background` or similar: `#ecedee`
- `--color-placeholder-background` or similar: `#d9dade`

---

## Comparison with Available Tokens

### Current tokens in `tokens.scss`:

**Colors (10 total):**
- Content: primary (#1e1e1e), secondary (#787878), tertiary (#adadad), white (#f0f0f0)
- Background: white (#ffffff), dark (#1f1f1f), secondary (#e2e4e7)
- Icons: line (#33363f), fill (#222222), duotone (#7e869e)

**Missing for Figma designs:**
- `#3e4041` — Badge/badge background (darker than primary)
- `#eee` — Badge text (lighter than content/white #f0f0f0)
- `#000000` — Black text (darker than primary #1e1e1e)
- `#ecedee` — Light gray background (different from secondary #e2e4e7)
- `#d9dade` — Medium-light gray (for placeholder)

---

## Recommended Resolution

### Option A: Add missing tokens to Figma Variables
Update `docs/tokens.md` and `src/shared/tokens/tokens.scss` with:
```scss
// Badge colors
--color-badge-background: #3e4041;
--color-badge-text: #eee;

// Text colors
--color-text-black: #000000;

// Background colors
--color-avatar-background: #ecedee;
--color-placeholder-background: #d9dade;
```

### Option B: Use existing tokens
- Check if badge colors should use existing palette
- Verify if `#000000` should actually be `--color-content-primary` (#1e1e1e)
- Review avatar colors in Figma design system

---

## Search & Replace Instructions

Once tokens are defined, update:

**MetricCard.module.scss:**
```scss
// Find:
background-color: #3e4041;
// Replace with:
background-color: var(--color-badge-background);

// Find:
color: #eee;
// Replace with:
color: var(--color-badge-text);

// Find:
color: #000000;
// Replace with:
color: var(--color-text-black);
```

**PersonaCard.module.scss:**
```scss
// Find:
background-color: #ecedee;
// Replace with:
background-color: var(--color-avatar-background);

// Find:
background-color: #d9dade;
// Replace with:
background-color: var(--color-placeholder-background);
```

---

## Verification Checklist

- [ ] Tokens added to Figma Design System Variables
- [ ] `docs/tokens.md` updated with new token definitions
- [ ] `src/shared/tokens/tokens.scss` updated with new CSS custom properties
- [ ] MetricCard.module.scss updated with token references
- [ ] PersonaCard.module.scss updated with token references
- [ ] All hardcoded hex values removed
- [ ] Storybook stories verify visual appearance
- [ ] Design review confirms token colors match Figma

---

## Related Files

- Source of truth: `docs/tokens.md`
- Token implementation: `src/shared/tokens/tokens.scss`
- Affected components:
  - `src/shared/ui/molecules/MetricCard/MetricCard.module.scss`
  - `src/shared/ui/molecules/PersonaCard/PersonaCard.module.scss`
- Figma designs:
  - MetricCard: https://www.figma.com/design/i3ANEQ3o83zbqvSqYGSYBC/...?node-id=1799-6208
  - PersonaCard: https://www.figma.com/design/i3ANEQ3o83zbqvSqYGSYBC/...?node-id=1799-6195

---

## Notes

This is a temporary state. The components function correctly visually but violate the project's design token rules:

> "Never: hardcode colors, hardcode spacing, hardcode typography"  
> — from `docs/agents/frontend-engineer.md`

All other components (Tag, Paragraph, QuoteElement, Citate, TimelineStep, QuoteCard, Title, Results, RowInfoProject) use only design tokens and are production-ready.
