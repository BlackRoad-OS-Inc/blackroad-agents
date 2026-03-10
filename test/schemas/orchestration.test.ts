// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
import { describe, it, expect } from 'vitest'
import { TaskSchema, TaskResultSchema, RoutingDecisionSchema } from '../../src/schemas/orchestration.js'

describe('TaskSchema', () => {
  it('should validate a complete task', () => {
    const result = TaskSchema.safeParse({
      id: 'task-1',
      description: 'Deploy the service',
      intent: 'deployment',
      requiredCapabilities: ['deploy'],
      maxTokens: 4096,
    })
    expect(result.success).toBe(true)
  })

  it('should validate a minimal task (optional fields omitted)', () => {
    const result = TaskSchema.safeParse({
      id: 'task-2',
      description: 'Do something',
    })
    expect(result.success).toBe(true)
  })

  it('should reject missing id', () => {
    const result = TaskSchema.safeParse({ description: 'No id' })
    expect(result.success).toBe(false)
  })

  it('should reject missing description', () => {
    const result = TaskSchema.safeParse({ id: 'task-3' })
    expect(result.success).toBe(false)
  })
})

describe('TaskResultSchema', () => {
  it('should validate a valid task result', () => {
    const result = TaskResultSchema.safeParse({
      taskId: 'task-1',
      agentName: 'octavia',
      provider: 'anthropic',
      content: 'Task completed successfully',
      success: true,
    })
    expect(result.success).toBe(true)
  })

  it('should reject missing agentName', () => {
    const result = TaskResultSchema.safeParse({
      taskId: 'task-1',
      provider: 'anthropic',
      content: 'done',
      success: true,
    })
    expect(result.success).toBe(false)
  })

  it('should reject missing success field', () => {
    const result = TaskResultSchema.safeParse({
      taskId: 'task-1',
      agentName: 'octavia',
      provider: 'anthropic',
      content: 'done',
    })
    expect(result.success).toBe(false)
  })

  it('should reject non-boolean success', () => {
    const result = TaskResultSchema.safeParse({
      taskId: 'task-1',
      agentName: 'octavia',
      provider: 'anthropic',
      content: 'done',
      success: 'yes',
    })
    expect(result.success).toBe(false)
  })
})

describe('RoutingDecisionSchema', () => {
  it('should validate a valid routing decision', () => {
    const result = RoutingDecisionSchema.safeParse({
      agentName: 'octavia',
      provider: 'anthropic',
      reason: 'Best capability match',
    })
    expect(result.success).toBe(true)
  })

  it('should reject missing reason', () => {
    const result = RoutingDecisionSchema.safeParse({
      agentName: 'octavia',
      provider: 'anthropic',
    })
    expect(result.success).toBe(false)
  })
})
