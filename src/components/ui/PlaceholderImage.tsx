type Props = {
  className?: string;
  label?: string;
  compact?: boolean;
};

// טיפול מתוחכם ומוצהר-כזמני בהעדר תמונה אמיתית מה-CMS — לא מלבן אפור
// גולמי. נעלם ברגע שתמונה אמיתית מתווספת דרך Sanity (ראו CmsImage.tsx).
// compact=true (לדוגמה אווטארים קטנים) משמיט את תווית הטקסט ומשאיר רק מרקם.
export default function PlaceholderImage({ className, label = "תמונה בהמתנה לאישור", compact }: Props) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-champagne/60 via-cream to-sage/40 ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(41,58,67,0.05) 0px, rgba(41,58,67,0.05) 1px, transparent 1px, transparent 14px)",
        }}
      />
      {!compact && (
        <span className="relative rounded-full border border-ink/10 bg-cream/80 px-4 py-1.5 text-caption font-semibold text-ink/60">
          {label}
        </span>
      )}
    </div>
  );
}
