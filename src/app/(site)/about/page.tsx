import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getSiteSettings } from "@/lib/data";
import CmsImage from "@/components/CmsImage";
import AbstractArt from "@/components/ui/AbstractArt";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "אודות",
  description: "הסיפור המקצועי של דניאלה הדר, עובדת סוציאלית למיצוי זכויות רפואיות.",
};

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div>
      <PageHeader eyebrow="מי אני" title="מי אני" />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <CmsImage
        image={siteSettings.aboutImage}
        alt={siteSettings.siteName}
        className="aspect-[4/3] rounded-card"
        fallback={<AbstractArt variant="about" className="aspect-[4/3] rounded-card" />}
      />

      <div className="prose prose-neutral mt-8 max-w-none text-ink/90">
        {siteSettings.aboutText ? (
          <PortableText value={siteSettings.aboutText} />
        ) : (
          <>
            <p>
              אני דניאלה הדר, עובדת סוציאלית העוסקת במיצוי זכויות רפואיות ונפשיות.
              לאורך שנות עבודתי במערכות הציבוריות ליוויתי אנשים ומשפחות בתהליכים
              מורכבים מול ביטוח לאומי והוועדות הרפואיות.
            </p>
            <p>
              הקמתי את הקורסים והליווי הדיגיטלי כדי להנגיש את הידע המקצועי הזה
              לכל מי שזקוק לו — בבהירות, ברוגע ובלי לשלם סכומים גבוהים על ייעוץ
              שניתן ללמוד באופן עצמאי.
            </p>
            <p className="text-sm text-ink/60">
              תוכן ביוגרפי נוסף, תמונות וציטוטים מדויקים יתווספו בהמשך בהתאם
              לחומרים שיועברו (ראו רשימת המידע הנדרש בתוכנית העבודה).
            </p>
          </>
        )}
      </div>
      </div>
    </div>
  );
}
