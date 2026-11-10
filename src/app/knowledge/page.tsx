import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מרכז הידע",
  description: "מאמרים מקצועיים בנושא מיצוי זכויות רפואיות, מאת דניאלה הדר.",
};

// אין עדיין מאמרים מאומתים — בכוונה לא מוצג תוכן מומצא (ראו סעיף 10 בתוכנית).
const articles: { slug: string; title: string }[] = [];

export default function KnowledgePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">מרכז הידע</h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        מאמרים מקצועיים על מיצוי זכויות רפואיות, עם מקורות מאומתים ותאריך עדכון.
      </p>

      {articles.length === 0 ? (
        <p className="mt-10 text-ink/70">
          מרכז הידע בבנייה — המאמרים הראשונים יפורסמו כאן בקרוב.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">{/* כרטיסי מאמרים */}</div>
      )}
    </div>
  );
}
