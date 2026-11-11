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
  const classes = [variantClasses[variant], className].filter(Boolean).join(" ");

  if (props.href) {
    const { href, variant: _variant, className: _className, children: _children, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, className: _className, children: _children, href: _href, ...rest } =
    props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
