import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CodiLay — CLI Reference & Docs",
  description:
    "Full CLI reference for CodiLay: all 34 commands, flags, usage examples, and codilay.config.json schema.",
};

// ─── data ──────────────────────────────────────────────────────────────────

const pypiInstallSteps = [
  { label: "basic", cmd: "pip install codilay" },
  { label: "all", cmd: 'pip install "codilay[all]"' },
  { label: "global", cmd: "pipx install codilay" },
];

const installSteps = [
  { label: "clone", cmd: "git clone https://github.com/HarmanPreet-Singh-XYT/codilay.git && cd codilay" },
  { label: "install", cmd: 'pip install -e ".[all]"' },
  { label: "setup", cmd: "codilay setup" },
  { label: "run", cmd: "codilay ." },
];

interface Flag {
  flag: string;
  desc: string;
}

interface Example {
  cmd: string;
  comment?: string;
}

interface Command {
  cmd: string;
  action: string;
  group: string;
  desc: string;
  flags?: Flag[];
  examples?: Example[];
}

const commands: Command[] = [
  // Core
  {
    cmd: "codilay",
    action: "Launch the Interactive Menu",
    group: "core",
    desc: "Opens the Interactive Control Center — a full-screen TUI for managing projects, configuring providers, and launching scans without memorizing flags.",
    examples: [{ cmd: "codilay", comment: "opens the interactive menu" }],
  },
  {
    cmd: "codilay .",
    action: "Document current directory (incremental)",
    group: "core",
    desc: "Runs the full 5-phase agent loop on the current directory. If a prior run exists, only files changed since the last Git commit are re-processed.",
    examples: [
      { cmd: "codilay .", comment: "document current directory" },
      { cmd: "codilay ./my-project", comment: "document a specific path" },
    ],
  },
  {
    cmd: "codilay setup",
    action: "Configure provider, model, and API keys",
    group: "core",
    desc: "Interactive wizard that securely stores your LLM provider, model selection, and API keys. Runs once — no need to export env vars on every session.",
    examples: [{ cmd: "codilay setup" }],
  },
  {
    cmd: "codilay keys",
    action: "Manage stored API keys",
    group: "core",
    desc: "List, add, rotate, or delete stored API keys for any configured provider.",
    examples: [{ cmd: "codilay keys" }],
  },
  {
    cmd: "codilay clean .",
    action: "Wipe all generated artifacts",
    group: "core",
    desc: "Removes CODEBASE.md, links.json, .codilay_state.json, and any cached conversation data for the given project path.",
    examples: [{ cmd: "codilay clean .", comment: "clean current directory" }],
  },
  {
    cmd: "codilay status .",
    action: "Show documentation coverage and stale sections",
    group: "core",
    desc: "Reports how many files are documented, how many sections exist, and which sections are marked stale (source changed since last doc run).",
    examples: [{ cmd: "codilay status ." }],
  },
  {
    cmd: "codilay diff .",
    action: "See what changed in files since the last run",
    group: "core",
    desc: "Git-level diff showing which source files were modified, added, or deleted since the last codilay run.",
    examples: [{ cmd: "codilay diff ." }],
  },
  // Chat
  {
    cmd: "codilay chat .",
    action: "Start a Chat session about the project",
    group: "chat",
    desc: "Opens an interactive chat session. Three escalation layers: doc-based (instant), deep source reading (when doc can't answer), and a learning loop that patches the doc with new answers.",
    examples: [
      { cmd: "codilay chat .", comment: "start chat for current directory" },
      { cmd: "codilay chat ./my-project" },
    ],
  },
  {
    cmd: 'codilay search . "query"',
    action: "Full-text search across all past conversations",
    group: "chat",
    desc: "TF-IDF inverted index search across every past chat session for the project. Finds that retry logic discussion from two weeks ago in milliseconds.",
    flags: [
      { flag: "--top N", desc: "Return top N results (default: 10)" },
      { flag: "--role assistant|user", desc: "Filter by message role" },
      { flag: "-c <id>", desc: "Restrict search to a specific conversation ID" },
      { flag: "--rebuild", desc: "Rebuild the search index before querying" },
    ],
    examples: [
      { cmd: 'codilay search . "authentication flow"' },
      { cmd: 'codilay search . "error handling" --top 5 --role assistant' },
      { cmd: 'codilay search . "database migration" -c <conversation-id>' },
      { cmd: 'codilay search . "query" --rebuild', comment: "rebuild index first" },
    ],
  },
  // Web UI
  {
    cmd: "codilay serve .",
    action: "Launch the Web UI",
    group: "web",
    desc: "Starts the FastAPI server and opens the 3-layer web documentation browser: Reader (static, no LLM), Chatbot (doc context), and Deep Agent (reads source when needed).",
    examples: [
      { cmd: "codilay serve .", comment: "serve current directory docs" },
      { cmd: "codilay serve ./my-project" },
    ],
  },
  // Watch
  {
    cmd: "codilay watch .",
    action: "Watch for file changes, auto-update docs",
    group: "watch",
    desc: "Runs CodiLay as a background daemon. Listens for filesystem events via watchdog and triggers incremental re-runs on save. Debounced to avoid redundant work.",
    flags: [
      { flag: "--debounce N", desc: "Debounce delay in seconds (default: 3)" },
      { flag: "-v", desc: "Verbose output for debugging" },
    ],
    examples: [
      { cmd: "codilay watch .", comment: "watch current directory" },
      { cmd: "codilay watch . --debounce 5", comment: "5-second debounce" },
      { cmd: "codilay watch . -v", comment: "verbose output" },
    ],
  },
  // Export
  {
    cmd: "codilay export .",
    action: "Export docs in AI-friendly format",
    group: "export",
    desc: "Produces a compressed, token-efficient export of your documentation tailored for LLM context windows. Supports LLM-guided interactive customization, natural language queries, and pre-configured presets.",
    flags: [
      { flag: "--interactive", desc: "Launch a conversational wizard to define your export spec" },
      { flag: "--query \"<text>\"", desc: "One-shot natural language query to filter export content" },
      { flag: "--preset <name>", desc: "Use a saved preset (structure, api-surface, etc.)" },
      { flag: "--format markdown|xml|json", desc: "Output format (default: markdown)" },
      { flag: "--max-tokens N", desc: "Cap the output at N tokens" },
      { flag: "--no-graph", desc: "Exclude the dependency graph" },
      { flag: "--strip-implementation", desc: "Remove function bodies to save tokens" },
      { flag: "-o <file>", desc: "Write output to a specific file" },
    ],
    examples: [
      { cmd: "codilay export . --interactive", comment: "LLM-guided export wizard" },
      { cmd: "codilay export . --query \"just api routes and database models\"", comment: "NL query mode" },
      { cmd: "codilay export . --preset architecture", comment: "use preset" },
      { cmd: "codilay export . --strip-implementation", comment: "signatures only" },
    ],
  },
  // Diff-run
  {
    cmd: "codilay diff-run .",
    action: "Document code changes only since a boundary",
    group: "diff-run",
    desc: "Generates a focused \"what changed\" report instead of a full reference. Feeds git diffs and existing context to the AI to explain the impact of changes since a specific commit, tag, date, or branch.",
    flags: [
      { flag: "--since <boundary>", desc: "Commit hash, tag, or date (YYYY-MM-DD)" },
      { flag: "--since-branch <name>", desc: "Compare current branch against target (e.g. main)" },
      { flag: "--update-doc", desc: "Patch findings directly into CODEBASE.md" },
    ],
    examples: [
      { cmd: "codilay diff-run . --since abc123f", comment: "since commit" },
      { cmd: "codilay diff-run . --since-branch main", comment: "since branching from main" },
      { cmd: "codilay diff-run . --since 2024-03-01", comment: "since date" },
    ],
  },
  // Audit
  {
    cmd: "codilay audit .",
    action: "Run automated codebase audits",
    group: "audit",
    desc: "Performs targeted security, architecture, performance, or quality scans. Analyzes the wire graph and file content through 60+ specialized audit lenses.",
    flags: [
      { flag: "--type <category>", desc: "Audit type (security, performance, architecture, quality, compliance, etc.)" },
      { flag: "--mode passive|active", desc: "Passive (fast, uses existing doc) or Active (deep file reading)" },
      { flag: "--list-types", desc: "Show all 60+ supported audit types" },
    ],
    examples: [
      { cmd: "codilay audit . --type security --mode passive", comment: "fast security pass" },
      { cmd: "codilay audit . --type architecture --mode active", comment: "deep architectural audit" },
      { cmd: "codilay audit . --type performance --mode active", comment: "active performance scan" },
    ],
  },
  // Diff-doc
  {
    cmd: "codilay diff-doc .",
    action: "Show section-level documentation diff between runs",
    group: "export",
    desc: "Compares the current documentation against the snapshot from the previous run, showing exactly which sections were added, removed, or modified. Snapshots are saved automatically after every run.",
    flags: [
      { flag: "--json-output", desc: "Output diff as JSON for programmatic use" },
    ],
    examples: [
      { cmd: "codilay diff-doc .", comment: "show doc changes since last run" },
      { cmd: "codilay diff-doc . --json-output" },
    ],
  },
  // Graph
  {
    cmd: "codilay graph .",
    action: "View and filter the dependency graph",
    group: "graph",
    desc: "Renders and filters the full wire dependency graph. Slice by wire type, file layer, module, connection count, or direction to surface architectural hubs and reduce noise on large repos.",
    flags: [
      { flag: "--wire-type import|call|ref", desc: "Filter to a specific wire type" },
      { flag: "--layer <path>", desc: "Filter to a specific directory layer" },
      { flag: "--min-connections N", desc: "Show only nodes with N+ connections" },
      { flag: "--direction incoming|outgoing|both", desc: "Filter edge direction" },
      { flag: "-x <glob>", desc: "Exclude files matching a glob pattern" },
      { flag: "--list-filters", desc: "List all available filter values" },
      { flag: "--json-output", desc: "Output as JSON" },
    ],
    examples: [
      { cmd: "codilay graph . --wire-type import" },
      { cmd: "codilay graph . --layer src/api" },
      { cmd: "codilay graph . --min-connections 3 --direction outgoing" },
      { cmd: 'codilay graph . -w import -l src/core -x "tests/**"' },
      { cmd: "codilay graph . --list-filters" },
      { cmd: "codilay graph . --json-output" },
    ],
  },
  // Triage feedback
  {
    cmd: "codilay triage-feedback add",
    action: "Flag an incorrect triage decision",
    group: "triage",
    desc: "Record a correction for a file or glob pattern that was mis-classified during triage. Corrections are stored per-project and automatically injected into future triage prompts.",
    flags: [
      { flag: ". <file> <from> <to>", desc: "Project path, file, current tier, correct tier" },
      { flag: "-r <reason>", desc: "Reason for the correction" },
      { flag: "--pattern", desc: "Treat the file argument as a glob pattern" },
    ],
    examples: [
      { cmd: "codilay triage-feedback add . src/auth/handler.py skim core -r \"Contains critical auth logic\"" },
      { cmd: 'codilay triage-feedback add . "tests/**" core skip --pattern -r "Tests should be skipped"' },
    ],
  },
  {
    cmd: "codilay triage-feedback list",
    action: "List all stored triage corrections",
    group: "triage",
    desc: "Shows all recorded triage corrections for the project.",
    examples: [{ cmd: "codilay triage-feedback list ." }],
  },
  {
    cmd: "codilay triage-feedback hint",
    action: "Set a project-type hint for triage",
    group: "triage",
    desc: "Attaches a free-text hint to a project type (e.g. react, django) that is injected into the triage prompt to guide classification.",
    examples: [
      { cmd: 'codilay triage-feedback hint . react "Treat all hooks/ files as core"' },
    ],
  },
  {
    cmd: "codilay triage-feedback remove",
    action: "Remove feedback for a specific file",
    group: "triage",
    desc: "Deletes a stored triage correction for a specific file path.",
    examples: [{ cmd: "codilay triage-feedback remove . src/auth/handler.py" }],
  },
  {
    cmd: "codilay triage-feedback clear",
    action: "Clear all triage feedback",
    group: "triage",
    desc: "Wipes all stored triage corrections for the project. Requires --yes confirmation flag.",
    examples: [{ cmd: "codilay triage-feedback clear . --yes" }],
  },
  // Team memory
  {
    cmd: "codilay team add-user",
    action: "Add a team member",
    group: "team",
    desc: "Registers a team member in the project's shared knowledge base. Used to attribute facts, decisions, and annotations.",
    examples: [{ cmd: 'codilay team add-user . alice --display-name "Alice Chen"' }],
  },
  {
    cmd: "codilay team add-fact",
    action: "Record a team fact",
    group: "team",
    desc: "Stores a shared fact about the project. Facts are injected into LLM context during documentation and chat sessions.",
    flags: [
      { flag: "-c <category>", desc: "Category (e.g. architecture, infra, api)" },
      { flag: "-a <user>", desc: "Author (team member username)" },
      { flag: "-t <tag>", desc: "Tag(s) for filtering (repeatable)" },
    ],
    examples: [
      { cmd: 'codilay team add-fact . "We use Celery for async tasks" -c architecture -a alice -t backend -t infra' },
    ],
  },
  {
    cmd: "codilay team add-decision",
    action: "Record an architectural decision",
    group: "team",
    desc: "Logs an architectural decision record (ADR) with rationale. Surfaced to the AI during documentation runs.",
    flags: [
      { flag: "-a <user>", desc: "Author (team member username)" },
      { flag: "-f <file>", desc: "Associated file path" },
    ],
    examples: [
      { cmd: 'codilay team add-decision . "Use PostgreSQL over MySQL" "Better JSON support, needed for our schema" -a alice -f src/db/' },
    ],
  },
  {
    cmd: "codilay team add-convention",
    action: "Add a coding convention",
    group: "team",
    desc: "Records a coding convention that the AI will respect when generating documentation and answering chat questions.",
    flags: [
      { flag: "-e <example>", desc: "JSON example of the convention" },
      { flag: "-a <user>", desc: "Author" },
    ],
    examples: [
      { cmd: 'codilay team add-convention . "Error Handling" "All API endpoints must return structured error responses" -e \'{"error": "message", "code": 400}\' -a alice' },
    ],
  },
  {
    cmd: "codilay team annotate",
    action: "Annotate a specific file",
    group: "team",
    desc: "Attaches a team note to a specific file, optionally scoped to a line range. Visible to the AI when processing that file.",
    flags: [
      { flag: "-a <user>", desc: "Author" },
      { flag: "-l <start>-<end>", desc: "Line range (e.g. 1-50)" },
    ],
    examples: [
      { cmd: 'codilay team annotate . src/api/routes.py "This file is getting too large, plan to split by domain" -a alice -l 1-50' },
    ],
  },
  {
    cmd: "codilay team facts / decisions / conventions / annotations / users",
    action: "List team knowledge",
    group: "team",
    desc: "List stored facts, decisions, conventions, file annotations, or team members. All support filtering flags.",
    flags: [
      { flag: "-c <category>", desc: "Filter facts by category" },
      { flag: "-s active|superseded", desc: "Filter decisions by status" },
      { flag: "-f <file>", desc: "Filter annotations by file" },
    ],
    examples: [
      { cmd: "codilay team facts .", comment: "all facts" },
      { cmd: "codilay team facts . -c architecture" },
      { cmd: "codilay team decisions . -s active" },
      { cmd: "codilay team conventions ." },
      { cmd: "codilay team annotations . -f src/api/routes.py" },
      { cmd: "codilay team users ." },
    ],
  },
  // Schedule
  {
    cmd: "codilay schedule set",
    action: "Configure a doc update schedule",
    group: "schedule",
    desc: "Sets up automatic documentation re-runs triggered by a cron expression, new commits on a branch, or both. Runs as a background daemon with PID file management.",
    flags: [
      { flag: "--cron <expr>", desc: "Cron expression (e.g. \"0 2 * * *\" for 2am daily)" },
      { flag: "--on-commit", desc: "Trigger on every new commit" },
      { flag: "--branch <name>", desc: "Branch to watch (default: main)" },
    ],
    examples: [
      { cmd: 'codilay schedule set . --cron "0 2 * * *"', comment: "daily at 2am" },
      { cmd: "codilay schedule set . --on-commit --branch main" },
      { cmd: 'codilay schedule set . --cron "0 2 * * *" --on-commit', comment: "both triggers" },
    ],
  },
  {
    cmd: "codilay schedule start",
    action: "Start the scheduler",
    group: "schedule",
    desc: "Starts the configured scheduler in the foreground.",
    flags: [{ flag: "-v", desc: "Verbose logging" }],
    examples: [
      { cmd: "codilay schedule start ." },
      { cmd: "codilay schedule start . -v" },
    ],
  },
  {
    cmd: "codilay schedule stop",
    action: "Stop a running scheduler",
    group: "schedule",
    desc: "Stops the running scheduler daemon for the project.",
    examples: [{ cmd: "codilay schedule stop ." }],
  },
  {
    cmd: "codilay schedule status",
    action: "Check current schedule",
    group: "schedule",
    desc: "Displays the current schedule configuration and daemon status.",
    examples: [{ cmd: "codilay schedule status ." }],
  },
  {
    cmd: "codilay schedule disable",
    action: "Disable the schedule",
    group: "schedule",
    desc: "Disables the schedule without deleting it. Re-enable with schedule set.",
    examples: [{ cmd: "codilay schedule disable ." }],
  },
  {
    cmd: "codilay team vote",
    action: "Vote on a fact",
    group: "team",
    desc: "Upvote or downvote a stored fact by its ID. Vote scores are surfaced to the AI to indicate community confidence.",
    examples: [{ cmd: "codilay team vote . <fact-id> up" }],
  },
  // Annotate
  {
    cmd: "codilay annotate .",
    action: "Write docs back into source files",
    group: "annotate",
    desc: "Uses wire knowledge to write docstrings and wire comments directly into your source code. Language-aware and supports multiple annotation levels.",
    flags: [
      { flag: "--dry-run", desc: "Preview what would be added without writing to disk" },
      { flag: "--scope <path>", desc: "Restrict annotation to a specific folder or file" },
      { flag: "--level docstrings|inline|full", desc: "Detail level (default: docstrings)" },
      { flag: "--rollback <id>", desc: "Undo a previous annotation run by timestamp ID" },
    ],
    examples: [
      { cmd: "codilay annotate .", comment: "annotate project (docstrings)" },
      { cmd: "codilay annotate . --dry-run", comment: "preview only" },
      { cmd: "codilay annotate . --scope src/api/ --level full", comment: "max detail for folder" },
      { cmd: "codilay annotate . --rollback 20240314_120000" },
    ],
  },
];

const groups: { key: string; label: string; color: string }[] = [
  { key: "core", label: "core", color: "text-accent" },
  { key: "chat", label: "chat", color: "text-cyan" },
  { key: "web", label: "web-ui", color: "text-amber" },
  { key: "watch", label: "watch", color: "text-amber" },
  { key: "export", label: "export", color: "text-cyan" },
  { key: "diff-run", label: "diff-run", color: "text-accent" },
  { key: "audit", label: "audit", color: "text-amber" },
  { key: "graph", label: "graph", color: "text-accent" },
  { key: "triage", label: "triage", color: "text-amber" },
  { key: "team", label: "team", color: "text-cyan" },
  { key: "schedule", label: "schedule", color: "text-accent" },
  { key: "annotate", label: "annotate", color: "text-amber" },
];

interface ConfigField {
  key: string;
  type: string;
  desc: string;
}

interface ConfigCategory {
  category: string;
  fields: ConfigField[];
}

const configCategories: ConfigCategory[] = [
  {
    category: "General",
    fields: [
      {
        key: "ignore",
        type: "List[str]",
        desc: "Glob patterns for files/folders to exclude from scans.",
      },
      {
        key: "notes",
        type: "str",
        desc: "High-level project context provided to the AI.",
      },
      {
        key: "instructions",
        type: "str",
        desc: "Specific documentation style or domain instructions.",
      },
      {
        key: "entryHint",
        type: "str",
        desc: "Point to the main entry file to help trace wires.",
      },
      {
        key: "skipGenerated",
        type: "List[str]",
        desc: "Optional override for default generated/lock file ignores.",
      },
    ],
  },
  {
    category: "LLM",
    fields: [
      {
        key: "provider",
        type: "str",
        desc: "AI provider (e.g., anthropic, openai, google, ollama).",
      },
      {
        key: "model",
        type: "str",
        desc: "Model identifier (e.g., claude-3-5-sonnet-latest).",
      },
      {
        key: "baseUrl",
        type: "str",
        desc: "Custom API base URL (useful for local models or proxies).",
      },
      {
        key: "maxTokensPerCall",
        type: "int",
        desc: "Maximum output tokens per individual agent call.",
      },
    ],
  },
  {
    category: "Triage",
    fields: [
      {
        key: "mode",
        type: "str",
        desc: "Default classification strategy (smart, core, skim, skip).",
      },
      {
        key: "includeTests",
        type: "bool",
        desc: "Whether to process test files (defaults to false).",
      },
      {
        key: "forceInclude",
        type: "List[str]",
        desc: "Patterns to always treat as Core documentation.",
      },
      {
        key: "forceSkip",
        type: "List[str]",
        desc: "Patterns to always ignore.",
      },
    ],
  },
  {
    category: "Chunking",
    fields: [
      {
        key: "tokenThreshold",
        type: "int",
        desc: "Files larger than this (in tokens) are split into chunks.",
      },
      {
        key: "maxChunkTokens",
        type: "int",
        desc: "Target token count for each detail chunk.",
      },
      {
        key: "overlapRatio",
        type: "float",
        desc: "Contextual overlap between chunks (e.g. 0.10 for 10%).",
      },
    ],
  },
  {
    category: "Parallel",
    fields: [
      {
        key: "enabled",
        type: "bool",
        desc: "Enable/disable concurrent processing of files within the same tier.",
      },
      {
        key: "maxWorkers",
        type: "int",
        desc: "Max number of concurrent LLM calls.",
      },
    ],
  },
];

const providers = [
  { name: "Anthropic", models: "claude-3-5-sonnet-latest ✦, claude-3-haiku-...", tag: "CLOUD" },
  { name: "OpenAI", models: "gpt-4o, gpt-4o-mini ✦, o1 ✦, o3 ✦, ...", tag: "CLOUD" },
  { name: "Google Gemini", models: "gemini-1.5-pro, gemini-2.0-flash, ...", tag: "CLOUD" },
  { name: "Ollama", models: "llama3, mistral, codellama, ...", tag: "LOCAL" },
  { name: "Groq", models: "llama3-70b-8192, mixtral-8x7b, ...", tag: "LOCAL" },
  { name: "DeepSeek", models: "deepseek-coder, deepseek-reasoner ✦, ...", tag: "CLOUD" },
  { name: "Mistral", models: "mistral-large, codestral, ...", tag: "CLOUD" },
  { name: "xAI", models: "grok-beta, grok-2", tag: "CLOUD" },
  { name: "Llama Cloud", models: "llama-3.1-70b-instruct, ...", tag: "CLOUD" },
  { name: "OpenAI-compatible", models: "Any endpoint with /v1/chat/completions", tag: "CUSTOM" },
];

// ─── component ─────────────────────────────────────────────────────────────

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-bg-primary font-mono text-text-primary">

      {/* Top bar */}
      <div className="border-b border-border bg-bg-secondary sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between">
          <Link href="/" className="text-accent text-sm font-bold text-glow-green">
            <span className="text-text-tertiary">[</span>codilay<span className="text-text-tertiary">]</span>
          </Link>
          <div className="flex items-center gap-4 text-[10px] text-text-tertiary">
            <span className="text-accent">./docs</span>
            <a
              href="https://github.com/HarmanPreet-Singh-XYT/codilay"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              ./github →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Page header */}
        <div className="border-b border-border pb-8 mb-10">
          <div className="text-text-tertiary text-xs mb-1">## docs</div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">CLI Reference</h1>
          <p className="text-text-secondary text-sm max-w-2xl">
            <span className="text-text-tertiary">// </span>
            all 34 commands, flags, and examples — sourced directly from the CodiLay README.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-border mt-6 w-fit">
            {[
              { val: "34", label: "commands" },
              { val: "11", label: "groups" },
              { val: "359/359", label: "tests" },
              { val: "MIT", label: "license" },
            ].map((s, i) => (
              <div key={s.label} className={`px-4 py-2 text-center ${i < 3 ? "border-r border-border" : ""}`}>
                <div className="text-accent text-sm font-bold">{s.val}</div>
                <div className="text-text-dim text-[9px]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-column layout: sidebar TOC + content */}
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block w-44 shrink-0">
            <div className="sticky top-16 space-y-0 border border-border">
              <div className="px-3 py-2 border-b border-border text-[9px] font-bold text-text-dim tracking-widest">
                SECTIONS
              </div>
              {[
                { href: "#install", label: "installation" },
                { href: "#quick-ref", label: "quick reference" },
                ...groups.map(g => ({ href: `#group-${g.key}`, label: g.label })),
                { href: "#wire-model", label: "the wire model" },
                { href: "#smart-triage", label: "smart triage" },
                { href: "#resilience", label: "resilience & recovery" },
                { href: "#config", label: "config file" },
                { href: "#providers", label: "providers" },
                { href: "#project-structure", label: "project structure" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-1.5 text-[10px] text-text-tertiary hover:text-accent hover:bg-accent/5 transition-colors border-b border-border/50 last:border-0"
                >
                  ./{item.label}
                </a>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-12">

            {/* Installation */}
            <section id="install">
              <div className="text-text-tertiary text-xs mb-1">## installation</div>
              <h2 className="text-lg font-bold mb-1">Getting started</h2>

              {/* PyPI — recommended */}
              <p className="text-text-secondary text-xs mb-3 mt-4">
                <span className="text-accent font-bold">Install from PyPI</span>
                <span className="text-text-tertiary"> // recommended</span>
              </p>
              <div className="border border-border">
                {pypiInstallSteps.map((step, i) => (
                  <div key={step.label} className={`flex items-center${i > 0 ? " border-t border-border" : ""}`}>
                    <span className="text-[9px] text-text-dim px-3 py-2.5 border-r border-border w-16 text-center shrink-0">
                      {step.label}
                    </span>
                    <code className="flex-1 text-xs px-4 py-2.5 text-text-primary">
                      <span className="text-accent">$ </span>{step.cmd}
                    </code>
                  </div>
                ))}
              </div>
              <div className="mt-2 border border-border bg-bg-secondary px-4 py-3 text-[11px] text-text-secondary">
                <span className="text-accent font-bold">tip: </span>
                <span className="text-text-tertiary">// </span>
                use <code className="text-amber">pip install codilay</code> for a basic install,{" "}
                <code className="text-amber">{`"codilay[all]"`}</code> for Web UI + Watch mode,{" "}
                or <code className="text-amber">pipx install codilay</code> for a global CLI (recommended).
              </div>

              {/* Source install */}
              <p className="text-text-secondary text-xs mb-3 mt-6">
                <span className="text-text-tertiary font-bold">Install from source</span>
                <span className="text-text-tertiary"> // for development / latest</span>
              </p>
              <p className="text-text-secondary text-xs mb-3">
                <span className="text-text-tertiary">// </span>
                CodiLay can also be installed directly from the GitHub repository.
              </p>
              <div className="border border-border">
                {installSteps.map((step, i) => (
                  <div key={step.label} className={`flex items-center${i > 0 ? " border-t border-border" : ""}`}>
                    <span className="text-[9px] text-text-dim px-3 py-2.5 border-r border-border w-16 text-center shrink-0">
                      {step.label}
                    </span>
                    <code className="flex-1 text-xs px-4 py-2.5 text-text-primary">
                      <span className="text-accent">$ </span>{step.cmd}
                    </code>
                  </div>
                ))}
              </div>
              <div className="mt-3 border border-border bg-bg-secondary px-4 py-3 text-[11px] text-text-secondary">
                <span className="text-accent font-bold">install variants: </span>
                <span className="text-text-tertiary">// </span>
                use <code className="text-amber">.[serve]</code> for Web UI only,{" "}
                <code className="text-amber">.[watch]</code> for Watch mode only,{" "}
                <code className="text-amber">.[all]</code> for everything,{" "}
                <code className="text-amber">.[all,dev]</code> to include test/dev deps.
              </div>
            </section>

            {/* Quick reference table */}
            <section id="quick-ref">
              <div className="text-text-tertiary text-xs mb-1">## quick-reference</div>
              <h2 className="text-lg font-bold mb-1">All commands</h2>
              <p className="text-text-secondary text-xs mb-4">
                <span className="text-text-tertiary">// </span>
                full table — click any row to jump to the detailed entry.
              </p>
              <div className="border border-border">
                <div className="grid grid-cols-[1fr_1.5fr] border-b border-border bg-bg-secondary">
                  <div className="px-4 py-2 text-[9px] font-bold text-text-dim tracking-widest">COMMAND</div>
                  <div className="px-4 py-2 text-[9px] font-bold text-text-dim tracking-widest border-l border-border">ACTION</div>
                </div>
                {commands.map((c, i) => {
                  const group = groups.find(g => g.key === c.group);
                  return (
                    <a
                      key={i}
                      href={`#group-${c.group}`}
                      className={`grid grid-cols-[1fr_1.5fr] hover:bg-accent/5 transition-colors ${i < commands.length - 1 ? "border-b border-border/50" : ""}`}
                    >
                      <div className="px-4 py-2 flex items-center gap-2">
                        <code className="text-[10px] text-accent">{c.cmd}</code>
                      </div>
                      <div className="px-4 py-2 border-l border-border/50 flex items-center gap-2">
                        <span className={`text-[8px] font-bold border px-1 shrink-0 ${group?.color ?? "text-text-tertiary"} border-current/30 bg-current/5`}>
                          {group?.label.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-text-secondary">{c.action}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>

            {/* Per-group sections */}
            {groups.map((group) => {
              const groupCmds = commands.filter(c => c.group === group.key);
              return (
                <section key={group.key} id={`group-${group.key}`}>
                  <div className="text-text-tertiary text-xs mb-1">## {group.label}</div>
                  <h2 className={`text-lg font-bold mb-4 ${group.color}`}>{group.label}</h2>

                  <div className="space-y-4">
                    {groupCmds.map((c, ci) => (
                      <div key={ci} className="border border-border">
                        {/* Command header */}
                        <div className="flex items-center gap-0 border-b border-border bg-bg-secondary">
                          <div className="px-4 py-2.5 flex-1 flex items-center gap-3">
                            <code className={`text-sm font-bold ${group.color}`}>{c.cmd}</code>
                          </div>
                          <div className="px-3 py-2.5 border-l border-border">
                            <span className={`text-[8px] font-bold border px-1.5 py-0.5 ${group.color} border-current/30 bg-current/5`}>
                              {group.label.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-4">
                          {/* Action + description */}
                          <div>
                            <div className="text-[10px] font-bold text-text-primary mb-1">{c.action}</div>
                            <p className="text-text-secondary text-[11px] leading-relaxed">{c.desc}</p>
                          </div>

                          {/* Flags */}
                          {c.flags && c.flags.length > 0 && (
                            <div>
                              <div className="text-[9px] font-bold text-text-dim tracking-widest mb-2">FLAGS</div>
                              <div className="border border-border">
                                {c.flags.map((f, fi) => (
                                  <div
                                    key={fi}
                                    className={`grid grid-cols-[180px_1fr] ${fi < c.flags!.length - 1 ? "border-b border-border/50" : ""}`}
                                  >
                                    <code className="text-[10px] text-amber px-3 py-1.5 border-r border-border/50">{f.flag}</code>
                                    <span className="text-[10px] text-text-secondary px-3 py-1.5">{f.desc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Examples */}
                          {c.examples && c.examples.length > 0 && (
                            <div>
                              <div className="text-[9px] font-bold text-text-dim tracking-widest mb-2">EXAMPLES</div>
                              <div className="border border-border bg-bg-tertiary">
                                {c.examples.map((ex, ei) => (
                                  <div
                                    key={ei}
                                    className={`flex items-baseline gap-2 px-3 py-1.5 ${ei < c.examples!.length - 1 ? "border-b border-border/30" : ""}`}
                                  >
                                    <span className="text-accent text-xs shrink-0">$</span>
                                    <code className="text-xs text-text-primary flex-1">{ex.cmd}</code>
                                    {ex.comment && (
                                      <span className="text-[9px] text-text-dim shrink-0"># {ex.comment}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
 
            {/* Core Concepts: The Wire Model */}
            <section id="wire-model">
              <div className="text-text-tertiary text-xs mb-1">## core-concepts</div>
              <h2 className="text-lg font-bold mb-1 text-accent">The Wire Model</h2>
              <p className="text-text-secondary text-xs mb-4">
                <span className="text-text-tertiary">// </span>
                CodiLay treats every import, call, and reference as a <span className="text-accent font-bold">Wire</span>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border p-4 bg-bg-secondary">
                  <div className="text-[10px] font-bold text-accent mb-2">OPEN WIRES</div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Unresolved references that the agent is "hunting" for. These form the bridge between the processed and unprocessed parts of your codebase.
                  </p>
                </div>
                <div className="border border-border p-4 bg-bg-secondary">
                  <div className="text-[10px] font-bold text-cyan mb-2">CLOSED WIRES</div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Successfully traced connections that form segments of the dependency graph. These represent verified implementation links.
                  </p>
                </div>
              </div>
            </section>

            {/* Core Concepts: Smart Triage */}
            <section id="smart-triage">
              <div className="text-text-tertiary text-xs mb-1">## core-concepts</div>
              <h2 className="text-lg font-bold mb-1 text-cyan">Smart Triage</h2>
              <p className="text-text-secondary text-xs mb-4">
                <span className="text-text-tertiary">// </span>
                High-speed classification phase to save tokens and focus on what matters.
              </p>
              <div className="border border-border overflow-hidden">
                <div className="grid grid-cols-3 border-b border-border bg-bg-secondary">
                  {['CORE', 'SKIM', 'SKIP'].map(tier => (
                    <div key={tier} className="px-3 py-2 text-[9px] font-bold text-text-dim text-center border-r border-border last:border-0">{tier}</div>
                  ))}
                </div>
                <div className="grid grid-cols-3">
                  <div className="p-3 text-[10px] text-text-secondary border-r border-border">Full architectural analysis and deep documentation.</div>
                  <div className="p-3 text-[10px] text-text-secondary border-r border-border">Metadata and signatures only — saves tokens on minor utilities.</div>
                  <div className="p-3 text-[10px] text-text-secondary">Ignores boilerplate, generated code, and platform noise.</div>
                </div>
              </div>
            </section>

            {/* Resilience & Recovery */}
            <section id="resilience">
              <div className="text-text-tertiary text-xs mb-1">## resilience</div>
              <h2 className="text-lg font-bold mb-1 text-amber">Resilience & Recovery</h2>
              <p className="text-text-secondary text-xs mb-4">
                <span className="text-text-tertiary">// </span>
                Designed to survive interruptions without losing progress or money.
              </p>
              <div className="space-y-3">
                {[
                  { title: "State Backups", desc: "Saves atomically after every file. Keeps 3 rolling backups (.bak.1, .bak.2, .bak.3) for auto-recovery if primary state is corrupt." },
                  { title: "Resume From Any Point", desc: "Whether Ctrl+C, crash, or API failure, the run resumes exactly where it stopped with zero-cost re-verification." },
                  { title: "Smart Resume Preview", desc: "Interactively previews processed vs. remaining files with token cost clarity before confirmation." },
                  { title: "Lock Prevention", desc: "Uses PID-validated lock files to prevent concurrent runs on the same project path." },
                  { title: "Auth-Error Pause", desc: "If an API key expires mid-run, the process pauses and saves state, allowing you to update keys and resume." },
                  { title: "Complete Error Panel", desc: "Displays a structured summary of every skip, warning, and non-fatal error at the end of the run." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-border bg-bg-secondary/30 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber opacity-30 group-hover:opacity-100 transition-opacity" />
                    <div className="w-1/4 shrink-0 text-[10px] font-bold text-amber">{item.title.toUpperCase()}</div>
                    <div className="flex-1 text-[11px] text-text-secondary leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Config file reference */}
            <section id="config">
              <div className="text-text-tertiary text-xs mb-1">## config</div>
              <h2 className="text-lg font-bold mb-1">codilay.config.json</h2>
              <p className="text-text-secondary text-xs mb-4">
                <span className="text-text-tertiary">// </span>
                place in your project root. all fields are optional — CodiLay works without it.
              </p>

              {/* Full example */}
              <div className="border border-border bg-bg-tertiary mb-4">
                <div className="flex items-center gap-2 border-b border-border bg-bg-secondary px-3 py-2">
                  <span className="text-[10px] text-text-tertiary">codilay.config.json</span>
                </div>
                <pre className="p-4 text-xs text-text-secondary leading-relaxed overflow-x-auto">{`{
  "ignore": ["dist/**", "**/tests/**"],
  "notes": "This is a React/Next.js frontend using Tailwind.",
  "instructions": "Focus on data-fetching patterns and state management.",
  "entryHint": "src/main.py",
  "llm": {
    "provider": "anthropic",
    "model": "claude-3-5-sonnet-latest",
    "baseUrl": "https://api.anthropic.com",
    "maxTokensPerCall": 4096
  },
  "triage": {
    "mode": "smart",
    "includeTests": false,
    "forceInclude": ["critical_logic/*.py"],
    "forceSkip": ["legacy_v1/*.js"]
  },
  "chunking": {
    "tokenThreshold": 6000,
    "maxChunkTokens": 4000,
    "overlapRatio": 0.10
  },
  "parallel": {
    "enabled": true,
    "maxWorkers": 4
  }
}`}</pre>
              </div>

              {/* Field table */}
              <div className="border border-border">
                <div className="grid grid-cols-[100px_140px_90px_1fr] border-b border-border bg-bg-secondary">
                  <div className="px-3 py-2 text-[9px] font-bold text-text-dim tracking-widest">CATEGORY</div>
                  <div className="px-3 py-2 text-[9px] font-bold text-text-dim tracking-widest border-l border-border">KEY</div>
                  <div className="px-3 py-2 text-[9px] font-bold text-text-dim tracking-widest border-l border-border">TYPE</div>
                  <div className="px-3 py-2 text-[9px] font-bold text-text-dim tracking-widest border-l border-border">DESCRIPTION</div>
                </div>
                {configCategories.map((cat) =>
                  cat.fields.map((f, fi) => (
                    <div
                      key={`${cat.category}-${f.key}`}
                      className="grid grid-cols-[100px_140px_90px_1fr] border-b border-border/50 last:border-0"
                    >
                      <div className="px-3 py-2.5">
                        {fi === 0 ? (
                          <span className="text-[9px] font-bold text-text-dim tracking-wide">{cat.category}</span>
                        ) : null}
                      </div>
                      <div className="px-3 py-2.5 border-l border-border/50">
                        <code className="text-[10px] text-accent">{f.key}</code>
                      </div>
                      <div className="px-3 py-2.5 border-l border-border/50">
                        <span className="text-[10px] text-amber">{f.type}</span>
                      </div>
                      <div className="px-3 py-2.5 border-l border-border/50">
                        <p className="text-[10px] text-text-secondary leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Providers */}
            <section id="providers">
              <div className="text-text-tertiary text-xs mb-1">## providers</div>
              <h2 className="text-lg font-bold mb-1">Multi-provider support</h2>
              <p className="text-text-secondary text-xs mb-4">
                <span className="text-text-tertiary">// </span>
                CodiLay is provider-agnostic. configure globally via{" "}
                <code className="text-accent">codilay setup</code> or per-project via{" "}
                <code className="text-accent">codilay.config.json</code>.
              </p>
              <div className="border border-border">
                <div className="grid grid-cols-[120px_60px_1fr] border-b border-border bg-bg-secondary">
                  <div className="px-3 py-2 text-[9px] font-bold text-text-dim tracking-widest">PROVIDER</div>
                  <div className="px-3 py-2 text-[9px] font-bold text-text-dim tracking-widest border-l border-border">TYPE</div>
                  <div className="px-3 py-2 text-[9px] font-bold text-text-dim tracking-widest border-l border-border">MODELS</div>
                </div>
                {providers.map((p, i) => {
                  const tagColor = p.tag === "LOCAL" ? "text-cyan border-cyan/30 bg-cyan/5"
                    : p.tag === "CUSTOM" ? "text-amber border-amber/30 bg-amber/5"
                    : "text-accent border-accent/30 bg-accent/5";
                  return (
                    <div key={p.name} className={`grid grid-cols-[120px_60px_1fr] ${i < providers.length - 1 ? "border-b border-border/50" : ""}`}>
                      <div className="px-3 py-2.5 text-[10px] text-text-primary font-bold">{p.name}</div>
                      <div className="px-3 py-2.5 border-l border-border/50">
                        <span className={`text-[8px] font-bold border px-1 ${tagColor}`}>{p.tag}</span>
                      </div>
                      <div className="px-3 py-2.5 border-l border-border/50">
                        <code className="text-[10px] text-text-secondary">{p.models}</code>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Project structure */}
            <section id="project-structure">
              <div className="text-text-tertiary text-xs mb-1">## project-structure</div>
              <h2 className="text-lg font-bold mb-1">Source layout</h2>
              <p className="text-text-secondary text-xs mb-4">
                <span className="text-text-tertiary">// </span>
                all source lives under <code className="text-accent">src/codilay/</code>.
              </p>
              <div className="border border-border bg-bg-tertiary">
                <div className="flex items-center gap-2 border-b border-border bg-bg-secondary px-3 py-2">
                  <span className="text-[10px] text-text-tertiary">src/codilay/</span>
                </div>
                <div className="p-4">
                  {[
                    { file: "cli.py", desc: "Command parsing & Interactive Menu" },
                    { file: "scanner.py", desc: "Git-aware file walking" },
                    { file: "triage.py", desc: "AI-powered file categorization" },
                    { file: "processor.py", desc: "The Agent Loop & large file chunking" },
                    { file: "wire_manager.py", desc: "Linkage & dependency resolution" },
                    { file: "docstore.py", desc: "Living CODEBASE.md management" },
                    { file: "chatstore.py", desc: "Persistent memory & chat history" },
                    { file: "state.py", desc: "Atomic saves & 3-backup rotation" },
                    { file: "error_tracker.py", desc: "Run-scoped error collector" },
                    { file: "pricing.py", desc: "Model pricing & cost estimation" },
                    { file: "server.py", desc: "FastAPI Intelligence Server (Web UI + API)" },
                    { file: "watcher.py", desc: "File system watcher (watch mode)" },
                    { file: "exporter.py", desc: "AI-friendly doc export (markdown/xml/json)" },
                    { file: "export_spec.py", desc: "Export specification schema & presets" },
                    { file: "interactive_export.py", desc: "LLM conversation handler for exports" },
                    { file: "doc_differ.py", desc: "Section-level doc diffing & snapshots" },
                    { file: "diff_analyzer.py", desc: "Git diff boundary resolution" },
                    { file: "change_report.py", desc: "Change report generation (diff-run)" },
                    { file: "triage_feedback.py", desc: "Triage correction store" },
                    { file: "graph_filter.py", desc: "Dependency graph filtering engine" },
                    { file: "team_memory.py", desc: "Shared team knowledge base" },
                    { file: "search.py", desc: "Full-text conversation search" },
                    { file: "scheduler.py", desc: "Cron & commit-based auto re-runs" },
                    { file: "annotator.py", desc: "Code annotation engine" },
                    { file: "web/", desc: "Premium web frontend" },
                  ].map((f, i, arr) => (
                    <div key={f.file} className={`flex items-baseline gap-4 py-1 ${i < arr.length - 1 ? "border-b border-border/20" : ""}`}>
                      <code className="text-[10px] text-accent w-36 shrink-0">{f.file}</code>
                      <span className="text-[10px] text-text-tertiary"># {f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* VSCode extension */}
              <div className="mt-4 border border-border bg-bg-tertiary">
                <div className="flex items-center gap-2 border-b border-border bg-bg-secondary px-3 py-2">
                  <span className="text-[10px] text-text-tertiary">vscode-extension/</span>
                  <span className="text-[8px] font-bold text-amber border border-amber/30 bg-amber/5 px-1">EXT</span>
                </div>
                <div className="p-4">
                  {[
                    { file: "package.json", desc: "Extension manifest" },
                    { file: "tsconfig.json", desc: "TypeScript config" },
                    { file: "src/extension.ts", desc: "Extension entry point — sidebar, webview, decorations, commands" },
                  ].map((f, i, arr) => (
                    <div key={f.file} className={`flex items-baseline gap-4 py-1 ${i < arr.length - 1 ? "border-b border-border/20" : ""}`}>
                      <code className="text-[10px] text-amber w-36 shrink-0">{f.file}</code>
                      <span className="text-[10px] text-text-tertiary"># {f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="text-[10px] text-text-dim">
            © {new Date().getFullYear()} CodiLay — open source, MIT license
          </div>
          <div className="flex items-center gap-0 border border-border text-[10px]">
            <Link href="/" className="px-3 py-1.5 text-text-tertiary hover:text-accent hover:bg-accent/5 transition-colors border-r border-border">
              ./ home
            </Link>
            <a
              href="https://github.com/HarmanPreet-Singh-XYT/codilay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-text-tertiary hover:text-accent hover:bg-accent/5 transition-colors"
            >
              ./github →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
