# skill-creator - Dependency Research

## Repository

- **Owner**: anthropics
- **Repo**: https://github.com/anthropics/skills
- **Install ID**: `skill-creator`
- **Note**: The repo is `anthropics/skills` but only the `skills/skill-creator/` subdir is extracted

## Content

Anthropic's official skill template and specification reference. Provides the canonical SKILL.md template, best practices for skill authoring, and the AgentSkills open standard specification.

## Format

- **Standard**: SKILL.md (AgentSkills open standard) - this IS the specification reference
- **Structure**: Content lives in `skills/skill-creator/` subdirectory of the `anthropics/skills` monorepo
- **Subdir**: `skills/skill-creator`

## Cross-Platform Compatibility

| Platform | Compatible | Notes |
|----------|-----------|-------|
| Claude Code | Y | Author's own platform |
| Codex | Y | Universal SKILL.md standard |
| OpenClaw | Y | Universal SKILL.md standard |
| Cursor | Y | Universal SKILL.md standard |

This project defines the AgentSkills standard that all platforms adopt.

## Distribution Configuration

```json
{
  "id": "skill-creator",
  "repo": "anthropics/skills",
  "subdir": "skills/skill-creator",
  "targets": ["claude", "codex", "openclaw", "cursor"]
}
```

## Install Method

- **All platforms**: Sparse checkout from `skills/skill-creator/` subdir
- The `anthropics/skills` repo contains multiple skill templates; only `skill-creator` is extracted
- Uses `installGitSkillFromSubdir()` or the dedicated `installSkillCreator()` function

## Special Notes

- Published by Anthropic (creators of Claude) - authoritative source
- This repo IS the AgentSkills specification reference
- The monorepo contains other skills too, but Meta_Kim only extracts `skill-creator`
- The `installSkillCreator()` function in `install-global-skills-all-runtimes.mjs` is a fallback for when the manifest doesn't include skill-creator (legacy compatibility)
- Since the manifest now includes it, the generic `installGitSkillFromSubdir()` path is used instead

## Data Source

- GitHub repository: anthropics/skills
- SKILL.md specification content
- `config/skills.json` manifest analysis
- Install script code analysis

Research date: 2026-04-13
