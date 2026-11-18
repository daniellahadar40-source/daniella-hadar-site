import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  centered?: boolean;
};

export default function SectionLabel({ children, centered }: Props) {
  if (centered) {
    return (
      <p className="flex items-center justify-center gap-3.5 text-caption font-bold tracking-wide text-smoked-blue">
        <span className="h-px w-7 bg-terracotta/60" aria-hidden="true" />
        {children}
        <span className="h-px w-7 bg-terracotta/60" aria-hidden="true" />
      </p>
    );
  }

  return <p className="text-caption font-bold tracking-wide text-smoked-blue">{children}</p>;
}
