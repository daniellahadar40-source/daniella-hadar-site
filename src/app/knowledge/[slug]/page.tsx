import { notFound } from "next/navigation";

type Article = {
  slug: string;
  title: string;
  body: string;
  source: string;
  updatedAt: string;
};

// תבנית מוכנה לעמוד מאמר בודד — תתחבר ל-CMS ב-Milestone 2.
// אין עדיין מאמרים מאומתים, לכן הרשימה ריקה בכוונה.
const articles: Article[] = [];

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">{article.title}</h1>
      <p className="mt-2 text-sm text-ink/60">עודכן לאחרונה: {article.updatedAt}</p>
      <div className="prose prose-neutral mt-6 max-w-none text-ink/90">{article.body}</div>
      <p className="mt-8 text-sm text-ink/60">מקור: {article.source}</p>
    </article>
  );
}
