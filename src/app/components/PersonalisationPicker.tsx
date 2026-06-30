import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlignLeft, Search, Users, X } from "lucide-react";
import {
  PERSONALISATION_OPTIONS,
  type PersonalisationFilter,
  type PersonalisationOption,
  type PersonalisationTab,
} from "../templateContent";

const ROBOTO = { fontFamily: "'Roboto', sans-serif" } as const;

const PANEL_WIDTH = 360;
const PANEL_MAX_HEIGHT = 380;

const TABS: { id: PersonalisationTab; label: string }[] = [
  { id: "snippets", label: "Snippets" },
  { id: "content_blocks", label: "Blocks" },
  { id: "personalisation_tags", label: "Tags" },
];

const FILTERS: { id: PersonalisationFilter; label: string }[] = [
  { id: "variants", label: "Variants" },
  { id: "data_connections", label: "Data" },
  { id: "variables", label: "Variables" },
];

export interface PersonalisationPickerAnchor {
  top: number;
  left: number;
}

interface PersonalisationPickerProps {
  anchor: PersonalisationPickerAnchor;
  onSelect: (option: PersonalisationOption) => void;
  onClose: () => void;
}

function clampPosition(anchor: PersonalisationPickerAnchor) {
  const margin = 12;
  const left = Math.min(
    Math.max(margin, anchor.left),
    window.innerWidth - PANEL_WIDTH - margin,
  );
  const top = Math.min(
    Math.max(margin, anchor.top),
    window.innerHeight - PANEL_MAX_HEIGHT - margin,
  );
  return { top, left };
}

export function PersonalisationPicker({
  anchor,
  onSelect,
  onClose,
}: PersonalisationPickerProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<PersonalisationTab>("snippets");
  const [activeFilter, setActiveFilter] = useState<PersonalisationFilter>("variants");
  const panelRef = useRef<HTMLDivElement>(null);
  const position = clampPosition(anchor);

  useEffect(() => {
    const availableFilters = FILTERS.filter((filter) =>
      PERSONALISATION_OPTIONS.some(
        (option) => option.tab === activeTab && option.filter === filter.id,
      ),
    );
    if (!availableFilters.some((filter) => filter.id === activeFilter)) {
      setActiveFilter(availableFilters[0]?.id ?? "variants");
    }
  }, [activeFilter, activeTab]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [onClose]);

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PERSONALISATION_OPTIONS.filter((option) => {
      if (option.tab !== activeTab) return false;
      if (option.filter !== activeFilter) return false;
      if (!query) return true;
      return (
        option.title.toLowerCase().includes(query) ||
        option.preview.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query)
      );
    });
  }, [activeFilter, activeTab, search]);

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <div
        ref={panelRef}
        className="fixed bg-white border border-[#d0d5dd] rounded-lg shadow-[0px_0px_16px_-4px_rgba(16,24,40,0.1),0px_6px_6px_-4px_rgba(16,24,40,0.04)] flex flex-col overflow-hidden max-h-[380px]"
        style={{
          top: position.top,
          left: position.left,
          width: PANEL_WIDTH,
        }}
      >
        <div className="relative flex items-center gap-2.5 px-4 py-3 border-b border-[#eaecf0] shrink-0">
          <div className="size-8 rounded-lg border border-[#eaecf0] shadow-sm flex items-center justify-center shrink-0">
            <Users size={16} className="text-[#344054]" strokeWidth={1.75} />
          </div>
          <h2 className="text-sm font-semibold text-[#101828] flex-1 min-w-0" style={ROBOTO}>
            Personalisation Picker
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="size-7 flex items-center justify-center rounded-md text-[#667085] hover:bg-[#f2f4f7] hover:text-[#344054] transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-3 px-4 py-3 overflow-y-auto min-h-0">
          <div className="flex items-center gap-2 px-2.5 py-1.5 border border-[#d0d5dd] rounded-md shadow-sm bg-white">
            <Search size={15} className="text-[#667085] shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex-1 min-w-0 text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none bg-transparent"
              style={ROBOTO}
            />
          </div>

          <div className="flex gap-0.5 p-0.5 bg-[#f9fafb] border border-[#eaecf0] rounded-lg">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 h-7 px-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-[#344054] shadow-sm"
                    : "text-[#667085] hover:text-[#344054]"
                }`}
                style={ROBOTO}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1">
            {FILTERS.map((filter) => {
              const selected = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-medium border transition-colors ${
                    selected
                      ? "bg-[#e6e5fc] border-[#d0d5dd] text-[#344054]"
                      : "bg-white border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]"
                  }`}
                  style={ROBOTO}
                >
                  {filter.label}
                  {selected && <X size={10} className="text-[#667085]" />}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            {filteredOptions.length === 0 ? (
              <p className="text-xs text-[#667085] py-4 text-center" style={ROBOTO}>
                No options found.
              </p>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelect(option)}
                  className="w-full text-left border border-[#eaecf0] rounded-lg px-3 py-2.5 hover:border-[#7068de] hover:bg-[#fcfcff] transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="size-6 rounded-full bg-[#e6e5fc] flex items-center justify-center shrink-0 mt-0.5">
                      <AlignLeft size={12} className="text-[#5342ae]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-[#344054]" style={ROBOTO}>
                        {option.title}
                      </p>
                      <p className="text-xs text-[#475467] mt-0.5 truncate" style={ROBOTO}>
                        {option.variantLabel ? (
                          <>
                            {option.variantLabel}{" "}
                            <span className="font-semibold text-[#7068de]">{option.preview}</span>
                          </>
                        ) : (
                          <span className="font-semibold text-[#7068de]">{option.preview}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
