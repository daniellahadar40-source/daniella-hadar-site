import type { Metadata } from "next";
import { getTestimonials } from "@/lib/data";
import CmsImage from "@/components/CmsImage";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "המלצות",
  description: "המלצות של תלמידות ותלמידים על הקורסים והליווי של דניאלה הדר.",
};

export default async function TestimonialsPage() {
  // getTestimonials מחזיר רק המלצות שאושרו לפרסום במפורש וסטטוסן "פורסם"
  // (ברירת המחדל בכל המלצה היא אי-פרסום, ראו שאילתת testimonialsQuery).
  const testimonials = await getTestimonials();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-display font-bold text-ink">מה אומרים</h1>

      {testimonials.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="ההמלצות בדרך"
            description="המלצות מאומתות יפורסמו כאן בקרוב, לאחר אישור מפורש מכל ממליצה וממליץ."
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={`${testimonial.displayName}-${index}`}>
              <CmsImage
                image={testimonial.image}
                alt={testimonial.displayName}
                className="mb-4 h-16 w-16 rounded-full"
                placeholderCompact
              />
              <p className="text-ink/90">&rdquo;{testimonial.quote}&ldquo;</p>
              <p className="mt-4 font-semibold text-smoked-blue">{testimonial.displayName}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
