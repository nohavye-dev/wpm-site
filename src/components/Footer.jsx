import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <span className="footer__brand">{t("footer.license")}</span>
          <p className="footer__text">{t("footer.tagline")}</p>
          <p className="footer__text">{t("footer.forOpencode")}</p>
        </div>
        <div className="footer__links">
          <Link to="/concepts">{t("nav.concepts")}</Link>
          <Link to="/features">{t("nav.features")}</Link>
          <Link to="/installation">{t("nav.installation")}</Link>
          <Link to="/docs">{t("nav.docs")}</Link>
        </div>
        <span className="footer__badge">{t("common.phaseBadge")}</span>
      </div>
    </footer>
  );
}
