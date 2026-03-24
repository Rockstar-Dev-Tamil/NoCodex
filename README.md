# 🚀 NoCodeX — Orbital Website Builder

> **Note:** It is not fully completed project, it's 30-49% completeed project

NoCodeX is a next-generation, high-performance, drag-and-drop website building engine. Designed with a custom "Indie Developer" aesthetic and zero-gravity interaction patterns, it bridges the gap between no-code simplicity and developer-grade control.

---

## ✨ Core Propulsion Systems (Features)
- **Zero-Latency State Control**: Powered by **Zustand**. Complex element trees, instant command history (Undo/Redo), and project synchronization run at maximum velocity over a single JSON tree.
- **Physical Drag & Drop Engine**: Driven by `@dnd-kit`. Coordinate-based interactions let you move "Mission Modules" precisely across the deployment grid.
- **Multi-Viewport Forging**: A strict 3-column sector map interface (Component Library → Responsive Canvas → Magnitude Settings) ensures your tools never obscure your build.
- **Code Transpiler**: Map your visual components directly to raw, production-ready HTML5 and Tailwind CSS. Fonts like *Syne* and *Inter* are seamlessly injected into your export.

## 🛸 Technology Stack
- **Framework:** React 19 + Vite 6
- **Build Engine:** Rolldown (Ultra-fast module bundling)
- **State Management:** Zustand
- **Drag & Drop Logic:** `@dnd-kit/core` and `@dnd-kit/sortable`
- **Styling Options:** Vanilla CSS Custom Properties (HSL Token System) & Tailwind-lite
- **Persistence:** Local Storage

## 🌌 The Design Token System
Our aesthetic system utilizes a deeply customized Indie Developer palette designed for premium visual impact out-of-the-box:
- **Tectonic Typography:** Syne Font (Display weights)
- **Technical Readability:** Inter Font (Body text)
- **Mission Active State:** `#00e5ff` (Vibrant Cyan)
- **Zero-Gravity Surface:** `#060608` (Deep, Void Black)
- **Sector Bounds:** `#1e1e2e` (Subtle Pro-Tool Borders)

## 🛠 Space Center Operations

### Ignition Sequence (Local Execution)

1. **Board the Repository**
   ```bash
   git clone https://github.com/Rockstar-Dev-Tamil/NoCodex.git
   cd nocodex
   ```

2. **Check Engine Systems**
   ```bash
   npm install
   ```

3. **Lift-Off**
   ```bash
   npm run dev
   ```

## 🛰 Security & App State
Your entire project operates client-side via browser Local Storage (`nocodex_projects`). A robust historical Undo/Redo slice tracks up to 20 snapshot payloads, making it an entirely self-contained, offline-first experience during development.

---
*Built for the next generation of web explorers.* 🚀🏗️✨
