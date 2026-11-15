import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import CmsImage from "@/components/CmsImage";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <CmsImage
          image={value}
          alt={value.alt || ""}
          className="not-prose my-6 aspect-[16/9] rounded-card"
          sizes="(min-width: 768px) 700px, 100vw"
        />
      );
    },
  },
};

export default function ArticlePortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
