import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getArticleSlugs } from "@/lib/data";
import { createPageMetadata, SITE_URL } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import CmsImage from "@/components/CmsImage";
import ArticlePortableText from "@/components/ArticlePortableText";
import SectionLabel from "@/components/ui/SectionLabel";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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
  return createPageMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    path: `/knowledge/${slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const pageUrl = new URL(`/knowledge/${slug}`, SITE_URL).toString();
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    mainEntityOfPage: pageUrl,
    inLanguage: "he-IL",
    author: article.author
      ? { "@type": "Person", name: article.author }
      : { "@id": `${SITE_URL.toString()}#person` },
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    ...(article.categories && article.categories.length > 0 ? { keywords: article.categories.join(", ") } : {}),
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "בית", item: SITE_URL.toString() },
      { "@type": "ListItem", position: 2, name: "מרכז הידע", item: new URL("/knowledge", SITE_URL).toString() },
      { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <JsonLd data={articleStructuredData} />
      <JsonLd data={breadcrumbStructuredData} />
      <Breadcrumbs
        items={[
          { label: "בית", href: "/" },
          { label: "מרכז הידע", href: "/knowledge" },
          { label: article.title },
        ]}
      />
      <CmsImage
        image={article.coverImage}
        alt={article.title}
        className="mb-8 mt-6 aspect-[16/9] rounded-card"
        priority
      />
      <SectionLabel>מרכז הידע</SectionLabel>
      <h1 className="mt-3 text-display font-serif font-normal text-ink">{article.title}</h1>
      <p className="mt-4 text-body-lg text-ink/85">{article.excerpt}</p>

      {article.categories && article.categories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-sage/50 bg-sage/15 px-3 py-1 text-xs font-semibold text-ink"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      <p className="mt-4 text-sm text-ink/80">
        {article.author && `מאת ${article.author}`}
        {article.publishedAt && (
          <>
            {article.author && " · "}
            פורסם ב-{new Date(article.publishedAt).toLocaleDateString("he-IL")}
          </>
        )}
        {article.updatedAt && (
          <>
            {(article.author || article.publishedAt) && " · "}
            עודכן לאחרונה ב-{new Date(article.updatedAt).toLocaleDateString("he-IL")}
          </>
        )}
      </p>

      {article.body && (
        <div className="prose mt-6 max-w-none">
          <ArticlePortableText value={article.body} />
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

      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="mt-12 border-t border-sage/40 pt-8" aria-labelledby="related-articles-title">
          <h2 id="related-articles-title" className="text-h3 font-serif font-normal text-ink">
            מאמרים קשורים
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {article.relatedArticles.map((related) => (
              <Card key={related.slug}>
                <CmsImage
                  image={related.coverImage}
                  alt={related.title}
                  className="mb-3 aspect-[4/3] rounded-card"
                />
                <h3 className="font-serif font-normal text-ink">{related.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{related.excerpt}</p>
                <Button href={`/knowledge/${related.slug}`} variant="ghost" className="mt-3 inline-block">
                  לקריאת המאמר ←
                </Button>
              </Card>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <Link href="/knowledge" className="font-semibold text-smoked-blue hover:underline">
          ← חזרה למרכז הידע
        </Link>
      </div>
    </article>
  );
}
