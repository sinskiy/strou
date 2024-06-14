"use client";

import { usePathname } from "next/navigation";
import NavLink from "./ui/navLink";

export const links = ["timer", "tasks"] as const;

export default function Header() {
  const pathname = usePathname();
  const navLinksList = links.map((link, i) => {
    const NavLinkURL = `/${i === 0 ? "" : link}`;
    return (
      <NavLink key={link} href={NavLinkURL} active={pathname === NavLinkURL}>
        {link}
      </NavLink>
    );
  });
  return (
    <header className="flex justify-center gap-8 w-full">{navLinksList}</header>
  );
}
