import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
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
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-heebo">
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
