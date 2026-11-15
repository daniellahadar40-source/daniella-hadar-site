"use client";

import { useId, useMemo, useState } from "react";
import CmsImage from "@/components/CmsImage";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { Article } from "@/lib/types";

const ALL_CATEGORY = "הכל";

export default function ArticleBrowser({ articles }: { articles: Article[] }) {
  const searchInputId = useId();
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const unique = new Set<string>();
    articles.forEach((article) => article.categories?.forEach((category) => unique.add(category)));
    return [ALL_CATEGORY, ...Array.from(unique)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || (article.categories ?? []).includes(activeCategory);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.excerpt.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [articles, activeCategory, query]);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="סינון לפי נושא">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-smoked-blue text-cream"
                      : "border border-sage/50 bg-white/70 text-ink hover:border-smoked-blue/50 hover:text-smoked-blue"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        <div className="sm:w-72">
          <label htmlFor={searchInputId} className="sr-only">
            חיפוש מאמרים
          </label>
          <input
            id={searchInputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="חיפוש מאמר לפי כותרת או תוכן…"
            className="w-full rounded-full border border-sage/50 bg-white/70 px-5 py-2.5 text-ink placeholder:text-ink/50 focus:border-smoked-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smoked-blue"
          />
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <p className="mt-12 text-center text-ink/70">
          לא נמצאו מאמרים התואמים את החיפוש או הסינון שנבחרו.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {filteredArticles.map((article) => (
            <Card key={article.slug}>
              <CmsImage image={article.coverImage} alt={article.title} className="mb-4 aspect-[4/3] rounded-card" />
              {article.categories && article.categories.length > 0 && (
                <p className="text-caption font-bold uppercase text-smoked-blue">{article.categories[0]}</p>
              )}
              <h2 className="mt-2 text-h3 font-serif font-normal text-ink">{article.title}</h2>
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
