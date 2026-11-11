"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/courses", label: "קורסים" },
  { href: "/knowledge", label: "מרכז ידע" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "יצירת קשר" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
      <nav
        aria-label="ניווט ראשי"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-4 py-4 sm:px-6"
      >
        <div className="flex items-center gap-2">
          <Button href="/contact" className="hidden shrink-0 px-5 py-2 text-sm sm:inline-flex">
            לשיחת היכרות
          </Button>
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-ink/20 p-2 text-ink transition hover:bg-ink/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "סגירת תפריט ניווט" : "פתיחת תפריט ניווט"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
          </button>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`pb-2 text-[15px] font-medium transition ${
                  active
                    ? "border-b-2 border-smoked-blue text-ink"
                    : "border-b-2 border-transparent text-ink hover:text-smoked-blue"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link href="/" className="flex shrink-0 flex-col leading-tight text-start" onClick={() => setOpen(false)}>
          <span className="font-serif text-[22px] text-ink">דניאלה הדר</span>
          <span className="text-xs text-smoked-blue">מיצוי זכויות רפואיות וליווי משפחות</span>
        </Link>
      </nav>

      <nav
        id="mobile-nav"
        aria-label="ניווט ראשי - מובייל"
        className={`${open ? "flex" : "hidden"} flex-col gap-1 border-t border-ink/10 bg-cream px-4 py-4 text-base text-ink lg:hidden`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-3 py-2.5 transition hover:bg-sage/15 hover:text-smoked-blue"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Button href="/contact" className="mt-2 inline-block text-center sm:hidden" onClick={() => setOpen(false)}>
          לשיחת היכרות
        </Button>
      </nav>
    </header>
  );
}
