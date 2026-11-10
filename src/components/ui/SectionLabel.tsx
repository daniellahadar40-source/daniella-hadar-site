import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-caption font-semibold tracking-wide text-smoked-blue">
      <span className="h-px w-6 bg-smoked-blue/50" aria-hidden="true" />
      {children}
    </p>
  );
}
