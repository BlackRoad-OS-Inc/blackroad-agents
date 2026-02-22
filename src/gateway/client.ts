// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
// Gateway client — all AI inference calls route through blackroad-core.
// Agents NEVER hold provider API keys. Trust boundary is the gateway.

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface ChatRequest {
  model: string
  messages: ChatMessage[]
  stream?: boolean
  temperature?: number
  maxTokens?: number
}

export interface ChatResponse {
  id: string
  model: string
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

export interface GatewayError {
  code: string
  message: string
  status: number
}

export class GatewayClient {
  private readonly baseUrl: string
  private readonly agentId: string

  constructor(agentId: string, gatewayUrl?: string) {
    this.agentId = agentId
    this.baseUrl = gatewayUrl ?? process.env["BLACKROAD_GATEWAY_URL"] ?? "http://127.0.0.1:8787"
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const res = await fetch(`${this.baseUrl}/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Agent-Id": this.agentId,
      },
      body: JSON.stringify(request),
    })

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as Partial<GatewayError>
      throw new Error(
        `Gateway error ${res.status}: ${err.message ?? res.statusText}`
      )
    }

    return res.json() as Promise<ChatResponse>
  }

  async health(): Promise<{ status: string; version: string; uptime: number }> {
    const res = await fetch(`${this.baseUrl}/health`)
    if (!res.ok) throw new Error(`Gateway unreachable: ${res.status}`)
    return res.json()
  }

  async listModels(): Promise<{ models: Array<{ id: string; provider: string }> }> {
    const res = await fetch(`${this.baseUrl}/v1/models`, {
      headers: { "X-Agent-Id": this.agentId },
    })
    if (!res.ok) throw new Error(`Failed to list models: ${res.status}`)
    return res.json()
  }
}

/** Convenience factory — reads BLACKROAD_GATEWAY_URL from env */
export function createGatewayClient(agentId: string): GatewayClient {
  return new GatewayClient(agentId)
}

