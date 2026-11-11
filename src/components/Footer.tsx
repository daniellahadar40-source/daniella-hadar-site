import Link from "next/link";
import { getSiteSettings } from "@/lib/data";

const siteLinks = [
  { href: "/courses", label: "קורסים דיגיטליים" },
  { href: "/knowledge", label: "מרכז הידע" },
  { href: "/about", label: "אודות" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "יצירת קשר" },
];

export default async function Footer() {
  const siteSettings = await getSiteSettings();

  return (
    <footer className="border-t border-sage/40 bg-champagne/40">
      <div className="mx-auto max-w-6xl px-4 py-12 text-sm text-ink sm:px-6">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-h3 font-bold text-smoked-blue">{siteSettings.siteName}</p>
            <p className="mt-1 text-ink/70">{siteSettings.tagline}</p>
          </div>

          <nav aria-label="ניווט באתר" className="flex flex-col gap-1.5">
            <p className="mb-1 text-caption font-semibold tracking-wide text-ink/50">ניווט</p>
            {siteLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-smoked-blue">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-1.5">
            <p className="mb-1 text-caption font-semibold tracking-wide text-ink/50">יצירת קשר</p>
            {siteSettings.phone && (
              <a href={`tel:${siteSettings.phone}`} className="hover:text-smoked-blue" dir="ltr">
                {siteSettings.phone}
              </a>
            )}
            {siteSettings.email && (
              <a href={`mailto:${siteSettings.email}`} className="hover:text-smoked-blue" dir="ltr">
                {siteSettings.email}
              </a>
            )}
            <Link href="/accessibility-statement" className="mt-2 hover:text-smoked-blue">
              הצהרת נגישות
            </Link>
            <Link href="/privacy-policy" className="hover:text-smoked-blue">
              מדיניות פרטיות
            </Link>
          </div>
        </div>
        <p className="mt-8 border-t border-sage/30 pt-6 text-xs text-ink/70">
          התוכן באתר זה הוא הדרכה כללית ואינו מהווה ייעוץ משפטי או רפואי אישי.
        </p>
      </div>
    </footer>
  );
}
