import type { Metadata } from "next";
import { getAllCollections } from "@/lib/collections";
import { CollectionCard } from "@/components/CollectionCard";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A collection of photographs — landscapes, nature, and quiet moments.",
};

export default function GalleryPage() {
  const collections = getAllCollections();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl">Gallery</h1>
        <p className="mt-4 text-lg text-text-muted max-w-xl">
          Landscapes, forests, and the quiet corners of the natural world.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>

      {collections.length === 0 && (
        <p className="text-text-muted text-center py-20">
          No collections yet. Check back soon.
        </p>
      )}
    </div>
  );
}
