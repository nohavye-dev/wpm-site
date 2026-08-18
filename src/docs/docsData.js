const frFiles = import.meta.glob("../../docs/fr/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const enFiles = import.meta.glob("../../docs/en/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function toList(files) {
  return Object.entries(files)
    .map(([path, content]) => ({
      slug: path.split("/").pop().replace(/\.md$/, ""),
      content,
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export const DOCS = {
  fr: toList(frFiles),
  en: toList(enFiles),
};

export const DOC_ORDER = ["concepts", "setup", "workflows", "agent-behavior", "configuration"];

export function getDoc(lang, slug) {
  if (lang !== "fr" && lang !== "en") return null;
  return DOCS[lang].find((d) => d.slug === slug) ?? null;
}

export function docTitle(content) {
  const m = content.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

export function slugify(text) {
  const slug = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "section";
}

function cleanInline(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function docHeadings(content) {
  const headings = [];
  for (const line of content.split("\n")) {
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (!m) continue;
    const text = cleanInline(m[2]);
    if (!text) continue;
    headings.push({ level: m[1].length, text, slug: slugify(text) });
  }
  return headings;
}

export function docDescription(content) {
  const lines = content.split("\n");
  let paragraph = [];
  let started = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!started) {
      if (line.startsWith("#") || line === "") continue;
      started = true;
    }
    if (line === "" || line.startsWith("#")) break;
    paragraph.push(line);
  }
  const text = paragraph
    .join(" ")
    .replace(/[*_`>]/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 155 ? text.slice(0, 152).trimEnd() + "…" : text;
}
