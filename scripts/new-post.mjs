#!/usr/bin/env node
// Create a new journal post:  npm run new-post "Morning at Mono Lake"
import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new-post "Title of your post"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const dir = path.join(process.cwd(), "content/blog");
const file = path.join(dir, `${slug}.mdx`);

if (fs.existsSync(file)) {
  console.error(`Already exists: content/blog/${slug}.mdx`);
  process.exit(1);
}

const d = new Date();
const today = [
  d.getFullYear(),
  String(d.getMonth() + 1).padStart(2, "0"),
  String(d.getDate()).padStart(2, "0"),
].join("-");

const template = `---
title: ${JSON.stringify(title)}
date: ${today}
draft: true
---

Start writing here. Delete the \`draft: true\` line above when it's ready to go live.

{/*
Add a photo (put the file in public/images/ first, or use one from public/photos/):

![Caption under the photo](/images/your-photo.jpg)
*/}
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, template);
console.log(`Created content/blog/${slug}.mdx`);
console.log(`Preview it at http://localhost:3000/blog/${slug} (run: npm run dev)`);
