import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft, X, Check, Plus, Trash2, Search, Sparkles,
  AlertCircle, CheckCircle2, AlertTriangle,
  ChevronDown, Building2, Users, Star, Pin,
} from "lucide-react";
import { type TestGroup, type Customer, CUSTOMER_PROFILES, ALL_LABELS, LABEL_COLORS } from "../data/testGroupsMock";
import { LabelChip } from "./TestGroups";
import { ContentStudioSidebar, TopNav } from "../shared";

const ROBOTO = { fontFamily: "'Roboto', sans-serif" } as const;
const MAX_CUSTOMERS = 10;
const VALID_CID = /^\d{8}$/;
const ATTRIBUTE_LANGUAGES = ["English", "Spanish", "French", "Bulgarian"] as const;

const randomLanguage = () =>
  ATTRIBUTE_LANGUAGES[Math.floor(Math.random() * ATTRIBUTE_LANGUAGES.length)];

function emptyPasteRows() {
  return {
    cells: Array(MAX_CUSTOMERS).fill(""),
    attributes: Array(MAX_CUSTOMERS).fill(""),
  };
}

function pasteRowsFromCustomers(customers: Customer[]) {
  const { cells, attributes } = emptyPasteRows();
  customers.forEach((c, i) => {
    if (i < MAX_CUSTOMERS) {
      cells[i] = c.id;
      attributes[i] = c.attributeValue ?? "";
    }
  });
  return { cells, attributes };
}

function customersFromPasteRows(
  cells: string[],
  attributes: string[],
  existingCustomers: Customer[],
): Customer[] {
  const rows: Customer[] = [];
  cells.forEach((cell, i) => {
    const id = cell.trim();
    if (!id || !VALID_CID.test(id)) return;
    if (rows.some(c => c.id === id)) return;
    const existing = existingCustomers.find(c => c.id === id);
    const profile = CUSTOMER_PROFILES.find(c => c.id === id);
    const base = existing ?? profile ?? {
      id,
      name: `Customer ${id}`,
      email: "",
      country: "—",
      status: "Active" as const,
      labels: [],
    };
    const attributeValue = attributes[i]?.trim();
    rows.push(attributeValue ? { ...base, attributeValue } : base);
  });
  return rows;
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

const STEPS = ["Group Details", "Add Customers", "Review"];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`size-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  done    ? "bg-[#7068de] text-white" :
                  active  ? "bg-[#7068de] text-white" :
                            "bg-[#f2f4f7] text-[#98a2b3]"
                }`}
              >
                {done ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  active ? "text-[#344054]" : done ? "text-[#7068de]" : "text-[#98a2b3]"
                }`}
                style={ROBOTO}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-20 h-px mx-2 mb-4 ${done ? "bg-[#7068de]" : "bg-[#eaecf0]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Discard warning modal ────────────────────────────────────────────────────

function DiscardModal({ onDiscard, onStay }: { onDiscard: () => void; onStay: () => void }) {
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] mx-4 p-6">
        <h2 className="text-lg font-semibold text-[#101828] mb-2" style={ROBOTO}>
          Discard unsaved group?
        </h2>
        <p className="text-sm text-[#475467] mb-6" style={ROBOTO}>
          You have unsaved changes. If you leave now, your progress will be lost.
        </p>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onStay} className="h-10 px-4 text-sm font-semibold text-[#344054] border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb]" style={ROBOTO}>
            Keep editing
          </button>
          <button type="button" onClick={onDiscard} className="h-10 px-4 text-sm font-semibold text-white bg-[#d92d20] rounded-lg hover:bg-[#b42318]" style={ROBOTO}>
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── LabelTagInput ────────────────────────────────────────────────────────────

function LabelTagInput({ selected, onChange }: { selected: string[]; onChange: (l: string[]) => void }) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const options = ALL_LABELS.filter(l => !selected.includes(l) && l.toLowerCase().includes(input.toLowerCase()));
  const add = (l: string) => { onChange([...selected, l]); setInput(""); };
  const remove = (l: string) => onChange(selected.filter(x => x !== l));

  return (
    <div className="relative" ref={ref}>
      <div className="flex flex-wrap gap-1.5 items-center min-h-[40px] px-3 py-2 border border-[#d0d5dd] rounded-lg bg-white focus-within:ring-2 focus-within:ring-[#7068de]/20 focus-within:border-[#7068de]">
        {selected.map(l => <LabelChip key={l} label={l} size="xs" onRemove={() => remove(l)} />)}
        <input
          type="text" value={input}
          onChange={e => { setInput(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === "Enter" && options[0]) { e.preventDefault(); add(options[0]); }
            if (e.key === "Backspace" && !input && selected.length > 0) remove(selected[selected.length - 1]);
          }}
          placeholder={selected.length === 0 ? "Add labels..." : ""}
          className="flex-1 min-w-[80px] text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none bg-transparent"
          style={ROBOTO}
        />
      </div>
      {open && options.length > 0 && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#eaecf0] rounded-lg shadow-lg z-50 py-1 max-h-44 overflow-y-auto">
          {options.map(l => (
            <button key={l} type="button" onMouseDown={e => { e.preventDefault(); add(l); }} className="w-full flex items-center px-3 py-2 hover:bg-[#f9fafb] text-left">
              <LabelChip label={l} size="xs" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Step 1: Group Details ────────────────────────────────────────────────────


function GroupDetailsStep({
  name, setName, nameError, setNameError,
  description, setDescription,
  labels, setLabels,
}: {
  name: string; setName: (v: string) => void; nameError: boolean; setNameError: (v: boolean) => void;
  description: string; setDescription: (v: string) => void;
  labels: string[]; setLabels: (v: string[]) => void;
}) {
  return (
    <div className="max-w-[520px] mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-[#101828] mb-1" style={ROBOTO}>Group Details</h2>
        <p className="text-sm text-[#475467]" style={ROBOTO}>Give your Test Group a name and optional description.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#344054]" style={ROBOTO}>
          Group Name <span className="text-[#d92d20]">*</span>
        </label>
        <input
          type="text" value={name}
          onChange={e => { setName(e.target.value); setNameError(false); }}
          placeholder="e.g. VIP UK Champions"
          className={`w-full px-3 py-2.5 border rounded-lg text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#7068de]/20 ${
            nameError ? "border-[#d92d20] bg-[#fef3f2]" : "border-[#d0d5dd] focus:border-[#7068de]"
          }`}
          style={ROBOTO}
        />
        {nameError && (
          <p className="text-xs text-[#d92d20] flex items-center gap-1" style={ROBOTO}>
            <AlertCircle size={12} /> Group name is required
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#344054]" style={ROBOTO}>
          Description <span className="text-[#98a2b3] font-normal">Optional</span>
        </label>
        <textarea
          value={description} onChange={e => setDescription(e.target.value)}
          placeholder="Describe the purpose of this Test Group..."
          rows={4}
          className="w-full px-3 py-2.5 border border-[#d0d5dd] rounded-lg text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#7068de]/20 focus:border-[#7068de] resize-none"
          style={ROBOTO}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#344054]" style={ROBOTO}>Group Labels</label>
        <LabelTagInput selected={labels} onChange={setLabels} />
        <p className="text-xs text-[#667085]" style={ROBOTO}>Labels help you filter and organise groups across the platform.</p>
      </div>
    </div>
  );
}

// ─── Step 2: Add Customers ────────────────────────────────────────────────────

type CustomerTab = "paste" | "search";

function StatusChip({ status }: { status: Customer["status"] }) {
  const map = {
    Active:   "bg-[#ecfdf3] text-[#067647] border-[#abefc6]",
    Inactive: "bg-[#fffaeb] text-[#b54708] border-[#fedf89]",
    Churned:  "bg-[#fef3f2] text-[#d92d20] border-[#fda29b]",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${map[status]}`}>{status}</span>;
}

function PasteCIDsTab({
  cells,
  attributes,
  attributeName,
  onCellsChange,
  onAttributesChange,
  onAttributeNameChange,
}: {
  cells: string[];
  attributes: string[];
  attributeName: string;
  onCellsChange: (cells: string[]) => void;
  onAttributesChange: (attributes: string[]) => void;
  onAttributeNameChange: (name: string) => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const nameRefs  = useRef<(HTMLInputElement | null)[]>([]);

  const updateCell = (idx: number, val: string) => {
    onCellsChange(cells.map((c, i) => (i === idx ? val : c)));
  };

  const updateAttribute = (idx: number, val: string) => {
    onAttributesChange(attributes.map((a, i) => (i === idx ? val : a)));
  };

  const clearCell = (idx: number) => {
    onCellsChange(cells.map((c, i) => (i === idx ? "" : c)));
    onAttributesChange(attributes.map((a, i) => (i === idx ? "" : a)));
    inputRefs.current[idx]?.focus();
  };

  type RowStatus = "empty" | "valid" | "invalid" | "duplicate";

  const statuses: RowStatus[] = cells.map((val, idx) => {
    const v = val.trim();
    if (!v) return "empty";
    if (!VALID_CID.test(v)) return "invalid";
    if (cells.some((r, i) => i !== idx && r.trim() === v)) return "duplicate";
    return "valid";
  });

  const validIds = cells.filter((v, i) => statuses[i] === "valid").map(v => v.trim());
  const invalidCount   = statuses.filter(s => s === "invalid").length;
  const duplicateCount = statuses.filter(s => s === "duplicate").length;

  const statusPill: Record<Exclude<RowStatus, "empty">, { label: string; cls: string }> = {
    valid:     { label: "Valid",     cls: "text-[#067647] bg-[#ecfdf3] border-[#abefc6]" },
    invalid:   { label: "Invalid",   cls: "text-[#d92d20] bg-[#fef3f2] border-[#fda29b]" },
    duplicate: { label: "Duplicate", cls: "text-[#b54708] bg-[#fffaeb] border-[#fedf89]" },
  };

  const hasAnyInput = cells.some(v => v.trim());

  const autoFill = () => {
    const takenIds = new Set(cells.map(c => c.trim()).filter(Boolean));
    const available = CUSTOMER_PROFILES.filter(p => !takenIds.has(p.id)).slice(0, MAX_CUSTOMERS);
    const newCells = Array(MAX_CUSTOMERS).fill("");
    const newAttributes = Array(MAX_CUSTOMERS).fill("");
    available.forEach((p, i) => { newCells[i] = p.id; newAttributes[i] = randomLanguage(); });
    onAttributeNameChange("Language");
    onCellsChange(newCells);
    onAttributesChange(newAttributes);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={autoFill}
          className="h-7 px-2.5 flex items-center gap-1.5 text-xs font-medium text-[#604dd0] border border-[#d8d8fa] bg-[#f5f4ff] rounded-lg hover:bg-[#ede9fe] transition-colors"
          style={ROBOTO}
        >
          <Sparkles size={11} strokeWidth={2} /> Auto-fill
        </button>
      </div>

      {/* Editable table */}
      <div className="border border-[#eaecf0] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[28px_1fr_1fr_88px_28px] bg-[#f9fafb] border-b border-[#eaecf0]">
          <div className="px-3 py-2 text-xs font-medium text-[#475467] border-r border-[#eaecf0]" style={ROBOTO}>#</div>
          <div className="px-3 py-2 text-xs font-medium text-[#475467] border-r border-[#eaecf0]" style={ROBOTO}>Customer ID</div>
          <div className="border-r border-[#eaecf0]">
            <input
              type="text"
              value={attributeName}
              onChange={e => onAttributeNameChange(e.target.value)}
              placeholder="Attribute name"
              className="w-full h-full px-3 py-2 text-xs font-medium text-[#475467] focus:outline-none focus:bg-white bg-transparent placeholder:text-[#98a2b3]"
              style={ROBOTO}
            />
          </div>
          <div className="px-3 py-2 text-xs font-medium text-[#475467] border-r border-[#eaecf0]" style={ROBOTO}>Status</div>
          <div className="px-3 py-2" />
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#eaecf0]">
          {cells.map((val, idx) => {
            const status = statuses[idx];
            const trimmed = val.trim();
            const isActive = !!trimmed;

            const rowBg =
              status === "valid"     ? "bg-[#f6fef9]" :
              status === "invalid"   ? "bg-[#fffafa]" :
              status === "duplicate" ? "bg-[#fffdf5]" :
              "";

            return (
              <div key={idx} className={`grid grid-cols-[28px_1fr_1fr_88px_28px] items-stretch transition-colors hover:bg-[#fafafa] ${rowBg}`}>

                {/* Row number */}
                <div className="px-2 flex items-center justify-end border-r border-[#eaecf0] text-[11px] text-[#c4c9d4] font-mono select-none">
                  {idx + 1}
                </div>

                {/* CID input */}
                <div className="border-r border-[#eaecf0]">
                  <input
                    ref={el => { inputRefs.current[idx] = el; }}
                    type="text"
                    value={val}
                    onChange={e => updateCell(idx, e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        inputRefs.current[Math.min(idx + 1, MAX_CUSTOMERS - 1)]?.focus();
                      }
                      if (e.key === "Tab" && !e.shiftKey) {
                        e.preventDefault();
                        nameRefs.current[idx]?.focus();
                      }
                    }}
                    placeholder="00000000"
                    maxLength={8}
                    className={`w-full h-full px-3 py-2.5 text-sm font-mono focus:outline-none bg-transparent placeholder:text-[#dde1e8] ${
                      isActive ? "text-[#101828]" : "text-[#667085]"
                    }`}
                  />
                </div>

                {/* Attribute — editable, auto-filled with random language */}
                <div className="border-r border-[#eaecf0]">
                  <input
                    ref={el => { nameRefs.current[idx] = el; }}
                    type="text"
                    value={attributes[idx]}
                    onChange={e => updateAttribute(idx, e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" || (e.key === "Tab" && !e.shiftKey)) {
                        e.preventDefault();
                        inputRefs.current[Math.min(idx + 1, MAX_CUSTOMERS - 1)]?.focus();
                      }
                      if (e.key === "Tab" && e.shiftKey) {
                        e.preventDefault();
                        inputRefs.current[idx]?.focus();
                      }
                    }}
                    placeholder={isActive ? "—" : ""}
                    className="w-full h-full px-3 py-2.5 text-xs focus:outline-none bg-transparent placeholder:text-[#d0d5dd] text-[#475467]"
                    style={ROBOTO}
                  />
                </div>

                {/* Status */}
                <div className="px-3 py-2.5 flex items-center border-r border-[#eaecf0]">
                  {status !== "empty" && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium ${statusPill[status].cls}`}>
                      {statusPill[status].label}
                    </span>
                  )}
                </div>

                {/* Clear */}
                <div className="flex items-center justify-center">
                  {isActive && (
                    <button
                      type="button"
                      onClick={() => clearCell(idx)}
                      className="size-5 flex items-center justify-center text-[#d0d5dd] hover:text-[#d92d20] transition-colors"
                    >
                      <X size={11} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      {hasAnyInput && (
        <div className="flex gap-3">
          {validIds.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-[#067647]" style={ROBOTO}>
              <CheckCircle2 size={11} /> {validIds.length} valid
            </span>
          )}
          {invalidCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-[#d92d20]" style={ROBOTO}>
              <AlertCircle size={11} /> {invalidCount} invalid
            </span>
          )}
          {duplicateCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-[#b54708]" style={ROBOTO}>
              <AlertTriangle size={11} /> {duplicateCount} duplicate
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function SearchProfilesTab({ existingIds, onAdd }: { existingIds: string[]; onAdd: (c: Customer[]) => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const results = CUSTOMER_PROFILES.filter(c => {
    if (existingIds.includes(c.id)) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.id.includes(q) || c.email.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
  });
  const toggle = (id: string) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const handleAdd = () => { onAdd(CUSTOMER_PROFILES.filter(c => selected.has(c.id))); setSelected(new Set()); setQuery(""); };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-3 py-2 border border-[#d0d5dd] rounded-lg bg-white">
        <Search size={15} className="text-[#667085] shrink-0" />
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, ID, email, country..." className="flex-1 min-w-0 text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none" style={ROBOTO} />
      </div>
      <div className="border border-[#eaecf0] rounded-xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_100px_1fr_80px_auto] bg-[#f9fafb] border-b border-[#eaecf0]">
          {["", "Name", "ID", "Email", "Country", "Status"].map((h, i) => <div key={i} className="px-3 py-2 text-xs font-medium text-[#475467]" style={ROBOTO}>{h}</div>)}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-[#667085]" style={ROBOTO}>No matching profiles</div>
          ) : results.map(c => (
            <button key={c.id} type="button" onClick={() => toggle(c.id)} className={`w-full grid grid-cols-[auto_1fr_100px_1fr_80px_auto] items-center border-b border-[#eaecf0] last:border-b-0 transition-colors text-left ${selected.has(c.id) ? "bg-[#f4f3ff]" : "hover:bg-[#f9fafb]"}`}>
              <div className="px-3 py-2.5 flex items-center">
                <div className={`size-4 rounded border flex items-center justify-center ${selected.has(c.id) ? "bg-[#7068de] border-[#7068de]" : "border-[#d0d5dd]"}`}>
                  {selected.has(c.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
              </div>
              <div className="px-3 py-2.5 text-sm font-medium text-[#344054] truncate" style={ROBOTO}>{c.name}</div>
              <div className="px-3 py-2.5 text-xs text-[#667085] font-mono">{c.id}</div>
              <div className="px-3 py-2.5 text-xs text-[#667085] truncate">{c.email}</div>
              <div className="px-3 py-2.5 text-xs text-[#667085]">{c.country}</div>
              <div className="px-3 py-2.5"><StatusChip status={c.status} /></div>
            </button>
          ))}
        </div>
      </div>
      {selected.size > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#f4f3ff] border border-[#c3c3f7] rounded-xl">
          <span className="text-sm text-[#604dd0] font-medium" style={ROBOTO}>{selected.size} selected</span>
          <button type="button" onClick={handleAdd} className="h-8 px-3 flex items-center gap-1.5 bg-[#7068de] text-white text-xs font-semibold rounded-lg hover:bg-[#5f57cc]" style={ROBOTO}>
            <Plus size={13} strokeWidth={2} /> Add to group
          </button>
        </div>
      )}
    </div>
  );
}


function CustomerTable({ customers, onRemove, onAddLabel, onRemoveLabel }: {
  customers: Customer[];
  onRemove: (id: string) => void;
  onAddLabel: (id: string, label: string) => void;
  onRemoveLabel: (id: string, label: string) => void;
}) {
  const [popover, setPopover] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!popover) return;
    const h = (e: MouseEvent) => { if (tableRef.current && !tableRef.current.contains(e.target as Node)) setPopover(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [popover]);

  return (
    <div ref={tableRef} className="border border-[#eaecf0] rounded-xl overflow-hidden">
      <div className="grid grid-cols-[1fr_100px_1fr_70px_1fr_auto] bg-[#f9fafb] border-b border-[#eaecf0]">
        {["Name", "ID", "Email", "Country", "Labels", ""].map((h, i) => <div key={i} className="px-4 py-2.5 text-xs font-medium text-[#475467]" style={ROBOTO}>{h}</div>)}
      </div>
      <div className="max-h-64 overflow-y-auto">
        {customers.map(c => (
          <div key={c.id} className="grid grid-cols-[1fr_100px_1fr_70px_1fr_auto] items-center border-b border-[#eaecf0] last:border-b-0 hover:bg-[#fafaff] group">
            <div className="px-4 py-3 text-sm font-medium text-[#344054] truncate" style={ROBOTO}>{c.name}</div>
            <div className="px-4 py-3 text-xs text-[#667085] font-mono">{c.id}</div>
            <div className="px-4 py-3 text-xs text-[#667085] truncate">{c.email}</div>
            <div className="px-4 py-3 text-xs text-[#667085]">{c.country}</div>
            <div className="px-4 py-3 flex flex-wrap gap-1 items-center">
              {c.labels.map(l => <LabelChip key={l} label={l} size="xs" onRemove={() => onRemoveLabel(c.id, l)} />)}
              <div className="relative">
                <button type="button" onClick={() => setPopover(popover === c.id ? null : c.id)} className="size-5 rounded border border-dashed border-[#d0d5dd] flex items-center justify-center text-[#667085] hover:border-[#7068de] hover:text-[#7068de] opacity-0 group-hover:opacity-100">
                  <Plus size={10} strokeWidth={2.5} />
                </button>
                {popover === c.id && (
                  <div className="absolute left-0 top-full mt-1 w-36 bg-white border border-[#eaecf0] rounded-lg shadow-lg z-50 py-1 max-h-40 overflow-y-auto">
                    {ALL_LABELS.filter(l => !c.labels.includes(l)).map(l => (
                      <button key={l} type="button" onClick={() => { onAddLabel(c.id, l); setPopover(null); }} className="w-full px-2.5 py-1.5 text-left hover:bg-[#f9fafb]">
                        <LabelChip label={l} size="xs" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="px-4 py-3"><button type="button" onClick={() => onRemove(c.id)} className="text-[#d0d5dd] hover:text-[#d92d20]"><Trash2 size={14} /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddCustomersStep({
  customers,
  setCustomers,
  pasteCells,
  setPasteCells,
  pasteAttributes,
  setPasteAttributes,
  attributeName,
  setAttributeName,
}: {
  customers: Customer[];
  setCustomers: (fn: (p: Customer[]) => Customer[]) => void;
  pasteCells: string[];
  setPasteCells: (cells: string[]) => void;
  pasteAttributes: string[];
  setPasteAttributes: (attributes: string[]) => void;
  attributeName: string;
  setAttributeName: (name: string) => void;
}) {
  const [tab, setTab] = useState<CustomerTab>("paste");
  const existingIds = customers.map(c => c.id);

  const addProfiles = useCallback((profiles: Customer[]) => {
    const fresh = profiles.filter(p => !existingIds.includes(p.id));
    setCustomers(prev => {
      const next = [...prev, ...fresh].slice(0, MAX_CUSTOMERS);
      const pasted = pasteRowsFromCustomers(next);
      setPasteCells(pasted.cells);
      setPasteAttributes(pasted.attributes);
      return next;
    });
  }, [existingIds, setCustomers, setPasteCells, setPasteAttributes]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-[#101828] mb-1" style={ROBOTO}>Add Customers</h2>
        <p className="text-sm text-[#475467]" style={ROBOTO}>Add Customer IDs by pasting or searching profiles.</p>
      </div>

      <div>
        <div className="flex items-center border-b border-[#eaecf0] mb-5">
          {([["paste", "Paste CIDs"], ["search", "Search Profiles"]] as [CustomerTab, string][]).map(([id, label]) => (
            <button key={id} type="button" onClick={() => setTab(id)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === id ? "border-[#7068de] text-[#604dd0]" : "border-transparent text-[#667085] hover:text-[#344054]"}`} style={ROBOTO}>
              {label}
            </button>
          ))}
        </div>
        {tab === "paste" && (
          <PasteCIDsTab
            cells={pasteCells}
            attributes={pasteAttributes}
            attributeName={attributeName}
            onCellsChange={setPasteCells}
            onAttributesChange={setPasteAttributes}
            onAttributeNameChange={setAttributeName}
          />
        )}
        {tab === "search" && <SearchProfilesTab existingIds={existingIds} onAdd={addProfiles} />}
      </div>
    </div>
  );
}

// ─── Step 3: Review ───────────────────────────────────────────────────────────

function ReviewStep({ name, description, labels, customers }: {
  name: string; description: string; labels: string[]; customers: Customer[];
}) {
  return (
    <div className="max-w-[560px] mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-[#101828] mb-1" style={ROBOTO}>Review</h2>
        <p className="text-sm text-[#475467]" style={ROBOTO}>Everything look right? Once created, this group is shared across your tenant.</p>
      </div>

      {/* Group card preview */}
      <div className="bg-white border border-[#eaecf0] rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Star size={15} className="text-[#d0d5dd]" />
                <h3 className="text-sm font-semibold text-[#101828] truncate" style={ROBOTO}>{name || "Untitled Group"}</h3>
              </div>
              {description && <p className="text-xs text-[#667085] mt-0.5 line-clamp-2" style={ROBOTO}>{description}</p>}
            </div>
          </div>
          {labels.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {labels.slice(0, 4).map(l => <LabelChip key={l} label={l} size="xs" />)}
              {labels.length > 4 && <span className="text-[10px] text-[#667085] self-center">+{labels.length - 4}</span>}
            </div>
          )}
          <div className="flex items-center gap-4 text-xs text-[#667085]" style={ROBOTO}>
            <span className="flex items-center gap-1"><Users size={12} /> {customers.length} customers</span>
            <span>0 uses</span>
          </div>
        </div>
        <div className="px-5 py-3 border-t border-[#f2f4f7] flex items-center justify-between">
          <div className="flex items-center gap-1.5" style={ROBOTO}>
            <div className="size-5 rounded-full bg-[#e6e5fc] flex items-center justify-center">
              <span className="text-[8px] font-bold text-[#5342ae]">HM</span>
            </div>
            <span className="text-xs text-[#667085]">Haiden McGill · just now</span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-[#98a2b3]" style={ROBOTO}>
            <Building2 size={11} /> Shared across tenant
          </span>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Customers", value: customers.length },
          { label: "Labels", value: labels.length },
          { label: "Tenant scope", value: "All users" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#f9fafb] border border-[#eaecf0] rounded-xl p-4 text-center">
            <p className="text-xl font-semibold text-[#101828]" style={ROBOTO}>{value}</p>
            <p className="text-xs text-[#667085] mt-0.5" style={ROBOTO}>{label}</p>
          </div>
        ))}
      </div>

      {customers.length === 0 && (
        <div className="flex items-center gap-2 px-4 py-3 bg-[#fffaeb] border border-[#fedf89] rounded-xl">
          <AlertTriangle size={16} className="text-[#b54708] shrink-0" />
          <p className="text-sm text-[#b54708]" style={ROBOTO}>You haven't added any customers yet. Go back to add Customer IDs.</p>
        </div>
      )}
    </div>
  );
}

// ─── TestGroupWizardPage ──────────────────────────────────────────────────────

export default function TestGroupWizardPage({
  group,
  onSave,
  onClose,
  onNavigate,
}: {
  group: TestGroup | null;
  onSave: (g: TestGroup) => void;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}) {
  const isEdit = group !== null;
  const [step, setStep] = useState(0);
  const [showDiscard, setShowDiscard] = useState(false);

  // Step 1 state
  const [name, setName] = useState(group?.name ?? "");
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState(group?.description ?? "");
  const [labels, setLabels] = useState<string[]>(group?.labels ?? []);

  // Step 2 state
  const [customers, setCustomers] = useState<Customer[]>(group?.customers ?? []);
  const initialPaste = pasteRowsFromCustomers(group?.customers ?? []);
  const [pasteCells, setPasteCells] = useState<string[]>(initialPaste.cells);
  const [pasteAttributes, setPasteAttributes] = useState<string[]>(initialPaste.attributes);
  const [attributeName, setAttributeName] = useState(group?.attributeName ?? "Attribute name");

  const syncCustomersFromPaste = useCallback(() => {
    setCustomers(prev => customersFromPasteRows(pasteCells, pasteAttributes, prev));
  }, [pasteCells, pasteAttributes]);

  const isDirty = name !== (group?.name ?? "") ||
    description !== (group?.description ?? "") ||
    labels.join() !== (group?.labels ?? []).join() ||
    customers.length !== (group?.customers ?? []).length;

  const handleClose = () => {
    if (isDirty) { setShowDiscard(true); } else { onClose(); }
  };

  const handleNext = () => {
    if (step === 0 && !name.trim()) { setNameError(true); return; }
    if (step === 1) syncCustomersFromPaste();
    setStep(s => Math.min(s + 1, 2));
  };

  const handleSave = () => {
    if (!name.trim()) { setStep(0); setNameError(true); return; }
    const syncedCustomers = customersFromPasteRows(pasteCells, pasteAttributes, customers);
    const saved: TestGroup = {
      id: group?.id ?? `tg-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      labels,
      customers: syncedCustomers,
      attributeName: attributeName.trim() || undefined,
      createdBy: group?.createdBy ?? "Haiden McGill",
      createdAt: group?.createdAt ?? new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      lastEditedBy: "Haiden McGill",
      usageCount: group?.usageCount ?? 0,
      isPinned: group?.isPinned ?? false,
      isFavorite: group?.isFavorite ?? false,
    };
    onSave(saved);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ContentStudioSidebar onNavigate={onNavigate} activePage="audience" />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav />

        {/* Wizard sub-header: stepper + close */}
        <div className="shrink-0 flex items-center justify-between px-8 py-4 border-b border-[#eaecf0] bg-white">
          <div className="size-[34px]" />
          <Stepper current={step} />
          <button type="button" onClick={handleClose} className="p-2 rounded-lg text-[#667085] hover:bg-[#f2f4f7] hover:text-[#344054] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Step content */}
        <main className="flex-1 overflow-y-auto bg-[#f9fafb] px-8 py-10">
          {step === 0 && (
            <GroupDetailsStep name={name} setName={setName} nameError={nameError} setNameError={setNameError} description={description} setDescription={setDescription} labels={labels} setLabels={setLabels} />
          )}
          {step === 1 && (
            <AddCustomersStep
              customers={customers}
              setCustomers={setCustomers}
              pasteCells={pasteCells}
              setPasteCells={setPasteCells}
              pasteAttributes={pasteAttributes}
              setPasteAttributes={setPasteAttributes}
              attributeName={attributeName}
              setAttributeName={setAttributeName}
            />
          )}
          {step === 2 && (
            <ReviewStep name={name} description={description} labels={labels} customers={customers} />
          )}
        </main>

        {/* Bottom action bar */}
        <footer className="shrink-0 flex items-center justify-between px-8 py-4 border-t border-[#eaecf0] bg-white">
          <button
            type="button"
            onClick={step === 0 ? handleClose : () => setStep(s => s - 1)}
            className="h-10 px-4 flex items-center gap-2 text-sm font-semibold text-[#344054] border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb]"
            style={ROBOTO}
          >
            {step === 0 ? "Cancel" : <><ArrowLeft size={15} /> Back</>}
          </button>

          {step < 2 ? (
            <button type="button" onClick={handleNext} className="h-10 px-5 flex items-center gap-2 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] shadow-sm" style={ROBOTO}>
              Next →
            </button>
          ) : (
            <button type="button" onClick={handleSave} className="h-10 px-5 flex items-center gap-2 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] shadow-sm" style={ROBOTO}>
              <Check size={15} strokeWidth={2.5} />
              {isEdit ? "Save changes" : "Create Test Group"}
            </button>
          )}
        </footer>
      </div>

      {showDiscard && (
        <DiscardModal
          onDiscard={onClose}
          onStay={() => setShowDiscard(false)}
        />
      )}
    </div>
  );
}
