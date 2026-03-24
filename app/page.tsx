import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import { getAllCollections } from "@/lib/collections";
import { FeedCard } from "@/components/FeedCard";

export default function Home() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPost();
  const feed = allPosts.filter((p) => p.slug !== featured?.slug);
  const collections = getAllCollections();

  return (
    <div>
      {/* Editorial masthead */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-text-muted mb-4">
          Journal
        </p>
        <h1 className="font-serif text-5xl sm:text-7xl tracking-tight">
          stas.land
        </h1>
        <p className="mt-4 text-lg text-text-muted max-w-md mx-auto font-caption italic">
          Photography, architecture, and the craft of paying attention.
        </p>
        <div className="mt-8 w-12 h-px bg-border mx-auto" />
      </header>

      {/* Featured piece */}
      {featured && (
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <Link href={`/blog/${featured.slug}`} className="group block">
            {featured.coverImage && (
              <div className="aspect-[2/1] relative overflow-hidden rounded-sm mb-6">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ filter: "contrast(0.97) saturate(0.95)" }}
                  priority
                />
              </div>
            )}
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-accent">
                Featured
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl mt-2 group-hover:text-accent transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="mt-3 text-lg text-text-muted leading-relaxed">
                {featured.description}
              </p>
            </div>
          </Link>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      {/* Mixed feed */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-10">
          {feed.map((post, i) => (
            <div key={post.slug}>
              <FeedCard post={post} />
              {i < feed.length - 1 && (
                <div className="border-t border-border mt-10" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Collections callout */}
      {collections.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-2">
                  Photography
                </p>
                <h2 className="font-serif text-3xl">Collections</h2>
              </div>
              <Link
                href="/gallery"
                className="text-sm uppercase tracking-widest text-accent hover:text-accent-hover transition-colors"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {collections.slice(0, 3).map((collection) => (
                <Link
                  key={collection.slug}
                  href={`/gallery/${collection.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <Image
                      src={collection.coverImage}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      style={{ filter: "contrast(0.97) saturate(0.95)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif text-lg text-white">
                        {collection.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
