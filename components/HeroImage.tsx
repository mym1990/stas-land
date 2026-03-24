import Image from "next/image";
import type { Post } from "@/lib/posts";
import Link from "next/link";

export function HeroImage({ post }: { post: Post }) {
  if (!post.coverImage) return null;

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <section className="relative w-full h-[70vh] min-h-[400px] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ filter: "contrast(0.97) saturate(0.95)" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-white/70 mb-3">
              Featured
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-white leading-tight max-w-2xl">
              {post.title}
            </h2>
            <p className="mt-3 text-white/80 text-lg max-w-xl">
              {post.description}
            </p>
          </div>
        </div>
      </section>
    </Link>
  );
}
