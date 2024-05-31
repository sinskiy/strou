"use client";

import { usePathname } from "next/navigation";
import NavLink from "./ui/navLink";

export const links = ["timer", "tasks", "statistics"];

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
    <header className="flex justify-between w-full">{navLinksList}</header>
  );
}
