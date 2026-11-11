import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// תמונה מקומית מאושרת (לא מ-Sanity) המשמשת כברירת-מחדל המעוצבת של CmsImage
// עבור Hero/קורסים, עד שתוזן תמונת CMS מתאימה דרך Sanity Studio.
export default function LocalPhoto({ src, alt, className, priority, sizes }: Props) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
