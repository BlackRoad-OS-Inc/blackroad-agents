"""Tests for the BlackRoad Agent API."""

from fastapi.testclient import TestClient
from agent.api import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "blackroad-agents"


def test_healthz():
    response = client.get("/healthz")
    assert response.status_code == 200


def test_list_agents():
    response = client.get("/agents")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data["agents"], list)


def test_submit_job():
    response = client.post("/jobs", json={
        "agent": "test-agent",
        "task": "test-task",
    })
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["agent"] == "test-agent"
