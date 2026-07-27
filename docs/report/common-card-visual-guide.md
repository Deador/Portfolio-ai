# CommonCard — Visual Design Guide

**Purpose:** Complete visual specification of all CommonCard variants with exact measurements and color values

---

## Variant Comparison Matrix

```
╔═══════════════╦═════════╦════════╦═══════════╦═══════════╦═══════════╗
║  Property     ║ Insight ║  Risk  ║  Callout  ║  Lesson   ║  Number   ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Dimensions   ║ 394.67  ║  520   ║   800     ║   700     ║  394.67   ║
║ (px)         ║ × 104   ║ × 144  ║  × 148    ║  × 90     ║  × 160    ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Background   ║ white   ║ white  ║  white    ║   dark    ║  white    ║
║              ║ #fff    ║ #fff   ║   #fff    ║  #1f1f1f  ║  #fff     ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Radius       ║  16px   ║  20px  ║   20px    ║   none    ║  16px     ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Border       ║ none    ║ 1px    ║  3px L    ║  none     ║  none     ║
║              ║         ║ solid  ║  solid    ║           ║           ║
║              ║         ║ #ada   ║  #1e1e1e  ║           ║           ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Padding      ║  24px   ║  24px  ║   24px    ║   none    ║  32/56px  ║
║              ║ all     ║ all    ║   all     ║           ║ horiz/vert║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Gap          ║  8px    ║  16px  ║   16px    ║  12px     ║  8px      ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Title Font   ║ Text/S  ║ Text/  ║Text/L_str ║Title/H4   ║ Text/S    ║
║              ║ 16px    ║ M_str  ║  20px     ║ 20px      ║ 16px      ║
║              ║ 400     ║ 700    ║  700      ║ 500       ║ 400       ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Desc Font    ║ Text/M  ║ Text/M ║ Text/M    ║ Text/M    ║ none      ║
║              ║ 16px    ║ 16px   ║ 16px      ║ 16px      ║           ║
║              ║ 400     ║ 400    ║ 400       ║ 400       ║           ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Title Color  ║ primary ║primary ║ black     ║ white     ║ primary   ║
║              ║ #1e1e   ║ #1e1e  ║ #000      ║ #f0f0f0   ║ #1e1e     ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Desc Color   ║secondary║primary ║ primary   ║ white     ║ N/A       ║
║              ║ #7878   ║ #1e1e  ║ #1e1e     ║ #f0f0f0   ║           ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Icon?        ║  no     ║  yes   ║    no     ║   no      ║  no       ║
║              ║         ║ 24×24  ║           ║           ║           ║
╠═══════════════╬═════════╬════════╬═══════════╬═══════════╬═══════════╣
║ Special      ║  none   ║ warn   ║ left      ║ dark bg   ║ absolute  ║
║              ║         ║ icon   ║ border    ║ 2-line    ║ badge     ║
║              ║         ║        ║ accent    ║ desc      ║ top: -28px║
╚═══════════════╩═════════╩════════╩═══════════╩═══════════╩═══════════╝
```

---

## 1. INSIGHT CARD

**Size:** 394.67px wide × 104px tall

**Structure:**
```
┌─────────────────────────────────────┐
│ Padding: 24px all sides             │
│                                     │
│  Title (Text/S, 16px, primary)    │
│  ┌─────────────────────────────┐   │
│  │ {title}                     │   │
│  └─────────────────────────────┘   │
│                                     │
│  Gap: 8px                           │
│                                     │
│  Description (Text/M, 16px, secondary)  │
│  ┌─────────────────────────────┐   │
│  │ {description}               │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘

Radius: 16px all corners
Background: white (#ffffff)
Border: none
```

**Content Defaults:**
- Title: "Title"
- Description: "Description"

**Colors:**
- Background: #ffffff (white)
- Title: #1e1e1e (primary)
- Description: #787878 (secondary)

**Usage:** Information, highlights, summaries

---

## 2. RISK CARD

**Size:** 520px wide × 144px tall

**Structure:**
```
┌────────────────────────────────────────┐
│ Border: 1px solid #adadad             │
│ Radius: 20px all corners              │
│ Padding: 24px all sides               │
│                                        │
│  Icon Group:                          │
│  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐      │
│  │ Warning Icon (24×24)      │      │
│  │ [⚠]                       │      │
│  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘      │
│                                        │
│  Gap: 16px                            │
│                                        │
│  Content:                             │
│  ┌────────────────────────────────┐   │
│  │ Title (Text/M_strong, 700)     │   │
│  │ {title}                        │   │
│  │                                │   │
│  │ Gap: 12px                      │   │
│  │                                │   │
│  │ Description (Text/M, 400)      │   │
│  │ {description}                  │   │
│  └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘
```

**Content Defaults:**
- Title: "Title"
- Description: "Description"

**Colors:**
- Background: #ffffff (white)
- Border: #adadad (tertiary)
- Title: #1e1e1e (primary)
- Description: #1e1e1e (primary)
- Icon: inherited (black)

**Icon Details:**
- Component: Warning / Circle_Warning
- Size: 24×24px
- Type: SVG (3 vectors)
- SVG Assets:
  - Vector 1: circle outline
  - Vector 2: inner element
  - Vector 3: rotated decoration

**Usage:** Warnings, risks, important alerts

---

## 3. CALLOUT CARD

**Size:** 800px wide × 148px tall

**Structure:**
```
┌──────────────────────────────────────────────┐
│ │ ← Border-left: 3px solid #1e1e1e          │
│ │ Radius: 20px all corners                  │
│ │ Padding: 24px all sides                   │
│ │                                            │
│ │  Title (Text/L_strong, 20px, 700)        │
│ │  ┌────────────────────────────────────┐   │
│ │  │ {title}                            │   │
│ │  └────────────────────────────────────┘   │
│ │                                            │
│ │  Gap: 16px                                │
│ │                                            │
│ │  Content:                                 │
│ │  ┌────────────────────────────────────┐   │
│ │  │ Description (Text/M, 400)          │   │
│ │  │ {description}                      │   │
│ │  │                                    │   │
│ │  │ Gap: 12px                          │   │
│ │  │                                    │   │
│ │  │ Additional Line (Text/M, 400)      │   │
│ │  │ "Text" (fixed)                     │   │
│ │  └────────────────────────────────────┘   │
│ │                                            │
└──────────────────────────────────────────────┘
```

**Content Defaults:**
- Title: "Title"
- Description: "Description"
- Description Line 2: "Text" (fixed, non-overridable)

**Colors:**
- Background: #ffffff (white)
- Left Border: #1e1e1e (primary)
- Title: #000000 (black, not a token)
- Description: #1e1e1e (primary)

**Special Feature:**
- 3px left border accent (visual highlight)
- Two-line description layout
- Widest variant (800px)

**Usage:** Important notes, tips, callouts, critical information

---

## 4. LESSON CARD

**Size:** 700px wide × 90px tall

**Structure:**
```
┌──────────────────────────────────────┐
│ Background: dark (#1f1f1f)          │
│ No border/radius defined            │
│ No padding defined                  │
│ Gap: 12px                           │
│                                      │
│  Number (Text/XS, 14px, 400)       │
│  ┌──────────────────────────────┐   │
│  │ "01" (fixed)                │   │
│  │ Color: #aeaeae (gray)        │   │
│  └──────────────────────────────┘   │
│                                      │
│  Title (Title/H4, 20px, 500, white) │
│  ┌──────────────────────────────┐   │
│  │ {title}                      │   │
│  │ Color: #f0f0f0 (white)       │   │
│  └──────────────────────────────┘   │
│                                      │
│  Description (Text/M, 16px, 400)   │
│  ┌──────────────────────────────┐   │
│  │ {description}                │   │
│  │ Color: #f0f0f0 (white)       │   │
│  └──────────────────────────────┘   │
│                                      │
└──────────────────────────────────────┘
```

**Content Defaults:**
- Number: "01" (fixed, non-overridable)
- Title: "Title"
- Description: "Description"

**Colors:**
- Background: #1f1f1f (dark)
- Number: #aeaeae (gray, not a token)
- Title: #f0f0f0 (white)
- Description: #f0f0f0 (white)

**Special Features:**
- Dark background (high contrast with white text)
- Step numbering ("01" suggests step 1)
- No visible padding/border-radius
- Tallest variant relative to width (7.78:1)

**Usage:** Lesson steps, numbered items, dark-themed content

---

## 5. NUMBER CARD

**Size:** 394.67px wide × 160px tall

**Structure:**
```
┌─────────────────────────────────────────┐
│                                         │
│           ╔═══════════════╗            │
│           ║   [Badge]     ║            │ ← Positioned top: -28px
│           ║   ┌─────────┐ ║            │   absolute: top-center
│           ║   │  56×56  │ ║            │   (extends above card)
│           ║   │ bg:dark │ ║            │
│           ║   │ radius  │ ║            │
│           ║   │  16px   │ ║            │
│           ║   │  "1"    │ ║            │
│           ║   │ Title/  │ ║            │
│           ║   │ H3 24px │ ║            │
│           ║   │ white   │ ║            │
│           ║   └─────────┘ ║            │
│           ╚═══════════════╝            │
│                                         │
│  Padding-top: 56px (var --x14)        │
│                                         │
│  Title (Text/S, 16px, centered)       │
│  ┌─────────────────────────────────┐   │
│  │ {title}                         │   │
│  │ Color: #1e1e1e (primary)        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Gap: 8px                              │
│                                         │
│  Padding-bottom: 56px (var --x14)     │
│  Padding-horizontal: 32px (var --x8)  │
│                                         │
└─────────────────────────────────────────┘

Radius: 16px all corners
Background: white (#ffffff)
Height: 160px (fixed)
```

**Content Defaults:**
- Title: "Title"
- Badge Number: "1"

**Colors:**
- Background: #ffffff (white)
- Title: #1e1e1e (primary)
- Badge Background: #1e1e1e (primary)
- Badge Number: #f0f0f0 (white)

**Badge Details:**
- Position: absolute
- Top: -28px (half badge size = -28px)
- Left: 50% + transform: translateX(-50%) (centered)
- Size: 56×56px
- Padding: 10px (hardcoded)
- Border Radius: 16px
- Content: Number (Title/H3, 24px, medium weight, white)

**Special Features:**
- Absolute-positioned badge extending above card
- Requires parent position: relative
- Padding-top > 28px to avoid badge overlap (✓ 56px sufficient)
- Badge creates visual hierarchy

**Usage:** Metrics, statistics, key numbers, achievements

---

## Color Palette Summary

### Background Colors
```
┌─────────────────────────────────────┐
│ White Background: #ffffff           │ (Insight, Risk, Callout, Number)
│ ████████████████████████████████████│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Dark Background: #1f1f1f            │ (Lesson)
│ ██████████████████                  │
└─────────────────────────────────────┘
```

### Text Colors
```
┌─────────────────────────────────────┐
│ Primary (dark): #1e1e1e             │ (titles, main text)
│ ██████████████████                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Secondary (gray): #787878           │ (description text)
│ ████████████                        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Tertiary (light gray): #adadad      │ (borders)
│ ███████████████                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ White: #f0f0f0                      │ (text on dark)
│ ████████████████████████████████████│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Gray (lesson number): #aeaeae       │ (not a token)
│ ████████████████                    │
└─────────────────────────────────────┘
```

### Border Colors
```
Risk Card Border: #adadad (tertiary) — 1px solid

Callout Card Left Border: #1e1e1e (primary) — 3px solid
```

---

## Typography Specification

### All Fonts Use "Onest" Family

```
Text/S
├─ Size: 16px
├─ Weight: 400 (Regular)
├─ Line Height: 24px
└─ Usage: Insight Card title, Number Card title

Text/M
├─ Size: 16px
├─ Weight: 400 (Regular)
├─ Line Height: 1.4
└─ Usage: Descriptions in all cards

Text/M_strong
├─ Size: 16px
├─ Weight: 700 (Bold)
├─ Line Height: 1.4
└─ Usage: Risk Card title

Text/L_strong
├─ Size: 20px
├─ Weight: 700 (Bold)
├─ Line Height: 1.4
└─ Usage: Callout Card title

Text/XS
├─ Size: 14px
├─ Weight: 400 (Regular)
├─ Line Height: 16px
└─ Usage: Lesson Card number ("01")

Title/H4
├─ Size: 20px
├─ Weight: 500 (Medium)
├─ Line Height: 1.4
└─ Usage: Lesson Card title

Title/H3
├─ Size: 24px
├─ Weight: 500 (Medium)
├─ Line Height: 1.3
└─ Usage: Number Card badge
```

---

## Spacing Grid

### Spacing Values Used

```
8px  (var --x2)  → Insight gap, Risk icon gap
12px (var --x3)  → Risk content gap, Callout desc gap, Lesson gap
16px (var --x4)  → Risk gap, Callout gap
24px (var --x6)  → All card padding (except Number & Lesson)
32px (var --x8)  → Number padding
56px (var --x14) → Number vertical padding
```

### Radius Values Used

```
16px (var --radius-16)  → Insight Card, Number Card
20px (var --radius-20)  → Risk Card, Callout Card
```

---

## Responsive Notes

**All variants are FIXED dimensions in Figma.** No responsive behavior is defined:
- Insight: 394.67px × 104px (fixed)
- Risk: 520px × 144px (fixed)
- Callout: 800px × 148px (fixed)
- Lesson: 700px × 90px (fixed)
- Number: 394.67px × 160px (fixed)

---

## Visual Appearance Summary

```
┌─────────────────────────────────────────────────────────┐
│ VISUAL APPEARANCE BY VARIANT                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Insight Card: Clean, minimal, light                      │
│   • White background, subtle shadows                     │
│   • Two-tier text hierarchy                             │
│   • Compact (104px height)                              │
│                                                          │
│ Risk Card: Alert-focused, accented                       │
│   • Border adds containment                             │
│   • Icon creates visual weight                          │
│   • Bold title for emphasis                             │
│   • Taller (144px height)                               │
│                                                          │
│ Callout Card: Emphasis through accent                    │
│   • Left border draws attention                         │
│   • Large title (20px bold)                             │
│   • Widest variant (800px)                              │
│   • Two-line description layout                         │
│                                                          │
│ Lesson Card: Dark, step-focused                          │
│   • Dark background (#1f1f1f)                           │
│   • White text for contrast                             │
│   • Numbered structure ("01")                           │
│   • Tallest aspect ratio                                │
│                                                          │
│ Number Card: Highlight with badge                        │
│   • Absolute badge extends upward                       │
│   • Badge creates visual focus                          │
│   • Center-aligned content                              │
│   • Tallest absolute height (160px)                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## End of Visual Guide
