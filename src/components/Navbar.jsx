import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useI18n, switchLangPath } from "../i18n/I18nContext.jsx";

export default function Navbar() {
  const { t, lang } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { to: `/${lang}`, label: t("nav.home") },
    { to: `/${lang}/concepts`, label: t("nav.concepts") },
    { to: `/${lang}/features`, label: t("nav.features") },
    { to: `/${lang}/installation`, label: t("nav.installation") },
    { to: `/${lang}/architecture`, label: t("nav.architecture") },
    { to: `/${lang}/docs`, label: t("nav.docs") },
    { href: t("common.repoUrl"), label: t("common.github"), external: true },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to={`/${lang}`} className="navbar__brand">
          <span className="navbar__logo">WPM</span>
          <span className="navbar__tagline">Weighted Persistent Memory</span>
        </Link>
        <nav
          id="navbar-links"
          className={open ? "navbar__links is-open" : "navbar__links"}
        >
          {links.map((l) =>
            l.href ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === `/${lang}`}
                className={({ isActive }) =>
                  isActive ? "navbar__link is-active" : "navbar__link"
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            )
          )}
        </nav>
        <div className="navbar__lang">
          <Link
            to={switchLangPath(pathname, "fr")}
            className={lang === "fr" ? "lang-btn is-active" : "lang-btn"}
            onClick={() => setOpen(false)}
          >
            FR
          </Link>
          <span className="lang-sep">/</span>
          <Link
            to={switchLangPath(pathname, "en")}
            className={lang === "en" ? "lang-btn is-active" : "lang-btn"}
            onClick={() => setOpen(false)}
          >
            EN
          </Link>
        </div>
        <button
          type="button"
          className={open ? "navbar__burger is-open" : "navbar__burger"}
          aria-expanded={open}
          aria-controls="navbar-links"
          aria-label={open ? t("common.close") : t("common.menu")}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="navbar__burger-bar" />
          <span className="navbar__burger-bar" />
          <span className="navbar__burger-bar" />
        </button>
      </div>
    </header>
  );
}
