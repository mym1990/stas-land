import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { FeedCard } from "@/components/FeedCard";

export const metadata: Metadata = {
  title: "Writing",
  description: "Photography, technical architecture, and the art of slowing down.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl">Writing</h1>
        <p className="mt-4 text-lg text-text-muted max-w-xl">
          Photography, technical architecture, and the art of slowing down.
        </p>
      </header>

      <div className="space-y-10">
        {posts.map((post, i) => (
          <div key={post.slug}>
            <FeedCard post={post} />
            {i < posts.length - 1 && (
              <div className="border-t border-border mt-10" />
            )}
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-text-muted text-center py-20">
          No posts yet. Check back soon.
        </p>
      )}
    </div>
  );
}
