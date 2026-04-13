/**
 * Shared i18n for Meta_Kim installation scripts.
 * Import this from setup.mjs and install-global-skills-all-runtimes.mjs
 * to avoid duplicating strings.
 */

import { platform } from "node:os";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ── Detect language ──────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));

function detectLang() {
  const cliIdx = process.argv.indexOf("--lang");
  if (cliIdx >= 0 && process.argv[cliIdx + 1]) {
    return process.argv[cliIdx + 1];
  }
  const envLang = process.env.META_KIM_LANG;
  if (envLang) return envLang;
  // Heuristic: Windows with CJK system → Chinese
  if (platform() === "win32") {
    try {
      const sysLocale = Intl.DateTimeFormat().resolvedOptions().locale;
      if (/^zh/i.test(sysLocale)) return "zh-CN";
      if (/^ja/i.test(sysLocale)) return "ja-JP";
      if (/^ko/i.test(sysLocale)) return "ko-KR";
    } catch {
      // fall through
    }
  }
  return "en";
}

// ── Strings ───────────────────────────────────────────────────

const STRINGS = {
  en: {
    // Skill install (shared)
    dryRun: (cmd) => `[dry-run] ${cmd}`,
    okUpdated: (path) => `[OK] updated ${path}`,
    warnPullFailed: (path) => `[WARN] pull failed, re-cloning ${path}`,
    warnGitRetry: (cmd, attempt, max, delay) =>
      `[WARN] git ${cmd} failed (attempt ${attempt}/${max}), retrying in ${delay}ms...`,
    warnGitInstallFailed: (id, category) =>
      `[WARN] git install failed for ${id} (${category})`,
    warnArchiveFallback: (id, category) =>
      `[WARN] falling back to archive for ${id} (${category})`,
    okArchiveInstalled: (path) => `[OK] archive installed ${path}`,
    warnArchiveFailed: (id, category, reason) =>
      `[WARN] archive fallback failed for ${id} (${category}): ${reason}`,
    okCloned: (path) => `[OK] cloned ${path}`,
    skipExists: (path) => `[SKIP] exists ${path}`,
    okBasename: (name, dest) => `[OK] ${name} -> ${dest}`,
    skipNotApplicable: (name, runtime) =>
      `[SKIP] ${name} — not applicable to ${runtime}`,
    // Plugins
    pluginsHeader: "--- Claude Code plugins (user scope) ---",
    warnClaNotFound:
      "claude CLI not found on PATH — skip plugin install. Install Claude Code CLI, then re-run with --plugins-only.",
    warnPluginFailed: (spec, code) =>
      `[WARN] plugin install failed: ${spec} (exit ${code})`,
    skipAlreadyInstalled: (name) => `[SKIP] ${name} — already installed`,
    installingPlugin: (spec) => `Installing plugin: ${spec}`,
    // Python/graphify
    pythonToolsHeader: "--- Python Tools (optional) ---",
    pythonNotFound: "Python 3.10+ not found. Skipping graphify.",
    pythonInstallHint:
      "Install Python 3.10+ and run: pip install graphifyy && python -m graphify claude install",
    skipGraphifyInstalled: (v) => `[SKIP] graphify already installed (${v})`,
    installingGraphify: "Installing graphify (code knowledge graph)...",
    installingGraphifySkill: "Registering graphify Claude skill...",
    okGraphifyInstalled: "graphify installed and Claude skill registered",
    warnGraphifySkillFailed:
      "graphify Claude skill registration failed (non-blocking)",
    warnGraphifyPipFailed: "graphify pip install failed (non-blocking)",
    pythonToolsOptionalHeader: "--- Python Tools (optional) ---",
    pythonNotFoundGraphify: "Python 3.10+ not found. Skipping graphify.",
    pythonInstallHintGraphify:
      "Install Python 3.10+ and run: pip install graphifyy && python -m graphify claude install",
    // Shared i18n keys for install-global-skills
    skillsHeader: (label, root) => `--- ${label}: ${root} ---`,
    failManifestLoad: (err) => `Failed to load skills manifest: ${err}`,
    done: "Done.",
    noteCodexOpenclaw:
      "Note: Codex/OpenClaw have no Claude Code plugin format — same repos are mirrored as skill directories only.",
    activeTargets: (targets) => `Active runtime targets: ${targets.join(", ")}`,
    metaKimRoot: (root) => `Meta_Kim repo (canonical source root): ${root}`,
    warnManifestMissing: "skills manifest missing — no skills to install",
    warnRepairLegacyLayout: (id, dir) =>
      `repairing legacy install layout for ${id}: ${dir}`,
    warnRepairLegacySharedRoot: (dir) =>
      `Repairing legacy full-clone in shared root: ${dir}`,
    warnRemovingObsoleteDir:
      "Removing obsolete directory (left by a previous Meta_Kim version):",
    warnNestedCopyNotUsed: (runtimeId) =>
      `This nested copy is not used by ${runtimeId} and can be safely removed.`,
    warnPre2Artifact: "Pre-2.0 install artifact, no longer needed.",
    okRemovedObsolete: (n) =>
      `Removed ${n} obsolete director${n > 1 ? "ies" : "y"} left by a previous Meta_Kim version.`,
    noteSettingsNotAffected:
      "Your current settings, skills, and hooks are not affected.",
    warnQuarantineDryRun: (id, detail) =>
      `${id}: would quarantine invalid SKILL.md within managed install (${detail})`,
    warnQuarantined: (id, detail) =>
      `${id}: quarantined invalid SKILL.md within managed install (${detail})`,
    warnReplaceFailed: (id, dir, msg) =>
      `${id}: failed to replace existing install at ${dir}: ${msg}`,
    summaryInstallFailures: (n) => `Installation failures (${n}):`,
    summaryArchiveFallbacks: (n) => `Archive fallbacks used (${n}):`,
    summaryRepairedOrFlagged: (n) =>
      `Meta_Kim-managed legacy installs repaired or flagged (${n}):`,
    summaryQuarantined: (n) =>
      `Invalid nested SKILL.md files quarantined inside Meta_Kim-managed installs (${n}):`,
    val: {
      headerTitle: "Meta_Kim Project Integrity Check",
      step01: "Checking required files",
      step01Detail:
        "README.md, CLAUDE.md, package.json, sync manifest, canonical runtime assets, run-artifact fixtures, local-state rules",
      step01Pass: "All required kernel files present",
      step02: "Validating workflow contract",
      step02Detail:
        "single-department run discipline, primary deliverable, closed deliverable chain",
      step02Pass: "Workflow contract is valid",
      step03: "Validating sync manifest",
      step03Detail:
        "supportedTargets, defaultTargets, availableTargets, generatedTargets",
      step03Pass: "Sync manifest and runtime target catalog are coherent",
      step04: "Validating canonical agent definitions",
      step04Detail:
        "frontmatter completeness + forbidden-marker check + boundary discipline",
      step04Pass: (n, names) => `${n} agents passed: ${names.join(", ")}`,
      step05: "Validating OpenClaw runtime asset",
      step05Detail:
        "canonical template agent list, hooks, and allow-list must match canonical agents",
      step05Pass: "Canonical OpenClaw runtime asset is valid",
      step06: "Checking canonical SKILL.md",
      step06Detail:
        "canonical metadata, station deliverable markers, and references",
      step06Pass: "Canonical meta-theory skill package is valid",
      step07: "Validating Codex runtime asset",
      step07Detail: "canonical config template markers",
      step07Pass: "Canonical Codex runtime asset is valid",
      step08: "Checking runtime parity matrix",
      step08Detail:
        "trigger/hook/review/verification/stop/writeback parity must be documented",
      step08Pass:
        "Runtime parity matrix contains the required governance parity markers",
      step09: "Checking run artifact fixtures",
      step09Detail:
        "valid fixture must pass; invalid public-ready fixture must fail",
      step09Pass:
        "Run artifact validator accepts the valid fixture and rejects the invalid fixture",
      step10: "Checking package.json scripts",
      step10Detail: "sync:runtimes / validate / eval:agents / verify:all, etc.",
      step10Pass: "All required scripts registered",
      step11: "Checking .gitignore rules",
      step11Detail: "node_modules/ / docs/ / local state isolation, etc.",
      step11Pass: ".gitignore contains all necessary local-state rules",
      step12: "Checking canonical Claude settings",
      step12Detail: "permission deny rules / PreToolUse / SubagentStart hooks",
      step12Pass: "Canonical Claude hooks and permissions configured correctly",
      step13: "Checking canonical MCP config",
      step13Detail: "meta-kim-runtime service definition and startup command",
      step13Pass: "Canonical MCP config is valid",
      step14: "Running MCP self-test",
      step14Detail: "start meta-runtime-server and verify agent count",
      step14Pass: "MCP self-test passed",
      step15: "Checking factory release artifacts",
      step15Detail:
        "100 departments / 1000 specialists / 20 flagship / 1100 runtime packs",
      step15Pass:
        "Factory artifacts validated (or skipped — not in public repo)",
      footerAll: (n) => `All ${n} checks passed`,
      footerAgents: (n) => `${n} agents ready`,
      valFailed: "Validation failed!",
      agentsReady: "agents ready",
    },
  },
  "zh-CN": {
    dryRun: (cmd) => `[dry-run] ${cmd}`,
    okUpdated: (path) => `[OK] 已更新 ${path}`,
    warnPullFailed: (path) => `[WARN] pull 失败，重新克隆 ${path}`,
    warnGitRetry: (cmd, attempt, max, delay) =>
      `[WARN] git ${cmd} 失败（第 ${attempt}/${max} 次），${delay}ms 后重试...`,
    warnGitInstallFailed: (id, category) =>
      `[WARN] ${id} git 安装失败 (${category})`,
    warnArchiveFallback: (id, category) =>
      `[WARN] ${id} 回退到归档安装 (${category})`,
    okArchiveInstalled: (path) => `[OK] 归档安装完成 ${path}`,
    warnArchiveFailed: (id, category, reason) =>
      `[WARN] ${id} 归档安装失败 (${category}): ${reason}`,
    okCloned: (path) => `[OK] 已克隆 ${path}`,
    skipExists: (path) => `[SKIP] 已存在 ${path}`,
    okBasename: (name, dest) => `[OK] ${name} -> ${dest}`,
    skipNotApplicable: (name, runtime) => `[SKIP] ${name} — 不适用 ${runtime}`,
    pluginsHeader: "--- Claude Code 插件（用户范围）---",
    warnClaNotFound:
      "未找到 claude CLI — 跳过插件安装。请先安装 Claude Code CLI，然后运行 --plugins-only。",
    skipAlreadyInstalled: (name) => `[SKIP] ${name} — 已安装`,
    installingPlugin: (spec) => `正在安装插件：${spec}`,
    warnPluginFailed: (spec, code) =>
      `[WARN] 插件安装失败：${spec}（退出码 ${code}）`,
    pythonToolsHeader: "--- Python 工具（可选）---",
    pythonNotFound: "未找到 Python 3.10+，跳过 graphify。",
    pythonInstallHint:
      "安装 Python 3.10+ 后运行：pip install graphifyy && python -m graphify claude install",
    skipGraphifyInstalled: (v) => `[SKIP] graphify 已安装 (${v})`,
    installingGraphify: "正在安装 graphify（代码知识图谱）...",
    installingGraphifySkill: "正在注册 graphify Claude 技能...",
    okGraphifyInstalled: "graphify 已安装，Claude 技能已注册",
    warnGraphifySkillFailed: "graphify Claude 技能注册失败（不影响其他功能）",
    warnGraphifyPipFailed: "graphify pip 安装失败（不影响其他功能）",
    skillsHeader: (label, root) => `--- ${label}：${root} ---`,
    failManifestLoad: (err) => `加载技能清单失败：${err}`,
    done: "完成。",
    noteCodexOpenclaw:
      "注意：Codex/OpenClaw 没有 Claude Code 插件格式——同名仓库只作为技能目录镜像。",
    activeTargets: (targets) => `活跃运行时目标：${targets.join(", ")}`,
    metaKimRoot: (root) => `Meta_Kim 仓库（正典源根目录）：${root}`,
    warnManifestMissing: "缺少技能清单 — 无技能可安装",
    warnRepairLegacyLayout: (id, dir) => `正在修复遗留安装布局 ${id}：${dir}`,
    warnRepairLegacySharedRoot: (dir) =>
      `正在修复共享根目录中的遗留完整克隆：${dir}`,
    warnRemovingObsoleteDir: "正在移除过时目录（由旧版 Meta_Kim 留下）：",
    warnNestedCopyNotUsed: (runtimeId) =>
      `该嵌套副本未被 ${runtimeId} 使用，可安全移除。`,
    warnPre2Artifact: "2.0 之前的安装残留，不再需要。",
    okRemovedObsolete: (n) => `已移除 ${n} 个旧版 Meta_Kim 遗留的过时目录。`,
    noteSettingsNotAffected: "您当前的设置、技能和钩子不受影响。",
    warnQuarantineDryRun: (id, detail) =>
      `${id}：将隔离托管安装中的无效 SKILL.md（${detail}）`,
    warnQuarantined: (id, detail) =>
      `${id}：已隔离托管安装中的无效 SKILL.md（${detail}）`,
    warnReplaceFailed: (id, dir, msg) =>
      `${id}：替换已有安装失败 ${dir}：${msg}`,
    summaryInstallFailures: (n) => `安装失败（${n}）：`,
    summaryArchiveFallbacks: (n) => `使用了归档回退（${n}）：`,
    summaryRepairedOrFlagged: (n) =>
      `Meta_Kim 管理的遗留安装已修复或标记（${n}）：`,
    summaryQuarantined: (n) =>
      `Meta_Kim 管理安装中隔离的无效嵌套 SKILL.md 文件（${n}）：`,
    pythonToolsOptionalHeader: "--- Python 工具（可选）---",
    pythonNotFoundGraphify: "未找到 Python 3.10+，跳过 graphify。",
    pythonInstallHintGraphify:
      "安装 Python 3.10+ 后运行：pip install graphifyy && python -m graphify claude install",
    val: {
      headerTitle: "Meta_Kim 项目完整性检查",
      step01: "检查必需文件",
      step01Detail:
        "README.md, CLAUDE.md, package.json, 同步清单, canonical 运行时资源, run-artifact fixtures, 本地状态规则",
      step01Pass: "所有必需内核文件就绪",
      step02: "验证工作流合约",
      step02Detail: "单一部门运行规范, 主要交付物, 封闭交付链",
      step02Pass: "工作流合约有效",
      step03: "验证同步清单",
      step03Detail:
        "supportedTargets, defaultTargets, availableTargets, generatedTargets",
      step03Pass: "同步清单与运行时目标目录一致",
      step04: "验证 canonical 智能体定义",
      step04Detail: "frontmatter 完整性 + 禁止标记检查 + 边界规范",
      step04Pass: (n, names) => `${n} 个智能体通过：${names.join(", ")}`,
      step05: "验证 OpenClaw 运行时资源",
      step05Detail:
        "规范模板智能体列表, hooks, allow-list 需与 canonical 智能体匹配",
      step05Pass: "Canonical OpenClaw 运行时资源有效",
      step06: "检查 canonical SKILL.md",
      step06Detail: "规范元数据, station 交付标记, references",
      step06Pass: "Canonical meta-theory 技能包有效",
      step07: "验证 Codex 运行时资源",
      step07Detail: "规范配置模板标记",
      step07Pass: "Canonical Codex 运行时资源有效",
      step08: "检查运行时能力对照矩阵",
      step08Detail:
        "trigger/hook/review/verification/stop/writeback parity 需已文档化",
      step08Pass: "运行时能力对照矩阵包含所需的治理 parity 标记",
      step09: "检查 run artifact fixtures",
      step09Detail: "有效 fixture 需通过；无效 public-ready fixture 需拒绝",
      step09Pass: "Run artifact 验证器接受有效 fixture 并拒绝无效 fixture",
      step10: "检查 package.json scripts",
      step10Detail: "sync:runtimes / validate / eval:agents / verify:all, etc.",
      step10Pass: "所有必需脚本已注册",
      step11: "检查 .gitignore 规则",
      step11Detail: "node_modules/ / docs/ / local state isolation, etc.",
      step11Pass: ".gitignore 包含所有必需的 local-state 规则",
      step12: "检查 canonical Claude settings",
      step12Detail: "permission deny rules / PreToolUse / SubagentStart hooks",
      step12Pass: "Canonical Claude hooks 和权限配置正确",
      step13: "检查 canonical MCP 配置",
      step13Detail: "meta-kim-runtime 服务定义和启动命令",
      step13Pass: "Canonical MCP 配置有效",
      step14: "运行 MCP 自检",
      step14Detail: "启动 meta-runtime-server 并验证智能体数量",
      step14Pass: "MCP 自检通过",
      step15: "检查 factory release artifacts",
      step15Detail:
        "100 departments / 1000 specialists / 20 flagship / 1100 runtime packs",
      step15Pass: "Factory artifacts 已验证（或跳过 — 不在公共仓库中）",
      footerAll: (n) => `全部 ${n} 项检查通过`,
      footerAgents: (n) => `${n} 个智能体就绪`,
      valFailed: "验证失败！",
      agentsReady: "个智能体就绪",
    },
  },
  "ja-JP": {
    dryRun: (cmd) => `[dry-run] ${cmd}`,
    okUpdated: (path) => `[OK] 更新済み ${path}`,
    warnPullFailed: (path) => `[WARN] pull 失敗、再クローン ${path}`,
    warnGitRetry: (cmd, attempt, max, delay) =>
      `[WARN] git ${cmd} 失敗（${attempt}/${max} 回目）、${delay}ms 後にリトライ...`,
    warnGitInstallFailed: (id, category) =>
      `[WARN] ${id} gitインストール失敗 (${category})`,
    warnArchiveFallback: (id, category) =>
      `[WARN] ${id} アーカイブフォールバック (${category})`,
    okArchiveInstalled: (path) => `[OK] アーカイブインストール ${path}`,
    warnArchiveFailed: (id, category, reason) =>
      `[WARN] ${id} アーカイブ失敗 (${category}): ${reason}`,
    okCloned: (path) => `[OK] クローン済み ${path}`,
    skipExists: (path) => `[SKIP] 存在 ${path}`,
    okBasename: (name, dest) => `[OK] ${name} -> ${dest}`,
    skipNotApplicable: (name, runtime) =>
      `[SKIP] ${name} — ${runtime} に適用外`,
    pluginsHeader: "--- Claude Code プラグイン（ユーザー範囲）---",
    warnClaNotFound:
      "claude CLI が見つかりません — プラグインインストールをスキップ。Claude Code CLI をインストール後、--plugins-only を再実行してください。",
    skipAlreadyInstalled: (name) => `[SKIP] ${name} — インストール済み`,
    installingPlugin: (spec) => `プラグインをインストール中：${spec}`,
    warnPluginFailed: (spec, code) =>
      `[WARN] プラグインインストール失敗：${spec}（終了 ${code}）`,
    pythonToolsHeader: "--- Python ツール（オプション）---",
    pythonNotFound: "Python 3.10+ が見つかりません — graphify をスキップ。",
    pythonInstallHint:
      "Python 3.10+ インストール後：pip install graphifyy && python -m graphify claude install",
    skipGraphifyInstalled: (v) => `[SKIP] graphify インストール済み (${v})`,
    installingGraphify: "graphify をインストール中（コードナレッジグラフ）...",
    installingGraphifySkill: "graphify Claude スキルを登録中...",
    okGraphifyInstalled: "graphify インストール完了、Claude スキル登録済み",
    warnGraphifySkillFailed: "graphify Claude スキル登録失敗（非ブロッキング）",
    warnGraphifyPipFailed: "graphify pip インストール失敗（非ブロッキング）",
    skillsHeader: (label, root) => `--- ${label}：${root} ---`,
    failManifestLoad: (err) => `スキルマニフェストの読み込みに失敗：${err}`,
    done: "完了。",
    noteCodexOpenclaw:
      "注意：Codex/OpenClaw には Claude Code プラグイン形式がありません — 同じリポジトリはスキルディレクトリとしてのみミラーリングされます。",
    activeTargets: (targets) =>
      `アクティブランタイムターゲット：${targets.join(", ")}`,
    metaKimRoot: (root) => `Meta_Kim リポジトリ（正典ソースルート）：${root}`,
    warnManifestMissing:
      "スキルマニフェストが見つかりません — インストールするスキルがありません",
    warnRepairLegacyLayout: (id, dir) =>
      `レガシーインストールレイアウトを修復中 ${id}：${dir}`,
    warnRepairLegacySharedRoot: (dir) =>
      `共有ルートのレガシーフルクローンを修復中：${dir}`,
    warnRemovingObsoleteDir:
      "旧バージョンの Meta_Kim が残した古いディレクトリを削除中：",
    warnNestedCopyNotUsed: (runtimeId) =>
      `このネストされたコピーは ${runtimeId} で使用されておらず、安全に削除できます。`,
    warnPre2Artifact: "2.0 以前のインストールアーティファクト、不要です。",
    okRemovedObsolete: (n) =>
      `旧バージョンの Meta_Kim が残した古いディレクトリ ${n} 個を削除しました。`,
    noteSettingsNotAffected: "現在の設定、スキル、フックには影響しません。",
    warnQuarantineDryRun: (id, detail) =>
      `${id}：管理下インストールの無効な SKILL.md を隔離予定（${detail}）`,
    warnQuarantined: (id, detail) =>
      `${id}：管理下インストールの無効な SKILL.md を隔離しました（${detail}）`,
    warnReplaceFailed: (id, dir, msg) =>
      `${id}：既存インストールの置換に失敗 ${dir}：${msg}`,
    summaryInstallFailures: (n) => `インストール失敗（${n}）：`,
    summaryArchiveFallbacks: (n) => `アーカイブフォールバック使用（${n}）：`,
    summaryRepairedOrFlagged: (n) =>
      `Meta_Kim 管理のレガシーインストール修復/フラグ（${n}）：`,
    summaryQuarantined: (n) =>
      `Meta_Kim 管理インストール内の無効なネスト SKILL.md ファイルを隔離（${n}）：`,
    pythonToolsOptionalHeader: "--- Python ツール（オプション）---",
    pythonNotFoundGraphify:
      "Python 3.10+ が見つかりません — graphify をスキップ。",
    pythonInstallHintGraphify:
      "Python 3.10+ インストール後：pip install graphifyy && python -m graphify claude install",
    val: {
      headerTitle: "Meta_Kim プロジェクト整合性チェック",
      step01: "必須ファイルのチェック",
      step01Detail:
        "README.md, CLAUDE.md, package.json, 同期マifest, canonical ランタイムアセット, run-artifact fixtures, ローカル状態ルール",
      step01Pass: "すべての必須カーネルファイルが存在します",
      step02: "ワークフローコントラクトの検証",
      step02Detail:
        "single-department 実行規範, primary deliverable, closed deliverable chain",
      step02Pass: "ワークフローコントラクトが有効です",
      step03: "同期マifest の検証",
      step03Detail:
        "supportedTargets, defaultTargets, availableTargets, generatedTargets",
      step03Pass: "同期マifestとランタイムターゲットカタログが整合しています",
      step04: "canonical エージェント定義の検証",
      step04Detail: "frontmatter 完全性 + 禁止マーカー検査 + 境界規範",
      step04Pass: (n, names) => `${n} エージェントが合格: ${names.join(", ")}`,
      step05: "OpenClaw ランタイムアセットの検証",
      step05Detail:
        "規範テンプレートエージェントリスト, hooks, allow-list は canonical エージェントと一致する必要があります",
      step05Pass: "Canonical OpenClaw ランタイムアセットが有効です",
      step06: "canonical SKILL.md のチェック",
      step06Detail:
        "規範メタデータ, station ディリバラブルマーカー, references",
      step06Pass: "Canonical meta-theory スキルパッケージが有効です",
      step07: "Codex ランタイムアセットの検証",
      step07Detail: "規範設定テンプレートマーカー",
      step07Pass: "Canonical Codex ランタイムアセットが有効です",
      step08: "ランタイム能力マトリクスのチェック",
      step08Detail:
        "trigger/hook/review/verification/stop/writeback parity が文書化されている必要があります",
      step08Pass:
        "ランタイム能力マトリクスには必要なガバナンス parity マーカーが含まれています",
      step09: "run artifact fixtures のチェック",
      step09Detail: "有効な fixture は合格; 無効な public-ready fixture は拒否",
      step09Pass:
        "Run artifact バリデーターは有効な fixture を受け入れ、無効な fixture を拒否します",
      step10: "package.json scripts のチェック",
      step10Detail: "sync:runtimes / validate / eval:agents / verify:all, etc.",
      step10Pass: "すべての必須スクリプトが登録済みです",
      step11: ".gitignore ルールのチェック",
      step11Detail: "node_modules/ / docs/ / local state isolation, etc.",
      step11Pass:
        ".gitignore にはすべての必要な local-state ルールが含まれています",
      step12: "canonical Claude settings のチェック",
      step12Detail: "permission deny rules / PreToolUse / SubagentStart hooks",
      step12Pass: "Canonical Claude hooks と権限が正しく設定されています",
      step13: "canonical MCP 設定のチェック",
      step13Detail: "meta-kim-runtime サービス定義と起動コマンド",
      step13Pass: "Canonical MCP 設定が有効です",
      step14: "MCP 自己テストの実行",
      step14Detail: "meta-runtime-server を起動しエージェント数を検証",
      step14Pass: "MCP 自己テストが合格しました",
      step15: "factory release artifacts のチェック",
      step15Detail:
        "100 departments / 1000 specialists / 20 flagship / 1100 runtime packs",
      step15Pass:
        "Factory artifacts が検証されました（またはスキップ — 公開リポジトリにありません）",
      footerAll: (n) => `全 ${n} チェックが合格しました`,
      footerAgents: (n) => `${n} エージェントが準備できています`,
      valFailed: "検証に失敗しました！",
      agentsReady: "エージェントが準備できています",
    },
  },
  "ko-KR": {
    dryRun: (cmd) => `[dry-run] ${cmd}`,
    okUpdated: (path) => `[OK] 업데이트됨 ${path}`,
    warnPullFailed: (path) => `[WARN] pull 실패, 재클론 ${path}`,
    warnGitRetry: (cmd, attempt, max, delay) =>
      `[WARN] git ${cmd} 실패（${attempt}/${max}회）, ${delay}ms 후 재시도...`,
    warnGitInstallFailed: (id, category) =>
      `[WARN] ${id} git 설치 실패 (${category})`,
    warnArchiveFallback: (id, category) =>
      `[WARN] ${id} 아카이브 폴백 (${category})`,
    okArchiveInstalled: (path) => `[OK] 아카이브 설치됨 ${path}`,
    warnArchiveFailed: (id, category, reason) =>
      `[WARN] ${id} 아카이브 실패 (${category}): ${reason}`,
    okCloned: (path) => `[OK] 클론됨 ${path}`,
    skipExists: (path) => `[SKIP] 존재함 ${path}`,
    okBasename: (name, dest) => `[OK] ${name} -> ${dest}`,
    skipNotApplicable: (name, runtime) =>
      `[SKIP] ${name} — ${runtime}에 적용 불가`,
    pluginsHeader: "--- Claude Code 플러그인 (사용자 범위) ---",
    warnClaNotFound:
      "claude CLI를 찾을 수 없음 — 플러그인 설치 건너뜀. Claude Code CLI를 설치한 후 --plugins-only를 다시 실행하세요.",
    skipAlreadyInstalled: (name) => `[SKIP] ${name} — 이미 설치됨`,
    installingPlugin: (spec) => `플러그인 설치 중：${spec}`,
    warnPluginFailed: (spec, code) =>
      `[WARN] 플러그인 설치 실패：${spec}（종료 코드 ${code}）`,
    pythonToolsHeader: "--- Python 도구 (선택) ---",
    pythonNotFound: "Python 3.10+ 없음 — graphify 건너뜀.",
    pythonInstallHint:
      "Python 3.10+ 설치 후: pip install graphifyy && python -m graphify claude install",
    skipGraphifyInstalled: (v) => `[SKIP] graphify 이미 설치됨 (${v})`,
    installingGraphify: "graphify 설치 중 (코드 지식 그래프)...",
    installingGraphifySkill: "graphify Claude 스킬 등록 중...",
    okGraphifyInstalled: "graphify 설치 완료, Claude 스킬 등록됨",
    warnGraphifySkillFailed: "graphify Claude 스킬 등록 실패 (비차단)",
    warnGraphifyPipFailed: "graphify pip 설치 실패 (비차단)",
    skillsHeader: (label, root) => `--- ${label}：${root} ---`,
    failManifestLoad: (err) => `스킬 매니페스트 로드 실패：${err}`,
    done: "완료.",
    noteCodexOpenclaw:
      "참고: Codex/OpenClaw에는 Claude Code 플러그인 형식이 없습니다 — 동일한 저장소는 스킬 디렉토리로만 미러링됩니다.",
    activeTargets: (targets) => `활성 런타임 대상：${targets.join(", ")}`,
    metaKimRoot: (root) => `Meta_Kim 저장소 (정본 소스 루트)：${root}`,
    warnManifestMissing: "스킬 매니페스트 누락 — 설치할 스킬이 없습니다",
    warnRepairLegacyLayout: (id, dir) =>
      `레거시 설치 레이아웃 복구 중 ${id}：${dir}`,
    warnRepairLegacySharedRoot: (dir) =>
      `공유 루트의 레거시 전체 클론 복구 중：${dir}`,
    warnRemovingObsoleteDir:
      "이전 버전 Meta_Kim이 남긴 구식 디렉토리 제거 중：",
    warnNestedCopyNotUsed: (runtimeId) =>
      `이 중첩 복사본은 ${runtimeId}에서 사용되지 않으며 안전하게 제거할 수 있습니다.`,
    warnPre2Artifact: "2.0 이전 설치 아티팩트, 더 이상 필요하지 않습니다.",
    okRemovedObsolete: (n) =>
      `이전 버전 Meta_Kim이 남긴 구식 디렉토리 ${n}개를 제거했습니다.`,
    noteSettingsNotAffected: "현재 설정, 스킬 및 훅은 영향을 받지 않습니다.",
    warnQuarantineDryRun: (id, detail) =>
      `${id}：관리 설치 내 무효한 SKILL.md 격리 예정（${detail}）`,
    warnQuarantined: (id, detail) =>
      `${id}：관리 설치 내 무효한 SKILL.md 격리 완료（${detail}）`,
    warnReplaceFailed: (id, dir, msg) =>
      `${id}：기존 설치 교체 실패 ${dir}：${msg}`,
    summaryInstallFailures: (n) => `설치 실패（${n}）：`,
    summaryArchiveFallbacks: (n) => `아카이브 폴백 사용（${n}）：`,
    summaryRepairedOrFlagged: (n) =>
      `Meta_Kim 관리 레거시 설치 복구/플래그（${n}）：`,
    summaryQuarantined: (n) =>
      `Meta_Kim 관리 설치 내 무효한 중첩 SKILL.md 파일 격리（${n}）：`,
    pythonToolsOptionalHeader: "--- Python 도구 (선택) ---",
    pythonNotFoundGraphify: "Python 3.10+ 없음 — graphify 건너뜀.",
    pythonInstallHintGraphify:
      "Python 3.10+ 설치 후: pip install graphifyy && python -m graphify claude install",
    val: {
      headerTitle: "Meta_Kim 프로젝트 무결성 검사",
      step01: "필수 파일 확인",
      step01Detail:
        "README.md, CLAUDE.md, package.json, 동기화 manifest, canonical 런타임 자산, run-artifact fixtures, 로컬 상태 규칙",
      step01Pass: "모든 필수 커널 파일이 존재합니다",
      step02: "워크플로 컨트랙트 검증",
      step02Detail:
        "single-department 실행 규율, primary deliverable, closed deliverable chain",
      step02Pass: "워크플로 컨트랙트가 유효합니다",
      step03: "동기화 manifest 검증",
      step03Detail:
        "supportedTargets, defaultTargets, availableTargets, generatedTargets",
      step03Pass: "동기화 manifest와 런타임 대상 카탈로그가 정합합니다",
      step04: "canonical 에이전트 정의 검증",
      step04Detail: "frontmatter 완전성 + 금지 마커 검사 + 경계 규율",
      step04Pass: (n, names) => `${n}개 에이전트 합격: ${names.join(", ")}`,
      step05: "OpenClaw 런타임 자산 검증",
      step05Detail:
        "규범 템플릿 에이전트 목록, hooks, allow-list는 canonical 에이전트와 일치해야 합니다",
      step05Pass: "Canonical OpenClaw 런타임 자산이 유효합니다",
      step06: "canonical SKILL.md 확인",
      step06Detail: "규범 메타데이터, station deliverable 마커, references",
      step06Pass: "Canonical meta-theory 스킬 패키지가 유효합니다",
      step07: "Codex 런타임 자산 검증",
      step07Detail: "규범 설정 템플릿 마커",
      step07Pass: "Canonical Codex 런타임 자산이 유효합니다",
      step08: "런타임 능력 매트릭스 확인",
      step08Detail:
        "trigger/hook/review/verification/stop/writeback parity가 문서화되어야 합니다",
      step08Pass:
        "런타임 능력 매트릭스에 필요한 거버넌스 parity 마커가 포함되어 있습니다",
      step09: "run artifact fixtures 확인",
      step09Detail: "유효한 fixture는 합격; 무효한 public-ready fixture는 거부",
      step09Pass:
        "Run artifact 밸리데이터가 유효한 fixture를 수락하고 무효한 fixture를 거부합니다",
      step10: "package.json scripts 확인",
      step10Detail: "sync:runtimes / validate / eval:agents / verify:all, etc.",
      step10Pass: "모든 필수 스크립트가 등록되어 있습니다",
      step11: ".gitignore 규칙 확인",
      step11Detail: "node_modules/ / docs/ / local state isolation, etc.",
      step11Pass:
        ".gitignore에 모든 필요한 local-state 규칙이 포함되어 있습니다",
      step12: "canonical Claude settings 확인",
      step12Detail: "permission deny rules / PreToolUse / SubagentStart hooks",
      step12Pass: "Canonical Claude hooks와 권한이 올바르게 구성되어 있습니다",
      step13: "canonical MCP 설정 확인",
      step13Detail: "meta-kim-runtime 서비스 정의 및 시작 명령",
      step13Pass: "Canonical MCP 설정이 유효합니다",
      step14: "MCP 자체 테스트 실행",
      step14Detail: "meta-runtime-server를 시작하고 에이전트 수 검증",
      step14Pass: "MCP 자체 테스트가 합격했습니다",
      step15: "factory release artifacts 확인",
      step15Detail:
        "100 departments / 1000 specialists / 20 flagship / 1100 runtime packs",
      step15Pass:
        "Factory artifacts가 검증되었습니다 (또는 건너뜀 — 공개 리포지터리에 없음)",
      footerAll: (n) => `전체 ${n}개 검사 합격`,
      footerAgents: (n) => `${n}개 에이전트 준비됨`,
      valFailed: "검증 실패!",
      agentsReady: "개 에이전트 준비됨",
    },
  },
};

const LANG = detectLang();
const t = STRINGS[LANG] || STRINGS.en;

export { t, LANG };
