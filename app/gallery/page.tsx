import type { Metadata } from "next";
import { getAllCollections } from "@/lib/collections";
import { CollectionGrid } from "@/components/CollectionGrid";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Photos",
  description: "Collections of landscape photographs.",
};

export default function PhotosPage() {
  return (
    <section className="mt-12 pb-32">
      <SectionHeading as="h1" title="Photos" />
      <div className="pt-2">
        <CollectionGrid collections={getAllCollections()} />
      </div>
    </section>
  );
}
