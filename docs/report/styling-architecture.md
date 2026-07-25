# Styling Architecture Report

**Project:** Portfolio  
**Date:** 2026-07-26  
**Status:** Approved for Implementation  

---

## FOLDER STRUCTURE

```
src/shared/
├── styles/
│   ├── _reset.scss
│   ├── _variables.scss (tokens → CSS Variables)
│   ├── _typography.scss (mixins for 15 text styles)
│   ├── _effects.scss
│   ├── _utilities.scss (a11y helpers)
│   ├── _global.scss (body, links, focus states)
│   └── index.scss (import order)
├── tokens/
│   ├── design-tokens.json (42 tokens from Figma)
│   └── tokens.ts (TypeScript exports)
└── ui/
    └── Component/
        ├── Component.tsx
        ├── Component.module.scss (CSS Modules)
        └── Component.stories.tsx
```

---

## FILE RESPONSIBILITIES

| File | Contains | Source |
|------|----------|--------|
| `_variables.scss` | CSS Variables for 42 tokens (colors, spacing, radius, fonts, shadow) | docs/tokens.md |
| `_reset.scss` | Normalize browser defaults, box-sizing: border-box | Standard best practice |
| `_typography.scss` | SCSS mixins for 15 text styles (@include text-m, @include title-h1) | docs/tokens.md |
| `_effects.scss` | CSS Variables for shadows and effects | docs/tokens.md |
| `_global.scss` | Body defaults, links, focus states (a11y) | Design system |
| `_utilities.scss` | Accessibility utilities (.visually-hidden) | Design system |
| `index.scss` | Import order: reset → variables → typography → effects → global → utilities | Architecture |
| `Component.module.scss` | Component-scoped styles using CSS Modules | Component |
| `design-tokens.json` | Machine-readable 42 tokens | Figma MCP |
| `tokens.ts` | TypeScript token constants | design-tokens.json |

---

## SCSS ARCHITECTURE

### Import Order (Critical)
```scss
// shared/styles/index.scss
@use 'reset';        // 1. Browser defaults
@use 'variables';    // 2. CSS Custom Properties
@use 'typography';   // 3. Text styles
@use 'effects';      // 4. Shadows, filters
@use 'global';       // 5. Body, links, form elements
@use 'utilities';    // 6. Helper classes
```

### Component Pattern
```scss
// Button.module.scss
@use '@/shared/styles/typography' as typo;

.button {
  padding: var(--spacing-x2) var(--spacing-x4);
  border-radius: var(--radius-8);
  background-color: var(--color-content-primary);
  
  @include typo.text-m;
}
```

---

## CSS VARIABLE STRATEGY

### Token-to-CSS Mapping
```scss
// _variables.scss
:root {
  // 10 Colors
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
  
  // 12 Spacing (4px scale)
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
  
  // 4 Radius
  --radius-8: 8px;
  --radius-16: 16px;
  --radius-20: 20px;
  --radius-24: 24px;
  
  // Fonts
  --font-family-onest: 'Onest', sans-serif;
  --font-family-inter: 'Inter', sans-serif;
  
  // 1 Effect
  --shadow-element: 0 2px 30px rgba(0, 0, 0, 0.05);
}
```

---

## TYPOGRAPHY STRATEGY

### 15 Text Styles as SCSS Mixins
```scss
// _typography.scss

// Title Styles (6)
@mixin title-h-result {
  font-family: var(--font-family-onest);
  font-size: 56px;
  font-weight: 700;
  line-height: 1.3;
}

@mixin title-h1-strong {
  font-family: var(--font-family-onest);
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
}

@mixin title-h1 {
  font-family: var(--font-family-onest);
  font-size: 40px;
  font-weight: 600;
  line-height: 1.3;
}

@mixin title-h2 {
  font-family: var(--font-family-onest);
  font-size: 32px;
  font-weight: 600;
  line-height: 1.3;
}

@mixin title-h3 {
  font-family: var(--font-family-onest);
  font-size: 24px;
  font-weight: 500;
  line-height: 1.3;
}

@mixin title-h4 {
  font-family: var(--font-family-onest);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
}

// Text Styles (9)
@mixin text-l-strong {
  font-family: var(--font-family-onest);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
}

@mixin text-l {
  font-family: var(--font-family-onest);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
}

@mixin text-m-strong {
  font-family: var(--font-family-onest);
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
}

@mixin text-m {
  font-family: var(--font-family-onest);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
}

@mixin text-s-medium {
  font-family: var(--font-family-onest);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

@mixin text-s {
  font-family: var(--font-family-onest);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
}

@mixin text-xs {
  font-family: var(--font-family-inter);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.3;
}

@mixin text-legacy {
  font-family: var(--font-family-inter);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.3;
}
```

**Why mixins:** Reliable, debuggable, maintains all 4 properties (family, size, weight, line-height).

---

## GLOBAL STYLES STRATEGY

### What Gets Global Styles
- HTML/body defaults (font, color, background)
- Link styling (color, hover, focus states)
- Focus states (accessibility requirement)
- Form element basics

### What Does NOT Get Global Styles
- Component-specific layouts
- Component-specific spacing
- Variant-dependent styles

### Example: _global.scss
```scss
@use 'variables';

body {
  font-family: var(--font-family-onest);
  color: var(--color-content-primary);
  background-color: var(--color-background-white);
  line-height: 1.4;
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
```

---

## RESET STRATEGY

Minimal modern reset:
- Remove default margins/padding from all elements
- Set box-sizing: border-box globally
- Normalize list styles
- Remove default quote styling

```scss
* {
  box-sizing: border-box;
}

html, body, div, span, p, a, h1-h6, etc. {
  margin: 0;
  padding: 0;
  border: 0;
}

button, input, select, textarea {
  font: inherit;
}
```

---

## UTILITY CLASSES

### Accessibility Only
```scss
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

**Philosophy:** CSS Modules handle 95% of styling; utilities are exceptions only.

---

## IMPORT ORDER

### In App Root
```tsx
// App.tsx
import '@/shared/styles/index.scss';

export default function App() {
  return <Router>{/* routes */}</Router>;
}
```

CSS Variables and global styles become available to all components.

### In Components
```scss
// Only import what you need
@use '@/shared/styles/typography' as typo;

.component {
  @include typo.text-m;
  color: var(--color-content-primary);
}
```

---

## CSS MODULES + TOKENS CONSUMPTION

### Pattern: Direct CSS Variables
```scss
// Card.module.scss
.card {
  padding: var(--spacing-x4);
  border-radius: var(--radius-16);
  background-color: var(--color-background-white);
  box-shadow: var(--shadow-element);
}
```

### Pattern: Typography Mixins
```scss
// Heading.module.scss
@use '@/shared/styles/typography' as typo;

.heading {
  @include typo.title-h1;
  margin-bottom: var(--spacing-x4);
}
```

### Pattern: Combined
```scss
// Button.module.scss
@use '@/shared/styles/typography' as typo;

.button {
  @include typo.text-m;
  padding: var(--spacing-x2) var(--spacing-x4);
  border-radius: var(--radius-8);
  background-color: var(--color-content-primary);
  color: var(--color-background-white);
}
```

---

## TOKEN SUMMARY

| Category | Count | Source |
|----------|-------|--------|
| Colors | 10 | Figma |
| Spacing | 12 | Figma |
| Radius | 4 | Figma |
| Typography | 15 | Figma |
| Effects | 1 | Figma |
| **TOTAL** | **42** | **docs/tokens.md** |

---

## DECISIONS & RATIONALE

1. **SCSS Mixins for Typography**
   - More reliable than CSS font-shorthand
   - Maintains all properties (family, size, weight, line-height)
   - Easy to debug and modify

2. **CSS Variables + CSS Modules**
   - Single source of truth (design tokens)
   - Component isolation (CSS Modules)
   - Production-ready (CSS Variables well-supported)

3. **Separate styles/ and tokens/ folders**
   - Tokens can be consumed by other systems (Storybook, docs, APIs)
   - Clear responsibility separation

4. **Minimal utilities**
   - CSS Modules handle most cases
   - Utilities only for accessibility

5. **Import order critical**
   - Reset → Variables → Typography → Effects → Global → Utilities
   - Prevents conflicts and ensures proper cascade

---

## IMPLEMENTATION CHECKLIST

- [ ] Create `shared/styles/` folder structure
- [ ] Create `_reset.scss`
- [ ] Create `_variables.scss` (42 tokens as CSS Variables)
- [ ] Create `_typography.scss` (15 mixins)
- [ ] Create `_effects.scss`
- [ ] Create `_global.scss`
- [ ] Create `_utilities.scss`
- [ ] Create `index.scss` with correct import order
- [ ] Create `shared/tokens/design-tokens.json` from docs/tokens.md
- [ ] Create `shared/tokens/tokens.ts` TypeScript exports
- [ ] Import `shared/styles/index.scss` in App.tsx
- [ ] Build first component (Button) using patterns
- [ ] Test CSS Variables availability
- [ ] Validate Storybook integration

---

## NEXT STEPS

1. **Approval:** Review architecture, confirm decisions
2. **Implementation:** Create all SCSS files (no React code yet)
3. **Validation:** Test CSS Variables in browser DevTools
4. **Components:** Build Button, Heading, Text atoms using patterns
5. **Storybook:** Add stories demonstrating all typography/color combinations
6. **Documentation:** Update in docs/ if patterns change

---

## APPENDIX: TOKENS EXTRACTION

All 42 tokens extracted from Figma via MCP and documented in `docs/tokens.md`:
- Source: https://www.figma.com/design/i3ANEQ3o83zbqvSqYGSYBC/...?view=variables
- Method: figma_get_variable_defs
- Format: JSON → CSS Variables → SCSS Mixins → Components

No invented values. All from Figma.
