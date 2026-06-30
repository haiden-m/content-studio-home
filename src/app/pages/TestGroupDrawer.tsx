import { useState, useRef, useEffect, useCallback } from "react";
import {
  X, Plus, Search, Upload, CloudUpload, Check,
  Trash2, ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, Building2,
} from "lucide-react";
import {
  type TestGroup, type Customer,
  CUSTOMER_PROFILES, ALL_LABELS, LABEL_COLORS,
} from "../data/testGroupsMock";
import { LabelChip } from "./TestGroups";

const ROBOTO = { fontFamily: "'Roboto', sans-serif" } as const;
const MAX_CUSTOMERS = 500;
const VALID_CID = /^\d{8}$/;

type DrawerTab = "paste" | "search" | "upload";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parsePastedCIDs(raw: string, existing: string[]): {
  valid: string[];
  invalid: string[];
  duplicates: string[];
} {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const seen = new Set<string>();
  const existingSet = new Set(existing);
  const valid: string[] = [];
  const invalid: string[] = [];
  const duplicates: string[] = [];

  for (const line of lines) {
    if (!VALID_CID.test(line)) { invalid.push(line); continue; }
    if (existingSet.has(line) || seen.has(line)) { duplicates.push(line); continue; }
    seen.add(line);
    valid.push(line);
  }
  return { valid, invalid, duplicates };
}

// ─── StatusChip ──────────────────────────────────────────────────────────────

function StatusChip({ status }: { status: Customer["status"] }) {
  const map = {
    Active:   "bg-[#ecfdf3] text-[#067647] border-[#abefc6]",
    Inactive: "bg-[#fffaeb] text-[#b54708] border-[#fedf89]",
    Churned:  "bg-[#fef3f2] text-[#d92d20] border-[#fda29b]",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  );
}

// ─── PasteCIDsTab ─────────────────────────────────────────────────────────────

function PasteCIDsTab({
  existingIds,
  onAdd,
}: {
  existingIds: string[];
  onAdd: (ids: string[]) => void;
}) {
  const [raw, setRaw] = useState("");
  const parsed = parsePastedCIDs(raw, existingIds);
  const hasContent = raw.trim().length > 0;

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder={"Paste one Customer ID per line...\n\n32299512\n88910212\n64372839"}
        rows={8}
        className="w-full px-3 py-2.5 border border-[#d0d5dd] rounded-lg text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#7068de]/20 focus:border-[#7068de] resize-none font-mono"
      />

      {hasContent && (
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf3] border border-[#abefc6] text-xs font-medium text-[#067647]">
            <CheckCircle2 size={12} /> {parsed.valid.length} valid
          </span>
          {parsed.invalid.length > 0 && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef3f2] border border-[#fda29b] text-xs font-medium text-[#d92d20]">
              <AlertCircle size={12} /> {parsed.invalid.length} invalid
            </span>
          )}
          {parsed.duplicates.length > 0 && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fffaeb] border border-[#fedf89] text-xs font-medium text-[#b54708]">
              <AlertTriangle size={12} /> {parsed.duplicates.length} duplicate
            </span>
          )}
        </div>
      )}

      {parsed.valid.length > 0 && (
        <button
          type="button"
          onClick={() => { onAdd(parsed.valid); setRaw(""); }}
          className="h-9 px-4 flex items-center gap-2 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] self-start"
          style={ROBOTO}
        >
          <Plus size={15} strokeWidth={2} />
          Add {parsed.valid.length} {parsed.valid.length === 1 ? "Customer ID" : "Customer IDs"}
        </button>
      )}
    </div>
  );
}

// ─── SearchProfilesTab ────────────────────────────────────────────────────────

function SearchProfilesTab({
  existingIds,
  onAdd,
}: {
  existingIds: string[];
  onAdd: (customers: Customer[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const results = CUSTOMER_PROFILES.filter((c) => {
    if (existingIds.includes(c.id)) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.id.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  });

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleAdd = () => {
    const toAdd = CUSTOMER_PROFILES.filter((c) => selected.has(c.id));
    onAdd(toAdd);
    setSelected(new Set());
    setQuery("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-3 py-2 border border-[#d0d5dd] rounded-lg bg-white">
        <Search size={15} className="text-[#667085] shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, ID, email, country..."
          className="flex-1 min-w-0 text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none"
          style={ROBOTO}
        />
      </div>

      <div className="border border-[#eaecf0] rounded-lg overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] bg-[#f9fafb] border-b border-[#eaecf0]">
          {["", "Name", "ID", "Email", "Country", "Status"].map((h, i) => (
            <div key={i} className="px-3 py-2 text-xs font-medium text-[#475467]" style={ROBOTO}>{h}</div>
          ))}
        </div>
        <div className="max-h-48 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-[#667085]" style={ROBOTO}>
              No matching profiles
            </div>
          ) : (
            results.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleSelect(c.id)}
                className={`w-full grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] items-center border-b border-[#eaecf0] last:border-b-0 transition-colors text-left ${
                  selected.has(c.id) ? "bg-[#f4f3ff]" : "hover:bg-[#f9fafb]"
                }`}
              >
                <div className="px-3 py-2.5 flex items-center">
                  <div className={`size-4 rounded border flex items-center justify-center ${
                    selected.has(c.id) ? "bg-[#7068de] border-[#7068de]" : "border-[#d0d5dd]"
                  }`}>
                    {selected.has(c.id) && <Check size={10} className="text-white" strokeWidth={3} />}
                  </div>
                </div>
                <div className="px-3 py-2.5 text-sm font-medium text-[#344054] truncate" style={ROBOTO}>{c.name}</div>
                <div className="px-3 py-2.5 text-xs text-[#667085] font-mono">{c.id}</div>
                <div className="px-3 py-2.5 text-xs text-[#667085] truncate">{c.email}</div>
                <div className="px-3 py-2.5 text-xs text-[#667085]">{c.country}</div>
                <div className="px-3 py-2.5"><StatusChip status={c.status} /></div>
              </button>
            ))
          )}
        </div>
      </div>

      {selected.size > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#f4f3ff] border border-[#c3c3f7] rounded-lg">
          <span className="text-sm text-[#604dd0] font-medium" style={ROBOTO}>
            {selected.size} selected
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className="h-8 px-3 flex items-center gap-1.5 bg-[#7068de] text-white text-xs font-semibold rounded-lg hover:bg-[#5f57cc]"
            style={ROBOTO}
          >
            <Plus size={13} strokeWidth={2} />
            Add to group
          </button>
        </div>
      )}
    </div>
  );
}

// ─── UploadCSVTab ─────────────────────────────────────────────────────────────

function UploadCSVTab({
  existingIds,
  onAdd,
}: {
  existingIds: string[];
  onAdd: (ids: string[]) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "uploading" | "preview">("idle");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Simulated import preview rows
  const previewRows = [
    { id: "32299512", status: "valid"     as const },
    { id: "88910212", status: "valid"     as const },
    { id: "64372839", status: "valid"     as const },
    { id: "37849537", status: "duplicate" as const },
    { id: "BADROW01", status: "invalid"   as const },
    { id: "59375833", status: "valid"     as const },
    { id: "71234567", status: "valid"     as const },
    { id: "INVALID2", status: "invalid"   as const },
  ];

  const [rows, setRows] = useState(previewRows);

  const simulateUpload = () => {
    setPhase("uploading");
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 30;
      if (p >= 100) { p = 100; clearInterval(interval); setTimeout(() => { setPhase("preview"); setRows(previewRows); }, 200); }
      setProgress(Math.min(p, 100));
    }, 120);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) simulateUpload();
  };

  const removeRow = (id: string) => setRows((prev) => prev.filter((r) => r.id !== id));

  const validIds = rows.filter((r) => r.status === "valid" && !existingIds.includes(r.id)).map((r) => r.id);

  const statusColors = {
    valid:     "text-[#067647] bg-[#ecfdf3] border-[#abefc6]",
    duplicate: "text-[#b54708] bg-[#fffaeb] border-[#fedf89]",
    invalid:   "text-[#d92d20] bg-[#fef3f2] border-[#fda29b]",
  };

  if (phase === "idle") {
    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl px-6 py-12 cursor-pointer transition-colors ${
          dragOver ? "border-[#7068de] bg-[#f4f3ff]" : "border-[#d0d5dd] hover:border-[#7068de] hover:bg-[#fafaff]"
        }`}
      >
        <div className="size-12 rounded-full bg-[#e6e5fc] flex items-center justify-center">
          <CloudUpload size={24} className="text-[#604dd0]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#344054]" style={ROBOTO}>
            Drop CSV here or <span className="text-[#7068de]">click to browse</span>
          </p>
          <p className="text-xs text-[#667085] mt-1" style={ROBOTO}>
            One Customer ID per row. Column header optional.
          </p>
        </div>
        <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={simulateUpload} />
      </div>
    );
  }

  if (phase === "uploading") {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <div className="w-full max-w-xs bg-[#eaecf0] rounded-full h-2">
          <div
            className="bg-[#7068de] h-2 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-[#667085]" style={ROBOTO}>
          Processing CSV… {Math.round(progress)}%
        </p>
      </div>
    );
  }

  const countsByStatus = {
    valid:     rows.filter((r) => r.status === "valid").length,
    duplicate: rows.filter((r) => r.status === "duplicate").length,
    invalid:   rows.filter((r) => r.status === "invalid").length,
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Summary chips */}
      <div className="flex gap-2 flex-wrap">
        <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${statusColors.valid}`}>
          ✓ {countsByStatus.valid} valid
        </span>
        {countsByStatus.duplicate > 0 && (
          <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${statusColors.duplicate}`}>
            ⊘ {countsByStatus.duplicate} duplicate
          </span>
        )}
        {countsByStatus.invalid > 0 && (
          <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${statusColors.invalid}`}>
            ✗ {countsByStatus.invalid} invalid
          </span>
        )}
      </div>

      {/* Preview table */}
      <div className="border border-[#eaecf0] rounded-lg overflow-hidden max-h-52 overflow-y-auto">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between px-4 py-2.5 border-b border-[#eaecf0] last:border-b-0 hover:bg-[#f9fafb]"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-[#344054]">{row.id}</span>
              <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${statusColors[row.status]}`}>
                {row.status}
              </span>
            </div>
            {(row.status === "invalid" || row.status === "duplicate") && (
              <button type="button" onClick={() => removeRow(row.id)} className="text-[#667085] hover:text-[#d92d20]">
                <Trash2 size={13} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => { onAdd(validIds); setPhase("idle"); setRows(previewRows); }}
          disabled={validIds.length === 0}
          className="h-9 px-4 flex items-center gap-2 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] disabled:opacity-40"
          style={ROBOTO}
        >
          <Upload size={14} />
          Import {validIds.length} valid rows
        </button>
        <button
          type="button"
          onClick={() => { setPhase("idle"); setRows(previewRows); }}
          className="h-9 px-3 text-sm text-[#344054] border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb]"
          style={ROBOTO}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── CustomerTable ────────────────────────────────────────────────────────────

function CustomerTable({
  customers,
  onRemove,
  onAddLabel,
  onRemoveLabel,
}: {
  customers: Customer[];
  onRemove: (id: string) => void;
  onAddLabel: (id: string, label: string) => void;
  onRemoveLabel: (id: string, label: string) => void;
}) {
  const [labelPopover, setLabelPopover] = useState<string | null>(null);

  if (customers.length === 0) return null;

  return (
    <div className="border border-[#eaecf0] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1fr_100px_1fr_80px_1fr_auto] bg-[#f9fafb] border-b border-[#eaecf0]">
        {["Name", "ID", "Email", "Country", "Labels", ""].map((h, i) => (
          <div key={i} className="px-4 py-2.5 text-xs font-medium text-[#475467]" style={ROBOTO}>{h}</div>
        ))}
      </div>
      {/* Rows */}
      <div className="max-h-56 overflow-y-auto">
        {customers.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-[1fr_100px_1fr_80px_1fr_auto] items-center border-b border-[#eaecf0] last:border-b-0 hover:bg-[#fafaff] group"
          >
            <div className="px-4 py-3 text-sm font-medium text-[#344054] truncate" style={ROBOTO}>{c.name}</div>
            <div className="px-4 py-3 text-xs text-[#667085] font-mono">{c.id}</div>
            <div className="px-4 py-3 text-xs text-[#667085] truncate">{c.email}</div>
            <div className="px-4 py-3 text-xs text-[#667085]">{c.country}</div>
            <div className="px-4 py-3 flex flex-wrap gap-1 items-center">
              {c.labels.map((l) => (
                <LabelChip key={l} label={l} size="xs" onRemove={() => onRemoveLabel(c.id, l)} />
              ))}
              {/* Add label popover */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLabelPopover(labelPopover === c.id ? null : c.id)}
                  className="size-5 rounded border border-dashed border-[#d0d5dd] flex items-center justify-center text-[#667085] hover:border-[#7068de] hover:text-[#7068de] transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Plus size={10} strokeWidth={2.5} />
                </button>
                {labelPopover === c.id && (
                  <div className="absolute left-0 top-full mt-1 w-36 bg-white border border-[#eaecf0] rounded-lg shadow-lg z-50 py-1 max-h-40 overflow-y-auto">
                    {ALL_LABELS.filter((l) => !c.labels.includes(l)).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => { onAddLabel(c.id, l); setLabelPopover(null); }}
                        className="w-full px-2.5 py-1.5 text-left hover:bg-[#f9fafb]"
                      >
                        <LabelChip label={l} size="xs" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="px-4 py-3">
              <button
                type="button"
                onClick={() => onRemove(c.id)}
                className="text-[#d0d5dd] hover:text-[#d92d20] transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LabelTagInput ────────────────────────────────────────────────────────────

function LabelTagInput({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (labels: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const options = ALL_LABELS.filter(
    (l) => !selected.includes(l) && l.toLowerCase().includes(input.toLowerCase()),
  );

  const add = (l: string) => { onChange([...selected, l]); setInput(""); };
  const remove = (l: string) => onChange(selected.filter((x) => x !== l));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && options[0]) { e.preventDefault(); add(options[0]); }
    if (e.key === "Backspace" && !input && selected.length > 0) remove(selected[selected.length - 1]);
  };

  return (
    <div className="relative" ref={ref}>
      <div className="flex flex-wrap gap-1.5 items-center min-h-[40px] px-3 py-2 border border-[#d0d5dd] rounded-lg bg-white focus-within:ring-2 focus-within:ring-[#7068de]/20 focus-within:border-[#7068de]">
        {selected.map((l) => <LabelChip key={l} label={l} size="xs" onRemove={() => remove(l)} />)}
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          placeholder={selected.length === 0 ? "Add labels..." : ""}
          className="flex-1 min-w-[80px] text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none bg-transparent"
          style={ROBOTO}
        />
      </div>
      {open && options.length > 0 && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#eaecf0] rounded-lg shadow-lg z-50 py-1 max-h-44 overflow-y-auto">
          {options.map((l) => (
            <button
              key={l}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); add(l); }}
              className="w-full flex items-center px-3 py-2 hover:bg-[#f9fafb] text-left"
            >
              <LabelChip label={l} size="xs" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── TestGroupDrawer ──────────────────────────────────────────────────────────

export default function TestGroupDrawer({
  group,
  onSave,
  onClose,
}: {
  group: TestGroup | null;
  onSave: (g: TestGroup) => void;
  onClose: () => void;
}) {
  const isEdit = group !== null;

  const [name, setName]             = useState(group?.name ?? "");
  const [description, setDescription] = useState(group?.description ?? "");
  const [groupLabels, setGroupLabels] = useState<string[]>(group?.labels ?? []);
  const [customers, setCustomers]   = useState<Customer[]>(group?.customers ?? []);
  const [activeTab, setActiveTab]   = useState<DrawerTab>("paste");
  const [nameError, setNameError]   = useState(false);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const existingIds = customers.map((c) => c.id);

  const addByIds = useCallback((ids: string[]) => {
    const newCustomers = ids
      .filter((id) => !existingIds.includes(id))
      .slice(0, MAX_CUSTOMERS - customers.length)
      .map((id) => {
        const profile = CUSTOMER_PROFILES.find((p) => p.id === id);
        return profile ?? { id, name: `Customer ${id}`, email: "", country: "—", status: "Active" as const, labels: [] };
      });
    setCustomers((prev) => [...prev, ...newCustomers]);
  }, [customers, existingIds]);

  const addProfiles = useCallback((profiles: Customer[]) => {
    const filtered = profiles.filter((p) => !existingIds.includes(p.id));
    setCustomers((prev) => [...prev, ...filtered].slice(0, MAX_CUSTOMERS));
  }, [existingIds]);

  const removeCustomer = (id: string) => setCustomers((prev) => prev.filter((c) => c.id !== id));

  const addLabel = (cid: string, label: string) =>
    setCustomers((prev) => prev.map((c) => c.id === cid ? { ...c, labels: [...c.labels, label] } : c));

  const removeLabel = (cid: string, label: string) =>
    setCustomers((prev) => prev.map((c) => c.id === cid ? { ...c, labels: c.labels.filter((l) => l !== label) } : c));

  const handleSave = () => {
    if (!name.trim()) { setNameError(true); return; }
    const saved: TestGroup = {
      id: group?.id ?? `tg-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      labels: groupLabels,
      customers,
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

  const tabLabels: { id: DrawerTab; label: string }[] = [
    { id: "paste",  label: "Paste CIDs"      },
    { id: "search", label: "Search Profiles" },
    { id: "upload", label: "Upload CSV"       },
  ];

  const pct = Math.min((customers.length / MAX_CUSTOMERS) * 100, 100);
  const atLimit = customers.length >= MAX_CUSTOMERS;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[200] bg-black/20" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-[201] w-[560px] bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#eaecf0] shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-[#101828]" style={ROBOTO}>
              {isEdit ? `Edit: ${group.name}` : "Create Test Group"}
            </h2>
            {isEdit && (
              <p className="text-xs text-[#667085] mt-0.5" style={ROBOTO}>
                Last edited by {group.lastEditedBy} · {group.updatedAt}
              </p>
            )}
          </div>
          <button type="button" onClick={onClose} className="text-[#667085] hover:text-[#344054]">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">

          {/* ── Section 1: Group Details ── */}
          <section className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-[#344054] uppercase tracking-wide" style={ROBOTO}>
              Group Details
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#344054]" style={ROBOTO}>
                Group Name <span className="text-[#d92d20]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(false); }}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose of this Test Group..."
                rows={3}
                className="w-full px-3 py-2.5 border border-[#d0d5dd] rounded-lg text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#7068de]/20 focus:border-[#7068de] resize-none"
                style={ROBOTO}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#344054]" style={ROBOTO}>Group Labels</label>
              <LabelTagInput selected={groupLabels} onChange={setGroupLabels} />
            </div>
          </section>

          {/* ── Section 2: Customer Profiles ── */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#344054] uppercase tracking-wide" style={ROBOTO}>
                Customer Profiles
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${atLimit ? "text-[#d92d20]" : "text-[#667085]"}`} style={ROBOTO}>
                  {customers.length} / {MAX_CUSTOMERS} Customer IDs
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#eaecf0] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${atLimit ? "bg-[#d92d20]" : "bg-[#7068de]"}`}
                style={{ width: `${pct}%` }}
              />
            </div>

            {atLimit && (
              <p className="text-xs text-[#d92d20] flex items-center gap-1" style={ROBOTO}>
                <AlertCircle size={12} />
                Maximum of {MAX_CUSTOMERS} Customer IDs reached. Remove some to add more.
              </p>
            )}

            {/* Tabs */}
            <div className="flex border-b border-[#eaecf0]">
              {tabLabels.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === t.id
                      ? "border-[#7068de] text-[#604dd0]"
                      : "border-transparent text-[#667085] hover:text-[#344054]"
                  }`}
                  style={ROBOTO}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="min-h-[160px]">
              {activeTab === "paste"  && <PasteCIDsTab  existingIds={existingIds} onAdd={addByIds}     />}
              {activeTab === "search" && <SearchProfilesTab existingIds={existingIds} onAdd={addProfiles} />}
              {activeTab === "upload" && <UploadCSVTab   existingIds={existingIds} onAdd={addByIds}     />}
            </div>

            {/* Customer table */}
            {customers.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#344054]" style={ROBOTO}>
                    Added profiles ({customers.length})
                  </p>
                  <button
                    type="button"
                    onClick={() => setCustomers([])}
                    className="text-xs text-[#667085] hover:text-[#d92d20] transition-colors"
                    style={ROBOTO}
                  >
                    Clear all
                  </button>
                </div>
                <CustomerTable
                  customers={customers}
                  onRemove={removeCustomer}
                  onAddLabel={addLabel}
                  onRemoveLabel={removeLabel}
                />
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#eaecf0] shrink-0 bg-white">
          <p className="text-xs text-[#667085]" style={ROBOTO}>
            <Building2 size={11} className="inline mr-1" />
            Shared across tenant
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 text-sm font-semibold text-[#344054] border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb]"
              style={ROBOTO}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="h-10 px-5 text-sm font-semibold text-white bg-[#7068de] rounded-lg hover:bg-[#5f57cc] shadow-sm"
              style={ROBOTO}
            >
              {isEdit ? "Save changes" : "Create group"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
