// תוכן התחלתי זמני בקוד — יוחלף בחיבור ל-CMS ב-Milestone 2.
// כל שדה המסומן "DRAFT" מקורו באב-הטיפוס הקיים או במסמכי האיפיון,
// וטעון אימות סופי מול דניאלה לפני פרסום לאוויר (ראו סעיף 13 בתוכנית).

export const siteSettings = {
  businessName: "דניאלה הדר",
  tagline: "מיצוי זכויות רפואיות", // DRAFT — מאושר בדף הנחיתה הקיים
  phone: "050-8337573", // מאומת מול שאלון האיפיון
  email: "daniellahadar40@gmail.com", // מאומת מול שאלון האיפיון
};

export type Course = {
  slug: string;
  title: string;
  shortDescription: string;
  price: number;
  status: "draft" | "published" | "coming-soon";
  lessons: { title: string; description: string }[];
};

// DRAFT — נמצא באב-הטיפוס הקיים (daniella-hadar-landing).
// שם הקורס סותר את המסמך "מסמך איפיון.docx" ("איך תדעו אם אתם זכאים").
// לא יפורסם עד אישור דניאלה (ראו סעיף 13 בתוכנית, סעיף 1).
export const courses: Course[] = [
  {
    slug: "ksavah-bli-byurokratya",
    title: "קצבה בלי בירוקרטיות", // DRAFT — לאימות שם סופי
    shortDescription:
      "קורס קצר שמסביר איך לבדוק אם מגיעה קצבת נכות מביטוח לאומי ואיך להגיש תביעה מסודרת.",
    price: 147,
    status: "draft",
    lessons: [
      { title: "להבין איך המערכת עובדת", description: "הבנה פשוטה של הבירוקרטיה, בלי מונחים מסובכים." },
      { title: "קצבת נכות: למי זה מגיע?", description: "בדיקת זכאות ותנאי קבלה." },
      { title: "המסמכים והגשת התביעה", description: "איך לאסוף תיק רפואי ולהגיש תביעה מסודרת." },
      { title: "הוועדה הרפואית", description: "הכנה לוועדה ומניעת טעויות נפוצות." },
    ],
  },
];
