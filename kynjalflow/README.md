# KynjalFlow

Personal AI agent orchestration platform. Deploy 60+ specialized agents in coordinated swarms with self-learning, fault-tolerant consensus, vector memory, MCP integration, and built-in UI/UX design intelligence.

## Install

```bash
# Quick start
npx kynjalflow init --wizard

# Global install
npm install -g kynjalflow

# Add as MCP server
claude mcp add kynjalflow -- npx -y kynjalflow mcp start
```

## Usage

```bash
kynjalflow init --wizard          # Initialize project
kynjalflow agent spawn -t coder   # Spawn an agent
kynjalflow swarm init             # Start a swarm
kynjalflow memory search -q "..."  # Search vector memory
kynjalflow doctor                 # System diagnostics
```

## UI/UX Design Intelligence

KynjalFlow includes the full UI UX Pro Max design system — BM25 search across 50+ styles,
161 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types.

```bash
# Generate a design system for your project
python3 src/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system -p "MyApp" --persist

# Search design patterns
python3 src/ui-ux-pro-max/scripts/search.py "fintech" --domain color
```

## Documentation

Full documentation: [github.com/KingJune28/claude-flow](https://github.com/KingJune28/claude-flow)

## License

MIT
