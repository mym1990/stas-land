import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/constants";
import { LogoMark } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-8">
      <div className="flex flex-col gap-1">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 self-start text-[17px] tracking-[-0.01em] text-text hover:text-text"
        >
          <LogoMark />
          <span className="font-semibold">
            stas<span className="font-normal text-muted">.land</span>
          </span>
        </Link>
        <p className="max-w-[360px] text-[15px] leading-snug text-muted">
          {SITE_TAGLINE}
        </p>
      </div>
      <NavLinks />
    </header>
  );
}
