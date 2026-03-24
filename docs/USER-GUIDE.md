# KynjalFlow User Guide

## Overview

KynjalFlow is an AI agent orchestration platform that deploys 103 specialized agents in coordinated swarms. It extends Claude Code with design intelligence, multi-agent workflows, and persistent memory.

## Core Concepts

### Agents

Agents are specialized AI workers with defined roles. Each has a system prompt, capabilities, and memory namespace.

| Category | Agents | Purpose |
|----------|--------|---------|
| **core** | coder, tester, reviewer, planner, researcher | General development |
| **design** | design-architect, ux-researcher, ui-developer, accessibility-auditor | UI/UX design swarm |
| **github** | pr-manager, issue-tracker, code-review-swarm, release-manager | GitHub workflows |
| **sparc** | specification, pseudocode, architecture, refinement | SPARC methodology |
| **swarm** | hierarchical-coordinator, mesh-coordinator, adaptive-coordinator | Swarm coordination |

### Skills

Skills are searchable knowledge bases that agents and Claude Code can invoke. Key skills:

- **ui-ux-pro-max** — Design intelligence (67 styles, 161 palettes, 57 font pairings)
- **sparc-methodology** — SPARC development workflow
- **swarm-orchestration** — Multi-agent coordination
- **pair-programming** — AI pair programming modes

### Swarms

A swarm is a group of coordinated agents working on a task. Topologies:

- **Hierarchical** — One coordinator delegates to workers
- **Mesh** — Peer-to-peer, distributed decisions
- **Adaptive** — Switches topology based on task complexity

## Using the Design Swarm

### Automatic Routing

When you ask Claude Code to do design work, the router detects design keywords and routes to the `design-architect` agent:

```
You: "redesign the landing page with a premium glassmorphism style"
→ Router detects: "redesign", "landing page", "glassmorphism"
→ Routes to: design-architect (confidence: 80%)
```

### Manual Agent Spawn

```
Agent(subagent_type="design-architect", prompt="Design a premium dashboard for a fintech SaaS app")
```

### The Design Workflow

1. **design-architect** receives the task
2. Spawns **ux-researcher** → searches UI UX Pro Max across style, color, typography, product, ux domains
3. Synthesizes research into a design specification
4. Spawns **ui-developer** → implements with the project's stack (React/Vue/Angular/etc.)
5. Spawns **accessibility-auditor** → validates WCAG 2.1 AA compliance
6. Returns the result with implementation + audit report

### Design System Generation

Generate a full design system for your project:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech premium" --design-system --persist -p "MyApp"
```

This creates:

```
design-system/MyApp/
├── MASTER.md        # Color tokens, typography, spacing, component specs
└── pages/
    └── dashboard.md # Page-specific overrides
```

### Search by Domain

```bash
# Find UI styles
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style

# Find color palettes
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech premium" --domain color

# Find font pairings
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "modern elegant" --domain typography

# Find UX guidelines
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "touch targets mobile" --domain ux

# Find landing page patterns
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "SaaS conversion" --domain landing
```

## Supported Stacks

The ui-developer agent adapts to your project's framework:

### Web
| Stack | Components | Styling |
|-------|-----------|---------|
| React / Next.js | shadcn/ui | Tailwind CSS |
| Vue / Nuxt 3 | shadcn-vue / Radix Vue | Tailwind CSS |
| Angular | Angular Material | Angular themes |
| Svelte / SvelteKit | Skeleton UI | Tailwind CSS |
| Astro | Framework islands | Tailwind CSS |

### Mobile
| Stack | Components | Styling |
|-------|-----------|---------|
| React Native / Expo | Custom primitives | NativeWind |
| Flutter | Material 3 | ThemeData |
| SwiftUI | Native views | SwiftUI modifiers |
| Jetpack Compose | Material 3 | MaterialTheme |

### Component Libraries
shadcn/ui, MUI, Chakra UI, Mantine, Ant Design, Radix UI

## CLI Commands

### Init & Setup

```bash
kynjalflow init                    # Default init
kynjalflow init --full --force     # Full init, overwrite existing
kynjalflow init --wizard           # Interactive setup
kynjalflow init upgrade            # Update without overwriting
kynjalflow init --start-all        # Init and start all services
```

### Agent Management

```bash
kynjalflow agent spawn -t coder --name my-coder
kynjalflow agent list
kynjalflow agent status <agent-id>
kynjalflow agent terminate <agent-id>
```

### Swarm Coordination

```bash
kynjalflow swarm init --topology hierarchical --max-agents 8
kynjalflow swarm status
kynjalflow swarm shutdown
```

### Memory

```bash
kynjalflow memory store --key "pattern-auth" --value "JWT with refresh" --namespace patterns
kynjalflow memory search --query "authentication patterns"
kynjalflow memory list --namespace patterns
kynjalflow memory retrieve --key "pattern-auth"
```

### Task Management

```bash
kynjalflow task create --name "Build API" --type coding
kynjalflow task list
kynjalflow task status <task-id>
```

## SPARC Methodology

SPARC is a structured development workflow with 5 phases:

1. **Specification** — Requirements, constraints, edge cases
2. **Pseudocode** — Algorithm design, logic flow
3. **Architecture** — System design, patterns, boundaries
4. **Refinement** — Iterative improvement, optimization
5. **Completion** — Integration, testing, deployment

Invoke SPARC modes via skills:

```
/sparc:architect    # System design
/sparc:coder        # Implementation
/sparc:tester       # Testing
/sparc:reviewer     # Code review
/sparc:designer     # UI/UX design (delegates to design swarm)
/sparc:debugger     # Debugging
/sparc:optimizer    # Performance optimization
```

## Design Rules (Always Enforced)

| Priority | Rule |
|----------|------|
| P1 | Color contrast minimum 4.5:1 (WCAG AA) |
| P1 | Visible focus rings on all interactive elements |
| P2 | Touch targets minimum 44x44px (iOS) / 48x48dp (Android) |
| P3 | Body text minimum 16px |
| P4 | No hardcoded hex — use CSS tokens (`var(--color-primary)`) |
| P5 | No emoji as icons — use SVG (Lucide, Heroicons) |
| P7 | Transitions 150-300ms, respect `prefers-reduced-motion` |
| P8 | Mobile-first breakpoints: 375 / 768 / 1024 / 1440 |

## Hooks

KynjalFlow configures Claude Code hooks automatically:

| Hook | What it does |
|------|-------------|
| `PreToolUse` | Security checks before Bash commands |
| `PostToolUse` | Auto-format after file edits |
| `UserPromptSubmit` | Routes tasks to optimal agents |
| `SessionStart` | Restores session state |
| `Stop` | Saves session on exit |
| `Notification` | Alerts on important events |

## Tips

- Run `kynjalflow init upgrade` after updating to get new agents/skills
- Use `--wizard` for first-time setup to understand all options
- The design swarm works best when UI UX Pro Max plugin is installed
- Check `.claude-flow/logs/` for agent execution logs
- Use `kynjalflow memory search` to find patterns from previous sessions
