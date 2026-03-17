import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";
import { X, Check } from "lucide-react";

export default function ContextProblem() {
  return (
    <section id="context" className="py-16 bg-bg-secondary border-y border-border font-mono">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          label="context-crisis"
          title="why every other approach fails"
          description="The fundamental problem isn't reading code — it's managing what you know while reading more. Every existing tool either overflows the context or loses information."
          center
        />

        <div className="grid md:grid-cols-2 gap-4 mt-10">
          {/* Without CodiLay */}
          <AnimatedSection delay={80}>
            <div className="border border-border bg-bg-card p-6 h-full">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <span className="text-[10px] font-bold text-red border border-red/30 bg-red/10 px-1.5 py-0.5">ERR</span>
                <h4 className="text-xs font-bold text-text-primary">without-codilay</h4>
              </div>

              {/* Context bar overflow */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-text-tertiary mb-1">
                  <span>context-window</span>
                  <span className="text-red font-bold">OVERFLOW</span>
                </div>
                <div className="h-2 bg-bg-tertiary overflow-hidden">
                  <div className="h-full w-full" style={{ background: "linear-gradient(90deg, #ffb800, #ff3333)" }} />
                </div>
                <p className="text-[10px] text-text-tertiary mt-1">
                  paste entire repo → model forgets beginning by the end
                </p>
              </div>

              <ul className="space-y-2">
                {[
                  "dump full repo into LLM → context overflow, early files forgotten",
                  "send files one-by-one → no cross-file understanding",
                  "RAG-based retrieval → retrieves similar text, not connected logic",
                  "manual docs → decays immediately, nobody maintains it",
                  "IDE search / grep → finds text, not relationships",
                  "mental model → evaporates after 15 files",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-text-secondary">
                    <X size={10} className="text-red mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* With CodiLay */}
          <AnimatedSection delay={160}>
            <div className="border border-accent/30 bg-bg-card p-6 h-full relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00ff41, transparent)" }} />

              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <span className="text-[10px] font-bold text-accent border border-accent/30 bg-accent/10 px-1.5 py-0.5">OK</span>
                <h4 className="text-xs font-bold text-text-primary">with-codilay</h4>
              </div>

              {/* Context bar optimal */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-text-tertiary mb-1">
                  <span>context-window</span>
                  <span className="text-accent font-bold">OPTIMAL</span>
                </div>
                <div className="h-2 bg-bg-tertiary overflow-hidden">
                  <div className="h-full" style={{ width: "35%", background: "linear-gradient(90deg, #00ff41, #00cccc)" }} />
                </div>
                <p className="text-[10px] text-text-tertiary mt-1">
                  only open wires + relevant sections → always lean
                </p>
              </div>

              <ul className="space-y-2">
                {[
                  "reads file-by-file with directed purpose — wires guide focus",
                  "carries only open wires — closed connections retired from context",
                  "doc sections loaded by relevance, not similarity",
                  "living doc updates on git changes, never goes stale",
                  "surfaces actual connections: imports, calls, events, data flow",
                  "persistent across sessions — survives overnight, survives team changes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-text-secondary">
                    <Check size={10} className="text-accent mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Key insight */}
        <AnimatedSection delay={250} className="mt-6">
          <div className="border border-border bg-bg-card p-4 max-w-3xl mx-auto text-center">
            <p className="text-xs text-text-secondary leading-relaxed">
              <span className="text-accent font-bold">// key insight: </span>
              CodiLay never carries more in memory than it needs. Closed wires are gone.
              Processed sections are indexed, not loaded. Context is always lean —
              <span className="text-accent"> whether 50 files or 5,000</span>.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
