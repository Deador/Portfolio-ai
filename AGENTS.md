# AGENTS.md

# AI Agent Instructions

This repository is designed for AI-assisted development.

Every AI model (Claude, GPT, Gemini, DeepSeek, etc.) must follow this document before performing any task.

Do not start implementation until the required project documentation has been read.

---

# Project Goal

This project is a personal portfolio for a Senior Product Designer.

The portfolio demonstrates expertise in:

- Product Design
- Design Systems
- Frontend Engineering
- AI-assisted Development

The long-term workflow is:

Figma
↓
Design Tokens
↓
React
↓
Storybook
↓
Production

The goal is not only to build a website.

The goal is to demonstrate a production-ready AI-first workflow.

---

# AI Boot Process

Every task MUST follow this sequence.

## Step 1

Read:

README.md

README.md is the documentation index.

---

## Step 2

Read:

docs/project-context.md

Understand:

- project goals
- priorities
- target audience
- portfolio strategy

---

## Step 3

Read:

docs/architecture.md

This document defines:

- folder structure
- architecture
- rendering pipeline
- layer boundaries
- development workflow

Never violate architecture.md.

---

## Step 3.1

Read:

docs/json-case-study-architecture.md

This is the main content document.

It defines:

- case.json schema
- section/component mapping
- figmaNode rules
- image conventions
- content architecture

Always read it before working on case content (case.json or images).

---

## Step 4

Determine the task category.

Choose one or more categories below.

---

# Task Routing

## Frontend Development

When the task involves:

- React
- TypeScript
- CSS
- SCSS
- Components
- Storybook
- Layouts
- Styling

You MUST read:

docs/agents/frontend-engineer.md

---

## Design System

When the task involves:

- Figma
- Variables
- Tokens
- Components
- Variants
- Auto Layout
- Design System architecture

You MUST read:

docs/design-system.md

and

docs/agents/design-system-engineer.md

and

docs/figma-workflow.md

---

## Design Tokens

When implementing visual styles or CSS variables,

You MUST read:

docs/tokens.md

Never invent visual values.

Tokens are the source of truth.

---

## Case Study Writing

When working on portfolio content,

You MUST read:

docs/case-study-writer.md

---

## Code Review

When reviewing existing code,

You MUST read:

docs/code-reviewer.md

---

## Multiple Categories

If the task belongs to multiple categories,

Read every corresponding document before implementation.

Never skip role-specific documentation.

---

# Source of Truth

Every document has its own responsibility.

## project-context.md

Business context.

Portfolio goals.

Priorities.

---

## architecture.md

Project architecture.

Folder structure.

Rendering pipeline.

Layer boundaries.

---

## design-system.md

Design System structure.

Component hierarchy.

Component APIs.

Naming.

Variants.

---

## tokens.md

Visual implementation values.

Colors.

Spacing.

Typography.

Radius.

Effects.

Never replace documented values with assumptions.

---

## Figma

Figma is the source of truth for:

- layouts
- spacing
- visual hierarchy
- component composition

Documentation remains the source of truth for architecture.

If documentation conflicts with Figma,

Report the inconsistency.

Do not guess.

---

# General Development Rules

Always:

- understand the task before coding
- reuse existing architecture
- prefer composition
- minimize complexity
- explain important decisions
- keep the code production-ready

Never:

- create duplicate components
- introduce unnecessary abstractions
- hardcode visual values
- violate architecture
- ignore existing documentation

---

# Before Writing Code

Always perform these steps.

1.

Read required documentation.

2.

Explain your implementation plan.

3.

Identify affected files.

4.

Identify risks.

5.

If architecture changes are required,

stop and ask for approval.

6.

Only then implement.

---

# After Implementation

Always provide:

## Summary

What was implemented.

## Files

List every created or modified file.

## Decisions

Explain important implementation decisions.

## Future Improvements

Optional recommendations.

---

# If Documentation Is Missing

Never invent:

- architecture
- APIs
- design tokens
- folder structure

Instead:

- explain what is missing
- suggest the best solution
- wait for approval if needed

---

# Code Quality Checklist

Before completing the task verify:

✓ Architecture follows architecture.md

✓ Components follow design-system.md

✓ Visual values come from tokens.md

✓ No duplicated code

✓ No hardcoded colors

✓ No hardcoded spacing

✓ No hardcoded typography

✓ Uses semantic HTML

✓ Uses TypeScript correctly

✓ Uses CSS Modules

✓ Ready for Storybook

✓ Ready for production

---

# Mindset

You are not a code generator.

You are the technical owner of the frontend architecture.

Your responsibility is to preserve consistency, maintainability and design quality across the entire project.

When several implementation options exist:

- explain the trade-offs
- recommend the simplest production-ready solution
- avoid unnecessary complexity

Always think before coding.



## End of Session

Before finishing ANY work session the agent MUST update:

docs/session/session-summary.md

The file must always contain:

# Session Summary

## What was completed
- ...

## Files changed
- ...

## Components created
- ...

## Remaining issues
- ...

## Next recommended task
- ...

## Suggested prompt for the next session

```text
...

Never finish the session without updating this file.