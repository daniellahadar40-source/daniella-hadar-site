import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getSiteSettings } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import LocalPhoto from "@/components/ui/LocalPhoto";

export const metadata: Metadata = createPageMetadata({
  title: "אודות",
  description: "הסיפור המקצועי של דניאלה הדר, עובדת סוציאלית קלינית למיצוי זכויות רפואיות.",
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
        <section aria-labelledby="about-story-title">
          <h2 id="about-story-title" className="text-h2 font-serif font-normal leading-tight text-ink">
            ידע מקצועי שנועד להפוך לדרך ברורה
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <LocalPhoto
              src="/images/daniella-portrait-outdoor.jpg"
              alt="דניאלה הדר, עובדת סוציאלית קלינית למיצוי זכויות רפואיות"
              className="aspect-[4/5] w-full max-w-[320px] rounded-card shadow-lg shadow-ink/15"
              sizes="(min-width: 1024px) 320px, 70vw"
            />
            <div className="prose prose-neutral max-w-none text-ink/90">
            {siteSettings.aboutText ? (
              <PortableText value={siteSettings.aboutText} />
            ) : (
              <>
                <p>
                  אני דניאלה הדר, עובדת סוציאלית קלינית (MSW), עם תואר שני בעבודה
                  סוציאלית קלינית במגמת ילד ונוער מהאוניברסיטה העברית, ותואר ראשון
                  מאוניברסיטת אריאל. יש לי 14 שנות ניסיון: ניהול צוותים בבריאות
                  הנפש, ליווי משפחות בטיפול ביתי, הנחיית קבוצות והרצאות, ותיאום
                  טיפול ומיצוי זכויות רפואיות מול ביטוח לאומי, משרד הבריאות, משרד
                  החינוך והרווחה.
                </p>
                <p>
                  עבדתי יותר מעשור כעובדת סוציאלית בתוך המערכות הציבוריות, כך שאני
                  מכירה את התסכול, את הפחד ואת התחושה שאתם לבד מול קירות. התחלתי
                  בליווי משפחות בבית, והמשכתי לטיפול בילדים ובני נוער ולניהול
                  צוותים בבריאות הנפש.
                </p>
                <p>
                  בדרך ראיתי איך אנשים מוותרים על זכויות רק כי אף אחד לא הסביר להם
                  איך עושים את זה — ומשום כך התחלתי ללוות ולהעביר קורסים. זו הדרך
                  שלי להושיט יד, על מנת שתדעו, תבינו ותרגישו בטוחים מול ביטוח לאומי.
                  גם אני עולה בעצמי, ובעלת רקע בחינוך בלתי פורמלי.
                </p>
              </>
            )}
            </div>
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
