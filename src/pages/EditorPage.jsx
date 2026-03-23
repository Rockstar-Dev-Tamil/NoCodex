import React, { useState } from 'react';
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
import useCanvasStore from '../store/useCanvasStore';
import TopBar from '../components/TopBar';
import LeftPanel from '../components/LeftPanel';
import Canvas from '../components/Canvas';
import PropertiesPanel from '../components/PropertiesPanel';
import ExportModal from '../components/ExportModal';
import DeployModal from '../components/DeployModal';
import { Box, Rocket, Layout, Type, Square } from 'lucide-react';

const EditorPage = () => {
    const { id } = useParams();
    const { elements, addElement, reorderElements } = useCanvasStore();
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isDeployOpen, setIsDeployOpen] = useState(false);
    const [activeDragItem, setActiveDragItem] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // More sensitive for immediate drag response
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

        // If dragging from library to canvas
        if (active.id.startsWith('drag-')) {
            const type = active.data.current.type;
            const payload = active.data.current.payload;
            addElement(type, payload);
            return;
        }

        // If reordering within canvas
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
                    opacity: '0.5',
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
            <div className="flex flex-col h-screen w-full bg-[#060608] overflow-hidden text-[#f1f1f3]">
                <TopBar onExport={() => setIsExportOpen(true)} onDeploy={() => setIsDeployOpen(true)} />

                <div className="flex-1 grid grid-cols-[300px_1fr_340px] w-full overflow-hidden">
                    <LeftPanel />
                    <Canvas />
                    <PropertiesPanel />
                </div>

                <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
                <DeployModal isOpen={isDeployOpen} onClose={() => setIsDeployOpen(false)} />

                <DragOverlay dropAnimation={dropAnimation}>
                    {activeDragItem ? (
                        <div className="indie-card p-5 border-2 border-[#00e5ff] bg-[#0f0f14] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex items-center gap-4 opacity-90 scale-105 transition-transform rotate-[1deg]">
                             <div className="p-2.5 rounded-lg bg-[#00e5ff]/20 text-[#00e5ff]">
                                <Box size={24} />
                             </div>
                             <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Deploying Agent...</span>
                        </div>
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    );
};

export default EditorPage;
