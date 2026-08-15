import { NavLink, Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/concepts", label: t("nav.concepts") },
    { to: "/features", label: t("nav.features") },
    { to: "/installation", label: t("nav.installation") },
    { to: "/architecture", label: t("nav.architecture") },
    { to: "/docs", label: t("nav.docs") },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo">WPM</span>
          <span className="navbar__tagline">Weighted Persistent Memory</span>
        </Link>
        <nav className="navbar__links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                isActive ? "navbar__link is-active" : "navbar__link"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="navbar__lang">
          <button
            type="button"
            className={lang === "fr" ? "lang-btn is-active" : "lang-btn"}
            onClick={() => setLang("fr")}
          >
            FR
          </button>
          <span className="lang-sep">/</span>
          <button
            type="button"
            className={lang === "en" ? "lang-btn is-active" : "lang-btn"}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
