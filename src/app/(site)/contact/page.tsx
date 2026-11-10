import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "יצירת קשר",
  description: "פרטי יצירת קשר עם דניאלה הדר, עובדת סוציאלית למיצוי זכויות רפואיות.",
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-display font-bold text-ink">יצירת קשר</h1>
      <p className="mt-3 text-body-lg text-ink/80">
        ניתן לפנות ישירות בטלפון או במייל, או למלא את הטופס למטה.
      </p>

      <div className="mt-6 flex flex-col gap-1 text-ink/90">
        {siteSettings.phone && (
          <a href={`tel:${siteSettings.phone}`} className="font-semibold hover:text-smoked-blue" dir="ltr">
            {siteSettings.phone}
          </a>
        )}
        {siteSettings.email && (
          <a href={`mailto:${siteSettings.email}`} className="font-semibold hover:text-smoked-blue" dir="ltr">
            {siteSettings.email}
          </a>
        )}
      </div>

      <div className="mt-10 rounded-card border border-sage/40 bg-white/60 p-6">
        <ContactForm />
      </div>
    </div>
  );
}
