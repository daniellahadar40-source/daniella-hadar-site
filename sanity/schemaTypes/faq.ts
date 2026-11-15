import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "שאלה נפוצה",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "השאלה",
      type: "string",
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: "answer",
      title: "התשובה",
      description: "יש לכתוב מידע כללי בלבד, ללא הבטחת זכאות או ייעוץ אישי.",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().max(900),
    }),
    defineField({
      name: "category",
      title: "נושא",
      type: "string",
      options: {
        list: [
          { title: "שירותים", value: "services" },
          { title: "קורסים", value: "courses" },
          { title: "תהליך וזכויות", value: "process" },
          { title: "תיאום ויצירת קשר", value: "contact" },
          { title: "אחר", value: "other" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "סטטוס",
      type: "string",
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
    defineField({ name: "order", title: "סדר תצוגה", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "סדר תצוגה", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "status" } },
});
