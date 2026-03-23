import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import useCanvasStore from '../store/useCanvasStore';
import CanvasElement from './CanvasElement';
import { MousePointer2, Layout, Plus, Activity } from 'lucide-react';

const Canvas = () => {
    const { elements, viewport } = useCanvasStore();
    const { setNodeRef, isOver } = useDroppable({
        id: 'canvas-dropzone',
    });

    const getViewportWidth = () => {
        switch (viewport) {
            case 'tablet': return '768px';
            case 'mobile': return '390px';
            default: return '1000px';
        }
    };

    return (
        <main className="w-full h-full bg-[#030303] flex items-center justify-center p-10 overflow-auto relative bg-grid bg-[length:30px_30px]">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 border-l border-t border-white/5" />
                <div className="absolute top-10 right-10 w-40 h-40 border-r border-t border-white/5" />
                <div className="absolute bottom-10 left-10 w-40 h-40 border-l border-b border-white/5" />
                <div className="absolute bottom-10 right-10 w-40 h-40 border-r border-b border-white/5" />
            </div>

            <motion.div 
                layout
                ref={setNodeRef}
                style={{ width: getViewportWidth() }}
                initial={false}
                animate={{ width: getViewportWidth() }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative h-fit min-h-[90%] bg-black border border-white/10 mx-auto shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10 ${isOver ? 'border-[#00f2ff] ring-4 ring-[#00f2ff]/10 scale-[1.005]' : ''} transition-all duration-300`}
            >
                {/* Viewport Label */}
                <div className="absolute -top-8 left-0 flex items-center gap-2 text-[8px] font-black text-[#64748b] tracking-[0.3em] uppercase">
                    <Activity size={10} strokeWidth={3} className="text-[#00f2ff]" /> VIEWPORT_PRIMARY // {viewport}
                </div>

                {/* Canvas Elements */}
                <SortableContext items={elements.map(e => e.id)} strategy={verticalListSortingStrategy}>
                    <div className="flex flex-col w-full h-full min-h-[85vh] pb-64 overflow-hidden">
                        <AnimatePresence>
                            {elements.length > 0 ? (
                                elements.map((element) => (
                                    <CanvasElement key={element.id} element={element} />
                                ))
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 flex flex-col items-center justify-center text-center p-20 gap-8 min-h-[85vh]"
                                >
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-[#00f2ff]/10 filter blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="p-12 rounded-xl border border-dashed border-white/10 bg-white/[0.01] relative z-10">
                                            <Plus size={48} className="text-[#64748b] opacity-20" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-black text-white tracking-widest uppercase opacity-20">WORKSPACE_EMPTY</h3>
                                        <p className="text-[#64748b] text-[10px] uppercase font-bold tracking-widest max-w-xs mx-auto leading-relaxed opacity-50">
                                            Initialize build by dragging mission components into the primary viewport.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 py-3 px-6 bg-white/5 rounded-md border border-white/5 text-[9px] uppercase font-black tracking-[0.2em] text-[#00f2ff] animate-pulse">
                                        <Activity size={12} strokeWidth={3} /> SYSTEM_READY
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </SortableContext>

                {/* Over State Grid Overlay */}
                {isOver && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-[#00f2ff]/5 border-2 border-[#00f2ff] pointer-events-none z-[100] transition-all" 
                    />
                )}
            </motion.div>

            {/* Viewport Info Overlay (Left Side) */}
            <div className="fixed bottom-10 left-[320px] pointer-events-none">
                <div className="text-[8px] font-black text-[#64748b] uppercase tracking-[0.2em] space-y-1">
                    <p>CANVAS_SYNC: ACTIVE</p>
                    <p>ENGINE_FPS: 60.0</p>
                    <p>MEMORY_USAGE: 124MB</p>
                </div>
            </div>
        </main>
    );
};

export default Canvas;
