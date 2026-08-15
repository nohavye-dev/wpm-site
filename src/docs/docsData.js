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
