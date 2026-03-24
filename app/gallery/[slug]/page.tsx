import type { Metadata } from "next";
import Link from "next/link";
import { getAllCollectionSlugs, getCollection } from "@/lib/collections";
import { PhotoEssay } from "@/components/PhotoEssay";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllCollectionSlugs();
  return slugs.map((slug) => ({ slug }));
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
    description: collection.description || `${collection.title} — photo collection`,
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
    <article>
      {/* Collection header */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <Link
          href="/gallery"
          className="text-sm uppercase tracking-widest text-text-muted hover:text-accent transition-colors"
        >
          &larr; All collections
        </Link>
        <h1 className="font-serif text-4xl sm:text-6xl mt-6">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="mt-4 text-lg text-text-muted max-w-xl">
            {collection.description}
          </p>
        )}
        <p className="mt-3 text-sm text-text-muted">
          {collection.photoCount} photograph{collection.photoCount !== 1 ? "s" : ""}
        </p>
      </header>

      {/* Photo essay */}
      <PhotoEssay photos={collection.photos} />

      {/* Back to gallery */}
      <footer className="max-w-5xl mx-auto px-6 py-20 text-center">
        <Link
          href="/gallery"
          className="text-sm uppercase tracking-widest text-accent hover:text-accent-hover transition-colors"
        >
          &larr; Back to all collections
        </Link>
      </footer>
    </article>
  );
}
