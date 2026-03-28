---
name: "UI UX Pro Max"
description: "UI/UX design intelligence for web and mobile. Includes 67 styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types. Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor UI/UX code. Projects: website, landing page, dashboard, SaaS, mobile app. Styles: glassmorphism, brutalism, neumorphism, bento grid, dark mode. Topics: color systems, accessibility, animation, typography, font pairing, spacing."
---

# UI UX Pro Max

## What This Skill Does

Provides design intelligence via a BM25 search engine across 12 domains of UI/UX knowledge. Used by the design agent swarm (design-architect, ux-researcher, ui-developer, accessibility-auditor) to research styles, generate design systems, and validate accessibility.

## Prerequisites

- UI UX Pro Max plugin installed: `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill && /plugin install ui-ux-pro-max@ui-ux-pro-max-skill`
- Python 3 (for search scripts)
- Design agents category enabled in kynjalflow init

## Quick Start

```bash
# Search by domain
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech premium" --domain color
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "modern elegant" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --domain product
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "touch targets" --domain ux

# Generate a full design system
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech premium" --design-system -p "MyApp"

# Persist to files (creates MASTER.md + page overrides)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech premium" --design-system --persist -p "MyApp"

# Generate page-specific overrides
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "dashboard analytics" --design-system --persist -p "MyApp" --page dashboard
```

## Available Domains

| Domain | Records | Description |
|--------|---------|-------------|
| `style` | 67 | UI styles (glassmorphism, brutalism, etc.) |
| `color` | 161 | Color palettes by industry/mood |
| `typography` | 57 | Font pairings with Google Fonts |
| `product` | 161 | Product type patterns |
| `ux` | 99 | UX guidelines and rules |
| `landing` | 24 | Landing page patterns |
| `chart` | 25 | Chart type recommendations |
| `google-fonts` | Full DB | Google Fonts database |
| `icons` | Varies | Icon recommendations |
| `react` | Varies | React performance rules |
| `web` | Varies | Web app interface guidelines |

## Design System Output

When using `--persist`, creates:
```
design-system/<project>/
├── MASTER.md          # Global rules: colors, typography, spacing, components
└── pages/
    └── <page>.md      # Page-specific overrides (only deviations)
```

**Hierarchy:** Page overrides > MASTER.md rules.

## Priority Rules

| Priority | Category | Key Rules |
|----------|----------|-----------|
| P1 CRITICAL | Accessibility | 4.5:1 contrast, focus rings, alt text, aria-labels, keyboard nav |
| P2 CRITICAL | Touch | 44×44pt (iOS) / 48×48dp (Android) targets, 8px spacing |
| P3 HIGH | Typography | 16px min body, modular scale, max 2 font families |
| P4 HIGH | Color | CSS tokens only (never hardcoded hex), semantic naming |
| P5 HIGH | Icons | SVG only (never emoji), Lucide React or Heroicons |
| P6 MEDIUM | Spacing | 4px base grid, consistent padding/margins |
| P7 MEDIUM | Motion | 150-300ms transitions, respect prefers-reduced-motion |
| P8 MEDIUM | Responsive | Mobile-first, breakpoints: 375/768/1024/1440 |
| P9 LOW | Dark Mode | CSS custom properties, system preference detection |
| P10 LOW | Charts | Match chart type to data relationship |

## Anti-Patterns (Never Do)

- Hardcoded hex values — use CSS tokens: `var(--color-primary)`
- Emoji as icons — use SVG icon libraries
- Touch targets < 44px — minimum 44×44px clickable area
- Contrast < 4.5:1 — WCAG AA minimum for normal text
- Missing focus states — visible focus rings on ALL interactive elements
- Color as only indicator — never convey info by color alone

## Design Agent Swarm

This skill is used by the design agent category:

| Agent | Role | Uses This Skill For |
|-------|------|-------------------|
| **design-architect** | Coordinator | Design system generation, page overrides |
| **ux-researcher** | Research | Multi-domain searches across all 12 domains |
| **ui-developer** | Implementation | Reading MASTER.md tokens, component specs |
| **accessibility-auditor** | Validation | UX domain searches for WCAG guidelines |

## Stack Preferences

- **Web:** React/Next.js + Tailwind CSS + shadcn/ui
- **Mobile:** React Native with @expo/vector-icons
- **Styling:** CSS custom properties for design tokens
- **Icons:** Lucide React (web), @expo/vector-icons (mobile)
