import Link from "next/link";
import { getSiteSettings } from "@/lib/data";

export default async function Footer() {
  const siteSettings = await getSiteSettings();

  return (
    <footer className="border-t border-sage/40 bg-champagne/40">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-bold text-smoked-blue">{siteSettings.siteName}</p>
            <p>{siteSettings.tagline}</p>
          </div>
          <div className="flex flex-col gap-1">
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
          </div>
          <nav aria-label="קישורים משפטיים" className="flex flex-col gap-1">
            <Link href="/accessibility-statement" className="hover:text-smoked-blue">
              הצהרת נגישות
            </Link>
            <Link href="/privacy-policy" className="hover:text-smoked-blue">
              מדיניות פרטיות
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-ink/70">
          התוכן באתר זה הוא הדרכה כללית ואינו מהווה ייעוץ משפטי או רפואי אישי.
        </p>
      </div>
    </footer>
  );
}
