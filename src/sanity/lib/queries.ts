import { groq } from "next-sanity";

// רשימת קורסים גלויים לאתר הציבורי (לא "לא מוצג"), ממוינת לפי סדר תצוגה.
export const coursesQuery = groq`
  *[_type == "course" && status != "hidden"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    coverImage,
    price,
    currency,
    status,
    order
  }
`;

export const courseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    coverImage,
    audience,
    lessons,
    price,
    currency,
    purchaseUrl,
    status,
    seoTitle,
    seoDescription
  }
`;

export const courseSlugsQuery = groq`*[_type == "course" && status != "hidden"].slug.current`;

export const articlesQuery = groq`
  *[_type == "article" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    publishedAt,
    "categories": categories[]->title
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    coverImage,
    author,
    sources,
    publishedAt,
    updatedAt,
    "categories": categories[]->title,
    "relatedArticles": relatedArticles[]->{
      status,
      "slug": slug.current,
      title,
      excerpt,
      coverImage
    }[status == "published"],
    seoTitle,
    seoDescription
  }
`;

export const articleSlugsQuery = groq`*[_type == "article" && status == "published"].slug.current`;

// רק המלצות שאושרו לפרסום במפורש וסטטוסן "פורסם" (ברירת המחדל היא אי-פרסום).
export const testimonialsQuery = groq`
  *[_type == "testimonial" && approvedForPublication == true && status == "published"] | order(order asc) {
    _id,
    quote,
    displayName,
    showFullName,
    image
  }
`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const servicesQuery = groq`
  *[_type == "service" && status == "published"] | order(order asc) {
    title,
    label,
    shortDescription,
    serviceType,
    audience,
    duration,
    priceLabel,
    bookingUrl
  }
`;

export const faqsQuery = groq`
  *[_type == "faq" && status == "published"] | order(order asc) {
    question,
    answer,
    category
  }
`;

export const assistantSettingsQuery = groq`*[_type == "assistantSettings"][0] {
  enabled,
  welcomeMessage,
  disclaimer,
  suggestedQuestions,
  fallbackMessage
}`;
