import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";
import { getPublicImageSize } from "@/lib/images";
import { mdxComponents } from "@/components/MdxComponents";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const coverSize = post.cover ? getPublicImageSize(post.cover) : null;

  return (
    <article className="mt-12 pb-32">
      <header className="mx-auto mb-12 max-w-[640px]">
        <time dateTime={post.date} className="text-sm text-muted">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-3 text-[40px] leading-[1.1] font-medium tracking-[-0.03em] text-balance">
          {post.title}
        </h1>
      </header>

      {post.cover && coverSize && (
        <Image
          src={post.cover}
          alt=""
          width={coverSize.width}
          height={coverSize.height}
          sizes="(max-width: 960px) 100vw, 880px"
          loading="eager"
          fetchPriority="high"
          className="mb-14 h-auto w-full"
        />
      )}

      <div className="prose prose-lg prose-journal mx-auto max-w-[640px]">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      <footer className="mx-auto mt-20 max-w-[640px] border-t border-rule pt-6">
        <Link href="/blog" className="text-sm text-muted">
          ← All entries
        </Link>
      </footer>
    </article>
  );
}
