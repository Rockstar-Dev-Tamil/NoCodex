import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Layers, Type, Image as ImageIcon, Box, Minus, Footprints, MessageSquare, Square, List, Search, Trash2, Layers3, Rocket, Terminal, MousePointer2, Component, ChevronRight } from 'lucide-react';
import useCanvasStore from '../store/useCanvasStore';
import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ type, icon, label, payload, index }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `drag-${type}-${index}`,
        data: { type, payload }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
    } : undefined;

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            {...listeners} 
            {...attributes}
            className={`indie-card p-3 rounded-md border-white/5 flex items-center gap-3 cursor-grab active:cursor-grabbing hover:bg-white/5 group transition-all duration-200 ${isDragging ? 'opacity-30' : ''}`}
        >
            <div className="w-8 h-8 flex items-center justify-center rounded bg-white/5 text-[#64748b] group-hover:text-[#00f2ff] group-hover:bg-[#00f2ff]/10 transition-colors">
                {icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#64748b] group-hover:text-white transition-all">{label}</span>
        </div>
    );
};

const LeftPanel = () => {
    const [activeTab, setActiveTab] = useState('components');
    const { elements, selectElement, selectedId, removeElement } = useCanvasStore();

    const library = [
        { 
            group: 'Layout Modules', 
            items: [
                { type: 'Hero', icon: <Rocket size={16} />, label: 'Hero Block', payload: { type: 'Hero', content: { title: 'VELOCITY X', subtitle: 'REDEFINING SPEED' } } },
                { type: 'Section', icon: <Layout size={16} />, label: 'Standard Box', payload: { type: 'Section', content: { title: 'CORE DATA', text: 'HIGH PERFORMANCE ASSET' } } },
                { type: 'Divider', icon: <Minus size={16} />, label: 'Magnitude Line', payload: { type: 'Divider', content: {} } },
            ] 
        },
        { 
            group: 'Atomic Units', 
            items: [
                { type: 'Heading', icon: <Type size={16} />, label: 'Title String', payload: { type: 'Heading', content: { text: 'DATA HEADER' } } },
                { type: 'Text', icon: <List size={16} />, label: 'Text Stream', payload: { type: 'Text', content: { text: 'Standard telemetry readout.' } } },
                { type: 'Image', icon: <ImageIcon size={16} />, label: 'Visual Buffer', payload: { type: 'Image', content: { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', alt: 'Buffer' } } },
                { type: 'Button', icon: <Square size={16} />, label: 'Call Action', payload: { type: 'Button', content: { text: 'INITIALIZE' } } },
            ] 
        },
        { 
            group: 'Global Blocks', 
            items: [
                { type: 'Navbar', icon: <Box size={16} />, label: 'Command Nav', payload: { type: 'Navbar', content: { logo: 'X-CORE', links: ['Home', 'Data', 'System'] } } },
                { type: 'Footer', icon: <Footprints size={16} />, label: 'Baseline', payload: { type: 'Footer', content: { text: '© 2026 NOCODEX CORE' } } },
            ] 
        }
    ];

    return (
        <aside className="w-full h-full overflow-hidden bg-[#030303] border-r border-white/5 flex flex-col z-[100] glass">
            {/* Search Bar */}
            <div className="p-6 pb-0">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748b] group-focus-within:text-[#00f2ff] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="SEARCH ASSETS..." 
                        className="w-full bg-white/5 border border-white/5 rounded-md py-2 pl-10 pr-4 text-[10px] font-black tracking-widest uppercase focus:border-[#00f2ff]/50 outline-none transition-all placeholder:text-[#64748b]/50"
                    />
                </div>
            </div>

            {/* Tab Bar */}
            <div className="flex bg-white/5 p-1 m-6 rounded-lg border border-white/5 shrink-0">
                <TabButton 
                    active={activeTab === 'components'} 
                    onClick={() => setActiveTab('components')} 
                    icon={<Component size={14} />} 
                    label="ASSETS"
                />
                <TabButton 
                    active={activeTab === 'layers'} 
                    onClick={() => setActiveTab('layers')} 
                    icon={<Layers3 size={14} />} 
                    label="LAYERS"
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {activeTab === 'components' ? (
                        <motion.div 
                            key="components"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex flex-col gap-8 pb-8"
                        >
                            {library.map((group) => (
                                <div key={group.group}>
                                    <h4 className="text-[9px] font-black text-[#64748b] uppercase tracking-[0.3em] mb-4 flex items-center gap-2 pl-1 opacity-50">
                                         {group.group}
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                        {group.items.map((item, idx) => (
                                            <DraggableItem key={item.type} {...item} index={idx} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="layers"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col gap-1"
                        >
                            {elements.length > 0 ? elements.map((el, i) => (
                                <LayerItem 
                                    key={el.id} 
                                    element={el} 
                                    isSelected={selectedId === el.id}
                                    onSelect={() => selectElement(el.id)}
                                    onRemove={() => removeElement(el.id)}
                                />
                            )) : (
                                <div className="text-center py-20 opacity-20 flex flex-col items-center gap-4">
                                    <Layers className="w-10 h-10" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">WORKSPACE_VOID</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <div className="p-6 border-t border-white/5 bg-black/40">
                <div className="px-5 py-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 mb-2 text-[#00f2ff] font-black text-[9px] uppercase tracking-widest">
                        <Terminal size={12} strokeWidth={3} /> SYSTEM_READOUT
                    </div>
                    <p className="text-[10px] text-[#64748b] font-bold leading-relaxed uppercase tracking-wider opacity-60">
                        Drag assets to primary viewport. Double-click strings to re-initialize data.
                    </p>
                </div>
            </div>
        </aside>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick} 
        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all flex items-center justify-center gap-2 ${active ? 'bg-white/10 text-white shadow-xl ring-1 ring-white/5' : 'text-[#64748b] hover:text-white hover:bg-white/[0.02]'}`}
    >
        {icon} {label}
    </button>
);

const LayerItem = ({ element, isSelected, onSelect, onRemove }) => (
    <div 
        onClick={onSelect}
        className={`group flex items-center justify-between p-3 rounded-md transition-all cursor-pointer border border-transparent ${isSelected ? 'bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]/20' : 'hover:bg-white/5 text-[#64748b]'}`}
    >
        <div className="flex items-center gap-3 min-w-0">
            <ChevronRight size={12} className={`transition-transform ${isSelected ? 'rotate-90 text-[#00f2ff]' : 'opacity-20'}`} />
            <Box size={14} />
            <span className={`text-[10px] font-black uppercase tracking-widest truncate ${isSelected ? 'text-white' : ''}`}>
                {element.type}
            </span>
        </div>
        <button 
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            className={`p-1.5 rounded-md hover:text-red-400 hover:bg-red-500/10 transition-all ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        >
            <Trash2 size={12} />
        </button>
    </div>
);

export default LeftPanel;
