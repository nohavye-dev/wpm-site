import { StaticRouter } from "react-router-dom/server";
import { I18nProvider } from "./i18n/I18nContext.jsx";
import App from "./App.jsx";

export default function AppShell({ url, basename }) {
  return (
    <StaticRouter location={url} basename={basename}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </StaticRouter>
  );
}
