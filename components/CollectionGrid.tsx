import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/collections";

export function CollectionGrid({ collections }: { collections: Collection[] }) {
  if (collections.length === 0) {
    return <p className="text-muted">No photos yet.</p>;
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
      {collections.map((c) => (
        <li key={c.slug}>
          <Link href={`/gallery/${c.slug}`} className="group flex flex-col gap-3">
            <span className="relative block aspect-[4/5] overflow-hidden bg-rule">
              <Image
                src={c.coverImage}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
            </span>
            <span className="text-[15px]">{c.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
