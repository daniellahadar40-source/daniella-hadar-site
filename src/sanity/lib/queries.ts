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
