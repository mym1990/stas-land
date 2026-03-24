import Image from "next/image";
import type { CollectionPhoto } from "@/lib/collections";

type PhotoEssayProps = {
  photos: CollectionPhoto[];
};

function FullWidthPhoto({ photo }: { photo: CollectionPhoto }) {
  return (
    <figure className="max-w-5xl mx-auto px-6">
      <div className="photo-card">
        <Image
          src={photo.src}
          alt={photo.caption || ""}
          width={photo.width}
          height={photo.height}
          className="w-full h-auto"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
      {photo.caption && (
        <figcaption className="mt-4 text-center text-sm font-caption italic text-text-muted">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

function SideCaptionPhoto({
  photo,
  captionSide,
}: {
  photo: CollectionPhoto;
  captionSide: "left" | "right";
}) {
  const isLeft = captionSide === "left";

  return (
    <figure className="max-w-6xl mx-auto px-6">
      <div
        className={`flex flex-col ${
          isLeft ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-6 lg:gap-12`}
      >
        <div className="w-full lg:w-[65%] photo-card">
          <Image
            src={photo.src}
            alt={photo.caption || ""}
            width={photo.width}
            height={photo.height}
            className="w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
        </div>
        {photo.caption && (
          <figcaption
            className={`w-full lg:w-[35%] ${
              isLeft ? "lg:text-right" : "lg:text-left"
            }`}
          >
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-text-muted">
              {photo.caption}
            </p>
          </figcaption>
        )}
      </div>
    </figure>
  );
}

function FullBleedPhoto({ photo }: { photo: CollectionPhoto }) {
  return (
    <figure className="relative w-full">
      <div className="w-full overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.caption || ""}
          width={photo.width}
          height={photo.height}
          className="w-full h-auto"
          style={{ filter: "contrast(0.97) saturate(0.95)" }}
          sizes="100vw"
        />
      </div>
      {photo.caption && (
        <figcaption className="absolute bottom-0 right-0 p-6 sm:p-8">
          <p
            className="text-sm font-caption italic text-white/80"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {photo.caption}
          </p>
        </figcaption>
      )}
    </figure>
  );
}

export function PhotoEssay({ photos }: PhotoEssayProps) {
  // Cycle through 4 layout patterns for visual rhythm
  const layouts = ["full-width", "side-right", "full-bleed", "side-left"] as const;

  return (
    <div className="flex flex-col gap-24 sm:gap-32 lg:gap-40 py-12">
      {photos.map((photo, i) => {
        const layout = layouts[i % layouts.length];

        switch (layout) {
          case "full-width":
            return <FullWidthPhoto key={photo.src} photo={photo} />;
          case "side-right":
            return (
              <SideCaptionPhoto
                key={photo.src}
                photo={photo}
                captionSide="right"
              />
            );
          case "full-bleed":
            return <FullBleedPhoto key={photo.src} photo={photo} />;
          case "side-left":
            return (
              <SideCaptionPhoto
                key={photo.src}
                photo={photo}
                captionSide="left"
              />
            );
        }
      })}
    </div>
  );
}
