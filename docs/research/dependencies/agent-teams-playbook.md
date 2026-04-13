# agent-teams-playbook - Dependency Research

## Repository

- **Owner**: KimYx0207
- **Repo**: https://github.com/KimYx0207/agent-teams-playbook
- **Install ID**: `agent-teams-playbook`

## Content

Multi-agent team orchestration methodology delivered as a SKILL.md file. Provides structured patterns for coordinating multiple AI agents in collaborative workflows.

## Format

- **Standard**: SKILL.md (AgentSkills open standard)
- **Structure**: Root-level SKILL.md in the repository
- **Subdir**: None (full repo clone)

## Cross-Platform Compatibility

| Platform | Compatible | Notes |
|----------|-----------|-------|
| Claude Code | Y | Primary target, contains optional `context: fork` |
| Codex | Y | SKILL.md universal format |
| OpenClaw | Y | SKILL.md universal format |
| Cursor | Y | SKILL.md universal format |

## Distribution Configuration

```json
{
  "id": "agent-teams-playbook",
  "repo": "${skillOwner}/agent-teams-playbook",
  "targets": ["claude", "codex", "openclaw", "cursor"]
}
```

## Install Method

- **All platforms**: `git clone --depth 1`
- No subdir extraction needed
- No platform-specific variants

## Special Notes

- Contains optional `context: fork` directive (only effective on Claude Code)
- `context: fork` is silently ignored by other platforms - no compatibility issue
- Part of the KimYx0207 skill ecosystem (same owner as Meta_Kim)

## Data Source

GitHub README analysis - 2026-04-13
