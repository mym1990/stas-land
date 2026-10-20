import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { getAllCollections } from "@/lib/collections";
import { getPublicImageSize } from "@/lib/images";
import { HOME_PHOTO, SITE_NAME } from "@/lib/constants";
import { PostList } from "@/components/PostList";
import { CollectionGrid } from "@/components/CollectionGrid";
import { SectionHeading } from "@/components/SectionHeading";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);
  const collections = getAllCollections().slice(0, 3);
  const hero = getPublicImageSize(HOME_PHOTO.src) ?? { width: 1600, height: 1067 };

  return (
    <>
      <h1 className="sr-only">{SITE_NAME}</h1>

      <figure className="mt-12 mb-32">
        <Image
          src={HOME_PHOTO.src}
          alt={HOME_PHOTO.caption}
          width={hero.width}
          height={hero.height}
          sizes="(max-width: 960px) 100vw, 880px"
          loading="eager"
          fetchPriority="high"
          className="aspect-[3/2] h-auto w-full object-cover"
        />
        {HOME_PHOTO.caption && (
          <figcaption className="pt-3 text-[13px] text-muted">{HOME_PHOTO.caption}</figcaption>
        )}
      </figure>

      <section aria-labelledby="journal" className="pb-32">
        <SectionHeading id="journal" title="Journal" link={{ href: "/blog", label: "All entries" }} />
        <PostList posts={posts} />
      </section>

      <section aria-labelledby="photos" className="pb-32">
        <SectionHeading
          id="photos"
          title="Photos"
          link={{ href: "/gallery", label: "All collections" }}
        />
        <div className="pt-2">
          <CollectionGrid collections={collections} />
        </div>
      </section>
    </>
  );
}
