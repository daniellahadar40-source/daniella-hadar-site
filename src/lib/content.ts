// תוכן טיוטה מקומי (fallback) - משמש רק כשהאתר עדיין לא מחובר לפרויקט Sanity
// אמיתי (ראו src/sanity/env.ts, isSanityConfigured), כדי שהעמודים לא יישברו
// בסביבת פיתוח. לאחר חיבור Sanity, התוכן האמיתי מגיע מה-CMS ולא מכאן.
// כל שדה המסומן "DRAFT" מקורו באב-הטיפוס הקיים או במסמכי האיפיון,
// וטעון אימות סופי מול דניאלה לפני פרסום לאוויר (ראו סעיף 13 בתוכנית).

import type { Article, Course, SiteSettings, Testimonial } from "./types";

export const fallbackSiteSettings: SiteSettings = {
  siteName: "דניאלה הדר",
  tagline: "מיצוי זכויות רפואיות", // DRAFT — מאושר בדף הנחיתה הקיים
  phone: "050-8337573", // מאומת מול שאלון האיפיון
  email: "daniellahadar40@gmail.com", // מאומת מול שאלון האיפיון
};

// DRAFT — נמצא באב-הטיפוס הקיים (daniella-hadar-landing).
// שם הקורס סותר את המסמך "מסמך איפיון.docx" ("איך תדעו אם אתם זכאים").
// לא יפורסם עד אישור דניאלה (ראו סעיף 13 בתוכנית העבודה, סעיף 1).
export const fallbackCourses: Course[] = [
  {
    slug: "ksavah-bli-byurokratya",
    title: "קצבה בלי בירוקרטיות", // DRAFT — לאימות שם סופי
    shortDescription:
      "קורס קצר שמסביר איך לבדוק אם מגיעה קצבת נכות מביטוח לאומי ואיך להגיש תביעה מסודרת.",
    price: 147,
    currency: "ILS",
    status: "draft",
    lessons: [
      { title: "להבין איך המערכת עובדת", description: "הבנה פשוטה של הבירוקרטיה, בלי מונחים מסובכים." },
      { title: "קצבת נכות: למי זה מגיע?", description: "בדיקת זכאות ותנאי קבלה." },
      { title: "המסמכים והגשת התביעה", description: "איך לאסוף תיק רפואי ולהגיש תביעה מסודרת." },
      { title: "הוועדה הרפואית", description: "הכנה לוועדה ומניעת טעויות נפוצות." },
    ],
  },
];

// אין עדיין מאמרים מאומתים — בכוונה לא מוצג תוכן מומצא (ראו סעיף 10 בתוכנית).
export const fallbackArticles: Article[] = [];

// נמצאו ציטוטים באב-הטיפוס הקיים, אך הם לא יוצגו עד אימות ואישור מפורש
// מדניאלה לפרסום בשם מלא/ראשי תיבות (ראו סעיף 10 בתוכנית, סיכון 3).
export const fallbackTestimonials: Testimonial[] = [];
