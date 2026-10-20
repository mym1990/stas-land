# stas.land

Photographs and a journal. Next.js, with posts as markdown files and photos as plain folders. No database, no CMS.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Write a post

```bash
npm run new-post "Morning at Mono Lake"
```

That creates `content/blog/morning-at-mono-lake.mdx`:

```mdx
---
title: "Morning at Mono Lake"
date: 2026-10-20
draft: true
---

Write in plain markdown.

![Tufa towers before sunrise](/images/DSC01234.jpg)
```

- **Only `title` and `date` are required.**
- `draft: true` shows the post when you run it locally but hides it on the live site. Delete the line to publish.
- **Photos in a post:** put the file in `public/images/` (or reuse one from a collection under `public/photos/`), then use normal markdown image syntax. The text in `[ ]` becomes the caption. Photos automatically run wider than the text.
- Optional extras in the frontmatter:
  - `description: ...` — one line used for link previews
  - `cover: /photos/...jpg` — a big photo above the post

To publish: commit and push to `main`; Vercel deploys it.

## Add a photo collection

1. Make a folder: `public/photos/<collection-name>/`
2. Drop the photos in. Export them around 2400px on the long edge; the site resizes for each screen.
3. That's it. The collection shows up under **Photos**, titled from the folder name. (Every folder in `public/photos/` becomes a collection, so keep post-only images in `public/images/`.)

To set a nicer title, a description, the order or captions, add a `collection.json` in the folder:

```json
{
  "title": "Japan, 2024",
  "description": "Cherry blossoms, temples, and quiet streets.",
  "coverImage": "DSC00324.jpg",
  "photos": [
    { "file": "DSC00324.jpg", "caption": "Cherry blossoms, Kyoto" },
    { "file": "DSC00583.jpg", "caption": "Lanterns, Fushimi Inari" }
  ]
}
```

If `photos` is listed, only those files show, in that order.

## Site settings

`lib/constants.ts` holds the tagline, the home page photo, your contact email (empty hides the footer link) and the menu.
