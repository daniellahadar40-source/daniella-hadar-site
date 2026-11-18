import type { Metadata } from "next";
import { getCourses, getSiteSettings } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import CmsImage from "@/components/CmsImage";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import ContactActions from "@/components/ContactActions";

export async function generateMetadata(): Promise<Metadata> {
  const courses = await getCourses();
  const hasPublishedCourse = courses.some((course) => course.status === "published");

  return createPageMetadata({
    title: "קורסים דיגיטליים",
    description: "קטלוג הקורסים הדיגיטליים של דניאלה הדר למיצוי זכויות רפואיות.",
    path: "/courses",
    index: hasPublishedCourse,
  });
}

export default async function CoursesPage() {
  // מוצגים בקטלוג הציבורי רק קורסים שאושרו לפרסום ("פעיל") או שהוכרזו
  // רשמית כ"בקרוב". קורס בסטטוס "טיוטה" (שם/תוכן לא סופיים) אינו מוצג
  // בקטלוג, כדי לא להציג כחי/ניתן-לרכישה תוכן שלא אושר (ראו כללי התוכן).
  const [courses, siteSettings] = await Promise.all([
    getCourses().then((list) =>
      list.filter((course) => course.status === "published" || course.status === "coming-soon")
    ),
    getSiteSettings(),
  ]);

  return (
    <div>
      <PageHeader
        eyebrow="קורסים דיגיטליים"
        title="קורסים דיגיטליים"
        lede="קורסים מעשיים וממוקדים, שנבנו מתוך ניסיון מקצועי בשטח."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {courses.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="קורסים בדרך"
            description="הקורסים בהכנה ויתפרסמו כאן לאחר השלמת התוכן ואישורו."
            action={
              <ContactActions phone={siteSettings.phone} email={siteSettings.email} centered />
            }
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.slug}>
              <CmsImage image={course.coverImage} alt={course.title} className="mb-4 aspect-[4/3] rounded-card" />
              <h2 className="text-h3 font-serif font-normal text-ink">{course.title}</h2>
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
    </div>
  );
}
