// קומפוזיציית SVG אבסטרקטית בפלטת המותג, המחליפה placeholder תמונה ריק.
// אין עדיין תמונת פורטרט מאושרת של דניאלה — לכן נבנה כאן רכיב גרפי מכוון
// ועדין (לא מלבן אפור), המרמז על ליווי/בהירות/דרך, בתוך מארז יחס-גובה-רוחב
// זהה למה שתמונת CMS תתפוס בעתיד (ראו CmsImage.tsx, prop "fallback").
// האנימציה עדינה ומכובדת ע"י prefers-reduced-motion גלובלית (globals.css).

type Variant = "hero" | "course" | "about";

const variants: Record<Variant, { blobs: string[]; ring?: boolean; path?: boolean }> = {
  hero: { blobs: ["sage", "champagne", "blue"], ring: true, path: true },
  course: { blobs: ["blue", "sage"], ring: true, path: false },
  about: { blobs: ["champagne", "sage"], ring: false, path: false },
};

export default function AbstractArt({
  variant = "hero",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const v = variants[variant];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-champagne/50 via-cream to-sage/30 ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`g-blue-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#36566A" stopOpacity="0.9" />
            <stop offset="1" stopColor="#36566A" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id={`g-sage-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#A7BAAC" stopOpacity="0.95" />
            <stop offset="1" stopColor="#A7BAAC" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id={`g-champagne-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E3D5BE" stopOpacity="1" />
            <stop offset="1" stopColor="#E3D5BE" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* כתם רקע רך */}
        {v.blobs.includes("champagne") && (
          <path
            d="M60 90c60-55 170-70 230-10s55 180-15 230-200 35-235-45S10 136 60 90Z"
            fill={`url(#g-champagne-${variant})`}
          />
        )}
        {v.blobs.includes("sage") && (
          <path
            className="art-float-slow"
            d="M120 330c-40-60 10-150 90-165s170 30 175 110-70 150-150 145-75-30-115-90Z"
            fill={`url(#g-sage-${variant})`}
            opacity="0.85"
          />
        )}
        {v.blobs.includes("blue") && (
          <circle className="art-float" cx="245" cy="150" r="78" fill={`url(#g-blue-${variant})`} />
        )}

        {/* "דרך" / מסלול בהיר שמסמל ליווי והתבהרות */}
        {v.path && (
          <path
            d="M40 460C120 420 150 330 110 260S150 120 260 95"
            fill="none"
            stroke="#F8F6F1"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1 14"
            opacity="0.9"
          />
        )}

        {/* טבעת עדינה שמרמזת על בהירות/מיקוד */}
        {v.ring && (
          <circle
            cx="265"
            cy="110"
            r="34"
            fill="none"
            stroke="#F8F6F1"
            strokeWidth="2"
            opacity="0.8"
          />
        )}

        {/* נקודות עדינות */}
        <g fill="#293A43" opacity="0.12">
          <circle cx="330" cy="400" r="3.5" />
          <circle cx="350" cy="380" r="2.5" />
          <circle cx="60" cy="420" r="2.5" />
          <circle cx="40" cy="440" r="3.5" />
        </g>
      </svg>

      <style>{`
        .art-float { transform-origin: center; animation: art-float 9s ease-in-out infinite; }
        .art-float-slow { transform-origin: center; animation: art-float 13s ease-in-out infinite reverse; }
        @keyframes art-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
