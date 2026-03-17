import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";

const phases = [
  {
    id: "P1",
    phase: "bootstrap",
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/5",
    description:
      "Parses .gitignore, loads config, runs the file tree, preloads existing markdown files. Establishes the full picture of what exists.",
    detail:
      "parse .gitignore → merge config ignores → tree walk → collect .md files → build raw file list",
  },
  {
    id: "P2",
    phase: "triage",
    color: "text-cyan",
    border: "border-cyan/30",
    bg: "bg-cyan/5",
    description:
      "A single cheap LLM call sees only filenames — no content. Categorises every file: core (document fully), skim (extract metadata), skip (ignore).",
    detail:
      "Flutter → skips ios/, android/ | React → skips .next/, node_modules/ | Any → skips dist/, *.lock",
  },
  {
    id: "P3",
    phase: "planning",
    color: "text-amber",
    border: "border-amber/30",
    bg: "bg-amber/5",
    description:
      "The planner sees the curated file tree and produces an ordered processing queue. Files prioritized by architectural importance — entry points first.",
    detail:
      "output: ordered queue + parked files (ambiguous deps) + doc skeleton + suggested sections",
  },
  {
    id: "P4",
    phase: "processing-loop",
    color: "text-amber",
    border: "border-amber/30",
    bg: "bg-amber/5",
    description:
      "The core agent loop. Each file is read, relevant doc chunks loaded, LLM produces a structured diff, docstore is patched, wires opened or closed.",
    detail:
      "per file: read → load relevant chunks → LLM call → apply diff → update wires → reprioritize queue",
  },
  {
    id: "P5",
    phase: "finalize",
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/5",
    description:
      "Final sweep resolves pending markers, documents parked files, surfaces unresolved references, assembles CODEBASE.md with the full dependency graph.",
    detail:
      "output: CODEBASE.md + links.json + .codilay_state.json (commit hash stored for future re-runs)",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 bg-bg-secondary border-y border-border font-mono"
    >
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          label="how-it-works"
          title="five phases. one command."
          description="Run codilay . and the agent handles everything — from scanning to triage to the final assembled document."
          center
        />

        <div className="mt-10 max-w-3xl mx-auto space-y-0">
          {phases.map((phase, i) => (
            <AnimatedSection key={phase.phase} delay={i * 80}>
              <div className={`border border-border border-b-0 last:border-b p-0 hover:bg-bg-card transition-colors`}>
                <div className="flex items-stretch">
                  {/* Phase indicator */}
                  <div className={`w-16 shrink-0 flex flex-col items-center justify-center border-r border-border py-5 ${phase.bg}`}>
                    <span className={`text-[9px] font-bold ${phase.color}`}>{phase.id}</span>
                    <div className={`w-px flex-1 ${phase.color} opacity-20 mt-2`} />
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className={`text-xs font-bold ${phase.color} mb-1`}>
                      ./{phase.phase}
                    </div>
                    <p className="text-text-secondary text-[11px] leading-relaxed mb-2">
                      {phase.description}
                    </p>
                    <div className="bg-bg-tertiary border border-border px-3 py-2 text-[10px] text-text-tertiary font-mono leading-relaxed">
                      <span className="text-text-dim">$ </span>{phase.detail}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
