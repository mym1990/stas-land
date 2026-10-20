import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on photography, process, and paying attention.",
};

export default function JournalPage() {
  return (
    <section className="mt-12 pb-32">
      <SectionHeading as="h1" title="Journal" />
      <PostList posts={getAllPosts()} />
    </section>
  );
}
