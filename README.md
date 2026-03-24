# 🏗️ NoCodeX: Full System Architecture

> **Note:** It is not fully completed project, it's 30-49% completeed project

## 1. The Core Stack (The Propulsion)
**Framework:** React 19 + Vite 6 (Powered by the Rolldown engine for ultra-fast builds).
**Aesthetic System:** Tailwind-lite via `index.css`. A custom-engineered utility system using HSL CSS variables for the "Indie Developer" palette.
**State Control:** Zustand. A zero-gravity state manager handling the complex element trees, command history (Undo/Redo), and project synchronization.
**Drag & Drop Engine:** `@dnd-kit`. A coordinate-based interaction system using PointerSensors and RectIntersection for physical, responsive movements.

## 2. File Topology (The Sector Map)
```text
nocodex/
├── src/
│   ├── store/
│   │   └── useCanvasStore.js   <-- The Brain: State, History, Logic
│   ├── components/
│   │   ├── TopBar.jsx         <-- Mission Console (Viewport/Actions)
│   │   ├── LeftPanel.jsx       <-- Component Library (Draggables)
│   │   ├── Canvas.jsx          <-- Deploy Zone (Droppable)
│   │   ├── CanvasElement.jsx   <-- Mission Modules (The actual UI)
│   │   ├── PropertiesPanel.jsx <-- Magnitude Modifiers (Settings)
│   │   ├── ExportModal.jsx     <-- Source Code Generator (HTML/TW)
│   │   └── DeployModal.jsx     <-- Broadcast Sequence (UX)
│   ├── pages/
│   │   ├── LandingPage.jsx     <-- Marketing Front (Indie Aesthetic)
│   │   ├── EditorPage.jsx      <-- The Forge (3-Column Interface)
│   │   └── DashboardPage.jsx   <-- Mission Deck (Project Management)
│   └── index.css               <-- The Design Token System
```

## 3. Logic & Data Flow (The Flight Path)
### A. The State Machine (`useCanvasStore.js`)
The entire application state lives in a single JSON tree.

- **Elements Array:** A list of objects containing `id`, `type`, content (text/urls), and props (visual settings).
- **History Stack:** A 20-step deep buffer storing serialized JSON snapshots of the canvas for instant Undo/Redo via state slicing.
- **ID Generation:** Uses the browser's native `crypto.randomUUID()` for collision-free element targeting.

### B. The Interaction Loop (DND Logic)
- **Selection:** Clicking a `CanvasElement` broadcasts an ID to the `selectedId` state, activating the `PropertiesPanel`.
- **Drag-to-Deploy:** Sidebar items have `useDraggable`. When dropped on the `Canvas` (via `useDroppable`), the `addElement` logic pushes a new payload into the elements array.
- **Sortable Reordering:** Uses `arrayMove` to shift indices inside the list without breaking element ID references, keeping the DOM synchronized with the state.

### C. Component Rendering (The Modules)
Each module in `CanvasElement.jsx` is Reactive.

- **Heading/Text:** Rendered as transparent inputs/textareas to allow Direct Canvas Editing.
- **Prop Propagation:** CSS Variables (background, color, padding) are calculated at the component level and injected into a container style object for real-time visual mutation.

### D. The Code Transpiler
In `ExportModal.jsx`, a custom loop iterates through the active element tree, mapping each Indie-Module to raw, production-ready HTML and Tailwind CSS. It injects Google Font links (Syne/Inter) automatically to ensure the exported site matches the builder.

## 4. Design Tokens (The Visual Signature)
- **Display Font:** Syne (800 weight) for tectonic hierarchy.
- **Body Font:** Inter for technical readability.
- **Primary Fill:** `#00e5ff` (Cyan) — Used for "Mission Active" states.
- **Surface Core:** `#060608` (Deep Black) — Zero-gravity background.
- **Sector Border:** `#1e1e2e` — Subtle "pro-tool" delineations.

## 5. Why It Works (The Core Logic)
NoCodeX doesn't just "place" items; it simulates a Sector Workspace. The layout is strictly grid-based (300px | 1fr | 340px), ensuring your mission controls never overlap with your build results.

Your entire project is stored in the browser's Local Storage under the key `nocodex_projects`, making it persistence-ready without requiring a backend for the development phase.

The system is currently fully locked, synced, and operational. 🚀🏗️✨
