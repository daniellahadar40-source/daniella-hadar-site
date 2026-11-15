// תוכן טיוטה מקומי (fallback) - משמש רק כשהאתר עדיין לא מחובר לפרויקט Sanity
// אמיתי (ראו src/sanity/env.ts, isSanityConfigured), כדי שהעמודים לא יישברו
// בסביבת פיתוח. לאחר חיבור Sanity, התוכן האמיתי מגיע מה-CMS ולא מכאן.
// כל שדה המסומן "DRAFT" מקורו באב-הטיפוס הקיים או במסמכי האיפיון,
// וטעון אימות סופי מול דניאלה לפני פרסום לאוויר (ראו סעיף 13 בתוכנית).

import type { Article, AssistantSettings, Course, Faq, Service, SiteSettings, Testimonial } from "./types";

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

// תוכן קיים מהאתר הנוכחי. לאחר הזנת שירותים מאושרים ב-Sanity הם יחליפו את הרשימה הזו.
export const fallbackServices: Service[] = [
  {
    label: "נקודת ההתחלה המומלצת",
    title: "קורס דיגיטלי עצמאי",
    shortDescription:
      "לומדים בקצב אישי, מתי שנוח, בליווי חומר כתוב וברור — נקודת ההתחלה המומלצת לרוב המשפחות.",
    serviceType: "digital",
  },
  {
    label: "מסלול 2",
    title: "ייעוץ אישי בזום",
    shortDescription: "פגישת ייעוץ אחד-על-אחד מכל מקום בארץ, להתמקדות במצב הספציפי שלכם.",
    serviceType: "zoom",
  },
  {
    label: "מסלול 3",
    title: "פגישה פרונטלית",
    shortDescription: "פגישה פנים אל פנים בתיאום מראש, בהתאם לזמינות ולאזור השירות.",
    serviceType: "in-person",
  },
];

export const fallbackFaqs: Faq[] = [];

export const fallbackAssistantSettings: AssistantSettings = {
  enabled: true,
  welcomeMessage: "כתבו מה אתם מחפשים ואעזור להגיע לעמוד המתאים באתר.",
  disclaimer:
    "זהו עוזר ניווט בהדגמה. הוא אינו נותן ייעוץ רפואי או משפטי ואינו קובע זכאות. אין להזין מידע רפואי או מזהה.",
  suggestedQuestions: ["איזה שירות יכול להתאים?", "איפה נמצאים המאמרים?", "איך יוצרים קשר?"],
  fallbackMessage: "לא מצאתי תשובה מדויקת באתר. אפשר לעבור לעמוד יצירת הקשר ולשאול את דניאלה.",
};
