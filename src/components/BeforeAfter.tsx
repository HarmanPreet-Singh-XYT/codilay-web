import SectionHeader from "./SectionHeader";
import AnimatedSection from "./AnimatedSection";
import Terminal,{ Line, T } from "./Terminal";

export default function BeforeAfter() {
  return (
    <section className="py-16 bg-bg-secondary border-y border-border font-mono">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          label="transformation"
          title="from chaos to clarity"
          description="One command turns an opaque codebase into a navigable, queryable, living document."
          center
        />

        <div className="mt-10">
          <div className="grid lg:grid-cols-[1fr_40px_1fr] gap-3 items-stretch">
            {/* Before */}
            <AnimatedSection delay={80}>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold text-red border border-red/30 bg-red/10 px-1.5 py-0.5">BEFORE</span>
                  <span className="text-[10px] text-text-tertiary">manual investigation</span>
                </div>
                <Terminal title="trying-to-understand-auth.sh" className="flex-1">
                  <Line><T.Prompt>grep -r &quot;authenticate&quot; src/</T.Prompt></Line>
                  <Line>src/middleware/auth.js:4: ...something</Line>
                  <Line>src/routes/users.js:18: ...something</Line>
                  <Line>src/services/token.js:7: ...something</Line>
                  <Line>src/utils/crypto.js:12: ...something</Line>
                  <Line />
                  <Line><T.Comment>// ok but which calls which?</T.Comment></Line>
                  <Line><T.Comment>// what's the actual flow?</T.Comment></Line>
                  <Line><T.Comment>// where does JWT get created?</T.Comment></Line>
                  <Line><T.Comment>// where is it validated?</T.Comment></Line>
                  <Line />
                  <Line><T.Dim>$ # open auth.js in tab 1</T.Dim></Line>
                  <Line><T.Dim>$ # open token.js in tab 2</T.Dim></Line>
                  <Line><T.Dim>$ # open crypto.js in tab 3</T.Dim></Line>
                  <Line><T.Dim>$ # hold all four in your head</T.Dim></Line>
                  <Line><T.Dim>$ # fail</T.Dim></Line>
                  <Line />
                  <Line><T.Error>ERROR: brain stack overflow</T.Error></Line>
                </Terminal>
              </div>
            </AnimatedSection>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <span className="text-accent text-lg font-bold">→</span>
            </div>
            <div className="lg:hidden flex justify-center py-2">
              <span className="text-accent text-lg font-bold">↓</span>
            </div>

            {/* After */}
            <AnimatedSection delay={160}>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold text-accent border border-accent/30 bg-accent/10 px-1.5 py-0.5">AFTER</span>
                  <span className="text-[10px] text-text-tertiary">codilay run ./project</span>
                </div>
                <Terminal title="CODEBASE.md — auth-section" className="flex-1">
                  <Line><T.Resolved>## Authentication Flow</T.Resolved></Line>
                  <Line />
                  <Line><T.String>Request → middleware/auth.js</T.String></Line>
                  <Line><T.String>  │ extracts JWT from Authorization header</T.String></Line>
                  <Line><T.String>  │ calls services/token.js → verify()</T.String></Line>
                  <Line><T.String>  │   └── uses utils/crypto.js → publicKey</T.String></Line>
                  <Line><T.String>  │</T.String></Line>
                  <Line><T.String>  ├── valid → req.user populated, next()</T.String></Line>
                  <Line><T.String>  └── invalid → 401 + error event emitted</T.String></Line>
                  <Line />
                  <Line><T.Resolved>### Dependencies</T.Resolved></Line>
                  <Line><T.Wire>  middleware/auth.js</T.Wire></Line>
                  <Line><T.Dim>    → imports</T.Dim> services/token.js</Line>
                  <Line><T.Dim>    → imports</T.Dim> models/User.js</Line>
                  <Line><T.Wire>  services/token.js</T.Wire></Line>
                  <Line><T.Dim>    → imports</T.Dim> utils/crypto.js</Line>
                  <Line />
                  <Line><T.Resolved>### Used By</T.Resolved></Line>
                  <Line>  routes/users.js, routes/orders.js,</Line>
                  <Line>  routes/admin.js (all protected routes)</Line>
                </Terminal>
              </div>
            </AnimatedSection>
          </div>

          {/* Time comparison */}
          <div className="grid md:grid-cols-3 gap-0 mt-8 border border-border">
            {[
              { val: "~45 min", label: "manual investigation", desc: "grep → open files → read → cross-reference → forget → repeat", color: "text-red" },
              { val: "~3 min", label: "codilay first run", desc: "codilay ./project → complete doc with all connections mapped", color: "text-accent" },
              { val: "~15 sec", label: "subsequent updates", desc: "git-aware re-run, processes only changed files + affected wires", color: "text-cyan" },
            ].map((s, i) => (
              <AnimatedSection key={s.label} delay={300 + i * 80}>
                <div className={`px-6 py-5 text-center ${i < 2 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}>
                  <div className={`text-xl font-bold ${s.color} mb-1`}>{s.val}</div>
                  <div className="text-[10px] text-text-secondary mb-2 font-bold">{s.label}</div>
                  <div className="text-[10px] text-text-tertiary leading-relaxed">{s.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
