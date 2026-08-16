import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const LANGS = ["fr", "en"];
const DOC_ORDER = ["concepts", "setup", "workflows", "agent-behavior", "configuration"];
const TODAY = new Date().toISOString().slice(0, 10);

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildRoutes() {
  const routes = [];
  for (const lang of LANGS) {
    routes.push({ lang, path: `/${lang}/`, key: "home" });
    for (const p of ["concepts", "features", "installation", "architecture"]) {
      routes.push({ lang, path: `/${lang}/${p}`, key: p });
    }
    routes.push({ lang, path: `/${lang}/docs`, key: "docs" });
    for (const slug of DOC_ORDER) {
      routes.push({ lang, path: `/${lang}/docs/${slug}`, key: "docsDoc", slug });
    }
  }
  return routes;
}

function pageUrl(SITE_URL, BASE, path) {
  const p = path.replace(/^\//, "").replace(/\/?$/, "");
  return `${SITE_URL}${BASE}/${p}/`;
}

function otherLangUrl(SITE_URL, BASE, route, other) {
  return pageUrl(SITE_URL, BASE, route.path.replace(`/${route.lang}`, `/${other}`));
}

function jsonLd({ seo, lang, url }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WPM — Weighted Persistent Memory",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: "https://nohavye-dev.github.io/wpm-site/",
    description: seo.description || "",
    inLanguage: lang,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: {
      "@type": "Organization",
      name: "WPM project",
      url: "https://github.com/nohavye-dev/wpm-system",
    },
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function buildPageHtml({ template, route, content, seo, SITE_URL, BASE }) {
  const canonical = pageUrl(SITE_URL, BASE, route.path);
  const frUrl = otherLangUrl(SITE_URL, BASE, route, "fr");
  const enUrl = otherLangUrl(SITE_URL, BASE, route, "en");

  let out = template
    .replace('<html lang="fr">', `<html lang="${route.lang}">`)
    .replace(/<title>.*?<\/title>/, `<title>${esc(seo.title)}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${esc(seo.description)}" />`,
    )
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`);

  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="fr" href="${frUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${BASE}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:locale" content="${route.lang === "fr" ? "fr_FR" : "en_US"}" />`,
    `<meta property="og:site_name" content="WPM — Weighted Persistent Memory" />`,
    `<script type="application/ld+json">${jsonLd({ seo, lang: route.lang, url: canonical })}</script>`,
  ].join("\n    ");

  return out.replace("</head>", `    ${head}\n  </head>`);
}

function writeRouteFile(route, html) {
  const rel = route.path.replace(/^\//, "");
  const file = join(DIST, rel, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function buildSitemap({ routes, SITE_URL, BASE }) {
  const urlset = routes
    .map((route) => {
      const loc = pageUrl(SITE_URL, BASE, route.path);
      const priority =
        route.key === "home" ? "0.8" : route.key === "docsDoc" ? "0.6" : "0.7";
      const frUrl = otherLangUrl(SITE_URL, BASE, route, "fr");
      const enUrl = otherLangUrl(SITE_URL, BASE, route, "en");
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${frUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${BASE}/" />
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlset}
</urlset>
`;
}

const vite = await createServer({
  root: ROOT,
  logLevel: "warn",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: AppShell } = await vite.ssrLoadModule("/src/ssrEntry.jsx");
  const seoMod = await vite.ssrLoadModule("/src/seo.js");
  const { seoFor, SITE_URL, BASE } = seoMod;

  const template = readFileSync(join(DIST, "index.html"), "utf8");
  const routes = buildRoutes();

  for (const route of routes) {
    const fullUrl = `${BASE}${route.path}`;
    const content = renderToStaticMarkup(
      React.createElement(AppShell, { url: fullUrl, basename: BASE }),
    );
    const seo = seoFor(route.lang, route.key, route.slug);
    const html = buildPageHtml({ template, route, content, seo, SITE_URL, BASE });
    writeRouteFile(route, html);
    console.log(`prerendered ${route.path}`);
  }

  writeFileSync(join(DIST, "sitemap.xml"), buildSitemap({ routes, SITE_URL, BASE }));
  console.log(`sitemap.xml written (${routes.length} URLs)`);
} finally {
  await vite.close();
}
