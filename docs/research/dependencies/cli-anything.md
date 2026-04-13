# cli-anything - Dependency Research

## Repository

- **Owner**: HKUDS (The University of Hong Kong, Data Science)
- **Repo**: https://github.com/HKUDS/CLI-Anything
- **Install ID**: `cli-anything`
- **Stars**: 30K+

## Content

Framework for making any software tool or CLI application agent-native. Transforms traditional CLI tools into AI-agent-compatible interfaces that can be invoked and orchestrated by coding agents.

## Format

- **Standard**: SKILL.md (AgentSkills open standard)
- **Structure**: Root-level content in the repository
- **Subdir**: None (full repo clone)

## Cross-Platform Compatibility

| Platform | Compatible | Notes |
|----------|-----------|-------|
| Claude Code | Y | Primary target |
| Codex | Y | Explicitly supported |
| OpenClaw | Y | Explicitly supported |
| Copilot | Y | Listed in README |
| OpenCode | Y | Listed in README |
| Pi | Y | Listed in README |

## Distribution Configuration

```json
{
  "id": "cli-anything",
  "repo": "HKUDS/CLI-Anything",
  "targets": ["claude", "codex", "openclaw", "cursor"]
}
```

## Install Method

- **All platforms**: `git clone --depth 1`
- No subdir extraction needed
- Has per-platform install scripts in the repository

## Special Notes

- Academic project from HKU Data Science lab
- Has per-platform installer scripts (platform-specific installation automation)
- Broad agent compatibility (6+ platforms documented)
- 30K+ stars indicates strong community adoption
- No subdir configuration needed - straightforward clone

## Data Source

- GitHub README: full content analysis
- HKUDS/CLI-Anything repository
- `config/skills.json` manifest analysis

Research date: 2026-04-13
