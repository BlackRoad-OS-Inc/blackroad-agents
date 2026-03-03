# blackroad-agents

> Agent definitions, prompts, CECE identity, and orchestration schemas for BlackRoad OS.

[![CI](https://github.com/BlackRoad-OS-Inc/blackroad-agents/actions/workflows/ci.yml/badge.svg)](https://github.com/BlackRoad-OS-Inc/blackroad-agents/actions/workflows/ci.yml)
[![Pages](https://github.com/BlackRoad-OS-Inc/blackroad-agents/actions/workflows/pages.yml/badge.svg)](https://blackroad-os-inc.github.io/blackroad-agents/)
[![Ollama](https://img.shields.io/badge/Ollama-local%20AI-blue)](https://ollama.com)
[![Node](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs)](https://nodejs.org)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab?logo=python)](https://www.python.org)

📖 **[Live Docs →](https://blackroad-os-inc.github.io/blackroad-agents/)**

## Overview

Defines the 6 core BlackRoad agents and the CECE portable identity system. All agent configs, prompts, and coordination logic live here. Agents run **locally via [Ollama](https://ollama.com)** or connect to the BlackRoad Gateway.

## Core Agents

| Agent | Role | Color |
|-------|------|-------|
| **LUCIDIA** | Philosopher / Coordinator | 🔴 |
| **ALICE** | Executor / Router | 🔵 |
| **OCTAVIA** | Operator / Compute | 🟢 |
| **PRISM** | Analyst / Patterns | 🟡 |
| **ECHO** | Librarian / Memory | 🟣 |
| **CIPHER** | Guardian / Security | ⚫ |

## Quick Start — Local Ollama

### 1. Install Ollama

```bash
# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# macOS (Homebrew)
brew install ollama
```

### 2. Pull a model

```bash
ollama pull llama3.2          # general purpose (~2 GB)
ollama pull qwen2.5:3b        # Pi-friendly lightweight
ollama pull qwen2.5:7b        # balanced quality/speed
```

### 3. Clone & configure

```bash
git clone https://github.com/BlackRoad-OS-Inc/blackroad-agents.git
cd blackroad-agents
cp .env.example .env
# Edit .env — set OLLAMA_URL=http://localhost:11434
```

### 4. Run (TypeScript Registry)

```bash
npm install
npm test           # Run tests
npm run build      # Compile TypeScript
npm start          # Start registry on http://localhost:3001
```

### 5. Run (Python Agents)

```bash
pip install httpx

# Agents auto-detect Ollama via OLLAMA_URL env var
export OLLAMA_URL=http://localhost:11434

python3 - <<'EOF'
import asyncio, os
from src.agents import Lucidia

async def main():
    agent = Lucidia(model="llama3.2")
    reply = await agent.chat("What is the meaning of intelligence?")
    print(reply)

asyncio.run(main())
EOF
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OLLAMA_URL` | `http://localhost:11434` | Local Ollama instance |
| `BLACKROAD_GATEWAY_URL` | — | BlackRoad gateway (overrides Ollama if set) |
| `REGISTRY_PORT` | `3001` | Agent registry HTTP port |

> Agents resolve their backend in order: `BLACKROAD_GATEWAY_URL` → `OLLAMA_URL` → `http://localhost:11434`

## Structure

```
blackroad-agents/
├── src/             # Agent runtime source (TypeScript + Python)
│   ├── agents/      # Python agent implementations (Lucidia, Alice, …)
│   ├── definitions/ # TypeScript agent definitions
│   ├── registry/    # Registry HTTP API (Hono)
│   └── prompts/     # Agent + intent prompt files
├── docs/            # GitHub Pages site
├── modelfiles/      # Ollama Modelfiles for custom agents
├── coordination/    # Multi-agent coordination logic
├── scripts/         # Utility scripts
├── test/            # Test suite (Vitest)
└── worker/          # Cloudflare Worker edge deployment
```

## Ollama Modelfiles

The `modelfiles/` directory contains pre-built Ollama Modelfiles for all BlackRoad agents:

```bash
# Build a custom BlackRoad agent model
ollama create blackroad-analyst -f modelfiles/blackroad-analyst.Modelfile
ollama run blackroad-analyst
```

## CECE Identity

`cece-profile.json` defines the portable CECE identity — persistent across providers.

```bash
br cece whoami              # Show identity
br cece relationship list   # List relationships
br cece export              # Export to JSON
```

## Recommended Models (Ollama)

| Model | Size | Best for |
|-------|------|----------|
| `llama3.2` | ~2 GB | General purpose |
| `qwen2.5:3b` | ~1.9 GB | Pi / low-RAM devices |
| `qwen2.5:7b` | ~4.4 GB | Balanced quality |
| `mistral` | ~4.1 GB | Code & analysis |
| `deepseek-r1:7b` | ~4.7 GB | Reasoning tasks |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

© BlackRoad OS, Inc. — All rights reserved. Proprietary.

