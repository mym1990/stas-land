import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";

function PostDate({ date }: { date: string }) {
  return (
    <time className="text-xs uppercase tracking-widest text-text-muted">
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
}

function TypeLabel({ type }: { type: string }) {
  const labels: Record<string, string> = {
    photo: "Photography",
    technical: "Technical",
    thought: "Journal",
  };
  return (
    <span className="text-xs uppercase tracking-widest text-accent">
      {labels[type] || type}
    </span>
  );
}

function PhotoCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-sm">
        {post.coverImage && (
          <div className="aspect-[16/10] relative overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ filter: "contrast(0.97) saturate(0.95)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <TypeLabel type={post.type} />
              <h3 className="font-serif text-xl sm:text-2xl text-white mt-1 leading-snug">
                {post.title}
              </h3>
            </div>
          </div>
        )}
      </article>
    </Link>
  );
}

function TechnicalCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="border-l-2 border-accent pl-5 py-1">
        <div className="flex items-center gap-3 mb-2">
          <TypeLabel type={post.type} />
          <span className="text-text-muted/30">/</span>
          <PostDate date={post.date} />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl text-text group-hover:text-accent transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-text-muted leading-relaxed">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-text-muted bg-bg-secondary px-2 py-0.5 rounded font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}

function ThoughtCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="py-1">
        <div className="flex items-center gap-3 mb-3">
          <TypeLabel type={post.type} />
          <span className="text-text-muted/30">/</span>
          <PostDate date={post.date} />
        </div>
        {post.pullQuote ? (
          <blockquote className="font-serif text-2xl sm:text-3xl leading-snug text-text group-hover:text-accent transition-colors">
            &ldquo;{post.pullQuote}&rdquo;
          </blockquote>
        ) : (
          <h3 className="font-serif text-xl sm:text-2xl text-text group-hover:text-accent transition-colors leading-snug">
            {post.title}
          </h3>
        )}
        <p className="mt-3 text-text-muted leading-relaxed">
          {post.description}
        </p>
      </article>
    </Link>
  );
}

export function FeedCard({ post }: { post: Post }) {
  switch (post.type) {
    case "photo":
      return <PhotoCard post={post} />;
    case "technical":
      return <TechnicalCard post={post} />;
    case "thought":
      return <ThoughtCard post={post} />;
    default:
      return <ThoughtCard post={post} />;
  }
}
