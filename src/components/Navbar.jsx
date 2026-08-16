import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
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
    { to: "/", label: t("nav.home") },
    { to: "/concepts", label: t("nav.concepts") },
    { to: "/features", label: t("nav.features") },
    { to: "/installation", label: t("nav.installation") },
    { to: "/architecture", label: t("nav.architecture") },
    { to: "/docs", label: t("nav.docs") },
    { href: t("common.repoUrl"), label: t("common.github"), external: true },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
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
                end={l.to === "/"}
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
