import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";

const layers = [
  {
    name: "CLI Layer",
    tag: "CLI",
    tagColor: "text-accent",
    tagBg: "bg-accent/10 border-accent/30",
    desc: "30+ commands via Click. Interactive TUI with Rich. Init, run, watch, export, search, schedule, and more. Entry point for everything.",
    files: "cli.py · settings.py",
  },
  {
    name: "Agent Core",
    tag: "AGENT",
    tagColor: "text-cyan",
    tagBg: "bg-cyan/10 border-cyan/30",
    desc: "The 5-phase loop: scanner → triage → planner → processor → finalizer. Wire manager tracks all open/closed wires. Docstore manages sections independently.",
    files: "scanner.py · triage.py · planner.py · processor.py · wire_manager.py · docstore.py",
  },
  {
    name: "Intelligence Layer",
    tag: "LLM",
    tagColor: "text-cyan",
    tagBg: "bg-cyan/10 border-cyan/30",
    desc: "Unified LLM client across Anthropic, OpenAI, and 8+ providers. All prompts return structured JSON. Large file handling with skeleton + detail passes.",
    files: "llm_client.py · prompts.py · large_file.py",
  },
  {
    name: "Feature Modules",
    tag: "MODULES",
    tagColor: "text-accent",
    tagBg: "bg-accent/10 border-accent/30",
    desc: "Watch mode, doc diffing, conversation search, graph filtering, AI export, team memory, triage feedback, scheduled re-runs. Each standalone with clean interfaces.",
    files: "watcher.py · doc_differ.py · search.py · graph_filter.py · exporter.py · team_memory.py · triage_feedback.py · scheduler.py",
  },
  {
    name: "Web & API Layer",
    tag: "WEB",
    tagColor: "text-amber",
    tagBg: "bg-amber/10 border-amber/30",
    desc: "FastAPI server with SSE streaming for chat. 3-layer UI: Reader (static render), Chatbot (doc context), Deep Agent (reads source when needed).",
    files: "server.py · web/index.html",
  },
  {
    name: "Integrations",
    tag: "EXT",
    tagColor: "text-accent",
    tagBg: "bg-accent/10 border-accent/30",
    desc: "Git integration for change detection and re-runs. VSCode extension as thin API client. Output portability with configurable gitignore modes.",
    files: "git_tracker.py · vscode-extension/",
  },
];

export default function Architecture() {
  return (
    <section className="py-16 font-mono">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          label="architecture"
          title="built in layers. each one independent."
          description="30k+ lines across 30+ source files. Every layer can operate independently — CLI without web UI, agent without watcher, chat without scheduler."
          center
        />

        <div className="mt-10 max-w-4xl mx-auto border border-border">
          {layers.map((layer, i) => (
            <AnimatedSection key={layer.name} delay={i * 60}>
              <div className={`p-4 hover:bg-bg-secondary transition-colors ${i < layers.length - 1 ? "border-b border-border" : ""}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="sm:w-36 shrink-0">
                    <span className={`text-[9px] font-bold border px-1.5 py-0.5 ${layer.tagColor} ${layer.tagBg}`}>
                      {layer.tag}
                    </span>
                    <div className="text-xs font-bold text-text-primary mt-1">{layer.name}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] text-text-secondary leading-relaxed mb-1.5">
                      {layer.desc}
                    </p>
                    <p className="text-[10px] text-text-tertiary font-mono">
                      <span className="text-text-dim">files: </span>{layer.files}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Stats bar */}
        <AnimatedSection delay={450} className="mt-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 border border-border">
            {[
              { value: "30+", label: "source files" },
              { value: "30k+", label: "lines of code" },
              { value: "30+", label: "CLI commands" },
              { value: "600+", label: "tests passing" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-4 py-3 text-center ${i < 3 ? "border-r border-border" : ""}`}
              >
                <div className="text-base font-bold text-accent">{s.value}</div>
                <div className="text-[10px] text-text-tertiary mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
