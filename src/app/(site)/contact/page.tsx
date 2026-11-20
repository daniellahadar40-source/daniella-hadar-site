import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import { getNewsletterMode } from "@/lib/newsletter";
import PageHeader from "@/components/ui/PageHeader";
import ContactActions from "@/components/ContactActions";
import NewsletterSignup from "@/components/NewsletterSignup";
import LocalPhoto from "@/components/ui/LocalPhoto";

export const metadata: Metadata = createPageMetadata({
  title: "יצירת קשר",
  description: "פרטי יצירת קשר עם דניאלה הדר, עובדת סוציאלית קלינית למיצוי זכויות רפואיות.",
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
        lede="הפנייה הראשונה מתבצעת בוואטסאפ — אפשר גם בטלפון או במייל."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <LocalPhoto
          src="/images/daniella-portrait-candid.jpg"
          alt="דניאלה הדר"
          className="mx-auto mb-8 aspect-square w-44 rounded-full shadow-lg shadow-ink/15 sm:w-56"
          sizes="224px"
        />
        <ContactActions
          phone={siteSettings.phone}
          email={siteSettings.email}
          showValues
          centered
          className="[&>a]:w-full [&>a]:justify-start sm:[&>a]:w-auto"
        />

        <p className="mx-auto mt-8 max-w-xl text-center text-ink/80">
          אפשר לפנות בכל ימות השבוע בין השעות 8:00–16:00. הפגישות מתקיימות
          בקריית גת בתיאום מראש, או אונליין בזום מכל הארץ. ליווי מול ביטוח
          לאומי והוועדות מתקיים בכל האזור — מהדרום, דרך השפלה ועד המרכז.
        </p>

        <NewsletterSignup mode={newsletterMode} />
      </div>
    </div>
  );
}
