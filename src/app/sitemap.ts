import type { MetadataRoute } from "next";
import { getCourses, getArticles, getTestimonials } from "@/lib/data";
import { SITE_URL } from "@/lib/metadata";

const baseUrl = SITE_URL.toString().replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, articles, testimonials] = await Promise.all([
    getCourses(),
    getArticles(),
    getTestimonials(),
  ]);
  const publishedCourses = courses.filter((course) => course.status === "published");

  const staticPaths = ["", "/about", "/contact"];
  if (publishedCourses.length > 0) staticPaths.push("/courses");
  if (articles.length > 0) staticPaths.push("/knowledge");
  if (testimonials.length > 0) staticPaths.push("/testimonials");

  const staticRoutes = staticPaths.map((path) => ({ url: `${baseUrl}${path}` }));

  // רק קורסים פעילים נכנסים ל-sitemap. קורס "בקרוב", טיוטה או קורס מוסתר
  // נשארים מחוץ לאינדוקס עד שיש עמוד ציבורי מלא ומאושר.
  const courseRoutes = publishedCourses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
  }));

  const articleRoutes = articles.map((article) => {
    const lastModified = article.updatedAt ?? article.publishedAt;
    return {
      url: `${baseUrl}/knowledge/${article.slug}`,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  return [...staticRoutes, ...courseRoutes, ...articleRoutes];
}
