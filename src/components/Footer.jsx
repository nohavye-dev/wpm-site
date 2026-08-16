import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <span className="footer__brand">{t("footer.license")}</span>
          <p className="footer__text">{t("footer.tagline")}</p>
          <p className="footer__text">{t("footer.forOpencode")}</p>
        </div>
        <div className="footer__links">
          <Link to={`/${lang}/concepts`}>{t("nav.concepts")}</Link>
          <Link to={`/${lang}/features`}>{t("nav.features")}</Link>
          <Link to={`/${lang}/installation`}>{t("nav.installation")}</Link>
          <Link to={`/${lang}/docs`}>{t("nav.docs")}</Link>
          <a href={t("common.repoUrl")} target="_blank" rel="noopener noreferrer">
            {t("common.github")}
          </a>
        </div>
        <span className="footer__badge">{t("common.phaseBadge")}</span>
      </div>
    </footer>
  );
}
