# Test Groups Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality Test Groups management page (card grid, create/edit drawer with 3-tab CID input, search/filter, bulk actions, AI suggestions banner) wired into the existing content-studio-home app via the Audience sidebar icon.

**Architecture:** Option B — two focused page files plus a data module. `testGroupsMock.ts` owns all types and seed data. `TestGroups.tsx` owns the page shell and all card/page-level UI. `TestGroupDrawer.tsx` owns the slide-in drawer and its three CID-input tabs. State is lifted to `TestGroupsPage`; the drawer receives its group target and save callback as props.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, lucide-react, existing shared layout components (`ContentStudioSidebar`, `TopNav`)

## Global Constraints

- Font family: `'Roboto', sans-serif` — apply via `style={ROBOTO}` constant (pattern used throughout codebase)
- Primary purple: `#7068de` (hover `#5f57cc`), light bg `#e6e5fc`, active indicator `#604dd0`
- Card borders: `border-[#eaecf0]`, inputs: `border-[#d0d5dd]`, text hierarchy: `#101828` / `#344054` / `#475467` / `#667085`
- All icons: lucide-react, strokeWidth 1.5 or 2 depending on size
- No new npm dependencies — use only packages already in package.json
- No router library — state-based navigation via `Page` union in App.tsx
- Max CIDs per group: 500
- Valid CID: 8-digit numeric string (pattern `/^\d{8}$/`)
- Build command: `npm run build` — must pass with zero errors before committing each task

---

### Task 1: Mock data and shared types

**Files:**
- Create: `src/app/data/testGroupsMock.ts`

**Interfaces produced (used by Tasks 3 and 4):**
```typescript
export interface Customer {
  id: string;        // 8-digit numeric string
  name: string;
  email: string;
  country: string;
  status: "Active" | "Inactive" | "Churned";
  labels: string[];
}

export interface TestGroup {
  id: string;
  name: string;
  description: string;
  labels: string[];
  customers: Customer[];
  createdBy: string;
  createdAt: string;   // "YYYY-MM-DD"
  updatedAt: string;
  lastEditedBy: string;
  usageCount: number;
  isPinned: boolean;
  isFavorite: boolean;
}

export const LABEL_COLORS: Record<string, string>
export const ALL_LABELS: string[]
export const CUSTOMER_PROFILES: Customer[]
export const INITIAL_TEST_GROUPS: TestGroup[]
```

- [ ] **Step 1: Create `src/app/data/testGroupsMock.ts`**

```typescript
export interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  status: "Active" | "Inactive" | "Churned";
  labels: string[];
}

export interface TestGroup {
  id: string;
  name: string;
  description: string;
  labels: string[];
  customers: Customer[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastEditedBy: string;
  usageCount: number;
  isPinned: boolean;
  isFavorite: boolean;
}

export const ALL_LABELS = [
  "VIP", "QA", "Internal", "CRM", "UK", "High Value",
  "Campaign Testing", "Stakeholder", "Control", "High Roller",
  "Test", "EU", "US", "Churn Risk",
];

export const LABEL_COLORS: Record<string, string> = {
  "VIP":              "bg-amber-50   text-amber-700   border-amber-200",
  "QA":               "bg-blue-50    text-blue-700    border-blue-200",
  "Internal":         "bg-gray-100   text-gray-600    border-gray-300",
  "CRM":              "bg-purple-50  text-purple-700  border-purple-200",
  "UK":               "bg-emerald-50 text-emerald-700 border-emerald-200",
  "High Value":       "bg-rose-50    text-rose-700    border-rose-200",
  "Campaign Testing": "bg-indigo-50  text-indigo-700  border-indigo-200",
  "Stakeholder":      "bg-orange-50  text-orange-700  border-orange-200",
  "Control":          "bg-teal-50    text-teal-700    border-teal-200",
  "High Roller":      "bg-red-50     text-red-700     border-red-200",
  "Test":             "bg-sky-50     text-sky-700     border-sky-200",
  "EU":               "bg-lime-50    text-lime-700    border-lime-200",
  "US":               "bg-cyan-50    text-cyan-700    border-cyan-200",
  "Churn Risk":       "bg-pink-50    text-pink-700    border-pink-200",
};

export const CUSTOMER_PROFILES: Customer[] = [
  { id: "32299512", name: "James O'Brien",    email: "james.obrien@email.com",    country: "UK",  status: "Active",   labels: ["VIP", "High Value"] },
  { id: "88910212", name: "Carlos Mendez",    email: "carlos.m@email.com",        country: "ES",  status: "Active",   labels: ["CRM"] },
  { id: "64372839", name: "Marie Dupont",     email: "marie.dupont@email.com",    country: "FR",  status: "Active",   labels: ["VIP"] },
  { id: "37849537", name: "Ivan Petrov",      email: "ivan.petrov@email.com",     country: "BG",  status: "Active",   labels: [] },
  { id: "59375833", name: "Cora Williams",    email: "cora.w@email.com",          country: "UK",  status: "Active",   labels: ["High Value"] },
  { id: "71234567", name: "Ahmed Al-Rashid",  email: "ahmed.r@email.com",         country: "AE",  status: "Active",   labels: ["VIP", "High Roller"] },
  { id: "22345678", name: "Yuki Tanaka",      email: "yuki.t@email.com",          country: "JP",  status: "Inactive", labels: [] },
  { id: "33456789", name: "Emma Schmidt",     email: "emma.s@email.com",          country: "DE",  status: "Active",   labels: ["CRM"] },
  { id: "44567890", name: "Luca Romano",      email: "luca.r@email.com",          country: "IT",  status: "Active",   labels: ["High Value"] },
  { id: "55678901", name: "Sofia Andersen",   email: "sofia.a@email.com",         country: "DK",  status: "Churned",  labels: ["Churn Risk"] },
  { id: "66789012", name: "Patrick Murphy",   email: "pat.m@email.com",           country: "IE",  status: "Active",   labels: ["VIP"] },
  { id: "77890123", name: "Amara Osei",       email: "amara.o@email.com",         country: "GH",  status: "Active",   labels: [] },
  { id: "88901234", name: "Nikolai Volkov",   email: "nikolai.v@email.com",       country: "RU",  status: "Inactive", labels: ["Churn Risk"] },
  { id: "99012345", name: "Priya Sharma",     email: "priya.s@email.com",         country: "IN",  status: "Active",   labels: ["CRM", "High Value"] },
  { id: "10123456", name: "Lucas Ferreira",   email: "lucas.f@email.com",         country: "BR",  status: "Active",   labels: [] },
  { id: "11234567", name: "Ingrid Larsson",   email: "ingrid.l@email.com",        country: "SE",  status: "Active",   labels: ["VIP"] },
  { id: "12345678", name: "Omar Hassan",      email: "omar.h@email.com",          country: "EG",  status: "Active",   labels: ["High Roller"] },
  { id: "13456789", name: "Mei Lin",          email: "mei.lin@email.com",         country: "CN",  status: "Active",   labels: ["VIP", "CRM"] },
  { id: "14567890", name: "Rachel Cohen",     email: "rachel.c@email.com",        country: "IL",  status: "Active",   labels: [] },
  { id: "15678901", name: "Thomas Müller",    email: "thomas.m@email.com",        country: "DE",  status: "Churned",  labels: ["Churn Risk"] },
];

const base: Customer[] = CUSTOMER_PROFILES;

export const INITIAL_TEST_GROUPS: TestGroup[] = [
  {
    id: "tg-1",
    name: "VIP UK Champions",
    description: "High-value UK customers for Champions League campaign QA",
    labels: ["VIP", "UK", "High Value"],
    customers: base.filter((_, i) => [0, 4, 5, 10].includes(i)),
    createdBy: "Haiden McGill",
    createdAt: "2026-04-12",
    updatedAt: "2026-06-28",
    lastEditedBy: "Omer Cohen",
    usageCount: 12,
    isPinned: true,
    isFavorite: true,
  },
  {
    id: "tg-2",
    name: "QA Regression Set",
    description: "Standard regression profiles — one from each region",
    labels: ["QA", "Internal"],
    customers: base.filter((_, i) => [0,1,2,3,6,7,8,9].includes(i)),
    createdBy: "Omer Cohen",
    createdAt: "2026-03-01",
    updatedAt: "2026-06-20",
    lastEditedBy: "Omer Cohen",
    usageCount: 48,
    isPinned: true,
    isFavorite: false,
  },
  {
    id: "tg-3",
    name: "Churn Risk Monitoring",
    description: "Customers flagged as churn risk — used in re-engagement flows",
    labels: ["CRM", "Churn Risk"],
    customers: base.filter((_, i) => [9, 12, 19].includes(i)),
    createdBy: "Haiden McGill",
    createdAt: "2026-05-18",
    updatedAt: "2026-06-15",
    lastEditedBy: "Haiden McGill",
    usageCount: 7,
    isPinned: false,
    isFavorite: false,
  },
  {
    id: "tg-4",
    name: "High Roller VIPs",
    description: "Top-spend customers for premium offer testing",
    labels: ["VIP", "High Roller", "High Value"],
    customers: base.filter((_, i) => [5, 11, 16].includes(i)),
    createdBy: "Sara Klein",
    createdAt: "2026-02-14",
    updatedAt: "2026-05-30",
    lastEditedBy: "Sara Klein",
    usageCount: 3,
    isPinned: false,
    isFavorite: true,
  },
  {
    id: "tg-5",
    name: "EU Stakeholder Panel",
    description: "EU regional stakeholders for localisation review",
    labels: ["Stakeholder", "EU"],
    customers: base.filter((_, i) => [1,2,7,8,10,13,15].includes(i)),
    createdBy: "Marie Dupont",
    createdAt: "2026-01-20",
    updatedAt: "2026-04-10",
    lastEditedBy: "Haiden McGill",
    usageCount: 2,
    isPinned: false,
    isFavorite: false,
  },
  {
    id: "tg-6",
    name: "Control Group — Q3",
    description: "Holdout control group for Q3 campaign measurement",
    labels: ["Control", "Campaign Testing"],
    customers: base.filter((_, i) => [3,6,9,12,14,17,18,19].includes(i)),
    createdBy: "Omer Cohen",
    createdAt: "2026-06-01",
    updatedAt: "2026-06-25",
    lastEditedBy: "Omer Cohen",
    usageCount: 1,
    isPinned: false,
    isFavorite: false,
  },
];
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```
Expected: `✓ built in X.XXs` — zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/data/testGroupsMock.ts
git commit -m "feat: add test groups mock data and shared types"
```

---

### Task 2: Navigation wiring

**Files:**
- Modify: `src/app/shared.tsx` — add `onNavigate` prop to `ContentStudioSidebar`
- Modify: `src/app/App.tsx` — add `"audience"` page, wire Audience nav, import `TestGroupsPage`

**Interfaces consumed:** none  
**Interfaces produced:**
- `ContentStudioSidebar` now accepts `onNavigate?: (page: string) => void`
- `App.tsx` `Page` union includes `"audience"`

- [ ] **Step 1: Update `ContentStudioSidebar` in `src/app/shared.tsx`**

Find the `ContentStudioSidebar` function signature and inner nav click handler. Change:

```tsx
export function ContentStudioSidebar() {
  const [active, setActive] = useState(0);
```

to:

```tsx
export function ContentStudioSidebar({ onNavigate }: { onNavigate?: (page: string) => void } = {}) {
  const [active, setActive] = useState(0);
```

Find the nav button `onClick` handler inside the map:

```tsx
onClick={() => setActive(i)}
```

Replace with:

```tsx
onClick={() => {
  setActive(i);
  if (i === 3) onNavigate?.("audience"); // Audience → Test Groups
}}
```

- [ ] **Step 2: Update `src/app/App.tsx`**

Replace the entire file content:

```tsx
import { useState } from "react";
import HomePage from "./pages/Home";
import TemplateEditorPage from "./pages/TemplateEditor";
import TestGroupsPage from "./pages/TestGroups";
import { type AIChatSession, buildChatFromSession } from "./aiChat";

type Page = "home" | "template-editor" | "audience";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [chatSession, setChatSession] = useState<AIChatSession | null>(null);

  const openEditor = (session?: AIChatSession) => {
    setChatSession(session ?? null);
    setPage("template-editor");
  };

  return (
    <div className="w-full h-screen overflow-hidden" style={{ fontFamily: "'Roboto', sans-serif" }}>
      {page === "home" && (
        <HomePage onNavigate={openEditor} />
      )}
      {page === "template-editor" && (
        <TemplateEditorPage
          onBack={() => setPage("home")}
          initialChat={chatSession ? buildChatFromSession(chatSession) : undefined}
        />
      )}
      {page === "audience" && (
        <TestGroupsPage onBack={() => setPage("home")} />
      )}
    </div>
  );
}
```

Note: `TestGroupsPage` is imported but the file doesn't exist yet — the build will fail until Task 3 is complete. That's acceptable within this task ordering since Task 3 immediately follows.

- [ ] **Step 3: Commit (after Task 3 build passes — commit together)**

Defer commit to end of Task 3 step to avoid a broken-build commit.

---

### Task 3: `TestGroups.tsx` — page shell and all card-level components

**Files:**
- Create: `src/app/pages/TestGroups.tsx`

**Interfaces consumed:**
- `TestGroup`, `Customer`, `INITIAL_TEST_GROUPS`, `LABEL_COLORS`, `ALL_LABELS` from `src/app/data/testGroupsMock.ts`
- `ContentStudioSidebar`, `TopNav` from `src/app/shared.tsx`
- `TestGroupDrawer` from `src/app/pages/TestGroupDrawer.tsx` (imported; drawer file created in Task 4)

**Interfaces produced (used by Task 4 and App.tsx):**
```typescript
export default function TestGroupsPage({ onBack }: { onBack: () => void }): JSX.Element
```

**Note:** `TestGroupDrawer` is imported in this file but created in Task 4. Write the import at the top and use a forward-declared stub pattern: the file will not compile until Task 4 is complete, so commit both tasks together at the end of Task 4.

- [ ] **Step 1: Create `src/app/pages/TestGroups.tsx` with all components**

```tsx
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
import TestGroupDrawer from "./TestGroupDrawer";

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
        <div className="flex items-start justify-between gap-2 pl-6">
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

export default function TestGroupsPage({ onBack }: { onBack: () => void }) {
  const [groups, setGroups] = useState<TestGroup[]>(INITIAL_TEST_GROUPS);
  const [search, setSearch] = useState("");
  const [labelFilter, setLabelFilter] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState<"" | "small" | "medium" | "large">("");
  const [sort, setSort] = useState<"updated" | "alpha" | "usage">("updated");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TestGroup | null>(null);
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

  const openCreate = () => { setEditTarget(null); setDrawerOpen(true); };
  const openEdit = (g: TestGroup) => { setEditTarget(g); setDrawerOpen(true); };

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
    setDrawerOpen(false);
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
    const dups = groups
      .filter((g) => selectedIds.has(g.id))
      .map((g) => ({
        ...g,
        id: `tg-${Date.now()}-${Math.random()}`,
        name: `${g.name} (copy)`,
        createdAt: new Date().toISOString().slice(0, 10),
        updatedAt: new Date().toISOString().slice(0, 10),
        usageCount: 0,
        isPinned: false,
      }));
    setGroups((prev) => [...dups, ...prev]);
    setSelectedIds(new Set());
  };

  const toggleFavorite = (id: string) =>
    setGroups((prev) => prev.map((g) => g.id === id ? { ...g, isFavorite: !g.isFavorite } : g));

  const togglePin = (id: string) =>
    setGroups((prev) => prev.map((g) => g.id === id ? { ...g, isPinned: !g.isPinned } : g));

  const activeFilters = labelFilter.length > 0 || sizeFilter !== "";

  return (
    <div className="flex h-screen overflow-hidden">
      <ContentStudioSidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav />

        <div className="flex-1 overflow-y-auto bg-[#f9fafb]">
          <div className="max-w-[1200px] mx-auto px-8 py-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-[#667085] mb-5" style={ROBOTO}>
              <button type="button" onClick={onBack} className="hover:text-[#344054]">Content Studio</button>
              <span>/</span>
              <span className="text-[#344054] font-medium">Audience</span>
              <span>/</span>
              <span className="text-[#101828] font-medium">Test Groups</span>
            </nav>

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

            {/* AI Suggestions */}
            <AISuggestionsBanner />

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
                  onClick={() => { setLabelFilter([]); setSizeFilter(""); }}
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

      {/* Create / Edit drawer */}
      {drawerOpen && (
        <TestGroupDrawer
          group={editTarget}
          onSave={handleSave}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes (after Task 4 creates the drawer)**

Defer build check to end of Task 4.

---

### Task 4: `TestGroupDrawer.tsx` — create/edit drawer with 3-tab CID input

**Files:**
- Create: `src/app/pages/TestGroupDrawer.tsx`

**Interfaces consumed:**
- `TestGroup`, `Customer`, `CUSTOMER_PROFILES`, `ALL_LABELS`, `LABEL_COLORS` from `src/app/data/testGroupsMock.ts`
- `LabelChip` from `src/app/pages/TestGroups.tsx`

**Interfaces produced:**
```typescript
export default function TestGroupDrawer({
  group,        // null = create mode, TestGroup = edit mode
  onSave,       // (savedGroup: TestGroup) => void
  onClose,      // () => void
}: {
  group: TestGroup | null;
  onSave: (group: TestGroup) => void;
  onClose: () => void;
}): JSX.Element
```

- [ ] **Step 1: Create `src/app/pages/TestGroupDrawer.tsx`**

```tsx
import { useState, useRef, useEffect, useCallback } from "react";
import {
  X, Plus, Search, Upload, CloudUpload, Check,
  Trash2, ChevronDown, AlertCircle, CheckCircle2, AlertTriangle,
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
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```
Expected: `✓ built in X.XXs` with zero TypeScript errors.

- [ ] **Step 3: Commit all tasks (Tasks 2 + 3 + 4 together)**

```bash
git add src/app/App.tsx src/app/shared.tsx src/app/pages/TestGroups.tsx src/app/pages/TestGroupDrawer.tsx
git commit -m "feat: add Test Groups management page with create/edit drawer

- Navigation: Audience sidebar icon (index 3) navigates to 'audience' page
- TestGroups.tsx: card grid, search/filter, bulk actions, AI suggestions banner,
  delete modal, empty state — 6 seeded groups with pinning, favouriting, overflow menu
- TestGroupDrawer.tsx: slide-in drawer with Group Details + Customer Profiles sections;
  three CID input tabs (Paste / Search Profiles / Upload CSV), customer table with
  per-CID label management, progress bar (N/500), inline validation"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered in |
|---|---|
| Card grid with all fields | Task 3 `TestGroupCard` |
| Search across name/desc/labels/CIDs | Task 3 `TestGroupsPage` filter fn |
| Filters: Labels, Size, Sort | Task 3 filter controls |
| Bulk actions: Delete, Duplicate | Task 3 `BulkActionsBar` + handlers |
| Empty state | Task 3 `EmptyState` |
| Create/Edit drawer | Task 4 `TestGroupDrawer` |
| Group Details: Name, Desc, Labels | Task 4 `GroupDetailsSection` |
| Paste CIDs tab with validation | Task 4 `PasteCIDsTab` |
| Search Profiles tab | Task 4 `SearchProfilesTab` |
| Upload CSV tab | Task 4 `UploadCSVTab` |
| Customer table with per-CID labels | Task 4 `CustomerTable` |
| Progress bar N/500 | Task 4 drawer header |
| Delete confirmation modal | Task 3 `DeleteModal` |
| Overflow menu: Edit/Duplicate/Pin/Delete | Task 3 `TestGroupCard` |
| Tenant sharing indicator + tooltip | Task 3 card footer, Task 4 drawer footer |
| AI Suggestions banner (dismissible) | Task 3 `AISuggestionsBanner` |
| Favourite star | Task 3 `TestGroupCard` |
| Pin to top | Task 3 pin handler, sort logic |
| Audience sidebar navigation | Task 2 |
| Breadcrumb | Task 3 `TestGroupsPage` |
| Mock data: 6 groups + 20 profiles | Task 1 |
| "Created By" filter | ⚠️ Missing — add a simple Created By select to `TestGroupsPage` |

**Gap found:** "Created By" filter is in the spec but missing from the filter bar. Fix inline in Task 3 Step 1 — add a `<select>` for `createdBy` next to the Size select, populated from `[...new Set(INITIAL_TEST_GROUPS.map(g => g.createdBy))]`.

**Fix (add to `TestGroupsPage` state and filter bar in Task 3 Step 1):**

Add state: `const [createdByFilter, setCreatedByFilter] = useState("");`

Add to filter fn: `if (createdByFilter && g.createdBy !== createdByFilter) return false;`

Add to filter bar JSX (after Size select):
```tsx
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
```

Also add `createdByFilter !== ""` to `activeFilters` and `setCreatedByFilter("")` in clear handler.

**No other gaps or type inconsistencies found.** All method names (`handleSave`, `addByIds`, `addProfiles`, etc.) are consistent between where they're defined and where they're called.
