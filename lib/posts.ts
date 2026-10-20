import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

/**
 * Frontmatter for a post. Only `title` and `date` are needed:
 *
 *   ---
 *   title: First Light
 *   date: 2026-03-20
 *   ---
 *
 * Optional extras:
 *   description: one line, used for link previews
 *   cover: /photos/sierra-summer/DJI_0721-2.jpg   (photo shown above the post)
 *   draft: true                                   (hidden on the live site)
 */
export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
  cover?: string;
  draft: boolean;
};

export type PostWithContent = Post & { content: string };

function postFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
}

function toISODate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value.trim()) return value.trim().slice(0, 10);
  return "1970-01-01";
}

function readPost(filename: string): PostWithContent {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: typeof data.title === "string" && data.title ? data.title : slug,
    date: toISODate(data.date),
    description: data.description || undefined,
    // `coverImage` is the old name, still accepted
    cover: data.cover || data.coverImage || undefined,
    draft: data.draft === true,
    content,
  };
}

const showDrafts = process.env.NODE_ENV !== "production";

export function getAllPosts(): Post[] {
  return postFiles()
    .map(readPost)
    .filter((p) => showDrafts || !p.draft)
    .map((p): Post => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      description: p.description,
      cover: p.cover,
      draft: p.draft,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const file = postFiles().find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!file) return null;
  const post = readPost(file);
  if (post.draft && !showDrafts) return null;
  return post;
}

export function formatDate(date: string, style: "short" | "long" = "long") {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: style === "short" ? "short" : "long",
    ...(style === "long" ? { day: "numeric" } : {}),
  });
}
