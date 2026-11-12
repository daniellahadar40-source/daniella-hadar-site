import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getSiteSettings } from "@/lib/data";
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
      <div className="prose prose-neutral max-w-none text-ink/90">
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
          </>
        )}
      </div>
      </div>
    </div>
  );
}
