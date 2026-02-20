# blackroad-agents

Agent definitions, prompts, and orchestration schemas for BlackRoad OS.

## Quick Start

```bash
pip install -r requirements.txt
python server.py              # Start server on :8080
pytest tests/ -v              # Run tests
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/agents` | List agents |
| POST | `/jobs` | Submit agent job |

## Deployment

Deploys to Railway on push to `main`. See `railway.toml` for config.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | Server port |

## License

Proprietary - BlackRoad OS, Inc. All rights reserved.
