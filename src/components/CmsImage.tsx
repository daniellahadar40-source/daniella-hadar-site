import Image from "next/image";
import type { ReactNode } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

type Props = {
  image?: string | SanityImageSource;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholderLabel?: string;
  placeholderCompact?: boolean;
  // רכיב חלופי מעוצב במקום ה-placeholder הגנרי (למשל קומפוזיציית SVG
  // אבסטרקטית ב-Hero). כשתועלה תמונה אמיתית ב-Sanity היא תוצג אוטומטית
  // במקום ה-fallback, בלי שינוי מבנה הדף (ראו דרישות התוכן, סעיף תמונת דניאלה).
  fallback?: ReactNode;
};

// אם אין תמונה מה-CMS, מוצג טיפול placeholder מעוצב ומוצהר-כזמני (לא מלבן
// אפור גולמי) במקום תמונה שבורה (ראו דרישות M2, סעיף 5, ותוכנית העיצוב §8).
export default function CmsImage({
  image,
  alt,
  className,
  sizes,
  priority,
  placeholderLabel,
  placeholderCompact,
  fallback,
}: Props) {
  if (!image) {
    if (fallback) return <>{fallback}</>;
    return <PlaceholderImage className={className} label={placeholderLabel} compact={placeholderCompact} />;
  }

  // נתיב סטטי (למשל "/images/courses/x.jpg") מוצג ישירות; אובייקט תמונה
  // מ-Sanity עובר דרך urlForImage כרגיל.
  const url = typeof image === "string" ? image : urlForImage(image).width(1200).fit("max").auto("format").url();

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={url}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
