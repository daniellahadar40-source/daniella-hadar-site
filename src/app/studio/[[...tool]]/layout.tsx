// שכבת ניהול התוכן (Sanity Studio) אינה תומכת בפריסת RTL מלאה, לכן ממשק
// הניהול עצמו מוצג משמאל-לימין בכוונה; שדות הטקסט עדיין תומכים הקלדה
// ותצוגה בעברית כרגיל, זה מגבלת הכלי ולא של האתר (ראו סעיף 3 בדרישות M2).
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div dir="ltr">{children}</div>;
}
