import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses } from "@/lib/content";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
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
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">{course.title}</h1>
      <p className="mt-4 text-lg text-ink/80">{course.shortDescription}</p>

      <section className="mt-10" aria-labelledby="lessons-title">
        <h2 id="lessons-title" className="text-xl font-bold text-ink">
          מבנה הקורס
        </h2>
        <ol className="mt-4 space-y-4">
          {course.lessons.map((lesson, index) => (
            <li key={lesson.title} className="rounded-card border border-sage/40 bg-white/60 p-5">
              <p className="text-sm font-semibold text-smoked-blue">שיעור {index + 1}</p>
              <h3 className="mt-1 font-bold text-ink">{lesson.title}</h3>
              <p className="mt-1 text-ink/80">{lesson.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 rounded-card bg-champagne/40 p-6" aria-labelledby="pricing-title">
        <h2 id="pricing-title" className="text-xl font-bold text-ink">
          מחיר
        </h2>
        <p className="mt-2 text-2xl font-bold text-smoked-blue" dir="ltr">
          {course.price} ₪
        </p>
        <p className="mt-4 text-sm text-ink/70">
          קישור הרכישה המאובטח יתווסף לאחר אימות כתובת ה-Schooler/Cardcom הרשמית
          מול דניאלה (ראו סעיף 13 בתוכנית העבודה) — האתר אינו אוסף פרטי תשלום בעצמו.
        </p>
      </section>
    </div>
  );
}
