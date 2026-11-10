import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "קטגוריית תוכן",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "שם הקטגוריה",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "תיאור",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "סדר תצוגה",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
