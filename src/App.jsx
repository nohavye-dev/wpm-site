import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Concepts from "./pages/Concepts.jsx";
import Features from "./pages/Features.jsx";
import Installation from "./pages/Installation.jsx";
import Architecture from "./pages/Architecture.jsx";
import Docs from "./pages/Docs.jsx";
import DocPage from "./pages/DocPage.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concepts" element={<Concepts />} />
        <Route path="/features" element={<Features />} />
        <Route path="/installation" element={<Installation />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:lang/:slug" element={<DocPage />} />
      </Routes>
    </Layout>
  );
}
