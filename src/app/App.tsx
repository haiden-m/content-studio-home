import { useState } from "react";
import HomePage from "./pages/Home";
import TemplateEditorPage from "./pages/TemplateEditor";
import TestGroupsPage from "./pages/TestGroups";
import { type AIChatSession, buildChatFromSession } from "./aiChat";
import { type TestGroup, INITIAL_TEST_GROUPS } from "./data/testGroupsMock";

type Page = "home" | "template-editor" | "audience";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [chatSession, setChatSession] = useState<AIChatSession | null>(null);
  // Lifted so both TestGroups and TemplateEditor share the same list
  const [groups, setGroups] = useState<TestGroup[]>(INITIAL_TEST_GROUPS);

  const navigate = (target: string) => {
    if (target === "home" || target === "template-editor" || target === "audience") {
      setPage(target as Page);
    }
  };

  const openEditor = (session?: AIChatSession) => {
    setChatSession(session ?? null);
    setPage("template-editor");
  };

  return (
    <div className="w-full h-screen overflow-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {page === "home" && (
        <HomePage onNavigate={openEditor} onPageNavigate={navigate} />
      )}
      {page === "template-editor" && (
        <TemplateEditorPage
          onBack={() => setPage("home")}
          onNavigate={navigate}
          groups={groups}
          initialChat={chatSession ? buildChatFromSession(chatSession) : undefined}
        />
      )}
      {page === "audience" && (
        <TestGroupsPage
          onBack={() => setPage("home")}
          onNavigate={navigate}
          groups={groups}
          onGroupsChange={setGroups}
        />
      )}
    </div>
  );
}
