import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של אתר דניאלה הדר.",
  path: "/accessibility-statement",
  index: false,
});

export default function AccessibilityStatementPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-serif font-normal text-ink">הצהרת נגישות</h1>
      <div className="prose prose-neutral mt-6 max-w-none text-ink/90">
        <p>
          אתר זה תוכנן ונבנה תוך שאיפה לעמוד בדרישות הנגישות המקובלות. בין
          ההתאמות הקיימות: ניווט במקלדת, קישור דילוג לתוכן הראשי, מבנה כותרות
          סמנטי, שמות נגישים לרכיבי ניווט וטקסט חלופי לתמונות תוכן. תפריט
          התאמות התצוגה מאפשר להגדיל טקסט, להגביר ניגודיות, להדגיש קישורים
          ולהפחית תנועה, וכן לאפס את כל ההתאמות.
        </p>
        <p>
          האתר עבר בדיקות נגישות אוטומטיות ובדיקת מקלדת בסיסית. טרם בוצעה
          בדיקת נגישות מקצועית חיצונית, ולכן הצהרה זו תעודכן לאחר השלמת בדיקה
          כזו ולפני ההשקה.
        </p>
        <p>
          נתקלת בבעיית נגישות באתר? ניתן לפנות אלינו דרך עמוד{" "}
          <a
            href="/contact"
            className="font-semibold text-smoked-blue underline decoration-smoked-blue/70 underline-offset-4 hover:decoration-smoked-blue"
          >
            יצירת הקשר
          </a>
          .
        </p>
      </div>
    </div>
  );
}
