import { useI18n } from "../i18n/I18nContext.jsx";
import DataTable from "../components/DataTable.jsx";

function Section({ section }) {
  const { t } = useI18n();

  return (
    <div className="block" id={section.id}>
      <h3 className="block__title">{section.title}</h3>
      <p className="block__text">{section.text}</p>
      {section.table && (
        <div className="table-wrap">
          <DataTable data={section.table} />
        </div>
      )}
      {section.note && <p className="note">{section.note}</p>}
      {section.analogy && (
        <p className="analogy">
          <strong>{t("common.analogy")} —</strong> {section.analogy}
        </p>
      )}
    </div>
  );
}

export default function Concepts() {
  const { t } = useI18n();
  const sections = t("concepts.sections");
  const objectives = t("concepts.objectives.items");

  return (
    <div className="page container">
      <h1 className="page__title">{t("concepts.title")}</h1>
      <p className="page__intro">{t("concepts.intro")}</p>

      <div className="block">
        <h3 className="block__title">{t("concepts.problem.title")}</h3>
        <p className="block__text">{t("concepts.problem.text")}</p>
        <p className="block__text">
          <strong>{t("concepts.problem.solution")}</strong>
        </p>
      </div>

      <div className="block">
        <h3 className="block__title">{t("concepts.oneLiner.title")}</h3>
        <p className="block__text">{t("concepts.oneLiner.text")}</p>
        <p className="block__text">{t("concepts.oneLiner.detail")}</p>
      </div>

      {sections.map((s) => (
        <Section key={s.id} section={s} />
      ))}

      <h2 className="section__title" style={{ marginTop: "40px" }}>
        {t("concepts.objectives.title")}
      </h2>
      <div className="cards">
        {objectives.map((obj, i) => (
          <div className="card" key={i}>
            <h3 className="card__title">{obj.title}</h3>
            <p className="card__text">{obj.text}</p>
          </div>
        ))}
      </div>

      <div className="block" style={{ marginTop: "32px" }}>
        <h3 className="block__title">{t("concepts.limits.title")}</h3>
        <p className="block__text">{t("concepts.limits.text")}</p>
      </div>
    </div>
  );
}
