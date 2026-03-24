"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function WanderButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();

  const wander = useCallback(() => {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/blog/${slug}`);
  }, [slugs, router]);

  return (
    <button
      onClick={wander}
      className="group inline-flex items-center gap-3 text-sm text-text-muted hover:text-accent transition-colors"
    >
      <span className="inline-block w-6 h-px bg-current transition-all group-hover:w-10" />
      <span>wander</span>
    </button>
  );
}
