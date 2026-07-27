# 🚀 Project Startup Guide

## ✅ Installation Status

```
✓ Dependencies installed (989 packages)
✓ Production build successful
✓ Project ready for development
```

---

## 📍 Project Location

```
C:\Users\mp3ps\Documents\Portfolio-ai
```

---

## 🎯 How to Run

### 1. Start Development Server

```bash
npm run dev
```

**Output:**
```
VITE v5.4.21 ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

**What you'll see:**
- Portfolio homepage with CommonCard component
- Hot-reload enabled (changes update instantly)
- Browser opens automatically at http://localhost:5173

---

### 2. Start Storybook

```bash
npm run storybook
```

**Output:**
```
Storybook 7.6.10 started
Local:        http://localhost:6006
```

**What you'll see:**
- CommonCard component stories
- Interactive component development environment
- Live preview with controls
- Documentation and accessibility panels

---

### 3. Build for Production

```bash
npm run build
```

**Output:**
```
vite v5.4.21 building for production...
✓ built in 1.38s

dist/index.html                    0.79 kB
dist/assets/index-B0ozlv99.css     6.93 kB
dist/assets/index-BOE2Qe08.js    206.45 kB
```

---

## 📊 Project Statistics

### Dependencies

**Runtime (3):**
- react@^18.3.1
- react-dom@^18.3.1
- react-router-dom@^6.20.0

**DevDependencies (25):**
- Vite, TypeScript, Sass
- Storybook (6 packages)
- ESLint, Prettier
- Type definitions

**Total:** 28 packages, 989 installed

### Build Output

- **HTML:** 0.79 kB (gzip: 0.43 kB)
- **CSS:** 6.93 kB (gzip: 1.80 kB)
- **JS:** 206.45 kB (gzip: 67.49 kB)
- **Total:** ~214 kB (gzip: ~69 kB)

### Files Created

**Configuration (10):**
- package.json
- tsconfig.json / tsconfig.app.json
- vite.config.ts
- .eslintrc.cjs
- .prettierrc
- index.html
- .gitignore
- vite-env.d.ts

**Application (7):**
- src/main.tsx
- src/app/App.tsx
- src/app/router/index.ts
- src/app/pages/HomePage.tsx + CSS
- src/app/pages/CasePage.tsx + CSS

**Storybook (2):**
- .storybook/main.ts
- .storybook/preview.ts

**Total:** 19 new files created

### Folder Structure

```
src/
├── app/
│   ├── pages/
│   ├── router/
│   └── layouts/
├── shared/
│   ├── ui/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   │   └── CommonCard/ ✅
│   │   └── organisms/
│   ├── styles/ ✅
│   │   ├── index.scss
│   │   ├── _reset.scss
│   │   ├── _global.scss
│   │   └── _utilities.scss
│   ├── tokens/
│   │   └── tokens.scss ✅
│   ├── hooks/
│   └── utils/
├── entities/
├── content/
└── lib/
```

✅ = Already has content

---

## 🌐 Routes Available

### Development Server (npm run dev)

- **http://localhost:5173/** — Home page
- **http://localhost:5173/case/example** — Case study page (placeholder)

### Storybook (npm run storybook)

- **http://localhost:6006/** — Storybook main
- **http://localhost:6006/?path=/docs/molecules-commoncard--docs** — CommonCard docs
- **http://localhost:6006/?path=/story/molecules-commoncard--insight** — CommonCard Insight variant

---

## 🎨 What's Included

### Design System
- ✅ 42 Design Tokens (colors, spacing, radius, typography)
- ✅ Global styles with CSS reset
- ✅ Typography system (Onest + Inter)
- ✅ Semantic HTML structure

### Components
- ✅ CommonCard (5 variants, production-ready)
- ✅ HomePage (demo page)
- ✅ CasePage (placeholder)

### Infrastructure
- ✅ React 18 + TypeScript strict mode
- ✅ Vite (fast dev server + build)
- ✅ React Router v6
- ✅ Storybook 7
- ✅ ESLint + Prettier
- ✅ CSS Modules + Sass

---

## 📝 Available Commands

```bash
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run preview          # Preview production build
npm run storybook        # Start Storybook (http://localhost:6006)
npm run build-storybook  # Build Storybook for deployment
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checker
```

---

## 🔍 First Steps

### 1. Open Development Server
```bash
npm run dev
```
See the homepage with CommonCard rendered.

### 2. Explore Storybook
```bash
npm run storybook
```
View CommonCard component in isolation with interactive controls.

### 3. Check Build
```bash
npm run build
```
Verify production build works and check bundle size.

### 4. View Source Files
- **Home page:** `src/app/pages/HomePage.tsx`
- **Component:** `src/shared/ui/molecules/CommonCard/CommonCard.tsx`
- **Styles:** `src/shared/styles/index.scss`
- **Tokens:** `src/shared/tokens/tokens.scss`

---

## 🚨 Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 5174
```

### Port 6006 already in use
```bash
npm run storybook -- -p 6007
```

### Module not found errors
Ensure you're in the project directory:
```bash
cd C:\Users\mp3ps\Documents\Portfolio-ai
npm run dev
```

### TypeScript errors
Run type checker:
```bash
npm run type-check
```

### Build fails
Clear cache:
```bash
rm -r node_modules dist .storybook/.cache
npm install
npm run build
```

---

## 📚 Next Steps

1. **Modify HomePage** — Edit `src/app/pages/HomePage.tsx`
2. **Add more variants** — Implement other CommonCard variants
3. **Create new components** — Add atoms, molecules, organisms
4. **Add case studies** — Create content in `src/content/cases/`
5. **Deploy** — Deploy to Vercel, Netlify, or Cloudflare Pages

---

## 📖 Documentation

- **SETUP.md** — Complete setup guide
- **AGENTS.md** — AI development guidelines
- **README.md** — Project overview
- **docs/architecture.md** — Folder structure
- **docs/design-system.md** — Component system
- **docs/tokens.md** — Token specifications

---

**Status:** ✅ Ready to develop  
**Last Updated:** 2026-07-27 14:00 UTC  
**Environment:** Node.js + npm
