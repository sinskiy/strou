"use client";

import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

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
  return <header className="flex gap-2">{navLinksList}</header>;
}
