"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function Hero() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const installSteps = [
    { key: "basic", cmd: "pip install codilay" },
    { key: "all", cmd: 'pip install "codilay[all]"' },
    { key: "pipx", cmd: "pipx install codilay" },
  ];

  return (
    <section className="relative pt-11 overflow-hidden font-mono border-b border-border">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(52,211,153,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute top-0 left-1/3 w-[400px] h-[300px] rounded-full blur-[120px] animate-glow-pulse"
          style={{ background: "#34d399", opacity: 0.04 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Top status bar */}
        <div className="flex items-center gap-2 py-2 border-b border-border text-[10px] text-text-tertiary">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot" />
          <span className="text-accent font-bold">codilay</span>
          <span className="text-text-dim">·</span>
          <span>v0.2.0</span>
          <span className="text-text-dim">·</span>
          <span>open-source</span>
          <span className="text-text-dim">·</span>
          <span>python 3.11+</span>
          <span className="text-text-dim">·</span>
          <span className="text-accent">600+ tests ✓</span>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1px_420px] min-h-[420px]">

          {/* Left — headline + CTAs */}
          <div className="flex flex-col justify-center py-10 pr-8">
            <div className="text-text-tertiary text-xs mb-2">// your codebase,</div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
              <span className="gradient-text">finally understood.</span>
            </h1>

            <p className="text-text-secondary text-xs leading-relaxed mb-6 max-w-sm border-l border-accent/30 pl-3">
              CodiLay is an AI agent that reads your entire codebase and produces
              a living, structured document — so any human or AI can understand
              what&apos;s happening, where, and why things connect.
            </p>

            {/* Install commands */}
            <div className="flex flex-col gap-0 border border-border bg-bg-tertiary w-fit mb-3">
              <div className="px-3 py-1.5 border-b border-border text-[9px] font-bold text-text-dim tracking-widest">
                INSTALL FROM PYPI
              </div>
              {installSteps.map((step, i) => (
                <div
                  key={step.key}
                  className={`flex items-center gap-0${i > 0 ? " border-t border-border" : ""}`}
                >
                  <span className="text-accent text-xs px-3 py-2 border-r border-border select-none">$</span>
                  <code className="text-xs px-3 py-2 text-text-primary select-all">{step.cmd}</code>
                  <button
                    onClick={() => handleCopy(step.cmd, step.key)}
                    className="px-3 py-2 border-l border-border text-text-tertiary hover:text-accent hover:bg-accent/5 transition-colors"
                    title="Copy"
                  >
                    {copied === step.key ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                  </button>
                </div>
              ))}
            </div>

            {/* CTA links */}
            <div className="flex items-center gap-0">
              <a
                href="#how-it-works"
                className="text-xs font-bold bg-accent text-bg-primary px-4 py-2 hover:bg-accent-dim transition-colors border border-accent"
              >
                $ how-it-works →
              </a>
              <a
                href="#problem"
                className="text-xs text-text-secondary border border-border border-l-0 px-4 py-2 hover:text-accent hover:bg-accent/5 transition-colors"
              >
                ./the-problem
              </a>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block bg-border" />

          {/* Right — terminal panel */}
          <div className="hidden lg:flex flex-col border-l-0">
            {/* Terminal title bar */}
            <div className="flex items-center gap-0 border-b border-border bg-bg-secondary px-3 py-2">
              <div className="flex items-center gap-1.5 border-r border-border pr-3 mr-3">
                <span className="w-2 h-2 rounded-full bg-red" />
                <span className="w-2 h-2 rounded-full bg-amber" />
                <span className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <span className="text-[10px] text-text-tertiary flex-1">codilay .</span>
              <span className="text-[9px] text-text-dim">bash</span>
            </div>

            {/* Terminal output */}
            <div className="flex-1 p-4 text-[11px] leading-relaxed overflow-hidden bg-bg-primary">
              {[
                { text: "$ codilay .", color: "text-accent" },
                { text: "" },
                { text: "[bootstrap]  scanning file tree...", color: "text-text-tertiary" },
                { text: "[bootstrap]  found 247 files (18 ignored)", color: "text-text-tertiary" },
                { text: "[triage]     categorising files...", color: "text-text-tertiary" },
                { text: "[triage]     core=89  skim=41  skip=117", color: "text-text-secondary" },
                { text: "[planner]    building dependency queue...", color: "text-text-tertiary" },
                { text: "[planner]    entry points: server.py, cli.py", color: "text-text-secondary" },
                { text: "" },
                { text: "[processing] server.py", color: "text-text-tertiary" },
                { text: "  wire OPEN  → routes/orders.py", color: "text-red" },
                { text: "  wire OPEN  → services/payment.py", color: "text-red" },
                { text: "[processing] routes/orders.py", color: "text-text-tertiary" },
                { text: "  wire CLOSE ← server.py ✓", color: "text-accent" },
                { text: "[processing] services/payment.py", color: "text-text-tertiary" },
                { text: "  wire CLOSE ← server.py ✓", color: "text-accent" },
                { text: "  wire OPEN  → utils/stripe.py", color: "text-amber" },
                { text: "" },
                { text: "[finalize]   89 files documented", color: "text-text-secondary" },
                { text: "[finalize]   0 unresolved wires", color: "text-accent" },
                { text: "" },
                { text: "✓ CODEBASE.md written  (142 sections)", color: "text-accent" },
                { text: "✓ links.json written   (1,847 edges)", color: "text-accent" },
                { text: "✓ done in 3m 12s", color: "text-cyan" },
              ].map((line, i) => (
                <div key={i} className={line.color ?? "text-text-dim"}>
                  {line.text || "\u00a0"}
                </div>
              ))}
            </div>

            {/* Stats strip at bottom */}
            <div className="grid grid-cols-4 divide-x divide-border border-t border-border">
              {[
                { val: "30k+", label: "loc" },
                { val: "30+", label: "commands" },
                { val: "600+", label: "tests" },
                { val: "30+", label: "files" },
              ].map((s) => (
                <div key={s.label} className="px-3 py-2 text-center">
                  <div className="text-accent text-xs font-bold">{s.val}</div>
                  <div className="text-text-dim text-[9px]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
