import type { Metadata } from "next";

export const SITE_NAME = "דניאלה הדר";
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.daniella-hadar.co.il"
);
export const DEFAULT_DESCRIPTION =
  "ליווי מקצועי של עובדת סוציאלית למיצוי זכויות רפואיות ונפשיות מול ביטוח לאומי, וקורסים דיגיטליים מעשיים.";

const DEFAULT_OG_IMAGE = {
  url: "/images/hero-documents.png",
  alt: "דניאלה הדר — מיצוי זכויות רפואיות וליווי משפחות",
};

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  index?: boolean;
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  index = true,
}: PageMetadataOptions = {}): Metadata {
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | מיצוי זכויות רפואיות`;

  return {
    title: title ?? resolvedTitle,
    description,
    alternates: { canonical: path },
    robots: index
      ? undefined
      : {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        },
    openGraph: {
      type: "website",
      locale: "he_IL",
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      url: path,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

