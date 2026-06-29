# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Vite)
npm run build    # production build
```

No test suite is configured.

## Architecture

This is a **Figma Make** export — a React + Vite + TypeScript + Tailwind CSS interactive prototype for Optimove's "Content Studio" feature (a marketing template manager with AI assistance).

### Navigation

State-based page routing lives entirely in `src/app/App.tsx`. The `Page` union type (`"home" | "template-editor"`) drives which page renders. There is no router library.

### Pages

- **`src/app/pages/Home.tsx`** — Template library browser. Contains a drag-scrollable carousel of template types, an AI-create input box (toggle between search and create modes), and a grid of template cards. Clicking mail-channel cards or "Create" navigates to the editor.
- **`src/app/pages/TemplateEditor.tsx`** — Email template editor with three tabs (`content` | `workbench` | `preview`). The content tab shows `EmailPreview` + an optional `EmailDetailsPanel` + the `OptiGeniePanel` AI chat. The workbench tab shows `WorkbenchView` for managing A/B variants.

### Shared layout (`src/app/shared.tsx`)

All layout chrome used across pages lives here and is exported:

| Export | Description |
|---|---|
| `ContentStudioSidebar` | 80px purple sidebar (`#3c378e`) used on the home page |
| `EditorSidebar` | 66px sidebar (`#46398c`) variant for the editor (not currently used by `TemplateEditorPage` — it uses `ContentStudioSidebar`) |
| `SecondaryIconPanel` | 52px white icon strip shown beside the main sidebar on home |
| `TopNav` | 60px top bar with user avatar |
| `EditorToolbar` | 82px toolbar with undo/redo, filename, and action buttons |
| `EditorSecondaryTabs` | 60px tab strip switching between content/workbench/preview |
| `EditorTab` | TypeScript type for the three editor tabs |

### Figma-generated imports (`src/imports/`)

Each subdirectory (e.g. `ContentStudioHomePageCreate`, `Menu`, `Search`) is a Figma-generated component bundle containing:
- `index.tsx` — the React component
- `svg-*.ts` — SVG path string exports consumed by the component
- `*.png` — co-located raster assets

These are imported by the page files using the `@` alias (e.g. `@/imports/Menu`). **Do not restructure these directories** — Figma regenerates them as self-contained units.

The Vite config registers a `figma:asset/` virtual import scheme that resolves to `src/assets/`. Raw `.svg` and `.csv` imports are supported; never add `.css`, `.tsx`, or `.ts` to `assetsInclude`.

### UI components (`src/app/components/ui/`)

Standard shadcn/ui components built on Radix UI primitives. These are available but the pages currently use raw HTML elements styled with Tailwind instead.

### Styling

- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin
- **Theme tokens** defined in `src/styles/theme.css` as CSS custom properties; consumed by Tailwind via `@theme inline`
- **Brand colors** used throughout (not in theme tokens — applied inline):
  - Primary purple: `#7068de` / `#604DD0`
  - Sidebar: `#3c378e`
  - Accent purple bg: `#e6e5fc`
  - Text hierarchy: `#101828` (heading) → `#344054` → `#475467` → `#667085` (muted)
- **Font**: Roboto (loaded via `src/styles/fonts.css`), applied with `style={{ fontFamily: "'Roboto', sans-serif" }}` inline on text elements
- Path alias `@` → `src/`
