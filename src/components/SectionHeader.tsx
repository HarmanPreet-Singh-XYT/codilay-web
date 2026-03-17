import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  center = false,
}: SectionHeaderProps) {
  return (
    <div className={`font-mono ${center ? "text-center" : ""}`}>
      <AnimatedSection>
        <div className="text-[10px] text-text-tertiary uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="text-accent">##</span>
          <span>{label}</span>
          <span className="flex-1 border-t border-border/60 max-w-[80px]" />
        </div>
      </AnimatedSection>
      <AnimatedSection delay={80}>
        <h2
          className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-3 text-text-primary"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </AnimatedSection>
      {description && (
        <AnimatedSection delay={160}>
          <p
            className={`text-sm text-text-secondary leading-relaxed max-w-2xl ${
              center ? "mx-auto" : ""
            }`}
          >
            <span className="text-text-tertiary">// </span>{description}
          </p>
        </AnimatedSection>
      )}
    </div>
  );
}
