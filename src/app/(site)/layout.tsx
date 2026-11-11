import type { Metadata } from "next";
import { Assistant, Suez_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

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

export const metadata: Metadata = {
  title: {
    default: "דניאלה הדר | מיצוי זכויות רפואיות",
    template: "%s | דניאלה הדר",
  },
  description:
    "ליווי מקצועי של עובדת סוציאלית למיצוי זכויות רפואיות ונפשיות מול ביטוח לאומי, וקורסים דיגיטליים מעשיים.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} ${suezOne.variable}`}>
      <body className="font-assistant">
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
