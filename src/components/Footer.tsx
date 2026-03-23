export default function Footer() {
  return (
    <footer className="border-t border-border py-8 font-mono">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Logo + tagline */}
          <div>
            <a href="#" className="text-accent text-sm font-bold text-glow-green">
              <span className="text-text-tertiary">[</span>codilay<span className="text-text-tertiary">]</span>
            </a>
            <p className="text-text-tertiary text-[10px] mt-0.5">
              // your codebase, finally understood.
            </p>
          </div>

          {/* Links */}
          <ul className="flex items-center gap-0 border border-border">
            {[
              { label: "./github", href: "https://github.com/HarmanPreet-Singh-XYT/codilay" },
              { label: "./docs", href: "/docs" },
              // { label: "./vscode", href: "#" },
            ].map((link, i) => (
              <li key={link.label} className={i < 2 ? "border-r border-border" : ""}>
                <a
                  href={link.href}
                  className="text-[10px] text-text-tertiary hover:text-accent hover:bg-accent/5 transition-colors px-3 py-1.5 block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-text-dim text-[10px]">
            © {new Date().getFullYear()} CodiLay — open source, MIT license
          </p>
          <div className="flex items-center gap-3 text-text-dim text-[10px]">
            <span>python 3.11+</span>
            <span className="text-border">·</span>
            <span>30k+ loc</span>
            <span className="text-border">·</span>
            <span>600+ tests</span>
            <span className="text-border">·</span>
            <span>30+ commands</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
