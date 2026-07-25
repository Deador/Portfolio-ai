# Styling Architecture Report (Revised)

**Project:** Portfolio  
**Date:** 2026-07-26  
**Status:** Revised - Awaiting Final Approval  

---

## FOLDER STRUCTURE

```
src/shared/
├── styles/
│   ├── _reset.scss
│   ├── tokens.scss (CSS Variables: colors, spacing, radius, typography, effects)
│   ├── _typography.scss (removed - typography now in tokens.scss)
│   ├── _effects.scss (removed - effects now in tokens.scss)
│   ├── _utilities.scss (a11y helpers only)
│   ├── _global.scss (document-level styles only)
│   └── index.scss (import order)
└── ui/
    └── Component/
        ├── Component.tsx
        ├── Component.module.scss (CSS Modules)
        └── Component.stories.tsx
```

**Key changes:**
- `_variables.scss` → `tokens.scss` (single token file)
- Removed `design-tokens.json` (docs/tokens.md is source of truth)
- Removed `tokens.ts` (React uses CSS Variables, not TypeScript)
- Removed separate `_typography.scss` and `_effects.scss` (moved to tokens.scss)
- Removed `shared/tokens/` folder entirely

---

## FILE RESPONSIBILITIES

| File | Contains | Notes |
|------|----------|-------|
| `tokens.scss` | CSS Variables for all 42 tokens (colors, spacing, radius, typography, shadow) | Single source; maps from docs/tokens.md |
| `_reset.scss` | Normalize browser defaults, box-sizing: border-box | Standard |
| `_global.scss` | Document-level styles: body, html, links, focus states | No component styling |
| `_utilities.scss` | Accessibility helpers (.visually-hidden) | Minimal, exceptions only |
| `index.scss` | Import order: reset → tokens → global → utilities | Critical ordering |
| `Component.module.scss` | Component-scoped styles using CSS Modules | Consumes CSS Variables |

---

## SCSS ARCHITECTURE

### Import Order (Critical)
```scss
// shared/styles/index.scss
@use 'reset';     // 1. Browser defaults
@use 'tokens';    // 2. CSS Custom Properties (all 42 tokens)
@use 'global';    // 3. Document-level styles
@use 'utilities'; // 4. Accessibility helpers
```

### Component Pattern
```scss
// Button.module.scss - No @use needed for tokens!
// CSS Variables are global after index.scss is imported

.button {
  padding: var(--spacing-x2) var(--spacing-x4);
  border-radius: var(--radius-8);
  background-color: var(--color-content-primary);
  color: var(--color-background-white);
  
  font-family: var(--font-title-h1-family);
  font-size: var(--font-title-h1-size);
  font-weight: var(--font-title-h1-weight);
  line-height: var(--font-title-h1-line-height);
}
```

---

## TOKENS.SCSS STRUCTURE

### Single File: All 42 Tokens as CSS Variables

```scss
// shared/styles/tokens.scss

:root {
  // ========================================
  // COLORS (10 tokens from Figma)
  // ========================================
  --color-content-primary: #1e1e1e;
  --color-content-secondary: #787878;
  --color-content-tertiary: #adadad;
  --color-content-white: #f0f0f0;
  --color-background-white: #ffffff;
  --color-background-dark: #1f1f1f;
  --color-background-secondary: #e2e4e7;
  --color-icon-line: #33363F;
  --color-icon-fill: #222222;
  --color-icon-duotone: #7E869E;
  
  // ========================================
  // SPACING (12 tokens - 4px scale)
  // ========================================
  --spacing-x1: 4px;
  --spacing-x2: 8px;
  --spacing-x3: 12px;
  --spacing-x4: 16px;
  --spacing-x5: 20px;
  --spacing-x6: 24px;
  --spacing-x8: 32px;
  --spacing-x10: 40px;
  --spacing-x12: 48px;
  --spacing-x14: 56px;
  --spacing-x18: 72px;
  --spacing-x20: 80px;
  
  // ========================================
  // RADIUS (4 tokens)
  // ========================================
  --radius-8: 8px;
  --radius-16: 16px;
  --radius-20: 20px;
  --radius-24: 24px;
  
  // ========================================
  // TYPOGRAPHY (15 tokens - semantic CSS variables)
  // ========================================
  
  // Font Families
  --font-family-onest: 'Onest', sans-serif;
  --font-family-inter: 'Inter', sans-serif;
  
  // Title Styles (6)
  --font-title-h-result-family: var(--font-family-onest);
  --font-title-h-result-size: 56px;
  --font-title-h-result-weight: 700;
  --font-title-h-result-line-height: 1.3;
  
  --font-title-h1-strong-family: var(--font-family-onest);
  --font-title-h1-strong-size: 40px;
  --font-title-h1-strong-weight: 700;
  --font-title-h1-strong-line-height: 1.3;
  
  --font-title-h1-family: var(--font-family-onest);
  --font-title-h1-size: 40px;
  --font-title-h1-weight: 600;
  --font-title-h1-line-height: 1.3;
  
  --font-title-h2-family: var(--font-family-onest);
  --font-title-h2-size: 32px;
  --font-title-h2-weight: 600;
  --font-title-h2-line-height: 1.3;
  
  --font-title-h3-family: var(--font-family-onest);
  --font-title-h3-size: 24px;
  --font-title-h3-weight: 500;
  --font-title-h3-line-height: 1.3;
  
  --font-title-h4-family: var(--font-family-onest);
  --font-title-h4-size: 20px;
  --font-title-h4-weight: 500;
  --font-title-h4-line-height: 1.4;
  
  // Text Styles (9)
  --font-text-l-strong-family: var(--font-family-onest);
  --font-text-l-strong-size: 20px;
  --font-text-l-strong-weight: 700;
  --font-text-l-strong-line-height: 1.4;
  
  --font-text-l-family: var(--font-family-onest);
  --font-text-l-size: 20px;
  --font-text-l-weight: 400;
  --font-text-l-line-height: 1.4;
  
  --font-text-m-strong-family: var(--font-family-onest);
  --font-text-m-strong-size: 16px;
  --font-text-m-strong-weight: 700;
  --font-text-m-strong-line-height: 1.4;
  
  --font-text-m-family: var(--font-family-onest);
  --font-text-m-size: 16px;
  --font-text-m-weight: 400;
  --font-text-m-line-height: 1.4;
  
  --font-text-s-medium-family: var(--font-family-onest);
  --font-text-s-medium-size: 14px;
  --font-text-s-medium-weight: 500;
  --font-text-s-medium-line-height: 1.4;
  
  --font-text-s-family: var(--font-family-onest);
  --font-text-s-size: 16px;
  --font-text-s-weight: 400;
  --font-text-s-line-height: 1.5;
  
  --font-text-xs-family: var(--font-family-inter);
  --font-text-xs-size: 12px;
  --font-text-xs-weight: 400;
  --font-text-xs-line-height: 1.3;
  
  --font-text-legacy-family: var(--font-family-inter);
  --font-text-legacy-size: 18px;
  --font-text-legacy-weight: 400;
  --font-text-legacy-line-height: 1.3;
  
  // ========================================
  // EFFECTS (1 token)
  // ========================================
  --shadow-element: 0 2px 30px rgba(0, 0, 0, 0.05);
}
```

---

## TYPOGRAPHY STRATEGY (REVISED)

### Semantic CSS Custom Properties

Instead of SCSS mixins, typography is exposed as individual CSS Variables:

**Naming pattern:** `--font-{category}-{style}-{property}`

Examples:
- `--font-title-h1-family`
- `--font-title-h1-size`
- `--font-title-h1-weight`
- `--font-title-h1-line-height`

### Component Usage

```scss
// Heading.module.scss
.heading {
  font-family: var(--font-title-h1-family);
  font-size: var(--font-title-h1-size);
  font-weight: var(--font-title-h1-weight);
  line-height: var(--font-title-h1-line-height);
}
```

Or with optional shorthand helper (in component):

```scss
// Apply all typography properties at once
.heading {
  font: var(--font-title-h1-weight) var(--font-title-h1-size) / var(--font-title-h1-line-height) var(--font-title-h1-family);
}
```

### Benefits
- No build-time SCSS processing for typography
- All tokens visible in CSS Variables DevTools
- Easy to debug and inspect
- Consistent with other token types (colors, spacing, etc.)
- Semantic naming (describes purpose, not appearance)

---

## GLOBAL STYLES STRATEGY (REVISED)

### What Gets Global Styles
- HTML/body defaults (font-family, color, background, line-height)
- Anchor link defaults (color, hover, focus-visible)
- Focus states (accessibility requirement)
- Form element basics (font inheritance, cursor)

### What Does NOT Get Global Styles
- Component-specific layouts
- Component-specific spacing
- Variant-dependent styles
- Reusable UI component styling

### Example: _global.scss
```scss
// shared/styles/_global.scss

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-onest);
  color: var(--color-content-primary);
  background-color: var(--color-background-white);
  line-height: 1.4;
  margin: 0;
  padding: 0;
}

a {
  color: var(--color-content-primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-content-primary);
    outline-offset: 2px;
  }
}

button {
  font-family: inherit;
  cursor: pointer;
}

input, textarea, select {
  font-family: inherit;
}
```

---

## RESET STRATEGY

Minimal modern reset:

```scss
// shared/styles/_reset.scss

* {
  box-sizing: border-box;
}

html, body, div, span, p, a, h1, h2, h3, h4, h5, h6,
blockquote, pre, ul, ol, li, dl, dt, dd,
button, input, textarea, select, form, label,
table, tr, th, td, img, figure, figcaption,
article, aside, header, footer, main, nav, section {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
  
  &:before, &:after {
    content: '';
    content: none;
  }
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
```

---

## UTILITY CLASSES (MINIMAL)

### Accessibility Only

```scss
// shared/styles/_utilities.scss

// Screen reader only utility
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Philosophy:** CSS Modules handle component styling; utilities are exceptions only.

---

## IMPORT ORDER

### In App Root (App.tsx)
```tsx
import '@/shared/styles/index.scss';

export default function App() {
  return <Router>{/* routes */}</Router>;
}
```

CSS Variables and global styles become available to all components.

### In Components
```scss
// Button.module.scss
// No @use needed - CSS Variables already global

.button {
  padding: var(--spacing-x2) var(--spacing-x4);
  border-radius: var(--radius-8);
  background-color: var(--color-content-primary);
  color: var(--color-background-white);
  
  font-family: var(--font-text-m-family);
  font-size: var(--font-text-m-size);
  font-weight: var(--font-text-m-weight);
  line-height: var(--font-text-m-line-height);
}
```

---

## CSS MODULES + TOKENS CONSUMPTION

### Pattern: Direct CSS Variables (Colors, Spacing, Radius)
```scss
// Card.module.scss
.card {
  padding: var(--spacing-x4);
  border-radius: var(--radius-16);
  background-color: var(--color-background-white);
  border: 1px solid var(--color-background-secondary);
  box-shadow: var(--shadow-element);
}
```

### Pattern: Typography Variables
```scss
// Heading.module.scss
.heading {
  font-family: var(--font-title-h1-family);
  font-size: var(--font-title-h1-size);
  font-weight: var(--font-title-h1-weight);
  line-height: var(--font-title-h1-line-height);
  
  color: var(--color-content-primary);
}
```

### Pattern: All Together
```scss
// Button.module.scss
.button {
  // Spacing
  padding: var(--spacing-x2) var(--spacing-x4);
  
  // Radius
  border-radius: var(--radius-8);
  
  // Colors
  background-color: var(--color-content-primary);
  color: var(--color-background-white);
  
  // Typography
  font-family: var(--font-text-m-family);
  font-size: var(--font-text-m-size);
  font-weight: var(--font-text-m-weight);
  line-height: var(--font-text-m-line-height);
  
  // Effects
  box-shadow: var(--shadow-element);
}
```

---

## TOKEN SUMMARY

| Category | Count | Type | Source |
|----------|-------|------|--------|
| Colors | 10 | CSS Variables | docs/tokens.md |
| Spacing | 12 | CSS Variables | docs/tokens.md |
| Radius | 4 | CSS Variables | docs/tokens.md |
| Typography | 15 × 4 properties | CSS Variables | docs/tokens.md |
| Effects | 1 | CSS Variables | docs/tokens.md |
| **TOTAL** | **42 base tokens** | **CSS Variables** | **docs/tokens.md** |

---

## DECISIONS & RATIONALE

| Decision | Rationale |
|----------|-----------|
| `tokens.scss` (single file) | All 42 tokens in one place; easier to maintain |
| No `design-tokens.json` | docs/tokens.md is single source of truth; no duplication |
| No `tokens.ts` | React uses CSS Variables; no TypeScript overhead |
| Typography as CSS Variables | Consistent with other tokens; semantic naming; debuggable |
| Remove `_typography.scss` | No SCSS mixins; use CSS variables instead |
| Remove `_effects.scss` | Only 1 effect token; no separate file needed |
| `_global.scss` only document styles | No component styling; components use CSS Modules |
| Utilities minimal | Only `.visually-hidden`; CSS Modules handle rest |

---

## IMPLEMENTATION CHECKLIST

- [ ] Create `shared/styles/` folder structure
- [ ] Create `_reset.scss`
- [ ] Create `tokens.scss` (all 42 tokens as CSS Variables)
- [ ] Create `_global.scss` (document-level styles only)
- [ ] Create `_utilities.scss` (a11y helpers)
- [ ] Create `index.scss` with correct import order
- [ ] Import `shared/styles/index.scss` in App.tsx
- [ ] Build first component using CSS Variables
- [ ] Verify CSS Variables in DevTools
- [ ] Add Storybook stories
- [ ] Document token usage in component examples

---

## CHANGES FROM ORIGINAL PROPOSAL

1. ✅ `_variables.scss` → `tokens.scss`
2. ✅ Removed `design-tokens.json` (docs/tokens.md is source of truth)
3. ✅ Removed `tokens.ts` (use CSS Variables instead)
4. ✅ Moved effects into `tokens.scss`
5. ✅ Typography as CSS Variables (not SCSS mixins)
6. ✅ Utilities minimal (a11y only)
7. ✅ Global styles document-level only

---

## NEXT STEPS

1. **Final Approval:** Confirm revised architecture
2. **Implementation:** Create all SCSS files
3. **Validation:** Test CSS Variables in browser
4. **First Component:** Build Button atom
5. **Storybook:** Add component stories
6. **Documentation:** Update as needed
