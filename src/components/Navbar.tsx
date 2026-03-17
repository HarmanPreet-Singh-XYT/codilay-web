"use client";

import { useState } from "react";
import { useScrolled } from "@/hooks/useScrolled";

const links = [
  { href: "#problem", label: "problem" },
  { href: "#wire-model", label: "wire-model" },
  { href: "#how-it-works", label: "how-it-works" },
  { href: "#features", label: "features" },
  { href: "#outcome", label: "outcome" },
];

export default function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-150 font-mono ${
        scrolled
          ? "bg-bg-primary/98 border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-11 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-accent text-sm font-bold tracking-tight text-glow-green"
        >
          <span className="text-text-tertiary">[</span>
          <span className="text-accent">codilay</span>
          <span className="text-text-tertiary">]</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs text-text-secondary hover:text-accent hover:bg-accent/5 px-3 py-1.5 transition-colors block"
              >
                ./{link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/docs"
              className="text-xs text-cyan hover:text-accent hover:bg-accent/5 px-3 py-1.5 transition-colors block border-l border-border"
            >
              ./docs
            </a>
          </li>
          <li className="ml-3">
            <a
              href="#get-started"
              className="text-xs font-bold bg-accent text-bg-primary px-4 py-1.5 hover:bg-accent-dim transition-colors"
            >
              $ get-started
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-accent text-xs"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "[close]" : "[menu]"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-primary border-b border-border px-4 py-3 flex flex-col gap-0">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-text-secondary hover:text-accent py-2 border-b border-border/50 last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              ./{link.label}
            </a>
          ))}
          <a
            href="/docs"
            className="text-xs text-cyan hover:text-accent py-2 border-b border-border/50"
            onClick={() => setMobileOpen(false)}
          >
            ./docs
          </a>
          <a
            href="#get-started"
            className="text-xs font-bold bg-accent text-bg-primary px-3 py-2 text-center mt-2"
            onClick={() => setMobileOpen(false)}
          >
            $ get-started
          </a>
        </div>
      )}
    </nav>
  );
}
