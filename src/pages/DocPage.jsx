import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import { getDoc, docTitle } from "../docs/docsData.js";
import Markdown from "../docs/Markdown.jsx";

export default function DocPage() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const doc = getDoc(lang, slug);
  const title = doc ? docTitle(doc.content) : null;

  useEffect(() => {
    if (!title) return undefined;
    document.title = `${title} — WPM`;
    return () => {
      document.title = "WPM — Weighted Persistent Memory";
    };
  }, [title]);

  if (!doc) {
    return (
      <div className="page container">
        <h1 className="page__title">404</h1>
        <p className="page__intro">{t("docs.notFound")}</p>
        <Link to="/docs" className="btn btn--primary">
          {t("docs.backToDocs")}
        </Link>
      </div>
    );
  }

  return (
    <div className="page container doc-page">
      <nav className="doc-crumbs">
        <Link to="/docs">{t("nav.docs")}</Link>
        <span className="doc-crumbs__sep">/</span>
        <span>{title}</span>
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
    </div>
  );
}
