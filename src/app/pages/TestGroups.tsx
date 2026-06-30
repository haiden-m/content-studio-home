import { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus, Search, Star, Pin, MoreHorizontal, Trash2, Copy,
  PenLine, Building2, Users, Sparkles, X, Check, ChevronDown,
  SlidersHorizontal, Tag,
} from "lucide-react";
import { ContentStudioSidebar, TopNav } from "../shared";
import {
  type TestGroup,
  INITIAL_TEST_GROUPS,
  LABEL_COLORS,
  ALL_LABELS,
} from "../data/testGroupsMock";
import TestGroupWizardPage from "./TestGroupWizard";

const ROBOTO = { fontFamily: "'Roboto', sans-serif" } as const;

const AI_SUGGESTIONS = [
  "AI detected three duplicate Test Groups. Merge them?",
  "This Test Group hasn't been used in 8 months. Archive it?",
  "These Customer IDs frequently appear together. Create a reusable group?",
  "This group contains inactive customers. Remove them?",
  "AI detected 18 duplicate Customer IDs across groups. Remove duplicates?",
  "This group is nearing the 500 profile limit.",
];

// ─── LabelChip ───────────────────────────────────────────────────────────────

export function LabelChip({
  label,
  onRemove,
  size = "sm",
}: {
  label: string;
  onRemove?: () => void;
  size?: "sm" | "xs";
}) {
  const colors = LABEL_COLORS[label] ?? "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium whitespace-nowrap ${colors} ${
        size === "xs" ? "px-1.5 py-px text-[10px]" : "px-2 py-0.5 text-xs"
      }`}
    >
      {label}
      {onRemove && (
        <button type="button" onClick={onRemove} className="hover:opacity-70 leading-none">
          <X size={10} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
}

// ─── AISuggestionsBanner ─────────────────────────────────────────────────────

function AISuggestionsBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-[#f4f3ff] border border-[#c3c3f7] rounded-xl mb-6">
      <div className="size-7 rounded-lg bg-[#e6e5fc] flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles size={15} className="text-[#604dd0]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#344054] mb-1.5" style={ROBOTO}>
          AI Suggestions
        </p>
        <div className="flex gap-2 flex-wrap">
          {AI_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#c3c3f7] rounded-full text-xs text-[#344054] hover:bg-[#e6e5fc] transition-colors"
              style={ROBOTO}
            >
              <Sparkles size={11} className="text-[#604dd0] shrink-0" />
              {s}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-[#667085] hover:text-[#344054] shrink-0 mt-0.5"
      >
        <X size={16} />
      </button>
    </div>
  );
}

// ─── DeleteModal ─────────────────────────────────────────────────────────────

function DeleteModal({
  groupName,
  onConfirm,
  onCancel,
}: {
  groupName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[440px] mx-4 p-6">
        <div className="size-12 rounded-full bg-[#fef3f2] flex items-center justify-center mb-4">
          <Trash2 size={22} className="text-[#d92d20]" />
        </div>
        <h2 className="text-lg font-semibold text-[#101828] mb-2" style={ROBOTO}>
          Delete Test Group?
        </h2>
        <p className="text-sm text-[#475467] mb-6" style={ROBOTO}>
          Deleting <span className="font-medium text-[#344054]">"{groupName}"</span> removes it
          for everyone within your tenant. This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 px-4 text-sm font-semibold text-[#344054] border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb]"
            style={ROBOTO}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 px-4 text-sm font-semibold text-white bg-[#d92d20] rounded-lg hover:bg-[#b42318]"
            style={ROBOTO}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── TestGroupCard ────────────────────────────────────────────────────────────

function TestGroupCard({
  group,
  selected,
  onToggleSelect,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleFavorite,
  onTogglePin,
}: {
  group: TestGroup;
  selected: boolean;
  onToggleSelect: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
  onTogglePin: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const visibleLabels = group.labels.slice(0, 3);
  const extraLabels = group.labels.length - 3;

  const relativeDate = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86_400_000);
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  return (
    <div
      className={`relative group bg-white border rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col ${
        selected ? "border-[#7068de] ring-2 ring-[#7068de]/20" : "border-[#eaecf0]"
      }`}
    >
      {/* Checkbox — always visible when selected, hover-visible otherwise */}
      <div
        className={`absolute top-3 left-3 z-10 transition-opacity ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={onToggleSelect}
          className={`size-5 rounded-md flex items-center justify-center border transition-colors ${
            selected ? "bg-[#7068de] border-[#7068de]" : "bg-white border-[#d0d5dd] hover:border-[#7068de]"
          }`}
        >
          {selected && <Check size={12} className="text-white" strokeWidth={3} />}
        </button>
      </div>

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              {group.isPinned && (
                <Pin size={13} className="text-[#604dd0] shrink-0" />
              )}
              <h3 className="text-sm font-semibold text-[#101828] truncate" style={ROBOTO}>
                {group.name}
              </h3>
            </div>
            {group.description && (
              <p className="text-xs text-[#667085] mt-0.5 line-clamp-2" style={ROBOTO}>
                {group.description}
              </p>
            )}
          </div>
          {/* Favourite + overflow */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              onClick={onToggleFavorite}
              className="p-1.5 rounded-md hover:bg-[#f9fafb] transition-colors"
            >
              <Star
                size={15}
                className={group.isFavorite ? "fill-amber-400 text-amber-400" : "text-[#d0d5dd]"}
              />
            </button>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="p-1.5 rounded-md hover:bg-[#f9fafb] transition-colors"
              >
                <MoreHorizontal size={15} className="text-[#667085]" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#eaecf0] rounded-lg shadow-lg z-50 py-1 overflow-hidden">
                  {[
                    { icon: PenLine, label: "Edit", action: () => { setMenuOpen(false); onEdit(); } },
                    { icon: Copy, label: "Duplicate", action: () => { setMenuOpen(false); onDuplicate(); } },
                    { icon: Pin, label: group.isPinned ? "Unpin" : "Pin to top", action: () => { setMenuOpen(false); onTogglePin(); } },
                    { icon: Trash2, label: "Delete", action: () => { setMenuOpen(false); onDelete(); }, danger: true },
                  ].map(({ icon: Icon, label, action, danger }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={action}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-[#f9fafb] ${
                        danger ? "text-[#d92d20]" : "text-[#344054]"
                      }`}
                      style={ROBOTO}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Labels */}
        {group.labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleLabels.map((l) => <LabelChip key={l} label={l} size="xs" />)}
            {extraLabels > 0 && (
              <span className="text-[10px] text-[#667085] self-center">+{extraLabels}</span>
            )}
          </div>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-[#667085]" style={ROBOTO}>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {group.customers.length} customers
          </span>
          <span>{group.usageCount} uses</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#f2f4f7] flex items-center justify-between">
        <div className="flex items-center gap-1.5" style={ROBOTO}>
          <div className="size-5 rounded-full bg-[#e6e5fc] flex items-center justify-center">
            <span className="text-[8px] font-bold text-[#5342ae]">
              {group.createdBy.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <span className="text-xs text-[#667085]">
            {group.lastEditedBy} · {relativeDate(group.updatedAt)}
          </span>
        </div>
        <span
          className="flex items-center gap-1 text-[10px] text-[#98a2b3]"
          title="Available to all users within this tenant."
          style={ROBOTO}
        >
          <Building2 size={11} />
          Shared across tenant
        </span>
      </div>
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mb-6 opacity-60">
        <circle cx="40" cy="40" r="36" fill="#f4f3ff" />
        <circle cx="32" cy="34" r="9" fill="#c3c3f7" />
        <circle cx="50" cy="34" r="7" fill="#d5d4f9" />
        <path d="M16 58c0-8.837 7.163-16 16-16h16c8.837 0 16 7.163 16 16" stroke="#7068de" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <h2 className="text-lg font-semibold text-[#101828] mb-2" style={ROBOTO}>
        Create your first Test Group
      </h2>
      <p className="text-sm text-[#475467] max-w-xs mb-6" style={ROBOTO}>
        Save reusable customer profile groups to speed up QA and preview workflows.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="h-10 px-4 flex items-center gap-2 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] shadow-sm"
        style={ROBOTO}
      >
        <Plus size={16} strokeWidth={2} />
        Create Test Group
      </button>
    </div>
  );
}

// ─── BulkActionsBar ───────────────────────────────────────────────────────────

function BulkActionsBar({
  count,
  onClearSelection,
  onDelete,
  onDuplicate,
}: {
  count: number;
  onClearSelection: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#f4f3ff] border border-[#c3c3f7] rounded-xl mb-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClearSelection}
          className="flex items-center gap-1.5 text-sm font-medium text-[#344054]"
          style={ROBOTO}
        >
          <X size={15} />
          {count} selected
        </button>
      </div>
      <div className="flex items-center gap-2">
        {[
          { label: "Delete",    action: onDelete,    icon: Trash2, danger: true  },
          { label: "Duplicate", action: onDuplicate, icon: Copy,   danger: false },
        ].map(({ label, action, icon: Icon, danger }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className={`h-8 px-3 flex items-center gap-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              danger
                ? "text-[#d92d20] border-[#fda29b] hover:bg-[#fef3f2]"
                : "text-[#344054] border-[#d0d5dd] hover:bg-white"
            }`}
            style={ROBOTO}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── LabelFilterPopover ───────────────────────────────────────────────────────

function LabelFilterPopover({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (labels: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const toggle = (l: string) =>
    onChange(selected.includes(l) ? selected.filter((x) => x !== l) : [...selected, l]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`h-9 flex items-center gap-1.5 px-3 rounded-lg border text-sm font-medium transition-colors ${
          selected.length > 0
            ? "border-[#7068de] bg-[#e6e5fc] text-[#604dd0]"
            : "border-[#d0d5dd] bg-white text-[#344054] hover:bg-[#f9fafb]"
        }`}
        style={ROBOTO}
      >
        <Tag size={14} />
        Labels
        {selected.length > 0 && (
          <span className="size-4 rounded-full bg-[#7068de] text-white text-[9px] font-bold flex items-center justify-center">
            {selected.length}
          </span>
        )}
        <ChevronDown size={13} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-52 bg-white border border-[#eaecf0] rounded-xl shadow-lg z-50 py-2 max-h-64 overflow-y-auto">
          {ALL_LABELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => toggle(l)}
              className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#f9fafb] text-sm text-[#344054]"
              style={ROBOTO}
            >
              <LabelChip label={l} size="xs" />
              {selected.includes(l) && <Check size={14} className="text-[#7068de]" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TestGroupsPage ───────────────────────────────────────────────────────────

export default function TestGroupsPage({
  onBack,
  onNavigate,
  groups = INITIAL_TEST_GROUPS,
  onGroupsChange,
}: {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  groups?: TestGroup[];
  onGroupsChange?: (groups: TestGroup[]) => void;
} = {}) {
  // Wrap so callers can pass either a value or a functional updater
  const setGroups = (updater: ((prev: TestGroup[]) => TestGroup[]) | TestGroup[]) => {
    const next = typeof updater === "function" ? updater(groups) : updater;
    onGroupsChange?.(next);
  };
  const [search, setSearch] = useState("");
  const [labelFilter, setLabelFilter] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState<"" | "small" | "medium" | "large">("");
  const [createdByFilter, setCreatedByFilter] = useState("");
  const [sort, setSort] = useState<"updated" | "alpha" | "usage">("updated");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [wizardTarget, setWizardTarget] = useState<TestGroup | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TestGroup | null>(null);

  const filtered = groups
    .filter((g) => {
      if (search) {
        const q = search.toLowerCase();
        const hit =
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.labels.some((l) => l.toLowerCase().includes(q)) ||
          g.customers.some((c) => c.id.includes(q));
        if (!hit) return false;
      }
      if (labelFilter.length > 0 && !labelFilter.every((l) => g.labels.includes(l))) return false;
      if (sizeFilter === "small"  && g.customers.length >= 10) return false;
      if (sizeFilter === "medium" && (g.customers.length < 10 || g.customers.length > 50)) return false;
      if (sizeFilter === "large"  && g.customers.length <= 50) return false;
      if (createdByFilter && g.createdBy !== createdByFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      if (sort === "alpha")   return a.name.localeCompare(b.name);
      if (sort === "usage")   return b.usageCount - a.usageCount;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const openCreate = () => { setWizardTarget(null); setWizardOpen(true); };
  const openEdit = (g: TestGroup) => { setWizardTarget(g); setWizardOpen(true); };

  const handleSave = useCallback((group: TestGroup) => {
    setGroups((prev) => {
      const idx = prev.findIndex((g) => g.id === group.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = group;
        return next;
      }
      return [group, ...prev];
    });
    setWizardOpen(false);
  }, []);

  const handleDuplicate = (g: TestGroup) => {
    const dup: TestGroup = {
      ...g,
      id: `tg-${Date.now()}`,
      name: `${g.name} (copy)`,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      usageCount: 0,
      isPinned: false,
    };
    setGroups((prev) => [dup, ...prev]);
  };

  const handleDelete = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
    setDeleteTarget(null);
  };

  const handleBulkDelete = () => {
    setGroups((prev) => prev.filter((g) => !selectedIds.has(g.id)));
    setSelectedIds(new Set());
  };

  const handleBulkDuplicate = () => {
    const idsToClone = new Set(selectedIds);
    setGroups((prev) => {
      const dups = prev
        .filter((g) => idsToClone.has(g.id))
        .map((g) => ({
          ...g,
          id: `tg-${Date.now()}-${Math.random()}`,
          name: `${g.name} (copy)`,
          createdAt: new Date().toISOString().slice(0, 10),
          updatedAt: new Date().toISOString().slice(0, 10),
          usageCount: 0,
          isPinned: false,
        }));
      return [...dups, ...prev];
    });
    setSelectedIds(new Set());
  };

  const toggleFavorite = (id: string) =>
    setGroups((prev) => prev.map((g) => g.id === id ? { ...g, isFavorite: !g.isFavorite } : g));

  const togglePin = (id: string) =>
    setGroups((prev) => prev.map((g) => g.id === id ? { ...g, isPinned: !g.isPinned } : g));

  const activeFilters = labelFilter.length > 0 || sizeFilter !== "" || createdByFilter !== "";

  // Full-page wizard replaces the grid when open
  if (wizardOpen) {
    return (
      <TestGroupWizardPage
        group={wizardTarget}
        onSave={handleSave}
        onClose={() => setWizardOpen(false)}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <ContentStudioSidebar onNavigate={onNavigate} activePage="audience" />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav />

        <div className="flex-1 overflow-y-auto bg-[#f9fafb]">
          <div className="max-w-[1200px] mx-auto px-8 py-8">

            {/* Page header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-[#101828]" style={ROBOTO}>Test Groups</h1>
                <p className="text-sm text-[#475467] mt-1" style={ROBOTO}>
                  Reusable customer profile groups shared across your tenant.
                </p>
              </div>
              <button
                type="button"
                onClick={openCreate}
                className="h-10 px-4 flex items-center gap-2 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] shadow-sm shrink-0"
                style={ROBOTO}
              >
                <Plus size={16} strokeWidth={2} />
                Create Test Group
              </button>
            </div>

            {/* AI Suggestions — hidden for now */}
            {/* <AISuggestionsBanner /> */}

            {/* Search + Filter bar */}
            <div className="flex items-center gap-3 mb-5 bg-white border border-[#eaecf0] rounded-xl px-4 py-3 shadow-sm">
              <Search size={16} className="text-[#667085] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Test Groups..."
                className="flex-1 min-w-0 text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none bg-transparent"
                style={ROBOTO}
              />
              {search && (
                <button type="button" onClick={() => setSearch("")}>
                  <X size={14} className="text-[#667085]" />
                </button>
              )}

              <div className="w-px h-5 bg-[#eaecf0]" />

              {/* Label filter */}
              <LabelFilterPopover selected={labelFilter} onChange={setLabelFilter} />

              {/* Size filter */}
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value as typeof sizeFilter)}
                className={`h-9 px-3 rounded-lg border text-sm font-medium focus:outline-none transition-colors ${
                  sizeFilter ? "border-[#7068de] bg-[#e6e5fc] text-[#604dd0]" : "border-[#d0d5dd] bg-white text-[#344054]"
                }`}
                style={ROBOTO}
              >
                <option value="">Size</option>
                <option value="small">Small (&lt; 10)</option>
                <option value="medium">Medium (10–50)</option>
                <option value="large">Large (50+)</option>
              </select>

              {/* Created By filter */}
              <select
                value={createdByFilter}
                onChange={(e) => setCreatedByFilter(e.target.value)}
                className={`h-9 px-3 rounded-lg border text-sm font-medium focus:outline-none transition-colors ${
                  createdByFilter ? "border-[#7068de] bg-[#e6e5fc] text-[#604dd0]" : "border-[#d0d5dd] bg-white text-[#344054]"
                }`}
                style={ROBOTO}
              >
                <option value="">Created By</option>
                {[...new Set(INITIAL_TEST_GROUPS.map((g) => g.createdBy))].map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>

              {/* Sort */}
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal size={14} className="text-[#667085]" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="h-9 px-2 rounded-lg border border-[#d0d5dd] bg-white text-sm text-[#344054] focus:outline-none"
                  style={ROBOTO}
                >
                  <option value="updated">Recently updated</option>
                  <option value="alpha">Alphabetical</option>
                  <option value="usage">Most used</option>
                </select>
              </div>

              {activeFilters && (
                <button
                  type="button"
                  onClick={() => { setLabelFilter([]); setSizeFilter(""); setCreatedByFilter(""); }}
                  className="text-xs text-[#604dd0] font-medium hover:underline whitespace-nowrap"
                  style={ROBOTO}
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 mb-4">
              <p className="text-sm text-[#667085]" style={ROBOTO}>
                {filtered.length} {filtered.length === 1 ? "group" : "groups"}
                {activeFilters || search ? " matching filters" : ""}
              </p>
            </div>

            {/* Bulk actions */}
            {selectedIds.size > 0 && (
              <BulkActionsBar
                count={selectedIds.size}
                onClearSelection={() => setSelectedIds(new Set())}
                onDelete={handleBulkDelete}
                onDuplicate={handleBulkDuplicate}
              />
            )}

            {/* Card grid */}
            {filtered.length === 0 ? (
              <EmptyState onCreate={openCreate} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((group) => (
                  <TestGroupCard
                    key={group.id}
                    group={group}
                    selected={selectedIds.has(group.id)}
                    onToggleSelect={() => toggleSelect(group.id)}
                    onEdit={() => openEdit(group)}
                    onDuplicate={() => handleDuplicate(group)}
                    onDelete={() => setDeleteTarget(group)}
                    onToggleFavorite={() => toggleFavorite(group.id)}
                    onTogglePin={() => togglePin(group.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteModal
          groupName={deleteTarget.name}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

    </div>
  );
}
