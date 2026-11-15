import type { StructureResolver } from "sanity/structure";

// מציג "הגדרות אתר" כפריט יחיד (singleton) בראש התפריט, ולא כרשימה שמאפשרת
// ליצור מסמכים כפולים בטעות.
export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("תוכן האתר")
    .items([
      S.listItem()
        .title("הגדרות אתר")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("עוזר הניווט")
        .id("assistantSettings")
        .child(S.document().schemaType("assistantSettings").documentId("assistantSettings")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "siteSettings" && item.getId() !== "assistantSettings",
      ),
    ]);
