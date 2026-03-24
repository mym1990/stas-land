import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { ExploreGraph } from "@/components/ExploreGraph";
import { WanderButton } from "@/components/WanderButton";

export const metadata: Metadata = {
  title: "Explore",
  description: "Wander through connected ideas, photos, and thoughts.",
};

export default function ExplorePage() {
  const posts = getAllPosts();

  const graphPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    type: post.type,
    description: post.description,
    connections: post.connections ?? [],
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl sm:text-5xl">Explore</h1>
          <p className="mt-4 text-lg text-text-muted max-w-lg">
            A map of connected ideas. Click a node to read, hover to see where
            it leads.
          </p>
        </div>
        <WanderButton slugs={posts.map((p) => p.slug)} />
      </header>

      <div className="border border-border rounded-sm bg-bg p-4 sm:p-8">
        <ExploreGraph posts={graphPosts} />
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center gap-8 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--accent)" }}
          />
          Photography
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--text-muted)" }}
          />
          Technical
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--text)" }}
          />
          Journal
        </div>
      </div>
    </div>
  );
}
