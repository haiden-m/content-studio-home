import { useState } from "react";
import {
  BarChart2, Megaphone, Monitor, Users, PieChart, Database, Upload,
  LifeBuoy, Settings, ChevronDown, ChevronRight, Bell,
  LayoutGrid, LayoutDashboard, FileText, Activity, Workflow, Bot,
  Star, Layers, Trash2, RotateCcw, RotateCw, Folder, Maximize2,
} from "lucide-react";
import imgAvatar from "@/imports/ContentStudioHomePageCreate/2763c276e556902c52ce30605cd2c923b103af84.png";

// ─── Types ────────────────────────────────────────────────────────────────────

export type EditorTab = "content" | "workbench" | "preview";

// ─── Logo ─────────────────────────────────────────────────────────────────────

export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 29.268" fill="none">
      <path
        d="M15 0C6.716 0 0 6.566 0 14.668 0 22.77 6.716 29.268 15 29.268c3.592 0 6.893-1.25 9.475-3.32L28.8 29.07l1.2-1.15-4.32-3.996A14.48 14.48 0 0 0 30 14.668C30 6.566 23.284 0 15 0Zm0 2.12c7.01 0 12.715 5.6 12.715 12.548S22.01 27.148 15 27.148 2.285 21.616 2.285 14.668 7.99 2.12 15 2.12Z"
        fill="white"
      />
    </svg>
  );
}

// ─── Top-right user badge (shared across all pages) ───────────────────────────

export function TopNav() {
  return (
    <header className="h-[60px] bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-end px-6 flex-shrink-0 z-10">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-5 text-[#90a4ae]">
          <Bell size={20} strokeWidth={1.5} />
          <Settings size={20} strokeWidth={1.5} />
        </div>
        <div className="w-px h-7 bg-[#eceff1]" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#90a4ae]">Khumbira Kasambala</span>
          <ChevronDown size={18} color="#90a4ae" strokeWidth={1.5} />
        </div>
        <div className="w-[38px] h-[38px] rounded-full bg-[#13aaaf] flex items-center justify-center">
          <span className="text-white text-sm font-bold">KK</span>
        </div>
      </div>
    </header>
  );
}

// ─── ContentStudio Sidebar (80px, home page) ──────────────────────────────────

const HOME_NAV = [
  { icon: BarChart2,    label: "Dashboard" },
  { icon: Megaphone,    label: "Campaigns" },
  { icon: Monitor,      label: "Preview" },
  { icon: Users,        label: "Audience" },
  { icon: PieChart,     label: "Analytics" },
  { icon: Database,     label: "Data" },
  { icon: Upload,       label: "Import" },
];

export function ContentStudioSidebar() {
  const [active, setActive] = useState(0);
  return (
    <aside className="w-20 flex-shrink-0 bg-[#3c378e] flex flex-col justify-between py-6 z-10">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-center w-10 h-10">
          <LogoMark size={26} />
        </div>
        <nav className="flex flex-col gap-1 items-center w-full px-2">
          {HOME_NAV.map((item, i) => {
            const Icon = item.icon;
            const isActive = active === i;
            return (
              <button
                key={i}
                title={item.label}
                onClick={() => setActive(i)}
                className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
                  isActive ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                <Icon size={22} color={isActive ? "white" : "#D0D5DD"} strokeWidth={1.8} />
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button title="Help" className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white/10">
          <LifeBuoy size={20} color="#D0D5DD" strokeWidth={1.8} />
        </button>
        <button title="Settings" className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white/10">
          <Settings size={20} color="#D0D5DD" strokeWidth={1.8} />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#cfcbdc] ring-2 ring-white/20">
          <img src={imgAvatar} alt="User" className="w-full h-full object-cover" />
        </div>
      </div>
    </aside>
  );
}

// ─── Editor Sidebar (66px, template editor) ───────────────────────────────────

const EDITOR_NAV = [
  { icon: LayoutGrid,      label: "Content" },
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users,           label: "Audience" },
  { icon: FileText,        label: "Content Studio", activeItem: true },
  { icon: Activity,        label: "Campaigns" },
  { icon: Workflow,        label: "Journeys" },
  { icon: Database,        label: "Data" },
  { icon: Bot,             label: "OptiBot", badge: "+9" },
];

export function EditorSidebar({ activeIndex = 3 }: { activeIndex?: number }) {
  return (
    <aside className="w-[66px] flex-shrink-0 bg-[#46398c] flex flex-col justify-between z-10">
      <div className="flex flex-col items-center">
        <div className="h-[60px] w-full bg-[#46398c] shadow-[0px_2px_6px_rgba(0,0,0,0.25)] flex items-center justify-center">
          <LogoMark size={24} />
        </div>
        <nav className="flex flex-col w-full">
          {EDITOR_NAV.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === activeIndex;
            return (
              <div key={i} className="relative">
                <div
                  className={`h-14 w-full flex items-center justify-center ${
                    isActive ? "bg-[#342f62]" : "bg-[#46398c] hover:bg-[#3d3480]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#dff670] rounded-r-sm" />
                  )}
                  <div className="relative">
                    <Icon size={16} color={isActive ? "white" : "#CDD5DF"} strokeWidth={1.5} />
                    {item.badge && (
                      <span className="absolute -top-2 -right-3 bg-[#dff670] text-[#46398c] text-[8px] font-bold px-1 rounded-full leading-tight">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-col items-center pb-4">
        <div className="w-full h-px bg-[#697586] mb-3" />
        <button className="w-14 h-10 flex items-center justify-center hover:bg-white/10">
          <Settings size={16} color="#CDD5DF" strokeWidth={1.5} />
        </button>
        <button className="w-14 h-10 flex items-center justify-center hover:bg-white/10">
          <ChevronRight size={16} color="#CDD5DF" strokeWidth={1.5} />
        </button>
      </div>
    </aside>
  );
}

// ─── Secondary Icon Panel (home page only) ────────────────────────────────────

const SECONDARY_TABS = [
  { icon: Layers,     label: "All" },
  { icon: LayoutGrid, label: "Grid" },
  { icon: Star,       label: "Favourites" },
  { icon: Database,   label: "Saved" },
  { icon: Trash2,     label: "Trash", danger: true },
];

export function SecondaryIconPanel() {
  const [active, setActive] = useState(0);
  return (
    <aside className="w-[52px] flex-shrink-0 bg-white border-r border-[#d0d5dd] flex flex-col gap-1 items-center pt-5 pb-4">
      {SECONDARY_TABS.map((tab, i) => {
        const Icon = tab.icon;
        const isActive = active === i;
        return (
          <button
            key={i}
            title={tab.label}
            onClick={() => setActive(i)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
              isActive ? "bg-[#e6e5fc]" : "hover:bg-[#f2f4f7]"
            }`}
          >
            <Icon size={16} color={(tab as any).danger ? "#D92D20" : isActive ? "#604DD0" : "#667085"} strokeWidth={1.5} />
          </button>
        );
      })}
    </aside>
  );
}

// ─── Editor Toolbar ───────────────────────────────────────────────────────────

export function EditorToolbar({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-[82px] bg-white border-b border-[#d0d5dd] flex items-center gap-5 px-4 flex-shrink-0">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1 h-10 border-r border-[#d0d5dd] pr-4">
          <button className="w-9 h-9 flex items-center justify-center hover:bg-[#f2f4f7] rounded">
            <RotateCcw size={18} color="#667085" strokeWidth={2} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center hover:bg-[#f2f4f7] rounded">
            <RotateCw size={18} color="#667085" strokeWidth={2} />
          </button>
        </div>
        <button className="flex items-center justify-center hover:bg-[#f2f4f7] rounded p-1">
          <Folder size={22} color="#604DD0" strokeWidth={2} />
        </button>
        <div className="flex items-center border border-[#d0d5dd] rounded-lg px-3 py-2 bg-white min-w-[220px]">
          <span className="text-[#101828] text-sm font-normal">Champions-league-weekend2026</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-end gap-3">
        {["Run Campaign", "Validate"].map((label) => (
          <button key={label} className="h-10 px-4 border border-[#d0d5dd] rounded-lg text-sm font-semibold text-[#344054] bg-white hover:bg-[#f2f4f7] shadow-sm transition-colors">
            {label}
          </button>
        ))}
        <button onClick={onBack} className="h-10 px-4 border border-[#d0d5dd] rounded-lg text-sm font-semibold text-[#344054] bg-white hover:bg-[#f2f4f7] shadow-sm transition-colors">
          Back
        </button>
        <button className="h-10 px-4 bg-[#7068de] border border-[#7068de] rounded-lg text-sm font-semibold text-white hover:bg-[#5f57cc] shadow-sm transition-colors">
          Save
        </button>
      </div>
    </div>
  );
}

// ─── Editor Secondary Tabs ────────────────────────────────────────────────────

export function EditorSecondaryTabs({ activeTab, onTabChange }: { activeTab: EditorTab; onTabChange: (t: EditorTab) => void }) {
  return (
    <div className="h-[60px] bg-white border-b border-[#d0d5dd] flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-1">
        {(["content", "workbench", "preview"] as EditorTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`h-11 px-3 rounded-md text-base font-semibold transition-colors ${
              activeTab === tab ? "bg-[#e6e5fc] text-[#344054]" : "text-[#667085] hover:bg-[#f2f4f7]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="text-sm font-semibold text-[#475467] hover:text-[#344054]">
          Convert to HTML
        </button>
        <button className="w-10 h-10 border border-[#d0d5dd] rounded-lg flex items-center justify-center hover:bg-[#f2f4f7] shadow-sm">
          <Maximize2 size={16} color="#667085" />
        </button>
      </div>
    </div>
  );
}
