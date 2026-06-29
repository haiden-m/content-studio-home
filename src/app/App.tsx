import { useState } from "react";
import HomePage from "./pages/Home";
import TemplateEditorPage from "./pages/TemplateEditor";

type Page = "home" | "template-editor";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="w-full h-screen overflow-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {page === "home" && (
        <HomePage onNavigate={() => setPage("template-editor")} />
      )}
      {page === "template-editor" && (
        <TemplateEditorPage onBack={() => setPage("home")} />
      )}
    </div>
  );
}
