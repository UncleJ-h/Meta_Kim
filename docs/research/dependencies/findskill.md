# findskill - Dependency Research

## Repository

- **Owner**: KimYx0207
- **Repo**: https://github.com/KimYx0207/findskill
- **Install ID**: `findskill`

## Content

External skill search and discovery tool. Enables Meta_Kim agents to search for and discover skills from external registries and marketplaces.

## Format

- **Standard**: SKILL.md (AgentSkills open standard)
- **Structure**: Platform-specific subdirectories within the repository
- **Subdir**: Platform-dependent via `subdirTemplate`

## Cross-Platform Compatibility

| Platform | Compatible | Notes |
|----------|-----------|-------|
| Claude Code | Y | SKILL.md universal format |
| Codex | Y | SKILL.md universal format |
| OpenClaw | Y | SKILL.md universal format |
| Cursor | Y | SKILL.md universal format |

## Distribution Configuration

```json
{
  "id": "findskill",
  "repo": "${skillOwner}/findskill",
  "subdirTemplate": "{platform}",
  "subdirMapping": {
    "win32": "windows",
    "default": "original"
  },
  "targets": ["claude", "codex", "openclaw", "cursor"]
}
```

## Install Method

- **All platforms**: subdir-based install using `subdirTemplate` mechanism
- On Windows (win32): clones from `windows/` subdir
- On other platforms: clones from `original/` subdir
- The install script resolves this via `resolveManifestSkillSubdir()` from `install-platform-config.mjs`

## Special Notes

- **Private/restricted repository**: GitHub returns a login page when accessed without authentication
- Platform-specific binary/executable differences between `windows/` and `original/` dirs
- Part of the KimYx0207 skill ecosystem (same owner as Meta_Kim)
- The `subdirTemplate` + `subdirMapping` mechanism is unique to this dependency

## Data Source

- `config/skills.json` manifest analysis
- GitHub access returned login page (private repo)
- Install script code analysis (`install-platform-config.mjs`)

Research date: 2026-04-13
