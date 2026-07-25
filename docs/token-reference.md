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

### Font Families
| Variable | Value |
|----------|-------|
| `--font-family-onest` | 'Onest', sans-serif |
| `--font-family-inter` | 'Inter', sans-serif |

### Title Styles (6)

#### Title/H_Result
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-title-h-result-family` | Onest |
| Size | `--font-title-h-result-size` | 56px |
| Weight | `--font-title-h-result-weight` | 700 |
| Line Height | `--font-title-h-result-line-height` | 1.3 |

#### Title/H1_strong
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-title-h1-strong-family` | Onest |
| Size | `--font-title-h1-strong-size` | 40px |
| Weight | `--font-title-h1-strong-weight` | 700 |
| Line Height | `--font-title-h1-strong-line-height` | 1.3 |

#### Title/H1
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-title-h1-family` | Onest |
| Size | `--font-title-h1-size` | 40px |
| Weight | `--font-title-h1-weight` | 600 |
| Line Height | `--font-title-h1-line-height` | 1.3 |

#### Title/H2
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-title-h2-family` | Onest |
| Size | `--font-title-h2-size` | 32px |
| Weight | `--font-title-h2-weight` | 600 |
| Line Height | `--font-title-h2-line-height` | 1.3 |

#### Title/H3
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-title-h3-family` | Onest |
| Size | `--font-title-h3-size` | 24px |
| Weight | `--font-title-h3-weight` | 500 |
| Line Height | `--font-title-h3-line-height` | 1.3 |

#### Title/H4
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-title-h4-family` | Onest |
| Size | `--font-title-h4-size` | 20px |
| Weight | `--font-title-h4-weight` | 500 |
| Line Height | `--font-title-h4-line-height` | 1.4 |

### Text Styles (7)

#### Text/L_strong
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-text-l-strong-family` | Onest |
| Size | `--font-text-l-strong-size` | 20px |
| Weight | `--font-text-l-strong-weight` | 700 |
| Line Height | `--font-text-l-strong-line-height` | 1.4 |

#### Text/L
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-text-l-family` | Onest |
| Size | `--font-text-l-size` | 20px |
| Weight | `--font-text-l-weight` | 400 |
| Line Height | `--font-text-l-line-height` | 1.4 |

#### Text/M_strong
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-text-m-strong-family` | Onest |
| Size | `--font-text-m-strong-size` | 16px |
| Weight | `--font-text-m-strong-weight` | 700 |
| Line Height | `--font-text-m-strong-line-height` | 1.4 |

#### Text/M (Standard)
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-text-m-family` | Onest |
| Size | `--font-text-m-size` | 16px |
| Weight | `--font-text-m-weight` | 400 |
| Line Height | `--font-text-m-line-height` | 1.4 |

#### Text/S_medium
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-text-s-medium-family` | Onest |
| Size | `--font-text-s-medium-size` | 14px |
| Weight | `--font-text-s-medium-weight` | 500 |
| Line Height | `--font-text-s-medium-line-height` | 1.4 |

#### Text/S
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-text-s-family` | Onest |
| Size | `--font-text-s-size` | 16px |
| Weight | `--font-text-s-weight` | 400 |
| Line Height | `--font-text-s-line-height` | 1.5 |

### Legacy Text Styles (2)

#### Text/XS
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-text-xs-family` | Inter |
| Size | `--font-text-xs-size` | 12px |
| Weight | `--font-text-xs-weight` | 400 |
| Line Height | `--font-text-xs-line-height` | 1.3 |

#### Text (legacy)
| Property | Token | Value |
|----------|-------|-------|
| Family | `--font-text-legacy-family` | Inter |
| Size | `--font-text-legacy-size` | 18px |
| Weight | `--font-text-legacy-weight` | 400 |
| Line Height | `--font-text-legacy-line-height` | 1.3 |

### Typography Example
```scss
// Apply all typography properties
.heading {
  font-family: var(--font-title-h1-family);
  font-size: var(--font-title-h1-size);
  font-weight: var(--font-title-h1-weight);
  line-height: var(--font-title-h1-line-height);
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
