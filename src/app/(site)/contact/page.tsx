import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/ui/PageHeader";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";

export const metadata: Metadata = createPageMetadata({
  title: "יצירת קשר",
  description: "פרטי יצירת קשר עם דניאלה הדר, עובדת סוציאלית למיצוי זכויות רפואיות.",
  path: "/contact",
});

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div>
      <PageHeader
        eyebrow="יצירת קשר"
        title="יצירת קשר"
        lede="ניתן לפנות ישירות בטלפון או במייל — בדרך שנוחה לכם."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {siteSettings.phone && (
            <a
              href={`tel:${siteSettings.phone}`}
              className="flex min-h-20 items-center gap-3 rounded-card border border-sage/40 bg-white/70 px-5 py-4 font-semibold text-ink transition hover:border-smoked-blue/50 hover:text-smoked-blue"
            >
              <PhoneIcon width={20} height={20} className="text-smoked-blue" />
              <span dir="ltr">{siteSettings.phone}</span>
            </a>
          )}
          {siteSettings.email && (
            <a
              href={`mailto:${siteSettings.email}`}
              className="flex min-h-20 min-w-0 items-center gap-3 rounded-card border border-sage/40 bg-white/70 px-5 py-4 font-semibold text-ink transition hover:border-smoked-blue/50 hover:text-smoked-blue"
            >
              <MailIcon width={20} height={20} className="text-smoked-blue" />
              <span dir="ltr" className="min-w-0 break-all">
                {siteSettings.email}
              </span>
            </a>
          )}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-ink/80">
          בשיחה או במייל אפשר לציין בקצרה במה תרצו להתייעץ, ודניאלה תחזור אליכם בהקדם האפשרי.
        </p>
      </div>
    </div>
  );
}
