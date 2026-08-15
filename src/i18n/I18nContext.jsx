import { createContext, useContext, useEffect, useMemo, useState } from "react";
import fr from "./fr.js";
import en from "./en.js";

const dictionaries = { fr, en };
const I18nContext = createContext(null);

function resolve(path, obj) {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem("wpm-site-lang");
    if (stored === "fr" || stored === "en") return stored;
    return navigator.language && navigator.language.toLowerCase().startsWith("fr")
      ? "fr"
      : "en";
  });

  useEffect(() => {
    localStorage.setItem("wpm-site-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const dict = dictionaries[lang];
    return {
      lang,
      setLang,
      t: (path, vars) => {
        let text = resolve(path, dict);
        if (text == null) text = resolve(path, dictionaries.en);
        if (text == null) return path;
        if (typeof text === "string" && vars) {
          for (const [k, v] of Object.entries(vars)) {
            text = text.replaceAll(`{${k}}`, String(v));
          }
        }
        return text;
      },
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
