"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photos";
import { PhotoCard } from "./PhotoCard";
import { GalleryLightbox } from "./Lightbox";

type PhotoGridProps = {
  photos: Photo[];
  withLightbox?: boolean;
};

export function PhotoGrid({ photos, withLightbox = false }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <div key={photo.src} className="break-inside-avoid">
            <PhotoCard
              photo={photo}
              priority={i < 3}
              onClick={withLightbox ? () => setLightboxIndex(i) : undefined}
            />
          </div>
        ))}
      </div>

      {withLightbox && (
        <GalleryLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </>
  );
}
