# CLAUDE.md — blackroad-agents

This file provides guidance to Cecilia Code (BlackRoad OS AI development) when working with code in this repository.

---

## Project Overview

Agent definitions, personality prompts, CECE identity, and orchestration schemas for BlackRoad OS.

**Stack:** Node.js 22 / TypeScript 5 / Zod / Commander / Vitest / Hono

## Build & Test Commands

```bash
npm run build        # Compile TypeScript
npm run typecheck    # Type-check without emitting
npm test             # Run unit tests (vitest)
npm run test:watch   # Watch mode
npm run test:e2e     # End-to-end tests
npm run lint         # Check formatting (prettier)
npm run format       # Auto-format (prettier)
```

## Conventions

- TypeScript strict mode, ESM (`"type": "module"`)
- Prettier: single quotes, no semicolons, trailing commas
- Zod schemas for runtime validation
- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)

## Structure

```
blackroad-agents/
├── src/             # Agent runtime source (TypeScript)
├── agents/          # Per-agent definitions & prompts
├── coordination/    # Multi-agent coordination logic
├── registry/        # Agent + hardware registries
├── scripts/         # Agent utility scripts
├── shared/          # Inter-agent messaging (inbox/outbox)
├── test/            # Test suite
└── worlds/          # World definitions
```

## Adding New Features

1. Define types/schemas in `src/schemas/`
2. Implement logic in `src/`
3. Add tests in `test/`
4. Run `npm run typecheck && npm test && npm run build`

## Environment Variables

See `.env.example` for all configuration options.

---

_© 2026 BlackRoad OS, Inc. All rights reserved._
