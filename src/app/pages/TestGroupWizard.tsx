import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft, X, Check, Plus, Trash2, Search, Upload,
  CloudUpload, AlertCircle, CheckCircle2, AlertTriangle,
  ChevronDown, Building2, Users, Star, Pin,
} from "lucide-react";
import { type TestGroup, type Customer, CUSTOMER_PROFILES, ALL_LABELS, LABEL_COLORS } from "../data/testGroupsMock";
import { LabelChip } from "./TestGroups";
import { ContentStudioSidebar, TopNav } from "../shared";

const ROBOTO = { fontFamily: "'Roboto', sans-serif" } as const;
const MAX_CUSTOMERS = 500;
const VALID_CID = /^\d{8}$/;

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

function parsePastedCIDs(raw: string, existing: string[]) {
  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);
  const seen = new Set<string>();
  const existingSet = new Set(existing);
  const valid: string[] = [], invalid: string[] = [], duplicates: string[] = [];
  for (const line of lines) {
    if (!VALID_CID.test(line)) { invalid.push(line); continue; }
    if (existingSet.has(line) || seen.has(line)) { duplicates.push(line); continue; }
    seen.add(line); valid.push(line);
  }
  return { valid, invalid, duplicates };
}

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

type CustomerTab = "paste" | "search" | "upload";

function StatusChip({ status }: { status: Customer["status"] }) {
  const map = {
    Active:   "bg-[#ecfdf3] text-[#067647] border-[#abefc6]",
    Inactive: "bg-[#fffaeb] text-[#b54708] border-[#fedf89]",
    Churned:  "bg-[#fef3f2] text-[#d92d20] border-[#fda29b]",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${map[status]}`}>{status}</span>;
}

function PasteCIDsTab({ existingIds, onAdd }: { existingIds: string[]; onAdd: (ids: string[]) => void }) {
  const [raw, setRaw] = useState("");
  const parsed = parsePastedCIDs(raw, existingIds);
  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={raw} onChange={e => setRaw(e.target.value)}
        placeholder={"Paste one Customer ID per line...\n\n32299512\n88910212\n64372839"}
        rows={7}
        className="w-full px-3 py-2.5 border border-[#d0d5dd] rounded-lg text-sm text-[#101828] placeholder:text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#7068de]/20 focus:border-[#7068de] resize-none font-mono"
      />
      {raw.trim() && (
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ecfdf3] border border-[#abefc6] text-xs font-medium text-[#067647]">
            <CheckCircle2 size={12} /> {parsed.valid.length} valid
          </span>
          {parsed.invalid.length > 0 && <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef3f2] border border-[#fda29b] text-xs font-medium text-[#d92d20]"><AlertCircle size={12} /> {parsed.invalid.length} invalid</span>}
          {parsed.duplicates.length > 0 && <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fffaeb] border border-[#fedf89] text-xs font-medium text-[#b54708]"><AlertTriangle size={12} /> {parsed.duplicates.length} duplicate</span>}
        </div>
      )}
      {parsed.valid.length > 0 && (
        <button type="button" onClick={() => { onAdd(parsed.valid); setRaw(""); }} className="h-9 px-4 flex items-center gap-2 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] self-start" style={ROBOTO}>
          <Plus size={15} strokeWidth={2} /> Add {parsed.valid.length} Customer ID{parsed.valid.length !== 1 ? "s" : ""}
        </button>
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
        <div className="max-h-52 overflow-y-auto">
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

function UploadCSVTab({ existingIds, onAdd }: { existingIds: string[]; onAdd: (ids: string[]) => void }) {
  const [phase, setPhase] = useState<"idle" | "uploading" | "preview">("idle");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const PREVIEW = [
    { id: "32299512", status: "valid" as const },
    { id: "88910212", status: "valid" as const },
    { id: "64372839", status: "valid" as const },
    { id: "37849537", status: "duplicate" as const },
    { id: "BADROW01", status: "invalid" as const },
    { id: "59375833", status: "valid" as const },
  ];
  const [rows, setRows] = useState(PREVIEW);
  const reset = () => { setPhase("idle"); setRows(PREVIEW); if (fileRef.current) fileRef.current.value = ""; };
  const simulate = () => {
    setPhase("uploading"); setProgress(0);
    let p = 0;
    const iv = setInterval(() => { p += Math.random() * 30; if (p >= 100) { clearInterval(iv); setTimeout(() => { setPhase("preview"); setRows(PREVIEW); }, 200); } setProgress(Math.min(p, 100)); }, 120);
  };
  const statusColors = { valid: "text-[#067647] bg-[#ecfdf3] border-[#abefc6]", duplicate: "text-[#b54708] bg-[#fffaeb] border-[#fedf89]", invalid: "text-[#d92d20] bg-[#fef3f2] border-[#fda29b]" };
  const validIds = rows.filter(r => r.status === "valid" && !existingIds.includes(r.id)).map(r => r.id);

  if (phase === "idle") return (
    <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) simulate(); }} onClick={() => fileRef.current?.click()}
      className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl px-6 py-12 cursor-pointer transition-colors ${dragOver ? "border-[#7068de] bg-[#f4f3ff]" : "border-[#d0d5dd] hover:border-[#7068de] hover:bg-[#fafaff]"}`}>
      <div className="size-12 rounded-full bg-[#e6e5fc] flex items-center justify-center"><CloudUpload size={24} className="text-[#604dd0]" /></div>
      <p className="text-sm font-semibold text-[#344054]" style={ROBOTO}>Drop CSV here or <span className="text-[#7068de]">click to browse</span></p>
      <p className="text-xs text-[#667085]" style={ROBOTO}>One Customer ID per row.</p>
      <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={simulate} />
    </div>
  );

  if (phase === "uploading") return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="w-full max-w-xs bg-[#eaecf0] rounded-full h-2"><div className="bg-[#7068de] h-2 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} /></div>
      <p className="text-sm text-[#667085]" style={ROBOTO}>Processing CSV… {Math.round(progress)}%</p>
    </div>
  );

  const counts = { valid: rows.filter(r => r.status === "valid").length, duplicate: rows.filter(r => r.status === "duplicate").length, invalid: rows.filter(r => r.status === "invalid").length };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${statusColors.valid}`}>✓ {counts.valid} valid</span>
        {counts.duplicate > 0 && <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${statusColors.duplicate}`}>⊘ {counts.duplicate} duplicate</span>}
        {counts.invalid > 0 && <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${statusColors.invalid}`}>✗ {counts.invalid} invalid</span>}
      </div>
      <div className="border border-[#eaecf0] rounded-xl overflow-hidden max-h-52 overflow-y-auto">
        {rows.map(row => (
          <div key={row.id} className="flex items-center justify-between px-4 py-2.5 border-b border-[#eaecf0] last:border-b-0 hover:bg-[#f9fafb]">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-[#344054]">{row.id}</span>
              <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${statusColors[row.status]}`}>{row.status}</span>
            </div>
            {row.status !== "valid" && <button type="button" onClick={() => setRows(p => p.filter(r => r.id !== row.id))} className="text-[#667085] hover:text-[#d92d20]"><Trash2 size={13} /></button>}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => { onAdd(validIds); reset(); }} disabled={validIds.length === 0} className="h-9 px-4 flex items-center gap-2 bg-[#7068de] text-white text-sm font-semibold rounded-lg hover:bg-[#5f57cc] disabled:opacity-40" style={ROBOTO}>
          <Upload size={14} /> Import {validIds.length} valid row{validIds.length !== 1 ? "s" : ""}
        </button>
        <button type="button" onClick={reset} className="h-9 px-3 text-sm text-[#344054] border border-[#d0d5dd] rounded-lg hover:bg-[#f9fafb]" style={ROBOTO}>Cancel</button>
      </div>
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

function AddCustomersStep({ customers, setCustomers }: { customers: Customer[]; setCustomers: (fn: (p: Customer[]) => Customer[]) => void }) {
  const [tab, setTab] = useState<CustomerTab>("paste");
  const existingIds = customers.map(c => c.id);
  const pct = Math.min((customers.length / MAX_CUSTOMERS) * 100, 100);
  const atLimit = customers.length >= MAX_CUSTOMERS;

  const addByIds = useCallback((ids: string[]) => {
    const fresh = ids.filter(id => !existingIds.includes(id)).slice(0, MAX_CUSTOMERS - customers.length);
    const newCustomers = fresh.map(id => {
      const p = CUSTOMER_PROFILES.find(c => c.id === id);
      return p ?? { id, name: `Customer ${id}`, email: "", country: "—", status: "Active" as const, labels: [] };
    });
    setCustomers(prev => [...prev, ...newCustomers]);
  }, [customers, existingIds, setCustomers]);

  const addProfiles = useCallback((profiles: Customer[]) => {
    const fresh = profiles.filter(p => !existingIds.includes(p.id));
    setCustomers(prev => [...prev, ...fresh].slice(0, MAX_CUSTOMERS));
  }, [existingIds, setCustomers]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-[#101828] mb-1" style={ROBOTO}>Add Customers</h2>
        <p className="text-sm text-[#475467]" style={ROBOTO}>Add Customer IDs by pasting, searching profiles, or uploading a CSV.</p>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${atLimit ? "text-[#d92d20]" : "text-[#667085]"}`} style={ROBOTO}>
            {customers.length} / {MAX_CUSTOMERS} Customer IDs
          </span>
          {customers.length > 0 && (
            <button type="button" onClick={() => setCustomers(() => [])} className="text-xs text-[#667085] hover:text-[#d92d20]" style={ROBOTO}>Clear all</button>
          )}
        </div>
        <div className="w-full h-1.5 bg-[#eaecf0] rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${atLimit ? "bg-[#d92d20]" : "bg-[#7068de]"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex border-b border-[#eaecf0] mb-5">
          {([["paste", "Paste CIDs"], ["search", "Search Profiles"], ["upload", "Upload CSV"]] as [CustomerTab, string][]).map(([id, label]) => (
            <button key={id} type="button" onClick={() => setTab(id)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === id ? "border-[#7068de] text-[#604dd0]" : "border-transparent text-[#667085] hover:text-[#344054]"}`} style={ROBOTO}>
              {label}
            </button>
          ))}
        </div>
        {tab === "paste"  && <PasteCIDsTab  existingIds={existingIds} onAdd={addByIds}    />}
        {tab === "search" && <SearchProfilesTab existingIds={existingIds} onAdd={addProfiles} />}
        {tab === "upload" && <UploadCSVTab   existingIds={existingIds} onAdd={addByIds}    />}
      </div>

      {/* Customer table */}
      {customers.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-[#344054]" style={ROBOTO}>Added profiles ({customers.length})</p>
          <CustomerTable
            customers={customers}
            onRemove={id => setCustomers(p => p.filter(c => c.id !== id))}
            onAddLabel={(id, label) => setCustomers(p => p.map(c => c.id === id ? { ...c, labels: [...c.labels, label] } : c))}
            onRemoveLabel={(id, label) => setCustomers(p => p.map(c => c.id === id ? { ...c, labels: c.labels.filter(l => l !== label) } : c))}
          />
        </div>
      )}
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
}: {
  group: TestGroup | null;
  onSave: (g: TestGroup) => void;
  onClose: () => void;
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

  const isDirty = name !== (group?.name ?? "") ||
    description !== (group?.description ?? "") ||
    labels.join() !== (group?.labels ?? []).join() ||
    customers.length !== (group?.customers ?? []).length;

  const handleClose = () => {
    if (isDirty) { setShowDiscard(true); } else { onClose(); }
  };

  const handleNext = () => {
    if (step === 0 && !name.trim()) { setNameError(true); return; }
    setStep(s => Math.min(s + 1, 2));
  };

  const handleSave = () => {
    if (!name.trim()) { setStep(0); setNameError(true); return; }
    const saved: TestGroup = {
      id: group?.id ?? `tg-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      labels,
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

  return (
    <div className="flex h-screen overflow-hidden">
      <ContentStudioSidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav />

        {/* Wizard sub-header: breadcrumb + stepper + close */}
        <div className="shrink-0 flex items-center justify-between px-8 py-4 border-b border-[#eaecf0] bg-white">
          <div className="flex items-center gap-2" style={ROBOTO}>
            <button type="button" onClick={handleClose} className="flex items-center gap-1.5 text-sm text-[#667085] hover:text-[#344054] transition-colors">
              <ArrowLeft size={15} />
              Test Groups
            </button>
            <span className="text-[#d0d5dd]">/</span>
            <span className="text-sm font-medium text-[#101828]">
              {isEdit ? `Edit: ${group.name}` : "New Test Group"}
            </span>
          </div>

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
            <AddCustomersStep customers={customers} setCustomers={setCustomers} />
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
