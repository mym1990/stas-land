"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

type ImmersiveGalleryProps = {
  photos: Photo[];
};

export function ImmersiveGallery({ photos }: ImmersiveGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const transitioning = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning.current || index === current) return;
      transitioning.current = true;

      // 1. Fade out current photo
      setVisible(false);

      // 2. After fade-out completes, swap photo and fade in
      setTimeout(() => {
        setCurrent(index);
        // Small delay to let React render the new image before fading in
        requestAnimationFrame(() => {
          setVisible(true);
          transitioning.current = false;
        });
      }, 400);
    },
    [current]
  );

  const next = useCallback(() => {
    goTo((current + 1) % photos.length);
  }, [current, photos.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + photos.length) % photos.length);
  }, [current, photos.length, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "i") {
        setShowInfo((s) => !s);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const photo = photos[current];

  return (
    <div className="fixed inset-0 bg-[#0a0a08] z-[100] flex flex-col">
      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-opacity duration-500 ${
          showInfo ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <a
          href="/"
          className="text-white/70 hover:text-white text-sm uppercase tracking-widest transition-colors"
        >
          Back
        </a>
        <span className="text-white/40 text-sm tabular-nums">
          {current + 1} / {photos.length}
        </span>
      </div>

      {/* Main photo area */}
      <div
        className="flex-1 relative cursor-pointer select-none"
        onClick={() => setShowInfo((s) => !s)}
      >
        {/* Navigation zones */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-w-resize opacity-0"
          aria-label="Previous photo"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-e-resize opacity-0"
          aria-label="Next photo"
        />

        {/* Photo */}
        <div
          className="absolute inset-0 flex items-center justify-center p-8 sm:p-16"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 400ms ease",
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="max-w-full max-h-full object-contain"
            style={{ filter: "contrast(0.97) saturate(0.95)" }}
            priority
          />
        </div>
      </div>

      {/* Caption bar */}
      <div
        className={`px-6 py-6 text-center transition-opacity duration-500 ${
          showInfo ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {photo.caption && (
          <p className="text-white/60 text-sm font-caption italic tracking-wide">
            {photo.caption}
          </p>
        )}

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-1.5 bg-white/60"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
