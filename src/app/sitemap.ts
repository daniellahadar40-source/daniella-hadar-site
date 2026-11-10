import type { MetadataRoute } from "next";
import { courses } from "@/lib/content";

// יש לעדכן לדומיין הסופי לאחר רכישתו (ראו סעיף 13 בתוכנית).
const baseUrl = "https://www.daniella-hadar.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...courseRoutes];
}
