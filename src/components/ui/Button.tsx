import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const variantClasses: Record<Variant, string> = {
  primary: "rounded-full bg-smoked-blue px-7 py-3 font-semibold text-cream transition hover:opacity-90",
  secondary:
    "rounded-full border border-ink/30 bg-transparent px-7 py-3 font-semibold text-ink transition hover:bg-ink/5",
  ghost: "font-semibold text-smoked-blue transition hover:underline",
  inverse: "rounded-full bg-cream px-7 py-3 font-semibold text-ink transition hover:opacity-90",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    href: string;
  };

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: never;
  };

export default function Button(props: AsLink | AsButton) {
  const { variant = "primary", className, children } = props;
  const classes = [
    "inline-flex min-h-11 items-center justify-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smoked-blue disabled:cursor-not-allowed disabled:opacity-55",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.href) {
    const href = props.href;
    const linkProps = { ...props } as Partial<AsLink>;
    delete linkProps.href;
    delete linkProps.variant;
    delete linkProps.className;
    delete linkProps.children;

    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className={classes} {...linkProps}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = { ...props } as Partial<AsButton>;
  delete buttonProps.variant;
  delete buttonProps.className;
  delete buttonProps.children;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
