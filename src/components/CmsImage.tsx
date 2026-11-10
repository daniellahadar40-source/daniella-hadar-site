import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/sanity/lib/image";

type Props = {
  image?: SanityImageSource;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

// אם אין תמונה מה-CMS, מוצגת תיבת Placeholder בפלטת האתר (כמו ב-M1) במקום
// תמונה שבורה — עמודים ואזורים ללא תוכן מאושר נעלמים באלגנטיות (ראו דרישות M2, סעיף 5).
export default function CmsImage({ image, alt, className, sizes, priority }: Props) {
  if (!image) {
    return <div className={className} aria-hidden="true" />;
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
