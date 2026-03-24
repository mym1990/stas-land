import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/components/MdxComponents";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

const typeLabels: Record<string, string> = {
  photo: "Photography",
  technical: "Technical",
  thought: "Journal",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <article className="pb-20">
      {/* Cover image — only for photo posts */}
      {post.coverImage && (
        <div className="w-full h-[50vh] min-h-[300px] relative">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            style={{ filter: "contrast(0.97) saturate(0.95)" }}
            priority
          />
        </div>
      )}

      {/* Post content */}
      <div className="max-w-[720px] mx-auto px-6 pt-12">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs uppercase tracking-widest text-accent">
              {typeLabels[post.type] || post.type}
            </span>
            <span className="text-text-muted/30">/</span>
            <time className="text-xs uppercase tracking-widest text-text-muted">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="mt-4 flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs uppercase tracking-widest text-text-muted px-3 py-1 rounded-full ${
                    post.type === "technical"
                      ? "bg-bg-secondary font-mono"
                      : "bg-bg-secondary"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg prose-blog max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
