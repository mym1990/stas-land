import { Children, isValidElement, type ReactNode } from "react";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import { getPublicImageSize } from "@/lib/images";

type PhotoProps = { src: string; caption?: string; alt?: string };

/**
 * A photo in a post. Spans wider than the text column.
 *
 *   <Photo src="/photos/sierra-summer/DSCF8292.jpg" caption="Alpine lake" />
 *
 * or plain markdown, where the alt text becomes the caption:
 *
 *   ![Alpine lake](/photos/sierra-summer/DSCF8292.jpg)
 */
export function Photo({ src, caption, alt }: PhotoProps) {
  const size = getPublicImageSize(src);

  return (
    <figure className="post-figure not-prose my-12">
      <div className="mx-auto w-fit max-w-full">
        {size ? (
          <Image
            src={src}
            alt={alt ?? caption ?? ""}
            width={size.width}
            height={size.height}
            sizes="(max-width: 960px) 100vw, 880px"
            className="h-auto max-h-[85vh] w-auto max-w-full"
          />
        ) : (
          // External URL or unknown format: plain img
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? caption ?? ""} className="h-auto max-h-[85vh] w-auto max-w-full" />
        )}
        {caption && (
          <figcaption className="pt-3 text-[13px] text-muted">{caption}</figcaption>
        )}
      </div>
    </figure>
  );
}

function MarkdownImage({ src, alt }: { src?: string | Blob; alt?: string }) {
  if (typeof src !== "string") return null;
  return <Photo src={src} caption={alt || undefined} />;
}

// Markdown wraps a lone image in <p>; unwrap it so <figure> isn't inside <p>.
function Paragraph({ children }: { children?: ReactNode }) {
  const items = Children.toArray(children).filter(
    (c) => !(typeof c === "string" && c.trim() === "")
  );
  if (items.length > 0 && items.every((c) => isValidElement(c) && c.type === MarkdownImage)) {
    return <>{items}</>;
  }
  return <p>{children}</p>;
}

export const mdxComponents: MDXComponents = {
  Photo,
  // Old name, still works in existing posts
  PhotoEmbed: Photo,
  img: MarkdownImage,
  p: Paragraph,
};
