# @blackroad/agents

Agent definitions, personality prompts, and orchestration for BlackRoad OS.

## Overview

This package defines the six core BlackRoad agents, their personality prompts, orchestration logic (routing, fallback chains, coordination), and a CLI for interacting with them.

## Agents

| Agent | Title | Role |
|-------|-------|------|
| **Octavia** | The Architect | Systems design and strategy |
| **Lucidia** | The Dreamer | Creative vision and innovation |
| **Alice** | The Operator | DevOps, automation, reliability |
| **Cipher** | The Sentinel | Security, auditing, access control |
| **Prism** | The Analyst | Data analysis, pattern recognition |
| **Planner** | The Strategist | Multi-step coordination and planning |

## Installation

```bash
npm install
```

## Development

```bash
npm run typecheck   # Type-check without emitting
npm test            # Run tests
npm run format      # Format with Prettier
npm run build       # Build to dist/
```

## Structure

```
src/
  definitions/    # Agent definitions (name, capabilities, fallback chains)
  schemas/        # Zod schemas for validation
  prompts/
    agents/       # Personality prompts (one .md per agent)
    intents/      # Intent prompts (analyze, plan, architect, review, deploy, audit)
  orchestration/  # Router, fallback chain, coordinator
  cli/            # Commander-based CLI
test/             # Vitest test suites
```

## CLI Usage

```bash
# List all agents
npx tsx src/cli/index.ts list

# Invoke an agent
npx tsx src/cli/index.ts invoke octavia "Design a caching layer"

# Validate definitions
npx tsx src/cli/index.ts validate
```

## License

Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
Proprietary and confidential.
