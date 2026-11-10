import type { MetadataRoute } from "next";
import { getCourses, getArticles } from "@/lib/data";

// יש לעדכן לדומיין הסופי לאחר רכישתו (ראו סעיף 13 בתוכנית).
const baseUrl = "https://www.daniella-hadar.co.il";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, articles] = await Promise.all([getCourses(), getArticles()]);

  const staticRoutes = [
    "",
    "/courses",
    "/knowledge",
    "/about",
    "/testimonials",
    "/contact",
    "/accessibility-statement",
    "/privacy-policy",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const courseRoutes = courses
    .filter((course) => course.status !== "hidden")
    .map((course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: new Date(),
    }));

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/knowledge/${article.slug}`,
    lastModified: article.updatedAt ?? article.publishedAt ?? new Date(),
  }));

  return [...staticRoutes, ...courseRoutes, ...articleRoutes];
}
