import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import { DOCS, DOC_ORDER } from "../docs/docsData.js";
import usePageMeta from "../hooks/usePageMeta.js";
import { seoFor } from "../seo.js";

export default function Docs() {
  const { t, lang } = useI18n();
  usePageMeta(seoFor(lang, "docs"));
  const items = DOCS[lang];

  return (
    <div className="page container">
      <h1 className="page__title">{t("docs.title")}</h1>
      <p className="page__intro">{t("docs.intro")}</p>

      <div className="docs-list">
        {DOC_ORDER.map((slug) => {
          const doc = items.find((d) => d.slug === slug);
          if (!doc) return null;
          return (
            <Link
              key={slug}
              to={`/${lang}/docs/${slug}`}
              className="docs-item docs-item--link"
            >
              <span className="docs-item__path">{slug}.md</span>
              <span className="docs-item__desc">
                {t(`docs.items.${slug}`)}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="note" style={{ marginTop: "32px" }}>
        {t("docs.note")}
      </p>

      <a
        href={t("common.repoUrl")}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--ghost"
      >
        {t("docs.githubLabel")}
      </a>
    </div>
  );
}
