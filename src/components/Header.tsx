import Link from "next/link";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/courses", label: "קורסים דיגיטליים" },
  { href: "/knowledge", label: "מרכז הידע" },
  { href: "/about", label: "אודות" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "יצירת קשר" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sage/40 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-h3 font-bold text-smoked-blue">דניאלה הדר</span>
          <span className="text-caption text-ink/60">מיצוי זכויות וליווי משפחות</span>
        </Link>
        <nav aria-label="ניווט ראשי" className="hidden gap-6 text-sm font-medium text-ink lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-smoked-blue">
              {link.label}
            </Link>
          ))}
        </nav>
        <Button href="/courses" className="hidden shrink-0 px-4 py-2 text-sm sm:inline-block">
          לצפייה בקורסים
        </Button>
      </div>
      <nav aria-label="ניווט ראשי - מובייל" className="flex flex-wrap gap-x-5 gap-y-2 px-4 pb-4 text-sm text-ink lg:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-smoked-blue">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
