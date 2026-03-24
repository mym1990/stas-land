import Link from "next/link";
import type { Post, PostConnection } from "@/lib/posts";

type DoorwaysProps = {
  connections: PostConnection[];
  allPosts: Post[];
  currentSlug: string;
};

export function Doorways({ connections, allPosts, currentSlug }: DoorwaysProps) {
  // Get connected posts with their metadata
  const connectedPosts = connections
    .map((conn) => {
      const post = allPosts.find((p) => p.slug === conn.slug);
      if (!post) return null;
      return { ...post, label: conn.label };
    })
    .filter(Boolean) as (Post & { label: string })[];

  // Pick a random post not in connections and not current
  const otherSlugs = new Set([
    currentSlug,
    ...connections.map((c) => c.slug),
  ]);
  const wanderPosts = allPosts.filter((p) => !otherSlugs.has(p.slug));

  if (connectedPosts.length === 0 && wanderPosts.length === 0) return null;

  return (
    <nav className="mt-20 pt-10 border-t border-border" aria-label="Explore more">
      <p className="text-xs uppercase tracking-widest text-text-muted mb-8">
        Continue exploring
      </p>

      <div className="space-y-6">
        {connectedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <span className="text-sm text-text-muted italic font-caption">
              {post.label}
            </span>
            <h3 className="font-serif text-xl mt-1 text-text group-hover:text-accent transition-colors">
              {post.title}
            </h3>
          </Link>
        ))}

        {wanderPosts.length > 0 && (
          <div className="pt-4">
            <Link
              href={`/blog/${wanderPosts[Math.floor(Math.random() * wanderPosts.length)].slug}`}
              className="group inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
            >
              <span className="inline-block w-4 h-px bg-current" />
              <span>somewhere else entirely</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
