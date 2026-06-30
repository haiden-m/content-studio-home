import { useState, useRef, useEffect, useMemo, Fragment, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import {
  SlidersHorizontal, BadgeCheck,
  Palette, Settings, ArrowRight, Plus, Trash2,
  Code2, Sparkles, Clock, FileText, Flag,
  Minimize2, X, Database, GitBranch, Wand2, ChevronUp, ChevronDown,
  Search, User, ArrowLeft, LayoutGrid, Square, Maximize2, Check, Shuffle,
  Monitor, Smartphone, Mail, FileDown, Link2, Copy, Globe, Send, UserPlus, Lock,
} from "lucide-react";

import svgPaths from "@/imports/EmailTemplateEditorOptiAi/svg-zzsi5zbbwy";
import { EmailTemplatePreview, DEFAULT_EMAIL_SUBJECT } from "../components/EmailTemplatePreview";
import {
  PersonalisationPicker,
  type PersonalisationPickerAnchor,
} from "../components/PersonalisationPicker";
import { OptiGeniePanelV3, isV3Available } from "../components/OptiGeniePanelV3";
import {
  DEFAULT_TEMPLATE_CONTENT,
  type PersonalisationOption,
  type TemplateContent,
  type TemplateFieldId,
} from "../templateContent";

import {
  ContentStudioSidebar, TopNav, EditorToolbar, EditorSecondaryTabs,
  type EditorTab,
} from "../shared";
import {
  AI_TYPING_RESPONSE,
  DEFAULT_CHAT,
  type ChatMessage,
  type ChatAttachment,
} from "../aiChat";

const RIGHT_PANEL_CLASS =
  "w-[413px] flex-shrink-0 bg-white border-l border-[#d0d5dd] flex flex-col min-h-0";

// ─── Loading spinner ──────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-16 h-16 animate-spin" style={{ animationDuration: "1.2s" }}>
        <svg viewBox="0 0 64 64" className="w-full h-full">
          {Array.from({ length: 12 }).map((_, i) => {
            const rad = (i / 12) * 2 * Math.PI;
            const x = 32 + 24 * Math.sin(rad);
            const y = 32 - 24 * Math.cos(rad);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={3.5}
                fill="#7068de"
                opacity={0.1 + (i / 11) * 0.9}
              />
            );
          })}
        </svg>
      </div>
      <span
        className="text-lg font-medium text-[#344054]"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        Loading...
      </span>
    </div>
  );
}

// ─── OptiGenie brand icon ─────────────────────────────────────────────────────

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

// ─── Right toolbar ────────────────────────────────────────────────────────────

function RightToolbar({
  activePanel,
  onSelectChat,
  onSelectDetails,
}: {
  activePanel: "chat" | "details" | null;
  onSelectChat: () => void;
  onSelectDetails: () => void;
}) {
  return (
    <div className="w-[72px] flex-shrink-0 bg-white border-l border-[#cfd8dc] flex flex-col items-center gap-2 pt-4">
      <button
        onClick={onSelectDetails}
        title="Email Details"
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          activePanel === "details" ? "bg-[#e6e5fc]" : "hover:bg-[#f2f4f7]"
        }`}
      >
        <Settings size={18} color={activePanel === "details" ? "#604DD0" : "#475467"} strokeWidth={1.5} />
      </button>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#f2f4f7] transition-colors">
        <Palette size={18} color="#475467" strokeWidth={1.5} />
      </button>
      <button
        onClick={onSelectChat}
        title="Optimove AI"
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          activePanel === "chat" ? "bg-[#e6e5fc]" : "hover:bg-[#f2f4f7]"
        }`}
      >
        <OptiGenieIcon active={activePanel === "chat"} />
      </button>
    </div>
  );
}

// ─── Typing indicator (three animated dots) ───────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-end gap-1.5 px-2.5 py-2.5 rounded-bl-lg rounded-br-lg rounded-tr-lg">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#667085]"
          style={{
            animation: "typing-dot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── OptiGenie AI chat panel ──────────────────────────────────────────────────

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ChatFileBubble({ file }: { file: ChatAttachment }) {
  return (
    <div className="bg-white border border-[#eaecf0] rounded-bl-lg rounded-br-lg rounded-tl-lg p-3 flex items-center gap-3 max-w-[90%]">
      {file.kind === "image" && file.previewUrl ? (
        <img src={file.previewUrl} alt={file.name} className="size-10 rounded object-cover shrink-0 border border-[#eaecf0]" />
      ) : (
        <div className="relative size-10 shrink-0">
          <div className="size-10 rounded border border-[#d0d5dd] bg-[#f9fafb] flex items-center justify-center">
            <FileText size={18} color="#667085" strokeWidth={1.5} />
          </div>
          <span className={`absolute bottom-0 left-0 px-1 py-px rounded text-[8px] font-bold text-white leading-none ${file.extension === "PDF" ? "bg-[#d92d20]" : "bg-[#175cd3]"}`}>
            {file.extension}
          </span>
        </div>
      )}
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#344054] leading-5 truncate" style={{ fontFamily: "'Roboto', sans-serif" }}>{file.name}</p>
        <p className="text-sm text-[#475467]" style={{ fontFamily: "'Roboto', sans-serif" }}>{formatFileSize(file.size)}</p>
      </div>
    </div>
  );
}

// Hero icon shown in the welcome state
function OptimoveHeroIcon() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="44" stroke="#c3bff5" strokeWidth="1.5" />
      <rect x="27" y="27" width="46" height="46" rx="8" stroke="#7068de" strokeWidth="1.2" strokeOpacity="0.55" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="15" fill="#d8f562" />
      <circle cx="50" cy="50" r="10" fill="#c4ea35" />
    </svg>
  );
}

// Feature card icon containers
function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="size-[48px] rounded-[10px] bg-[#f0effe] flex items-center justify-center flex-shrink-0">
      {children}
    </div>
  );
}

const ACTION_CARDS = [
  {
    title: "Personalize",
    description: "Add dynamic customer data to your content",
    icon: <FeatureIcon><Database size={22} color="#3c378e" strokeWidth={1.5} /></FeatureIcon>,
  },
  {
    title: "Content Decisioning",
    description: "Generate A/B/N tests of your content",
    icon: <FeatureIcon><GitBranch size={22} color="#3c378e" strokeWidth={1.5} /></FeatureIcon>,
  },
  {
    title: "Generate Visual Assets",
    description: "Create or edit images using AI",
    icon: <FeatureIcon><Wand2 size={22} color="#3c378e" strokeWidth={1.5} /></FeatureIcon>,
  },
];

function OptiGeniePanel({ initialMessages }: { initialMessages?: ChatMessage[] }) {
  // Empty by default → shows welcome state. initialMessages pre-populates for content tab.
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages ?? []);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const resolveTypingOnMount = useRef(
    initialMessages?.[initialMessages.length - 1]?.type === "typing",
  );

  useEffect(() => {
    if (!resolveTypingOnMount.current) return;
    resolveTypingOnMount.current = false;
    const timer = setTimeout(() => {
      setMessages((m) => [...m.filter((msg) => msg.type !== "typing"), { type: "ai", text: AI_TYPING_RESPONSE }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const send = (text?: string) => {
    const t = (text ?? input).trim();
    if (!t) return;
    setMessages((m) => [...m.filter((msg) => msg.type !== "typing"), { type: "user", text: t }, { type: "typing" }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m.filter((msg) => msg.type !== "typing"), { type: "ai", text: "Got it! Applying those changes to your template now." }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 1500);
  };

  const hasUserMessages = messages.some((m) => m.type === "user");

  // Shared input bar
  const inputBar = (
    <div className="flex flex-col gap-1.5">
      <div className="bg-white border border-[#5644b0] rounded-lg shadow-sm overflow-hidden">
        <div className="px-3.5 pt-3">
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask me anything..."
            className="w-full resize-none text-base text-[#344054] placeholder-[#667085] focus:outline-none bg-transparent"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          />
        </div>
        <div className="px-3 pb-3 flex items-center justify-end">
          <button
            onClick={() => send()}
            className="w-10 h-10 bg-[#f2f4f7] border border-[#f2f4f7] rounded-lg flex items-center justify-center hover:bg-[#e8eaed] transition-colors"
          >
            <ArrowRight size={16} color="#475467" strokeWidth={2} />
          </button>
        </div>
      </div>
      <p className="text-xs text-[#667085] text-center" style={{ fontFamily: "'Roboto', sans-serif" }}>
        OptiGenie may make mistakes, so double-check its response.
      </p>
    </div>
  );

  return (
    <div
      className={`${RIGHT_PANEL_CLASS} flex flex-col`}
      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.95) 66.837%, rgba(230,229,252,0.5) 100%), white" }}
    >
      {/* Header */}
      <div className="flex items-center pl-5 pr-2 border-b border-[#eaecf0] flex-shrink-0 h-[60px]">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg font-semibold text-[#101828]" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Optimove AI
          </span>
          <span className="bg-[#ecfdf3] border border-[#abefc6] text-[#067647] text-xs font-medium px-2 py-0.5 rounded-full" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Beta
          </span>
        </div>
        <div className="flex items-center">
          <button className="p-3 rounded-lg hover:bg-[#f2f4f7] text-[#475467]" title="History">
            <Clock size={18} strokeWidth={1.5} />
          </button>
          <button className="p-3 rounded-lg hover:bg-[#f2f4f7] text-[#475467]" title="Minimize">
            <Minimize2 size={18} strokeWidth={1.5} />
          </button>
          <button className="p-3 rounded-lg hover:bg-[#f2f4f7] text-[#475467]" title="Close">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {!hasUserMessages ? (
        /* ── Welcome state ── */
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto px-5 py-6">
          <div className="flex-1 flex flex-col items-center justify-center gap-10">
            {/* Hero icon + prompt */}
            <div className="flex flex-col items-center gap-5">
              <OptimoveHeroIcon />
              <p className="text-xl font-medium text-[#344054] text-center" style={{ fontFamily: "'Roboto', sans-serif" }}>
                How can I help you today?
              </p>
            </div>
            {/* Action cards */}
            <div className="flex flex-col gap-3 w-full">
              {ACTION_CARDS.map((card) => (
                <button
                  key={card.title}
                  onClick={() => send(card.title)}
                  className="bg-[#fafbff] border border-[#d8d8fa] rounded-xl p-4 flex items-center gap-[18px] text-left hover:bg-[#f5f4ff] transition-colors w-full"
                >
                  {card.icon}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#101828]" style={{ fontFamily: "'Roboto', sans-serif" }}>
                      {card.title}
                    </p>
                    <p className="text-sm text-[#475467]" style={{ fontFamily: "'Roboto', sans-serif" }}>
                      {card.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Input pinned to bottom of welcome state */}
          <div className="mt-6">{inputBar}</div>
        </div>
      ) : (
        /* ── Chat thread state ── */
        <div className="flex-1 flex flex-col min-h-0">
          <div
            className="flex-1 overflow-y-auto flex flex-col justify-end px-6 py-4"
            style={{ background: "radial-gradient(ellipse 320px 280px at 50% 100%, rgba(236,237,253,0.85) 0%, rgba(255,255,255,0) 70%)" }}
          >
            <div className="flex flex-col gap-4">
              {messages.map((msg, i) => {
                if (msg.type === "file") return (
                  <div key={i} className="flex justify-end"><ChatFileBubble file={msg.file} /></div>
                );
                if (msg.type === "user") return (
                  <div key={i} className="flex justify-end">
                    <div className="bg-[#e6e5fc] rounded-bl-lg rounded-br-lg rounded-tl-lg px-3.5 py-2.5 max-w-[90%]">
                      <p className="text-sm text-[#101828]" style={{ fontFamily: "'Roboto', sans-serif" }}>{msg.text}</p>
                    </div>
                  </div>
                );
                if (msg.type === "typing") return (
                  <div key={i} className="flex justify-start"><TypingDots /></div>
                );
                return (
                  <div key={i} className="flex justify-start">
                    <div className="px-3.5 pt-2.5 rounded-bl-lg rounded-br-lg rounded-tr-lg max-w-[90%]">
                      <p className="text-sm text-[#101828] whitespace-pre-line" style={{ fontFamily: "'Roboto', sans-serif" }}>{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          </div>
          <div className="px-5 pb-5 flex-shrink-0">{inputBar}</div>
        </div>
      )}
    </div>
  );
}

const FIXED_COLUMNS = {
  subjectLine: { label: "Subject Line" },
  previewText: { label: "Preview Text" },
} as const;

type FixedColumnKey = keyof typeof FIXED_COLUMNS;

interface WorkbenchColumn {
  id: string;
  type: FixedColumnKey | "bodyTag";
  label: string;
}

interface EmailFormState {
  subject: string;
  preview: string;
  [key: string]: string;
}

// ─── Workbench / Plain text view ──────────────────────────────────────────────

interface VariantRow {
  id: number;
  name: string;
  subjectLine: string;
  previewText: string;
  bodyTags: Record<string, string>;
}

function createVariantRow(id: number, partial: Partial<VariantRow> = {}): VariantRow {
  return {
    id,
    name: `Variant ${id}`,
    subjectLine: "",
    previewText: "",
    bodyTags: {},
    ...partial,
  };
}

function getVariantCellValue(variant: VariantRow, col: WorkbenchColumn): string {
  if (col.type === "bodyTag") return variant.bodyTags[col.id] ?? "";
  return variant[col.type];
}

function setVariantCellValue(variant: VariantRow, col: WorkbenchColumn, val: string): VariantRow {
  if (col.type === "bodyTag") {
    return { ...variant, bodyTags: { ...variant.bodyTags, [col.id]: val } };
  }
  return { ...variant, [col.type]: val };
}

function isVariantRowComplete(variant: VariantRow, columns: WorkbenchColumn[]): boolean {
  return columns.every((col) => getVariantCellValue(variant, col).trim().length > 0);
}

function mutateFieldForAiVariant(
  base: string,
  col: WorkbenchColumn,
  variantIndex: number,
): string {
  if (!base.trim()) return base;

  if (col.type === "subjectLine") {
    if (variantIndex === 0) {
      return base.includes("—")
        ? base.replace(/—.*/, "— Don't Miss Tonight's Fixtures!")
        : `${base} — Don't miss out!`;
    }
    return `🔥 ${base.replace(/^🔥\s*/, "")}`;
  }

  if (col.type === "previewText") {
    if (variantIndex === 0) return `${base} Tap in before kick-off.`;
    return base.replace(/Big/g, "BIG").replace(/\.$/, "!");
  }

  if (col.type === "bodyTag") {
    if (variantIndex === 0) return base.replace(/win Big/gi, "win bigger");
    return `${base} Place your bet now.`;
  }

  return base;
}

function generateAiVariantsFromFirst(
  first: VariantRow,
  columns: WorkbenchColumn[],
): VariantRow[] {
  const generated = [0, 1].map((variantIndex) => {
    let row = createVariantRow(variantIndex + 2);
    columns.forEach((col) => {
      row = setVariantCellValue(
        row,
        col,
        mutateFieldForAiVariant(getVariantCellValue(first, col), col, variantIndex),
      );
    });
    return row;
  });

  return [first, ...generated];
}

let bodyTagIdCounter = 0;
function nextBodyTagId() {
  bodyTagIdCounter += 1;
  return `body-tag-${bodyTagIdCounter}`;
}

const INITIAL_COLUMNS: WorkbenchColumn[] = [
  { id: "subjectLine", type: "subjectLine", label: FIXED_COLUMNS.subjectLine.label },
];

const ADDABLE_COMPONENTS = [
  { type: "previewText" as const, label: "Preview text" },
  { type: "bodyTag" as const, label: "Body tag" },
];

function BodyTagNameModal({
  existingNames,
  onConfirm,
  onCancel,
}: {
  existingNames: string[];
  onConfirm: (name: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmed = name.trim();
  const isDuplicate = existingNames.some(
    (n) => n.toLowerCase() === trimmed.toLowerCase(),
  );
  const canConfirm = trimmed.length > 0 && !isDuplicate;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-8 py-8">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#0c111d]/70 backdrop-blur-md"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-xl shadow-[0px_0px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] w-full max-w-[400px]">
        <div className="relative pt-6 px-6 pb-5">
          <div className="size-12 rounded-[10px] border border-[#eaecf0] shadow-sm flex items-center justify-center mb-4">
            <Flag size={22} className="text-[#344054]" strokeWidth={1.75} />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 size-11 flex items-center justify-center rounded-lg text-[#667085] hover:bg-[#f2f4f7] hover:text-[#344054] transition-colors"
          >
            <X size={20} />
          </button>
          <h2
            className="text-lg font-semibold text-[#101828] leading-7"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Body
          </h2>
          <p
            className="text-sm text-[#475467] mt-1 leading-5"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Please enter the name of this body tag, it will appear with this name in preview.
          </p>
        </div>

        <div className="px-6 pb-8">
          <label
            className="block text-sm font-medium text-[#344054] mb-1.5"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Body Name
          </label>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canConfirm) onConfirm(trimmed);
              if (e.key === "Escape") onCancel();
            }}
            placeholder="e.g. CTA"
            className={`w-full px-3.5 py-2.5 text-base text-[#101828] placeholder:text-[#667085] border rounded-lg shadow-sm focus:outline-none focus:ring-1 ${
              isDuplicate && trimmed
                ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                : "border-[#d0d5dd] focus:ring-[#7068de] focus:border-[#7068de]"
            }`}
            style={{ fontFamily: "'Roboto', sans-serif" }}
          />
          {isDuplicate && trimmed && (
            <p className="text-sm text-red-500 mt-1.5" style={{ fontFamily: "'Roboto', sans-serif" }}>
              A body tag with this name already exists.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 px-4 rounded-lg border border-[#d0d5dd] bg-white text-base font-semibold text-[#344054] shadow-sm hover:bg-[#f9fafb]"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={() => onConfirm(trimmed)}
            className="h-10 px-4 rounded-lg text-base font-semibold shadow-sm transition-colors disabled:bg-[#f2f4f7] disabled:text-[#98a2b3] disabled:border disabled:border-[#f2f4f7] enabled:bg-[#7068de] enabled:text-white enabled:hover:bg-[#5f57cc]"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function DeleteColumnModal({
  columnLabel,
  onConfirm,
  onCancel,
}: {
  columnLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-8 py-8">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#0c111d]/70 backdrop-blur-md"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-xl shadow-[0px_0px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] w-full max-w-[400px]">
        <div className="relative pt-6 px-6">
          <div className="size-12 rounded-full bg-[#fee4e2] flex items-center justify-center mb-4">
            <Trash2 size={22} className="text-[#d92d20]" strokeWidth={1.75} />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-4 right-4 size-11 flex items-center justify-center rounded-lg text-[#667085] hover:bg-[#f2f4f7] hover:text-[#344054] transition-colors"
          >
            <X size={20} />
          </button>
          <h2
            className="text-lg font-semibold text-[#101828] leading-7"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Delete {columnLabel}?
          </h2>
          <div
            className="text-sm text-[#475467] mt-1 leading-5"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            <p className="mb-3.5">Are you sure you want to delete this component?</p>
            <p>This action will delete all variants for this component.</p>
          </div>
        </div>

        <div className="flex gap-3 px-6 pt-8 pb-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-11 rounded-lg border border-[#d0d5dd] bg-white text-base font-semibold text-[#344054] shadow-sm hover:bg-[#f9fafb]"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 h-11 rounded-lg text-base font-semibold text-white bg-[#d92d20] border border-[#d92d20] shadow-sm hover:bg-[#b42318]"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function AddComponentDrawer({
  hasPreviewText,
  onSelect,
}: {
  hasPreviewText: boolean;
  onSelect: (type: "previewText" | "bodyTag") => void;
}) {
  return (
    <div className="bg-white border border-[#eaecf0] rounded-xl shadow-[0px_0px_48px_-12px_rgba(16,24,40,0.18)] overflow-hidden py-1 flex flex-col gap-2.5 min-w-[140px]">
      {ADDABLE_COMPONENTS.map((opt) => {
        const isDisabled = opt.type === "previewText" && hasPreviewText;
        return (
          <button
            key={opt.type}
            type="button"
            disabled={isDisabled}
            onClick={() => onSelect(opt.type)}
            className="w-full px-1.5 py-px text-left disabled:cursor-default"
          >
            <div
              className={`pl-2 pr-2.5 py-2.5 rounded-md w-full transition-colors ${
                isDisabled ? "" : "hover:bg-[#f9fafb] cursor-pointer"
              }`}
            >
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  isDisabled ? "text-[#667085]" : "text-[#475467]"
                }`}
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                {opt.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Email Details panel ──────────────────────────────────────────────────────

function VariantCountPill({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-[#5925dc] bg-[#f4f3ff] border border-[#d9d6fe] whitespace-nowrap"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {count} Variants
    </span>
  );
}

function EmailDetailsVariantField({
  label,
  placeholder,
  value,
  onChange,
  variantCount,
  showPill,
  onManageVariants,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  variantCount: number;
  showPill: boolean;
  onManageVariants: () => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex gap-2 items-end">
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <label
            className="text-sm font-medium text-[#344054]"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {label}
          </label>
          <div className="relative">
            {showPill ? (
              <div className="w-full h-10 border border-[#d0d5dd] rounded-lg px-3 shadow-sm flex items-center bg-white">
                <VariantCountPill count={variantCount} />
              </div>
            ) : (
              <input
                className="w-full h-10 border border-[#d0d5dd] rounded-lg px-3 text-base text-[#667085] placeholder:text-[#d0d5dd] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#7068de] focus:border-[#7068de]"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          </div>
        </div>
        <div className="h-10 flex items-center shrink-0">
          <Shuffle
            size={20}
            className={showPill ? "text-[#7068de]" : "text-[#98a2b3]"}
            strokeWidth={showPill ? 2 : 1.75}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onManageVariants}
        className="flex items-center gap-1.5 text-sm font-semibold text-[#7068de] hover:text-[#5f57cc] w-fit"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {showPill ? (
          "Manage variants"
        ) : (
          <>
            <Plus size={13} />
            Add variant
          </>
        )}
      </button>
    </div>
  );
}

function EmailDetailsPanel({
  form,
  onFieldChange,
  onAddVariant,
  subjectVariantCount,
  previewVariantCount,
  showSubjectPill,
  showPreviewPill,
}: {
  form: EmailFormState;
  onFieldChange: (key: string, value: string) => void;
  onAddVariant: (field: "subjectLine" | "previewText") => void;
  subjectVariantCount: number;
  previewVariantCount: number;
  showSubjectPill: boolean;
  showPreviewPill: boolean;
}) {
  return (
    <div className={`${RIGHT_PANEL_CLASS} shadow-[-2px_0_6px_rgba(16,24,40,0.06)]`}>
      <div className="h-[60px] border-b border-[#eaecf0] flex items-center px-5 flex-shrink-0">
        <span className="text-base font-semibold text-[#101828]">Email Details</span>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
        <EmailDetailsVariantField
          label="Subject"
          value={form.subject}
          onChange={(v) => onFieldChange("subject", v)}
          variantCount={subjectVariantCount}
          showPill={showSubjectPill}
          onManageVariants={() => onAddVariant("subjectLine")}
        />
        <EmailDetailsVariantField
          label="Preview text"
          placeholder="Optional"
          value={form.preview}
          onChange={(v) => onFieldChange("preview", v)}
          variantCount={previewVariantCount}
          showPill={showPreviewPill}
          onManageVariants={() => onAddVariant("previewText")}
        />
        {[
          { label: "From email", ph: "Select" },
          { label: "From name", ph: "" },
          { label: "Reply-to", ph: "Select" },
          { label: "Topics", ph: "Select" },
        ].map(({ label, ph }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#344054]">{label}</label>
            <input
              placeholder={ph}
              className="h-10 border border-[#d0d5dd] rounded-lg px-3 text-sm text-[#667085] placeholder:text-[#d0d5dd] focus:outline-none focus:ring-1 focus:ring-[#7068de]"
              value={form[label] ?? ""}
              onChange={(e) => onFieldChange(label, e.target.value)}
            />
          </div>
        ))}
        <button className="flex items-center gap-2 text-sm font-bold text-[#7068de]">
          <BadgeCheck size={15} />UTM Parameters
        </button>
      </div>
    </div>
  );
}

// ─── Email preview area ───────────────────────────────────────────────────────

function EmailPreview({
  loaded,
  content,
  onContentChange,
}: {
  loaded: boolean;
  content: TemplateContent;
  onContentChange: (content: TemplateContent) => void;
}) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [activeField, setActiveField] = useState<TemplateFieldId | null>(null);
  const [picker, setPicker] = useState<{
    fieldId: TemplateFieldId;
    anchor: PersonalisationPickerAnchor;
  } | null>(null);

  const handleFieldClick = (
    fieldId: TemplateFieldId,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setActiveField(fieldId);
    setPicker({
      fieldId,
      anchor: { top: rect.bottom + 8, left: rect.left },
    });
  };

  const closePicker = () => {
    setPicker(null);
    setActiveField(null);
  };

  const handleSelect = (option: PersonalisationOption) => {
    if (!picker) return;
    onContentChange({ ...content, [picker.fieldId]: option.value });
    closePicker();
  };

  return (
    <div className="flex-1 overflow-y-auto flex items-start px-4 py-6 gap-4 min-w-0">
      <div className="flex-shrink-0 pt-1">
        <div className="inline-flex border border-[#d0d5dd] rounded-lg overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`h-9 px-3 flex items-center border-r border-[#d0d5dd] transition-colors ${
              device === "desktop" ? "bg-[#604dd0]" : "bg-white hover:bg-[#f2f4f7]"
            }`}
          >
            <Monitor size={16} color={device === "desktop" ? "white" : "#63616D"} />
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`h-9 px-3 flex items-center transition-colors ${
              device === "mobile" ? "bg-[#604dd0]" : "bg-white hover:bg-[#f2f4f7]"
            }`}
          >
            <Smartphone size={16} color={device === "mobile" ? "white" : "#63616D"} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center min-w-0">
        {loaded ? (
          <div
            className={`bg-white border border-[#eaecf0] rounded-lg shadow-sm overflow-hidden shrink-0 ${
              device === "mobile" ? "w-[375px]" : "w-full max-w-[660px]"
            }`}
          >
            <EmailTemplatePreview
              content={content}
              editable={loaded}
              activeField={activeField}
              onFieldClick={handleFieldClick}
            />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>

      {picker && (
        <PersonalisationPicker
          anchor={picker.anchor}
          onSelect={handleSelect}
          onClose={closePicker}
        />
      )}
    </div>
  );
}

// ─── Smart Preview tab ───────────────────────────────────────────────────────

const ROBOTO = { fontFamily: "'Roboto', sans-serif" } as const;

type ContentVersion = "Auto" | "Variant 1" | "Variant 2" | "Variant 3" | "Variant 4";
const CONTENT_VERSIONS: ContentVersion[] = ["Auto", "Variant 1", "Variant 2", "Variant 3", "Variant 4"];

function PreviewOptionsPanel({
  selectedVariant,
  onSelectVariant,
  onClose,
  anchorEl,
}: {
  selectedVariant: string | null;
  onSelectVariant: (v: string | null) => void;
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isAllMode = selectedVariant === null;

  // Compute position once from the anchor at the time the panel renders
  const panelStyle = useMemo<React.CSSProperties>(() => {
    if (!anchorEl) return { display: "none" };
    const rect = anchorEl.getBoundingClientRect();
    return {
      position: "fixed",
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
      zIndex: 200,
    };
  }, [anchorEl]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current?.contains(e.target as Node) ||
        anchorEl?.contains(e.target as Node)
      ) return;
      onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [anchorEl, onClose]);

  return createPortal(
    <div
      ref={panelRef}
      style={panelStyle}
      className="bg-white rounded-2xl border border-[#eaecf0] shadow-[0px_12px_32px_rgba(16,24,40,0.12),0px_4px_8px_rgba(16,24,40,0.06)] w-[180px] overflow-hidden"
    >
      {/* Flat list */}
      <div className="px-2 py-2 flex flex-col gap-0.5">
        {CONTENT_VERSIONS.map((version) => {
          const isAuto = version === "Auto";
          const isActive = isAuto ? isAllMode : selectedVariant === version;
          return (
            <button
              key={version}
              type="button"
              onClick={() => onSelectVariant(isAuto ? null : (selectedVariant === version ? null : version))}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                isActive
                  ? "bg-[#f5f4ff] text-[#604dd0] font-medium"
                  : "text-[#344054] hover:bg-[#f9fafb]"
              }`}
              style={ROBOTO}
            >
              <span>{version}</span>
              {isActive && <Check size={13} className="text-[#604dd0]" strokeWidth={2.5} />}
            </button>
          );
        })}
      </div>
    </div>,
    document.body,
  );
}

interface PreviewCustomer {
  id: string;
  firstName: string;
  language: string;
  availableSpend: number;
  email: string;
}

const PREVIEW_CUSTOMERS: PreviewCustomer[] = [
  { id: "32299512", firstName: "James",  language: "English",    availableSpend: 0,  email: "james@optimove.com" },
  { id: "88910212", firstName: "Carlos", language: "Spanish",    availableSpend: 5,  email: "carlos@optimove.com" },
  { id: "64372839", firstName: "Marie",  language: "French",     availableSpend: 52, email: "marie@optimove.com" },
  { id: "37849537", firstName: "Ivan",   language: "Bulgarian",  availableSpend: 11, email: "ivan@optimove.com" },
];


// Language-specific template content — keyed by the customer's language tag.
// Falls back to the live editor templateContent for English (no override needed).
const LANGUAGE_CONTENT: Record<string, Partial<TemplateContent>> = {
  Spanish: {
    heroHeadline:  "FIN DE SEMANA DE LA CHAMPIONS LEAGUE",
    heroBadge:     "FIN DE SEMANA DE PARTIDOS",
    bodyHeading:   "🔥 ¡Tu oportunidad de ganar en grande! ⚽️",
    bodyCopy:      "¡Los partidos de la Champions League este fin de semana significan más oportunidades de ver a tu equipo favorito y ganar en grande!",
    ctaText:       "Apostar",
    topPicksLabel: "🔥 Nuestras mejores selecciones para ti:",
  },
  French: {
    heroHeadline:  "WEEK-END DE LA CHAMPIONS LEAGUE",
    heroBadge:     "WEEK-END DE MATCHS",
    bodyHeading:   "🔥 Votre chance de gagner gros ! ⚽️",
    bodyCopy:      "Les matchs de la Champions League ce week-end offrent plus d'opportunités de voir votre équipe favorite et de gagner gros !",
    ctaText:       "Parier",
    topPicksLabel: "🔥 Nos meilleurs choix pour vous :",
  },
  Bulgarian: {
    heroHeadline:  "УИК-ЕНД НА ШАМПИОНСКА ЛИГА",
    heroBadge:     "УИК-ЕНД С МАЧОВЕ",
    bodyHeading:   "🔥 Вашият шанс да спечелите много! ⚽️",
    bodyCopy:      "Мачовете от Шампионска лига тази уикенд означават повече възможности да гледате любимия си отбор и да спечелите много!",
    ctaText:       "Залог",
    topPicksLabel: "🔥 Нашите топ избори за вас:",
  },
};

const VARIANT_CONTENT: Record<string, Partial<TemplateContent>> = {
  "Variant 1": {
    heroHeadline:  "CHAMPIONS LEAGUE WEEKEND",
    heroBadge:     "MATCH WEEKEND",
    bodyHeading:   "🔥 {{ customer.firstName }}, your chance to Win BIG! ⚽️",
    bodyCopy:      "Champions league games this weekend mean more opportunities to watch your favourite team and win Big!",
    ctaText:       "Place Bet",
    topPicksLabel: "🔥 Our Top Picks for You:",
  },
  "Variant 2": {
    heroHeadline:  "DON'T MISS TONIGHT'S FIXTURES",
    heroBadge:     "LIVE TONIGHT",
    bodyHeading:   "⚡ {{ customer.firstName }}, your exclusive offer expires at kick-off!",
    bodyCopy:      "Tonight's Champions League fixtures are your best chance to back your team. Don't let this offer slip away — place your bet before kick-off.",
    ctaText:       "Bet Now →",
    topPicksLabel: "⚡ Tonight's Best Odds:",
  },
  "Variant 3": {
    heroHeadline:  "🏆 CHAMPIONS LEAGUE IS BACK",
    heroBadge:     "LIVE MATCHES",
    bodyHeading:   "{{ customer.firstName }}, it's match day — make it count! 🎯",
    bodyCopy:      "The biggest club football is here. Pick your winner, back your team, and watch the action unfold. Your personalised picks are ready.",
    ctaText:       "See My Picks",
    topPicksLabel: "🎯 Picked just for you:",
  },
  "Variant 4": {
    heroHeadline:  "YOUR CHAMPIONS LEAGUE BONUS",
    heroBadge:     "EXCLUSIVE OFFER",
    bodyHeading:   "💰 {{ customer.firstName }}, your exclusive bonus is waiting",
    bodyCopy:      "We've unlocked a special bonus just for you based on your betting history. Use it on any Champions League match this weekend — limited time only.",
    ctaText:       "Claim My Bonus",
    topPicksLabel: "💰 Your bonus picks:",
  },
};

// Simulated random variant distribution — one variant per CID as if randomly
// assigned during a real send. Used when no explicit CVO override is active.
const CUSTOMER_VARIANT_MAP: Record<string, string> = {
  "32299512": "Variant 1",
  "88910212": "Variant 3",
  "64372839": "Variant 2",
  "37849537": "Variant 4",
};

function PreviewRadio({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`mt-1 size-4 rounded-full shrink-0 flex items-center justify-center ${
        checked ? "bg-[#7068de]" : "border border-[#d0d5dd]"
      }`}
    >
      {checked && <span className="size-1.5 rounded-full bg-white" />}
    </button>
  );
}

function PreviewCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`size-5 rounded-md shrink-0 flex items-center justify-center ${
        checked ? "bg-[#7068de]" : "border border-[#d0d5dd]"
      }`}
    >
      {checked && <Check size={14} className="text-white" strokeWidth={2.5} />}
    </button>
  );
}

function CustomerMetaBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium text-[#363f72] bg-[#f8f9fc] border border-[#d5d9eb] whitespace-nowrap">
      {children}
    </span>
  );
}

function CustomerCard({
  customer,
  selected,
  onToggle,
  disabled = false,
}: {
  customer: PreviewCustomer;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`w-full border border-[#d0d5dd] rounded-xl overflow-hidden transition-opacity ${disabled ? "opacity-40" : ""}`}
      title={disabled ? "Maximum of 10 customers reached" : undefined}
    >
      <div className="bg-[#f9fafb] border-b border-[#eaecf0] px-6 pt-5 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="size-6 rounded-full bg-[#e6e5fc] flex items-center justify-center shrink-0">
              <User size={14} className="text-[#5342ae]" />
            </div>
            <p className="text-sm font-medium text-[#344054] truncate" style={ROBOTO}>
              Customer ID: {customer.id}
            </p>
          </div>
          <div className={disabled ? "pointer-events-none" : ""}>
            <PreviewCheckbox checked={selected} onChange={onToggle} />
          </div>
        </div>
      </div>
      <div className="bg-white px-6 py-4">
        <CustomerMetaBadge>{customer.language}</CustomerMetaBadge>
      </div>
    </div>
  );
}

function SmartPreviewEmailCard({
  customer,
  content,
}: {
  customer: PreviewCustomer;
  content: TemplateContent;
}) {
  return (
    <div className="bg-white border border-[#d0d5dd] rounded-xl overflow-hidden w-[360px] shrink-0 flex flex-col max-h-[calc(100vh-296px)]">
      <div className="bg-[#f9fafb] border-b border-[#eaecf0] px-5 py-4 shrink-0">
        <div className="flex gap-3 items-start">
          <div className="flex flex-1 gap-2 min-w-0">
            <div className="size-7 rounded-full bg-[#e6e5fc] flex items-center justify-center shrink-0">
              <User size={14} className="text-[#5342ae]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#344054] truncate" style={ROBOTO}>
                Optimove &lt;noreply.optimove.cpm&gt;
              </p>
              <p className="text-xs text-[#475467] mt-0.5" style={ROBOTO}>
                <span className="font-semibold">To:</span>
                {" "}{customer.email}
              </p>
            </div>
          </div>
          <span className="shrink-0 px-1.5 py-0.5 rounded-md text-xs font-medium text-[#5342ae] bg-[#e6e5fc] border border-[#c3c3f7]">
            {customer.id}
          </span>
        </div>
        <p className="text-sm font-semibold text-[#344054] mt-2.5 pl-9 leading-snug" style={ROBOTO}>
          {DEFAULT_EMAIL_SUBJECT}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto min-h-0">
        <EmailTemplatePreview
          content={content}
          resolveContext={{
            firstName: customer.firstName,
            availableSpend: customer.availableSpend,
          }}
        />
      </div>
    </div>
  );
}

type PreviewChannel = "email" | "mobilePush" | "webPopup";
type PreviewLayout = "single" | "grid";

// ─── Expanded preview (new tab) ───────────────────────────────────────────────

function ExpandedPreviewPage({
  customers,
  templateContent,
}: {
  customers: PreviewCustomer[];
  templateContent: TemplateContent;
}) {
  return (
    <div className="min-h-screen bg-[#f9fafb] p-8" style={ROBOTO}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[#101828]">Email Preview — All Variants</h1>
        <SendPreviewDropdown customers={customers} templateContent={templateContent} />
      </div>
      <div className="flex gap-6 items-start overflow-x-auto pb-4">
        {customers.map((customer) => (
          <div key={customer.id} className="shrink-0 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium text-[#363f72] bg-[#f8f9fc] border border-[#d5d9eb]">
                {customer.language}
              </span>
              <span className="text-sm text-[#667085]">ID: {customer.id}</span>
            </div>
            <SmartPreviewEmailCard
              customer={customer}
              content={{ ...templateContent, ...LANGUAGE_CONTENT[customer.language] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function openExpandedPreview(
  customers: PreviewCustomer[],
  templateContent: TemplateContent,
) {
  const win = window.open("", "_blank");
  if (!win) return;

  win.document.write(
    '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Email Preview</title></head><body style="margin:0"><div id="root"></div></body></html>',
  );
  win.document.close();

  // Copy all stylesheets (Tailwind + fonts) from the current document.
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => {
    win.document.head.appendChild(el.cloneNode(true));
  });

  const container = win.document.getElementById("root")!;
  createRoot(container).render(
    <ExpandedPreviewPage customers={customers} templateContent={templateContent} />,
  );
}

// ─── Send Preview dropdown + modals ──────────────────────────────────────────

const MOCK_SHARE_URL = "https://preview.optimove.com/share/csl-wknd-2026";

type SharePermission = "View" | "Comment" | "Edit";
interface ShareViewer { email: string; initials: string; permission: SharePermission }
type ActiveModal = "email" | "pdf" | "link" | null;

// ─── Shared link state (synced across windows via localStorage + BroadcastChannel) ─

const LINK_STORAGE_KEY = "cs_preview_link_state";
const DEFAULT_LINK_STATE = {
  viewers: [
    { email: "haiden@optimove.com", initials: "HM", permission: "Edit" as SharePermission },
    { email: "omer@optimove.com",   initials: "OC", permission: "View" as SharePermission },
  ] as ShareViewer[],
  publicAccess: false,
};

function readLinkState() {
  try {
    const raw = localStorage.getItem(LINK_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as typeof DEFAULT_LINK_STATE;
  } catch {}
  return DEFAULT_LINK_STATE;
}

function useSharedLinkState() {
  const [state, setStateLocal] = useState(readLinkState);
  const bc = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    bc.current = new BroadcastChannel(LINK_STORAGE_KEY);
    bc.current.onmessage = (e) => setStateLocal(e.data as typeof DEFAULT_LINK_STATE);
    return () => { bc.current?.close(); bc.current = null; };
  }, []);

  const setState = (next: typeof DEFAULT_LINK_STATE) => {
    setStateLocal(next);
    localStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(next));
    bc.current?.postMessage(next);
  };

  return { state, setState };
}

function PermissionBadge({ value, onChange }: { value: SharePermission; onChange: (v: SharePermission) => void }) {
  const colors: Record<SharePermission, string> = {
    View: "text-[#344054] bg-[#f9fafb] border-[#d0d5dd]",
    Comment: "text-[#b54708] bg-[#fffaeb] border-[#fedf89]",
    Edit: "text-[#067647] bg-[#ecfdf3] border-[#abefc6]",
  };
  const opts: SharePermission[] = ["View", "Comment", "Edit"];
  return (
    <div className="relative group">
      <button className={`text-xs font-medium px-2 py-0.5 rounded-full border ${colors[value]} whitespace-nowrap`}>
        {value}
      </button>
      <div className="absolute right-0 top-full mt-1 bg-white border border-[#eaecf0] rounded-lg shadow-lg z-50 hidden group-hover:block min-w-[100px]">
        {opts.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#f9fafb] ${opt === value ? "text-[#7068de]" : "text-[#344054]"}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SendPreviewDropdown({
  customers,
  templateContent,
}: {
  customers: PreviewCustomer[];
  templateContent: TemplateContent;
}) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<ActiveModal>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Email modal state
  const [emailTo, setEmailTo] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Living link state — shared across the main tab and any expanded-tab windows
  const { state: linkState, setState: setLinkState } = useSharedLinkState();
  const viewers = linkState.viewers;
  const publicAccess = linkState.publicAccess;
  const setViewers = (fn: (prev: ShareViewer[]) => ShareViewer[]) =>
    setLinkState({ ...linkState, viewers: fn(viewers) });
  const setPublicAccess = (v: boolean) => setLinkState({ ...linkState, publicAccess: v });

  const [linkCopied, setLinkCopied] = useState(false);
  const [newViewer, setNewViewer] = useState("");
  const [newPerm, setNewPerm] = useState<SharePermission>("View");

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const openModal = (m: ActiveModal) => { setOpen(false); setModal(m); };

  const handlePdf = () => {
    setOpen(false);
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Email Preview — PDF</title></head><body style="margin:0"><div id="root"></div></body></html>',
    );
    win.document.close();
    document.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => {
      win.document.head.appendChild(el.cloneNode(true));
    });
    const ps = win.document.createElement("style");
    ps.textContent = "@media print { @page { margin: 12mm; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }";
    win.document.head.appendChild(ps);
    const container = win.document.getElementById("root")!;
    createRoot(container).render(
      <ExpandedPreviewPage customers={customers} templateContent={templateContent} />,
    );
    setTimeout(() => win.print(), 700);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(MOCK_SHARE_URL).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const addViewer = () => {
    const email = newViewer.trim();
    if (!email || viewers.some((v) => v.email === email)) return;
    const initials = email.slice(0, 2).toUpperCase();
    setViewers((prev) => [...prev, { email, initials, permission: newPerm }]);
    setNewViewer("");
  };

  const menu = [
    { icon: Mail,     label: "Email",           sub: "Send to recipients", action: () => openModal("email") },
    { icon: FileDown, label: "Download as PDF",  sub: "All language variants", action: handlePdf },
    { icon: Link2,    label: "Living link",      sub: "Shareable with permissions", action: () => openModal("link") },
  ];

  return (
    <>
      {/* Trigger */}
      <div className="relative" ref={dropRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="h-9 flex items-center gap-1.5 px-3 rounded-lg bg-[#7068de] text-white text-sm font-semibold hover:bg-[#5f57cc] shadow-sm transition-colors"
          style={ROBOTO}
        >
          <Send size={15} strokeWidth={2} />
          Send Preview
          <ChevronDown size={14} strokeWidth={2.5} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-[240px] bg-white border border-[#eaecf0] rounded-xl shadow-lg z-50 py-1 overflow-hidden">
            {menu.map(({ icon: Icon, label, sub, action }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[#f9fafb] text-left transition-colors"
              >
                <div className="size-8 rounded-lg bg-[#f4f3ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={16} className="text-[#604dd0]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#344054]" style={ROBOTO}>{label}</p>
                  <p className="text-xs text-[#667085]" style={ROBOTO}>{sub}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Email modal ── */}
      {modal === "email" && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#eaecf0]">
              <p className="text-base font-semibold text-[#101828]" style={ROBOTO}>Email Preview</p>
              <button onClick={() => setModal(null)} className="text-[#667085] hover:text-[#344054]"><X size={18} /></button>
            </div>
            {emailSent ? (
              <div className="flex flex-col items-center gap-3 py-12 px-6">
                <div className="size-12 rounded-full bg-[#ecfdf3] flex items-center justify-center">
                  <Check size={24} className="text-[#067647]" strokeWidth={2.5} />
                </div>
                <p className="text-base font-semibold text-[#101828]" style={ROBOTO}>Preview sent!</p>
                <p className="text-sm text-[#475467] text-center" style={ROBOTO}>Your preview was sent to <span className="font-medium">{emailTo}</span></p>
                <button onClick={() => { setModal(null); setEmailSent(false); setEmailTo(""); }} className="mt-2 text-sm font-semibold text-[#7068de]">Done</button>
              </div>
            ) : (
              <div className="px-6 py-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#344054]" style={ROBOTO}>To</label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2.5 border border-[#d0d5dd] rounded-lg text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#7068de]/30 focus:border-[#7068de]"
                    style={ROBOTO}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#344054]" style={ROBOTO}>Subject</label>
                  <input
                    type="text"
                    defaultValue="Champions League Weekend — Email Preview (4 variants)"
                    className="w-full px-3 py-2.5 border border-[#d0d5dd] rounded-lg text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#7068de]/30 focus:border-[#7068de]"
                    style={ROBOTO}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#344054]" style={ROBOTO}>Variants included</label>
                  <div className="flex gap-2 flex-wrap">
                    {customers.map((c) => (
                      <span key={c.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-[#363f72] bg-[#f8f9fc] border border-[#d5d9eb]">
                        {c.language}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-1">
                  <button onClick={() => setModal(null)} className="h-10 px-4 text-sm font-semibold text-[#344054] border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb]" style={ROBOTO}>Cancel</button>
                  <button
                    disabled={!emailTo.trim()}
                    onClick={() => setEmailSent(true)}
                    className="h-10 px-4 text-sm font-semibold text-white bg-[#7068de] rounded-lg hover:bg-[#5f57cc] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    style={ROBOTO}
                  >
                    <Send size={14} strokeWidth={2} /> Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}

      {/* ── Living link modal ── */}
      {modal === "link" && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[520px] mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#eaecf0]">
              <p className="text-base font-semibold text-[#101828]" style={ROBOTO}>Share Preview Link</p>
              <button onClick={() => setModal(null)} className="text-[#667085] hover:text-[#344054]"><X size={18} /></button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-5">
              {/* Link box */}
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5 border border-[#d0d5dd] rounded-lg bg-[#f9fafb] min-w-0">
                  <Link2 size={15} className="text-[#667085] shrink-0" />
                  <span className="text-sm text-[#344054] truncate" style={ROBOTO}>{MOCK_SHARE_URL}</span>
                </div>
                <button
                  type="button"
                  onClick={copyLink}
                  className={`h-10 px-3 flex items-center gap-1.5 text-sm font-semibold rounded-lg border shadow-sm transition-colors shrink-0 ${
                    linkCopied ? "bg-[#ecfdf3] border-[#abefc6] text-[#067647]" : "bg-white border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]"
                  }`}
                  style={ROBOTO}
                >
                  {linkCopied ? <><Check size={14} strokeWidth={2.5} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>

              {/* Public access toggle */}
              <div className="flex items-center justify-between py-3 px-4 bg-[#f9fafb] rounded-xl border border-[#eaecf0]">
                <div className="flex items-center gap-2.5">
                  {publicAccess ? <Globe size={16} className="text-[#7068de]" /> : <Lock size={16} className="text-[#667085]" />}
                  <div>
                    <p className="text-sm font-medium text-[#344054]" style={ROBOTO}>
                      {publicAccess ? "Anyone with the link can view" : "Restricted — specific people only"}
                    </p>
                    <p className="text-xs text-[#667085]" style={ROBOTO}>
                      {publicAccess ? "No sign-in required" : "Recipients must be invited below"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPublicAccess((v) => !v)}
                  className={`relative w-10 h-5.5 rounded-full transition-colors shrink-0 ${publicAccess ? "bg-[#7068de]" : "bg-[#d0d5dd]"}`}
                  style={{ height: "22px", width: "40px" }}
                >
                  <span
                    className="absolute top-0.5 size-[18px] bg-white rounded-full shadow transition-transform"
                    style={{ transform: publicAccess ? "translateX(19px)" : "translateX(2px)" }}
                  />
                </button>
              </div>

              {/* Add people */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-[#344054]" style={ROBOTO}>Add people</p>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1 px-3 py-2.5 border border-[#d0d5dd] rounded-lg bg-white">
                    <UserPlus size={15} className="text-[#667085] shrink-0" />
                    <input
                      type="email"
                      value={newViewer}
                      onChange={(e) => setNewViewer(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") addViewer(); }}
                      placeholder="name@example.com"
                      className="flex-1 min-w-0 text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none bg-transparent"
                      style={ROBOTO}
                    />
                  </div>
                  <select
                    value={newPerm}
                    onChange={(e) => setNewPerm(e.target.value as SharePermission)}
                    className="h-10 px-2 border border-[#d0d5dd] rounded-lg text-sm text-[#344054] focus:outline-none bg-white"
                    style={ROBOTO}
                  >
                    {(["View", "Comment", "Edit"] as SharePermission[]).map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addViewer}
                    disabled={!newViewer.trim()}
                    className="h-10 px-3 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] disabled:opacity-40 shrink-0"
                    style={ROBOTO}
                  >
                    Invite
                  </button>
                </div>
              </div>

              {/* Viewer list */}
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-[#344054] mb-1" style={ROBOTO}>
                  People with access <span className="text-[#667085] font-normal">({viewers.length})</span>
                </p>
                {viewers.map((v) => (
                  <div key={v.email} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#f9fafb] group">
                    <div className="size-8 rounded-full bg-[#e6e5fc] flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#5342ae]">{v.initials}</span>
                    </div>
                    <p className="flex-1 text-sm text-[#344054] truncate" style={ROBOTO}>{v.email}</p>
                    <PermissionBadge
                      value={v.permission}
                      onChange={(perm) => setViewers((prev) => prev.map((x) => x.email === v.email ? { ...x, permission: perm } : x))}
                    />
                    <button
                      type="button"
                      onClick={() => setViewers((prev) => prev.filter((x) => x.email !== v.email))}
                      className="opacity-0 group-hover:opacity-100 text-[#667085] hover:text-[#d92d20] ml-1 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#eaecf0] flex justify-end">
              <button onClick={() => setModal(null)} className="h-10 px-4 text-sm font-semibold text-white bg-[#7068de] rounded-lg hover:bg-[#5f57cc]" style={ROBOTO}>
                Done
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

// Adapts a Customer from the test groups data model to the PreviewCustomer shape
// expected by CustomerCard and SmartPreviewEmailCard.
function adaptToPreview(c: import("../data/testGroupsMock").Customer): PreviewCustomer {
  return {
    id: c.id,
    firstName: c.name.split(" ")[0] || "Customer",
    language: c.labels[0] ?? c.status,
    availableSpend: 0,
    email: c.email || `customer${c.id}@optimove.com`,
  };
}

function SmartPreviewView({
  templateContent,
  groups = [],
}: {
  templateContent: TemplateContent;
  groups?: import("../data/testGroupsMock").TestGroup[];
}) {
  const [previewAs, setPreviewAs] = useState<"customerId" | "testGroup">("testGroup");
  const [selectedGroupId, setSelectedGroupId] = useState<string>(groups[0]?.id ?? "");
  const [customerIdInput, setCustomerIdInput] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() =>
    new Set(groups[0]?.customers.slice(0, 4).map((c) => c.id) ?? []),
  );
  const [customerPage, setCustomerPage] = useState(1);
  const [channel, setChannel] = useState<PreviewChannel>("email");
  const [layout, setLayout] = useState<PreviewLayout>("grid");

  // Preview Options state — null means random distribution (All), string = forced branch
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [previewOptionsOpen, setPreviewOptionsOpen] = useState(false);
  const previewOptionsBtnRef = useRef<HTMLButtonElement>(null);

  const isVariantMode = selectedVariant !== null;

  const totalPages = 1;
  // When in testGroup mode, use the selected group's customers; otherwise the hardcoded set.
  const activeGroup = groups.find((g) => g.id === selectedGroupId);
  const testGroupCustomers: PreviewCustomer[] = activeGroup
    ? activeGroup.customers.map(adaptToPreview)
    : PREVIEW_CUSTOMERS;
  const selectedCustomers = testGroupCustomers.filter((c) => selectedIds.has(c.id));

  const MAX_PREVIEW_CIDS = 10;

  const toggleCustomer = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < MAX_PREVIEW_CIDS) {
        next.add(id);
      }
      return next;
    });
  };

  const channelTabs: { id: PreviewChannel; label: string }[] = [
    { id: "email", label: "Email" },
    { id: "mobilePush", label: "Mobile Push" },
    { id: "webPopup", label: "Web Popup" },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white min-w-0">
      {/* Header — mirrors two-column layout below */}
      <div className="shrink-0 flex border-b border-[#eaecf0]">
        <div className="w-[428px] shrink-0 px-6 py-4 border-r border-[#eaecf0]">
          <h1 className="text-lg font-semibold text-[#101828]" style={ROBOTO}>
            Smart Preview
          </h1>
        </div>

        <div className="flex-1 flex items-center justify-between gap-4 px-6 py-4 min-w-0 bg-[#f9fafb]">
          <div className="flex gap-1 min-w-0">
            {channelTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setChannel(tab.id)}
                className={`h-9 px-3 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
                  channel === tab.id
                    ? "bg-[#e6e5fc] text-[#604dd0]"
                    : "text-[#667085] hover:text-[#344054]"
                }`}
                style={ROBOTO}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Variants picker trigger */}
            <button
              ref={previewOptionsBtnRef}
              type="button"
              onClick={() => setPreviewOptionsOpen((v) => !v)}
              className={`h-9 px-3 flex items-center gap-1.5 rounded-lg border shadow-sm text-sm font-medium transition-colors ${
                previewOptionsOpen || isVariantMode
                  ? "border-[#a4a3f3] bg-[#e6e5fc] text-[#604dd0]"
                  : "border-[#d0d5dd] bg-white text-[#475467] hover:bg-[#f9fafb]"
              }`}
              style={ROBOTO}
            >
              <SlidersHorizontal size={15} strokeWidth={isVariantMode ? 2 : 1.75} />
              <span>Variants</span>
            </button>

            {/* Expand */}
            <button
              type="button"
              onClick={() => openExpandedPreview(selectedCustomers, templateContent)}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#d0d5dd] bg-white shadow-sm hover:bg-[#f2f4f7]"
              title="Open in new tab"
            >
              <Maximize2 size={18} className="text-[#344054]" />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-[#e4e7ec] shrink-0" />

            {/* Layout toggle */}
            <div className="flex h-9 rounded-lg border border-[#d0d5dd] shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setLayout("single")}
                className={`px-3 flex items-center justify-center border-r border-[#d0d5dd] ${
                  layout === "single" ? "bg-[#e6e5fc]" : "bg-white hover:bg-[#f9fafb]"
                }`}
                title="Single view"
              >
                <Square size={16} className="text-[#344054]" />
              </button>
              <button
                type="button"
                onClick={() => setLayout("grid")}
                className={`px-3 flex items-center justify-center ${
                  layout === "grid" ? "bg-[#e6e5fc]" : "bg-white hover:bg-[#f9fafb]"
                }`}
                title="Grid view"
              >
                <LayoutGrid size={16} className="text-[#344054]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left panel */}
        <aside className="w-[428px] shrink-0 border-r border-[#eaecf0] shadow-[0px_0px_1.5px_rgba(16,24,40,0.1),0px_1px_1px_rgba(16,24,40,0.06)] overflow-y-auto px-6 pb-8">
          <div className="flex flex-col gap-6">
            {/* Preview template as */}
            <section className="flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-[#667085] uppercase tracking-wide pt-6" style={ROBOTO}>
                Preview as
              </h2>

              <div className="flex gap-2 items-start">
                <PreviewRadio
                  checked={previewAs === "customerId"}
                  onChange={() => setPreviewAs("customerId")}
                />
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium text-[#344054] mb-1.5" style={ROBOTO}>
                    Customer ID
                  </label>
                  <input
                    type="text"
                    value={customerIdInput}
                    onChange={(e) => setCustomerIdInput(e.target.value)}
                    placeholder="Enter customer ID"
                    disabled={previewAs !== "customerId"}
                    className="w-full px-3 py-2 text-base text-[#101828] placeholder:text-[#667085] border border-[#d0d5dd] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#7068de] disabled:bg-[#f9fafb] disabled:text-[#98a2b3]"
                    style={ROBOTO}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex gap-2 items-start">
                  <PreviewRadio
                    checked={previewAs === "testGroup"}
                    onChange={() => setPreviewAs("testGroup")}
                  />
                  <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-[#344054] mb-1.5" style={ROBOTO}>
                      Test Group
                    </label>
                    {groups.length === 0 ? (
                      <p className="text-sm text-[#98a2b3] italic" style={ROBOTO}>
                        No test groups yet — create one in the Audience page.
                      </p>
                    ) : (
                      <select
                        value={selectedGroupId}
                        onChange={(e) => {
                          const id = e.target.value;
                          setSelectedGroupId(id);
                          const grp = groups.find((g) => g.id === id);
                          if (grp) {
                            // Auto-select up to 4 customers from the new group
                            setSelectedIds(new Set(grp.customers.slice(0, 4).map((c) => c.id)));
                          }
                        }}
                        disabled={previewAs !== "testGroup"}
                        className="w-full px-3 py-2 border border-[#d0d5dd] rounded-lg shadow-sm bg-white text-sm font-medium text-[#101828] focus:outline-none focus:ring-1 focus:ring-[#7068de] disabled:text-[#98a2b3] disabled:bg-[#f9fafb]"
                        style={ROBOTO}
                      >
                        {groups.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name} ({g.customers.length} customers)
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {previewAs === "testGroup" && (
                  <div className="flex flex-col gap-3">
                    {/* CID count */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#475467]" style={ROBOTO}>
                        {selectedIds.size > 0 ? (
                          <><span className="font-semibold text-[#344054]">{selectedIds.size}</span> of {MAX_PREVIEW_CIDS} selected</>
                        ) : (
                          <>Select up to {MAX_PREVIEW_CIDS} customers</>
                        )}
                      </span>
                      {selectedIds.size > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedIds(new Set())}
                          className="text-xs font-medium text-[#667085] hover:text-[#344054]"
                          style={ROBOTO}
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {testGroupCustomers.map((customer) => {
                      const atLimit = selectedIds.size >= MAX_PREVIEW_CIDS && !selectedIds.has(customer.id);
                      return (
                        <CustomerCard
                          key={customer.id}
                          customer={customer}
                          selected={selectedIds.has(customer.id)}
                          onToggle={() => toggleCustomer(customer.id)}
                          disabled={atLimit}
                        />
                      );
                    })}

                    <div className="flex items-center justify-between border-t border-[#eaecf0] px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setCustomerPage((p) => Math.max(1, p - 1))}
                        disabled={customerPage <= 1}
                        className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#d0d5dd] bg-white shadow-sm disabled:opacity-40"
                      >
                        <ArrowLeft size={18} className="text-[#344054]" />
                      </button>
                      <p className="text-sm text-[#344054]" style={ROBOTO}>
                        Page <span className="font-medium">{customerPage}</span> of {totalPages}
                      </p>
                      <button
                        type="button"
                        onClick={() => setCustomerPage((p) => Math.min(totalPages, p + 1))}
                        disabled={customerPage >= totalPages}
                        className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#d0d5dd] bg-white shadow-sm disabled:opacity-40"
                      >
                        <ArrowRight size={18} className="text-[#344054]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

          </div>
        </aside>

        {/* Preview area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden bg-[#f9fafb]">
          <div className="flex-1 overflow-x-auto px-6 py-4 min-w-0">
            {channel === "email" ? (
              selectedCustomers.length > 0 ? (
                <div
                  className={
                    layout === "grid"
                      ? "flex flex-nowrap gap-5 items-start"
                      : "flex justify-center"
                  }
                >
                  {(layout === "single" ? selectedCustomers.slice(0, 1) : selectedCustomers).map(
                    (customer) => {
                      // Forced variant overrides all; otherwise each CID gets its simulated random branch
                      const variantKey = selectedVariant ?? CUSTOMER_VARIANT_MAP[customer.id] ?? "Variant 1";
                      return (
                        <div key={customer.id} className="flex flex-col gap-3 shrink-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold self-start border ${
                              isVariantMode
                                ? "text-[#604dd0] bg-[#f5f4ff] border-[#d8d8fa]"
                                : "text-[#667085] bg-[#f9fafb] border-[#eaecf0]"
                            }`}
                            style={ROBOTO}
                          >
                            {variantKey}
                            {!isVariantMode && (
                              <span className="ml-1 opacity-50 text-[10px]">random</span>
                            )}
                          </span>
                          <SmartPreviewEmailCard
                            customer={customer}
                            content={{
                              ...templateContent,
                              ...(VARIANT_CONTENT[variantKey] ?? {}),
                              ...LANGUAGE_CONTENT[customer.language],
                            }}
                          />
                        </div>
                      );
                    },
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <p className="text-sm text-[#667085]" style={ROBOTO}>
                    Select at least one customer to preview
                  </p>
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <p className="text-sm text-[#667085]" style={ROBOTO}>
                  {channel === "mobilePush" ? "Mobile Push" : "Web Popup"} preview coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {previewOptionsOpen && (
        <PreviewOptionsPanel
          selectedVariant={selectedVariant}
          onSelectVariant={setSelectedVariant}
          onClose={() => setPreviewOptionsOpen(false)}
          anchorEl={previewOptionsBtnRef.current}
        />
      )}
    </div>
  );
}

// ─── Code Editor panel ────────────────────────────────────────────────────────

const MONO_STYLE = { fontFamily: "'Roboto Mono', monospace" } as const;

const DEFAULT_ADVANCED_CODE = `{% assign dc_hero = 'DC_champions_league_hero' %}
{% assign dc_picks = 'DC_champions_league_picks' %}

{% assign hero_row = data_connection(dc_hero, match_key, 'Hero_Image_URL,Headline,Badge_Label,CTA_Text,CTA_URL') %}
{% assign hero_image = hero_row.Hero_Image_URL | default: '/assets/champions-league-hero.jpg' %}
{% assign hero_headline = hero_row.Headline | default: 'CHAMPIONS LEAGUE WEEKEND' %}
{% assign hero_badge = hero_row.Badge_Label | default: 'MATCH WEEKEND' %}
{% assign hero_cta_text = hero_row.CTA_Text | default: 'Place Bet' %}
{% assign hero_cta_url = hero_row.CTA_URL | default: 'https://betbro.com/champions-league' %}

{% assign body_row = data_connection(dc_picks, customer_key, 'Offer_Headline,Offer_Body,Top_Picks_Label') %}
{% assign body_headline = body_row.Offer_Headline | default: '🔥 Your Chance to Win BIG! ⚽️' %}
{% assign body_copy = body_row.Offer_Body | default: 'Champions league games this weekend mean more opportunities to watch your favourite team and win Big!' %}
{% assign top_picks_label = body_row.Top_Picks_Label | default: '🔥 Our Top Picks for You:' %}`;

interface ParsedVariable {
  name: string;
  value: string;
}

interface ParsedConnection {
  name: string;
  from: string;
  primaryKey: string;
  returnFields: string;
}

function parseSnippetsFromCode(code: string) {
  const variables: ParsedVariable[] = [];
  const connections: ParsedConnection[] = [];

  const assignRegex = /\{%\s*assign\s+(\w+)\s*=\s*(.+?)\s*%\}/g;
  let match = assignRegex.exec(code);
  while (match) {
    const name = match[1];
    const rhs = match[2].trim();
    const dcMatch = rhs.match(
      /data_connection\(\s*(\w+)\s*,\s*(\w+)\s*,\s*'([^']+)'\s*\)/,
    );
    if (dcMatch) {
      connections.push({
        name,
        from: dcMatch[1],
        primaryKey: dcMatch[2],
        returnFields: dcMatch[3],
      });
    } else {
      variables.push({ name, value: rhs });
    }
    match = assignRegex.exec(code);
  }

  return { variables, connections };
}

function SnippetBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-[#5342ae] bg-[#e6e5fc] border border-[#c3c3f7] whitespace-nowrap">
      {children}
    </span>
  );
}

function VariableSnippetCard({ name, value }: ParsedVariable) {
  return (
    <div className="border border-[#eaecf0] rounded-xl shadow-sm px-5 py-3 min-h-[94px] flex items-center">
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-base font-semibold text-[#101828] truncate"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {name}
          </span>
          <SnippetBadge>{`{ }`}</SnippetBadge>
        </div>
        <p
          className="text-xs text-black truncate"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          Value&nbsp;&nbsp;&nbsp;{value}
        </p>
      </div>
    </div>
  );
}

function DataConnectionSnippetCard({ name, from, primaryKey, returnFields }: ParsedConnection) {
  return (
    <div className="border border-[#eaecf0] rounded-xl shadow-sm px-5 py-3 min-h-[94px] flex items-center">
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-base font-semibold text-[#101828] truncate"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {name}
          </span>
          <SnippetBadge>{`{{ data_connection() }}`}</SnippetBadge>
        </div>
        <p
          className="text-xs text-black truncate"
          style={{ fontFamily: "'Roboto', sans-serif" }}
        >
          from:&nbsp;{from}&nbsp;&nbsp;&nbsp;primaryKey&nbsp;&nbsp;&nbsp;{primaryKey}&nbsp;&nbsp;&nbsp;return&nbsp;&nbsp;&nbsp;'{returnFields}'
        </p>
      </div>
    </div>
  );
}

function CodeEditorPanel() {
  const [code, setCode] = useState(DEFAULT_ADVANCED_CODE);
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    variables: true,
    connections: true,
  });

  const { variables, connections } = parseSnippetsFromCode(code);
  const lineCount = Math.max(code.split("\n").length, 20);

  const toggleSection = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const snippetSections = [
    {
      id: "variables",
      label: "Variables",
      count: variables.length,
      items: variables.map((item) => (
        <VariableSnippetCard key={item.name} {...item} />
      )),
    },
    {
      id: "connections",
      label: "Data connections",
      count: connections.length,
      items: connections.map((item) => (
        <DataConnectionSnippetCard key={item.name} {...item} />
      )),
    },
    {
      id: "variants",
      label: "Variants",
      count: 0,
      items: null as ReactNode,
    },
  ];

  return (
    <div className="flex-1 min-w-0 overflow-y-auto bg-white">
      <div className="flex flex-col gap-5 p-6 max-w-none">
        {/* Page header */}
        <div className="px-3 pb-2 border-b border-[#eaecf0]">
          <p className="text-base font-semibold text-[#101828]" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Code Editor
          </p>
          <p className="text-sm text-[#475467] mt-1" style={{ fontFamily: "'Roboto', sans-serif" }}>
            Define variables, captures, multi-fetches and snippets
          </p>
        </div>

        {/* Advanced Code */}
        <div className="flex flex-col gap-1 px-3">
          <div className="flex items-center justify-between pb-2">
            <p className="text-base font-semibold text-[#101828]" style={{ fontFamily: "'Roboto', sans-serif" }}>
              Advanced Code
            </p>
            <button
              type="button"
              onClick={() => setAdvancedOpen((v) => !v)}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#d0d5dd] bg-white shadow-sm text-[#344054] hover:bg-[#f9fafb]"
            >
              <ChevronUp size={18} className={`transition-transform ${advancedOpen ? "" : "rotate-180"}`} />
            </button>
          </div>

          {advancedOpen && (
            <div className="border border-[#eaecf0] rounded-xl overflow-hidden flex min-h-[320px]">
              <div className="bg-[#f9fafb] border-r border-[#eaecf0] px-6 py-6 flex-shrink-0 select-none">
                {Array.from({ length: lineCount }, (_, i) => (
                  <p
                    key={i}
                    className="text-base font-bold text-[#667085] leading-normal"
                    style={MONO_STYLE}
                  >
                    {i + 1}
                  </p>
                ))}
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 min-w-0 px-6 py-6 pb-8 text-base text-[#067647] bg-white resize-none focus:outline-none leading-normal"
                style={MONO_STYLE}
              />
            </div>
          )}
        </div>

        {/* Snippets Summary */}
        <div className="px-3">
          <div className="border border-[#eaecf0] rounded-xl p-6 flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-[#344054]" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Snippets Summary
              </p>
              <p className="text-sm text-[#475467] mt-0.5" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Outputs from your code &amp; fetches.
              </p>
            </div>

            {snippetSections.map((section, idx) => {
              const isOpen = !!openSections[section.id];
              const isDisabled = section.count === 0;

              return (
                <div
                  key={section.id}
                  className={`flex flex-col gap-2 ${
                    idx < snippetSections.length - 1 ? "pb-4 border-b border-[#eaecf0]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className="text-sm font-medium text-[#344054]"
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {section.label} ({section.count})
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id, isDisabled)}
                      disabled={isDisabled}
                      className={`h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-lg border shadow-sm transition-colors ${
                        isDisabled
                          ? "border-[#f2f4f7] bg-white text-[#98a2b3] cursor-default"
                          : "border-[#d0d5dd] bg-white text-[#344054] hover:bg-[#f9fafb]"
                      }`}
                    >
                      <ChevronUp
                        size={18}
                        className={`transition-transform ${isOpen ? "" : "rotate-180"}`}
                      />
                    </button>
                  </div>

                  {isOpen && !isDisabled && section.items && (
                    <div className="flex flex-col gap-2">{section.items}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type WorkbenchInnerTab = "variants" | "data" | "code";

function WorkbenchView({
  variants,
  onVariantsChange,
  initialized,
  onActivate,
  innerTab,
  onInnerTabChange,
  highlightColumnId,
}: {
  variants: VariantRow[];
  onVariantsChange: (variants: VariantRow[]) => void;
  initialized: boolean;
  onActivate: (apply: (rows: VariantRow[]) => VariantRow[]) => void;
  innerTab: WorkbenchInnerTab;
  onInnerTabChange: (tab: WorkbenchInnerTab) => void;
  highlightColumnId: string | null;
}) {
  const [columns, setColumns] = useState<WorkbenchColumn[]>(INITIAL_COLUMNS);
  const [showAddComponentMenu, setShowAddComponentMenu] = useState(false);
  const [showBodyTagModal, setShowBodyTagModal] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<WorkbenchColumn | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const addComponentBtnRef = useRef<HTMLButtonElement>(null);
  const addComponentMenuRef = useRef<HTMLDivElement>(null);

  const hasPreviewText = columns.some((c) => c.type === "previewText");
  const bodyTagNames = columns.filter((c) => c.type === "bodyTag").map((c) => c.label);

  // When the parent highlights a column (via "Add variant"), ensure it is shown
  useEffect(() => {
    if (!highlightColumnId) return;
    setColumns((prev) => {
      if (prev.some((c) => c.id === highlightColumnId)) return prev;
      if (highlightColumnId === "previewText") {
        return [...prev, { id: "previewText", type: "previewText", label: FIXED_COLUMNS.previewText.label }];
      }
      if (highlightColumnId === "subjectLine") return prev;
      return prev;
    });
  }, [highlightColumnId]);

  useEffect(() => {
    if (!showAddComponentMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        addComponentBtnRef.current?.contains(target) ||
        addComponentMenuRef.current?.contains(target)
      ) return;
      setShowAddComponentMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAddComponentMenu]);

  const isExpanded = columns.some((c) => c.type === "bodyTag");

  const toggleAddComponentMenu = () => {
    if (addComponentBtnRef.current) {
      const rect = addComponentBtnRef.current.getBoundingClientRect();
      setMenuPosition({ top: rect.top + rect.height / 2, left: rect.left - 8 });
    }
    setShowAddComponentMenu((v) => !v);
  };

  const selectComponent = (type: "previewText" | "bodyTag") => {
    setShowAddComponentMenu(false);
    if (type === "previewText") {
      setColumns((prev) => [
        ...prev,
        { id: "previewText", type: "previewText", label: FIXED_COLUMNS.previewText.label },
      ]);
      return;
    }
    setShowBodyTagModal(true);
  };

  const confirmBodyTag = (name: string) => {
    const id = nextBodyTagId();
    setColumns((prev) => [...prev, { id, type: "bodyTag", label: name }]);
    onVariantsChange(
      variants.map((v) => ({ ...v, bodyTags: { ...v.bodyTags, [id]: "" } })),
    );
    setShowBodyTagModal(false);
  };

  const removeColumn = (col: WorkbenchColumn) => {
    setColumns((prev) => prev.filter((c) => c.id !== col.id));
    if (col.type === "bodyTag") {
      onVariantsChange(
        variants.map((v) => {
          const { [col.id]: _, ...rest } = v.bodyTags;
          return { ...v, bodyTags: rest };
        }),
      );
    }
  };

  const confirmRemoveColumn = () => {
    if (!columnToDelete) return;
    removeColumn(columnToDelete);
    setColumnToDelete(null);
  };

  const updateVariant = (variantId: number, col: WorkbenchColumn, val: string) => {
    const apply = (rows: VariantRow[]) =>
      rows.map((v) => (v.id === variantId ? setVariantCellValue(v, col, val) : v));

    if (!initialized) {
      onActivate(apply);
      return;
    }
    onVariantsChange(apply(variants));
  };

  const displayVariants = initialized
    ? variants
    : [createVariantRow(1), createVariantRow(2)];

  const variantOne = displayVariants.find((variant) => variant.id === 1) ?? displayVariants[0];
  const canGenerateAiVariants =
    initialized && variantOne != null && isVariantRowComplete(variantOne, columns);

  const handleGenerateAiVariants = () => {
    if (!canGenerateAiVariants || !variantOne) return;

    const apply = () => generateAiVariantsFromFirst(variantOne, columns);
    onVariantsChange(apply());
  };

  const rowH = isExpanded ? "h-[212px]" : "h-[76px]";
  const gridTemplateColumns = `160px repeat(${columns.length}, minmax(0, 1fr))`;

  const renderVariantCell = (variant: VariantRow, col: WorkbenchColumn) => (
    <div
      key={`${variant.id}-${col.id}`}
      className={`relative border-b border-l border-[#eaecf0] min-w-0 overflow-hidden ${
        rowH
      } ${highlightColumnId === col.id ? "bg-[#f8f9ff]" : ""}`}
    >
      {isExpanded ? (
        <div className="relative h-full p-4">
          <div className="h-full bg-white border border-[#d0d5dd] rounded-lg shadow-sm overflow-hidden">
            <textarea
              className="w-full h-full px-3 pt-3 text-sm text-[#667085] resize-none focus:outline-none"
              placeholder={
                col.type === "bodyTag"
                  ? "Enter content..."
                  : `Enter ${col.label.toLowerCase()}...`
              }
              value={getVariantCellValue(variant, col)}
              onChange={(e) => updateVariant(variant.id, col, e.target.value)}
            />
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="absolute bottom-6 right-6 text-[#98a2b3] hover:text-[#667085] pointer-events-none"
          >
            <SlidersHorizontal size={13} />
          </button>
        </div>
      ) : (
        <div className="relative h-full px-6 py-4 flex items-center min-w-0">
          <div className="relative flex-1 min-w-0">
            <div className="bg-white border border-[#d0d5dd] rounded-lg shadow-sm overflow-hidden">
              <input
                type="text"
                className="w-full px-3 py-2.5 pr-9 text-base text-[#667085] placeholder-[#667085] focus:outline-none bg-transparent"
                placeholder={`Enter ${col.label.toLowerCase()}...`}
                value={getVariantCellValue(variant, col)}
                onChange={(e) => updateVariant(variant.id, col, e.target.value)}
              />
            </div>
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#98a2b3] hover:text-[#667085] pointer-events-none"
            >
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (innerTab === "code") {
    return (
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-white">
        <div className="flex-shrink-0 px-6 pt-6">
          <div className="bg-[#f9fafb] border border-[#eaecf0] rounded-xl flex items-center gap-1 p-1.5 relative">
            {(["variants", "data"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onInnerTabChange(t)}
                className="h-11 px-3 rounded-md text-base font-semibold text-[#667085] hover:text-[#344054] transition-colors"
              >
                {t === "variants" ? "Variants" : "Data Connections"}
              </button>
            ))}
            <button
              type="button"
              className="absolute right-2 h-11 px-3 rounded-md text-base font-semibold bg-white shadow-[0px_0px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] text-[#344054] flex items-center gap-2"
            >
              <Code2 size={16} /> Code Editor
            </button>
          </div>
        </div>
        <CodeEditorPanel />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="flex flex-col gap-6 p-6">

        {/* Tab bar — Figma: rounded-xl container, shadow on active tab, Code Editor has icon */}
        <div className="bg-[#f9fafb] border border-[#eaecf0] rounded-xl flex items-center gap-1 p-1.5 relative">
          {(["variants", "data"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onInnerTabChange(t)}
              className={`h-11 px-3 rounded-md text-base font-semibold transition-colors ${
                innerTab === t
                  ? "bg-white shadow-[0px_0px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] text-[#344054]"
                  : "text-[#667085]"
              }`}
            >
              {t === "variants" ? "Variants" : "Data Connections"}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onInnerTabChange("code")}
            className="absolute right-2 h-11 px-3 rounded-md text-base font-semibold text-[#667085] flex items-center gap-2 hover:text-[#344054] transition-colors"
          >
            <Code2 size={16} /> Code Editor
          </button>
        </div>

        {innerTab === "variants" ? (
          <>
            {/* Section header */}
            <div className="pb-4 border-b border-[#eaecf0]">
              <p className="text-base font-semibold text-[#101828]">Variants</p>
              <p className="text-sm text-[#475467] mt-0.5">
                Create multiple variations of your content to test different approaches
              </p>
            </div>

            {/* Table + rotated add-column button */}
            <div className="flex gap-5 items-start min-w-0">
              <div className="flex-1 min-w-0 bg-white rounded-xl border border-[#eaecf0] overflow-hidden">
                <div
                  className="grid min-w-0"
                  style={{ gridTemplateColumns }}
                >
                  {/* Header — labels absolutely positioned so long names never affect column width */}
                  <div className="relative bg-[#f9fafb] border-b border-[#eaecf0] h-11 overflow-hidden">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-medium text-[#475467]">
                      Component
                    </span>
                  </div>
                  {columns.map((col) => (
                    <div
                      key={col.id}
                      className={`relative bg-[#f9fafb] border-b border-l border-[#eaecf0] h-11 overflow-hidden ${
                        highlightColumnId === col.id ? "ring-2 ring-inset ring-[#7068de]/40" : ""
                      }`}
                    >
                      <span
                        className="absolute left-6 right-10 top-1/2 -translate-y-1/2 text-xs font-medium text-[#475467] truncate"
                        title={col.label}
                      >
                        {col.label}
                      </span>
                      {col.type !== "subjectLine" && (
                        <button
                          type="button"
                          onClick={() => setColumnToDelete(col)}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-[#475467] hover:text-[#344054]"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Rows */}
                  {displayVariants.map((variant) => (
                    <Fragment key={variant.id}>
                      <div
                        className={`relative border-b border-r border-[#eaecf0] overflow-hidden ${rowH}`}
                      >
                        <span className="absolute left-6 right-10 top-1/2 -translate-y-1/2 text-sm font-medium text-[#101828] truncate">
                          {variant.name}
                        </span>
                        {initialized && (
                          <button
                            type="button"
                            onClick={() => onVariantsChange(variants.filter((v) => v.id !== variant.id))}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#475467] hover:text-[#344054]"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                      {columns.map((col) => renderVariantCell(variant, col))}
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* Rotated "+ Component" add-column button */}
              <div className="flex items-center justify-center w-5 mt-[76px]">
                <button
                  ref={addComponentBtnRef}
                  type="button"
                  onClick={toggleAddComponentMenu}
                  className="-rotate-90 flex items-center gap-1.5 whitespace-nowrap text-[#475467] hover:text-[#344054]"
                >
                  <Plus size={15} strokeWidth={2} />
                  <span className="text-sm font-semibold">Component</span>
                </button>
              </div>
            </div>

            {showAddComponentMenu && createPortal(
              <div
                ref={addComponentMenuRef}
                className="fixed z-50"
                style={{
                  top: menuPosition.top,
                  left: menuPosition.left,
                  transform: "translate(-100%, -50%)",
                }}
              >
                <AddComponentDrawer hasPreviewText={hasPreviewText} onSelect={selectComponent} />
              </div>,
              document.body,
            )}

            {showBodyTagModal && (
              <BodyTagNameModal
                existingNames={bodyTagNames}
                onConfirm={confirmBodyTag}
                onCancel={() => setShowBodyTagModal(false)}
              />
            )}

            {columnToDelete && (
              <DeleteColumnModal
                columnLabel={columnToDelete.label}
                onConfirm={confirmRemoveColumn}
                onCancel={() => setColumnToDelete(null)}
              />
            )}

            {/* + Variant / Generate AI variants */}
            <div className="flex items-center justify-between pl-3 pr-10">
              <button
                type="button"
                onClick={() => {
                  const addRow = (rows: VariantRow[]) => {
                    const nextId = rows.length > 0 ? Math.max(...rows.map((v) => v.id)) + 1 : 1;
                    return [...rows, createVariantRow(nextId)];
                  };
                  if (!initialized) {
                    onActivate(addRow);
                    return;
                  }
                  onVariantsChange(addRow(variants));
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#475467] hover:text-[#344054]"
              >
                <Plus size={15} strokeWidth={2} /> Variant
              </button>
              <button
                type="button"
                disabled={!canGenerateAiVariants}
                onClick={handleGenerateAiVariants}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  canGenerateAiVariants
                    ? "text-[#604dd0] hover:text-[#5342ae]"
                    : "text-[#98a2b3] cursor-not-allowed"
                }`}
              >
                <Sparkles size={15} /> Generate AI variants
              </button>
            </div>

            {/* Experiment button */}
            <div>
              <button className="h-10 px-3 bg-white border border-[#a4a3f3] rounded-lg text-sm font-semibold text-[#604dd0] flex items-center gap-1.5 shadow-sm hover:bg-[#f5f4ff]">
                <Plus size={15} /> Experiment
              </button>
            </div>
          </>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-[#667085]">
            Data connections coming soon.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Template Editor Page ─────────────────────────────────────────────────────

interface TemplateEditorProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  groups?: import("../data/testGroupsMock").TestGroup[];
  initialTab?: EditorTab;
  initialChat?: ChatMessage[];
}

export default function TemplateEditorPage({
  onBack = () => {},
  onNavigate,
  groups = [],
  initialTab = "content",
  initialChat,
}: TemplateEditorProps) {
  const [rightPanel, setRightPanel] = useState<"chat" | "details" | null>("chat");
  const [activeTab, setActiveTab] = useState<EditorTab>(initialTab);
  const [templateName, setTemplateName] = useState("Champions-league-weekend2026");
  const [templateLoaded, setTemplateLoaded] = useState(
    !initialChat || initialChat[initialChat.length - 1]?.type !== "typing",
  );
  const [emailForm, setEmailForm] = useState<EmailFormState>({ subject: "", preview: "" });
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [workbenchInitialized, setWorkbenchInitialized] = useState(false);
  const [previewVariantsActive, setPreviewVariantsActive] = useState(false);
  const [workbenchInnerTab, setWorkbenchInnerTab] = useState<WorkbenchInnerTab>("variants");
  const [highlightColumnId, setHighlightColumnId] = useState<string | null>(null);
  const [templateContent, setTemplateContent] = useState<TemplateContent>(DEFAULT_TEMPLATE_CONTENT);

  useEffect(() => {
    if (!initialChat || initialChat[initialChat.length - 1]?.type !== "typing") return;
    const timer = setTimeout(() => setTemplateLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, [initialChat]);

  useEffect(() => {
    if (!highlightColumnId) return;
    const timer = setTimeout(() => setHighlightColumnId(null), 2000);
    return () => clearTimeout(timer);
  }, [highlightColumnId]);

  useEffect(() => {
    if (activeTab === "workbench" && workbenchInnerTab === "variants") {
      setRightPanel(null);
    }
  }, [activeTab, workbenchInnerTab]);

  const fieldHasContent = (formValue: string, columnValues: string[]) =>
    formValue.trim().length > 0 || columnValues.some((v) => v.trim().length > 0);

  const handleEmailFieldChange = (key: string, value: string) => {
    setEmailForm((form) => ({ ...form, [key]: value }));
  };

  const handleAddVariant = (field: "subjectLine" | "previewText") => {
    const value = field === "subjectLine" ? emailForm.subject.trim() : emailForm.preview.trim();

    setActiveTab("workbench");
    setWorkbenchInnerTab("variants");
    setWorkbenchInitialized(true);
    setHighlightColumnId(field);
    setRightPanel(null);
    if (field === "previewText") setPreviewVariantsActive(true);

    setVariants((prev) => {
      if (prev.length === 0) {
        return [createVariantRow(1, {
          subjectLine: field === "subjectLine" ? value : "",
          previewText: field === "previewText" ? value : "",
        })];
      }

      const next = [...prev];
      const first = { ...next[0] };
      if (value) first[field] = value;
      next[0] = first;
      return next;
    });
  };

  const subjectVariantCount = workbenchInitialized ? variants.length : 0;
  const previewVariantCount =
    previewVariantsActive && workbenchInitialized ? variants.length : 0;

  const subjectFilled = fieldHasContent(
    emailForm.subject,
    variants.map((v) => v.subjectLine),
  );
  const previewFilled = fieldHasContent(
    emailForm.preview,
    variants.map((v) => v.previewText),
  );

  const showSubjectPill = subjectFilled && subjectVariantCount >= 2;
  const showPreviewPill = previewFilled && previewVariantCount >= 2;

  const handleWorkbenchActivate = (apply: (rows: VariantRow[]) => VariantRow[]) => {
    setWorkbenchInitialized(true);
    setVariants((prev) => {
      const base = prev.length > 0 ? prev : [createVariantRow(1), createVariantRow(2)];
      return apply(base);
    });
  };

  const emailDetailsPanel = (
    <EmailDetailsPanel
      form={emailForm}
      onFieldChange={handleEmailFieldChange}
      onAddVariant={handleAddVariant}
      subjectVariantCount={subjectVariantCount}
      previewVariantCount={previewVariantCount}
      showSubjectPill={showSubjectPill}
      showPreviewPill={showPreviewPill}
    />
  );

  const selectChat = () => setRightPanel((panel) => (panel === "chat" ? null : "chat"));
  const selectDetails = () => setRightPanel((panel) => (panel === "details" ? null : "details"));

  return (
    <div className="flex h-screen overflow-hidden">
      <ContentStudioSidebar onNavigate={onNavigate} activePage="home" />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav />
        <EditorToolbar
          onBack={onBack}
          templateName={templateName}
          onTemplateNameChange={setTemplateName}
        />
        <EditorSecondaryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "content" && (
          <div className="flex-1 flex overflow-hidden bg-[#eaecf0]">
            <EmailPreview
              loaded={templateLoaded}
              content={templateContent}
              onContentChange={setTemplateContent}
            />
            {rightPanel === "details" && emailDetailsPanel}
            {rightPanel === "chat" && (
              isV3Available
                ? <OptiGeniePanelV3 tab={activeTab} templateName={templateName} />
                : <OptiGeniePanel initialMessages={initialChat} />
            )}
            <RightToolbar
              activePanel={rightPanel}
              onSelectChat={selectChat}
              onSelectDetails={selectDetails}
            />
          </div>
        )}

        {activeTab === "workbench" && (
          <div className="flex-1 flex overflow-hidden bg-white">
            <WorkbenchView
              variants={variants}
              onVariantsChange={setVariants}
              initialized={workbenchInitialized}
              onActivate={handleWorkbenchActivate}
              innerTab={workbenchInnerTab}
              onInnerTabChange={setWorkbenchInnerTab}
              highlightColumnId={highlightColumnId}
            />
            {rightPanel === "details" && emailDetailsPanel}
            {rightPanel === "chat" && (
              isV3Available
                ? <OptiGeniePanelV3 tab={activeTab} templateName={templateName} />
                : <OptiGeniePanel initialMessages={initialChat} />
            )}
            <RightToolbar
              activePanel={rightPanel}
              onSelectChat={selectChat}
              onSelectDetails={selectDetails}
            />
          </div>
        )}

        {activeTab === "preview" && (
          <div className="flex-1 flex overflow-hidden bg-white">
            <SmartPreviewView templateContent={templateContent} groups={groups} />
            <RightToolbar
              activePanel={rightPanel}
              onSelectChat={selectChat}
              onSelectDetails={selectDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
}
