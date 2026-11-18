export type NewsletterMode = "off" | "preview";

/**
 * הרשמה נשארת כבויה כברירת מחדל. מצב preview מיועד לבדיקת הממשק המקומי בלבד:
 * הוא אינו מפעיל שליחה ואינו שומר כתובות אימייל.
 * מצב live יתווסף רק יחד עם חיבור ספק מאושר, אימות שרת ומדיניות פרטיות מאושרת.
 */
export function getNewsletterMode(): NewsletterMode {
  return process.env.NEWSLETTER_MODE === "preview" ? "preview" : "off";
}
