import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import { getDoc, docTitle } from "../docs/docsData.js";
import Markdown from "../docs/Markdown.jsx";

export default function DocPage() {
  const { lang, slug } = useParams();
  const { t } = useI18n();
  const validLang = lang === "fr" || lang === "en" ? lang : null;
  const doc = validLang ? getDoc(validLang, slug) : null;
  const title = doc ? docTitle(doc.content) : null;

  useEffect(() => {
    if (!title) return undefined;
    document.title = `${title} — WPM`;
    return () => {
      document.title = "WPM — Weighted Persistent Memory";
    };
  }, [title]);

  if (!validLang || !doc) {
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

  const other = validLang === "fr" ? "en" : "fr";

  return (
    <div className="page container">
      <nav className="doc-crumbs">
        <Link to="/docs">{t("nav.docs")}</Link>
        <span className="doc-crumbs__sep">/</span>
        <span>{validLang === "fr" ? "Français" : "English"}</span>
        <span className="doc-crumbs__sep">/</span>
        <span>{title}</span>
      </nav>

      <div className="doc-toolbar">
        <h1 className="page__title">{title}</h1>
        <div className="doc-lang">
          <Link
            to={`/docs/fr/${slug}`}
            className={validLang === "fr" ? "lang-btn is-active" : "lang-btn"}
          >
            FR
          </Link>
          <span className="lang-sep">/</span>
          <Link
            to={`/docs/en/${slug}`}
            className={validLang === "en" ? "lang-btn is-active" : "lang-btn"}
          >
            EN
          </Link>
        </div>
      </div>

      <Markdown lang={validLang} content={doc.content} />

      <p className="note" style={{ marginTop: "32px" }}>
        {t("docs.docNote")} — <a href={t("common.repoUrl")} target="_blank" rel="noopener noreferrer">{t("docs.githubLabel")}</a>
      </p>
    </div>
  );
}
