import { defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "קורס דיגיטלי",
  type: "document",
  groups: [
    { name: "content", title: "תוכן", default: true },
    { name: "sale", title: "מחיר ורכישה" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "שם הקורס",
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
      name: "shortDescription",
      title: "תיאור קצר",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: "fullDescription",
      title: "תיאור מלא",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),
    defineField({
      name: "coverImage",
      title: "תמונת שער",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "טקסט חלופי (alt)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "audience",
      title: "קהל יעד",
      type: "text",
      rows: 2,
      group: "content",
    }),
    defineField({
      name: "lessons",
      title: "נושאי לימוד",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "lesson",
          fields: [
            defineField({ name: "title", title: "כותרת", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "תיאור", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
    defineField({
      name: "price",
      title: "מחיר לתצוגה",
      type: "number",
      group: "sale",
    }),
    defineField({
      name: "currency",
      title: "מטבע",
      type: "string",
      group: "sale",
      options: { list: [{ title: "שקל (₪)", value: "ILS" }] },
      initialValue: "ILS",
    }),
    defineField({
      name: "purchaseUrl",
      title: "קישור רכישה חיצוני (Schooler / Cardcom)",
      type: "url",
      group: "sale",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["https"] }).custom((value, context) => {
          const status = (context.document as { status?: string })?.status;
          if (status === "published" && !value) {
            return "קורס בסטטוס 'פעיל' חייב קישור רכישה מאומת";
          }
          return true;
        }),
      description: "יש לאמת את הקישור מול דניאלה לפני שינוי הסטטוס ל'פעיל' (ראו סעיף 13 בתוכנית העבודה).",
    }),
    defineField({
      name: "status",
      title: "סטטוס",
      type: "string",
      group: "sale",
      options: {
        list: [
          { title: "טיוטה", value: "draft" },
          { title: "פעיל", value: "published" },
          { title: "בקרוב", value: "coming-soon" },
          { title: "לא מוצג", value: "hidden" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "סדר תצוגה",
      type: "number",
      group: "content",
      initialValue: 0,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "updatedAt",
      title: "תאריך עדכון",
      type: "datetime",
      group: "content",
    }),
  ],
  orderings: [
    {
      title: "סדר תצוגה",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "status" },
  },
});
