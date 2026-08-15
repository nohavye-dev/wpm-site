import { useI18n } from "../i18n/I18nContext.jsx";
import DataTable from "../components/DataTable.jsx";

export default function Architecture() {
  const { t } = useI18n();
  const components = t("architecture.components");
  const flowSteps = t("architecture.flow.steps");

  return (
    <div className="page container">
      <h1 className="page__title">{t("architecture.title")}</h1>
      <p className="page__intro">{t("architecture.intro")}</p>

      {components.map((comp) => (
        <div className="block" key={comp.name}>
          <div className="card__title" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span
              style={{ fontFamily: "var(--mono)", fontSize: "1.2rem", fontWeight: 700, color: "var(--accent)" }}
            >
              {comp.name}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.72rem",
                color: "var(--accent-2)",
                border: "1px solid rgba(34,211,238,0.3)",
                background: "rgba(34,211,238,0.07)",
                padding: "3px 10px",
                borderRadius: "999px",
              }}
            >
              {comp.tag}
            </span>
          </div>
          <p className="block__text">{comp.text}</p>
          <ul className="check-list">
            {comp.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          {comp.warn && <p className="note warn-note">{comp.warn}</p>}
        </div>
      ))}

      <h2 className="section__title" style={{ marginTop: "40px" }}>
        {t("architecture.stack.title")}
      </h2>
      <DataTable data={t("architecture.stack")} />

      <h2 className="section__title" style={{ marginTop: "40px" }}>
        {t("architecture.flow.title")}
      </h2>
      <div className="flow">
        {flowSteps.map((step, i) => (
          <div className="flow__step" key={i}>
            <h3 className="flow__head">{step.head}</h3>
            <p className="flow__text">{step.text}</p>
          </div>
        ))}
      </div>
      <p className="note" style={{ marginTop: "20px" }}>
        {t("architecture.flow.footer")}
      </p>
    </div>
  );
}
