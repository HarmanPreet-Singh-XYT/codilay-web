import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";
import {
  Eye,
  GitBranch,
  MessageSquare,
  Layers,
  FileSearch,
  Zap,
  RefreshCw,
  Code2,
  Network,
  Users,
  Search,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    id: "F01",
    title: "watch-mode",
    desc: "Save a file, documentation updates automatically. Debounced, filtered, incremental — no full re-runs.",
  },
  {
    icon: GitBranch,
    id: "F02",
    title: "git-aware-reruns",
    desc: "Detects modified, added, deleted, and renamed files via git diff. Only re-processes what changed.",
  },
  {
    icon: MessageSquare,
    id: "F03",
    title: "chat-interface",
    desc: "Ask questions about your codebase in natural language. Three layers: doc-based, deep source reading, learning loop.",
  },
  {
    icon: Layers,
    id: "F04",
    title: "3-layer-web-ui",
    desc: "Reader (instant, no LLM), Chatbot (answers from doc), Deep Agent (reads source when needed).",
  },
  {
    icon: FileSearch,
    id: "F05",
    title: "doc-diff-view",
    desc: "See what shifted between documentation runs — section additions, removals, modifications, wire changes.",
  },
  {
    icon: Zap,
    id: "F06",
    title: "parallel-processing",
    desc: "Files in the same dependency tier run concurrently. Central wire bus keeps context consistent. 3–8x faster.",
  },
  {
    icon: RefreshCw,
    id: "F07",
    title: "scheduled-reruns",
    desc: "Cron-based or commit-triggered. Documentation stays fresh automatically — no human intervention needed.",
  },
  {
    icon: Code2,
    id: "F08",
    title: "ai-context-export",
    desc: "Export compressed docs in Markdown, XML, or JSON — optimized for feeding into another LLM's context window.",
  },
  {
    icon: Network,
    id: "F09",
    title: "graph-filters",
    desc: "Slice the dependency graph by wire type, layer, module, direction. Surface architectural hubs.",
  },
  {
    icon: Users,
    id: "F10",
    title: "team-memory",
    desc: "Shared knowledge base: facts, architectural decisions, coding conventions, file-level annotations.",
  },
  {
    icon: Search,
    id: "F11",
    title: "conversation-search",
    desc: "TF-IDF search across all past conversations. Find that retry logic discussion from two weeks ago instantly.",
  },
  {
    icon: Clock,
    id: "F12",
    title: "triage-tuning",
    desc: "Correct incorrect triage decisions. Feedback stored as direct overrides injected into future LLM triage prompts.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-16 font-mono">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          label="features"
          title="everything you need. nothing you don&apos;t."
          description="30+ CLI commands. 10 integrated feature modules. All built to keep your codebase documentation alive and useful."
          center
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 mt-10 border border-border">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 40}>
              <div className={`group p-5 hover:bg-bg-secondary transition-colors border-b border-r border-border relative h-full ${
                // Remove right border for last in each row
                (i + 1) % 3 === 0 ? "lg:border-r-0" : ""
              } ${
                (i + 1) % 2 === 0 ? "sm:border-r-0 lg:border-r border-border" : ""
              }`}>
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-200" />
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <f.icon size={12} className="text-accent mt-1" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] text-text-tertiary border border-text-dim px-1">{f.id}</span>
                      <h4 className="text-xs font-bold text-text-primary">{f.title}</h4>
                    </div>
                    <p className="text-text-secondary text-[11px] leading-relaxed">
                      {f.desc}
                    </p>
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
