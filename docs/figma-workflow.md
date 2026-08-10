# Figma Workflow

## Purpose

This document defines how AI agents work with the Figma Design System.

The goal is to minimize manual work while keeping the Design System clean, scalable and production-ready.

The Design System is the single source of truth for React components.

---

# Before Starting

Before starting any task, read:

1. docs/README.md
2. docs/ai-philosophy.md
3. docs/architecture.md
4. docs/design-system.md

If working on the Design System also read:

- docs/design-system-engineer.md

---

# General Principles

The Design System evolves incrementally.

Never redesign everything at once.

Prefer small, reviewable improvements.

Every change should reduce future maintenance.

---

# Source of Truth

Figma is the source of truth.

React is an implementation.

Storybook is documentation.

Never implement something in code that does not exist in the Design System.

---

# Working Process

Every task follows the same workflow.

## 1. Understand

Understand the user's request.

If something is unclear, ask.

Never guess.

---

## 2. Audit

Inspect the existing Design System.

Look for:

- duplicate components
- duplicate variables
- missing variants
- missing component properties
- missing Auto Layout
- inconsistent naming
- inconsistent spacing
- inconsistent typography
- unnecessary complexity

Do not make changes yet.

---

## 3. Report

Summarize findings.

Separate them into:

### Problems

Current issues.

### Recommendations

Suggested improvements.

### Risks

Possible side effects.

---

## 4. Approval

If changes affect architecture or multiple components:

Wait for user approval.

Small mechanical refactoring may proceed without approval.

---

## 5. Execute

Apply changes.

Keep them as small as possible.

Avoid changing unrelated components.

---

## 6. Validate

Verify:

✓ Variables

✓ Variants

✓ Component Properties

✓ Auto Layout

✓ Naming

✓ Constraints

✓ Accessibility

✓ Reusability

---

## 7. Summarize

Describe:

- what changed
- why it changed
- what remains

---

# Preferred Order of Work

Always improve the Design System in this order:

1. Variables
2. Typography
3. Tokens
4. Atoms
5. Molecules
6. Organisms
7. Case Study Sections
8. Documentation
9. React implementation

Never skip layers.

---

# Variables

Prefer semantic Variables.

Avoid hardcoded values.

Keep naming consistent.

Do not duplicate Variables.

Typography should eventually use Variables instead of Styles.

---

# Components

Prefer improving existing components.

Avoid creating new components unless necessary.

If a component can be solved by:

- Variant

or

- Component Property

prefer that over duplication.

---

# Naming

Names must be:

- descriptive
- consistent
- scalable

Avoid:

Button New

Card2

Frame 154

Rectangle 23

---

# Variants

Variants should represent visual states.

Do not create separate components for visual differences.

Prefer:

Size

State

Type

Appearance

Boolean properties

instead of duplicated components.

---

# Component Properties

Prefer configurable components.

Use:

- Text properties
- Boolean properties
- Instance Swap
- Variant properties

Avoid duplicated instances.

---

# Auto Layout

All production components should use Auto Layout.

Avoid manual positioning.

Spacing should come from Variables whenever possible.

---

# Sections

Sections should be built from existing components.

Do not duplicate layouts.

Extract reusable patterns when they appear multiple times.

---

# AI Responsibilities

AI performs:

- audits
- refactoring
- variable migration
- variant creation
- component cleanup
- documentation
- consistency improvements

AI does not perform:

- UX redesign
- visual redesign
- architecture redesign

unless explicitly requested.

---

# Image Export (Case Study Assets)

This section defines how AI agents export real images from Figma for case study content.

The goal is a deterministic, repeatable export that never grabs a slot, a group, or a placeholder by mistake.

## Core rule

A Figma slot (`[SLOT]`) is an empty container.

The real image lives inside the slot, in a child node (`RECTANGLE`, `ELLIPSE`, `FRAME`, etc.) whose fill contains `{"type":"IMAGE","imageRef":"..."}`.

Always export that inner node — never the slot.

## The 7 rules

### 1. Find by the IMAGE fill

The real image = a descendant of the slot whose `fills` contain `type: IMAGE` with a non-empty `imageRef`.

- Ignore `IMAGE-SVG` nodes — they carry a `componentId` and are vector icons, not raster assets. If the requested asset is an icon, follow the Icon Export section below.
- Ignore placeholders — hex fills like `#EAECEE`, `#D9D9D9` without an `imageRef`.
- If a slot contains several images, export each one and match it by its node name.

### 2. Canvas is the source of truth

Always export from the **case canvas** (e.g. `1799:8278` "Система обработки заявок"), where slots are filled with real content.

Do not export case content from the Design System library page (e.g. `1799:6225` "Sections") — its slots contain demo placeholders.

### 3. Freshness of imageRef

Re-fetch the node immediately before every export to get the current `imageRef`.

`imageRef` changes whenever the image is updated in Figma.

Never cache an `imageRef` between sessions or between exports.

### 4. `figmaNode` points at the image node

In `case.json`, the `figmaNode` of an image reference must be the id of the **image node itself** (the one carrying the `imageRef`), not the id of the slot or a wrapping group.

### 5. Cropping

If the node has `needsCropping: true`, pass the `cropTransform` and `filenameSuffix` exactly as reported.

Otherwise the exported image will contain unwanted padding.

### 6. File naming

File name = the Figma node name (e.g. `hero-main`, `task`, `metrics`) or the `src` key from `case.json`.

Format is always `.png` (see case study architecture, §4.2).

### 7. Verification

After finding the node, verify it really is an image: it has an `imageRef`, and the slot is not a placeholder.

If no image exists, record it in the report as "no image" — never export a placeholder.

## Export formula

1. Request the case canvas node.
2. For each section, locate the slot and find the descendant with `type: IMAGE` + `imageRef` inside it.
3. Use the fresh `imageRef` and crop parameters from the same request.
4. Download the node into the target folder, named after the node.
5. Reconcile with `case.json`: update `figmaNode` to the image node id.

---

# Icon Export (Case Study Content Icons)

This section defines how AI agents export content icons from the **case canvas** for JSON-driven case studies.

It mirrors the Image Export rules, with one key difference: icons are **vector** assets (`componentId`), images are **raster** assets (`imageRef`).

## Content icons vs DS-chrome

- **Content icons** (selected for content: e.g. persona icons `Folder`, `User_alt_duotone_line`) are **case-specific** assets and live in `src/content/cases/<slug>/icons/*.svg`.
- **DS-chrome icons** (e.g. `Warning` on risk cards, header logo) are **never serialized into JSON** — they stay React components in the Design System.

## Core rule

A content icon = an `IMAGE-SVG` / INSTANCE node with a `componentId`, placed inside a slot (e.g. the PersonaCard `left-icon` instance swap).

Always export that vector node — never the slot, never a wrapping group.

## The 7 rules

### 1. Find by componentId (vector), not by imageRef

Icons carry a `componentId` and **no** raster `imageRef` (the opposite of images — see Image Export, rule 1).

- Search the case canvas for `IMAGE-SVG` / INSTANCE nodes inside slots.
- Ignore raster-filled descendants — those are images, not icons.
- If a slot swaps several icons, export each one and match it by its node name.

### 2. Canvas is the source of truth

Always export icons from the **case canvas** (e.g. `1799:8278`), where icons are actually placed into persona / feature slots.

Do not export icons from the library `icons` page or from the Design System library sections — those contain demo swaps, and DS-chrome is a React component, not a content asset.

### 3. Freshness

Re-fetch the node immediately before every export.

Icons are swapped via instance swap, so never cache a node id or name between sessions or between exports.

### 4. `figmaNode` points at the icon node

In `case.json`, the `figmaNode` of an icon reference must be the id of the **icon instance node on the case canvas** — not the id of the slot or a wrapping group.

### 5. No cropping

Icons are exported as full vector nodes. There is no `cropTransform` / `filenameSuffix` for SVG.

### 6. File naming

File name = the Figma node name (e.g. `User_alt_duotone_line.svg`, `Folder.svg`).

- Sanitize only invalid filename characters (spaces, `/` → `-`).
- Format is always `.svg`.
- Semantics belong in `alt`, never in the file name.

### 7. Verification

After finding the node, verify it is really a vector icon: it has a `componentId` and its fill is not a raster `IMAGE` with `imageRef`.

If the slot is empty or the node is DS-chrome, do not export it as content — record it in the report instead.

## JSON model

`type: 'icon'` extends the asset discriminated union (§3.3 of the case study architecture). `schemaVersion` stays **2** — the change is additive.

```json
{
  "type": "icon",
  "src": "icons/User_alt_duotone_line.svg",
  "figmaNode": "I1816:6289;1799:7386;1798:4262",
  "alt": "Менеджер"
}
```

- `figmaNode` is **required** for icons.
- `alt` defaults to `""` — icons are decorative and stay unavailable to screen readers. Set `alt` explicitly in JSON **only** if the icon carries meaning. Never use `src` as an `alt` fallback (unlike images).

## Rendering contract

- Icons render through the existing asset slot with `object-fit: contain` (for PersonaCard: container 72×72, icon 56×56).
- Do **not** bake padding into the SVG — slot geometry is controlled by React/CSS (the `AssetResolver` class), not by the file content.

## Export formula

1. Request the case canvas node.
2. For each slot, locate the `IMAGE-SVG` / INSTANCE child with `componentId`.
3. Download the node into `src/content/cases/<slug>/icons/`, named after the node.
4. Reconcile with `case.json`: add `{ "type": "icon", "src": "icons/<Name>.svg", "figmaNode": "<instance id>" }`; `alt` only when meaningful.

## Deduplication across cases

Icons are **case-specific** for now: the same Figma node name may appear in several cases, and each case keeps its own copy in `icons/`.

When a second case reuses an identical icon (same deterministic node name), promote the file to a shared location — a separate decision, not for the current case.

---

# Definition of Done

A task is complete when:

✓ No unnecessary duplication exists.

✓ Naming is consistent.

✓ Variables are used.

✓ Components are reusable.

✓ Architecture remains clean.

✓ The Design System is easier to maintain than before.

Every completed task should improve the long-term quality of the Design System.