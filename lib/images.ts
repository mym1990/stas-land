import fs from "fs";
import path from "path";

export type Dimensions = { width: number; height: number };

const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Read the pixel size of a JPEG or PNG in /public, e.g. "/photos/x/y.jpg".
 * Returns null if the file is missing or the format isn't recognised.
 */
export function getPublicImageSize(src: string): Dimensions | null {
  if (!src.startsWith("/")) return null;
  const filePath = path.join(PUBLIC_DIR, decodeURIComponent(src));
  return getImageSize(filePath);
}

export function getImageSize(filePath: string): Dimensions | null {
  try {
    const buf = fs.readFileSync(filePath);
    return jpegSize(buf) ?? pngSize(buf);
  } catch {
    return null;
  }
}

function pngSize(buf: Buffer): Dimensions | null {
  const sig = [0x89, 0x50, 0x4e, 0x47];
  if (!sig.every((b, i) => buf[i] === b)) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf: Buffer): Dimensions | null {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let offset = 2;
  let orientation = 1;
  let size: Dimensions | null = null;

  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) return size;
    const marker = buf[offset + 1];
    const length = buf.readUInt16BE(offset + 2);

    // APP1 / EXIF: pick up rotation so portrait photos aren't sized as landscape
    if (marker === 0xe1 && buf.toString("ascii", offset + 4, offset + 8) === "Exif") {
      orientation = exifOrientation(buf, offset + 10) ?? 1;
    }

    const isSOF =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isSOF) {
      size = {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
      break;
    }
    offset += 2 + length;
  }

  if (size && orientation >= 5 && orientation <= 8) {
    return { width: size.height, height: size.width };
  }
  return size;
}

function exifOrientation(buf: Buffer, tiff: number): number | null {
  try {
    const little = buf.toString("ascii", tiff, tiff + 2) === "II";
    const u16 = (o: number) => (little ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o: number) => (little ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd = tiff + u32(tiff + 4);
    const entries = u16(ifd);
    for (let i = 0; i < entries; i++) {
      const entry = ifd + 2 + i * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8);
    }
  } catch {
    // ignore malformed EXIF
  }
  return null;
}
