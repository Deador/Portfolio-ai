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
│   │   └── Home/
│   │       ├── data.ts               # типизированный контент главной (Figma)
│   │       ├── hooks/
│   │       ├── sections/             # HomeHero, HomeExperience, HomeCases,
│   │       │                         # HomeSkills, HomeScrollTop
│   │       └── HomePage.tsx          # композиция секций (default export)
│   └── layouts/
├── shared/
│   ├── ui/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── assets/
│   ├── tokens/
│   ├── hooks/
│   └── utils/
├── entities/
│   └── case/
├── content/
│   ├── cases/
│   │   ├── acquiring/
│   │   └── chat/
│   └── home/
│       └── images/                   # showreel, GIF, скрины кейсов, декор
└── lib/
    └── content-parser/
```

------------------------------------------------------------------------

## 4.1 Static Assets (`public/`)

Files in `public/` are copied verbatim into the root of `dist/` at build time (Vite convention) —
served directly by the hosting at `https://trifonovprod.ru/<filename>`, with no processing, no
bundling, no content hashing. Use this folder only for files that need a **stable, predictable URL**
that must not change between builds — everything else (images actually used by components, icons,
etc.) belongs under `src/content/` or `src/shared/assets/`, where Vite can hash and optimize it.

Current contents:

``` text
public/
├── CNAME                  # кастомный домен для GitHub Pages: trifonovprod.ru
├── favicon.svg             # SVG-иконка сайта (растровые favicon.ico/apple-touch-icon.png — open item)
├── og-acquiring.png        # Open Graph превью кейса acquiring (стабильный URL для соцсетей/мессенджеров)
├── og-chat.png             # Open Graph превью кейса chat
└── trifonov-cv.pdf         # резюме PDF, https://trifonovprod.ru/trifonov-cv.pdf
```

### Резюме (`trifonov-cv.pdf`)

- **URL**: `https://trifonovprod.ru/trifonov-cv.pdf` (корень домена — `vite.config.ts` использует
  `base: '/'`, сайт раздаётся не из подпапки).
- **Ссылка на сайте**: CTA «Резюме» в шапке (`Header`, собирается в `src/app/layouts/RootLayout.tsx`,
  пропс `ctaHref`), видна на всех страницах. Обычная `<a href target="_blank" rel="noopener
  noreferrer">` — не `react-router-dom`'s `<Link>`, иначе клиентский роутер перехватил бы клик и не
  нашёл такой route вместо открытия файла. Без атрибута `download` — файл сначала открывается в
  браузере, а не сразу скачивается.
- **Как обновить**: заменить `public/trifonov-cv.pdf` новым файлом с тем же именем и задеплоить —
  имя менять нельзя, ссылка на него уже разошлась (hh.ru, письма). Путь/код трогать не нужно.
- **Кеширование**: GitHub Pages отдаёт статические файлы с `Cache-Control: max-age=600` (10 минут) —
  после обновления файла хостинг/CDN и браузеры пользователей какое-то время (до ~10 минут, возможно
  дольше из-за кеша самого браузера) могут продолжать отдавать старую версию. Это нормально, ждать
  не нужно — просто не мгновенно.

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