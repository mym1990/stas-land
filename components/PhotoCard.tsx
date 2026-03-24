import Image from "next/image";
import type { Photo } from "@/lib/photos";

type PhotoCardProps = {
  photo: Photo;
  onClick?: () => void;
  priority?: boolean;
};

export function PhotoCard({ photo, onClick, priority }: PhotoCardProps) {
  return (
    <div
      className="photo-card cursor-pointer group"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className="w-full h-auto"
        priority={priority}
      />
      {photo.caption && (
        <div className="px-4 py-3 bg-white">
          <p className="text-sm font-caption italic text-text-muted">
            {photo.caption}
          </p>
        </div>
      )}
    </div>
  );
}
