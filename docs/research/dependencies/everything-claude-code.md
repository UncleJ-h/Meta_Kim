# everything-claude-code - Dependency Research

## Repository

- **Owner**: affaan-m
- **Repo**: https://github.com/affaan-m/everything-claude-code
- **Install ID**: `everything-claude-code`
- **Stars**: 140K+ (one of the most popular Claude Code ecosystem projects)

## Content

The most comprehensive Claude Code optimization framework available. Contains:

- **38 agent templates**: Pre-built agent configurations for various development tasks
- **156 skills**: Skill definitions covering development workflows, code review, testing, deployment
- **Development harness**: Optimization patterns for AI-assisted coding

## Format

- **Standard**: SKILL.md (AgentSkills open standard)
- **Structure**: Content lives in the `skills/` subdirectory of the repository
- **Subdir**: `skills` (configured via `subdir` field)

## Cross-Platform Compatibility

| Platform | Compatible | Notes |
|----------|-----------|-------|
| Claude Code | Y | Primary target |
| Codex | Y | Explicitly supported |
| Cursor | Y | Explicitly supported |
| OpenCode | Y | Listed in README |
| Gemini | Y | Listed in README |

## Distribution Configuration

```json
{
  "id": "everything-claude-code",
  "repo": "affaan-m/everything-claude-code",
  "subdir": "skills",
  "targets": ["claude", "codex", "openclaw", "cursor"]
}
```

## Install Method

- **All platforms**: Sparse checkout from `skills/` subdir
- Uses `installGitSkillFromSubdir()` which performs:
  1. `git clone --depth 1 --filter=blob:none --sparse`
  2. `git sparse-checkout set skills`
  3. Copy extracted subdir to target skill directory

## Special Notes

- Most comprehensive dependency (38 agents, 156 skills)
- Content is in a subdir, not repo root - requires sparse checkout
- Very large repository - sparse checkout minimizes disk usage
- The `subdir: "skills"` configuration is correctly handled by the install script

## Data Source

- GitHub README: full content analysis
- affaan-m/everything-claude-code repository
- `config/skills.json` manifest analysis

Research date: 2026-04-13
