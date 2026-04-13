# gstack - Dependency Research

## Repository

- **Owner**: garrytan
- **Repo**: https://github.com/garrytan/gstack
- **Install ID**: `gstack`

## Content

Garry Tan's 23-tool development setup. A curated collection of 23 essential development tools and configurations for AI-assisted coding. Created by Garry Tan, President of Y Combinator.

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
| Cursor | Y | Explicitly supported, `~/.cursor/skills/gstack-*/` documented |
| OpenCode | Y | Listed in README |
| Factory | Y | Listed in README |
| Slate | Y | Listed in README |
| Kiro | Y | Listed in README |

Most broadly documented platform support among all dependencies (8 platforms).

## Distribution Configuration

```json
{
  "id": "gstack",
  "repo": "garrytan/gstack",
  "targets": ["claude", "codex", "openclaw", "cursor"]
}
```

## Install Method

- **All platforms**: `git clone --depth 1`
- No subdir extraction needed
- README documents per-platform install command: `./setup --host <name>`

## Special Notes

- **Key evidence for Cursor skill support**: README explicitly documents `~/.cursor/skills/gstack-*/` as the Cursor install path
- Created by Garry Tan (YC President) - high-trust, well-maintained project
- 23-tool suite covering essential dev workflows
- Broadest explicit platform documentation among all dependencies
- This project was a key data point confirming Cursor's AgentSkills support

## Data Source

- GitHub README: full content analysis
- garrytan/gstack repository
- `config/skills.json` manifest analysis

Research date: 2026-04-13
