#!/bin/bash
# Verify the active Codex skill/bootstrap adapter against the 12-Meta_J repo.

set -euo pipefail

HQ="$(cd "$(dirname "$0")/.." && pwd)"
CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
TARGET="$CODEX_HOME/skills"
MANAGED_LIST="$TARGET/.meta-hq-managed.txt"
MANIFEST="$TARGET/.meta-hq-sync.tsv"
PROJECT_AGENTS_DIR="$HQ/.codex/agents"
PROJECT_AGENT_MANIFEST="$PROJECT_AGENTS_DIR/.meta-hq-agents.tsv"

failures=0

pass() {
  echo "  PASS: $1"
}

fail() {
  echo "  FAIL: $1"
  failures=$((failures + 1))
}

require_file() {
  local file="$1"
  local label="$2"
  if [ -f "$file" ]; then
    pass "$label"
  else
    fail "$label"
  fi
}

manifest_has_entry() {
  local expected_name="$1"
  local expected_label="$2"
  awk -F '\t' -v name="$expected_name" -v label="$expected_label" '
    $1 == name && $2 == label { found = 1 }
    END { exit found ? 0 : 1 }
  ' "$MANIFEST"
}

echo "=========================================="
echo "  Codex Adapter Verification"
echo "=========================================="
echo "Repo: $HQ"
echo "Codex home: $CODEX_HOME"
echo ""

echo "--- Repo Entry Files ---"
require_file "$HQ/AGENTS.md" "repo AGENTS.md exists"
require_file "$HQ/CLAUDE.md" "repo CLAUDE.md exists"
require_file "$HQ/CATALOG.md" "repo CATALOG.md exists"
require_file "$HQ/PORTABILITY.md" "repo PORTABILITY.md exists"
require_file "$HQ/adapters/codex/README.md" "repo Codex adapter README exists"
require_file "$HQ/codex/config.toml.example" "repo codex/config.toml.example exists"

echo "--- Project Codex Agents ---"
if [ -d "$PROJECT_AGENTS_DIR" ]; then
  pass "project .codex/agents directory exists"
else
  fail "project .codex/agents directory exists"
fi

if [ -f "$PROJECT_AGENT_MANIFEST" ]; then
  pass "project agent manifest exists"
else
  fail "project agent manifest exists"
fi

echo "--- Project Agent Files ---"
if [ -f "$PROJECT_AGENT_MANIFEST" ]; then
  pilot_count=0
  while IFS=$'\t' read -r name source_rel output_rel; do
    [ -n "$name" ] || continue
    pilot_count=$((pilot_count + 1))
    source="$HQ/$source_rel"
    output="$HQ/$output_rel"

    if [ -f "$source" ]; then
      pass "$name source markdown exists"
    else
      fail "$name source markdown exists"
      continue
    fi

    if [ -f "$output" ]; then
      pass "$name TOML exists"
    else
      fail "$name TOML exists"
      continue
    fi

    if python3 - "$output" "$name" <<'PY'
import sys
from pathlib import Path
import tomllib

path = Path(sys.argv[1])
expected_name = sys.argv[2]

data = tomllib.loads(path.read_text(encoding="utf-8"))
assert data["name"] == expected_name
assert data["description"]
# Q3 decision (2026-04-29 Stage B): upstream Meta_Kim 8 standard toml do NOT
# carry sandbox_mode; only Obsidian-local toml (content-auditor / meta-orchestrator)
# declare it. Accept both shapes — missing field defaults to read-only semantics.
assert data.get("sandbox_mode", "read-only") in ("read-only", "workspace-write")
assert "developer_instructions" in data and data["developer_instructions"].strip()
PY
    then
      pass "$name TOML parses and required keys exist"
    else
      fail "$name TOML parses and required keys exist"
    fi
  done < "$PROJECT_AGENT_MANIFEST"

  echo ""
  echo "  Managed project agents: $pilot_count"
fi

echo "--- Codex Skill Store ---"
if [ -d "$TARGET" ]; then
  pass "Codex skill directory exists"
else
  fail "Codex skill directory exists"
fi

if [ -f "$MANAGED_LIST" ]; then
  pass "managed skill list exists"
else
  fail "managed skill list exists"
fi

if [ -f "$MANIFEST" ]; then
  pass "sync manifest exists"
else
  fail "sync manifest exists"
fi

echo "--- HQ Skill Coverage ---"
if [ -d "$HQ/skills" ] && [ -f "$MANIFEST" ]; then
  repo_skill_count=0
  while IFS= read -r repo_skill_dir; do
    [ -d "$repo_skill_dir" ] || continue
    [ -f "$repo_skill_dir/SKILL.md" ] || continue
    repo_skill_count=$((repo_skill_count + 1))
    name="$(basename "$repo_skill_dir")"
    if manifest_has_entry "$name" "meta-hq"; then
      pass "$name present in managed meta-hq manifest"
    else
      fail "$name missing from managed meta-hq manifest"
    fi
  done < <(find "$HQ/skills" -mindepth 1 -maxdepth 1 -type d | sort)

  echo ""
  echo "  Repo HQ skills: $repo_skill_count"
fi

echo "--- Managed Skills ---"
if [ -f "$MANIFEST" ]; then
  managed_count=0
  while IFS=$'\t' read -r name label source; do
    [ -n "$name" ] || continue
    managed_count=$((managed_count + 1))
    target="$TARGET/$name"

    if [ -L "$target" ]; then
      actual="$(readlink "$target")"
      if [ "$actual" = "$source" ]; then
        pass "$name symlink points to $label"
      else
        fail "$name symlink drifted"
      fi
    elif [ "$label" = "meta-hq" ] && [ -d "$target" ]; then
      if diff -qr "$source" "$target" >/dev/null 2>&1; then
        pass "$name mirrored dir in sync: $label"
      else
        fail "$name mirrored dir drifted"
      fi
    else
      fail "$name runtime entry missing"
      continue
    fi

    if [ -f "$target/SKILL.md" ]; then
      pass "$name SKILL.md available"
    else
      fail "$name SKILL.md available"
    fi
  done < "$MANIFEST"

  meta_count="$(awk -F '\t' '$2=="meta-hq"{c++} END{print c+0}' "$MANIFEST")"
  agents_count="$(awk -F '\t' '$2=="agents"{c++} END{print c+0}' "$MANIFEST")"
  claude_count="$(awk -F '\t' '$2=="claude-global"{c++} END{print c+0}' "$MANIFEST")"

  echo ""
  echo "  Managed skills: $managed_count"
  echo "  meta-hq:        $meta_count"
  echo "  ~/.agents:      $agents_count"
  echo "  ~/.claude:      $claude_count"
fi

echo ""
if [ "$failures" -eq 0 ]; then
  echo "=========================================="
  echo "  STATUS: CODEX ADAPTER HEALTHY"
  echo "=========================================="
else
  echo "=========================================="
  echo "  STATUS: CODEX ADAPTER HAS DRIFT"
  echo "=========================================="
  exit 1
fi
