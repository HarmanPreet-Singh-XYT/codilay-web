import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";
import {
  BookOpen,
  Zap,
  Brain,
  RefreshCw,
  Users,
  MessageSquare,
} from "lucide-react";

const outcomes = [
  {
    icon: BookOpen,
    id: "OUT-01",
    title: "complete abstract view",
    desc: "Every module documented: what it does, where it lives, how it connects. Cross-references link everything. The dependency graph shows the full picture.",
    color: "text-accent",
  },
  {
    icon: Zap,
    id: "OUT-02",
    title: "onboarding in minutes, not months",
    desc: "New dev joins? They read CODEBASE.md, ask the chatbot, and have a working mental model before writing a single line of code.",
    color: "text-cyan",
  },
  {
    icon: Brain,
    id: "OUT-03",
    title: "AI that actually understands your code",
    desc: "Export the compressed doc into any LLM context window. Now ChatGPT, Claude, or Copilot knows your architecture — not just the file you pasted.",
    color: "text-accent",
  },
  {
    icon: RefreshCw,
    id: "OUT-04",
    title: "docs that never go stale",
    desc: "Git-aware re-runs, watch mode, scheduled updates. The doc evolves with your code. No manual maintenance. No decay.",
    color: "text-amber",
  },
  {
    icon: Users,
    id: "OUT-05",
    title: "team knowledge that compounds",
    desc: "Shared memory, architectural decisions, conventions — all injected into every interaction. The AI learns what your team has agreed on and respects it.",
    color: "text-cyan",
  },
  {
    icon: MessageSquare,
    id: "OUT-06",
    title: "self-improving through questions",
    desc: "Every question the chatbot can't answer triggers the deep agent, which patches the doc. Documentation gets smarter with every conversation.",
    color: "text-accent",
  },
];

export default function OutcomeSection() {
  return (
    <section
      id="outcome"
      className="py-16 bg-bg-secondary border-y border-border font-mono"
    >
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          label="outcome"
          title="what you get"
          description="CodiLay doesn't just generate a document. It gives your entire team — humans and AIs — a shared understanding of your codebase that stays current."
          center
        />

        <div className="grid md:grid-cols-2 gap-0 mt-10 border border-border">
          {outcomes.map((o, i) => (
            <AnimatedSection key={o.title} delay={i * 60}>
              <div className={`p-5 hover:bg-bg-card transition-colors h-full border-b border-r border-border ${
                i % 2 === 1 ? "md:border-r-0" : ""
              } ${i >= outcomes.length - 2 ? "border-b-0" : ""}`}>
                <div className="flex items-start gap-3">
                  <o.icon size={12} className={`${o.color} mt-1 shrink-0`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] text-text-tertiary border border-text-dim px-1">{o.id}</span>
                      <h4 className={`text-xs font-bold ${o.color}`}>{o.title}</h4>
                    </div>
                    <p className="text-text-secondary text-[11px] leading-relaxed">{o.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Learning loop */}
        <AnimatedSection delay={400} className="mt-8">
          <div className="border border-accent/25 bg-bg-card p-5 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #34d399, transparent)" }} />
            <div className="text-[10px] text-text-tertiary mb-3">
              <span className="text-accent">##</span> learning-loop
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-[10px]">
              {[
                { label: "user asks question", tag: "INPUT" },
                { label: "chatbot checks doc", tag: "L1" },
                { label: "can't answer? deep agent reads source", tag: "L2" },
                { label: "doc patched + answer delivered", tag: "PATCH" },
                { label: "next time: chatbot answers directly", tag: "CACHE" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="hidden sm:block text-text-dim">→</span>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] font-bold text-accent border border-accent/30 bg-accent/10 px-1 w-fit">{step.tag}</span>
                    <span className="text-text-secondary leading-snug">{step.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-text-tertiary text-[10px] mt-3 border-t border-border pt-3">
              // doc gets smarter with every question it couldn&apos;t answer. over time, chatbot handles more without escalation.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
