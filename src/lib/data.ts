import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  articleBySlugQuery,
  articleSlugsQuery,
  articlesQuery,
  courseBySlugQuery,
  courseSlugsQuery,
  coursesQuery,
  faqsQuery,
  servicesQuery,
  assistantSettingsQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import {
  fallbackArticles,
  fallbackAssistantSettings,
  fallbackCourses,
  fallbackFaqs,
  fallbackServices,
  fallbackSiteSettings,
  fallbackTestimonials,
} from "./content";
import type { Article, AssistantSettings, Course, Faq, Service, SiteSettings, Testimonial } from "./types";

// Cache/Revalidation: ISR כל שעה כברירת מחדל לתוכן שמגיע מה-CMS, כדי שעדכון
// תוכן בידי דניאלה יתפרסם באתר בלי צורך בדיפלוי מחדש (ראו סעיף 4 בדרישות M2).
const REVALIDATE_SECONDS = 3600;

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    console.error("Sanity fetch failed, falling back to local draft content:", error);
    return null;
  }
}

export async function getCourses(): Promise<Course[]> {
  if (!isSanityConfigured) return fallbackCourses;
  const result = await fetchSanity<Course[]>(coursesQuery);
  return result ?? fallbackCourses;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  if (!isSanityConfigured) {
    return fallbackCourses.find((course) => course.slug === slug) ?? null;
  }
  const result = await fetchSanity<Course>(courseBySlugQuery, { slug });
  return result ?? fallbackCourses.find((course) => course.slug === slug) ?? null;
}

export async function getCourseSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return fallbackCourses.map((course) => course.slug);
  const result = await fetchSanity<string[]>(courseSlugsQuery);
  return result ?? fallbackCourses.map((course) => course.slug);
}

export async function getArticles(): Promise<Article[]> {
  if (!isSanityConfigured) return fallbackArticles;
  const result = await fetchSanity<Article[]>(articlesQuery);
  return result ?? fallbackArticles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSanityConfigured) {
    return fallbackArticles.find((article) => article.slug === slug) ?? null;
  }
  const result = await fetchSanity<Article>(articleBySlugQuery, { slug });
  return result ?? fallbackArticles.find((article) => article.slug === slug) ?? null;
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return fallbackArticles.map((article) => article.slug);
  const result = await fetchSanity<string[]>(articleSlugsQuery);
  return result ?? fallbackArticles.map((article) => article.slug);
}

// מחזיר רק המלצות שאושרו לפרסום במפורש (ראו שאילתת testimonialsQuery).
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return fallbackTestimonials;
  const result = await fetchSanity<Testimonial[]>(testimonialsQuery);
  return result ?? fallbackTestimonials;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return fallbackSiteSettings;
  const result = await fetchSanity<SiteSettings>(siteSettingsQuery);
  return result ?? fallbackSiteSettings;
}

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) return fallbackServices;
  const result = await fetchSanity<Service[]>(servicesQuery);
  return result && result.length > 0 ? result : fallbackServices;
}

export async function getFaqs(): Promise<Faq[]> {
  if (!isSanityConfigured) return fallbackFaqs;
  const result = await fetchSanity<Faq[]>(faqsQuery);
  return result ?? fallbackFaqs;
}

export async function getAssistantSettings(): Promise<AssistantSettings> {
  if (!isSanityConfigured) return fallbackAssistantSettings;
  const result = await fetchSanity<Partial<AssistantSettings>>(assistantSettingsQuery);
  if (!result) return fallbackAssistantSettings;
  return {
    ...fallbackAssistantSettings,
    ...result,
    suggestedQuestions: result.suggestedQuestions ?? fallbackAssistantSettings.suggestedQuestions,
  };
}
