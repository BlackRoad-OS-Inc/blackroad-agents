// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
import { describe, it, expect } from 'vitest'
import { Coordinator } from '../../src/orchestration/coordinator.js'
import type { AgentDefinition } from '../../src/schemas/agent.js'

const mockAgents: AgentDefinition[] = [
  {
    name: 'sec',
    title: 'Security',
    role: 'security',
    description: 'Handles security',
    color: '#F00',
    providers: ['anthropic'],
    maxTokens: 4096,
    capabilities: ['security', 'audit'],
    fallbackChain: ['anthropic'],
  },
  {
    name: 'ops',
    title: 'Operator',
    role: 'operations',
    description: 'Handles ops',
    color: '#0F0',
    providers: ['openai'],
    maxTokens: 4096,
    capabilities: ['deploy', 'automation'],
    fallbackChain: ['openai'],
  },
]

describe('Coordinator', () => {
  it('should assign a task to the best-matching agent', () => {
    const coord = new Coordinator(mockAgents)
    const agent = coord.assign({
      id: 't1',
      description: 'Run a security audit',
      requiredCapabilities: ['security'],
    })
    expect(agent.name).toBe('sec')
  })

  it('should assign by preferred agent', () => {
    const coord = new Coordinator(mockAgents)
    const agent = coord.assign({
      id: 't2',
      description: 'anything',
      preferredAgent: 'ops',
    })
    expect(agent.name).toBe('ops')
  })

  it('should record and retrieve task results', () => {
    const coord = new Coordinator(mockAgents)
    coord.recordResult({
      taskId: 't1',
      agentName: 'sec',
      status: 'success',
      output: 'Audit complete',
    })
    const result = coord.getResult('t1')
    expect(result).toBeDefined()
    expect(result!.status).toBe('success')
    expect(result!.output).toBe('Audit complete')
  })

  it('should return undefined for unknown task id', () => {
    const coord = new Coordinator(mockAgents)
    expect(coord.getResult('nonexistent')).toBeUndefined()
  })

  it('should track completed task count', () => {
    const coord = new Coordinator(mockAgents)
    expect(coord.completedTasks).toBe(0)

    coord.recordResult({ taskId: 't1', agentName: 'sec', status: 'success' })
    coord.recordResult({ taskId: 't2', agentName: 'ops', status: 'failure', error: 'timeout' })
    expect(coord.completedTasks).toBe(2)
  })

  it('should build a fallback chain', () => {
    const coord = new Coordinator(mockAgents)
    const chain = coord.buildFallbackChain(mockAgents)
    expect(chain.length).toBe(2)
    expect(chain.agents[0].name).toBe('sec')
  })

  it('should overwrite result for same task id', () => {
    const coord = new Coordinator(mockAgents)
    coord.recordResult({ taskId: 't1', agentName: 'sec', status: 'failure', error: 'first' })
    coord.recordResult({ taskId: 't1', agentName: 'ops', status: 'success', output: 'retry ok' })
    expect(coord.completedTasks).toBe(1)
    expect(coord.getResult('t1')!.status).toBe('success')
  })
})
