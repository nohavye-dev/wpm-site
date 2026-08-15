import { useI18n } from "../i18n/I18nContext.jsx";

export default function Docs() {
  const { t } = useI18n();
  const groups = t("docs.groups");

  return (
    <div className="page container">
      <h1 className="page__title">{t("docs.title")}</h1>
      <p className="page__intro">{t("docs.intro")}</p>

      {groups.map((group, gi) => (
        <div key={gi}>
          <h2 className="docs-group__title">{group.title}</h2>
          {group.items.map(([path, desc], i) => (
            <div className="docs-item" key={i}>
              <span className="docs-item__path">{path}</span>
              <span className="docs-item__desc">{desc}</span>
            </div>
          ))}
        </div>
      ))}

      <p className="note" style={{ marginTop: "32px" }}>
        {t("docs.note")}
      </p>
    </div>
  );
}
