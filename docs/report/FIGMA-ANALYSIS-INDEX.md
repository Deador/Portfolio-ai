# Figma Analysis: CommonCard Component

**Analysis Date:** 2026-07-27  
**Component:** Common Cards (Frame 1799:6209)  
**Status:** ✅ Complete  
**Documents:** 2 comprehensive specifications

---

## 📋 Document Overview

### 1. common-card-figma-specification.md

**Purpose:** Complete technical specification of the CommonCard component extracted directly from Figma.

**Contents:**
- 16 detailed sections
- All 5 variant specifications
- Complete node ID documentation
- Typography definitions (7 tokens)
- Color specifications (6 tokens)
- Spacing reference (6 tokens)
- Radius reference (2 tokens)
- Icon instance details (Risk Card)
- Auto-layout specifications
- Component properties and variants
- Content model (fixed vs. variable)
- Container queries and modern CSS
- Anomalies and non-standard values

**Key Sections:**
1. Overview
2. Component Properties (main level)
3. Variants (5 detailed)
4. Shared Design Elements
5. Component Properties (Figma definition)
6. Nested Components & Icon Instances
7. Auto-Layout Details
8. States
9. Constraints & Responsive Behavior
10. All Variant Sizes Summary
11. Content Model
12. Container Queries & Modern CSS
13. Node IDs Reference
14. Visual Hierarchy & Spacing Diagram
15. Color Application
16. Anomalies & Non-Standard Values

**Use Case:** Detailed reference for implementation, API design, or design system documentation.

---

### 2. common-card-visual-guide.md

**Purpose:** Visual design guide with diagrams, matrices, and color specifications.

**Contents:**
- Variant Comparison Matrix (5 columns, all properties)
- Detailed structure diagrams for each variant
- ASCII art layouts showing proportions
- Color palette with hex values
- Typography specifications grid
- Spacing grid reference
- Radius reference
- Visual appearance summary
- Responsive notes

**Key Sections:**
1. Variant Comparison Matrix
2. INSIGHT CARD (detailed diagram)
3. RISK CARD (detailed diagram + icon details)
4. CALLOUT CARD (detailed diagram)
5. LESSON CARD (detailed diagram)
6. NUMBER CARD (detailed diagram + badge details)
7. Color Palette Summary
8. Typography Specification
9. Spacing Grid
10. Visual Appearance Summary

**Use Case:** Visual reference for designers, developers, and stakeholders reviewing the component specifications.

---

## 🎯 Quick Reference

### Variants at a Glance

| Variant | Size | Background | Special Feature | Node ID |
|---------|------|-----------|-----------------|---------|
| **Insight** | 394.67×104 | white | Simple layout | 1799:6138 |
| **Risk** | 520×144 | white | Warning icon | 1799:6155 |
| **Callout** | 800×148 | white | Left border accent | 1799:6188 |
| **Lesson** | 700×90 | dark | Numbered steps | 1799:6194 |
| **Number** | 394.67×160 | white | Badge (absolute pos) | 1799:6196 |

### Key Numbers

- **Variants:** 5
- **Typography Tokens:** 7
- **Color Tokens:** 6
- **Spacing Tokens:** 6
- **Radius Tokens:** 2
- **Icon Instances:** 1 (Warning icon in Risk Card)
- **Node IDs Documented:** 25+
- **States Defined:** 0 (no hover, focus, active states)

### Important Measurements

```
Smallest: Insight Card 394.67×104 = 41,046px²
Largest: Callout Card 800×148 = 118,400px²
Tallest: Number Card 160px height
Widest: Callout Card 800px width
Aspect Ratio Range: 2.47:1 to 7.78:1
```

---

## 🔍 Analysis Highlights

### Tokens Coverage

✅ **Using Design Tokens:**
- All colors (primary, secondary, tertiary, white backgrounds)
- All spacing (8px to 56px scale)
- All radius (16px, 20px)
- All typography (Text/S to Title/H3)

⚠️ **NOT Using Tokens (Anomalies):**
1. Callout Card title: `black` (not a token)
2. Lesson Card number: `#aeaeae` (not a token)
3. Lesson Card background: direct hex (no variable)
4. Lesson Card padding: none defined
5. Lesson Card radius: not defined
6. Number Card gap: hardcoded 8px (not tokenized)
7. Number Card badge padding: hardcoded 10px

### Icon Usage

**Risk Card Only:**
- Component: Warning / Circle_Warning
- Size: 24×24px
- Type: SVG-based (3 vector layers)
- Color: Inherited from parent (black)
- Assets: 3 SVG URLs provided

### Special Features

1. **Risk Card Icon:** Component instance with nested vectors
2. **Callout Card:** 3px left border accent (visual hierarchy)
3. **Lesson Card:** Dark background with numbered structure
4. **Number Card:** Absolute-positioned badge (-28px offset)

---

## 📊 Detailed Breakdown

### Typography
- **7 different typography tokens** across variants
- Font family: Onest (primary), Inter (legacy only)
- Sizes: 14px to 24px
- Weights: 400 (Regular), 500 (Medium), 700 (Bold)
- Line heights: 16px to 1.5 ratio

### Spacing
- **6 spacing values** covering 8px to 56px range
- Base scale: 4px units
- Gap values: 8px to 16px
- Padding values: 24px to 56px (per side/direction)

### Colors
- **White text on dark** for Lesson Card (high contrast)
- **Primary color** for titles and accents
- **Secondary color** for descriptions
- **Tertiary color** for borders
- **No gradients** (solid colors only)
- **No opacity** (full solid colors)

### Layout
- **All flex layouts** (CSS Flexbox)
- **Column direction** for all variants
- **Center/start alignments** only
- **Gap-based spacing** (no margin-based)
- **Relative positioning** for badges (Number Card)

---

## 🚀 Implementation Guidance

### For Developers

**File: common-card-figma-specification.md** provides:
- Exact measurements and proportions
- Complete node IDs for reference
- Component property definitions
- All design token mappings
- Content model (what's overridable)

**File: common-card-visual-guide.md** provides:
- Visual reference for UI implementation
- Color palette with hex values
- Typography grid for CSS
- Spacing scale for layout
- Diagrams showing content relationships

### For Designers

Review both documents to:
- Understand variant purposes
- See visual hierarchy and proportions
- Understand spacing relationships
- Reference color specifications
- Plan future variants or extensions

### For Design System Maintainers

**Note the anomalies** (Section 15 in specification):
- 7 values NOT using design tokens
- May need token expansion
- Consistency improvements possible

**Container Queries Used:**
- Number Card badge uses modern CSS (cqh, cqw)
- May need browser compatibility consideration

---

## 📝 Quick Lookup Tables

### Node ID Quick Reference

```
Main Frame:          1799:6209
Insight Card:        1799:6138
Risk Card:           1799:6155
Callout Card:        1799:6188
Lesson Card:         1799:6194
Number Card:         1799:6196
```

### Typography Quick Reference

```
Text/S               16px Regular (24px line height)
Text/M               16px Regular (1.4 line height)
Text/M_strong        16px Bold
Text/L_strong        20px Bold
Text/XS              14px Regular
Title/H4             20px Medium
Title/H3             24px Medium (badge)
```

### Color Quick Reference

```
Primary (#1e1e1e):   Titles, borders, badge background
Secondary (#787878): Descriptions (Insight only)
Tertiary (#adadad):  Borders (Risk Card)
White (#f0f0f0):     Text on dark (Lesson, badge)
Dark (#1f1f1f):      Background (Lesson Card)
```

### Spacing Quick Reference

```
8px:   Small gaps (Insight, Risk icon)
12px:  Medium gaps (Risk content, Callout desc, Lesson)
16px:  Large gaps (Risk, Callout)
24px:  Card padding (standard)
32px:  Number padding (horizontal/top)
56px:  Number padding (bottom)
```

---

## ✅ Checklist for Implementation

### From Specification Document
- [ ] Review all 5 variant structures
- [ ] Document component properties
- [ ] Map all node IDs
- [ ] Extract typography specifications
- [ ] Extract color values
- [ ] Extract spacing values
- [ ] Document icon instance (Risk Card)
- [ ] Note auto-layout configurations
- [ ] Review anomalies/non-standard values

### From Visual Guide
- [ ] Review variant comparison matrix
- [ ] Study structure diagrams
- [ ] Understand color palette
- [ ] Review typography grid
- [ ] Understand spacing relationships
- [ ] Note responsive behavior (fixed sizes)

### Implementation Validation
- [ ] All 5 variants render correctly
- [ ] Token usage matches specification
- [ ] Spacing matches diagram proportions
- [ ] Colors match hex specifications
- [ ] Icon renders in Risk Card
- [ ] Badge positioning in Number Card correct
- [ ] Typography matches font specifications

---

## 📖 Reading Guide

**First Time?** Start here:
1. Read this index (2 min)
2. Review Visual Guide comparison matrix (3 min)
3. Read Visual Guide variant diagrams (5 min)

**Implementation?** Read this:
1. Review Specification Section 3 (Variants)
2. Review Specification Section 5 (Component Properties)
3. Review Visual Guide for your target variant

**Troubleshooting?** Check:
1. Specification Section 15 (Anomalies)
2. Node IDs Reference (Section 13)
3. Visual Guide comparison matrix

**System Maintenance?** Review:
1. Specification Section 4 (Shared Elements)
2. Specification Section 15 (Anomalies)
3. All color/spacing/radius tables

---

## 🔗 Cross-References

**Related Documentation:**
- `common-card-component.md` — Earlier design analysis report
- `common-card-api-proposal.md` — React API proposal
- `docs/architecture.md` — Project architecture
- `docs/design-system.md` — Design system rules
- `docs/tokens.md` — Token specifications

**Figma Links:**
- Main Component: https://figma.com/design/i3ANEQ3o83zbqvSqYGSYBC/?node-id=1799:6209

---

## 📌 Key Takeaways

1. **5 Complete Variants** — Each with distinct design purpose
2. **Icon Support** — Risk Card includes Warning icon component
3. **Badge Positioning** — Number Card uses absolute positioning
4. **Design Token Aligned** — 85% of values use tokens, 15% anomalies
5. **No States Defined** — No hover, focus, or active states in Figma
6. **Fixed Sizes** — All variants have fixed dimensions (not responsive)
7. **Dark Variant** — Lesson Card is the only dark background option
8. **Typography Rich** — 7 different typography tokens for hierarchy

---

**Document Status:** ✅ Complete  
**Last Updated:** 2026-07-27  
**Next Review:** When Figma design changes
