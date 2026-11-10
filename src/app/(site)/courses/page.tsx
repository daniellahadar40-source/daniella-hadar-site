import type { Metadata } from "next";
import Link from "next/link";
import { getCourses } from "@/lib/data";
import CmsImage from "@/components/CmsImage";

export const metadata: Metadata = {
  title: "קורסים דיגיטליים",
  description: "קטלוג הקורסים הדיגיטליים של דניאלה הדר למיצוי זכויות רפואיות.",
};

export default async function CoursesPage() {
  const courses = (await getCourses()).filter((course) => course.status !== "hidden");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">קורסים דיגיטליים</h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        קורסים מעשיים וממוקדים, שנבנו מתוך ניסיון מקצועי בשטח.
      </p>

      {courses.length === 0 ? (
        <p className="mt-10 text-ink/70">קורסים יתפרסמו כאן בקרוב.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <article key={course.slug} className="rounded-card border border-sage/40 bg-white/60 p-6">
              <CmsImage
                image={course.coverImage}
                alt={course.title}
                className="mb-4 aspect-[4/3] rounded-card bg-sage/30"
              />
              <h2 className="text-xl font-bold text-ink">{course.title}</h2>
              <p className="mt-2 text-ink/80">{course.shortDescription}</p>
              {course.status === "coming-soon" ? (
                <p className="mt-4 inline-block rounded-card bg-champagne/50 px-3 py-1 text-sm font-semibold text-ink">
                  בקרוב
                </p>
              ) : course.price ? (
                <p className="mt-4 font-semibold text-smoked-blue" dir="ltr">
                  {course.price} ₪
                </p>
              ) : null}
              <Link
                href={`/courses/${course.slug}`}
                className="mt-4 inline-block rounded-card bg-smoked-blue px-5 py-2.5 font-semibold text-cream transition hover:opacity-90"
              >
                לפרטי הקורס
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
