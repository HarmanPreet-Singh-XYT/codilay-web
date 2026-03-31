"use client";

import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Copy, Check } from "lucide-react";

export default function CTASection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="get-started" className="py-16 font-mono">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
          <div className="relative border border-accent/25 bg-bg-secondary overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #34d399, transparent)" }} />

            <div className="p-8 md:p-12 text-center">
              {/* Status */}
              <div className="flex items-center justify-center gap-2 mb-6 text-[10px] text-text-tertiary">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot" />
                <span>ready to deploy</span>
                <span className="text-text-dim">|</span>
                <span className="text-accent">MIT license</span>
                <span className="text-text-dim">|</span>
                <span>python 3.11+</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                understand any codebase.
              </h2>
              <h2 className="text-2xl md:text-3xl font-bold mb-5">
                <span className="gradient-text">set up in minutes.</span>
              </h2>
              <p className="text-text-secondary text-sm mb-8 max-w-lg mx-auto">
                <span className="text-text-tertiary">// </span>
                stop guessing. stop grep-ing. stop building mental models that
                vanish overnight. let CodiLay trace every wire for you.
              </p>

              {/* Install commands */}
              <div className="flex flex-col items-center gap-2 max-w-xl mx-auto">
                <div className="w-full border border-border bg-bg-secondary px-3 py-1.5 text-[9px] font-bold text-text-dim tracking-widest text-left">
                  INSTALL FROM PYPI (RECOMMENDED)
                </div>
                {[
                  { cmd: "pip install codilay", key: "basic", label: "basic" },
                  { cmd: 'pip install "codilay[all]"', key: "all", label: "all features" },
                  { cmd: "pipx install codilay", key: "pipx", label: "global cli" },
                  { cmd: "codilay setup", key: "setup", label: "setup" },
                  { cmd: "codilay .", key: "run", label: "run" },
                ].map((c) => (
                  <div key={c.key} className="flex items-center gap-0 w-full border border-border">
                    <span className="text-[10px] text-text-tertiary px-2 py-2 border-r border-border w-16 text-center shrink-0">
                      {c.label}
                    </span>
                    <code className="flex-1 text-xs px-3 py-2 text-text-primary">
                      <span className="text-accent">$ </span>{c.cmd}
                    </code>
                    <button
                      onClick={() => handleCopy(c.cmd, c.key)}
                      className="px-3 py-2 border-l border-border text-text-tertiary hover:text-accent hover:bg-accent/5 transition-colors"
                    >
                      {copied === c.key ? (
                        <Check size={12} className="text-accent" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center justify-center gap-6 mt-6 text-[11px]">
                {[
                  { label: "./github", href: "https://github.com/HarmanPreet-Singh-XYT/codilay" },
                  { label: "./docs", href: "/docs" },
                  { label: "./vscode-ext", href: "#" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-text-secondary hover:text-accent transition-colors"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>

              {/* Platform */}
              <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-text-dim">
                <span>macOS</span><span>·</span>
                <span>Linux</span><span>·</span>
                <span>Windows</span><span>·</span>
                <span>Python 3.11+</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Use cases */}
        <AnimatedSection delay={150} className="mt-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
            {[
              {
                tag: "NEW_PROJECT",
                title: "new to a project?",
                desc: "Run CodiLay, read the doc, ask questions. Productive in minutes.",
              },
              {
                tag: "LEGACY",
                title: "maintaining legacy code?",
                desc: "Finally understand what connects to what before you touch anything.",
              },
              {
                tag: "AI_ASSIST",
                title: "using AI assistants?",
                desc: "Export the doc as context. Now your AI actually knows your architecture.",
              },
              {
                tag: "ONBOARD",
                title: "onboarding teammates?",
                desc: "Hand them CODEBASE.md + the chat interface. No more 2-week shadow sessions.",
              },
            ].map((uc, i) => (
              <div
                key={uc.title}
                className={`p-4 hover:bg-bg-secondary transition-colors ${i < 3 ? "border-r border-border" : ""}`}
              >
                <div className="text-[9px] font-bold text-accent border border-accent/30 bg-accent/5 px-1.5 py-0.5 w-fit mb-2">
                  {uc.tag}
                </div>
                <h4 className="text-xs font-bold text-text-primary mb-1">{uc.title}</h4>
                <p className="text-[10px] text-text-tertiary leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
