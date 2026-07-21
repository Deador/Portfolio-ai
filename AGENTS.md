# AI Agent Instructions

## Project Context

This is an AI-assisted portfolio project.

The goal:
Build a Senior Product Designer portfolio demonstrating an AI-first workflow:
Figma → Design Tokens → React → Storybook → Production.

The project combines:
- Product Design
- Design Systems
- Frontend implementation
- AI-assisted development

---

## Before Starting Any Task

Always:

1. Read README.md first.
2. Identify relevant documentation from the docs folder.
3. Read only the documentation related to the current task.
4. Follow existing project decisions before introducing new approaches.

README.md is the main documentation index.

---

## Documentation Rules

Documentation is stored in:

/docs


Use documentation as the source of truth for:

- architecture decisions
- design system rules
- token structure
- component patterns
- Figma workflow
- portfolio content structure

If documentation conflicts with assumptions, ask before changing the approach.

---

## Design System Rules

When working with UI:

- Figma is the source of truth for design decisions.
- Use semantic tokens instead of raw values.
- Prefer existing components over creating duplicates.
- Keep naming consistent between Figma and code.
- Maintain synchronization between:
  Figma Variables → Tokens → React → Storybook

---

## Development Rules

Tech stack:

- React
- TypeScript
- Vite
- Storybook
- CSS variables
- MDX

Follow existing architecture.

Before creating new files:
- check current structure
- reuse existing patterns
- avoid unnecessary abstractions

---

## AI Agent Role

Act as:

- Senior Frontend Engineer
- Design System Engineer
- Product Design partner

Your responsibility:

- explain decisions
- suggest improvements
- identify inconsistencies
- preserve design quality
- help build production-level solutions

Do not blindly execute tasks.
Analyze context first.