import type { Metadata } from "next";
import { Assistant, Suez_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import JsonLd from "@/components/JsonLd";
import SiteTools from "@/components/SiteTools";
import { getAssistantSettings, getSiteSettings } from "@/lib/data";
import { createPageMetadata, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/metadata";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

const suezOne = Suez_One({
  subsets: ["hebrew", "latin"],
  weight: ["400"],
  variable: "--font-suez",
  display: "swap",
});

const homeMetadata = createPageMetadata({ description: DEFAULT_DESCRIPTION });

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: SITE_URL,
  title: {
    default: `${SITE_NAME} | מיצוי זכויות רפואיות`,
    template: `%s | ${SITE_NAME}`,
  },
  ...(process.env.VERCEL_ENV === "preview"
    ? {
        robots: {
          index: false,
          follow: false,
          nocache: true,
        },
      }
    : {}),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [siteSettings, assistantSettings] = await Promise.all([getSiteSettings(), getAssistantSettings()]);
  const personId = `${SITE_URL.toString()}#person`;
  const websiteId = `${SITE_URL.toString()}#website`;
  const sameAs = (siteSettings.socialLinks ?? []).map((link) => link.url).filter(Boolean);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteSettings.siteName || SITE_NAME,
        url: SITE_URL.toString(),
        jobTitle: "עובדת סוציאלית בתחום מיצוי זכויות רפואיות",
        ...(siteSettings.phone ? { telephone: siteSettings.phone } : {}),
        ...(siteSettings.email ? { email: siteSettings.email } : {}),
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL.toString(),
        name: siteSettings.siteName || SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "he-IL",
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} ${suezOne.variable}`}>
      <body className="font-assistant">
        <JsonLd data={structuredData} />
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SiteTools assistantSettings={assistantSettings} />
      </body>
    </html>
  );
}
