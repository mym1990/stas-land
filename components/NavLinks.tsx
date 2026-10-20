"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex gap-7 text-[15px]">
        {NAV_LINKS.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={active ? "text-text" : "text-muted"}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
