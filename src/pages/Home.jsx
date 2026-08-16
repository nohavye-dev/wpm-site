import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import CodeBlock from "../components/CodeBlock.jsx";
import OpenCodeTerminal from "../components/OpenCodeTerminal.jsx";

export default function Home() {
  const { t } = useI18n();
  const ideas = t("home.ideas.items");
  const benefits = t("home.benefits.items");
  const steps = t("home.install.steps");
  const phaseItems = t("home.phase.items");
  const proofStats = t("home.proof.stats");

  return (
    <div>
      <section className="hero">
        <div className="container hero__inner">
          <span className="badge">{t("home.hero.badge")}</span>
          <h1 className="hero__title">{t("home.hero.title")}</h1>
          <p className="hero__subtitle">{t("home.hero.subtitle")}</p>
          <p className="hero__lead">{t("home.hero.lead")}</p>
          <div className="hero__cta">
            <Link to="/concepts" className="btn btn--primary">
              {t("home.hero.ctaConcepts")}
            </Link>
            <Link to="/installation" className="btn btn--ghost">
              {t("home.hero.ctaInstall")}
            </Link>
            <a
              href={t("common.repoUrl")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              {t("common.github")}
            </a>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <h2 className="section__title">{t("home.why.title")}</h2>
          <p className="section__intro">{t("home.why.text")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="badge">{t("home.proof.badge")}</span>
          <h2 className="section__title">{t("home.proof.title")}</h2>
          <p className="section__intro">{t("home.proof.intro")}</p>

          <OpenCodeTerminal />

          <div className="proof-stats">
            {proofStats.map((s, i) => (
              <div className="proof-stat" key={i}>
                <div className="proof-stat__value">{s.value}</div>
                <div className="proof-stat__label">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="proof__footnote">{t("home.proof.footnote")}</p>
          <div className="proof__cta">
            <Link to="/concepts" className="btn btn--primary">
              {t("home.proof.cta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t("home.ideas.title")}</h2>
          <p className="section__intro">{t("home.ideas.intro")}</p>
          <div className="cards">
            {ideas.map((idea, i) => (
              <div className="card card--icon" key={i}>
                <div className="card__icon">0{i + 1}</div>
                <h3 className="card__title">{idea.title}</h3>
                <p className="card__text">{idea.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <h2 className="section__title">{t("home.benefits.title")}</h2>
          <p className="section__intro">{t("home.benefits.intro")}</p>
          <ul className="check-list">
            {benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <p className="section__intro" style={{ marginTop: "20px" }}>
            {t("home.benefits.workflowsNote")}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t("home.install.title")}</h2>
          <div className="steps" style={{ marginBottom: "16px" }}>
            {steps.map((step, i) => (
              <div className="step" key={i}>
                <div className="step__num" />
                <div className="step__cmd">{step.cmd}</div>
                <p className="step__text">{step.text}</p>
              </div>
            ))}
          </div>
          <p className="section__intro" style={{ marginTop: "16px" }}>
            {t("home.install.zeroConfig")}
          </p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <h2 className="section__title">{t("home.phase.title")}</h2>
          <p className="section__intro">{t("home.phase.text")}</p>
          <ul className="check-list">
            {phaseItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
