import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import {
  getDoc,
  docTitle,
  docHeadings,
  DOC_ORDER,
} from "../docs/docsData.js";
import Markdown from "../docs/Markdown.jsx";
import DocSidebar from "../components/DocSidebar.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { seoFor } from "../seo.js";

export default function DocPage() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const doc = getDoc(lang, slug);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  usePageMeta(seoFor(lang, "docsDoc", slug));

  const headings = useMemo(
    () => (doc ? docHeadings(doc.content) : []),
    [doc]
  );

  if (!doc) {
    return (
      <div className="page container">
        <h1 className="page__title">404</h1>
        <p className="page__intro">{t("docs.notFound")}</p>
        <Link to={`/${lang}/docs`} className="btn btn--primary">
          {t("docs.backToDocs")}
        </Link>
      </div>
    );
  }

  const orderIndex = DOC_ORDER.indexOf(slug);
  const prevSlug = orderIndex > 0 ? DOC_ORDER[orderIndex - 1] : null;
  const nextSlug =
    orderIndex < DOC_ORDER.length - 1 ? DOC_ORDER[orderIndex + 1] : null;
  const prevDoc = prevSlug ? getDoc(lang, prevSlug) : null;
  const nextDoc = nextSlug ? getDoc(lang, nextSlug) : null;

  return (
    <div className="page container doc-page">
      <div className="doc-layout">
        <DocSidebar
          current={slug}
          headings={headings}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="doc-page__content">
          <nav className="doc-crumbs">
            <Link to={`/${lang}/docs`}>{t("nav.docs")}</Link>
            <span className="doc-crumbs__sep">/</span>
            <span>{docTitle(doc.content)}</span>
          </nav>

          <Markdown content={doc.content} />

          <p className="note" style={{ marginTop: "32px" }}>
            {t("docs.docNote")} —{" "}
            <a
              href={t("common.repoUrl")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("docs.githubLabel")}
            </a>
          </p>

          <nav className="doc-nav">
            {prevDoc ? (
              <Link
                to={`/${lang}/docs/${prevSlug}`}
                className="doc-nav__link doc-nav__link--prev"
              >
                <span className="doc-nav__arrow">←</span>
                <span className="doc-nav__label">{t("docs.previous")}</span>
                <span className="doc-nav__title">
                  {docTitle(prevDoc.content)}
                </span>
              </Link>
            ) : (
              <span className="doc-nav__spacer" />
            )}
            {nextDoc ? (
              <Link
                to={`/${lang}/docs/${nextSlug}`}
                className="doc-nav__link doc-nav__link--next"
              >
                <span className="doc-nav__label">{t("docs.next")}</span>
                <span className="doc-nav__title">
                  {docTitle(nextDoc.content)}
                </span>
                <span className="doc-nav__arrow">→</span>
              </Link>
            ) : (
              <span className="doc-nav__spacer" />
            )}
          </nav>
        </div>
      </div>

      <button
        type="button"
        className="doc-sidebar-toggle"
        aria-label={t("common.menu")}
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>
    </div>
  );
}
