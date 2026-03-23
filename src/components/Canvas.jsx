import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import useCanvasStore from '../store/useCanvasStore';
import CanvasElement from './CanvasElement';
import { MousePointer2, Layout } from 'lucide-react';

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
        <main className="canvas-area-grid w-full h-full bg-[#060608] flex items-center justify-center p-12 overflow-auto">
            <div 
                ref={setNodeRef}
                style={{ width: getViewportWidth() }}
                className={`relative h-fit min-h-screen bg-[#0f0f14] border border-[#1e1e2e] transition-all duration-700 mx-auto shadow-[0_40px_100px_rgba(0,0,0,0.6)] ${isOver ? 'ring-2 ring-[#00e5ff] ring-offset-4 ring-offset-[#060608] scale-[1.002] bg-[#00e5ff]/5' : ''}`}
            >
                {/* Canvas Elements */}
                <SortableContext items={elements.map(e => e.id)} strategy={verticalListSortingStrategy}>
                    <div className="flex flex-col w-full h-full min-h-screen pb-64">
                        {elements.length > 0 ? (
                            elements.map((element) => (
                                <CanvasElement key={element.id} element={element} />
                            ))
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-20 gap-8 min-h-screen">
                                <div className="p-10 rounded-full border border-dashed border-[#1e1e2e] bg-[#060608]/50 animate-pulse">
                                    <Layout size={60} className="text-[#52526e] opacity-20" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-[800] font-display text-white tracking-tight uppercase">EMPTY CONSOLE</h3>
                                    <p className="text-[#52526e] text-sm max-w-xs mx-auto leading-relaxed">
                                        Drag components from the library and deploy them here to begin your mission.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 py-3 px-6 bg-[#1e1e2e] rounded-full border border-[#52526e]/10 text-[10px] uppercase font-black tracking-widest text-[#00e5ff]">
                                    <MousePointer2 size={12} /> Ready for deployment
                                </div>
                            </div>
                        )}
                    </div>
                </SortableContext>

                {/* Over State Grid Overlay */}
                {isOver && (
                    <div className="absolute inset-0 bg-[#00e5ff]/5 pointer-events-none z-[100] transition-all" />
                )}
            </div>
        </main>
    );
};

export default Canvas;
