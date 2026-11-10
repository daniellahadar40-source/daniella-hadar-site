export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// true כש-M2 עדיין לא חובר לפרויקט Sanity אמיתי - המערכת חוזרת לתוכן הטיוטה
// המקומי (src/lib/content.ts) במקום לקרוא ל-API, כדי שהאתר לא יישבר.
export const isSanityConfigured = Boolean(projectId);
