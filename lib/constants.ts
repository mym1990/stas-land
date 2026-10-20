// Site-wide settings. Edit these to change what appears in the header,
// footer and on the home page.

export const SITE_NAME = "stas.land";
export const SITE_TAGLINE = "Landscapes, light, and the occasional essay.";
export const SITE_DESCRIPTION = SITE_TAGLINE;
export const SITE_URL = "https://stas.land";
export const AUTHOR = "Stas";

// Leave empty to hide the Email link in the footer.
export const CONTACT_EMAIL = "";

// The big photo on the home page. `src` is a path inside /public.
export const HOME_PHOTO = {
  src: "/photos/sierra-summer/DSCF8417.jpg",
  caption: "Sierra Nevada ridgeline at golden hour",
};

export const NAV_LINKS = [
  { label: "Photos", href: "/gallery" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
] as const;
