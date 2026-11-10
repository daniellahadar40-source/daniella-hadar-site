import type { StructureResolver } from "sanity/structure";

// מציג "הגדרות אתר" כפריט יחיד (singleton) בראש התפריט, ולא כרשימה שמאפשרת
// ליצור מסמכים כפולים בטעות.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("תוכן האתר")
    .items([
      S.listItem()
        .title("הגדרות אתר")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
    ]);
