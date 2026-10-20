import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCollectionSlugs, getCollection } from "@/lib/collections";

export function generateStaticParams() {
  return getAllCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description || `${collection.title}: photographs`,
    openGraph: { images: [collection.coverImage] },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return (
    <article className="mt-12 pb-32">
      <header className="mb-12 max-w-[640px]">
        <Link href="/gallery" className="text-sm text-muted">
          ← Photos
        </Link>
        <h1 className="mt-6 text-[40px] leading-[1.1] font-medium tracking-[-0.03em]">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="mt-3 text-[17px] leading-relaxed text-muted">{collection.description}</p>
        )}
      </header>

      <div className="flex flex-col gap-20">
        {collection.photos.map((photo, i) => (
          <figure key={photo.src}>
            <Image
              src={photo.src}
              alt={photo.caption ?? ""}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 960px) 100vw, 880px"
              {...(i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
              className="mx-auto h-auto max-h-[85vh] w-auto max-w-full"
            />
            {photo.caption && (
              <figcaption className="pt-3 text-center text-[13px] text-muted">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </article>
  );
}
