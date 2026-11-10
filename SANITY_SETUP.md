# חיבור הפרויקט ל-Sanity (פעולה חד-פעמית, דורשת חשבון וחיבור דפדפן)

הקוד כולו מוכן ומחובר (Milestone 2). מה שנשאר הוא פעולה אחת חד-פעמית
שדורשת חשבון בבעלות דניאלה ואישור דפדפן - לכן היא לא בוצעה אוטומטית.

## שלבים

1. ליצור חשבון חינמי ב-https://www.sanity.io/ (Free tier, מתאים להיקף
   התוכן כאן - ראו סעיף 9 בתוכנית העבודה).
2. בתיקיית הפרויקט (`daniella-hadar-site`) להריץ:
   ```
   npx sanity@3.99.0 login
   npx sanity@3.99.0 init --project-plan free --dataset production --no-template
   ```
   הפקודה תיצור Project ID. **חשוב**: בשלב "Would you like to add configuration
   files for a Sanity project in this Next.js folder?" לבחור **לא** - הסכמות
   וה-Studio כבר קיימים בתיקיות `sanity/` ו-`sanity.config.ts`, ואין להחליף אותם.
3. להעתיק את `.env.local.example` לקובץ בשם `.env.local` (לא יעלה ל-Git) ולמלא
   בו את ה-Project ID שהתקבל:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. להריץ `npm run dev` ולהיכנס ל-http://localhost:3000/studio - שם נפתח ממשק
   הניהול. בכניסה ראשונה יתבקש אישור CORS Origin - לאשר `http://localhost:3000`.
5. להזמין את דניאלה כמשתמשת בפרויקט ה-Sanity (מתוך https://www.sanity.io/manage),
   כדי שתוכל להתחבר ל-/studio גם היא ולנהל תוכן בעצמה.
6. לאחר Deploy לאינטרנט (Milestone 4), להוסיף את אותם משתני סביבה גם בהגדרות
   הסביבה של ה-Hosting (Vercel/Cloudflare) ולאשר שם את כתובת ה-Production
   כ-CORS Origin נוסף בפרויקט Sanity.

## מה עדיין לא בוצע ולמה

- לא נפתח חשבון Sanity בפועל - נדרש אישור מפורש ולא התקבל (ראו הגבלות M2,
  סעיף 1), וגם לא ניתן לבצע זאת מתוך סביבת העבודה האוטומטית (דורש דפדפן
  והתחברות אישית).
- לכן לא בוצעו בדיקות CRUD בפועל ב-Studio (יצירה/עריכה של קורס ומאמר לדוגמה) -
  ראו הדוח המלא לפירוט.
