import Image from "next/image";
import type { MDXComponents } from "mdx/types";

function PhotoEmbed({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div className="photo-card">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm font-caption italic text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  PhotoEmbed,
  img: ({ src, alt, ...props }) => (
    <figure className="my-10">
      <div className="photo-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ""} className="w-full h-auto" {...props} />
      </div>
    </figure>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-accent pl-6 my-8 text-lg font-caption italic text-text-muted"
      {...props}
    >
      {children}
    </blockquote>
  ),
};
