# KynjalFlow Installation Guide

## Prerequisites

- **Node.js** 20.0.0 or higher
- **pnpm** (recommended) or npm
- **Python 3** (for UI UX Pro Max search engine)
- **Claude Code** (latest version with plugin support)

## Quick Install

```bash
pnpm add -g kynjalflow@latest
```

Verify installation:

```bash
kynjalflow --help
```

## Initialize a Project

Navigate to your project directory and run:

```bash
cd /path/to/your/project
kynjalflow init --full --start-all --force
```

### Init Modes

| Flag | What it does |
|------|-------------|
| `--full` | All agents (103), skills (34), commands, hooks, runtime |
| `--minimal` | Core agents only, basic skills, no hooks |
| (no flag) | Default — core + design + common agents, hooks enabled |
| `--force` | Overwrite existing configuration |
| `--start-all` | Auto-start daemon, memory, and swarm after init |
| `--with-embeddings` | Initialize ONNX embedding subsystem |
| `--wizard` | Interactive setup — choose what to install |

### What Gets Created

```
your-project/
├── .claude/
│   ├── settings.json          # Hooks, permissions, MCP config
│   ├── agents/                # 103 agent definitions
│   │   ├── core/              # coder, tester, reviewer, planner, researcher
│   │   ├── design/            # design-architect, ux-researcher, ui-developer, accessibility-auditor
│   │   ├── github/            # PR manager, issue tracker, code review swarm
│   │   ├── sparc/             # SPARC methodology agents
│   │   ├── swarm/             # Swarm coordinators
│   │   └── ...                # 20+ agent categories
│   ├── skills/                # 34 skills
│   │   ├── ui-ux-pro-max/     # Design intelligence search engine
│   │   ├── swarm-orchestration/
│   │   ├── sparc-methodology/
│   │   └── ...
│   ├── helpers/               # Statusline, router, hooks
│   └── commands/              # CLI slash commands
├── .claude-flow/              # Runtime data
│   ├── config.yaml            # Swarm topology, agent limits
│   ├── data/                  # Memory, patterns, metrics
│   ├── logs/                  # Agent and session logs
│   └── sessions/              # Session state
└── .mcp.json                  # MCP server configuration
```

## Install UI UX Pro Max Plugin

The design agents rely on the UI UX Pro Max plugin for search. Install it inside Claude Code:

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
/reload-plugins
```

## Add MCP Server

KynjalFlow init auto-configures the MCP server. To add it manually:

```bash
claude mcp add claude-flow -- npx -y kynjalflow mcp start
```

## Update

```bash
pnpm add -g kynjalflow@latest
```

Then in your project:

```bash
kynjalflow init upgrade
```

This updates helpers and adds new agents/skills without overwriting your existing config.

## Uninstall

```bash
# Remove from global
pnpm remove -g kynjalflow

# Remove from a project (optional)
rm -rf .claude-flow .kynjalflow .claude/agents .claude/skills .claude/helpers
```

## Troubleshooting

### `command not found: kynjalflow`

Ensure pnpm global bin is in your PATH:

```bash
pnpm bin -g
# Add the output to your PATH in ~/.zshrc or ~/.bashrc
```

### Network errors during install

Retry with extended timeout:

```bash
pnpm add -g kynjalflow@latest --network-timeout 60000
```

### Peer dependency warnings

These come from transitive dependencies and are harmless. Silence them:

```bash
pnpm config set strict-peer-dependencies false
```

### SyntaxError on startup

Ensure Node.js 20+ is installed:

```bash
node --version  # Should be v20.x.x or higher
```
