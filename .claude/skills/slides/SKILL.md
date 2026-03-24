---
name: ckm:slides
description: Create strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, and contextual slide strategies.
argument-hint: "[topic] [slide-count]"
metadata:
  author: claudekit
  version: "1.0.0"
---

# Slides

Strategic HTML presentation design with data visualization.

## When to Use

- Marketing presentations and pitch decks
- Data-driven slides with Chart.js
- Strategic slide design with layout patterns
- Copywriting-optimized presentation content
- Investor pitches and demo decks

## Quick Start

```bash
/slides:create "10-slide investor pitch for MyProject"
/slides:create "product demo 8 slides"
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `create` | Create strategic presentation slides |

## Knowledge Base

| Topic | File |
|-------|------|
| Layout Patterns | `references/layout-patterns.md` |
| HTML Template | `references/html-template.md` |
| Copywriting Formulas | `references/copywriting-formulas.md` |
| Slide Strategies | `references/slide-strategies.md` |

## Slide Requirements

**ALL slides MUST:**
1. Import `assets/design-tokens.css` — single source of truth
2. Use CSS variables: `var(--color-primary)`, `var(--slide-bg)`, etc.
3. Use Chart.js for charts (NOT CSS-only bars)
4. Include navigation (keyboard arrows, click, progress bar)
5. Center align content
6. Focus on persuasion/conversion

## Token Compliance

```css
/* CORRECT - uses token */
background: var(--slide-bg);
color: var(--color-primary);

/* WRONG - hardcoded */
background: #0D0D0D;
color: #FF6B6B;
```

## Pattern Breaking (Duarte Sparkline)

Premium decks alternate between emotions for engagement:
- "What Is" (frustration) ↔ "What Could Be" (hope)
- Pattern breaks at 1/3 and 2/3 positions

## RuFlo Integration

- Works with `design-system` skill for token-compliant slides
- `design-architect` agent coordinates multi-slide projects
- Chart.js data can be sourced from AgentDB analytics

## Routing

1. Parse subcommand from `$ARGUMENTS` (first word)
2. Load corresponding `references/{subcommand}.md`
3. Execute with remaining arguments
