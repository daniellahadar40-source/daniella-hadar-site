import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "המלצות",
  description: "המלצות של תלמידות ותלמידים על הקורסים והליווי של דניאלה הדר.",
};

// נמצאו ציטוטים באב-הטיפוס הקיים, אך הם לא יוצגו עד אימות ואישור מפורש
// מדניאלה לפרסום בשם מלא/ראשי תיבות (ראו סעיף 10 בתוכנית, סיכון 3).
const testimonials: { quote: string; author: string }[] = [];

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">מה אומרים</h1>

      {testimonials.length === 0 ? (
        <p className="mt-10 text-ink/70">
          המלצות מאומתות יפורסמו כאן בקרוב, לאחר אישור מפורש מכל ממליצה וממליץ.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">{/* כרטיסי המלצות */}</div>
      )}
    </div>
  );
}
