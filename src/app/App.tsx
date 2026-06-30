import { useState } from "react";
import HomePage from "./pages/Home";
import TemplateEditorPage from "./pages/TemplateEditor";
import TestGroupsPage from "./pages/TestGroups";
import { type AIChatSession, buildChatFromSession } from "./aiChat";

type Page = "home" | "template-editor" | "audience";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [chatSession, setChatSession] = useState<AIChatSession | null>(null);

  const openEditor = (session?: AIChatSession) => {
    setChatSession(session ?? null);
    setPage("template-editor");
  };

  return (
    <div className="w-full h-screen overflow-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {page === "home" && (
        <HomePage onNavigate={openEditor} onPageNavigate={setPage} />
      )}
      {page === "template-editor" && (
        <TemplateEditorPage
          onBack={() => setPage("home")}
          initialChat={chatSession ? buildChatFromSession(chatSession) : undefined}
        />
      )}
      {page === "audience" && (
        <TestGroupsPage onBack={() => setPage("home")} />
      )}
    </div>
  );
}
