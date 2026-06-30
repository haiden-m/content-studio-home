import { useState, useRef, useCallback, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown, ChevronRight, Plus, Search, Mic, Send, Check,
  ArrowUpDown, LayoutGrid, List, Star, Mail, Smartphone, FileText, X,
} from "lucide-react";

import iconContentBlocks from "@/imports/TemplateTypeIcons/content-blocks.svg";
import iconOptimail from "@/imports/TemplateTypeIcons/optimail.svg";
import iconOptitext from "@/imports/TemplateTypeIcons/optitext.svg";
import iconMobilePush from "@/imports/TemplateTypeIcons/mobile-push.svg";
import iconWebInbox from "@/imports/TemplateTypeIcons/web-inbox.svg";
import iconGroup6 from "@/imports/TemplateTypeIcons/group6.svg";
import iconGroup7 from "@/imports/TemplateTypeIcons/group7.svg";

import imgCard1 from "@/imports/ContentStudioHomePageCreate/6149919ac4de8db6ccf79c40e72210029578877f.png";
import imgCard2 from "@/imports/ContentStudioHomePageCreate/8df9196a83d6ff752c77ceff5680104c84a2585b.png";
import imgCard3 from "@/imports/ContentStudioHomePageCreate/eeb41cb1c8ebe158c8e4d1e9c5d1de9e6344cb75.png";
import imgCard4 from "@/assets/champions-league-email-template.png";
import Menu from "@/imports/Menu";
import SearchBox from "@/imports/Search";

import { ContentStudioSidebar, SecondaryIconPanel, TopNav } from "../shared";
import { type AIChatSession } from "../aiChat";

// ─── Drag-scroll hook ─────────────────────────────────────────────────────────

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
    scrollLeft.current = ref.current?.scrollLeft ?? 0;
  }, []);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.4;
  }, []);
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  return { ref, onMouseDown, onMouseMove, onMouseUp, onMouseLeave: onMouseUp };
}

function useAnimatedHeight(activeKey: boolean, remeasureKey = 0) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const hasMeasured = useRef(false);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const nextHeight = el.offsetHeight;
    if (!hasMeasured.current) {
      hasMeasured.current = true;
      setHeight(nextHeight);
      return;
    }

    requestAnimationFrame(() => setHeight(nextHeight));
  }, [activeKey, remeasureKey]);

  return { contentRef, height };
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  kind: "image" | "document";
  previewUrl: string | null;
  extension: string;
}

const DOCUMENT_EXTENSIONS = new Set(["PDF", "DOC", "DOCX"]);

function getUploadFileKind(file: File): "image" | "document" {
  if (file.type.startsWith("image/")) return "image";

  const extension = file.name.split(".").pop()?.toUpperCase() ?? "";
  if (DOCUMENT_EXTENSIONS.has(extension)) return "document";

  if (
    file.type === "application/pdf" ||
    file.type === "application/msword" ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "document";
  }

  return "document";
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function badgeColor(extension: string) {
  if (extension === "PDF") return "bg-[#d92d20]";
  if (extension === "DOC" || extension === "DOCX") return "bg-[#175cd3]";
  return "bg-[#667085]";
}

function UploadedFileAttachment({
  file,
  onRemove,
}: {
  file: UploadedFile;
  onRemove: () => void;
}) {
  return (
    <div className="relative bg-white border border-[#eaecf0] rounded-tl-lg rounded-tr-lg rounded-br-lg max-w-[320px]">
      <div className="flex items-start gap-3 px-3.5 py-2.5">
        {file.kind === "image" && file.previewUrl ? (
          <img
            src={file.previewUrl}
            alt={file.name}
            className="size-10 rounded object-cover shrink-0 border border-[#eaecf0]"
          />
        ) : (
          <div className="relative size-10 shrink-0">
            <div className="size-10 rounded border border-[#d0d5dd] bg-[#f9fafb] flex items-center justify-center">
              <FileText size={20} color="#667085" strokeWidth={1.5} />
            </div>
            <span
              className={`absolute bottom-0 left-0 px-1 py-px rounded text-[10px] font-bold text-white leading-none ${badgeColor(file.extension)}`}
            >
              {file.extension}
            </span>
          </div>
        )}
        <div className="min-w-0 flex-1 pr-5">
          <p className="text-sm font-medium text-[#344054] truncate">{file.name}</p>
          <p className="text-sm text-[#475467]">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 size-5 rounded-full flex items-center justify-center text-[#98a2b3] hover:bg-[#f2f4f7] hover:text-[#667085] transition-colors"
        aria-label={`Remove ${file.name}`}
      >
        <X size={12} />
      </button>
    </div>
  );
}

// ─── Template type carousel cards ────────────────────────────────────────────

const TEMPLATE_TYPES = [
  { name: "Content Blocks",     icon: iconContentBlocks },
  { name: "OptiMail",           icon: iconOptimail },
  { name: "OptiText",           icon: iconOptitext },
  { name: "Mobile Push",        icon: iconMobilePush },
  { name: "Overlay",            icon: iconWebInbox },
  { name: "Mobile In-App",      icon: iconGroup6 },
  { name: "Embedded Messaging", icon: iconGroup7 },
  { name: "Web Inbox",          icon: iconWebInbox },
  { name: "WhatsApp",           icon: iconGroup6 },
];

// ─── Template grid cards ──────────────────────────────────────────────────────

interface TemplateCard {
  title: string; image: string; starred: boolean; editorType: string;
  campaigns: number; modified: string; status: "live"|"draft"|"active"; channel: "mail"|"mobile"|"push";
}

const TEMPLATE_CARDS: TemplateCard[] = [
  { title: "Product Promotional Template", image: imgCard1, starred: true,  editorType: "HTML Editor",   campaigns: 12, modified: "Dec 15, 2025", status: "live",   channel: "mail" },
  { title: "Free Bet Campaign Email",      image: imgCard2, starred: false, editorType: "Visual Editor", campaigns: 12, modified: "Dec 15, 2025", status: "draft",  channel: "mail" },
  { title: "Promotional Welcome Message",  image: imgCard3, starred: true,  editorType: "Mobile Push",   campaigns: 8,  modified: "Dec 10, 2025", status: "live",   channel: "push" },
  { title: "Champions League Promo",       image: imgCard4, starred: false, editorType: "Visual Editor", campaigns: 5,  modified: "Dec 8, 2025",  status: "active", channel: "mail" },
  { title: "Weekend Jackpot Alert",        image: imgCard2, starred: false, editorType: "HTML Editor",   campaigns: 3,  modified: "Dec 5, 2025",  status: "draft",  channel: "mail" },
  { title: "VIP Loyalty Reward",           image: imgCard1, starred: true,  editorType: "Visual Editor", campaigns: 20, modified: "Nov 28, 2025", status: "live",   channel: "mail" },
];

const STATUS_STYLE: Record<string, string> = {
  live:   "bg-[#ecfdf3] border border-[#abefc6] text-[#067647]",
  draft:  "bg-[#fffaeb] border border-[#fedf89] text-[#b54708]",
  active: "bg-[#eff8ff] border border-[#b2ddff] text-[#175cd3]",
};

function TemplateGridCard({ card, onClick }: { card: TemplateCard; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-[#eaecf0] shadow-sm hover:shadow-md hover:border-[#7068de]/30 transition-all overflow-hidden flex flex-col ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="relative aspect-[426/240] bg-[#f2f4f7] overflow-hidden">
        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 w-7 h-7 bg-[#e6e5fc] rounded-md flex items-center justify-center">
          {card.channel === "mail" ? <Mail size={12} color="#604DD0" /> : <Smartphone size={12} color="#604DD0" />}
        </div>
      </div>
      <div className="flex flex-col justify-between px-5 py-4 flex-1 gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <Star size={15} className={card.starred ? "fill-[#FCEA2B] stroke-black/30 flex-shrink-0" : "stroke-[#98a2b3] flex-shrink-0"} strokeWidth={0.5} />
            <span className="text-sm font-medium text-[#172b4d] leading-tight overflow-hidden text-ellipsis whitespace-nowrap">{card.title}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-[#344054] bg-[#f9fafb] border border-[#eaecf0] px-2 py-0.5 rounded-md">{card.editorType}</span>
            <span className="text-xs font-medium text-[#344054] bg-[#f9fafb] border border-[#eaecf0] px-2 py-0.5 rounded-full">{card.campaigns} campaigns</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#6b778c]">Modified {card.modified}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLE[card.status]}`}>
            {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

interface HomeProps {
  onNavigate: (session?: AIChatSession) => void;
  onPageNavigate?: (page: string) => void;
}

export default function HomePage({ onNavigate, onPageNavigate }: HomeProps) {
  const carousel = useDragScroll();
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const plusMenuRef = useRef<HTMLDivElement>(null);
  const plusMenuPortalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createMode, setCreateMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [createPrompt, setCreatePrompt] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { contentRef: searchCreateRef, height: searchCreateHeight } = useAnimatedHeight(
    createMode,
    uploadedFiles.length + createPrompt.length,
  );

  const removeUploadedFile = (id: string) => {
    setUploadedFiles((prev) => {
      const target = prev.find((file) => file.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((file) => file.id !== id);
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const nextFiles = files.map((file) => {
      const kind = getUploadFileKind(file);
      const extension = file.name.split(".").pop()?.toUpperCase() ?? "FILE";
      return {
        id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
        name: file.name,
        size: file.size,
        kind,
        previewUrl: kind === "image" ? URL.createObjectURL(file) : null,
        extension: kind === "image" ? "IMG" : extension,
      };
    });

    setUploadedFiles((prev) => [...prev, ...nextFiles]);
    setShowPlusMenu(false);
    e.target.value = "";
  };

  const openCreateMode = () => {
    if (searchQuery.trim()) setCreatePrompt(searchQuery);
    setCreateMode(true);
  };

  const handleSendToAI = () => {
    const prompt = createPrompt.trim();
    if (!prompt && uploadedFiles.length === 0) return;

    onNavigate({
      prompt,
      attachments: uploadedFiles.map(({ name, size, extension, kind, previewUrl }) => ({
        name,
        size,
        extension,
        kind,
        previewUrl,
      })),
    });
    setCreatePrompt("");
    setUploadedFiles([]);
    setCreateMode(false);
  };

  const togglePlusMenu = () => {
    if (plusMenuRef.current) {
      const rect = plusMenuRef.current.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom + 8, left: rect.left });
    }
    setShowPlusMenu((v) => !v);
  };

  useEffect(() => {
    if (!showPlusMenu) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        plusMenuRef.current?.contains(target) ||
        plusMenuPortalRef.current?.contains(target)
      ) {
        return;
      }
      setShowPlusMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPlusMenu]);

  const scrollCarousel = (dir: "right") => {
    carousel.ref.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ContentStudioSidebar onNavigate={onPageNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav />

        <div className="flex flex-1 overflow-hidden min-h-0">
          <SecondaryIconPanel />

          <main className="flex-1 overflow-y-auto">
          {/* Hero */}
          <div className="px-6 pt-6 pb-8 bg-white">
            {/* Page header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-[30px] font-medium text-[#101828] leading-tight">Content Studio</h1>
                <p className="text-sm text-[#667085] mt-0.5">Your central hub for reusable content across channels.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-10 px-4 border border-[#d0d5dd] rounded-lg text-sm font-semibold text-[#344054] bg-white hover:bg-[#f2f4f7] shadow-sm flex items-center gap-2 transition-colors">
                  Brands <ChevronDown size={16} color="#344054" />
                </button>
                <button
                  onClick={openCreateMode}
                  className="h-10 px-4 bg-[#7068de] border border-[#7068de] rounded-lg text-sm font-semibold text-white hover:bg-[#5f57cc] shadow-sm flex items-center gap-2 transition-colors"
                >
                  <Plus size={16} strokeWidth={2} /> Create
                </button>
              </div>
            </div>

            <div className="h-px bg-[#eaecf0] mb-8" />

            {/* Search / AI Create Box */}
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-[704px]">
                <div
                  className="overflow-hidden transition-[height] duration-300 ease-in-out"
                  style={{ height: searchCreateHeight ?? "auto" }}
                >
                  <div ref={searchCreateRef}>
                    {!createMode ? (
                      <div className="relative">
                        <SearchBox value={searchQuery} onChange={setSearchQuery} />
                        <div
                          className="absolute bottom-0 right-0 h-[48px] w-[130px] cursor-pointer"
                          onClick={openCreateMode}
                        />
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-[#c3c3f7] shadow-[0px_4px_10px_0px_rgba(112,104,222,0.2)]">
                        <div className="px-4 pt-4 pb-3 border-b border-[#a4a3f3]/30">
                          <div className="flex items-start gap-3 text-[#667085] mb-4">
                            <Search size={18} strokeWidth={1.8} className="shrink-0 mt-0.5" />
                            <textarea
                              value={createPrompt}
                              onChange={(e) => setCreatePrompt(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendToAI();
                                }
                              }}
                              placeholder="Describe what you would like to create"
                              rows={2}
                              className="flex-1 min-w-0 resize-none text-sm text-[#101828] placeholder:text-[#667085] bg-transparent focus:outline-none leading-5"
                            />
                          </div>
                          {uploadedFiles.length > 0 && (
                            <div className="flex flex-col gap-1.5 mb-4">
                              {uploadedFiles.map((file) => (
                                <UploadedFileAttachment
                                  key={file.id}
                                  file={file}
                                  onRemove={() => removeUploadedFile(file.id)}
                                />
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div ref={plusMenuRef} className="relative">
                                <button
                                  onClick={togglePlusMenu}
                                  className="w-8 h-8 rounded-full border border-[#d0d5dd] bg-white flex items-center justify-center hover:bg-[#f2f4f7] shadow-sm"
                                >
                                  <Plus size={14} color="#344054" />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="w-8 h-8 rounded-full border border-[#d0d5dd] bg-white flex items-center justify-center hover:bg-[#f2f4f7] shadow-sm">
                                <Mic size={14} color="#344054" />
                              </button>
                              <button
                                onClick={handleSendToAI}
                                className="w-8 h-8 rounded-full border border-[#d0d5dd] bg-white flex items-center justify-center hover:bg-[#f2f4f7] shadow-sm"
                              >
                                <Send size={14} color="#344054" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="h-12 bg-[#e6e5fc] border-t border-[#a4a3f3]/50 px-4 flex items-center justify-between rounded-b-xl">
                          <div className="flex items-center gap-2">
                            {["Item", "Tone"].map((label) => (
                              <div key={label} className="flex items-center gap-1 bg-[#f8f9fc] border border-[#d5d9eb] rounded-full pl-3 pr-2 py-1">
                                <span className="text-sm font-medium text-[#363f72]">{label}</span>
                                <ChevronDown size={10} color="#604DD0" />
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCreateMode(false)}>
                            <div className="flex items-center justify-end bg-[#7068de] rounded-full px-1 py-1 w-9">
                              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                <Check size={10} color="#7068de" strokeWidth={3} />
                              </div>
                            </div>
                            <span className="text-sm font-medium text-[#344054]">Create</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Create templates carousel */}
            <div className="mb-2">
              <h2 className="text-xl font-medium text-[#101828] mb-4">Create templates</h2>
              <div className="relative group">
                <div
                  ref={carousel.ref}
                  onMouseDown={carousel.onMouseDown}
                  onMouseMove={carousel.onMouseMove}
                  onMouseUp={carousel.onMouseUp}
                  onMouseLeave={carousel.onMouseLeave}
                  className="flex gap-3 overflow-x-auto pb-2 cursor-grab select-none"
                  style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
                >
                  {TEMPLATE_TYPES.map((type) => (
                    <button
                      key={type.name}
                      style={{ scrollSnapAlign: "start" }}
                      onClick={() => type.name === "OptiMail" ? onNavigate() : undefined}
                      className="flex-shrink-0 w-[200px] h-[82px] bg-white rounded-lg border border-[#eaecf0] shadow-sm hover:shadow-md hover:border-[#7068de]/40 transition-all flex items-center justify-between px-4"
                    >
                      <span className="text-sm font-normal text-[#101828] text-left leading-tight">{type.name}</span>
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img src={type.icon} alt={type.name} className="w-full h-full" />
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md border border-[#eaecf0] flex items-center justify-center hover:bg-[#f2f4f7] transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={16} color="#667085" />
                </button>
              </div>
            </div>
          </div>

          {/* White section — template grid */}
          <div className="bg-white px-6 py-6">
            <div className="flex items-center justify-between mb-5">
              <button className="h-10 px-4 border border-[#d0d5dd] rounded-lg text-sm font-semibold text-[#344054] bg-white hover:bg-[#f2f4f7] shadow-sm flex items-center gap-2">
                <ArrowUpDown size={16} color="#344054" /> Sort
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#475467]">12 Templates</span>
                <div className="flex border border-[#d0d5dd] rounded-lg shadow-sm overflow-hidden">
                  <button className="h-10 px-3 bg-[#e6e5fc] border-r border-[#d0d5dd] flex items-center justify-center">
                    <LayoutGrid size={18} color="#344054" />
                  </button>
                  <button className="h-10 px-3 bg-white flex items-center justify-center hover:bg-[#f2f4f7]">
                    <List size={18} color="#344054" />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 xl:grid-cols-4">
              {TEMPLATE_CARDS.map((card, i) => (
                <TemplateGridCard
                  key={i}
                  card={card}
                  onClick={card.channel === "mail" ? () => onNavigate() : undefined}
                />
              ))}
            </div>
          </div>
        </main>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/*,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileUpload}
      />

      {showPlusMenu && createPortal(
        <div
          ref={plusMenuPortalRef}
          className="fixed z-[9999] w-[240px]"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <Menu onAddFile={() => fileInputRef.current?.click()} />
        </div>,
        document.body,
      )}
    </div>
  );
}
