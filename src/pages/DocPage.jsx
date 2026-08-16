import { useParams, Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import { getDoc, docTitle } from "../docs/docsData.js";
import Markdown from "../docs/Markdown.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import { seoFor } from "../seo.js";

export default function DocPage() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const doc = getDoc(lang, slug);

  usePageMeta(seoFor(lang, "docsDoc", slug));

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

  return (
    <div className="page container doc-page">
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
    </div>
  );
}
