import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

type Props = {
  image?: SanityImageSource;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholderLabel?: string;
  placeholderCompact?: boolean;
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
}: Props) {
  if (!image) {
    return <PlaceholderImage className={className} label={placeholderLabel} compact={placeholderCompact} />;
  }

  const url = urlForImage(image).width(1200).fit("max").auto("format").url();

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
