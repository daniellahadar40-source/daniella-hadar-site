import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "המלצה",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "טקסט ההמלצה",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "שם הממליץ/ה לתצוגה",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showFullName",
      title: "אישור להצגת שם מלא",
      description: "אם כבוי, יוצג רק 'שם הממליץ/ה לתצוגה' (למשל ראשי תיבות).",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "relatedCourse",
      title: "שיוך לקורס",
      type: "reference",
      to: [{ type: "course" }],
    }),
    defineField({
      name: "image",
      title: "תמונה (אופציונלי)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "approvedForPublication",
      title: "אישור פרסום",
      description:
        "חובה אישור מפורש מהממליץ/ה לפני הפעלה. ברירת המחדל כבויה בכוונה (ראו סעיף 10 בתוכנית, סיכון 3).",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "סטטוס פרסום",
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
    defineField({
      name: "order",
      title: "סדר תצוגה",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "displayName", subtitle: "status", approved: "approvedForPublication" },
    prepare({ title, subtitle, approved }) {
      return {
        title,
        subtitle: `${subtitle === "published" ? "פורסם" : "טיוטה"} · ${approved ? "מאושר לפרסום" : "לא מאושר"}`,
      };
    },
  },
});
