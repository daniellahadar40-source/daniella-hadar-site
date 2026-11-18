import type { Metadata } from "next";
import { getArticles, getSiteSettings } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ArticleBrowser from "@/components/knowledge/ArticleBrowser";
import ContactActions from "@/components/ContactActions";

export async function generateMetadata(): Promise<Metadata> {
  const articles = await getArticles();

  return createPageMetadata({
    title: "מרכז הידע",
    description: "מאמרים מקצועיים בנושא מיצוי זכויות רפואיות, מאת דניאלה הדר.",
    path: "/knowledge",
    index: articles.length > 0,
  });
}

export default async function KnowledgePage() {
  const [articles, siteSettings] = await Promise.all([getArticles(), getSiteSettings()]);

  return (
    <div>
      <PageHeader
        eyebrow="מרכז הידע"
        title="מרכז הידע"
        lede="מאמרים מקצועיים על מיצוי זכויות רפואיות, עם מקורות מאומתים ותאריך עדכון."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "מרכז הידע" }]} />
      {articles.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="מרכז הידע בבנייה"
            description="המאמרים הראשונים יפורסמו כאן בקרוב, עם מקורות מאומתים ובלי ז׳רגון."
            action={
              <ContactActions phone={siteSettings.phone} email={siteSettings.email} centered />
            }
          />
        </div>
      ) : (
        <div className="mt-8">
          <ArticleBrowser articles={articles} />
        </div>
      )}
      </div>
    </div>
  );
}
