import type { ReactNode } from "react";

export default function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article
      className={`rounded-card border border-sage/40 bg-white/70 p-6 shadow-sm shadow-ink/5 transition hover:shadow-md hover:shadow-ink/10 ${className ?? ""}`}
    >
      {children}
    </article>
  );
}
