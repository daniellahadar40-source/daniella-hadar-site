import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "יצירת קשר",
  description: "פרטי יצירת קשר עם דניאלה הדר, עובדת סוציאלית למיצוי זכויות רפואיות.",
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div>
      <PageHeader
        eyebrow="יצירת קשר"
        title="יצירת קשר"
        lede="ניתן לפנות ישירות בטלפון או במייל, או למלא את הטופס למטה."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-3 sm:flex-row">
        {siteSettings.phone && (
          <a
            href={`tel:${siteSettings.phone}`}
            className="flex items-center gap-3 rounded-card border border-sage/40 bg-white/70 px-5 py-4 font-semibold text-ink transition hover:border-smoked-blue/50 hover:text-smoked-blue"
          >
            <PhoneIcon width={20} height={20} className="text-smoked-blue" />
            <span dir="ltr">{siteSettings.phone}</span>
          </a>
        )}
        {siteSettings.email && (
          <a
            href={`mailto:${siteSettings.email}`}
            className="flex items-center gap-3 rounded-card border border-sage/40 bg-white/70 px-5 py-4 font-semibold text-ink transition hover:border-smoked-blue/50 hover:text-smoked-blue"
          >
            <MailIcon width={20} height={20} className="text-smoked-blue" />
            <span dir="ltr">{siteSettings.email}</span>
          </a>
        )}
      </div>

      <div className="mt-10 rounded-card border border-sage/40 bg-white/60 p-6 sm:p-8">
        <h2 className="text-h3 font-bold text-ink">טופס פנייה</h2>
        <p className="mt-1 text-sm text-ink/70">
          הטופס עדיין אינו מחובר באופן אוטומטי — לתשובה מהירה מוזמנת/ים לפנות
          בטלפון או במייל שמעלינו, או להשתמש בטופס ואני אחזור אליכם בהקדם.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
      </div>
    </div>
  );
}
