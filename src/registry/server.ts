// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
// Registry HTTP API — exposes agent definitions and task dispatch.
// Consumed by blackroad-web dashboard and br CLI.

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { z } from 'zod'
import { agents, getAgent } from '../definitions/index.js'
import { TaskRouter } from '../orchestration/router.js'
import { createGatewayClient } from '../gateway/client.js'

const PORT = parseInt(process.env.REGISTRY_PORT ?? '3001', 10)
const HOST = process.env.REGISTRY_HOST ?? '127.0.0.1'
const startTime = Date.now()

const router = new TaskRouter()

const TaskRequestSchema = z.object({
  task: z.string().min(1),
  intent: z.string().optional(),
  requiredCapabilities: z.array(z.string()).optional(),
  context: z.record(z.unknown()).optional(),
})

const app = new Hono()

// ─── Health ─────────────────────────────────────────────────────────────────

app.get('/health', (c) =>
  c.json({
    status: 'healthy',
    service: 'blackroad-agents-registry',
    version: '0.1.0',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    agentCount: agents.size,
  }),
)

// ─── Agents ─────────────────────────────────────────────────────────────────

app.get('/agents', (c) => {
  const list = Array.from(agents.values()).map((a) => ({
    name: a.name,
    title: a.title,
    role: a.role,
    description: a.description,
    capabilities: a.capabilities,
    providers: a.providers,
    status: 'available' as const,
  }))
  return c.json({ agents: list, count: list.length })
})

app.get('/agents/:name', (c) => {
  const name = c.req.param('name')
  const agent = getAgent(name)
  if (!agent) {
    return c.json({ error: { code: 'AGENT_NOT_FOUND', message: `Agent '${name}' not found` } }, 404)
  }
  return c.json({ ...agent, status: 'available' as const })
})

// ─── Task Dispatch ───────────────────────────────────────────────────────────

app.post('/agents/:name/task', async (c) => {
  const agentName = c.req.param('name')
  const agent = getAgent(agentName)
  if (!agent) {
    return c.json({ error: { code: 'AGENT_NOT_FOUND', message: `Agent '${agentName}' not found` } }, 404)
  }

  const body = await c.req.json()
  const parsed = TaskRequestSchema.safeParse(body)
  if (!parsed.success) {
    return c.json(
      { error: { code: 'VALIDATION_ERROR', message: parsed.error.issues.map((i) => i.message).join(', ') } },
      400,
    )
  }

  const { task, context } = parsed.data
  const gatewayClient = createGatewayClient(agentName)

  const systemPrompt = `You are ${agent.title} (${agent.name}). ${agent.description}. Your role: ${agent.role}.`
  const userMessage = context
    ? `Context: ${JSON.stringify(context)}\n\nTask: ${task}`
    : `Task: ${task}`

  const response = await gatewayClient.chat({
    model: agent.providers[0] === 'ollama' ? 'qwen2.5:7b' : `${agent.providers[0]}-default`,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
  })

  return c.json({
    agent: agentName,
    task,
    result: response.content,
    model: response.model,
    provider: response.provider ?? agent.providers[0],
    usage: response.usage,
  })
})

// ─── Route — smart task routing ─────────────────────────────────────────────

app.post('/route', async (c) => {
  const body = await c.req.json()
  const parsed = TaskRequestSchema.safeParse(body)
  if (!parsed.success) {
    return c.json(
      { error: { code: 'VALIDATION_ERROR', message: parsed.error.issues.map((i) => i.message).join(', ') } },
      400,
    )
  }

  const decision = router.route({
    task: parsed.data.task,
    requiredCapabilities: parsed.data.requiredCapabilities,
  })

  return c.json({
    routed_to: decision.agent.name,
    score: decision.score,
    reason: decision.reason,
    agent: decision.agent,
  })
})

// ─── Start ───────────────────────────────────────────────────────────────────

serve({ fetch: app.fetch, port: PORT, hostname: HOST }, (info) => {
  console.log(`[blackroad-agents] Registry listening on http://${info.address}:${info.port}`)
  console.log(`[blackroad-agents] ${agents.size} agents loaded`)
})

export { app }
