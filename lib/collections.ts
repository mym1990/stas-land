import fs from "fs";
import path from "path";

const PHOTOS_DIR = path.join(process.cwd(), "public/photos");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

export type CollectionPhoto = {
  src: string;
  file: string;
  caption?: string;
  width: number;
  height: number;
};

export type Collection = {
  slug: string;
  title: string;
  description?: string;
  coverImage: string;
  photos: CollectionPhoto[];
  photoCount: number;
};

type CollectionJson = {
  title?: string;
  description?: string;
  coverImage?: string;
  photos?: { file: string; caption?: string }[];
};

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isImageFile(filename: string): boolean {
  return IMAGE_EXTENSIONS.includes(path.extname(filename).toLowerCase());
}

function getImageDimensions(filePath: string): {
  width: number;
  height: number;
} {
  // Default dimensions — will be overridden by next/image at runtime
  // For proper aspect ratios, we read dimensions via sharp at build time
  try {
    // Quick dimension read from JPEG header
    const buf = fs.readFileSync(filePath);
    const dims = getJpegDimensions(buf);
    if (dims) return dims;
  } catch {
    // fall through
  }
  return { width: 1600, height: 1067 };
}

function getJpegDimensions(
  buf: Buffer
): { width: number; height: number } | null {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let offset = 2;
  while (offset < buf.length) {
    if (buf[offset] !== 0xff) return null;
    const marker = buf[offset + 1];
    // SOF markers (SOF0-SOF3, SOF5-SOF7, SOF9-SOF11, SOF13-SOF15)
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      const height = buf.readUInt16BE(offset + 5);
      const width = buf.readUInt16BE(offset + 7);
      return { width, height };
    }
    const segmentLength = buf.readUInt16BE(offset + 2);
    offset += 2 + segmentLength;
  }
  return null;
}

export function getAllCollections(): Collection[] {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  const entries = fs.readdirSync(PHOTOS_DIR, { withFileTypes: true });
  const collections: Collection[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    // Skip the old flat directories
    if (entry.name === "gallery" || entry.name === "blog") continue;

    const collection = getCollection(entry.name);
    if (collection && collection.photos.length > 0) {
      collections.push(collection);
    }
  }

  // Sort by title
  return collections.sort((a, b) => a.title.localeCompare(b.title));
}

export function getCollection(slug: string): Collection | null {
  const dirPath = path.join(PHOTOS_DIR, slug);
  if (!fs.existsSync(dirPath)) return null;

  // Read optional collection.json
  const jsonPath = path.join(dirPath, "collection.json");
  let meta: CollectionJson = {};
  if (fs.existsSync(jsonPath)) {
    meta = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  }

  // Get all image files in directory
  const allFiles = fs.readdirSync(dirPath).filter(isImageFile);
  if (allFiles.length === 0) return null;

  // Build photo list — use JSON ordering if available, otherwise alphabetical
  let photos: CollectionPhoto[];

  if (meta.photos && meta.photos.length > 0) {
    photos = meta.photos
      .filter((p) => allFiles.includes(p.file))
      .map((p) => {
        const filePath = path.join(dirPath, p.file);
        const dims = getImageDimensions(filePath);
        return {
          src: `/photos/${slug}/${p.file}`,
          file: p.file,
          caption: p.caption,
          ...dims,
        };
      });
  } else {
    photos = allFiles.sort().map((file) => {
      const filePath = path.join(dirPath, file);
      const dims = getImageDimensions(filePath);
      return {
        src: `/photos/${slug}/${file}`,
        file,
        ...dims,
      };
    });
  }

  const coverFile = meta.coverImage || photos[0]?.file;
  const coverImage = `/photos/${slug}/${coverFile}`;

  return {
    slug,
    title: meta.title || slugToTitle(slug),
    description: meta.description,
    coverImage,
    photos,
    photoCount: photos.length,
  };
}

export function getAllCollectionSlugs(): string[] {
  return getAllCollections().map((c) => c.slug);
}
