# BlackRoad Agents - Copilot Instructions

## Project Overview

BlackRoad Agents defines the 6 core BlackRoad agents and the CECE portable identity system. All agent configs, prompts, coordination logic, and orchestration schemas live here.

**Key components:**

- **Agent definitions**: Per-agent personality prompts and configuration (`agents/`)
- **Coordination**: Multi-agent routing and orchestration (`coordination/`)
- **Registry**: Agent + hardware registry HTTP API (`registry/`)
- **Shared messaging**: Inter-agent inbox/outbox system (`shared/`)
- **CECE Identity**: Portable AI identity with relationship tracking

## Architecture

### Agent System

Six specialized agents communicate through the BlackRoad tokenless gateway:

- **LUCIDIA** (Philosopher / Coordinator) 🔴
- **ALICE** (Executor / Router) 🔵
- **OCTAVIA** (Operator / Compute) 🟢
- **PRISM** (Analyst / Patterns) 🟡
- **ECHO** (Librarian / Memory) 🟣
- **CIPHER** (Guardian / Security) ⚫

Agents are tokenless — they only talk to the BlackRoad Gateway, which owns all secrets and provider integrations.

### CECE Identity System

Portable AI identity with:

- Relationships tracking (bond strength, interactions)
- Experience memory with emotional impact
- Skill development and proficiency tracking
- Export/import to JSON for provider portability

## Build & Test Commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run typecheck    # Type-check without emitting
npm test             # Run unit tests (vitest)
npm run test:watch   # Watch mode
npm run test:e2e     # End-to-end tests
npm run lint         # Check formatting (prettier)
npm run format       # Auto-format (prettier)
```

## Key Conventions

### TypeScript Style

- Strict mode enabled
- ESM modules (`"type": "module"`)
- Prettier formatting: single quotes, no semicolons, trailing commas
- Zod for runtime validation schemas
- Commander for CLI parsing

### Agent Gateway Rules

- Agents NEVER embed API keys or provider URLs
- All provider communication goes through gateway at `http://127.0.0.1:8787`
- Gateway binds to localhost by default for security

### Project Structure

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

### Adding New Features

1. Define types/schemas in `src/schemas/`
2. Implement logic in `src/`
3. Add tests in `test/`
4. Run `npm run typecheck && npm test && npm run build`

## Environment Variables

- `BLACKROAD_GATEWAY_URL` — Gateway endpoint (default: http://127.0.0.1:8787)
- `BLACKROAD_GATEWAY_SECRET` — Gateway JWT secret
- `REGISTRY_PORT` — Agent registry port (default: 3001)
- `REGISTRY_HOST` — Registry bind address (default: 127.0.0.1)
- `AGENT_DB_PATH` — SQLite database path

## Security Considerations

- No tokens in agent code (gateway only)
- All vault secrets encrypted
- Audit logs for all secret access
- SSH keys must be 600 permissions
