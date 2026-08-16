import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n, switchLangPath } from "../i18n/I18nContext.jsx";
import { SITE_URL, BASE } from "../seo.js";

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageUrl(pathname) {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${SITE_URL}${BASE}${p}`;
}

function replaceHead({ title, description, pathname }) {
  document.head.querySelectorAll("[data-wpm-seo]").forEach((el) => el.remove());
  document.querySelector('meta[name="description"]')?.remove();
  document.title = title || "WPM — Weighted Persistent Memory";

  const frUrl = pageUrl(switchLangPath(pathname, "fr"));
  const enUrl = pageUrl(switchLangPath(pathname, "en"));
  const tags = [
    `<meta name="description" data-wpm-seo content="${esc(description)}" />`,
    `<link rel="canonical" data-wpm-seo href="${pageUrl(pathname)}" />`,
    `<link rel="alternate" data-wpm-seo hreflang="fr" href="${frUrl}" />`,
    `<link rel="alternate" data-wpm-seo hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" data-wpm-seo hreflang="x-default" href="${SITE_URL}${BASE}/" />`,
  ];
  document.head.insertAdjacentHTML("beforeend", tags.join(""));
}

export default function usePageMeta({ title, description }) {
  const { lang } = useI18n();
  const { pathname } = useLocation();

  useEffect(() => {
    replaceHead({ title, description, pathname });
  }, [title, description, lang, pathname]);
}
