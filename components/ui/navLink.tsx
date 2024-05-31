import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active: boolean;
}

export default function NavLink({
  active,
  children,
  ...props
}: LinkProps & NavLinkProps) {
  return (
    <Link
      className={twMerge(
        "font-medium text-sm px-8 py-2 rounded-full transition-colorsAndTransform active:scale-95",
        active
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "hover:bg-white/10",
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
