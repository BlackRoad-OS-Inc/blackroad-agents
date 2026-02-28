# Contributing to BlackRoad Agents

> **All contributions are proprietary work-for-hire owned exclusively by BlackRoad OS, Inc.**

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behaviors:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behaviors:**

- Trolling, insulting comments, personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct which could be considered inappropriate

---

## Getting Started

### Types of Contributions

| Type             | Description             | Difficulty  |
| ---------------- | ----------------------- | ----------- |
| 🐛 Bug fixes     | Fix reported issues     | Easy-Medium |
| 📝 Documentation | Improve docs, fix typos | Easy        |
| ✨ Features      | Add new functionality   | Medium-Hard |
| 🧪 Tests         | Add test coverage       | Medium      |
| 🔧 Tooling       | Improve dev experience  | Medium      |

### Good First Issues

Look for issues labeled:

- `good first issue` - Great for newcomers
- `help wanted` - We need help!
- `documentation` - Doc improvements
- `bug` - Confirmed bugs

---

## Development Setup

### Prerequisites

```bash
# Required
node >= 22.0.0
```

### Clone & Install

```bash
# Clone the repository
git clone https://github.com/BlackRoad-OS-Inc/blackroad-agents.git
cd blackroad-agents

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Verify setup
npm run typecheck && npm test
```

---

## Making Changes

### Branch Naming

```
feat/short-description       # New features
fix/issue-number-description # Bug fixes
docs/what-changed            # Documentation
refactor/what-changed        # Code refactoring
test/what-testing            # Test additions
chore/description            # Maintenance
```

### Commit Messages

Follow [Conventional Commits](https://conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**

```
feat(agents): add task retry mechanism

fix(registry): resolve race condition in task queue
Closes #123

docs(readme): update installation instructions
```

### Code Changes Workflow

```
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Update documentation
6. Run linting & tests
7. Commit with good messages
8. Push to your fork
9. Open a Pull Request
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### Review Process

1. **Automated checks** run (lint, test, build)
2. **Code review** by maintainer
3. **Changes requested** or **approved**
4. **Merged** to main branch

---

## Coding Standards

### TypeScript

```typescript
// Use TypeScript strict mode
// Prefer const over let
// Use async/await over callbacks
// Document public APIs with JSDoc

/**
 * Creates a new agent with the specified configuration.
 * @param config - Agent configuration options
 * @returns The created agent instance
 */
export async function createAgent(config: AgentConfig): Promise<Agent> {
  // Implementation
}
```

### General Guidelines

- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **YAGNI**: You Aren't Gonna Need It
- **Single Responsibility**: One thing per function/class
- **Meaningful Names**: Clear, descriptive identifiers

### Code Style

- Prettier for formatting (`.prettierrc` at repo root)
- Single quotes, no semicolons, trailing commas
- No secrets or credentials in code

---

## Testing Guidelines

### Test Structure

```
test/
├── definitions/    # Agent definition tests
├── schemas/        # Schema validation tests
├── orchestration/  # Router & fallback tests
├── registry/       # Registry API tests
└── e2e/            # End-to-end tests
```

### Writing Tests

```typescript
describe('Agent', () => {
  describe('createAgent', () => {
    it('should create agent with valid config', async () => {
      const config = { name: 'test', type: 'worker' }
      const agent = await createAgent(config)
      expect(agent.name).toBe('test')
    })

    it('should throw error with invalid config', async () => {
      const config = { name: '' }
      await expect(createAgent(config)).rejects.toThrow('Invalid config')
    })
  })
})
```

---

## Documentation

### What to Document

- **README.md**: Project overview, quick start
- **CLAUDE.md**: AI assistant guidance
- **Code comments**: Complex logic only

### Documentation Style

- Use clear, concise language
- Include code examples
- Keep examples up to date
- Use proper formatting

---

## Community

### Communication Channels

| Channel            | Purpose               |
| ------------------ | --------------------- |
| GitHub Issues      | Bug reports, features |
| GitHub Discussions | Questions, ideas      |
| Email              | Private matters       |

### Getting Help

1. Check existing documentation
2. Search GitHub issues
3. Open a new issue

---

## License

By contributing, you agree that your contributions will be licensed under the project's proprietary license.

---

© BlackRoad OS, Inc. — All rights reserved. Proprietary.
