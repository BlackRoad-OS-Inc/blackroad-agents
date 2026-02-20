"""FastAPI application for BlackRoad Agent API."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="BlackRoad Agent API", version="0.1.0")

VERSION = "0.1.0"


class JobRequest(BaseModel):
    agent: str
    task: str
    payload: dict[str, Any] | None = None


@app.get("/health")
@app.get("/healthz")
def healthcheck() -> dict[str, Any]:
    return {
        "status": "ok",
        "service": "blackroad-agents",
        "version": VERSION,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/agents")
def list_agents() -> dict[str, Any]:
    return {"status": "ok", "agents": []}


@app.post("/jobs")
def submit_job(request: JobRequest) -> dict[str, Any]:
    return {
        "status": "ok",
        "job_id": None,
        "agent": request.agent,
        "task": request.task,
        "message": "Job submission not yet implemented",
    }
