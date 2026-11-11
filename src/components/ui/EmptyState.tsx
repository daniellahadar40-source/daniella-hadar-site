import type { ReactNode } from "react";
import { CompassIcon } from "@/components/ui/icons";

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
};

// מצב-ריק מכוון ומעוצב (לא קופסה מקווקוות גנרית) — מוצג רק כשאין תוכן
// מאומת להצגה (מאמרים/המלצות/קורסים), לעולם לא עם תוכן מומצא (ראו כללי
// התוכן המחייבים בתוכנית העבודה).
export default function EmptyState({ title, description, action }: Props) {
  return (
    <div className="rounded-card border border-sage/40 bg-gradient-to-br from-champagne/35 via-cream to-sage/15 px-6 py-14 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-smoked-blue">
        <CompassIcon width={22} height={22} />
      </span>
      <p className="mt-4 text-h3 font-bold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-ink/70">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
