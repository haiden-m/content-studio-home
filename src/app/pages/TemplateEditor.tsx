import { useState, useRef } from "react";
import {
  Monitor, Smartphone, SlidersHorizontal, BadgeCheck,
  Palette, Settings, ArrowRight, Plus, Trash2,
  Code2, Sparkles, Clock, Maximize2, Mic, Send,
} from "lucide-react";

import imgVideoPlayer from "@/imports/MailSettings/f831acdc18bc5cf3e76b7f4c0324760bbc41c693.png";
import imgAppIcon from "@/imports/MailSettings/867be7e217c5dbe5b34b9cbfe159a6154ef09563.png";
import svgPaths from "@/imports/EmailTemplateEditorOptiAi/svg-zzsi5zbbwy";

import {
  ContentStudioSidebar, TopNav, EditorToolbar, EditorSecondaryTabs,
  type EditorTab,
} from "../shared";

// ─── OptiGenie brand icon (exact SVG from Figma) ─────────────────────────────

function OptiGenieIcon({ active = false }: { active?: boolean }) {
  const color = active ? "#604DD0" : "#475467";
  return (
    <div className="relative overflow-clip" style={{ width: 20, height: 20 }}>
      <div className="absolute" style={{ inset: "9.41% 14.29% 0 0" }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1425 18.1182">
          <path d={svgPaths.p3f79e180} fill={color} />
        </svg>
      </div>
      <div className="absolute" style={{ inset: "0 0 69.59% 70.48%" }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.9045 6.08245">
          <path d={svgPaths.p17125c80} fill={color} />
        </svg>
      </div>
    </div>
  );
}

// ─── Right toolbar (Settings / Palette / OptiGenie) ───────────────────────────

function RightToolbar({
  showChat, onToggleChat,
  showDetails, onToggleDetails,
}: {
  showChat: boolean; onToggleChat: () => void;
  showDetails: boolean; onToggleDetails: () => void;
}) {
  return (
    <div className="w-[72px] flex-shrink-0 bg-white border-l border-[#cfd8dc] flex flex-col items-center gap-2 pt-4">
      {/* Gear → Email Details panel */}
      <button
        onClick={onToggleDetails}
        title="Email Details"
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          showDetails ? "bg-[#e6e5fc]" : "hover:bg-[#f2f4f7]"
        }`}
      >
        <Settings size={18} color={showDetails ? "#604DD0" : "#475467"} strokeWidth={1.5} />
      </button>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#f2f4f7] transition-colors">
        <Palette size={18} color="#475467" strokeWidth={1.5} />
      </button>
      {/* OptiGenie → AI chat panel */}
      <button
        onClick={onToggleChat}
        title="Optimove AI"
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          showChat ? "bg-[#e6e5fc]" : "hover:bg-[#f2f4f7]"
        }`}
      >
        <OptiGenieIcon active={showChat} />
      </button>
    </div>
  );
}

// ─── OptiGenie AI chat panel ──────────────────────────────────────────────────

const INITIAL_CHAT = [
  { type: "file" as const },
  { type: "user" as const, text: "Create an email template for the champions league matches this week using the brief attached." },
  { type: "ai" as const, text: "Sure, let me create this for you.\n\n ✶   Reading attached brief\n\n ✶   Extracting details" },
];

function OptiGeniePanel() {
  const [messages, setMessages] = useState(INITIAL_CHAT as { type: string; text?: string }[]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { type: "user", text }, { type: "ai", text: "Got it! Applying those changes to your template now." }]);
    setInput("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div
      className="w-[413px] flex-shrink-0 bg-white border-l border-[#d0d5dd] flex flex-col"
      style={{ background: "linear-gradient(90deg, rgba(236,237,253,0.25) 0%, rgba(236,237,253,0.25) 100%)" }}
    >
      {/* Header */}
      <div className="h-[60px] border-b border-[#eaecf0] flex items-center pl-6 pr-3 flex-shrink-0 bg-[rgba(236,237,253,0.25)]">
        <span className="flex-1 text-xl font-medium text-[#101828]" style={{ fontFamily: "'Roboto', sans-serif" }}>
          Optimove AI
        </span>
        <button className="p-2 rounded-lg hover:bg-[#f2f4f7]"><Clock size={18} color="#475467" strokeWidth={1.5} /></button>
        <button className="p-2 rounded-lg hover:bg-[#f2f4f7]"><Maximize2 size={18} color="#475467" strokeWidth={1.5} /></button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        {messages.map((msg, i) => {
          if (msg.type === "file") {
            return (
              <div key={i} className="self-end max-w-[90%]">
                <div className="bg-white border border-[#eaecf0] rounded-lg rounded-tr-none p-3 flex items-center gap-3">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    {/* PDF icon */}
                    <div className="absolute inset-[0_10%_0_17.5%] border border-[#d0d5dd] rounded-sm bg-white" />
                    <div className="absolute bg-[#d92d20] rounded-sm px-0.5 py-px" style={{ inset: "45% 32.5% 15% 2.5%" }}>
                      <span className="text-white text-[8px] font-bold">PDF</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#344054] leading-5">Champions League Bet Week Brief.pdf</p>
                    <p className="text-sm text-[#475467]">1.6 MB</p>
                  </div>
                </div>
              </div>
            );
          }
          if (msg.type === "user") {
            return (
              <div key={i} className="self-end max-w-[90%]">
                <div className="bg-[#e6e5fc] rounded-lg rounded-tr-none px-3.5 py-2.5">
                  <p className="text-sm text-[#101828]" style={{ fontFamily: "'Roboto', sans-serif" }}>{msg.text}</p>
                </div>
              </div>
            );
          }
          // ai message
          return (
            <div key={i} className="self-start max-w-[90%]">
              <div className="rounded-lg rounded-tl-none px-3.5 py-2.5">
                <p className="text-sm text-[#101828] whitespace-pre-line" style={{ fontFamily: "'Roboto', sans-serif" }}>{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 pb-4 flex-shrink-0">
        <div className="border border-[#e6e5fc] rounded-lg shadow-[0px_4px_10px_0px_rgba(112,104,222,0.1)] overflow-hidden bg-white">
          <div className="px-3.5 pt-3 pb-1">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask me anything..."
              className="w-full resize-none text-sm text-[#344054] placeholder-[#667085] focus:outline-none"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            />
          </div>
          <div className="px-3 pb-2 flex items-center justify-between">
            <button className="w-8 h-8 rounded-full border border-[#d0d5dd] bg-white flex items-center justify-center shadow-sm hover:bg-[#f2f4f7]">
              <Plus size={14} color="#344054" />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-[#d0d5dd] bg-white flex items-center justify-center shadow-sm hover:bg-[#f2f4f7]">
                <Mic size={13} color="#344054" />
              </button>
              <button
                onClick={send}
                className="w-8 h-8 rounded-full border border-[#d0d5dd] bg-white flex items-center justify-center shadow-sm hover:bg-[#f2f4f7]"
              >
                <Send size={13} color="#344054" />
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-center text-[#667085] mt-2" style={{ fontFamily: "'Roboto', sans-serif" }}>
          Optimove AI may make mistakes, so double-check its response
        </p>
      </div>
    </div>
  );
}

// ─── Email Details panel (shown when AI chat is closed) ───────────────────────

function EmailDetailsPanel() {
  const [form, setForm] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="w-[390px] flex-shrink-0 bg-white border-l border-[#eaecf0] flex flex-col shadow-[-2px_0_6px_rgba(16,24,40,0.06)]">
      <div className="h-[60px] border-b border-[#eaecf0] flex items-center px-5 flex-shrink-0">
        <button className="text-base font-semibold text-[#101828] border-b-2 border-[#101828] pb-1 -mb-px">Email Details</button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#344054]">Subject</label>
          <div className="flex items-center gap-2">
            <input className="flex-1 h-10 border border-[#d0d5dd] rounded-lg px-3 text-sm text-[#667085] focus:outline-none focus:ring-1 focus:ring-[#7068de] focus:border-[#7068de]" value={form.subject ?? ""} onChange={(e) => set("subject", e.target.value)} />
            <SlidersHorizontal size={15} color="#98a2b3" className="flex-shrink-0" />
          </div>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-[#7068de]"><Plus size={13} />Add variant</button>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#344054]">Preview text</label>
          <div className="flex items-center gap-2">
            <input placeholder="Optional" className="flex-1 h-10 border border-[#d0d5dd] rounded-lg px-3 text-sm text-[#d0d5dd] focus:outline-none focus:ring-1 focus:ring-[#7068de]" value={form.preview ?? ""} onChange={(e) => set("preview", e.target.value)} />
            <SlidersHorizontal size={15} color="#98a2b3" className="flex-shrink-0" />
          </div>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-[#7068de]"><Plus size={13} />Add variant</button>
        </div>
        {[{ label: "From email", ph: "Select" }, { label: "From name", ph: "" }, { label: "Reply-to", ph: "Select" }, { label: "Topics", ph: "Select" }].map(({ label, ph }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#344054]">{label}</label>
            <input placeholder={ph} className="h-10 border border-[#d0d5dd] rounded-lg px-3 text-sm text-[#d0d5dd] focus:outline-none focus:ring-1 focus:ring-[#7068de]" value={form[label] ?? ""} onChange={(e) => set(label, e.target.value)} />
          </div>
        ))}
        <button className="flex items-center gap-2 text-sm font-bold text-[#7068de]"><BadgeCheck size={15} />UTM Parameters</button>
      </div>
    </div>
  );
}

// ─── Email template preview ───────────────────────────────────────────────────

function EmailPreview() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  return (
    <div className="flex-1 overflow-y-auto flex items-start px-4 py-6 gap-4">
      {/* Desktop / mobile toggle — left of the template */}
      <div className="flex-shrink-0 pt-1">
        <div className="inline-flex border border-[#d0d5dd] rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => setDevice("desktop")}
            className={`h-9 px-3 flex items-center border-r border-[#d0d5dd] transition-colors ${device === "desktop" ? "bg-[#604dd0]" : "bg-white hover:bg-[#f2f4f7]"}`}
          >
            <Monitor size={16} color={device === "desktop" ? "white" : "#63616D"} />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`h-9 px-3 flex items-center transition-colors ${device === "mobile" ? "bg-[#604dd0]" : "bg-white hover:bg-[#f2f4f7]"}`}
          >
            <Smartphone size={16} color={device === "mobile" ? "white" : "#63616D"} />
          </button>
        </div>
      </div>
      {/* Email template — centred within remaining space */}
      <div className="flex-1 flex justify-center">
      <div className={`bg-white rounded shadow-sm ${device === "mobile" ? "w-[375px]" : "w-full max-w-[660px]"} transition-all duration-300`}>
        <div style={{ padding: "0 32px" }}>
          <div className="relative rounded-lg overflow-hidden" style={{ height: 290 }}>
            <img src={imgVideoPlayer} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-black/20" />
            <div className="absolute top-4 left-4 w-11 h-11 rounded-xl overflow-hidden shadow-lg">
              <img src={imgAppIcon} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bg-[#175cd3] border border-white rounded px-3 py-1.5" style={{ bottom: 28, right: "22%", left: "64%" }}>
              <span className="text-white text-[11px] font-semibold tracking-wide">MATCH WEEKEND</span>
            </div>
            <div className="absolute inset-x-8 text-center" style={{ top: 110 }}>
              <p className="text-white text-4xl font-bold tracking-tight drop-shadow-[0_8px_16px_black]">
                CHAMPIONS LEAGUE WEEKEND
              </p>
            </div>
          </div>
        </div>
        <div className="px-8 py-7 flex flex-col items-center gap-5">
          <h2 className="text-3xl font-semibold text-[#101828] text-center">🔥 Your Chance to Win BIG! ⚽️</h2>
          <p className="text-base font-bold text-[#475467] text-center">
            Champions league games this weekend mean more opportunities to watch your favourite team and win Big!
          </p>
          <button className="h-12 px-9 bg-[#101828] rounded-full text-white text-xl font-bold flex items-center gap-2 border border-[#7068de]">
            Place Bet <ArrowRight size={15} />
          </button>
          <p className="text-base font-bold text-[#475467] text-center">🔥 Our Top Picks for You:</p>
        </div>
      </div>
      </div>
    </div>
  );
}

// ─── Workbench view ───────────────────────────────────────────────────────────

interface VariantRow { id: number; name: string; subjectLine: string; previewText: string; bodyContent: string }
const INITIAL_VARIANTS: VariantRow[] = [1, 2, 3, 4].map((id) => ({
  id, name: `Variant ${id}`, subjectLine: "", previewText: "", bodyContent: "",
}));
const COLUMNS = [
  { key: "subjectLine" as const, label: "Subject Line" },
  { key: "previewText" as const,  label: "Preview Text" },
  { key: "bodyContent" as const,  label: "Bet Amount Intro" },
];

function WorkbenchView() {
  const [variants, setVariants] = useState<VariantRow[]>(INITIAL_VARIANTS);
  const [innerTab, setInnerTab] = useState<"variants" | "data">("variants");
  const updateVariant = (id: number, key: keyof VariantRow, val: string) =>
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, [key]: val } : v)));

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="flex flex-col gap-6 p-6">
        <div className="bg-[#f9fafb] rounded-xl border border-[#eaecf0] flex items-center px-1.5 py-1.5 relative">
          {(["variants", "data"] as const).map((t) => (
            <button key={t} onClick={() => setInnerTab(t)} className={`h-11 px-3 rounded-lg text-base font-semibold transition-colors ${innerTab === t ? "bg-white shadow-sm text-[#344054]" : "text-[#667085]"}`}>
              {t === "variants" ? "Variants" : "Data Connections"}
            </button>
          ))}
          <button className="absolute right-2 h-11 px-3 rounded-lg text-base font-semibold text-[#667085] flex items-center gap-2 hover:text-[#344054]">
            <Code2 size={17} /> Code Editor
          </button>
        </div>
        <div className="pb-4 border-b border-[#eaecf0]">
          <p className="text-base font-semibold text-[#101828]">Variants</p>
          <p className="text-sm text-[#475467] mt-0.5">Create multiple variations of your content to test different approaches</p>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 bg-white rounded-xl border border-[#eaecf0] overflow-hidden">
            <div className="flex border-b border-[#eaecf0]">
              <div className="w-[160px] flex-shrink-0 bg-[#f9fafb] h-11 flex items-center px-5 border-r border-[#eaecf0]">
                <span className="text-xs font-medium text-[#475467]">Component</span>
              </div>
              {COLUMNS.map((col) => (
                <div key={col.key} className="flex-1 bg-[#f9fafb] h-11 flex items-center justify-between px-5 border-r border-[#eaecf0] last:border-r-0">
                  <span className="text-xs font-medium text-[#475467]">{col.label}</span>
                  <Trash2 size={13} color="#475467" />
                </div>
              ))}
            </div>
            {variants.map((variant) => (
              <div key={variant.id} className="flex border-b border-[#eaecf0] last:border-b-0">
                <div className="w-[160px] flex-shrink-0 h-[212px] flex items-center justify-between px-5 border-r border-[#eaecf0]">
                  <span className="text-sm font-medium text-[#101828]">{variant.name}</span>
                  <button onClick={() => setVariants((p) => p.filter((v) => v.id !== variant.id))}>
                    <Trash2 size={13} color="#475467" />
                  </button>
                </div>
                {COLUMNS.map((col) => (
                  <div key={col.key} className="flex-1 border-r border-[#eaecf0] last:border-r-0 relative h-[212px] p-4">
                    <div className="h-full bg-white border border-[#d0d5dd] rounded-lg shadow-sm overflow-hidden">
                      <textarea className="w-full h-full px-3 pt-3 text-sm text-[#667085] resize-none focus:outline-none" placeholder={`Enter ${col.label.toLowerCase()}...`} value={variant[col.key]} onChange={(e) => updateVariant(variant.id, col.key, e.target.value)} />
                    </div>
                    <button className="absolute bottom-6 right-6 text-[#98a2b3]"><SlidersHorizontal size={13} /></button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="w-5 flex items-center justify-center">
            <div className="-rotate-90 flex items-center gap-1.5 whitespace-nowrap">
              <Plus size={15} color="#475467" /><span className="text-sm font-semibold text-[#475467]">Component</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-4">
            <button onClick={() => setVariants((p) => [...p, { id: p.length + 1, name: `Variant ${p.length + 1}`, subjectLine: "", previewText: "", bodyContent: "" }])} className="flex items-center gap-1.5 text-sm font-semibold text-[#475467]">
              <Plus size={15} strokeWidth={2} /> Variant
            </button>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-[#98a2b3]">
              <Sparkles size={15} /> Generate AI variants
            </button>
          </div>
          <button className="h-10 px-3 bg-white border border-[#a4a3f3] rounded-lg text-sm font-semibold text-[#604dd0] flex items-center gap-1.5 shadow-sm hover:bg-[#f5f4ff]">
            <Plus size={15} /> Experiment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Template Editor Page ─────────────────────────────────────────────────────

interface TemplateEditorProps {
  onBack?: () => void;
  initialTab?: EditorTab;
}

export default function TemplateEditorPage({ onBack = () => {}, initialTab = "content" }: TemplateEditorProps) {
  const [showChat, setShowChat] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<EditorTab>(initialTab);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — ContentStudio style (80px, #3c378e) matching the loading frame */}
      <ContentStudioSidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav />
        <EditorToolbar onBack={onBack} />
        <EditorSecondaryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main content area */}
        {activeTab === "content" && (
          <div className="flex-1 flex overflow-hidden bg-[#eaecf0]">
            <EmailPreview />
            {showDetails && <EmailDetailsPanel />}
            {showChat && <OptiGeniePanel />}
            <RightToolbar
              showChat={showChat} onToggleChat={() => setShowChat((v) => !v)}
              showDetails={showDetails} onToggleDetails={() => setShowDetails((v) => !v)}
            />
          </div>
        )}

        {activeTab === "workbench" && (
          <div className="flex-1 flex overflow-hidden bg-white">
            <WorkbenchView />
            {showChat && <OptiGeniePanel />}
            <RightToolbar
              showChat={showChat} onToggleChat={() => setShowChat((v) => !v)}
              showDetails={showDetails} onToggleDetails={() => setShowDetails((v) => !v)}
            />
          </div>
        )}

        {activeTab === "preview" && (
          <div className="flex-1 flex overflow-hidden bg-[#f2f4f7]">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-[#667085]">Preview coming soon</p>
            </div>
            <RightToolbar
              showChat={showChat} onToggleChat={() => setShowChat((v) => !v)}
              showDetails={showDetails} onToggleDetails={() => setShowDetails((v) => !v)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
