import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של אתר דניאלה הדר.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-serif font-normal text-ink">מדיניות פרטיות</h1>
      <div className="prose prose-neutral mt-6 max-w-none text-ink/90">
        <p>
          אתר זה אוסף פרטים (כגון שם וכתובת מייל) רק כאשר הם נמסרים מרצון
          דרך טופס יצירת הקשר או טופס ההרשמה לעדכונים. האתר אינו אוסף ואינו
          שומר פרטי תשלום או כרטיס אשראי בשום שלב.
        </p>
        <p>
          פרטים שנמסרים בטופס ההרשמה לעדכונים מועברים למערכת הדיוור של רב-מסר
          לצורך ניהול רשימת התפוצה, בהתאם למדיניות הפרטיות של רב-מסר.
        </p>
        <p className="text-sm text-ink/60">
          נוסח סופי ומחייב של מדיניות הפרטיות ייקבע בהתייעצות עם דניאלה
          ובהתאם לדרישות החוק העדכניות, בטרם השקה (Milestone 4 בתוכנית העבודה).
        </p>
      </div>
    </div>
  );
}
