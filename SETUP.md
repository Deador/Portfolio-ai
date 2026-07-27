# Portfolio Project Setup

## ✅ Project Initialization Complete

The project has been fully bootstrapped with all necessary infrastructure.

---

## 📋 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all runtime and development dependencies.

### 2. Start Development Server

```bash
npm run dev
```

Opens the application at `http://localhost:5173` with hot-reload enabled.

### 3. Start Storybook

```bash
npm run storybook
```

Opens Storybook at `http://localhost:6006` for component development.

### 4. Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` directory.

---

## 📦 Dependencies

### Runtime (3)
- **react@^18.3.1** — UI framework
- **react-dom@^18.3.1** — React DOM rendering
- **react-router-dom@^6.20.0** — Client-side routing

### Build Tools (5)
- **vite@^5.0.8** — Fast build tool and dev server
- **@vitejs/plugin-react@^4.2.1** — React plugin for Vite
- **typescript@^5.3.3** — TypeScript compiler
- **sass@^1.69.5** — Sass/SCSS support
- **esbuild** — (bundled with Vite) Code bundling

### Storybook (6)
- **storybook@^7.6.10** — Component development environment
- **@storybook/react@^7.6.10** — Storybook React support
- **@storybook/react-vite@^7.6.10** — Storybook Vite builder
- **@storybook/addon-essentials@^7.6.10** — Essential addons
- **@storybook/addon-interactions@^7.6.10** — Interaction testing
- **@storybook/addon-links@^7.6.10** — Story linking

### Quality Tools (6)
- **eslint@^8.56.0** — Linting
- **@typescript-eslint/eslint-plugin@^6.15.0** — TypeScript linting
- **@typescript-eslint/parser@^6.15.0** — TypeScript parser
- **eslint-plugin-react-hooks@^4.6.0** — React hooks linting
- **eslint-plugin-react-refresh@^0.4.5** — React refresh linting
- **prettier@^3.1.1** — Code formatting

### Type Definitions (3)
- **@types/react@^18.2.45** — React types
- **@types/react-dom@^18.2.18** — React DOM types
- **@types/node@^20.10.5** — Node.js types

**Total: 28 packages**

---

## 📂 Project Structure

```
portfolio-ai/
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── app/
│   │   ├── App.tsx                 # Root component with router
│   │   ├── pages/
│   │   │   ├── HomePage.tsx        # Home page (placeholder)
│   │   │   ├── HomePage.module.scss
│   │   │   ├── CasePage.tsx        # Case study page (placeholder)
│   │   │   └── CasePage.module.scss
│   │   ├── router/
│   │   │   └── index.ts            # Router configuration
│   │   └── layouts/                # Shared layouts (future)
│   ├── shared/
│   │   ├── ui/
│   │   │   ├── atoms/              # Atomic components
│   │   │   ├── molecules/
│   │   │   │   └── CommonCard/     # ✅ Implemented molecule
│   │   │   └── organisms/          # Sections and complex components
│   │   ├── styles/
│   │   │   ├── index.scss          # Global styles entry
│   │   │   ├── _reset.scss         # Browser reset
│   │   │   ├── _global.scss        # Global document styles
│   │   │   └── _utilities.scss     # Utility classes
│   │   ├── tokens/
│   │   │   └── tokens.scss         # ✅ Design tokens (42 tokens)
│   │   ├── hooks/                  # Custom React hooks (future)
│   │   └── utils/                  # Utility functions (future)
│   ├── entities/
│   │   └── case/                   # Case study domain logic
│   ├── content/
│   │   └── cases/                  # Case study data
│   └── lib/
│       └── content-parser/         # Content parsing utilities
├── .storybook/
│   ├── main.ts                     # Storybook configuration
│   └── preview.ts                  # Storybook preview settings
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
├── .eslintrc.cjs                   # ESLint configuration
├── .prettierrc                     # Prettier configuration
└── .gitignore                      # Git ignore rules
```

---

## 🔧 Available Scripts

```bash
npm run dev              # Start Vite dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run storybook        # Start Storybook (http://localhost:6006)
npm run build-storybook  # Build Storybook for deployment
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checker
```

---

## 🎨 Styling System

### Design Tokens (42 total)
- **Colors:** 10 tokens (content, background, icons)
- **Spacing:** 12 tokens (4px scale base)
- **Radius:** 4 tokens (border-radius scale)
- **Typography:** 15 tokens (titles + text styles)
- **Effects:** 1 token (shadow)

### Global Styles
- CSS reset for consistent baseline
- Typography defaults (Onest font primary)
- Link styling with focus states
- Form element inheritance
- Responsive image handling

### CSS Modules
- Scoped component styles
- No global class pollution
- All values from design tokens
- SCSS with nesting

---

## 📱 Fonts

### Primary Font: Onest
- Used for all titles and body text
- Weights: 400, 500, 600, 700
- Loaded from Google Fonts

### Secondary Font: Inter
- Used only for legacy typography tokens (Text/XS)
- Weights: 400, 500, 600, 700
- Loaded from Google Fonts

Both fonts are preloaded in `index.html` for optimal performance.

---

## ✨ Features Implemented

✅ **React 18** with Vite for fast development
✅ **TypeScript** strict mode for type safety
✅ **React Router v6** for client-side routing
✅ **Sass/SCSS Modules** for component styling
✅ **Storybook 7** for component development
✅ **ESLint** + **Prettier** for code quality
✅ **Design Tokens** (42 tokens defined)
✅ **Global Styles** (reset, typography, utilities)
✅ **CommonCard Component** (5 variants, production-ready)
✅ **Architecture** following the documented structure

---

## 🚀 Next Steps

1. **Implement Atoms** (Button, Heading, Text, Icon, etc.)
2. **Implement Molecules** (additional cards, navigation items, etc.)
3. **Implement Organisms** (sections, layouts, etc.)
4. **Add Case Studies** (content and CaseRenderer)
5. **Create Portfolio Pages** (home, individual cases)
6. **Deploy to Vercel/Netlify** (configured in docs)

---

## 📚 Documentation

Refer to the following documentation files:

- **AGENTS.md** — AI development guidelines
- **README.md** — Project overview
- **docs/architecture.md** — Folder structure and architecture
- **docs/design-system.md** — Component system and APIs
- **docs/tokens.md** — Design token specifications
- **docs/token-reference.md** — Token usage guide

---

## 🆘 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 5174
npm run storybook -- -p 6007
```

### Module not found errors
Ensure all imports use correct paths:
```ts
// ✅ Correct
import { CommonCard } from 'src/shared/ui/molecules/CommonCard/CommonCard';

// ❌ Avoid
import { CommonCard } from '../../../shared/...';
```

### TypeScript errors
Run type checker:
```bash
npm run type-check
```

### Build failures
Clear cache and rebuild:
```bash
rm -rf node_modules dist .storybook/.cache
npm install
npm run build
```

---

## 📝 License

Personal portfolio project. All rights reserved.

---

**Status:** ✅ Project initialized and ready for development
**Last Updated:** 2026-07-27
