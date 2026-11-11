import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של אתר דניאלה הדר.",
};

export default function AccessibilityStatementPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-serif font-normal text-ink">הצהרת נגישות</h1>
      <div className="prose prose-neutral mt-6 max-w-none text-ink/90">
        <p>
          אתר זה תוכנן ונבנה תוך שאיפה לעמוד בדרישות הנגישות המקובלות, לרבות
          ניווט מלא במקלדת, תמיכה בקוראי מסך, ותיוג סמנטי נכון של התוכן.
        </p>
        <p>
          טרם בוצעה בדיקת נגישות מקצועית חיצונית לאתר. טקסט הצהרה סופי,
          כנדרש בתקנות הנגישות לשירות, יושלם לאחר ביצוע בדיקה כזו — ראו
          תוכנית העבודה, Milestone 3.
        </p>
        <p>
          נתקלת בבעיית נגישות באתר? ניתן לפנות אלינו דרך עמוד{" "}
          <a href="/contact" className="text-smoked-blue hover:underline">
            יצירת הקשר
          </a>
          .
        </p>
      </div>
    </div>
  );
}
