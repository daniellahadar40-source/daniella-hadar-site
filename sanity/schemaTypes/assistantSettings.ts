import { defineField, defineType } from "sanity";

export const assistantSettings = defineType({
  name: "assistantSettings",
  title: "עוזר הניווט",
  type: "document",
  fields: [
    defineField({
      name: "enabled",
      title: "הצגת העוזר באתר",
      description: "העוזר הנוכחי הוא הדגמה מקומית לניווט ואינו שולח מידע לספק AI.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "welcomeMessage",
      title: "הודעת פתיחה",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "disclaimer",
      title: "הודעת גבולות ופרטיות",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: "suggestedQuestions",
      title: "שאלות פתיחה מוצעות",
      type: "array",
      validation: (Rule) => Rule.max(4),
      of: [{ type: "string" }],
    }),
    defineField({
      name: "fallbackMessage",
      title: "תשובה כשלא נמצא מידע",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
  ],
  preview: { prepare: () => ({ title: "הגדרות עוזר הניווט" }) },
});
