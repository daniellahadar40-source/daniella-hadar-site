import Link from "next/link";
import type { NewsletterMode } from "@/lib/newsletter";

export default function NewsletterSignup({ mode }: { mode: NewsletterMode }) {
  if (mode === "off") return null;

  return (
    <section className="mt-12 border-t border-ink/10 pt-10" aria-labelledby="newsletter-title">
      <div className="mx-auto max-w-xl">
        <h2 id="newsletter-title" className="text-h3 font-serif font-normal text-ink">
          הרשמה לעדכונים
        </h2>
        <p className="mt-2 text-ink/80">
          ההרשמה עדיין אינה פעילה. התצוגה מיועדת לבדיקה מקומית בלבד ואינה שומרת או שולחת מידע.
        </p>
        <fieldset disabled className="mt-5 space-y-4 opacity-65" aria-describedby="newsletter-preview-note">
          <div>
            <label htmlFor="newsletter-email" className="block text-sm font-semibold text-ink">
              כתובת אימייל
            </label>
            <input
              id="newsletter-email"
              name="newsletter-email"
              type="email"
              autoComplete="email"
              dir="ltr"
              className="mt-1.5 min-h-11 w-full rounded-card border border-ink/25 bg-white px-4 py-2.5 text-base text-ink"
            />
          </div>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
            <input type="checkbox" className="mt-1 h-4 w-4 shrink-0" />
            <span>
              אני מאשר/ת לקבל עדכונים בהתאם ל
              <Link
                href="/privacy-policy"
                className="font-semibold text-smoked-blue underline underline-offset-4"
              >
                מדיניות הפרטיות
              </Link>
              .
            </span>
          </label>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-smoked-blue px-7 py-3 font-semibold text-cream"
          >
            הרשמה לעדכונים
          </button>
        </fieldset>
        <p id="newsletter-preview-note" className="mt-3 text-sm text-ink/70">
          לא ניתן לשלוח את הטופס במצב תצוגה מקדימה.
        </p>
      </div>
    </section>
  );
}
