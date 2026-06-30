# Test Groups Management — Design Spec

**Date:** 2026-06-30  
**Status:** Approved  
**Approach:** Option B — Page + co-located drawer (two files + data module)

---

## Context

Test Groups are reusable collections of Customer IDs (CIDs) that marketers create once and reuse across the Optimove platform — primarily in Smart Preview but also in future campaign workflows. This page is purely for managing those groups, not for previewing template content.

---

## Navigation

- Entry point: clicking the **Audience** sidebar icon (index 3) in `ContentStudioSidebar`
- `App.tsx` adds `"audience"` to the `Page` union
- `ContentStudioSidebar` receives an `onNavigate?: (page: string) => void` prop; Audience icon calls it with `"audience"`
- Back navigation (breadcrumb or Back button) returns to `"home"`

---

## File Structure

```
src/app/data/testGroupsMock.ts       ~200 lines   Mock data + types
src/app/pages/TestGroups.tsx         ~1200 lines  Page + all page-level components
src/app/pages/TestGroupDrawer.tsx    ~900 lines   Create/Edit drawer + all tab content
```

Updates:
- `src/app/App.tsx` — add `"audience"` page, wire Audience nav
- `src/app/shared.tsx` — pass `onNavigate` prop to `ContentStudioSidebar`

---

## Data Model

```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  status: "Active" | "Inactive" | "Churned";
  labels: string[];
}

interface TestGroup {
  id: string;
  name: string;
  description: string;
  labels: string[];
  customers: Customer[];
  createdBy: string;
  createdAt: string;          // ISO date string
  updatedAt: string;
  lastEditedBy: string;
  usageCount: number;
  isPinned: boolean;
  isFavorite: boolean;
}
```

### Mock data seeds

- **6 Test Groups** with varied sizes (4–48 customers), labels, usage counts, pinned/favourite states
- **20 Customer Profiles** for the Search Profiles tab in the drawer
- `LABEL_COLORS`: 12 labels mapped to Tailwind colour classes (bg/text/border)
- `ALL_LABELS`: complete label list for multi-select inputs

---

## Page Components (`TestGroups.tsx`)

### AISuggestionsBanner
- Dismissible banner below page header
- Purple AI icon (Sparkles), horizontal scroll through 4–6 rotating suggestion chips
- Dismiss via ×; state held in component (not persisted)

### LabelChip
- Reusable coloured pill: `bg-{colour}-50 text-{colour}-700 border border-{colour}-200`
- Optional `onRemove` prop renders an × button

### TestGroupCard
- Card layout: favourite star (top-left corner), card body, overflow menu (top-right)
- Header row: group name (semibold) + pinned indicator (Pin icon, purple when active)
- Meta row: label chips (up to 3, +N overflow), customer count, usage count
- Footer row: avatar initials + "by {createdBy}", last updated relative time
- Tenant sharing badge: organisation icon + "Shared across tenant" (tooltip on hover)
- Checkbox: appears on hover in top-left (or always visible during bulk selection)
- Overflow menu items: Edit, Duplicate, Rename, Delete

### EmptyState
- Inline SVG illustration (abstract people/group motif)
- Headline: "Create your first Test Group"
- Supporting text: "Save reusable customer profile groups to speed up QA and preview workflows."
- Primary CTA: "Create Test Group" (opens drawer)

### DeleteModal
- Portal-rendered confirmation modal
- Title: "Delete Test Group?"
- Body: "Deleting this Test Group removes it for everyone within your tenant."
- Actions: Cancel (secondary) + Delete (red destructive)

### BulkActionsBar
- Sticky bar above cards, appears when ≥1 card is checked
- Left: "N selected" with deselect-all ×
- Right: Delete · Duplicate · Add Labels · Remove Labels (each as a button)
- Add/Remove Labels opens a small popover with the full label list

### TestGroupsPage (root)
- Standard shell: `ContentStudioSidebar` + `TopNav` + page body
- Breadcrumb: Content Studio > Audience > Test Groups
- Page header: title + subtitle + "Create Test Group" primary CTA
- Sticky search + filter bar below header
  - Search input (icon + placeholder "Search Test Groups…") — filters name, description, labels, CID values
  - Filter chips: Labels (multi-select popover), Created By (select), Size (< 10 / 10–50 / 50+), Sort (Updated / Alphabetical / Usage)
- Card grid: 3-column responsive (xl: 3, md: 2, sm: 1), pinned groups first
- State: `groups`, `search`, `filters`, `selectedIds`, `drawerOpen`, `editTarget`, `deleteTarget`

---

## Drawer (`TestGroupDrawer.tsx`)

560px right-side drawer with slide-in CSS transform transition. `<body>` scroll locked while open.

### Shell
- Header: title ("Create Test Group" / "Edit {name}"), × close, Save (primary) + Cancel
- Two sections separated by a divider

### Section 1 — Group Details
- **Group Name** (required): text input, inline error if empty on save
- **Description** (optional): 3-row textarea
- **Group Labels**: multi-select tag chip input — type to filter, Enter or click to add, × to remove; shows ALL_LABELS as options

### Section 2 — Customer Profiles

Three tabs: Paste CIDs | Search Profiles | Upload CSV

Progress indicator above tabs: `{count} / 500 Customer IDs` with a purple bar.

#### Tab 1 — Paste CIDs
- Large textarea (placeholder: "Paste one Customer ID per line…")
- Live parse on change: deduplicate, validate (8-digit numeric)
- Summary chips: ✓ Valid (green) · ✗ Invalid (red) · ⊘ Duplicate (amber)
- Preview list: valid IDs shown as removable chips; invalid IDs shown with an error badge

#### Tab 2 — Search Profiles
- Search input (debounced 300ms) over `CUSTOMER_PROFILES` mock data
- Results table: checkbox | Name | ID | Email | Country | Status
- Status chip: Active (green) / Inactive (amber) / Churned (red)
- Sticky selected-count panel at bottom of tab: "N selected — Add to group" button

#### Tab 3 — Upload CSV
- Drag-and-drop zone (dashed border, cloud-upload icon, "Drop CSV here or click to browse")
- On file drop/select: simulated 1.5s progress bar
- Post-parse preview table: Valid rows (green) · Duplicate rows (amber) · Invalid rows (red)
- Counts displayed; users can remove individual invalid rows before confirming import

### Customer Table (shown once any customers are added)
- Columns: Name · ID · Email · Country · Labels · Actions
- Labels: coloured chips per CID, with inline + to add a label (popover) and × to remove
- Actions: trash icon to remove from group
- Shown in a scrollable section below the tabs

---

## Search & Filter Logic

All filtering is client-side, instant.

- **Search**: case-insensitive match on `name | description | labels.join() | customers.map(c=>c.id).join()`
- **Labels filter**: group must include ALL selected labels
- **Created By**: exact match on `createdBy`
- **Size**: < 10 = 0–9 customers, 10–50, 50+
- **Sort**: updatedAt desc (default) | name asc | usageCount desc

Pinned groups always float to the top of results.

---

## Validation

| Condition | Location | Message |
|---|---|---|
| Empty group name | Drawer save | "Group name is required" |
| Duplicate CIDs in paste | Paste tab | Amber "N duplicate" chip |
| Non-numeric CID | Paste tab | Red "N invalid" chip |
| CID count > 500 | Progress bar | Bar turns red; save blocked |
| Invalid CSV rows | Upload tab | Red row highlight; must remove before import |

---

## Delete Flow

- Clicking Delete in overflow menu sets `deleteTarget` (group id)
- `DeleteModal` opens; confirming calls `setGroups(prev => prev.filter(g => g.id !== deleteTarget))`
- Bulk delete: same pattern for each selected id

---

## Tenant Sharing Indicator

Each card footer includes:
```
🏢 Shared across tenant
```
(Lucide `Building2` icon, `text-[#667085]`, tooltip via `title` attribute: "Available to all users within this tenant.")

---

## Additional UX Details

- **Favourite**: star icon top-left of card; click toggles `isFavorite`; favourited groups get a subtle amber star fill
- **Pin**: overflow menu item "Pin to top"; pinned groups float first in grid; pin icon shown in card header when active
- **Recently Used** section: not a separate UI section — handled by sort order (updatedAt desc)
- **Activity History**: shown in drawer as a small "Last edited by {lastEditedBy}" line in the Group Details section footer

---

## Spec Self-Review

- No TBDs or TODO placeholders
- Architecture (two files + data module) consistent throughout
- Scope is focused: one management page + one drawer, no unrelated refactoring
- All requirements from user spec accounted for (bulk actions, CSV, search profiles, AI banner, delete modal, tenant sharing, labels per CID, progress indicator)
- One deliberate omission: Activity History full log (click-to-expand timeline) is out of scope for the prototype; the "Last edited by" line satisfies the spirit of the requirement without a complex timeline component
