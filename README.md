# blackroad-agents

> Agent definitions, prompts, CECE identity, and orchestration schemas for BlackRoad OS.

[![CI](https://github.com/BlackRoad-OS-Inc/blackroad-agents/actions/workflows/ci.yml/badge.svg)](https://github.com/BlackRoad-OS-Inc/blackroad-agents/actions/workflows/ci.yml)

## Overview

Defines the 8 BlackRoad agents, the CECE portable identity system, and the orchestration layer that routes tasks, manages fallbacks, and coordinates multi-agent workflows. All agent configs, prompts, schemas, and coordination logic live here.

## Agents

| Agent | Title | Role | Color |
|-------|-------|------|-------|
| **OCTAVIA** | The Architect | Systems design, strategy, architecture | `#9C27B0` |
| **LUCIDIA** | The Dreamer | Creative vision, planning | `#00BCD4` |
| **ALICE** | The Operator | DevOps, automation, infrastructure | `#22C55E` |
| **CIPHER** | The Sentinel | Security, encryption, access control | `#2979FF` |
| **PRISM** | The Analyst | Data analysis, pattern recognition | `#F5A623` |
| **ECHO** | The Librarian | Memory, recall, knowledge management | `#7AC2E0` |
| **ARIA** | The Interface | Frontend development, UX design | `#818CF8` |
| **PLANNER** | The Strategist | Task planning, decomposition, coordination | `#FFFFFF` |

## Architecture

```
blackroad-agents/
├── src/
│   ├── cli/              # CLI commands (list, invoke, validate)
│   ├── definitions/      # Agent definitions (8 agents)
│   ├── gateway/          # Tokenless AI gateway client
│   ├── orchestration/    # Task router, fallback chains, coordinator
│   ├── prompts/          # Agent & intent system prompts
│   ├── registry/         # HTTP API server (Hono)
│   └── schemas/          # Zod validation schemas
├── agents/               # Per-agent definition files
├── coordination/         # Multi-agent coordination logic
├── registry/             # Agent + hardware registries
├── scripts/              # Agent utility scripts
├── shared/               # Inter-agent messaging (inbox/outbox)
├── test/                 # Unit & E2E tests (Vitest)
└── worker/               # Cloudflare Worker deployment
```

## Key Features

- **Task Routing** — Capability-based routing with scoring to match tasks to the best agent
- **Fallback Chains** — Resilient execution across providers (e.g. Anthropic -> OpenAI -> Ollama)
- **Registry API** — HTTP server exposing agent definitions and a task marketplace
- **CECE Identity** — Portable AI identity persistent across providers
- **Gateway Client** — Tokenless AI inference through the blackroad-core gateway

## Registry API

The registry server exposes these endpoints:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check with agent/task counts |
| `GET` | `/agents` | List all agents |
| `GET` | `/agents/:name` | Get a specific agent |
| `POST` | `/agents/:name/task` | Dispatch a task to an agent |
| `POST` | `/route` | Smart task routing by capability |
| `POST` | `/tasks` | Create a marketplace task |
| `GET` | `/tasks` | List tasks (with `?status=` filter) |
| `GET` | `/tasks/:id` | Get task details |
| `PATCH` | `/tasks/:id` | Claim or complete a task |

## CECE Identity

`cece-profile.json` defines the portable CECE identity — persistent across providers.

```bash
br cece whoami              # Show identity
br cece relationship list   # List relationships
br cece export              # Export to JSON
```

## Quick Start

```bash
npm install                 # Install dependencies
npm test                    # Run unit tests
npm run test:e2e            # Run E2E tests
npm run typecheck           # Type check
npm run build               # Compile TypeScript
npm run dev:registry        # Start registry in dev mode
```

## Stack

- **Runtime:** Node.js 22 / TypeScript 5
- **Validation:** Zod
- **CLI:** Commander
- **HTTP:** Hono + @hono/node-server
- **Tests:** Vitest

## Environment Variables

See `.env.example` for all available configuration:

| Variable | Default | Description |
|----------|---------|-------------|
| `REGISTRY_PORT` | `3001` | Registry API port |
| `REGISTRY_HOST` | `0.0.0.0` | Registry bind address |
| `BLACKROAD_GATEWAY_URL` | `http://127.0.0.1:8787` | AI gateway URL |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

© BlackRoad OS, Inc. — All rights reserved. Proprietary.
