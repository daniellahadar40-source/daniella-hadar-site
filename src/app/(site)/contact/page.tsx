import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import { getNewsletterMode } from "@/lib/newsletter";
import PageHeader from "@/components/ui/PageHeader";
import ContactActions from "@/components/ContactActions";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = createPageMetadata({
  title: "יצירת קשר",
  description: "פרטי יצירת קשר עם דניאלה הדר, עובדת סוציאלית למיצוי זכויות רפואיות.",
  path: "/contact",
});

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  const newsletterMode = getNewsletterMode();

  return (
    <div>
      <PageHeader
        eyebrow="יצירת קשר"
        title="יצירת קשר"
        lede="ניתן לפנות ישירות בטלפון או במייל — בדרך שנוחה לכם."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <ContactActions
          phone={siteSettings.phone}
          email={siteSettings.email}
          showValues
          centered
          className="[&>a]:w-full [&>a]:justify-start sm:[&>a]:w-auto"
        />

        <p className="mx-auto mt-8 max-w-xl text-center text-ink/80">
          בשיחה או במייל אפשר לציין בקצרה את נושא הפנייה.
        </p>

        <NewsletterSignup mode={newsletterMode} />
      </div>
    </div>
  );
}
