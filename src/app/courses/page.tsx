import type { Metadata } from "next";
import Link from "next/link";
import { courses } from "@/lib/content";

export const metadata: Metadata = {
  title: "קורסים דיגיטליים",
  description: "קטלוג הקורסים הדיגיטליים של דניאלה הדר למיצוי זכויות רפואיות.",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">קורסים דיגיטליים</h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        קורסים מעשיים וממוקדים, שנבנו מתוך ניסיון מקצועי בשטח.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {courses.map((course) => (
          <article key={course.slug} className="rounded-card border border-sage/40 bg-white/60 p-6">
            <h2 className="text-xl font-bold text-ink">{course.title}</h2>
            <p className="mt-2 text-ink/80">{course.shortDescription}</p>
            <p className="mt-4 font-semibold text-smoked-blue" dir="ltr">
              {course.price} ₪
            </p>
            <Link
              href={`/courses/${course.slug}`}
              className="mt-4 inline-block rounded-card bg-smoked-blue px-5 py-2.5 font-semibold text-cream transition hover:opacity-90"
            >
              לפרטי הקורס
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
