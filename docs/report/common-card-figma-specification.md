# CommonCard Component — Figma Design Specification

**Document Date:** 2026-07-27  
**Figma Component:** Common Cards  
**Frame Node ID:** 1799:6209  
**Status:** Complete Design Specification

---

## Overview

CommonCard is a compound component with 5 distinct variants. Each variant is a separate symbol within the main frame. All variants share:
- White or dark backgrounds
- Onest typeface family
- Design token-based spacing, radius, and colors
- Flex layout architecture

---

## 1. Component Properties

### Main Container Properties

**Component Type:** Frame + Symbols  
**Parent Frame Node ID:** 1799:6209  
**Parent Frame Dimensions:** 1858px × 445px  
**Parent Frame Position:** x=100, y=100

**Component Properties (Main Level):**
```
type: "Insight Card" | "Risk Card" | "Callout Card" | "Lesson Card" | "Number Card"
title: string (default: "Title")
description: string (default: "Description")
className: string (optional)
```

**Component Properties Override Rules:**
- All variants use the same component with type-based conditional rendering
- title and description are string props (overridable)
- Other content is fixed (e.g., "01" in Lesson Card, badge number in Number Card)

---

## 2. Variants

### Variant 1: INSIGHT CARD

**Node ID:** 1799:6138  
**Symbol Name:** Type=Insight Card  
**Position in Frame:** x=20, y=20  
**Dimensions:** 394.67px × 104px

**Layout:**
- Display: flex
- Flex Direction: column
- Align Items: flex-start
- Justify Content: center
- Gap: 8px (var(--padding/x2))

**Box Model:**
- Padding: 24px (var(--padding/x6)) — all sides
- Background: var(--background/white, #ffffff)
- Border Radius: 16px (var(--radius/radius-16))
- Border: none

**Content Structure:**
```
Insight Card (flex column)
├── Title (paragraph)
│   └── Text: {title}
│   └── Font: Text/S (16px Regular, line-height: 24px)
│   └── Color: var(--content/primary, #1e1e1e)
│   └── Node ID: 1798:4251
│
└── Description (paragraph)
    └── Text: {description}
    └── Font: Text/M (16px Regular, line-height: 1.4)
    └── Color: var(--content/secondary, #787878)
    └── Node ID: 1798:4252
```

**Typography Details:**
- Title: Font family Onest, 16px, weight 400 (Regular), line-height 24px
- Description: Font family Onest, 16px, weight 400 (Regular), line-height 1.4

**States:** Not defined

**Icon Instances:** None

---

### Variant 2: RISK CARD

**Node ID:** 1799:6155  
**Symbol Name:** Type=Risk Card  
**Position in Frame:** x=471, y=20  
**Dimensions:** 520px × 144px

**Layout:**
- Display: flex
- Flex Direction: column
- Align Items: flex-start
- Gap: 16px (var(--padding/x4))

**Box Model:**
- Padding: 24px (var(--padding/x6)) — all sides
- Background: var(--background/white, #ffffff)
- Border: 1px solid var(--content/tertiary, #adadad)
- Border Radius: 20px (var(--radius/radius-20))
- Overflow: hidden

**Content Structure:**
```
Risk Card (flex column)
├── Warning Icon Container (flex column)
│   └── Gap: 8px (var(--padding/x2))
│   └── Width: 24px × 24px
│   └── Node ID: 1799:6146
│   └── Icon Name: Warning / Circle_Warning
│   └── Icon Instance: Yes (Component Instance)
│   │
│   ├── Vector 1 (nested SVG)
│   │   └── Node ID: I1799:6146;4:3815
│   │   └── Asset URL: http://localhost:3845/assets/b5ff1ddd1a66d3dd7f6c19bd98be253ace7d5953.svg
│   │   └── Inset: 12.5% (padding inside parent)
│   │
│   ├── Vector 2 (nested SVG)
│   │   └── Node ID: I1799:6146;4:3866
│   │   └── Asset URL: http://localhost:3845/assets/c12eec6441aea6d199b0268536913fd330b7ba85.svg
│   │   └── Inset: 60.42%_43.75%_27.08%_43.75%
│   │
│   └── Vector 3 (nested SVG)
│       └── Node ID: I1799:6146;4:3867
│       └── Asset URL: http://localhost:3845/assets/5d63495cfa61e5c05c75f48e29d727660deb8608.svg
│       └── Position: Rotated 180°
│       └── Container Type: size (CQH - container query height)
│
└── Content Wrapper (flex column)
    └── Gap: 12px (var(--padding/x3))
    └── Width: 100%
    └── Node ID: 1799:6148
    │
    ├── Title (paragraph)
    │   └── Text: {title}
    │   └── Font: Text/M_strong (16px Bold, weight 700, line-height: 1.4)
    │   └── Color: var(--content/primary, #1e1e1e)
    │   └── Node ID: 1799:6149
    │
    └── Description (paragraph)
        └── Text: {description}
        └── Font: Text/M (16px Regular, weight 400, line-height: 1.4)
        └── Color: var(--content/primary, #1e1e1e)
        └── Node ID: 1799:6150
```

**Icon Details:**
- **Icon Component:** Warning / Circle_Warning (Component Instance)
- **Icon Size:** 24px × 24px
- **Icon Type:** SVG-based (3 vector layers)
- **Icon Color:** Inherits from parent (var(--content/primary))
- **Icon Location:** Top of card content

**Typography Details:**
- Title: Font family Onest, 16px, weight 700 (Bold), line-height 1.4
- Description: Font family Onest, 16px, weight 400 (Regular), line-height 1.4

**States:** Not defined

**Icon Instances:** 1 instance (Warning / Circle_Warning component instance)

---

### Variant 3: CALLOUT CARD

**Node ID:** 1799:6188  
**Symbol Name:** Type=Callout Card  
**Position in Frame:** x=1038, y=20  
**Dimensions:** 800px × 148px

**Layout:**
- Display: flex
- Flex Direction: column
- Align Items: flex-start
- Gap: 16px (var(--padding/x4))

**Box Model:**
- Padding: 24px (var(--padding/x6)) — all sides
- Background: var(--background/white, #ffffff)
- Border Left: 3px solid var(--content/primary, #1e1e1e)
- Border Radius: 20px (var(--radius/radius-20))
- Overflow: hidden
- Word Break: break-word

**Content Structure:**
```
Callout Card (flex column)
├── Title (paragraph)
│   └── Text: {title}
│   └── Font: Text/L_strong (20px Bold, weight 700, line-height: 1.4)
│   └── Color: black (#000000)
│   └── Node ID: 1799:6183
│
└── Description Group (flex column)
    └── Gap: 12px (var(--padding/x3))
    └── Node ID: 1799:6184
    │
    ├── Description Line 1 (paragraph)
    │   └── Text: {description}
    │   └── Font: Text/M (16px Regular, weight 400, line-height: 1.4)
    │   └── Color: var(--content/primary, #1e1e1e)
    │   └── Node ID: 1799:6185
    │
    └── Description Line 2 (paragraph)
        └── Text: "Text" (fixed string)
        └── Font: Text/M (16px Regular, weight 400, line-height: 1.4)
        └── Color: var(--content/primary, #1e1e1e)
        └── Node ID: 1799:6186
```

**Typography Details:**
- Title: Font family Onest, 20px, weight 700 (Bold), line-height 1.4
- Description: Font family Onest, 16px, weight 400 (Regular), line-height 1.4

**States:** Not defined

**Icon Instances:** None

**Special Features:**
- 3px left border accent (primary color)
- Two-line description layout
- Wider container (800px)

---

### Variant 4: LESSON CARD

**Node ID:** 1799:6194  
**Symbol Name:** Type=Lesson Card  
**Position in Frame:** x=56, y=208  
**Dimensions:** 700px × 90px

**Layout:**
- Display: flex
- Flex Direction: column
- Align Items: flex-start
- Gap: 12px (var(--padding/x3))

**Box Model:**
- Padding: Not defined (no padding visible)
- Background: var(--color-background-dark, #1f1f1f)
- Border: none
- Border Radius: Not defined
- Overflow: visible

**Content Structure:**
```
Lesson Card (flex column)
├── Lesson Number (paragraph)
│   └── Text: "01" (fixed string)
│   └── Font: Text/XS (14px Regular, weight 400, line-height: 16px)
│   └── Color: #aeaeae (gray, not a token variable)
│   └── Node ID: 1798:4244
│
├── Title (paragraph)
│   └── Text: {title}
│   └── Font: Title/H4 (20px Medium, weight 500, line-height: 1.4)
│   └── Color: var(--content/white, #eee)
│   └── Node ID: 1798:4245
│
└── Description (paragraph)
    └── Text: {description}
    └── Font: Text/M (16px Regular, weight 400, line-height: 1.4)
    └── Color: var(--content/white, #eee)
    └── Node ID: 1798:4246
```

**Typography Details:**
- Number: Font family Onest, 14px, weight 400 (Regular), line-height 16px
- Title: Font family Onest, 20px, weight 500 (Medium), line-height 1.4
- Description: Font family Onest, 16px, weight 400 (Regular), line-height 1.4

**States:** Not defined

**Icon Instances:** None

**Special Features:**
- Dark background (var(--color-background-dark))
- Fixed "01" label (suggests step numbering capability)
- White/light text on dark background
- No visible padding/border radius

---

### Variant 5: NUMBER CARD

**Node ID:** 1799:6196  
**Symbol Name:** Type=Number Card  
**Position in Frame:** x=794, y=216  
**Dimensions:** 394.67px × 160px

**Layout:**
- Display: flex
- Flex Direction: column
- Align Items: center
- Justify Content: center
- Gap: 8px (8px — not using token variable, hardcoded)
- Position: relative (for badge positioning)

**Box Model:**
- Padding: 32px (var(--padding/x8)) horizontal, 32px top, 56px bottom (var(--padding/x14))
- Height: 160px (explicit height)
- Background: var(--background/white, #ffffff)
- Border: none
- Border Radius: 16px (var(--radius/radius-16))

**Content Structure:**
```
Number Card (flex column, centered, relative)
├── Title (paragraph)
│   └── Text: {title}
│   └── Font: Text/S (16px Regular, weight 400, line-height: 24px)
│   └── Color: var(--content/primary, #1e1e1e)
│   └── Text Align: center
│   └── Node ID: 1798:4255
│   └── Word Break: break-word
│
└── Badge Container (flex column, absolute positioning)
    └── Position: absolute
    └── Top: -28px (half badge height, positioned above card)
    └── Left: 50% (horizontal center)
    └── Transform: translateX(-50%) (perfect centering)
    └── Width: 56px
    └── Height: 56px
    └── Padding: 10px
    └── Background: var(--content/primary, #1e1e1e)
    └── Border Radius: 16px (var(--radius/radius-16))
    └── Display: flex (center content)
    └── Node ID: 1798:4256
    │
    └── Badge Number (paragraph)
        └── Text: "1" (default, overridable)
        └── Font: Title/H3 (24px Medium, weight 500, line-height: 1.3)
        └── Color: var(--content/white, #f0f0f0)
        └── Text Align: center
        └── Node ID: 1798:4257
```

**Typography Details:**
- Card Title: Font family Onest, 16px, weight 400 (Regular), line-height 24px
- Badge Number: Font family Onest, 24px, weight 500 (Medium), line-height 1.3

**States:** Not defined

**Icon Instances:** None

**Special Features:**
- Absolute-positioned badge extending above card (top: -28px)
- Badge is 56px × 56px circle-like square
- Requires parent position: relative for badge positioning
- Card height is explicit (160px)
- Gap value hardcoded (8px) instead of using token variable

---

## 3. Shared Design Elements

### Typography Tokens Used Across All Variants

| Token | Font | Size | Weight | Weight Value | Line Height | Usage |
|-------|------|------|--------|--------------|-------------|-------|
| Text/S | Onest | 16px | Regular | 400 | 24px | Insight title, Number title |
| Text/M | Onest | 16px | Regular | 400 | 1.4 | Insight description, Risk description, Callout description |
| Text/M_strong | Onest | 16px | Bold | 700 | 1.4 | Risk title |
| Text/L_strong | Onest | 20px | Bold | 700 | 1.4 | Callout title |
| Text/XS | Onest | 14px | Regular | 400 | 16px | Lesson number |
| Title/H4 | Onest | 20px | Medium | 500 | 1.4 | Lesson title |
| Title/H3 | Onest | 24px | Medium | 500 | 1.3 | Number badge |

### Color Tokens Used Across All Variants

| Token | Value | Usage |
|-------|-------|-------|
| var(--background/white) | #ffffff | Insight, Risk, Callout, Number backgrounds |
| var(--background/dark) | #1f1f1f | Lesson background |
| var(--content/primary) | #1e1e1e | Title text, borders, badge background |
| var(--content/secondary) | #787878 | Insight description text |
| var(--content/tertiary) | #adadad | Risk card border |
| var(--content/white) | #f0f0f0 | Lesson text, badge text |

### Spacing Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| var(--padding/x2) | 8px | Insight gap, Risk icon gap |
| var(--padding/x3) | 12px | Risk content gap, Callout description gap, Lesson gap |
| var(--padding/x4) | 16px | Risk gap, Callout gap |
| var(--padding/x6) | 24px | All card padding (except Number) |
| var(--padding/x8) | 32px | Number padding (horizontal and top) |
| var(--padding/x14) | 56px | Number bottom padding |

### Radius Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| var(--radius/radius-16) | 16px | Insight, Number card radius |
| var(--radius/radius-20) | 20px | Risk, Callout card radius |

---

## 4. Component Properties (Figma Definition)

### Main Component Properties

The CommonCard component accepts the following properties:

```
type: "Insight Card" | "Risk Card" | "Callout Card" | "Lesson Card" | "Number Card"
title: string (default: "Title")
description: string (default: "Description")
className: string (optional, empty by default)
```

### Property Behaviors

**type:** Determines which variant renders. All other properties remain constant.

**title:** 
- Insight Card: Primary text content
- Risk Card: Bold title text
- Callout Card: Large bold title text
- Lesson Card: Main content title
- Number Card: Subtitle below badge
- Default: "Title"
- Overridable: Yes

**description:**
- Insight Card: Secondary text content
- Risk Card: Secondary text content
- Callout Card: Description lines (first line uses this prop, second is fixed "Text")
- Lesson Card: Description below title
- Number Card: Not used (ignored)
- Default: "Description"
- Overridable: Yes

**className:** 
- Optional CSS class override
- Not used in Figma (design system level)
- Default: empty string
- Overridable: Yes

---

## 5. Nested Components & Icon Instances

### Risk Card Icon Instance

**Icon Component Name:** Warning / Circle_Warning  
**Instance Location:** Risk Card (1799:6155)  
**Instance Node ID:** 1799:6146  
**Instance Size:** 24px × 24px  
**Instance Layers:** 3 vector shapes

**Vector Layers:**
1. **Vector 1 (Outer Circle)**
   - Node ID: I1799:6146;4:3815
   - Asset: http://localhost:3845/assets/b5ff1ddd1a66d3dd7f6c19bd98be253ace7d5953.svg
   - Inset: 12.5%
   - Purpose: Circle outline

2. **Vector 2 (Inner Elements)**
   - Node ID: I1799:6146;4:3866
   - Asset: http://localhost:3845/assets/c12eec6441aea6d199b0268536913fd330b7ba85.svg
   - Inset: 60.42%_43.75%_27.08%_43.75%
   - Purpose: Inner shapes

3. **Vector 3 (Rotated Element)**
   - Node ID: I1799:6146;4:3867
   - Asset: http://localhost:3845/assets/5d63495cfa61e5c05c75f48e29d727660deb8608.svg
   - Rotation: 180°
   - Container Query: size (CQH)
   - Purpose: Decorative element

**Icon Color:** Inherits currentColor (black by default, can be styled via CSS)

---

## 6. Auto-Layout Details

### Insight Card Auto-Layout
- Direction: Vertical (column)
- Alignment: Start (flex-start)
- Spacing: 8px (fixed)
- Packed: No

### Risk Card Auto-Layout
- Direction: Vertical (column)
- Alignment: Start (flex-start)
- Spacing: 16px (fixed)
- Packed: No

### Callout Card Auto-Layout
- Direction: Vertical (column)
- Alignment: Start (flex-start)
- Spacing: 16px (fixed)
- Packed: No

### Lesson Card Auto-Layout
- Direction: Vertical (column)
- Alignment: Start (flex-start)
- Spacing: 12px (fixed)
- Packed: No

### Number Card Auto-Layout
- Direction: Vertical (column)
- Alignment: Center (center)
- Spacing: 8px (fixed)
- Packed: No (but uses justify-content: center)

---

## 7. States

**Hover States:** Not defined  
**Focus States:** Not defined  
**Active States:** Not defined  
**Disabled States:** Not defined  
**Error States:** Not defined  
**Loading States:** Not defined  

All states are: **Not defined**

---

## 8. Constraints & Responsive Behavior

| Variant | Width | Height | Constraint | Notes |
|---------|-------|--------|-----------|-------|
| Insight | 394.67px | 104px | Fixed | No responsiveness defined |
| Risk | 520px | 144px | Fixed | No responsiveness defined |
| Callout | 800px | 148px | Fixed | No responsiveness defined |
| Lesson | 700px | 90px | Fixed | No responsiveness defined |
| Number | 394.67px | 160px | Fixed | No responsiveness defined |

---

## 9. All Variant Sizes Summary

| Variant | Width | Height | Area | Ratio |
|---------|-------|--------|------|-------|
| Insight Card | 394.67px | 104px | 41,046px² | 3.79:1 |
| Risk Card | 520px | 144px | 74,880px² | 3.61:1 |
| Callout Card | 800px | 148px | 118,400px² | 5.41:1 |
| Lesson Card | 700px | 90px | 63,000px² | 7.78:1 |
| Number Card | 394.67px | 160px | 63,147px² | 2.47:1 |

---

## 10. Content Model

### Fixed Content (Non-Overridable)

| Variant | Element | Content | Node ID |
|---------|---------|---------|---------|
| Lesson | Number Label | "01" | 1798:4244 |
| Callout | Description Line 2 | "Text" | 1799:6186 |
| Number | Badge Number | "1" | 1798:4257 |
| Risk | Icon Instance | Warning Circle | 1799:6146 |

### Variable Content (Overridable)

| Variant | Property | Default |
|---------|----------|---------|
| All | title | "Title" |
| Insight, Risk, Callout, Lesson | description | "Description" |
| Number | title | "Title" |

---

## 11. Container Queries & Modern CSS

**Number Card Badge:**
- Uses CSS Container Queries (container-type: size)
- Container Query Units: cqh (container query height), cqw (container query width)
- Purpose: Responsive sizing within container constraints

**All Other Elements:** No container queries defined

---

## 12. Node IDs Reference

### Main Frame
- **Frame:** 1799:6209 (Common Cards)

### Variant Symbols
- **Insight Card:** 1799:6138
- **Risk Card:** 1799:6155
- **Callout Card:** 1799:6188
- **Lesson Card:** 1799:6194
- **Number Card:** 1799:6196

### Insight Card Content
- **Title:** 1798:4251
- **Description:** 1798:4252

### Risk Card Content
- **Icon Wrapper:** 1799:6145
- **Icon Instance:** 1799:6146 (Warning / Circle_Warning)
- **Vector 1:** I1799:6146;4:3815
- **Vector 2:** I1799:6146;4:3866
- **Vector 3:** I1799:6146;4:3867
- **Title:** 1799:6149
- **Description:** 1799:6150
- **Content Wrapper:** 1799:6148

### Callout Card Content
- **Title:** 1799:6183
- **Description Group:** 1799:6184
- **Description Line 1:** 1799:6185
- **Description Line 2:** 1799:6186

### Lesson Card Content
- **Number:** 1798:4244
- **Title:** 1798:4245
- **Description:** 1798:4246

### Number Card Content
- **Title:** 1798:4255
- **Badge:** 1798:4256
- **Badge Number:** 1798:4257

---

## 13. Visual Hierarchy & Spacing Diagram

```
INSIGHT CARD (394.67 × 104)
┌─────────────────────────────┐
│ 24px padding (var --x6)     │
│ ┌───────────────────────────┐│
│ │ Title (Text/S)            ││
│ │ Primary text              ││
│ │                           ││
│ │ 8px gap (var --x2)       ││
│ │                           ││
│ │ Description (Text/M)      ││
│ │ Secondary text            ││
│ └───────────────────────────┘│
│ 24px padding (var --x6)     │
└─────────────────────────────┘

RISK CARD (520 × 144)
┌────────────────────────────┐
│ border: 1px, radius: 20px  │
│ 24px padding (var --x6)    │
│ ┌──────────────────────────┐│
│ │ [Icon] 24×24             ││ 16px gap (var --x4)
│ │                          ││
│ │ Title (Text/M_strong)    ││
│ │ 12px gap (var --x3)      ││ (nested)
│ │ Description (Text/M)     ││
│ └──────────────────────────┘│
│ 24px padding (var --x6)    │
└────────────────────────────┘

CALLOUT CARD (800 × 148)
┌──────────────────────────────┐
│ border-left: 3px primary     │
│ 24px padding (var --x6)      │
│ ┌────────────────────────────┐│
│ │ Title (Text/L_strong) 20px ││ 16px gap (var --x4)
│ │                            ││
│ │ Description (Text/M)       ││
│ │ 12px gap (var --x3)        ││ (nested)
│ │ "Text" (fixed)             ││
│ └────────────────────────────┘│
│ 24px padding (var --x6)      │
└──────────────────────────────┘

LESSON CARD (700 × 90)
┌────────────────────────────┐
│ background: dark (#1f1f1f) │
│ 12px gap (var --x3)        │
│ ┌──────────────────────────┐│
│ │ "01" (Text/XS, gray)     ││
│ │ Title (Title/H4, white)  ││
│ │ Description (Text/M)     ││
│ └──────────────────────────┘│
└────────────────────────────┘

NUMBER CARD (394.67 × 160)
┌──────────────────────────────┐
│                [Badge: 56×56] │ ← top: -28px (absolute)
│ 32px top padding (var --x14) │   Position: absolute
│                              │   Background: primary
│ Title (Text/S, centered)     │   Radius: 16px
│                              │
│ 32px horiz (var --x8)        │
│ 56px bottom (var --x8)       │
└──────────────────────────────┘
```

---

## 14. Color Application

### Backgrounds
- **Insight, Risk, Callout, Number:** var(--background/white, #ffffff)
- **Lesson:** var(--background/dark, #1f1f1f)

### Text Colors
- **Insight title:** var(--content/primary, #1e1e1e)
- **Insight description:** var(--content/secondary, #787878)
- **Risk title:** var(--content/primary, #1e1e1e)
- **Risk description:** var(--content/primary, #1e1e1e)
- **Callout title:** black (#000000) — not a token
- **Callout description:** var(--content/primary, #1e1e1e)
- **Lesson number:** #aeaeae (gray) — not a token
- **Lesson title:** var(--content/white, #eee)
- **Lesson description:** var(--content/white, #eee)
- **Number title:** var(--content/primary, #1e1e1e)
- **Badge number:** var(--content/white, #f0f0f0)

### Borders & Accents
- **Risk border:** 1px solid var(--content/tertiary, #adadad)
- **Callout left border:** 3px solid var(--content/primary, #1e1e1e)
- **Badge background:** var(--content/primary, #1e1e1e)

---

## 15. Anomalies & Non-Standard Values

### Values NOT Using Design Tokens

1. **Callout Card Title Color:** `black` instead of a token variable
2. **Lesson Card Number Color:** `#aeaeae` (hardcoded gray) instead of a token
3. **Lesson Card Background:** No border-radius defined
4. **Lesson Card Padding:** No padding defined (content flush with edges)
5. **Number Card Gap:** `8px` hardcoded instead of `var(--padding/x2, 8px)`
6. **Number Card Badge Padding:** `10px` hardcoded instead of token
7. **Lesson Card Container:** No background-color token variable (direct hex)

### Potential Issues

- **Lesson Card Styling:** Inconsistent with token system (direct hex values, no padding)
- **Number Card Gap:** Hardcoded instead of tokenized
- **Callout Title:** Uses `black` instead of semantic token
- **Lesson Number:** Uses `#aeaeae` instead of semantic token

---

## 16. Summary

### Variants: 5
- Insight Card (394.67 × 104)
- Risk Card (520 × 144)
- Callout Card (800 × 148)
- Lesson Card (700 × 90)
- Number Card (394.67 × 160)

### Typography Tokens: 7
- All from Onest family (400-700 weights)
- Sizes range from 14px to 24px

### Color Tokens: 6
- 2 background colors
- 4 content colors (primary, secondary, tertiary, white)

### Spacing Tokens: 6
- 4px to 56px scale

### Radius Tokens: 2
- 16px and 20px

### Icon Instances: 1
- Warning / Circle_Warning (Risk Card only)

### States Defined: 0
- No hover, focus, active, or disabled states

### Constraints: All fixed (no responsive variants in Figma)

---

**End of Specification Document**
