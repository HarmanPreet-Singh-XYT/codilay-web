import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";
import Terminal,{ Line, T } from "./Terminal";
import { Brain, Link2, Bot, FileWarning } from "lucide-react";

const problems = [
  {
    icon: Brain,
    prefix: "ERR",
    color: "text-red",
    bg: "bg-red/5 border-red/20",
    title: "mental model evaporates",
    desc: "You build understanding file by file — by file 15, you've forgotten what file 3 did. Human working memory doesn't scale to codebases.",
  },
  {
    icon: Link2,
    prefix: "ERR",
    color: "text-red",
    bg: "bg-red/5 border-red/20",
    title: "connections are invisible",
    desc: "File A imports B which calls C which emits an event that D listens to. These relationships exist in code but nowhere else.",
  },
  {
    icon: Bot,
    prefix: "WARN",
    color: "text-amber",
    bg: "bg-amber/5 border-amber/20",
    title: "AI can't help either",
    desc: "Paste a file into ChatGPT? It has no idea what the rest of the codebase looks like. Paste the whole repo? Context window can't hold it.",
  },
  {
    icon: FileWarning,
    prefix: "WARN",
    color: "text-amber",
    bg: "bg-amber/5 border-amber/20",
    title: "docs are always stale",
    desc: "Hand-written documentation decays the moment it's committed. Nobody updates it. Within weeks it's misleading.",
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="py-16 bg-bg-secondary border-y border-border font-mono"
    >
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          label="problem"
          title="you&apos;ve inherited a codebase. now what?"
          description="Every dev has been here. Thousands of files, no docs worth reading. You grep, open random files, build a mental map that evaporates by morning."
          center
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {/* Terminal */}
          <AnimatedSection delay={150}>
            <Terminal title="your-brain.exe">
              <Line>
                <T.Comment>// Day 1: Trying to understand the payment flow</T.Comment>
              </Line>
              <Line />
              <Line>
                <T.Prompt>grep -r &quot;payment&quot; src/</T.Prompt>
              </Line>
              <Line>
                <T.Highlight>src/routes/orders.js</T.Highlight>:14 →
                paymentService.charge()
              </Line>
              <Line>
                <T.Highlight>src/services/payment.js</T.Highlight>:1 →{" "}
                <T.Error>imports ???</T.Error>
              </Line>
              <Line>
                <T.Highlight>src/services/payment.js</T.Highlight>:8 → calls
                stripeClient
              </Line>
              <Line>
                <T.Highlight>src/middleware/billing.js</T.Highlight>:22 →
                validates payment
              </Line>
              <Line>
                <T.Highlight>src/models/Transaction.js</T.Highlight>:3 → used
                somewhere?
              </Line>
              <Line>
                <T.Highlight>src/events/order.js</T.Highlight>:45 →{" "}
                <T.Error>emits &apos;payment:completed&apos;</T.Error>
              </Line>
              <Line>
                <T.Highlight>src/listeners/notify.js</T.Highlight>:12 →{" "}
                <T.Error>listens to... what?</T.Error>
              </Line>
              <Line />
              <Line>
                <T.Comment>// 7 files. No idea how they connect.</T.Comment>
              </Line>
              <Line>
                <T.Comment>// Which one calls which?</T.Comment>
              </Line>
              <Line>
                <T.Comment>// What&apos;s the actual data flow?</T.Comment>
              </Line>
              <Line>
                <T.Comment>// What did I look at 20 minutes ago?</T.Comment>
              </Line>
              <Line />
              <Line>
                <T.Dim>// Opens another tab. And another. And another...</T.Dim>
              </Line>
            </Terminal>
          </AnimatedSection>

          {/* Problem cards */}
          <div className="flex flex-col gap-2">
            {problems.map((p, i) => (
              <AnimatedSection key={p.title} delay={150 + i * 80}>
                <div className={`border ${p.bg} p-4 hover:border-border-bright transition-all`}>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      <span className={`text-[10px] font-bold ${p.color} border border-current px-1.5 py-0.5`}>
                        {p.prefix}
                      </span>
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold mb-1 ${p.color}`}>{p.title}</h4>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
