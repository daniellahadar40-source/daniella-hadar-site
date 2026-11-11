import SectionLabel from "@/components/ui/SectionLabel";

type Props = {
  eyebrow?: string;
  title: string;
  lede?: string;
};

// כותרת-עמוד אחידה (רצועת-טון + Eyebrow + H1 + תקציר) לכל עמודי התוכן
// הפנימיים, כדי ליצור רצף עיצובי עם דף הבית ולהימנע מתחושת "עמוד לבן גנרי".
export default function PageHeader({ eyebrow, title, lede }: Props) {
  return (
    <div className="border-b border-sage/30 bg-champagne/25">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
        <h1 className="mt-3 text-display font-serif font-normal leading-tight text-ink">{title}</h1>
        {lede && <p className="mt-3 max-w-2xl text-body-lg text-ink/80">{lede}</p>}
      </div>
    </div>
  );
}
