import type { Metadata } from "next";
import { getTestimonials } from "@/lib/data";
import { createPageMetadata } from "@/lib/metadata";
import CmsImage from "@/components/CmsImage";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const testimonials = await getTestimonials();

  return createPageMetadata({
    title: "המלצות",
    description: "המלצות של תלמידות ותלמידים על הקורסים והליווי של דניאלה הדר.",
    path: "/testimonials",
    index: testimonials.length > 0,
  });
}

export default async function TestimonialsPage() {
  // getTestimonials מחזיר רק המלצות שאושרו לפרסום במפורש וסטטוסן "פורסם"
  // (ברירת המחדל בכל המלצה היא אי-פרסום, ראו שאילתת testimonialsQuery).
  const testimonials = await getTestimonials();

  return (
    <div>
      <PageHeader eyebrow="מה אומרים" title="מה אומרים" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {testimonials.length === 0 ? (
        <div className="mt-2">
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
    </div>
  );
}
