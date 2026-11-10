import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({ title, description, action }: Props) {
  return (
    <div className="rounded-card border border-dashed border-sage/60 bg-champagne/20 px-6 py-12 text-center">
      <p className="text-h3 font-bold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-ink/70">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
