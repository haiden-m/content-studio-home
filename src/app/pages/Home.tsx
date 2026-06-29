import { useState, useRef, useCallback, useEffect } from "react";
import {
  ChevronDown, ChevronRight, Plus, Search, Mic, Send, Check,
  SlidersHorizontal, LayoutGrid, List, Star, Mail, Smartphone,
  Layers, Globe, Bell, MessageCircle, MessageSquare,
} from "lucide-react";

import imgCard1 from "@/imports/ContentStudioHomePageCreate/6149919ac4de8db6ccf79c40e72210029578877f.png";
import imgCard2 from "@/imports/ContentStudioHomePageCreate/8df9196a83d6ff752c77ceff5680104c84a2585b.png";
import imgCard3 from "@/imports/ContentStudioHomePageCreate/eeb41cb1c8ebe158c8e4d1e9c5d1de9e6344cb75.png";
import imgCard4 from "@/imports/ContentStudioHomePageCreate/5afa5eb19b0c2c572932f69711b78801b847d3e6.png";
import Menu from "@/imports/Menu";
import SearchBox from "@/imports/Search";

import { ContentStudioSidebar, SecondaryIconPanel, TopNav } from "../shared";

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

// ─── Template type carousel cards ────────────────────────────────────────────

const TEMPLATE_TYPES = [
  { name: "Content Blocks",     icon: Layers,         color: "#7068de", bg: "#e6e5fc" },
  { name: "OptiMail",           icon: Mail,           color: "#2e6fdb", bg: "#dbeafe" },
  { name: "OptiText",           icon: MessageSquare,  color: "#059669", bg: "#d1fae5" },
  { name: "Mobile Push",        icon: Smartphone,     color: "#d97706", bg: "#fef3c7" },
  { name: "Overlay",            icon: Globe,          color: "#0891b2", bg: "#cffafe" },
  { name: "Mobile In-App",      icon: Smartphone,     color: "#7c3aed", bg: "#ede9fe" },
  { name: "Embedded Messaging", icon: MessageCircle,  color: "#db2777", bg: "#fce7f3" },
  { name: "Web Inbox",          icon: Bell,           color: "#065f46", bg: "#d1fae5" },
  { name: "WhatsApp",           icon: MessageCircle,  color: "#16a34a", bg: "#dcfce7" },
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
  onNavigate: (page: "template-editor") => void;
}

export default function HomePage({ onNavigate }: HomeProps) {
  const carousel = useDragScroll();
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const plusMenuRef = useRef<HTMLDivElement>(null);
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    if (!showPlusMenu) return;
    const handler = (e: MouseEvent) => {
      if (plusMenuRef.current && !plusMenuRef.current.contains(e.target as Node)) {
        setShowPlusMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPlusMenu]);

  const scrollCarousel = (dir: "right") => {
    carousel.ref.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ContentStudioSidebar />
      <SecondaryIconPanel />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav />

        <main className="flex-1 overflow-y-auto">
          {/* Gradient hero */}
          <div
            className="px-6 pt-6 pb-8"
            style={{ background: "linear-gradient(135deg, rgb(220,240,255) 0%, rgb(248,251,255) 35%, rgb(240,238,253) 70%, rgb(255,255,255) 100%)" }}
          >
            {/* Page header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-[30px] font-medium text-[#101828] leading-tight">Content Studio</h1>
                <p className="text-sm text-[#667085] mt-0.5">Create campaign templates</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="h-10 px-4 border border-[#d0d5dd] rounded-lg text-sm font-semibold text-[#344054] bg-white hover:bg-[#f2f4f7] shadow-sm flex items-center gap-2 transition-colors">
                  Brands <ChevronDown size={16} color="#344054" />
                </button>
                <button
                  onClick={() => onNavigate("template-editor")}
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
                {!createMode ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <SearchBox />
                    <div
                      className="absolute bottom-0 right-0 h-[48px] w-[130px] cursor-pointer"
                      onClick={() => setCreateMode(true)}
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-[#c3c3f7] shadow-[0px_4px_10px_0px_rgba(112,104,222,0.2)]">
                    <div className="px-4 pt-4 pb-3 border-b border-[#a4a3f3]/30">
                      <div className="flex items-center gap-3 text-[#667085] mb-4">
                        <Search size={18} strokeWidth={1.8} />
                        <span className="text-sm">Describe what you would like to create</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div ref={plusMenuRef} className="relative">
                            <button
                              onClick={() => setShowPlusMenu((v) => !v)}
                              className="w-8 h-8 rounded-full border border-[#d0d5dd] bg-white flex items-center justify-center hover:bg-[#f2f4f7] shadow-sm"
                            >
                              <Plus size={14} color="#344054" />
                            </button>
                            {showPlusMenu && (
                              <div className="absolute top-full mt-2 left-0 w-[240px] z-50">
                                <Menu />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 rounded-full border border-[#d0d5dd] bg-white flex items-center justify-center hover:bg-[#f2f4f7] shadow-sm">
                            <Mic size={14} color="#344054" />
                          </button>
                          <button
                            onClick={() => onNavigate("template-editor")}
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
                  {TEMPLATE_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.name}
                        style={{ scrollSnapAlign: "start" }}
                        onClick={() => type.name === "OptiMail" ? onNavigate("template-editor") : undefined}
                        className="flex-shrink-0 w-[190px] h-[82px] bg-white rounded-lg border border-[#eaecf0] shadow-sm hover:shadow-md hover:border-[#7068de]/40 transition-all flex items-center justify-between px-4"
                      >
                        <span className="text-sm font-normal text-[#101828] text-left leading-tight">{type.name}</span>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: type.bg }}>
                          <Icon size={18} color={type.color} strokeWidth={1.8} />
                        </div>
                      </button>
                    );
                  })}
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
                <SlidersHorizontal size={16} color="#344054" /> Sort
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
                  onClick={card.channel === "mail" ? () => onNavigate("template-editor") : undefined}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
