import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export const client = createClient({
  // Sanity's client constructor requires a non-empty projectId even when it
  // will never actually be called (data.ts guards every fetch behind
  // isSanityConfigured and falls back to local draft content otherwise).
  projectId: isSanityConfigured ? projectId : "not-configured",
  dataset,
  apiVersion,
  // "published" בלבד כברירת מחדל - טיוטות לא נחשפות לאתר הציבורי (ראו סעיף 6 בתוכנית העבודה).
  perspective: "published",
  useCdn: true,
});
