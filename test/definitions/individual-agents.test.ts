// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
import { describe, it, expect } from 'vitest'
import { octavia } from '../../src/definitions/octavia.js'
import { lucidia } from '../../src/definitions/lucidia.js'
import { alice } from '../../src/definitions/alice.js'
import { cipher } from '../../src/definitions/cipher.js'
import { prism } from '../../src/definitions/prism.js'
import { planner } from '../../src/definitions/planner.js'
import type { AgentDefinition } from '../../src/schemas/agent.js'

const allAgents: AgentDefinition[] = [octavia, lucidia, alice, cipher, prism, planner]

describe('Individual agent definitions', () => {
  it('should have unique names', () => {
    const names = allAgents.map((a) => a.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('should have unique titles', () => {
    const titles = allAgents.map((a) => a.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('should all have valid hex color codes', () => {
    for (const agent of allAgents) {
      expect(agent.color).toMatch(/^#[0-9A-Fa-f]{3,8}$/)
    }
  })

  it('should have first provider in fallback chain', () => {
    for (const agent of allAgents) {
      expect(
        agent.fallbackChain.includes(agent.providers[0]),
        `${agent.name}: first provider "${agent.providers[0]}" not in fallbackChain`,
      ).toBe(true)
    }
  })

  it('should have positive maxTokens for all agents', () => {
    for (const agent of allAgents) {
      expect(agent.maxTokens).toBeGreaterThan(0)
    }
  })

  describe('octavia', () => {
    it('should be The Architect with architecture capability', () => {
      expect(octavia.title).toBe('The Architect')
      expect(octavia.capabilities).toContain('architecture')
    })
  })

  describe('lucidia', () => {
    it('should be The Dreamer with creative capability', () => {
      expect(lucidia.title).toBe('The Dreamer')
      expect(lucidia.capabilities).toContain('creative')
    })
  })

  describe('alice', () => {
    it('should be The Operator with devops capability', () => {
      expect(alice.title).toBe('The Operator')
      expect(alice.capabilities).toContain('devops')
    })
  })

  describe('cipher', () => {
    it('should be The Sentinel with security capability', () => {
      expect(cipher.title).toBe('The Sentinel')
      expect(cipher.capabilities).toContain('security')
    })
  })

  describe('prism', () => {
    it('should be The Analyst with analysis capability', () => {
      expect(prism.title).toBe('The Analyst')
      expect(prism.capabilities).toContain('analysis')
    })
  })

  describe('planner', () => {
    it('should be The Strategist with planning capability', () => {
      expect(planner.title).toBe('The Strategist')
      expect(planner.capabilities).toContain('planning')
    })

    it('should have the highest maxTokens', () => {
      const maxOthers = Math.max(...allAgents.filter((a) => a.name !== 'planner').map((a) => a.maxTokens))
      expect(planner.maxTokens).toBeGreaterThanOrEqual(maxOthers)
    })
  })
})
