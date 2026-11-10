import type { Metadata } from "next";
import { getCourses } from "@/lib/data";
import CmsImage from "@/components/CmsImage";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "קורסים דיגיטליים",
  description: "קטלוג הקורסים הדיגיטליים של דניאלה הדר למיצוי זכויות רפואיות.",
};

export default async function CoursesPage() {
  const courses = (await getCourses()).filter((course) => course.status !== "hidden");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-display font-bold text-ink">קורסים דיגיטליים</h1>
      <p className="mt-3 max-w-2xl text-body-lg text-ink/80">
        קורסים מעשיים וממוקדים, שנבנו מתוך ניסיון מקצועי בשטח.
      </p>

      {courses.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="קורסים בדרך" description="קורסים יתפרסמו כאן בקרוב." />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.slug}>
              <CmsImage image={course.coverImage} alt={course.title} className="mb-4 aspect-[4/3] rounded-card" />
              <h2 className="text-h3 font-bold text-ink">{course.title}</h2>
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
              <Button href={`/courses/${course.slug}`} className="mt-4 inline-block">
                לפרטי הקורס
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
