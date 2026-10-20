import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "About Stas: photographer and occasional writer.",
};

export default function AboutPage() {
  return (
    <article className="mt-12 pb-32">
      <h1 className="mx-auto mb-8 max-w-[640px] text-[40px] leading-[1.1] font-medium tracking-[-0.03em]">
        About
      </h1>
      <div className="prose prose-lg prose-journal mx-auto max-w-[640px]">
        <p>
          Hi, I&apos;m Stas. I photograph the natural world, mostly at the edges of the day
          when the light does something extraordinary, and I process my work to evoke the
          warmth and texture of analog film.
        </p>
        <p>
          I&apos;m drawn to landscapes that feel quiet: forests wrapped in fog, alpine lakes
          before anyone else arrives, the way desert light carves shadows out of nothing.
        </p>
        <p>
          This site is where I share photographs and the occasional piece of writing about
          the process: the early mornings, the long drives, and the small revelations that
          come from paying attention.
        </p>
        {CONTACT_EMAIL && (
          <p>
            The best way to reach me is by <a href={`mailto:${CONTACT_EMAIL}`}>email</a>.
          </p>
        )}
      </div>
    </article>
  );
}
