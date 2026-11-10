import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getArticleBySlug, getArticleSlugs } from "@/lib/data";
import CmsImage from "@/components/CmsImage";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const updatedLabel = article.updatedAt ?? article.publishedAt;

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <CmsImage
        image={article.coverImage}
        alt={article.title}
        className="mb-8 aspect-[16/9] rounded-card bg-sage/30"
        priority
      />
      <h1 className="text-3xl font-bold text-ink">{article.title}</h1>
      <p className="mt-2 text-sm text-ink/60">
        {article.author && `מאת ${article.author} · `}
        {updatedLabel && `עודכן לאחרונה: ${new Date(updatedLabel).toLocaleDateString("he-IL")}`}
      </p>

      {article.body && (
        <div className="prose prose-neutral mt-6 max-w-none text-ink/90">
          <PortableText value={article.body} />
        </div>
      )}

      {article.sources && article.sources.length > 0 && (
        <section className="mt-8 border-t border-sage/40 pt-6" aria-labelledby="sources-title">
          <h2 id="sources-title" className="text-sm font-semibold text-ink/70">
            מקורות מקצועיים
          </h2>
          <ul className="mt-2 space-y-1 text-sm text-ink/70">
            {article.sources.map((source) => (
              <li key={source.label}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {source.label}
                  </a>
                ) : (
                  source.label
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
