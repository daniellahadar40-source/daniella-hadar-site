import type { Metadata } from "next";
import { getArticles } from "@/lib/data";
import CmsImage from "@/components/CmsImage";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "מרכז הידע",
  description: "מאמרים מקצועיים בנושא מיצוי זכויות רפואיות, מאת דניאלה הדר.",
};

export default async function KnowledgePage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-display font-bold text-ink">מרכז הידע</h1>
      <p className="mt-3 max-w-2xl text-body-lg text-ink/80">
        מאמרים מקצועיים על מיצוי זכויות רפואיות, עם מקורות מאומתים ותאריך עדכון.
      </p>

      {articles.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="מרכז הידע בבנייה" description="המאמרים הראשונים יפורסמו כאן בקרוב." />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.slug}>
              <CmsImage image={article.coverImage} alt={article.title} className="mb-4 aspect-[4/3] rounded-card" />
              <h2 className="text-h3 font-bold text-ink">{article.title}</h2>
              <p className="mt-2 text-ink/80">{article.excerpt}</p>
              <Button href={`/knowledge/${article.slug}`} variant="ghost" className="mt-4 inline-block">
                לקריאת המאמר ←
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
