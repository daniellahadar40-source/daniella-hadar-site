import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "שירות",
  type: "document",
  groups: [
    { name: "content", title: "תוכן", default: true },
    { name: "details", title: "פרטים ותיאום" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "שם השירות",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "label",
      title: "תווית קצרה",
      description: "לדוגמה: נקודת ההתחלה המומלצת. השאירו ריק אם אין צורך.",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "shortDescription",
      title: "תיאור קצר",
      description: "משפט או שניים שמסבירים למי השירות מתאים ומה מקבלים.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(260),
    }),
    defineField({
      name: "serviceType",
      title: "סוג השירות",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "קורס דיגיטלי", value: "digital" },
          { title: "פגישת זום", value: "zoom" },
          { title: "פגישה פרונטלית", value: "in-person" },
          { title: "אחר", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "audience", title: "למי השירות מתאים", type: "text", rows: 2, group: "details" }),
    defineField({ name: "duration", title: "משך", type: "string", group: "details" }),
    defineField({
      name: "priceLabel",
      title: "מחיר לתצוגה",
      description: "לדוגמה: 350 ₪ או מחיר בתיאום. אין להזין מחיר לפני אישור.",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "bookingUrl",
      title: "קישור לתיאום",
      type: "url",
      group: "details",
      validation: (Rule) => Rule.uri({ scheme: ["https", "http"] }),
    }),
    defineField({
      name: "status",
      title: "סטטוס",
      type: "string",
      options: {
        list: [
          { title: "טיוטה", value: "draft" },
          { title: "פורסם", value: "published" },
          { title: "לא מוצג", value: "hidden" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", title: "סדר תצוגה", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "סדר תצוגה", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "status" } },
});
