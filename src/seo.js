import fr from "./i18n/fr.js";
import en from "./i18n/en.js";
import { DOCS, docTitle, docDescription } from "./docs/docsData.js";

export const SITE_URL = "https://nohavye-dev.github.io";
export const BASE = "/wpm-site";

const dicts = { fr, en };

export function seoFor(lang, key, slug) {
  const dict = dicts[lang] || en;
  const s = dict.seo && dict.seo[key];
  if (!s) {
    return { title: "WPM — Weighted Persistent Memory", description: "" };
  }
  if (key === "docsDoc" && slug) {
    const doc = (DOCS[lang] || []).find((d) => d.slug === slug);
    if (doc) {
      const title = docTitle(doc.content);
      const description = docDescription(doc.content) || s.description;
      return {
        title: title ? `${title} — WPM` : s.title,
        description,
      };
    }
  }
  return { title: s.title, description: s.description };
}
