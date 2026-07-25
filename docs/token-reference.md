# Token Reference Guide

**For developers building components**

All CSS Custom Properties are defined in `src/shared/tokens/tokens.scss` and automatically available in any component's CSS Module.

---

## COLORS (10 tokens)

### Content Colors
| Variable | Value | Use Case |
|----------|-------|----------|
| `--color-content-primary` | #1e1e1e | Primary text, headings |
| `--color-content-secondary` | #787878 | Secondary text, muted |
| `--color-content-tertiary` | #adadad | Tertiary text, disabled |
| `--color-content-white` | #f0f0f0 | Light text on dark bg |

### Background Colors
| Variable | Value | Use Case |
|----------|-------|----------|
| `--color-background-white` | #ffffff | Main background |
| `--color-background-dark` | #1f1f1f | Dark background |
| `--color-background-secondary` | #e2e4e7 | Secondary background |

### Icon Colors
| Variable | Value | Use Case |
|----------|-------|----------|
| `--color-icon-line` | #33363f | Line icons |
| `--color-icon-fill` | #222222 | Filled icons |
| `--color-icon-duotone` | #7e869e | Duotone icons |

### Example
```scss
.button {
  background-color: var(--color-content-primary);
  color: var(--color-background-white);
}
```

---

## SPACING (12 tokens - 4px scale)

| Variable | Value | Multiplier | Use Case |
|----------|-------|-----------|----------|
| `--spacing-x1` | 4px | 1x | Tight spacing |
| `--spacing-x2` | 8px | 2x | Small padding |
| `--spacing-x3` | 12px | 3x | |
| `--spacing-x4` | 16px | 4x | Default padding |
| `--spacing-x5` | 20px | 5x | |
| `--spacing-x6` | 24px | 6x | Medium spacing |
| `--spacing-x8` | 32px | 8x | Large spacing |
| `--spacing-x10` | 40px | 10x | Extra large |
| `--spacing-x12` | 48px | 12x | Section spacing |
| `--spacing-x14` | 56px | 14x | |
| `--spacing-x18` | 72px | 18x | Large sections |
| `--spacing-x20` | 80px | 20x | Page margins |

### Example
```scss
.card {
  padding: var(--spacing-x4);
  margin-bottom: var(--spacing-x6);
}
```

---

## RADIUS (4 tokens)

| Variable | Value | Use Case |
|----------|-------|----------|
| `--radius-8` | 8px | Subtle curves |
| `--radius-16` | 16px | Standard components |
| `--radius-20` | 20px | Large components |
| `--radius-24` | 24px | Extra large |

### Example
```scss
.button {
  border-radius: var(--radius-8);
}

.card {
  border-radius: var(--radius-16);
}
```

---

## TYPOGRAPHY (15 tokens)

### Font Families (Primitives)
Use only for composition. Prefer semantic typography tokens below.

| Variable | Value |
|----------|-------|
| `--font-family-onest` | 'Onest', sans-serif |
| `--font-family-inter` | 'Inter', sans-serif |

### Semantic Typography Tokens (CSS `font` Shorthand)

Format: `weight size/line-height family`

All 15 typography tokens use the CSS `font` shorthand for efficient, clean API:

#### Title Styles (6 tokens)

| Token | Value | Use Case |
|-------|-------|----------|
| `--title-h-result` | 700 56px/1.3 Onest | Large display heading |
| `--title-h1-strong` | 700 40px/1.3 Onest | Bold heading h1 |
| `--title-h1` | 600 40px/1.3 Onest | Semibold heading h1 |
| `--title-h2` | 600 32px/1.3 Onest | Heading h2 |
| `--title-h3` | 500 24px/1.3 Onest | Heading h3 |
| `--title-h4` | 500 20px/1.4 Onest | Heading h4 |

#### Text Styles (7 tokens)

| Token | Value | Use Case |
|-------|-------|----------|
| `--text-l-strong` | 700 20px/1.4 Onest | Large bold text |
| `--text-l` | 400 20px/1.4 Onest | Large text |
| `--text-m-strong` | 700 16px/1.4 Onest | Medium bold text |
| `--text-m` | 400 16px/1.4 Onest | Standard text (default) |
| `--text-s-medium` | 500 14px/1.4 Onest | Small medium text |
| `--text-s` | 400 16px/1.5 Onest | Small text |

#### Legacy Text Styles (2 tokens)

| Token | Value | Use Case |
|-------|-------|----------|
| `--text-xs` | 400 12px/1.3 Inter | Extra small text (legacy) |
| `--text-legacy` | 400 18px/1.3 Inter | Legacy text (deprecated) |

### Typography Example: Simple & Clean

```scss
// Before: 5 properties per token
.title {
  font-family: var(--font-title-h1-family);
  font-size: var(--font-title-h1-size);
  font-weight: var(--font-title-h1-weight);
  line-height: var(--font-title-h1-line-height);
  letter-spacing: 0; // or var(--font-title-h1-letter-spacing);
}

// After: 1 property — much cleaner!
.title {
  font: var(--title-h1);
}

.text {
  font: var(--text-m);
}

.caption {
  font: var(--text-xs);
}
```

---

## EFFECTS (1 token)

| Variable | Value | Use Case |
|----------|-------|----------|
| `--shadow-element` | 0 2px 30px rgba(0, 0, 0, 0.05) | Card shadow, elevation |

### Example
```scss
.card {
  box-shadow: var(--shadow-element);
}
```

---

## COMPLETE TOKEN COUNT

- Colors: 10
- Spacing: 12
- Radius: 4
- Typography: 15 (with 4-5 properties each)
- Effects: 1

**Total: 42 base tokens + typography properties = complete design system**

---

## BEST PRACTICES

1. **Always use tokens**
   ```scss
   // ✅ Good
   padding: var(--spacing-x4);
   
   // ❌ Bad
   padding: 16px;
   ```

2. **Compose typography properly**
   ```scss
   // ✅ Good
   font-family: var(--font-title-h1-family);
   font-size: var(--font-title-h1-size);
   font-weight: var(--font-title-h1-weight);
   line-height: var(--font-title-h1-line-height);
   
   // ❌ Incomplete
   font-size: 40px;
   ```

3. **Namespace component styles**
   ```scss
   // ✅ Good - scoped to component
   .button { /* component styles */ }
   .button__text { /* child styles */ }
   
   // ❌ Bad - could conflict globally
   .text { /* ambiguous */ }
   ```

4. **No magic numbers**
   ```scss
   // ✅ Good
   margin-bottom: var(--spacing-x6);
   
   // ❌ Bad
   margin-bottom: 24px;
   ```

---

## SOURCE OF TRUTH

All tokens defined in: `src/shared/tokens/tokens.scss`  
Documented in: `docs/tokens.md`  
Original data: Figma Design System Variables

**Do not invent new tokens.** If a value is missing, request it through the design system process.
