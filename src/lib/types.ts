import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export type CourseStatus = "draft" | "published" | "coming-soon" | "hidden";

export type Lesson = {
  title: string;
  description?: string;
};

export type Course = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: PortableTextBlock[];
  coverImage?: SanityImageSource;
  audience?: string;
  lessons: Lesson[];
  price?: number;
  currency?: string;
  purchaseUrl?: string;
  status: CourseStatus;
};

export type ArticleSource = {
  label: string;
  url?: string;
};

export type RelatedArticle = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: SanityImageSource;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImageSource;
  author?: string;
  sources?: ArticleSource[];
  publishedAt?: string;
  updatedAt?: string;
  categories?: string[];
  relatedArticles?: RelatedArticle[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Testimonial = {
  quote: string;
  displayName: string;
  showFullName?: boolean;
  image?: SanityImageSource;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type SiteSettings = {
  siteName: string;
  tagline?: string;
  phone?: string;
  email?: string;
  heroImage?: SanityImageSource;
  aboutImage?: SanityImageSource;
  aboutText?: PortableTextBlock[];
  socialLinks?: SocialLink[];
};

export type ServiceType = "digital" | "zoom" | "in-person" | "other";

export type Service = {
  title: string;
  label?: string;
  shortDescription: string;
  serviceType: ServiceType;
  audience?: string;
  duration?: string;
  priceLabel?: string;
  bookingUrl?: string;
};

export type Faq = {
  question: string;
  answer: string;
  category?: string;
};

export type AssistantSettings = {
  enabled: boolean;
  welcomeMessage: string;
  disclaimer: string;
  suggestedQuestions: string[];
  fallbackMessage: string;
};
