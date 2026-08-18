import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext.jsx";
import { DOCS, DOC_ORDER } from "../docs/docsData.js";

export default function DocSidebar({ current, headings, open, onClose }) {
  const { t, lang } = useI18n();
  const [activeId, setActiveId] = useState("");
  const items = DOCS[lang];

  useEffect(() => {
    if (!headings.length) {
      setActiveId("");
      return;
    }
    const els = headings
      .map((h) => document.getElementById(h.slug))
      .filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const links = DOC_ORDER.map((slug) => {
    const doc = items.find((d) => d.slug === slug);
    if (!doc) return null;
    return { slug, label: t(`docs.items.${slug}`) };
  }).filter(Boolean);

  return (
    <>
      <aside className={open ? "doc-sidebar is-open" : "doc-sidebar"}>
        <div className="doc-sidebar__section">
          <h4 className="doc-sidebar__title">{t("nav.docs")}</h4>
          <ul className="doc-sidebar__list">
            {links.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/${lang}/docs/${l.slug}`}
                  className={
                    l.slug === current
                      ? "doc-sidebar__link is-active"
                      : "doc-sidebar__link"
                  }
                  onClick={onClose}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {headings.length > 0 && (
          <div className="doc-sidebar__section">
            <h4 className="doc-sidebar__title">{t("docs.onThisPage")}</h4>
            <ul className="doc-sidebar__list doc-sidebar__toc">
              {headings.map((h) => (
                <li key={h.slug}>
                  <a
                    href={`#${h.slug}`}
                    className={
                      "doc-sidebar__link" +
                      (h.level === 3 ? " doc-sidebar__link--sub" : "") +
                      (activeId === h.slug ? " is-active" : "")
                    }
                    onClick={onClose}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
      {open && <div className="doc-sidebar-backdrop" onClick={onClose} />}
    </>
  );
}
