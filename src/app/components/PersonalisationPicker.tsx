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

const TABS: { id: PersonalisationTab; label: string }[] = [
  { id: "snippets", label: "Snippets" },
  { id: "content_blocks", label: "Content Blocks" },
  { id: "personalisation_tags", label: "Personalisation Tags" },
];

const FILTERS: { id: PersonalisationFilter; label: string }[] = [
  { id: "variants", label: "Variants" },
  { id: "data_connections", label: "Data connections" },
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
  const width = 496;
  const height = 520;
  const margin = 16;
  const left = Math.min(
    Math.max(margin, anchor.left),
    window.innerWidth - width - margin,
  );
  const top = Math.min(
    Math.max(margin, anchor.top),
    window.innerHeight - height - margin,
  );
  return { top, left, width };
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
        className="fixed bg-white border border-[#d0d5dd] rounded-xl shadow-[0px_0px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] flex flex-col overflow-hidden"
        style={{ top: position.top, left: position.left, width: position.width }}
      >
        <div className="relative pt-6 px-6 pb-5 border-b border-transparent">
          <div className="size-12 rounded-[10px] border border-[#eaecf0] shadow-sm flex items-center justify-center mb-4">
            <Users size={22} className="text-[#344054]" strokeWidth={1.75} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 size-11 flex items-center justify-center rounded-lg text-[#667085] hover:bg-[#f2f4f7] hover:text-[#344054] transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-semibold text-[#101828] leading-7" style={ROBOTO}>
            Personalisation Picker
          </h2>
        </div>

        <div className="flex flex-col gap-5 px-6 pb-6 overflow-y-auto max-h-[400px]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-2 border border-[#d0d5dd] rounded-lg shadow-sm bg-white">
              <Search size={18} className="text-[#667085] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="flex-1 min-w-0 text-base text-[#101828] placeholder:text-[#667085] focus:outline-none bg-transparent"
                style={ROBOTO}
              />
            </div>

            <div className="flex gap-1 p-1 bg-[#f9fafb] border border-[#eaecf0] rounded-[10px]">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 h-9 px-3 rounded-md text-sm font-semibold transition-colors whitespace-nowrap ${
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
          </div>

          <div className="flex flex-wrap gap-1">
            {FILTERS.map((filter) => {
              const selected = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium border transition-colors ${
                    selected
                      ? "bg-[#e6e5fc] border-[#d0d5dd] text-[#344054]"
                      : "bg-white border-[#d0d5dd] text-[#344054] hover:bg-[#f9fafb]"
                  }`}
                  style={ROBOTO}
                >
                  {filter.label}
                  {selected && (
                    <span className="inline-flex p-0.5 rounded-sm text-[#667085]">
                      <X size={12} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            {filteredOptions.length === 0 ? (
              <p className="text-sm text-[#667085] py-8 text-center" style={ROBOTO}>
                No personalisation options found.
              </p>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelect(option)}
                  className="w-full text-left border border-[#eaecf0] rounded-xl p-4 hover:border-[#7068de] hover:bg-[#fcfcff] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-full bg-[#e6e5fc] flex items-center justify-center shrink-0">
                      <AlignLeft size={16} className="text-[#5342ae]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#344054]" style={ROBOTO}>
                        {option.title}
                      </p>
                      <p className="text-sm text-[#475467] mt-1 truncate" style={ROBOTO}>
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
