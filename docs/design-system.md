# Design System

AI-first workflow:

**Figma → Design System → React → Storybook → Production**

---

# 1. Purpose

The Design System is the single source of truth for all visual UI.

Its goals are:

- consistency
- scalability
- reusability
- accessibility
- predictable component APIs
- seamless Figma → React translation

The Design System must evolve without requiring architectural changes.

---

# 2. Foundations

## Colors

Color tokens are semantic.

Collections:

- Content
- Background

Content colors:

- Primary
- Secondary
- Tertiary
- White
- Accent

Background colors:

- White
- Primary
- Secondary
- Dark

Rules:

- Components consume semantic colors only.
- Hardcoded color values are forbidden.
- Components never reference primitive values directly.

---

## Spacing

Spacing follows a 4px scale.

Available values:

4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 72, 80

Rules:

- Use spacing tokens only.
- Avoid arbitrary spacing values.
- Prefer consistent rhythm across all layouts.

---

## Radius

Available values:
4
8
16
20
24
32

Rules:

- Radius is always token-based.
- Components never define their own border radius.

---

## Typography

Typography is organized into two groups.

### Titles

- H RESULT
- H1 STRONG
- H1
- H3
- H4

### Text

- L STRONG
- L
- M STRONG
- M
- S MEDIUM
- S
- XS

Current state:

Typography is still implemented using Figma Styles.

Future state:

Typography should be migrated to Variables to unify the design token pipeline.

---

# 3. Token Philosophy

The token hierarchy is:

Primitive

↓

Semantic

↓

Components

Rules:

- Components consume semantic tokens only.
- Primitive tokens exist only as implementation details.
- Semantic naming describes purpose, not appearance.
- Tokens are the only source of visual values.

---

# 4. Component Philosophy

The Design System follows Atomic Design.

Hierarchy:

Atoms

↓

Text Components

↓

Cards

↓

Sections

↓

Pages

Rules:

- Every component has a single responsibility.
- Components solve one problem only.
- Prefer composition over duplication.
- Prefer reusable APIs over specialized components.
- Components should remain independent from application content.

---

# 5. Atomic Design

The Design System follows a four-layer Atomic Design architecture.

Hierarchy:

```
Atoms
    ↓
Molecules
    ↓
Organisms
    ↓
Pages
```

Each layer has a single responsibility and may only compose components from lower layers.

---

## Atoms

Atoms are the smallest reusable UI building blocks.

Current atoms:

- Button
- Tag
- Icon
- Paragraph
- Quote Element
- Citate
- Timeline Step

Rules:

- No business logic.
- No content awareness.
- Fully reusable.
- Consume semantic tokens only.
- Never import other UI components.

---

## Molecules

Molecules combine multiple atoms into reusable interface patterns.

Current molecules:

- Title
- Row Info Project
- Results
- Common Card
- Metric Card
- Quote Card
- Persona Card

### Common Card

Props:

- type (5 variants)
- title
- description

### Metric Card

Props:

- type (2 variants)
- title
- description

### Persona Card

Props:

- icon (Instance Swap)
- title
- description

Rules:

- Compose atoms only.
- Remain content-agnostic.
- Expose reusable APIs.
- Prefer variants over duplicate components.
- Never import application content.

---

## Organisms

Organisms compose molecules and atoms into complete interface blocks.

Current organisms:

### Global

- Header

### Case Study

- Hero Section
- Problem Section
- Goals Section
- Persona Section
- Feature Section
- Context Section
- Decision Section
- Retrospective Section
- Results Section
- Reflection Section

Additional compositions:

Context Section contains:

- Content Row

Retrospective Section contains:

- Common Card

Rules:

- Receive typed props.
- Never fetch or import content directly.
- Remain reusable across multiple pages and case studies.
- Compose only molecules and atoms.

---

## Pages

Pages compose organisms together with structured content.

Responsibilities:

- Load case study content.
- Pass typed props to organisms.
- Manage page composition.
- Never contain reusable UI logic.

Pages are application-level constructs and are not part of the Design System.

---

# 6. Component API Rules

React components should mirror Figma Component Properties.

Rules:

- Variants map to React props.
- Boolean Properties map to boolean props.
- Instance Swap maps to children or dedicated props.
- Avoid creating separate components for visual variations.

Example:

Instead of:

ButtonPrimary

ButtonSecondary

Use:

<Button variant="filled" />

<Button variant="link" />

---

# 7. Naming Rules

Names describe purpose.

Not


appearance.

Good:

Heading

Tag

MetricCard

HeroSection

Bad:

BlueButton

RoundedCard

BigTitle

Rules:

- Avoid visual naming.
- Avoid duplicated component names.
- Prefer semantic naming.

---

# 8. Accessibility

Every component should support:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient color contrast

Accessibility is part of the component contract.

---

# 9. Storybook Rules

Every reusable component should have a Storybook story.

Stories should demonstrate:

- all variants
- all states
- edge cases
- controls
- accessibility

Stories are colocated with components.

Example:

Button/

├── Button.tsx

├── Button.module.css

└── Button.stories.tsx

---

# 10. AI Collaboration Rules

Before creating a component AI must:

1. Search existing components.
2. Reuse whenever possible.
3. Extend existing APIs instead of creating duplicates.
4. Explain the proposed API.
5. Only then implement.

AI must never:

- duplicate existing components;
- hardcode visual values;
- bypass design tokens;
- invent inconsistent naming;
- violate Atomic Design boundaries.

---

# 11. Figma → React Mapping

The Design System follows a direct mapping between Figma and React.

Figma Variables

↓

Design Tokens

↓

React Components

↓

Storybook

↓

Production

Component Properties should translate directly into React props.

The goal is to minimize manual translation between design and implementation.

---

# 12. Future Evolution

The Design System should be capable of supporting:

- additional case studies
- new sections
- new themes
- new component variants

without architectural changes.

Scalability is achieved through composition rather than increasing complexity.