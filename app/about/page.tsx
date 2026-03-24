import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Stas — photographer, writer, and maker of things.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl sm:text-5xl mb-10">About</h1>

      <div className="prose prose-lg prose-blog max-w-none">
        <p>
          Hi, I&apos;m Stas. I photograph the natural world — mostly at
          the edges of the day when the light does something
          extraordinary. I process my work to evoke the warmth and
          texture of analog film.
        </p>

        <p>
          I&apos;m drawn to landscapes that feel quiet. Forests wrapped in fog,
          alpine lakes before anyone else arrives, the way desert light carves
          shadows out of nothing.
        </p>

        <p>
          This site is where I share photographs and the occasional piece of
          writing about the process — the early mornings, the long drives, and
          the small revelations that come from paying attention.
        </p>

        <h2>Get in Touch</h2>
        <p>
          The best way to reach me is by email. I&apos;m also occasionally on
          social media, though I prefer the slower pace of long-form
          conversation.
        </p>
      </div>
    </div>
  );
}
