import { useI18n } from "../i18n/I18nContext.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import DataTable from "../components/DataTable.jsx";

export default function Installation() {
  const { t } = useI18n();
  const steps = t("installation.steps");

  return (
    <div className="page container">
      <h1 className="page__title">{t("installation.title")}</h1>
      <p className="page__intro">{t("installation.intro")}</p>

      {steps.map((step) => (
        <div className="block" key={step.id}>
          <h3 className="block__title">{step.title}</h3>
          {step.text && <p className="block__text">{step.text}</p>}

          {step.cmd && <CodeBlock code={step.cmd} lang="bash" />}

          {step.what && <p className="block__what">{step.what}</p>}
          {step.items && (
            <ul className="check-list">
              {step.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {step.customTitle && (
            <>
              <p className="block__what">{step.customTitle}</p>
              <CodeBlock code={step.customCmd} lang="bash" />
            </>
          )}

          {step.cmds && (
            <div style={{ display: "grid", gap: "10px", marginTop: "12px" }}>
              {step.cmds.map(([cmd, desc], i) => (
                <div key={i}>
                  <CodeBlock code={cmd} lang="bash" />
                  <p className="block__text" style={{ margin: "2px 0 0" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {step.note && <p className="note">{step.note}</p>}
        </div>
      ))}

      <h2 className="section__title" style={{ marginTop: "40px" }}>
        {t("installation.config.title")}
      </h2>
      <div className="block">
        <p className="block__text">{t("installation.config.intro")}</p>
        <p className="block__what">{t("installation.config.minimalTitle")}</p>
        <CodeBlock code={t("installation.config.minimalCode")} lang="json" />
        <p className="block__what" style={{ marginTop: "20px" }}>
          {t("installation.config.envTitle")}
        </p>
        <DataTable
          data={{
            cols: t("installation.config.envCols"),
            rows: t("installation.config.envRows"),
          }}
        />
        <p className="note">{t("installation.config.note")}</p>
      </div>
    </div>
  );
}
