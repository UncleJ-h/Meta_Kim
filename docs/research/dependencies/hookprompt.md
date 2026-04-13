# hookprompt - Dependency Research

## Repository

- **Owner**: KimYx0207
- **Repo**: https://github.com/KimYx0207/HookPrompt
- **Install ID**: `hookprompt`

## Content

Claude Code Hook system optimization tool. Enhances prompt quality and behavior through Claude Code's hook infrastructure. Configures hooks in `.claude/hooks/` and `.claude/settings.json` to intercept and optimize prompts.

## Format

- **Standard**: Claude Code-specific (hooks + settings)
- **Structure**: Root-level files in the repository
- **Subdir**: None

## Cross-Platform Compatibility

| Platform | Compatible | Notes |
|----------|-----------|-------|
| Claude Code | **Y** | Uses `.claude/hooks/` + `.claude/settings.json` |
| Codex | **N** | No hooks system |
| OpenClaw | **N** | No hooks system |
| Cursor | **N** | No hooks system |

## Distribution Configuration

```json
{
  "id": "hookprompt",
  "repo": "${skillOwner}/HookPrompt",
  "targets": ["claude"]
}
```

**This is the only claude-only dependency** - correctly isolated via `targets: ["claude"]`.

## Install Method

- **Claude Code only**: `git clone --depth 1`
- Other platforms: automatically skipped by install script (target not in list)
- Install log shows: `hookprompt - not applicable codex/openclaw/cursor`

## Special Notes

- Depends on Claude Code's hook system (`PreToolUse`, `PostToolUse`, `Stop`)
- Writes to `.claude/hooks/` directory and modifies `.claude/settings.json`
- Part of the KimYx0207 skill ecosystem (same owner as Meta_Kim)
- The `targets: ["claude"]` isolation is the correct pattern for platform-specific dependencies

## Data Source

- GitHub README analysis
- `config/skills.json` manifest analysis
- Install script code analysis

Research date: 2026-04-13
