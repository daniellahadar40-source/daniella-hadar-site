import Link from "next/link";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-smoked-blue">
          דניאלה הדר
        </Link>
        <nav aria-label="ניווט ראשי" className="hidden gap-6 text-sm font-medium text-ink md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-smoked-blue">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/courses"
          className="rounded-card bg-smoked-blue px-4 py-2 text-sm font-semibold text-cream transition hover:opacity-90"
        >
          לצפייה בקורסים
        </Link>
      </div>
      <nav aria-label="ניווט ראשי - מובייל" className="flex flex-wrap gap-4 px-4 pb-3 text-sm text-ink md:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-smoked-blue">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
