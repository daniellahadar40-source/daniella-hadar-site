import type { ReactNode } from "react";

type Tone = "cream" | "champagne" | "sage" | "blue";

const toneClasses: Record<Tone, string> = {
  cream: "",
  champagne: "bg-champagne/30",
  sage: "bg-sage/20",
  blue: "bg-smoked-blue text-cream",
};

type Props = {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  ariaLabelledBy?: string;
};

export default function Section({ children, className, tone = "cream", ariaLabelledBy }: Props) {
  return (
    <section className={`py-16 sm:py-24 ${toneClasses[tone]}`} aria-labelledby={ariaLabelledBy}>
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className ?? ""}`}>{children}</div>
    </section>
  );
}
