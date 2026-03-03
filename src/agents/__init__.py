"""
BlackRoad Agents
================
Six specialized AI agents that communicate through the BlackRoad Gateway
or directly via a local Ollama instance.

All agents are tokenless — they only talk to the gateway/Ollama,
never directly to cloud providers.

Usage (local Ollama):
    export OLLAMA_URL=http://localhost:11434
    from blackroad_agents import Lucidia

    agent = Lucidia()
    response = await agent.reason("What is the optimal agent topology for 30K concurrent tasks?")

Usage (BlackRoad Gateway):
    export BLACKROAD_GATEWAY_URL=http://127.0.0.1:8787
    from blackroad_agents import Lucidia, Alice, Octavia, Prism, Echo, Cipher

    agent = Lucidia()
    response = await agent.reason("What is the optimal agent topology for 30K concurrent tasks?")
"""
import os

# Resolve the backend URL: prefer explicit gateway, fall back to Ollama, then local gateway
def _resolve_backend_url() -> str:
    if gateway := os.getenv("BLACKROAD_GATEWAY_URL"):
        return gateway
    if ollama := os.getenv("OLLAMA_URL"):
        return ollama
    return "http://localhost:11434"  # default to local Ollama

BACKEND_URL = _resolve_backend_url()

from .lucidia import Lucidia
from .alice import Alice
from .octavia import Octavia
from .prism import Prism
from .echo import Echo
from .cipher import Cipher

__all__ = ["Lucidia", "Alice", "Octavia", "Prism", "Echo", "Cipher", "BACKEND_URL"]
__version__ = "0.1.0"

_AGENT_REGISTRY: dict[str, type] = {
    "lucidia": Lucidia,
    "alice": Alice,
    "octavia": Octavia,
    "prism": Prism,
    "echo": Echo,
    "cipher": Cipher,
}


def get_agent(name: str, **kwargs):
    """Factory: get an agent instance by name (case-insensitive)."""
    cls = _AGENT_REGISTRY.get(name.lower())
    if cls is None:
        available = ", ".join(_AGENT_REGISTRY.keys())
        raise ValueError(f"Unknown agent '{name}'. Available: {available}")
    return cls(**kwargs)


def list_agents() -> list[str]:
    """Return names of all registered agents."""
    return list(_AGENT_REGISTRY.keys())
