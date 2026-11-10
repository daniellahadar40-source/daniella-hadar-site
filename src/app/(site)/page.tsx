import Link from "next/link";
import { getCourses, getSiteSettings } from "@/lib/data";
import CmsImage from "@/components/CmsImage";

export default async function HomePage() {
  const [courses, siteSettings] = await Promise.all([getCourses(), getSiteSettings()]);
  const mainCourse = courses.find((course) => course.status !== "hidden");

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold text-smoked-blue">
              עובדת סוציאלית · מיצוי זכויות רפואיות
            </p>
            <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
              ליווי מקצועי ורגוע במיצוי זכויות רפואיות ונפשיות
            </h1>
            <p className="mt-4 text-lg text-ink/80">
              עובדת סוציאלית המלווה משפחות ויחידים מול ביטוח לאומי והוועדות
              הרפואיות — בידע מקצועי, בבהירות ובלי בירוקרטיה מיותרת.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="rounded-card bg-smoked-blue px-6 py-3 font-semibold text-cream transition hover:opacity-90"
              >
                לצפייה בקורסים
              </Link>
              <Link
                href="/about"
                className="rounded-card border border-smoked-blue px-6 py-3 font-semibold text-smoked-blue transition hover:bg-sage/20"
              >
                להכיר את דניאלה
              </Link>
            </div>
          </div>
          <CmsImage
            image={siteSettings.heroImage}
            alt="דניאלה הדר"
            className="aspect-[4/5] rounded-card bg-sage/30"
            priority
          />
        </div>
      </section>

      {mainCourse && (
        <section className="bg-champagne/30 py-16" aria-labelledby="main-course-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-sm font-semibold text-smoked-blue">הקורס הדיגיטלי המרכזי</p>
            <h2 id="main-course-title" className="mt-2 text-2xl font-bold text-ink">
              {mainCourse.title}
            </h2>
            <p className="mt-3 max-w-2xl text-ink/80">{mainCourse.shortDescription}</p>
            <Link
              href={`/courses/${mainCourse.slug}`}
              className="mt-6 inline-block rounded-card bg-smoked-blue px-6 py-3 font-semibold text-cream transition hover:opacity-90"
            >
              לפרטי הקורס
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" aria-labelledby="about-preview-title">
        <h2 id="about-preview-title" className="text-2xl font-bold text-ink">
          מי אני
        </h2>
        <p className="mt-4 max-w-2xl text-ink/80">
          עבדתי שנים רבות כעובדת סוציאלית בתוך המערכות הציבוריות, ומכירה את
          התהליך מבפנים. הקורסים והליווי שאני מציעה נולדו מתוך רצון להנגיש
          את הידע הזה למשפחות שמתמודדות עם מצב רפואי מאתגר.
        </p>
        <Link href="/about" className="mt-4 inline-block font-semibold text-smoked-blue hover:underline">
          לקרוא את הסיפור המלא ←
        </Link>
      </section>

      <section className="bg-sage/20 py-16" aria-labelledby="contact-title">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 id="contact-title" className="text-2xl font-bold text-ink">
            רוצה לשמוע עוד?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/80">
            אפשר ליצור קשר ישירות או להצטרף לרשימת העדכונים.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-card bg-smoked-blue px-6 py-3 font-semibold text-cream transition hover:opacity-90"
          >
            יצירת קשר
          </Link>
        </div>
      </section>
    </>
  );
}
