# blackroad-agents

> Agent definitions, prompts, CECE identity, and orchestration schemas for BlackRoad OS.

[![CI](https://github.com/BlackRoad-OS-Inc/blackroad-agents/actions/workflows/ci.yml/badge.svg)](https://github.com/BlackRoad-OS-Inc/blackroad-agents/actions/workflows/ci.yml)

## Overview

Defines the 6 core BlackRoad agents and the CECE portable identity system. All agent configs, prompts, and coordination logic live here.

## Core Agents

| Agent       | Role                      | Color |
| ----------- | ------------------------- | ----- |
| **LUCIDIA** | Philosopher / Coordinator | 🔴    |
| **ALICE**   | Executor / Router         | 🔵    |
| **OCTAVIA** | Operator / Compute        | 🟢    |
| **PRISM**   | Analyst / Patterns        | 🟡    |
| **ECHO**    | Librarian / Memory        | 🟣    |
| **CIPHER**  | Guardian / Security       | ⚫    |

## Structure

```
blackroad-agents/
├── src/             # Agent runtime source (TypeScript)
├── agents/          # Per-agent definitions & prompts
├── coordination/    # Multi-agent coordination logic
├── registry/        # Agent + hardware registries
├── scripts/         # Agent utility scripts (RPG, conductor, etc.)
├── shared/          # Inter-agent messaging (inbox/outbox)
└── test/            # Test suite
```

## CECE Identity

`cece-profile.json` defines the portable CECE identity — persistent across providers.

```bash
br cece whoami         # Show identity
br cece relationship list  # List relationships
br cece export         # Export to JSON
```

## Quick Start

```bash
npm install
npm test           # Run tests
npm run build      # Compile TypeScript
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

© BlackRoad OS, Inc. — All rights reserved. Proprietary.
