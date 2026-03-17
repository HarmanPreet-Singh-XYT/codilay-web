"use client";

import { useInView } from "@/hooks/useInView";
import { useEffect, useState } from "react";

interface StatConfig {
  target: number;
  suffix: string;
  label: string;
  sub: string;
  color: string;
  prefix?: string;
}

const stats: StatConfig[] = [
  {
    target: 58,
    suffix: "%",
    label: "of dev time",
    sub: "spent understanding existing code, not writing new",
    color: "text-red",
    prefix: "STAT",
  },
  {
    target: 3,
    suffix: "–6 mo",
    label: "onboarding",
    sub: "for a new dev to be productive on a large codebase",
    color: "text-amber",
    prefix: "STAT",
  },
  {
    target: 40,
    suffix: "+",
    label: "files deep",
    sub: "before most devs lose their mental model completely",
    color: "text-cyan",
    prefix: "STAT",
  },
  {
    target: 0,
    suffix: "",
    label: "tools solve this",
    sub: "grep, IDE search, and ChatGPT are band-aids",
    color: "text-accent",
    prefix: "STAT",
  },
];

function AnimatedNumber({
  target,
  suffix,
  color,
  animate,
}: {
  target: number;
  suffix: string;
  color: string;
  animate: boolean;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!animate) return;
    if (target === 0) {
      setValue(0);
      return;
    }
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [animate, target]);

  return (
    <div className={`text-2xl font-bold font-mono ${color}`}>
      {value}{suffix}
    </div>
  );
}

export default function StatsBand() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="border-b border-border font-mono" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 py-8 hover:bg-bg-secondary transition-colors"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.4s ease ${i * 80}ms`,
              }}
            >
              <div className="text-[10px] text-text-tertiary mb-2">
                <span className={`${stat.color} border border-current px-1 py-0.5 text-[9px] font-bold mr-2`}>
                  {stat.prefix}
                </span>
                {stat.label}
              </div>
              <AnimatedNumber
                target={stat.target}
                suffix={stat.suffix}
                color={stat.color}
                animate={isInView}
              />
              <div className="text-text-tertiary text-[10px] mt-1 leading-relaxed">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
