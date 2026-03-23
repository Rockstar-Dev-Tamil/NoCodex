import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    DndContext, 
    rectIntersection,
    DragOverlay, 
    PointerSensor, 
    KeyboardSensor, 
    useSensor, 
    useSensors,
    defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import useCanvasStore from '../store/useCanvasStore';
import TopBar from '../components/TopBar';
import LeftPanel from '../components/LeftPanel';
import Canvas from '../components/Canvas';
import PropertiesPanel from '../components/PropertiesPanel';
import ExportModal from '../components/ExportModal';
import DeployModal from '../components/DeployModal';
import { Box, Rocket, Layout, Type, Square, Activity } from 'lucide-react';

const EditorPage = () => {
    const { id } = useParams();
    const { elements, addElement, reorderElements, projectName, loadProject } = useCanvasStore();
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeployOpen, setIsDeployOpen] = useState(false);
    const [activeDragItem, setActiveDragItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/projects/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Project not found');
                    return res.json();
                })
                .then(project => loadProject(project))
                .catch(err => console.error("Error loading project:", err));
        }
    }, [id, loadProject]);

    useEffect(() => {
        if (id) {
            const timer = setTimeout(() => {
                fetch(`http://localhost:5000/api/projects/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: projectName, elements })
                }).catch(err => console.error("Auto-save failed:", err));
            }, 1000); // 1s debounce
            return () => clearTimeout(timer);
        }
    }, [elements, projectName, id]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveDragItem(active);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveDragItem(null);
        
        if (!over) return;

        if (active.id.toString().startsWith('drag-')) {
            const type = active.data.current.type;
            const payload = active.data.current.payload;
            addElement(type, payload);
            return;
        }

        if (active.id !== over.id) {
            const oldIndex = elements.findIndex((e) => e.id === active.id);
            const newIndex = elements.findIndex((e) => e.id === over.id);
            reorderElements(arrayMove(elements, oldIndex, newIndex));
        }
    };

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.4',
                    filter: 'blur(4px)',
                },
            },
        }),
    };

    return (
        <DndContext 
            sensors={sensors}
            collisionDetection={rectIntersection} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col h-screen w-full bg-[#030303] overflow-hidden text-white font-mono selection:bg-[#00f2ff] selection:text-black">
                {/* Noise Overlay */}
                <div className="fixed inset-0 pointer-events-none noise opacity-[0.03] z-[5]" />
                
                <TopBar onExport={() => setIsExportOpen(true)} onDeploy={() => setIsDeployOpen(true)} projectId={id} />

                <div className="flex-1 grid grid-cols-[300px_1fr_340px] w-full overflow-hidden relative">
                    <LeftPanel />
                    <Canvas />
                    <PropertiesPanel />
                </div>

                <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
                <DeployModal isOpen={isDeployOpen} onClose={() => setIsDeployOpen(false)} projectId={id} />

                <DragOverlay dropAnimation={dropAnimation}>
                    <AnimatePresence>
                        {activeDragItem ? (
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1.05, opacity: 1 }}
                                className="p-4 rounded-lg border-2 border-[#00f2ff] bg-black/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,242,255,0.3)] flex items-center gap-4 rotate-[1deg] z-[500]"
                            >
                                 <div className="w-10 h-10 rounded bg-[#00f2ff]/20 text-[#00f2ff] flex items-center justify-center border border-[#00f2ff]/30">
                                    <Activity size={20} strokeWidth={3} className="animate-pulse" />
                                 </div>
                                 <div className="space-y-1">
                                     <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#00f2ff]">ASSET_DRAG_ACTIVE</span>
                                     <span className="block text-[8px] font-bold uppercase tracking-widest text-white/40">CALIBRATING_COORDINATES...</span>
                                 </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </DragOverlay>

                {/* Global Status Bar */}
                <footer className="h-6 bg-[#030303] border-t border-white/5 px-4 flex items-center justify-between z-[100] relative">
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                             <span className="text-[8px] font-black uppercase tracking-widest text-[#64748b]">ENGINE_READY</span>
                        </div>
                        <div className="w-px h-3 bg-white/10" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#64748b]">REVISION: 1.0.4A</span>
                    </div>
                    <div className="flex gap-4 items-center text-[8px] font-black uppercase tracking-widest text-[#64748b]">
                        <span>UTF-8</span>
                        <span>NODE_V20.x</span>
                        <span className="text-white/40">LN 1, COL 1</span>
                    </div>
                </footer>
            </div>
        </DndContext>
    );
};

export default EditorPage;
