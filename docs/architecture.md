# Portfolio Architecture

AI-first workflow:

**Figma → Design System → React → Storybook → Production**

This document follows the principles defined in:

- docs/ai-philosophy.md

## 1. Project Goal

This project is a personal product design portfolio.

The goal is not only to build a website, but to demonstrate:

-   Product Design expertise
-   Design System maturity
-   Frontend engineering understanding
-   AI-assisted product development workflow

The portfolio should act as proof of the ability to work at the
intersection of Design, Engineering and AI.

------------------------------------------------------------------------

## 2. Tech Stack

### Core

-   React
-   TypeScript
-   Vite
-   React Router
-   Storybook
-   CSS Modules

### Content

-   Static-first architecture
-   Content separated from UI
-   Case studies stored as structured content

### Deployment

-   Vercel
-   Netlify
-   Cloudflare Pages

------------------------------------------------------------------------

## 3. Architecture Principles

### Avoid over-engineering

This project does not require:

-   Full Feature-Sliced Design
-   Backend API
-   Authentication
-   Database
-   CMS infrastructure

Keep the architecture lightweight and understandable for a single
developer.

### Clear boundaries

Layers:

1.  Design System
2.  Application
3.  Content
4.  Shared Utilities

Data flow:

``` text
Content
   ↓
Pages
   ↓
CaseRenderer
   ↓
Sections
   ↓
UI Components
```

Components never import content directly. Data is passed through props.

------------------------------------------------------------------------

## 4. Folder Structure

``` text
src/
├── app/
│   ├── router/
│   ├── pages/
│   └── layouts/
├── shared/
│   ├── ui/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── tokens/
│   ├── hooks/
│   └── utils/
├── entities/
│   └── case/
├── content/
│   └── cases/
│       ├── acquiring/
│       └── chat/
└── lib/
    └── content-parser/
```

------------------------------------------------------------------------

## 5. Component Architecture

### Atoms

Examples:

-   Button
-   Tag
-   Icon
-   Heading
-   Text

Rules:

-   No business logic
-   No content awareness
-   Consume semantic tokens only

### Molecules

Examples:

-   Card
-   NavigationItem
-   FormField
-   MetadataBlock

Rules:

-   Reusable
-   Content agnostic
-   No case study knowledge

### Organisms / Sections

Examples:

-   HeroSection
-   MetricsSection
-   ProcessSection
-   GallerySection
-   TimelineSection

Rules:

-   Receive data through props
-   Reusable across case studies
-   Never import content directly

------------------------------------------------------------------------

## 6. Case Study Architecture

Case studies are content-driven.

``` text
content/cases/chat/case.json
```

Rendering pipeline:

``` text
Case Data
   ↓
CaseRenderer
   ↓
Section Components
   ↓
UI Components
```

Adding a new case study should not require architecture changes.

------------------------------------------------------------------------

## 7. Design System Boundary

The Design System owns:

-   Tokens
-   UI Components
-   Component APIs
-   Variants
-   States
-   Storybook

The Application owns:

-   Routing
-   Pages
-   Content composition

The Design System must never depend on application content.

------------------------------------------------------------------------

## 8. Design Tokens

Source of truth:

``` text
shared/tokens/
```

Two layers:

-   Primitive tokens
-   Semantic tokens

Components consume semantic tokens only.

------------------------------------------------------------------------

## 9. Storybook

Storybook is a first-class project artifact.

Purpose:

-   Documentation
-   Design / development alignment
-   Visual QA
-   Portfolio showcase

Component structure:

``` text
Button/
├── Button.tsx
├── Button.module.css
└── Button.stories.tsx
```

------------------------------------------------------------------------

## 10. Figma → React Pipeline

1.  Audit Variables, Styles, Components and Variants.
2.  Migrate typography Styles to Variables if needed.
3.  Export Variables.
4.  Transform tokens.
5.  Define component API manually.
6.  Use AI for scaffolding and documentation.
7.  Review everything manually.

------------------------------------------------------------------------

## 11. AI Collaboration Rules

AI acts as:

-   Senior Frontend Engineer
-   Design System Engineer
-   Code Reviewer

Before writing code AI must:

1.  Understand existing architecture.
2.  Explain the solution.
3.  Define component responsibility.
4.  Define props/API.
5.  Then implement.

AI should not:

-   create duplicate components;
-   bypass design tokens;
-   change architecture without discussion;
-   introduce unnecessary dependencies.

------------------------------------------------------------------------

## 12. First Milestone

1.  Finalize tokens.
2.  Build:
    -   Button
    -   Heading
    -   Text
    -   Tag
    -   Icon
3.  Add Storybook stories.
4.  Validate the Figma → React pipeline.
5.  Scale to molecules, sections and case studies.

------------------------------------------------------------------------

## 13. Architecture Decision

The project intentionally uses a lightweight architecture.

The goal is not enterprise complexity.

The goal is to demonstrate how a Product Designer can build a
production-ready design system using AI-assisted workflows.


# Development Environment

Operating System:
Windows 11

Shell:
PowerShell 7

Project location:
C:\Users\mp3ps\Documents\Portfolio-ai

Stack:
Vite
React
TypeScript
CSS Modules

When using shell commands:

- Always generate PowerShell commands.
- Never use Linux commands (find, grep, sed, awk, head, tree -L, etc.).
- Use Get-ChildItem, Select-String and PowerShell equivalents.