import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getCourseBySlug, getCourseSlugs } from "@/lib/data";
import CmsImage from "@/components/CmsImage";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import AbstractArt from "@/components/ui/AbstractArt";

export async function generateStaticParams() {
  const slugs = await getCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.shortDescription,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course || course.status === "hidden") notFound();

  // קישור רכישה פעיל רק עבור קורס בסטטוס "פעיל" עם קישור מאומת - קורס
  // "בקרוב" או "טיוטה" לעולם לא יציג כפתור רכישה פעיל (ראו דרישות M2, סעיף 3).
  const canPurchase = course.status === "published" && Boolean(course.purchaseUrl);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {course.status === "draft" && (
        <p className="mb-6 inline-block rounded-card border border-champagne bg-champagne/40 px-4 py-2 text-sm font-semibold text-ink">
          קורס זה נמצא עדיין בשלבי הכנה וטרם אושר לפרסום סופי.
        </p>
      )}
      <CmsImage
        image={course.coverImage}
        alt={course.title}
        className="mb-8 aspect-[16/9] rounded-card"
        priority
        fallback={<AbstractArt variant="course" className="mb-8 aspect-[16/9] rounded-card" />}
      />
      <SectionLabel>{course.status === "coming-soon" ? "קורס דיגיטלי · בקרוב" : "קורס דיגיטלי"}</SectionLabel>
      <h1 className="mt-3 text-display font-serif font-normal text-ink">{course.title}</h1>
      <p className="mt-4 text-body-lg text-ink/80">{course.shortDescription}</p>

      {course.fullDescription && (
        <div className="prose prose-neutral mt-6 max-w-none text-ink/90">
          <PortableText value={course.fullDescription} />
        </div>
      )}

      {course.lessons.length > 0 && (
        <section className="mt-10" aria-labelledby="lessons-title">
          <h2 id="lessons-title" className="text-h2 font-serif font-normal text-ink">
            מבנה הקורס
          </h2>
          <ol className="mt-4 space-y-4">
            {course.lessons.map((lesson, index) => (
              <li key={lesson.title} className="rounded-card border border-sage/40 bg-white/60 p-5">
                <p className="text-sm font-semibold text-smoked-blue">שיעור {index + 1}</p>
                <h3 className="mt-1 font-serif font-normal text-ink">{lesson.title}</h3>
                {lesson.description && <p className="mt-1 text-ink/80">{lesson.description}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-10 rounded-card bg-champagne/40 p-6" aria-labelledby="pricing-title">
        <h2 id="pricing-title" className="text-h3 font-serif font-normal text-ink">
          {course.status === "coming-soon" ? "בקרוב" : "מחיר"}
        </h2>

        {course.status === "coming-soon" ? (
          <p className="mt-2 text-ink/80">הקורס נמצא בהכנה ויפורסם כאן בקרוב.</p>
        ) : course.price ? (
          <p className="mt-2 text-2xl font-bold text-smoked-blue" dir="ltr">
            {course.price} {course.currency === "ILS" ? "₪" : course.currency}
          </p>
        ) : null}

        {canPurchase ? (
          <Button
            href={course.purchaseUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block"
          >
            לרכישת הקורס
          </Button>
        ) : (
          <p className="mt-4 text-sm text-ink/70">
            קישור הרכישה המאובטח יתווסף לאחר אימות כתובת ה-Schooler/Cardcom הרשמית
            מול דניאלה (ראו סעיף 13 בתוכנית העבודה) — האתר אינו אוסף פרטי תשלום בעצמו.
          </p>
        )}
      </section>
    </div>
  );
}
