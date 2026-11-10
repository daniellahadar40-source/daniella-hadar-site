import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "הגדרות אתר",
  type: "document",
  groups: [
    { name: "general", title: "כללי", default: true },
    { name: "contact", title: "פרטי קשר וקישורים" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "שם האתר",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "תיאור מקצועי (Tagline)",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "heroImage",
      title: "תמונת Hero",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutImage",
      title: "תמונת אודות",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutText",
      title: "טקסט אודות",
      type: "array",
      of: [{ type: "block" }],
      group: "general",
    }),
    defineField({
      name: "phone",
      title: "טלפון",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "מייל",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "socialLinks",
      title: "קישורים חברתיים",
      type: "array",
      group: "contact",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "פלטפורמה",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "אחר", value: "other" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "קישור",
              type: "url",
              validation: (Rule) => Rule.uri({ scheme: ["https", "http"] }),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
    defineField({ name: "seoTitle", title: "כותרת SEO כללית", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "תיאור SEO כללי", type: "text", rows: 2, group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "הגדרות אתר" };
    },
  },
});
