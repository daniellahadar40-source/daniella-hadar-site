"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";

const navLinks = [
  { href: "/courses", label: "קורסים דיגיטליים" },
  { href: "/knowledge", label: "מרכז הידע" },
  { href: "/about", label: "אודות" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "יצירת קשר" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sage/40 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="flex shrink-0 flex-col leading-tight" onClick={() => setOpen(false)}>
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

        <div className="flex items-center gap-2">
          <Button href="/courses" className="hidden shrink-0 px-4 py-2 text-sm sm:inline-block">
            לצפייה בקורסים
          </Button>
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-card border border-sage/50 p-2 text-ink transition hover:bg-sage/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "סגירת תפריט ניווט" : "פתיחת תפריט ניווט"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="ניווט ראשי - מובייל"
        className={`${open ? "flex" : "hidden"} flex-col gap-1 border-t border-sage/30 bg-cream px-4 py-4 text-base text-ink lg:hidden`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-card px-2 py-2.5 transition hover:bg-sage/15 hover:text-smoked-blue"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Button href="/courses" className="mt-2 inline-block text-center sm:hidden" onClick={() => setOpen(false)}>
          לצפייה בקורסים
        </Button>
      </nav>
    </header>
  );
}
