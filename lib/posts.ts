import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostType = "photo" | "technical" | "thought";

export type PostConnection = {
  slug: string;
  label: string;
};

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  tags: string[];
  featured?: boolean;
  type: PostType;
  pullQuote?: string;
  connections?: PostConnection[];
};

export type Post = PostFrontmatter & {
  slug: string;
};

export type PostWithContent = Post & {
  content: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(POSTS_DIR, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const frontmatter = data as PostFrontmatter;
    return {
      slug,
      ...frontmatter,
      type: frontmatter.type || "thought",
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): PostWithContent {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = data as PostFrontmatter;
  return {
    slug,
    content,
    ...frontmatter,
    type: frontmatter.type || "thought",
  };
}

export function getFeaturedPost(): Post {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getPostsByType(type: PostType): Post[] {
  return getAllPosts().filter((p) => p.type === type);
}
