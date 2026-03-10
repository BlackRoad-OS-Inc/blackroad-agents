// Copyright (c) 2025-2026 BlackRoad OS, Inc. All Rights Reserved.
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { program } from '../../src/cli/index.js'

describe('CLI commands', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should register list, invoke, and validate commands', () => {
    const commandNames = program.commands.map((c) => c.name())
    expect(commandNames).toContain('list')
    expect(commandNames).toContain('invoke')
    expect(commandNames).toContain('validate')
  })

  it('should have correct program name and version', () => {
    expect(program.name()).toBe('blackroad-agents')
    expect(program.version()).toBe('0.1.0')
  })

  it('list command should support --json option', () => {
    const listCmd = program.commands.find((c) => c.name() === 'list')
    expect(listCmd).toBeDefined()
    const jsonOpt = listCmd!.options.find((o) => o.long === '--json')
    expect(jsonOpt).toBeDefined()
  })

  it('invoke command should require agent and task arguments', () => {
    const invokeCmd = program.commands.find((c) => c.name() === 'invoke')
    expect(invokeCmd).toBeDefined()
    // Commander stores registered arguments
    const args = invokeCmd!.registeredArguments ?? []
    expect(args.length).toBe(2)
  })

  it('list --json should output valid JSON', () => {
    const listCmd = program.commands.find((c) => c.name() === 'list')
    expect(listCmd).toBeDefined()

    const logs: string[] = []
    vi.spyOn(console, 'log').mockImplementation((...args: unknown[]) => {
      logs.push(String(args[0]))
    })

    listCmd!.parseAsync(['--json'], { from: 'user' })

    const output = logs.join('')
    const parsed = JSON.parse(output)
    expect(Array.isArray(parsed)).toBe(true)
    expect(parsed.length).toBe(6)
    expect(parsed[0]).toHaveProperty('name')
    expect(parsed[0]).toHaveProperty('capabilities')
  })
})
