import { create } from 'zustand';

const useCanvasStore = create((set, get) => ({
    projectName: 'Untitled Project',
    elements: [],
    selectedId: null,
    history: [],
    future: [],
    viewport: 'desktop',

    setProjectName: (name) => set({ projectName: name }),
    setViewport: (viewport) => set({ viewport }),

    saveToHistory: () => {
        const { elements, history } = get();
        set({
            history: [...history.slice(-19), JSON.stringify(elements)], // Limit to 20 steps
            future: []
        });
    },

    addElement: (type, payload = {}) => {
        get().saveToHistory();
        const newElement = {
            id: crypto.randomUUID(),
            type,
            content: payload.content || {},
            props: {
                background: 'transparent',
                color: '#e8e8ff',
                padding: '24px',
                fontSize: '16px',
                borderRadius: '8px',
                ...payload.props
            }
        };
        set((state) => ({ elements: [...state.elements, newElement], selectedId: newElement.id }));
    },

    removeElement: (id) => {
        get().saveToHistory();
        set((state) => ({
            elements: state.elements.filter((el) => el.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId
        }));
    },

    updateElement: (id, updates) => {
        get().saveToHistory();
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, props: { ...el.props, ...updates } } : el
            )
        }));
    },

    updateElementContent: (id, content) => {
        get().saveToHistory();
        set((state) => ({
            elements: state.elements.map((el) =>
                el.id === id ? { ...el, content: { ...el.content, ...content } } : el
            )
        }));
    },

    selectElement: (id) => set({ selectedId: id }),

    reorderElements: (newOrder) => {
        get().saveToHistory();
        set({ elements: newOrder });
    },

    undo: () => {
        const { history, future, elements } = get();
        if (history.length === 0) return;
        const previous = JSON.parse(history[history.length - 1]);
        const newHistory = history.slice(0, -1);
        set({
            elements: previous,
            history: newHistory,
            future: [JSON.stringify(elements), ...future]
        });
    },

    redo: () => {
        const { history, future, elements } = get();
        if (future.length === 0) return;
        const next = JSON.parse(future[0]);
        const newFuture = future.slice(1);
        set({
            elements: next,
            history: [...history, JSON.stringify(elements)],
            future: newFuture
        });
    },

    loadProject: (project) => {
        set({
            projectName: project.name || 'Untitled Project',
            elements: project.elements || [],
            history: [],
            future: [],
            selectedId: null
        });
    }
}));

export default useCanvasStore;
