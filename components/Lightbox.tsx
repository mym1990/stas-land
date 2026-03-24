"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Photo } from "@/lib/photos";

type GalleryLightboxProps = {
  photos: Photo[];
  index: number;
  onClose: () => void;
};

export function GalleryLightbox({
  photos,
  index,
  onClose,
}: GalleryLightboxProps) {
  return (
    <Lightbox
      open={index >= 0}
      close={onClose}
      index={index}
      slides={photos.map((p) => ({
        src: p.src,
        alt: p.alt,
        width: p.width,
        height: p.height,
      }))}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
      }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
