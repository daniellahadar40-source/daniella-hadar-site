import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/data";
import CmsImage from "@/components/CmsImage";

export const metadata: Metadata = {
  title: "מרכז הידע",
  description: "מאמרים מקצועיים בנושא מיצוי זכויות רפואיות, מאת דניאלה הדר.",
};

export default async function KnowledgePage() {
  const articles = await getArticles();

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
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug} className="rounded-card border border-sage/40 bg-white/60 p-6">
              <CmsImage
                image={article.coverImage}
                alt={article.title}
                className="mb-4 aspect-[4/3] rounded-card bg-sage/30"
              />
              <h2 className="text-xl font-bold text-ink">{article.title}</h2>
              <p className="mt-2 text-ink/80">{article.excerpt}</p>
              <Link
                href={`/knowledge/${article.slug}`}
                className="mt-4 inline-block font-semibold text-smoked-blue hover:underline"
              >
                לקריאת המאמר ←
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
