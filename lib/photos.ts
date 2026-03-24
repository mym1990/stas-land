import fs from "fs";
import path from "path";

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  tags?: string[];
};

const GALLERY_PATH = path.join(process.cwd(), "content/gallery.json");

export function getAllPhotos(): Photo[] {
  if (!fs.existsSync(GALLERY_PATH)) return [];
  const raw = fs.readFileSync(GALLERY_PATH, "utf8");
  return JSON.parse(raw) as Photo[];
}

export function getPhotosByTag(tag: string): Photo[] {
  return getAllPhotos().filter((p) => p.tags?.includes(tag));
}
