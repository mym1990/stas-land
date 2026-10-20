import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="border-t border-rule py-5 text-muted">Nothing here yet.</p>;
  }

  return (
    <ul className="border-b border-rule">
      {posts.map((post) => (
        <li key={post.slug} className="border-t border-rule">
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-baseline justify-between gap-6 py-[18px] text-[19px] leading-snug"
          >
            <span>
              {post.title}
              {post.draft && (
                <span className="ml-2 align-middle text-xs uppercase tracking-wider text-[var(--sun)]">
                  draft
                </span>
              )}
            </span>
            <time dateTime={post.date} className="shrink-0 text-sm text-muted">
              {formatDate(post.date, "short")}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
