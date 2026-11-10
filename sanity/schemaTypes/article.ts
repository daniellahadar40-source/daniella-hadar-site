import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "מאמר",
  type: "document",
  groups: [
    { name: "content", title: "תוכן", default: true },
    { name: "meta", title: "פרטים ומקורות" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "כותרת",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "תקציר",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "body",
      title: "תוכן המאמר",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "תמונת שער",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "טקסט חלופי (alt)", type: "string" })],
    }),
    defineField({
      name: "categories",
      title: "קטגוריות",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "author",
      title: "שם הכותבת",
      type: "string",
      group: "meta",
      initialValue: "דניאלה הדר",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sources",
      title: "מקורות מקצועיים",
      description: "חובה לציין מקור מקצועי מצוטט לכל מאמר בתחום הרפואי-משפטי (ראו סעיף 10 בתוכנית, סיכון 4).",
      type: "array",
      group: "meta",
      of: [
        {
          type: "object",
          name: "source",
          fields: [
            defineField({ name: "label", title: "תיאור המקור", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "url", title: "קישור", type: "url", validation: (Rule) => Rule.uri({ scheme: ["https", "http"] }) }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    defineField({
      name: "relatedCourses",
      title: "קורסים קשורים",
      type: "array",
      group: "meta",
      of: [{ type: "reference", to: [{ type: "course" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "תאריך פרסום",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "updatedAt",
      title: "תאריך עדכון",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "status",
      title: "סטטוס פרסום",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "טיוטה", value: "draft" },
          { title: "פורסם", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2, group: "seo" }),
  ],
  orderings: [
    {
      title: "תאריך פרסום (חדש לישן)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
});
