# Meta_Kim Agent Foundry

This directory is the scalable production layer for the next stage of Meta_Kim.

It is designed to support a **department-first 100-agent industry catalog** without turning the repository into a pile of hand-written prompt fragments.

## Purpose

The foundry exists to batch-produce structured **department seeds and specialist briefs** that can later be refined into runtime-specific agents through the Meta_Kim meta system.

It separates:

- canonical meta architecture
- industry specialization
- department structure
- runtime projection

That separation matters. The eight meta agents remain the governance core. The foundry is the expansion layer.

The current matrix is:

- 20 industries
- 5 departments per industry
- 100 department-level agents
- 1000 generated specialist agents
- organization and orchestration files for cross-department routing
- runtime-pack compilation for Claude Code, Codex, and OpenClaw

## Current Structure

```text
factory/
├─ catalog/
│  └─ foundry-config.mjs
├─ generated/
│  ├─ README.md
│  ├─ agent-index.json
│  ├─ industry-coverage-matrix.md
│  ├─ organization-map.json
│  ├─ department-call-protocol.json
│  ├─ orchestration-playbooks.md
│  ├─ flagship-20.md
│  ├─ flagship-20.json
│  ├─ flagship-20/<industry>.md
│  ├─ departments/<industry>/<department>.md
│  └─ specialists/<industry>/<department>/<specialist>.md
├─ runtime-packs/
│  ├─ README.md
│  ├─ summary.json
│  ├─ claude/agents/*.md
│  ├─ codex/agents/*.toml
│  └─ openclaw/workspaces/<agent-id>/*
├─ flagship-batch-1/
│  ├─ README.md
│  ├─ agents/*.md
│  └─ runtime-packs/<runtime>/*
├─ flagship-batch-2/
│  ├─ README.md
│  ├─ agents/*.md
│  └─ runtime-packs/<runtime>/*
├─ flagship-batch-3/
│  ├─ README.md
│  ├─ agents/*.md
│  └─ runtime-packs/<runtime>/*
├─ flagship-batch-4/
│  ├─ README.md
│  ├─ agents/*.md
│  └─ runtime-packs/<runtime>/*
├─ flagship-complete/
│  ├─ README.md
│  ├─ agents/*.md
│  └─ runtime-packs/<runtime>/*
└─ README.md
```

## What the Generator Produces

The generator now emits two layers:

- department seeds
- specialist briefs
- coverage and flagship indexes
- runtime-specific import packs

Each department seed contains:

- industry
- department
- mission
- reference thinkers
- mental models
- tool targets
- expected inputs
- expected deliverables
- ten named specialist slots
- guardrails

Each specialist brief contains:

- parent department
- specialist mandate
- specialist-level deliverables
- upstream/downstream handoff expectations

These are not direct runtime prompts yet.

The generated briefs are the structured source that:

- `meta-warden` can route
- `meta-genesis` can turn into personas
- `meta-artisan` can tool-fit and operationalize
- `meta-conductor` can organize into multi-department systems
- `meta-sentinel` and `meta-prism` can gate risk and quality at department boundaries

The runtime-pack compiler then projects those briefs into:

- Claude Code agent files
- Codex custom-agent TOML files
- OpenClaw workspace packs

The flagship layer gives you a practical first polishing queue:

- 1 flagship department seed per industry
- 20 flagship agents total
- each flagship file points to its runtime-pack paths

And the first manual polishing cohort is now separated again as:

- `flagship-batch-1/`
- 5 hand-polished flagship agents
- dedicated runtime packs for Claude Code, Codex, and OpenClaw

The second manual polishing cohort now exists too:

- `flagship-batch-2/`
- 5 more hand-polished flagship agents
- focused on stocks, investment, web3, creator media, and e-commerce

The remaining flagship layers are now complete as well:

- `flagship-batch-3/`
- `flagship-batch-4/`
- together they bring the hand-polished flagship total to **20 agents**

There is also a unified flagship bundle now:

- `flagship-complete/`
- all 20 hand-polished flagship agents in one place
- one combined Claude Code / Codex / OpenClaw import surface

## Build

```bash
npm run build:agent-foundry
```

To rebuild only the unified 20-agent flagship bundle:

```bash
npm run build:flagship-complete
```

## Check

```bash
npm run check:agent-foundry
```

To verify only the unified 20-agent flagship bundle:

```bash
npm run check:flagship-complete
```

## Design Principle

Do not scale by copying prompts.

Scale by:

- keeping the governance core stable
- formalizing industry blueprints
- formalizing department templates
- generating repeatable, reviewable department seeds and specialist briefs
