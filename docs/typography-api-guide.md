# Typography API Guide

**Updated:** 2026-07-26  
**Version:** 2.0 (CSS `font` shorthand)

---

## QUICK START

### Old API (Deprecated)
```scss
.title {
  font-family: var(--font-title-h1-family);
  font-size: var(--font-title-h1-size);
  font-weight: var(--font-title-h1-weight);
  line-height: var(--font-title-h1-line-height);
  letter-spacing: var(--font-title-h1-letter-spacing);
}
```

### New API (Recommended)
```scss
.title {
  font: var(--title-h1);
}
```

**That's it.** One line. Much cleaner.

---

## COMPLETE TYPOGRAPHY TOKENS

### Title Styles (8 tokens)

```scss
.result { font: var(--title-h-result); }      // 56px Bold
.h1-strong { font: var(--title-h1-strong); }  // 40px Bold
.h1 { font: var(--title-h1); }                // 40px Semibold
.h2 { font: var(--title-h2); }                // 32px Semibold
.h3-strong { font: var(--title-h3-strong); }  // 24px Semibold
.h3 { font: var(--title-h3); }                // 24px Medium
.h4-strong { font: var(--title-h4-strong); }  // 20px Semibold
.h4 { font: var(--title-h4); }                // 20px Medium
```

### Text Styles (10 tokens)

```scss
.xl { font: var(--text-xl); }                 // 24px Regular
.l-strong { font: var(--text-l-strong); }  // 20px Bold
.l { font: var(--text-l); }                 // 20px Regular
.m-strong { font: var(--text-m-strong); }  // 16px Bold
.m { font: var(--text-m); }                 // 16px Regular (default)
.m-lg { font: var(--text-m-lg); }           // 18px Regular
.s-medium { font: var(--text-s-medium); }  // 14px Medium
.s-xs { font: var(--text-s-xs); }           // 14px Regular
.s { font: var(--text-s); }                 // 16px Regular (taller)
.xs { font: var(--text-xs); }               // 12px Regular (legacy)
```

---

## TYPOGRAPHY SPECIFICATIONS

### Titles

| Token | Weight | Size | Line Height | Font Family |
|-------|--------|------|-------------|-------------|
| `--title-h-result` | 700 | 56px | 1.3 | Onest |
| `--title-h1-strong` | 700 | 40px | 1.3 | Onest |
| `--title-h1` | 600 | 40px | 1.3 | Onest |
| `--title-h2` | 600 | 32px | 1.3 | Onest |
| `--title-h3-strong` | 600 | 24px | 1.4 | Onest |
| `--title-h3` | 500 | 24px | 1.3 | Onest |
| `--title-h4-strong` | 600 | 20px | 1.4 | Onest |
| `--title-h4` | 500 | 20px | 1.4 | Onest |

### Text

| Token | Weight | Size | Line Height | Font Family |
|-------|--------|------|-------------|-------------|
| `--text-xl` | 400 | 24px | 1.4 | Onest |
| `--text-l-strong` | 700 | 20px | 1.4 | Onest |
| `--text-l` | 400 | 20px | 1.4 | Onest |
| `--text-m-strong` | 700 | 16px | 1.4 | Onest |
| `--text-m` | 400 | 16px | 1.4 | Onest |
| `--text-m-lg` | 400 | 18px | 1.4 | Onest |
| `--text-s-medium` | 500 | 14px | 1.4 | Onest |
| `--text-s-xs` | 400 | 14px | 16px | Onest |
| `--text-s` | 400 | 16px | 1.5 | Onest |
| `--text-xs` | 400 | 12px | 1.3 | Inter |

---

## COMMON PATTERNS

### Heading Component

```scss
// Heading.module.scss
.h1 { font: var(--title-h1); }
.h2 { font: var(--title-h2); }
.h3 { font: var(--title-h3); }
.h4 { font: var(--title-h4); }
```

```tsx
// Heading.tsx
export function Heading({ level, children }) {
  const Tag = `h${level}`;
  const className = styles[`h${level}`];
  return <Tag className={className}>{children}</Tag>;
}
```

### Text Component

```scss
// Text.module.scss
.body { font: var(--text-m); }
.large { font: var(--text-l); }
.small { font: var(--text-s); }
.tiny { font: var(--text-xs); }
```

```tsx
// Text.tsx
import styles from './Text.module.scss';

export function Text({ size = 'body', children }) {
  return <p className={styles[size]}>{children}</p>;
}
```

### Button Component

```scss
// Button.module.scss
.button {
  font: var(--text-m-strong);
  padding: var(--spacing-x2) var(--spacing-x4);
  background-color: var(--color-content-primary);
  color: var(--color-background-white);
  border-radius: var(--radius-8);
}
```

### Card Component

```scss
// Card.module.scss
.card {
  padding: var(--spacing-x4);
  border-radius: var(--radius-16);
  background-color: var(--color-background-white);
  box-shadow: var(--shadow-element);
}

.title {
  font: var(--title-h3);
  margin-bottom: var(--spacing-x2);
}

.description {
  font: var(--text-m);
  color: var(--color-content-secondary);
}
```

---

## OVERRIDING TYPOGRAPHY

### Adding Color

```scss
.title {
  font: var(--title-h1);
  color: var(--color-content-primary);
}
```

### Adding Text Transform

```scss
.label {
  font: var(--text-s-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em; // optional
}
```

### Dark Mode Variation

```scss
.title {
  font: var(--title-h1);
  color: var(--color-content-primary);

  @media (prefers-color-scheme: dark) {
    color: var(--color-background-white);
  }
}
```

---

## FONT FAMILIES (Primitives)

Use for composition in advanced cases:

```scss
--font-family-onest: 'Onest', sans-serif;
--font-family-inter: 'Inter', sans-serif;
```

**Avoid using directly.** Use semantic tokens instead:

```scss
// ❌ Don't do this
.text {
  font-family: var(--font-family-onest);
  font-size: 16px; // hardcoded!
  font-weight: 400;
  line-height: 1.4;
}

// ✅ Do this
.text {
  font: var(--text-m);
}
```

---

## MIGRATION GUIDE

If you find code using the old API:

### Old Pattern (5 properties)
```scss
.title {
  font-family: var(--font-title-h1-family);
  font-size: var(--font-title-h1-size);
  font-weight: var(--font-title-h1-weight);
  line-height: var(--font-title-h1-line-height);
  letter-spacing: var(--font-title-h1-letter-spacing);
}
```

### New Pattern (1 property)
```scss
.title {
  font: var(--title-h1);
}
```

**Migration steps:**
1. Replace 5 properties with `font: var(--[new-token])`
2. Remove old property variables
3. Test in browser
4. Verify font rendering is identical

---

## DESIGN SYSTEM PRINCIPLES

### 1. Semantic Naming
Token names describe **purpose**, not **appearance**.

```scss
// ✅ Good (semantic)
font: var(--title-h1);
font: var(--text-m);

// ❌ Bad (appearance-based)
font: var(--font-big-bold);
font: var(--font-small-gray);
```

### 2. Single Responsibility
Each token has one job: define complete typography for one use case.

```scss
// ✅ One token, one responsibility
.title { font: var(--title-h1); }

// ❌ Multiple concerns
.title {
  font: var(--title-h1);
  color: blue;
  text-decoration: underline;
  text-transform: uppercase;
  // too many concerns for a component
}
```

### 3. Consistency
Use tokens everywhere. No hardcoded values.

```scss
// ✅ Good (consistent)
.heading { font: var(--title-h1); }
.subtitle { font: var(--title-h2); }
.body { font: var(--text-m); }

// ❌ Bad (inconsistent)
.heading { font: 700 40px/1.3 Onest; }
.subtitle { font-size: 32px; }
.body { font: var(--text-m); }
```

---

## BROWSER SUPPORT

CSS `font` shorthand is supported in **all modern browsers**:
- ✅ Chrome 96+
- ✅ Firefox 95+
- ✅ Safari 15+
- ✅ Edge 96+

CSS Custom Properties (CSS variables) are supported in:
- ✅ All modern browsers
- ✅ IE 11+ with polyfill (if needed)

**Conclusion:** Safe for production use.

---

## TROUBLESHOOTING

### Font not changing?

**Check:**
1. Is the token imported from `src/shared/tokens/tokens.scss`?
2. Is the component CSS Module in `shared/ui/`?
3. Does the component import its module?
4. Are there conflicting global styles?

### Font looks different than expected?

**Check:**
1. Verify token values in `src/shared/tokens/tokens.scss`
2. Check `docs/tokens.md` for intended specs
3. Inspect in DevTools: Right-click → Inspect → Computed tab
4. Verify font families are loaded (Network tab)

### Can I override individual properties?

**Yes, but avoid it:**

```scss
// Allowed (but unusual)
.special {
  font: var(--text-m);
  font-size: 18px; // override
  font-weight: 700; // override
}
```

**Better:** Create a new token if the combination is used frequently.

---

## QUESTIONS?

Refer to:
- `docs/tokens.md` — Token specifications and source of truth
- `docs/token-reference.md` — Complete token reference
- `docs/report/typography-refactoring.md` — Design decisions

---

## SUMMARY

✅ **Use `font: var(--[token-name])`** for all typography  
✅ **One token, one line** for complete typography  
✅ **Semantic naming** for clarity  
✅ **Primitives only** if doing advanced composition  

**Result:** Clean, maintainable, scalable typography system.
