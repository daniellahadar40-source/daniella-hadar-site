"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(
      "הטופס עדיין אינו מחובר לרשימת התפוצה. החיבור לרב-מסר ייקבע ב-Milestone 3 בתוכנית העבודה."
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-describedby="form-status">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-ink">
          שם מלא
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-card border border-sage/50 bg-white px-4 py-2.5 text-ink focus:border-smoked-blue focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ink">
          אימייל
        </label>
        <input
          id="email"
          name="email"
          type="email"
          dir="ltr"
          required
          className="mt-1 w-full rounded-card border border-sage/50 bg-white px-4 py-2.5 text-ink focus:border-smoked-blue focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink">
          הודעה
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-card border border-sage/50 bg-white px-4 py-2.5 text-ink focus:border-smoked-blue focus:outline-none"
        />
      </div>
      {/* שדה honeypot נגד ספאם — מוסתר ממשתמשים אנושיים */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        className="rounded-card bg-smoked-blue px-6 py-3 font-semibold text-cream transition hover:opacity-90"
      >
        שליחה
      </button>
      <p id="form-status" role="status" aria-live="polite" className="text-sm text-ink/70">
        {status}
      </p>
    </form>
  );
}
