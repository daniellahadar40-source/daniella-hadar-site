import Link from "next/link";
import { Assistant, Suez_One } from "next/font/google";
import "./(site)/globals.css";

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

export const metadata = {
  title: "הדף לא נמצא",
  robots: { index: false, follow: true },
};

export default function RootNotFound() {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} ${suezOne.variable}`}>
      <body className="font-assistant">
        <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
          <h1 className="text-2xl font-serif font-normal text-ink">הדף לא נמצא</h1>
          <p className="mt-3 text-ink/80">ייתכן שהקישור שגוי או שהדף הוסר.</p>
          <Link href="/" className="mt-6 inline-block font-semibold text-smoked-blue hover:underline">
            חזרה לדף הבית
          </Link>
        </div>
      </body>
    </html>
  );
}
