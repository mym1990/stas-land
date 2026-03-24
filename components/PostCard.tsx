import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="photo-card bg-white">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={500}
            className="w-full h-56 object-cover"
          />
        )}
        <div className="p-5">
          <time className="text-xs uppercase tracking-widest text-text-muted">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h3 className="mt-2 font-serif text-xl text-text group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-2">
            {post.description}
          </p>
        </div>
      </article>
    </Link>
  );
}
