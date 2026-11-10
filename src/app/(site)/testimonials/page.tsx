import type { Metadata } from "next";
import { getTestimonials } from "@/lib/data";
import CmsImage from "@/components/CmsImage";

export const metadata: Metadata = {
  title: "המלצות",
  description: "המלצות של תלמידות ותלמידים על הקורסים והליווי של דניאלה הדר.",
};

export default async function TestimonialsPage() {
  // getTestimonials מחזיר רק המלצות שאושרו לפרסום במפורש וסטטוסן "פורסם"
  // (ברירת המחדל בכל המלצה היא אי-פרסום, ראו שאילתת testimonialsQuery).
  const testimonials = await getTestimonials();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-ink">מה אומרים</h1>

      {testimonials.length === 0 ? (
        <p className="mt-10 text-ink/70">
          המלצות מאומתות יפורסמו כאן בקרוב, לאחר אישור מפורש מכל ממליצה וממליץ.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.displayName}-${index}`}
              className="rounded-card border border-sage/40 bg-white/60 p-6"
            >
              <CmsImage
                image={testimonial.image}
                alt={testimonial.displayName}
                className="mb-4 h-16 w-16 rounded-full bg-sage/30"
              />
              <p className="text-ink/90">&rdquo;{testimonial.quote}&ldquo;</p>
              <p className="mt-4 font-semibold text-smoked-blue">{testimonial.displayName}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
