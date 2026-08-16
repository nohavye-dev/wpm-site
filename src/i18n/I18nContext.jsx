import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import fr from "./fr.js";
import en from "./en.js";

const dictionaries = { fr, en };
const I18nContext = createContext(null);

export const LANGS = ["fr", "en"];

export function langFromPath(pathname) {
  return pathname.startsWith("/en") ? "en" : "fr";
}

export function switchLangPath(pathname, lang) {
  const parts = pathname.split("/");
  if (parts[1] === "fr" || parts[1] === "en") {
    parts[1] = lang;
  } else {
    parts.splice(1, 0, lang);
  }
  return parts.join("/");
}

function resolve(path, obj) {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function I18nProvider({ children }) {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const dict = dictionaries[lang];
    return {
      lang,
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
