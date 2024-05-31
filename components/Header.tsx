"use client";

import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

export const links = ["timer", "tasks", "statistics"];

export default function Header() {
  const pathname = usePathname();
  const navLinksList = links.map((link, i) => {
    const NavLinkURL = `/${i === 0 ? "" : link}`;
    const isActive = pathname === NavLinkURL;
    return (
      <NavLink key={link} href={NavLinkURL} active={isActive}>
        {link}
      </NavLink>
    );
  });
  return <header className="space-x-2">{navLinksList}</header>;
}
