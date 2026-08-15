import { useI18n } from "../i18n/I18nContext.jsx";
import DataTable from "../components/DataTable.jsx";

export default function Features() {
  const { t } = useI18n();
  const workflows = t("features.workflows.items");

  return (
    <div className="page container">
      <h1 className="page__title">{t("features.title")}</h1>
      <p className="page__intro">{t("features.intro")}</p>

      <h2 className="section__title">{t("features.tools.title")}</h2>
      <DataTable data={t("features.tools")} />
      <p className="note">{t("features.tools.note")}</p>

      <h2 className="section__title" style={{ marginTop: "40px" }}>
        {t("features.resources.title")}
      </h2>
      <DataTable data={t("features.resources")} />

      <h2 className="section__title" style={{ marginTop: "40px" }}>
        {t("features.prompts.title")}
      </h2>
      <DataTable data={t("features.prompts")} />
      <p className="note">{t("features.prompts.note")}</p>

      <h2 className="section__title" style={{ marginTop: "40px" }}>
        {t("features.workflows.title")}
      </h2>
      <p className="section__intro">{t("features.workflows.intro")}</p>
      <div className="cards">
        {workflows.map((w, i) => (
          <div className="card" key={i}>
            <h3 className="card__title">{w.title}</h3>
            <p className="card__text">{w.text}</p>
          </div>
        ))}
      </div>

      <div className="block" style={{ marginTop: "32px" }}>
        <h3 className="block__title">{t("features.embeddings.title")}</h3>
        <p className="block__text">{t("features.embeddings.text")}</p>
      </div>
    </div>
  );
}
