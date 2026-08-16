import { Routes, Route, Navigate, Outlet, useParams } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Concepts from "./pages/Concepts.jsx";
import Features from "./pages/Features.jsx";
import Installation from "./pages/Installation.jsx";
import Architecture from "./pages/Architecture.jsx";
import Docs from "./pages/Docs.jsx";
import DocPage from "./pages/DocPage.jsx";
import { LANGS } from "./i18n/I18nContext.jsx";

function LangRoute() {
  const { lang } = useParams();
  if (!LANGS.includes(lang)) {
    return <Navigate to="/fr/" replace />;
  }
  return <Outlet />;
}

function RootRedirect() {
  const browserLang =
    typeof navigator !== "undefined" && navigator.language
      ? navigator.language
      : "";
  const lang = browserLang.toLowerCase().startsWith("fr") ? "fr" : "en";
  return <Navigate to={`/${lang}/`} replace />;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang" element={<LangRoute />}>
          <Route index element={<Home />} />
          <Route path="concepts" element={<Concepts />} />
          <Route path="features" element={<Features />} />
          <Route path="installation" element={<Installation />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="docs" element={<Docs />} />
          <Route path="docs/:slug" element={<DocPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
