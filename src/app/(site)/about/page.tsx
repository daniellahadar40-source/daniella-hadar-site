import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getSiteSettings } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export const metadata: Metadata = createPageMetadata({
  title: "אודות",
  description: "הסיפור המקצועי של דניאלה הדר, עובדת סוציאלית למיצוי זכויות רפואיות.",
  path: "/about",
});

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();

  return (
    <div>
      <PageHeader
        eyebrow="מי אני"
        title="עובדת מהשטח, לא רק מהספר"
        lede="ליווי שמחבר בין ניסיון במערכות הציבוריות לבין הסבר פשוט, ברור ואנושי."
      />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16" aria-labelledby="about-story-title">
          <h2 id="about-story-title" className="text-h2 font-serif font-normal leading-tight text-ink">
            ידע מקצועי שנועד להפוך לדרך ברורה
          </h2>
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
        </section>

        <section className="mt-16 border-y border-ink/10 py-12 sm:mt-20 sm:py-16" aria-labelledby="approach-title">
          <h2 id="approach-title" className="text-h2 font-serif font-normal text-ink">
            מה חשוב לי בתהליך
          </h2>
          <dl className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0">
            <div className="md:pe-8">
              <dt className="text-h3 font-serif font-normal text-ink">ידע שמחובר למציאות</dt>
              <dd className="mt-2.5 leading-relaxed text-ink/80">
                היכרות עם ביטוח לאומי והוועדות הרפואיות, כדי להפוך תהליך מורכב לצעדים שאפשר להבין.
              </dd>
            </div>
            <div className="border-t border-ink/10 pt-8 md:border-s md:border-t-0 md:px-8 md:pt-0">
              <dt className="text-h3 font-serif font-normal text-ink">בהירות בלי ז&apos;רגון</dt>
              <dd className="mt-2.5 leading-relaxed text-ink/80">
                הסבר פשוט ומסודר, שמאפשר להבין מה עומד לפניכם ומה אפשר לעשות בכל שלב.
              </dd>
            </div>
            <div className="border-t border-ink/10 pt-8 md:border-s md:border-t-0 md:ps-8 md:pt-0">
              <dt className="text-h3 font-serif font-normal text-ink">קצב שמתאים לכם</dt>
              <dd className="mt-2.5 leading-relaxed text-ink/80">
                אפשר ללמוד באופן עצמאי, להתייעץ בזום או להיפגש פנים אל פנים בהתאם לצורך ולזמינות.
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-16 rounded-card bg-smoked-blue px-6 py-10 text-center text-cream sm:mt-20 sm:px-10 sm:py-12" aria-labelledby="about-contact-title">
          <h2 id="about-contact-title" className="text-h2 font-serif font-normal">
            לא בטוחים איזו דרך מתאימה לכם?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/85">
            אפשר לפנות ישירות, לספר בקצרה במה אתם מתלבטים ולבדוק מה יכול להתאים.
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="inverse">
              ליצירת קשר
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
