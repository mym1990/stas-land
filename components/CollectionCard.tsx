import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/collections";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link href={`/gallery/${collection.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-md">
        <Image
          src={collection.coverImage}
          alt={collection.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ filter: "contrast(0.97) saturate(0.95)" }}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-serif text-2xl text-white">{collection.title}</h3>
          <p className="mt-1 text-sm text-white/60">
            {collection.photoCount} photograph{collection.photoCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
