"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";
import Terminal, { Line, T } from "./Terminal";

interface WireStage {
  title: string;
  explanation: React.ReactNode;
  terminal: React.ReactNode;
}

const stages: WireStage[] = [
  {
    title: "1. file-read",
    explanation: (
      <>
        <div className="text-xs text-text-tertiary mb-3">
          <span className="text-accent">##</span> step 01 — reading the first file
        </div>
        <p className="text-text-secondary text-xs leading-relaxed mb-3">
          The agent reads <code className="text-accent bg-accent/10 px-1">routes/orders.js</code> and
          encounters an import it hasn&apos;t documented yet. A reference pointing into the dark.
        </p>
        <Terminal title="routes/orders.js" className="mt-3">
          <Line><T.Keyword>import</T.Keyword> {"{ PaymentService }"} <T.Keyword>from</T.Keyword> <T.String>&apos;../services/payment&apos;</T.String></Line>
          <Line><T.Keyword>import</T.Keyword> {"{ Order }"} <T.Keyword>from</T.Keyword> <T.String>&apos;../models/Order&apos;</T.String></Line>
          <Line />
          <Line><T.Comment>// agent has never seen payment.js or Order.js</T.Comment></Line>
          <Line><T.Comment>// doesn't know what they do yet</T.Comment></Line>
          <Line><T.Comment>// but knows they EXIST and are NEEDED HERE</T.Comment></Line>
        </Terminal>
      </>
    ),
    terminal: (
      <Terminal title="agent-state.json">
        <Line><T.Variable>processing:</T.Variable> <T.String>&quot;routes/orders.js&quot;</T.String></Line>
        <Line><T.Variable>open_wires:</T.Variable> <T.Dim>[]</T.Dim></Line>
        <Line><T.Variable>closed_wires:</T.Variable> <T.Dim>[]</T.Dim></Line>
        <Line><T.Variable>queue_next:</T.Variable> <T.Dim>&quot;services/payment.js&quot;</T.Dim></Line>
        <Line />
        <Line><T.Comment>→ reading file content...</T.Comment></Line>
        <Line><T.Comment>→ found 2 unknown references</T.Comment></Line>
      </Terminal>
    ),
  },
  {
    title: "2. wire-opens",
    explanation: (
      <>
        <div className="text-xs text-text-tertiary mb-3">
          <span className="text-accent">##</span> step 02 — wires open
        </div>
        <p className="text-text-secondary text-xs leading-relaxed mb-3">
          Two unresolved refs → two open wires. Each wire carries <span className="text-text-primary">context</span> about
          <em> why</em> the reference matters — not just that it exists.
        </p>
        <div className="flex gap-2 flex-wrap mb-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold font-mono bg-red/10 text-red border border-red/30">
            ● wire_001 OPEN
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold font-mono bg-red/10 text-red border border-red/30">
            ● wire_002 OPEN
          </span>
        </div>
        <p className="text-text-secondary text-xs leading-relaxed">
          Files that would close the most wires get promoted in the queue.
          The agent prioritizes connections over isolated files.
        </p>
      </>
    ),
    terminal: (
      <Terminal title="wire-bus">
        <Line><T.Variable>open_wires:</T.Variable> [</Line>
        <Line>  {"{"}</Line>
        <Line>    <T.Wire>id:</T.Wire> <T.String>&quot;wire_001&quot;</T.String>,</Line>
        <Line>    <T.Wire>from:</T.Wire> <T.String>&quot;routes/orders.js&quot;</T.String>,</Line>
        <Line>    <T.Wire>to:</T.Wire>   <T.String>&quot;services/payment.js&quot;</T.String>,</Line>
        <Line>    <T.Wire>context:</T.Wire> <T.String>&quot;Called at checkout&quot;</T.String></Line>
        <Line>  {"}"},</Line>
        <Line>  {"{"}</Line>
        <Line>    <T.Wire>id:</T.Wire> <T.String>&quot;wire_002&quot;</T.String>,</Line>
        <Line>    <T.Wire>from:</T.Wire> <T.String>&quot;routes/orders.js&quot;</T.String>,</Line>
        <Line>    <T.Wire>to:</T.Wire>   <T.String>&quot;models/Order.js&quot;</T.String>,</Line>
        <Line>    <T.Wire>context:</T.Wire> <T.String>&quot;Order.create() + findById()&quot;</T.String></Line>
        <Line>  {"}"}</Line>
        <Line>]</Line>
      </Terminal>
    ),
  },
  {
    title: "3. later-file",
    explanation: (
      <>
        <div className="text-xs text-text-tertiary mb-3">
          <span className="text-accent">##</span> step 03 — a later file arrives
        </div>
        <p className="text-text-secondary text-xs leading-relaxed mb-3">
          Agent reaches <code className="text-accent bg-accent/10 px-1">services/payment.js</code>.
          Before reading content, it checks the wire bus: <span className="text-text-primary">&quot;does anyone need me?&quot;</span>
        </p>
        <p className="text-text-secondary text-xs leading-relaxed">
          wire_001 says yes. Now the agent reads this file{" "}
          <span className="text-text-primary">knowing exactly what to look for</span> —
          the PaymentService.charge() method and how it connects to the order flow.
          <br /><br />
          <span className="text-text-primary">Key insight: every file is read in context of what&apos;s already known.</span>
        </p>
      </>
    ),
    terminal: (
      <Terminal title="processing services/payment.js">
        <Line><T.Comment>// agent knows before reading:</T.Comment></Line>
        <Line><T.Comment>// → wire_001 points here from routes/orders.js</T.Comment></Line>
        <Line><T.Comment>// → Used for: "charging customers at checkout"</T.Comment></Line>
        <Line><T.Comment>// → Must explain: PaymentService.charge()</T.Comment></Line>
        <Line />
        <Line><T.Keyword>class</T.Keyword> <T.Function>PaymentService</T.Function> {"{"}</Line>
        <Line>  <T.Keyword>async</T.Keyword> <T.Function>charge</T.Function>(order, amount) {"{"} <T.Comment>← THIS</T.Comment></Line>
        <Line>    <T.Comment>// closes wire_001</T.Comment></Line>
        <Line>    <T.Comment>// opens wire_003 → utils/retry.js</T.Comment></Line>
        <Line>  {"}"}</Line>
        <Line>{"}"}</Line>
      </Terminal>
    ),
  },
  {
    title: "4. wire-closes",
    explanation: (
      <>
        <div className="text-xs text-text-tertiary mb-3">
          <span className="text-accent">##</span> step 04 — connection formed
        </div>
        <p className="text-text-secondary text-xs leading-relaxed mb-3">
          wire_001 is now <span className="text-cyan">closed</span>. Both doc sections patched.
          routes/orders.js now says &quot;calls PaymentService.charge()&quot; and
          services/payment.js says &quot;called by routes/orders.js during checkout.&quot;
        </p>
        <div className="flex gap-2 flex-wrap mb-3">
          <span className="text-[10px] font-bold font-mono bg-cyan/10 text-cyan border border-cyan/30 px-2 py-0.5">
            ✓ wire_001 CLOSED
          </span>
          <span className="text-[10px] font-bold font-mono bg-red/10 text-red border border-red/30 px-2 py-0.5">
            ● wire_002 OPEN
          </span>
          <span className="text-[10px] font-bold font-mono bg-amber/10 text-amber border border-amber/30 px-2 py-0.5">
            ◐ wire_003 NEW
          </span>
        </div>
        <p className="text-text-secondary text-xs leading-relaxed">
          Closed wires are <span className="text-text-primary">retired from context forever</span>.
          Written to links.json, never sent to the LLM again.
          Context stays lean — 50 files or 5,000.
        </p>
      </>
    ),
    terminal: (
      <Terminal title="wire-bus — after close">
        <Line><T.Resolved>✓ CLOSED wire_001</T.Resolved></Line>
        <Line>  <T.Dim>summary:</T.Dim> <T.String>&quot;PaymentService.charge() wraps Stripe&quot;</T.String></Line>
        <Line />
        <Line><T.Error>● OPEN wire_002</T.Error></Line>
        <Line>  <T.Dim>to:</T.Dim> models/Order.js → <T.Dim>queue pos: #1</T.Dim></Line>
        <Line />
        <Line><T.Highlight>◐ NEW wire_003</T.Highlight></Line>
        <Line>  <T.Dim>from:</T.Dim> services/payment.js</Line>
        <Line>  <T.Dim>to:</T.Dim>   utils/retry.js</Line>
        <Line />
        <Line><T.Comment>// wire_001 GONE from active context</T.Comment></Line>
        <Line><T.Comment>// never appears in another LLM call ✓</T.Comment></Line>
      </Terminal>
    ),
  },
];

export default function WireModelSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="wire-model" className="py-16 font-mono">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          label="wire-model"
          title="the core abstraction"
          description="CodiLay operates like a detective tracing wires through a circuit. Every unresolved reference is a wire — open until both ends are documented, then retired forever."
          center
        />

        <AnimatedSection className="mt-10">
          {/* Stage tabs */}
          <div className="flex gap-0 mb-8 border border-border w-fit mx-auto">
            {stages.map((stage, i) => (
              <button
                key={i}
                onClick={() => setActiveStage(i)}
                className={`px-4 py-2 text-xs font-bold transition-colors border-r border-border last:border-r-0 ${
                  activeStage === i
                    ? "bg-accent text-bg-primary"
                    : "text-text-secondary hover:text-accent hover:bg-accent/5"
                }`}
              >
                {stage.title}
              </button>
            ))}
          </div>

          {/* Stage content */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="border border-border p-6 bg-bg-secondary">
              {stages[activeStage].explanation}
            </div>
            <div>{stages[activeStage].terminal}</div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
