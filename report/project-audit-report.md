# Project Audit Report

**Date:** 2026-08-02
**Status:** Open — pending resolution
**Scope:** Full project audit (docs, architecture, tokens, components, pages, tooling)
**Auditor:** AI agent (session context review)

---

## Overview

Full audit of the portfolio project performed on 2026-08-02.

The purpose of this report is to record all discovered problems so work can be resumed later without re-doing the analysis.

Findings are grouped by severity:

1. **Blockers** — project cannot build/verify
2. **Architecture gaps** — deviation from architecture.md
3. **Token violations** — hardcoded values and undefined tokens
4. **Naming inconsistency** — token naming drift
5. **Minor / housekeeping**

---

## 1. Blockers

### 1.1 Dependencies not installed

- `node_modules/` does **not** exist in the project root.
- All npm scripts fail: `npm run build`, `npm run type-check`, `npm run lint`, `npm run storybook`.
- Error observed: `"tsc" is not recognized` (binary missing).

**Action:** Run `npm install` before any build/type-check/Storybook verification.

---

## 2. Architecture Gaps

### 2.1 Content pipeline not implemented

Architecture (docs/architecture.md) defines these layers:

- `src/entities/`
- `src/content/cases/` (acquiring, chat)
- `src/lib/content-parser/`

**Current state:**
- None of these folders exist.
- Case study content is hardcoded directly in `src/app/pages/CaseStudyAcquiring.tsx` (436 lines).
- `src/app/pages/CasePage.tsx` performs manual slug → component mapping instead of content-driven rendering.

**Affected files:**
- `src/app/pages/CaseStudyAcquiring.tsx`
- `src/app/pages/CasePage.tsx`

**Risk:** Content is coupled to UI. Adding a new case study (e.g. `chat`) requires new code, contradicting architecture.md ("Adding a new case study should not require architecture changes").

---

## 3. Token Violations

### 3.1 Undefined tokens used (verified programmatically)

Three CSS variables are used but **not defined** in `src/shared/tokens/tokens.scss`:

| Token | File | Line |
|-------|------|------|
| `--background-primary` | `src/app/pages/CaseStudyAcquiring.module.scss` | 5 |
| `--padding-x20` | `src/app/pages/CaseStudyAcquiring.module.scss` | 14, 16 |
| `--padding-x8` | `src/app/pages/CaseStudyAcquiring.module.scss` | 16 |

All three rely on fallback values (hardcoded pixels), e.g.:

```scss
background-color: var(--background-primary, #f6f7f8);
gap: var(--padding-x20, 80px);
padding: var(--padding-x20, 80px) var(--padding-x8, 32px);
```

**Required fix:** replace with existing tokens (`--spacing-x20`, `--spacing-x8`, and a defined background color token).

---

### 3.2 Hardcoded values in components

**`src/shared/ui/molecules/MetricCard/MetricCard.module.scss`:**
| Line | Value | Issue |
|------|-------|-------|
| 51 | `color: #000000` | Long variant title |
| 56 | `color: #000000` | Long variant description |
| 69 | `background-color: #3e4041` | Badge background |
| 76 | `color: #eee` | Badge text |

**`src/shared/ui/molecules/PersonaCard/PersonaCard.module.scss`:**
| Line | Value | Issue |
|------|-------|-------|
| 29 | `background-color: #ecedee` | Avatar circle background |
| 38 | `background-color: #d9dade` | Placeholder icon background |

> Note: These two components were already documented in `docs/report/missing-design-tokens.md` (2026-07-29). Still unresolved.

---

### 3.3 Inline styles with hardcoded colors in pages

**`src/app/pages/CaseStudyAcquiring.tsx`** — placeholder image blocks use inline styles:
| Line | Value |
|------|-------|
| 35 | `backgroundColor: '#f0f0f0'` |
| 154 | `backgroundColor: '#eaecee'` |
| 206 | `backgroundColor: '#f0f0f0'` |
| 299 | `backgroundColor: '#f0f0f0'` |
| (all) | `borderRadius: 'var(--radius-16)'` / `'var(--radius-20)'` inline |

These are demo/placeholder blocks ("Hero Image", "Pie Chart", "Feature", "Architecture") — likely to be replaced by real images, but they still violate the "no hardcoded colors" rule.

---

### 3.4 Hardcoded colors in Storybook stories (minor)

Story decorator backgrounds use raw hex values (stories are presentation artifacts, lower priority):

- `HeroSection.stories.tsx`: lines 31 (`#e2e4e7`, `#d9dade`), 35 (`#787878`), 99 (`#f0f0f0`)
- `ContextSection.stories.tsx`: line 17 (`#e2e4e7`)
- `FeatureSection.stories.tsx`: line 17 (`#e2e4e7`)
- `Header.stories.tsx`: lines 56, 90, 107, 120 (`#f5f5f5`), 75 (`#1e1e1e`)
- `CommonCard.stories.tsx`: line 278 (`#1f1f1f`)

---

## 4. Token Naming Inconsistency

### 4.1 Figma naming vs. SCSS naming drift

Figma variable names use `padding/*` and `background/*`:

- `padding/x8`, `padding/x20`
- `background/primary`

The SCSS token layer intentionally renames them to semantic prefixes:

- `--spacing-x*`
- `--color-background-*`

`CaseStudyAcquiring.module.scss` mixes both conventions, referencing the Figma-style names (`--padding-x*`, `--background-primary`) that do not exist in `tokens.scss`.

**Risk:** Similar drift may appear in other files when new code is written from Figma specs. Verify tokens against `tokens.scss` before use.

---

## 5. Minor / Housekeeping

### 5.1 Header navigation is not wired

- `src/shared/ui/organisms/Header/Header.tsx` renders nav as plain `<Button>` elements without navigation (no `Link`, no route targets, no active state).
- `RootLayout` passes a placeholder logo (solid `<rect>` SVG).
- Documented as "Future Enhancements" in `docs/report/header-implementation.md`.

**To-do:** connect nav buttons to routes, extract a reusable Logo component, add active-link state, add responsive/mobile variant.

### 5.2 `opencode.json` is untracked in git

`git status` shows `opencode.json` as the only untracked file.

**To-do:** decide whether to commit (it contains the Figma MCP config, key referenced via `{env:FIGMA_API_KEY}` — safe to commit).

### 5.3 Figma file has leftover test canvas

Canvas `mcp test` (node `33157:976`) remains in the Figma file `i3ANEQ3o83zbqvSqYGSYBC`.
User plans to remove it manually. No code action needed.

---

## Verified Facts (tested during audit)

- Figma REST API connection works: `GET /v1/me` → HTTP 200 (user `ljhdseu`).
- Figma file access works: `GET /v1/files/i3ANEQ3o83zbqvSqYGSYBC?depth=1` → HTTP 200 (`role: owner`).
- `FIGMA_API_KEY` is set at User scope (45 chars).
- `figma-developer-mcp` (configured in `opencode.json`) is a **read-only** MCP — it has no delete-node tool.
- Figma REST API does **not** support deleting arbitrary nodes (`DELETE /v1/files/:key/nodes` → 404).

---

## Recommended Resolution Order

1. **npm install** — unblock build/type-check/Storybook.
2. Fix undefined tokens in `CaseStudyAcquiring.module.scss` → use `--spacing-*` / defined color tokens.
3. Resolve MetricCard / PersonaCard hardcoded colors (add tokens or reuse existing ones — see `missing-design-tokens.md`).
4. Decide on placeholder image strategy for case study sections (replace inline styles with real images or tokenized placeholders).
5. Plan content pipeline (`content/`, `entities/`, `lib/`) before adding the second case study (`chat`).
6. Wire Header navigation (Links, active state, responsive).
7. Housekeeping: commit/ignore `opencode.json`, clean Figma test canvas.

---

## Resolution Checklist

- [ ] `npm install` run; `npm run build` passes
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `--background-primary`, `--padding-x20`, `--padding-x8` removed
- [ ] No hardcoded hex in `MetricCard.module.scss`
- [ ] No hardcoded hex in `PersonaCard.module.scss`
- [ ] No inline hardcoded colors in `CaseStudyAcquiring.tsx`
- [ ] Content pipeline created (`content/`, `entities/`, `lib/`)
- [ ] Header navigation wired
- [ ] `opencode.json` committed or ignored
- [ ] Figma `mcp test` canvas removed (manual)

---

**Next review:** after the items above are addressed, or when work on the next case study begins.
