interface TerminalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Terminal({
  title = "terminal",
  children,
  className = "",
}: TerminalProps) {
  return (
    <div
      className={`bg-bg-primary border border-border overflow-hidden font-mono text-sm ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-0 border-b border-border bg-bg-secondary">
        <div className="flex items-center gap-1.5 px-3 py-2 border-r border-border">
          <span className="w-2 h-2 rounded-full bg-red" />
          <span className="w-2 h-2 rounded-full bg-amber" />
          <span className="w-2 h-2 rounded-full bg-accent" />
        </div>
        <div className="flex-1 px-3 py-2 text-[10px] text-text-tertiary tracking-wider">
          {title}
        </div>
        <div className="px-3 py-2 text-[10px] text-text-dim border-l border-border">
          bash
        </div>
      </div>
      <div className="p-4 overflow-x-auto leading-relaxed">{children}</div>
    </div>
  );
}

export function Line({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`block whitespace-pre min-h-[1.6em] text-xs ${className}`}>
      {children}
    </span>
  );
}

export const T = {
  Comment: ({ children }: { children: React.ReactNode }) => (
    <span className="text-text-tertiary">{children}</span>
  ),
  String: ({ children }: { children: React.ReactNode }) => (
    <span className="text-amber">{children}</span>
  ),
  Keyword: ({ children }: { children: React.ReactNode }) => (
    <span className="text-cyan">{children}</span>
  ),
  Function: ({ children }: { children: React.ReactNode }) => (
    <span className="text-accent">{children}</span>
  ),
  Variable: ({ children }: { children: React.ReactNode }) => (
    <span className="text-amber-dim">{children}</span>
  ),
  Operator: ({ children }: { children: React.ReactNode }) => (
    <span className="text-text-secondary">{children}</span>
  ),
  Error: ({ children }: { children: React.ReactNode }) => (
    <span
      className="text-red"
      style={{
        textDecoration: "underline wavy",
        textDecorationColor: "#f87171",
      }}
    >
      {children}
    </span>
  ),
  Dim: ({ children }: { children: React.ReactNode }) => (
    <span className="text-text-dim">{children}</span>
  ),
  Highlight: ({ children }: { children: React.ReactNode }) => (
    <span className="text-amber">{children}</span>
  ),
  Wire: ({ children }: { children: React.ReactNode }) => (
    <span className="text-accent">{children}</span>
  ),
  Resolved: ({ children }: { children: React.ReactNode }) => (
    <span className="text-cyan">{children}</span>
  ),
  Prompt: ({ children }: { children: React.ReactNode }) => (
    <span><span className="text-accent">$ </span>{children}</span>
  ),
};
