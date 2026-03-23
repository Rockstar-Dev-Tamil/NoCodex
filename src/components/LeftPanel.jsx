import React, { useState } from 'react';
import { Layout, Layers, Type, Image as ImageIcon, Box, Minus, Footprints, MessageSquare, Square, List, Search, Trash2, Layers3, Rocket, Terminal, MousePointer2 } from 'lucide-react';
import useCanvasStore from '../store/useCanvasStore';
import { useDraggable } from '@dnd-kit/core';

const DraggableItem = ({ type, icon, label, payload }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `drag-${type}`,
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
            className={`indie-card p-3.5 rounded-xl border border-[#1e1e2e] flex items-center gap-4 cursor-grab active:cursor-grabbing hover:border-[#52526e] hover:bg-[#0f0f14] group transition-all duration-300 ${isDragging ? 'opacity-30' : ''}`}
        >
            <div className="p-2.5 rounded-lg bg-[#1e1e2e] group-hover:bg-[#00e5ff]/10 group-hover:text-[#00e5ff] transition-colors">
                {icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#52526e] group-hover:text-white transition-all">{label}</span>
        </div>
    );
};

const LeftPanel = () => {
    const [activeTab, setActiveTab] = useState('components');
    const { elements, selectElement, selectedId, removeElement } = useCanvasStore();

    const library = [
        { 
            group: 'Layout', 
            items: [
                { type: 'Hero', icon: <Rocket size={18} />, label: 'Hero Section', payload: { type: 'Hero', content: { title: 'Welcome to Space', subtitle: 'The final frontier.' } } },
                { type: 'Section', icon: <Layout size={18} />, label: 'Standard Section', payload: { type: 'Section', content: { title: 'New Nebula Content', text: 'This is a standard section.' } } },
                { type: 'Divider', icon: <Minus size={18} />, label: 'Subtle Divider', payload: { type: 'Divider', content: {} } },
            ] 
        },
        { 
            group: 'Content', 
            items: [
                { type: 'Heading', icon: <Type size={18} />, label: 'Large Heading', payload: { type: 'Heading', content: { text: 'UNIVERSE TITLE' } } },
                { type: 'Text', icon: <List size={18} />, label: 'Body Text Content', payload: { type: 'Text', content: { text: 'A long paragraph about the mysteries of the cosmos and beyond.' } } },
                { type: 'Image', icon: <ImageIcon size={18} />, label: 'Media Display', payload: { type: 'Image', content: { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', alt: 'Space View' } } },
                { type: 'Button', icon: <Square size={18} />, label: 'Action Button', payload: { type: 'Button', content: { text: 'INITIATE WARP' } } },
            ] 
        },
        { 
            group: 'Navigation', 
            items: [
                { type: 'Navbar', icon: <Box size={18} />, label: 'Sticky Navbar', payload: { type: 'Navbar', content: { logo: 'OrbitX', links: ['Home', 'Mission', 'Contact'] } } },
                { type: 'Footer', icon: <Footprints size={18} />, label: 'Minimal Footer', payload: { type: 'Footer', content: { text: '© 2026 Cosmic Inc.' } } },
            ] 
        }
    ];

    return (
        <aside className="left-panel-grid w-full bg-[#060608] border-r border-[#1e1e2e] flex flex-col z-100">
            {/* Tab Bar */}
            <div className="flex bg-[#0f0f14] p-1.5 m-6 rounded-2xl border border-[#1e1e2e] shrink-0">
                <button 
                    onClick={() => setActiveTab('components')} 
                    className={`flex-1 py-2.5 text-[0.7rem] font-[800] font-display uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'components' ? 'bg-[#1e1e2e] text-[#00e5ff] shadow-xl' : 'text-[#52526e] hover:text-white'}`}
                >
                    <Box size={14} /> LIBRARY
                </button>
                <button 
                    onClick={() => setActiveTab('layers')} 
                    className={`flex-1 py-2.5 text-[0.7rem] font-[800] font-display uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'layers' ? 'bg-[#1e1e2e] text-[#b49cfc] shadow-xl' : 'text-[#52526e] hover:text-white'}`}
                >
                    <Layers3 size={14} /> LAYERS
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
                {activeTab === 'components' ? (
                    <div className="flex flex-col gap-10 pb-8">
                        {library.map((group) => (
                            <div key={group.group}>
                                <h4 className="text-[10px] font-black font-display text-[#52526e] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 pl-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]/40" /> {group.group}
                                </h4>
                                <div className="flex flex-col gap-3">
                                    {group.items.map((item) => (
                                        <DraggableItem key={item.type} {...item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {elements.length > 0 ? elements.map((el, i) => (
                            <div 
                                key={el.id} 
                                onClick={() => selectElement(el.id)}
                                className={`flex items-center justify-between p-4 rounded-xl border border-[#1e1e2e] transition-all cursor-pointer group ${selectedId === el.id ? 'border-[#00e5ff] bg-[#00e5ff]/5 ring-1 ring-[#00e5ff]/30' : 'hover:border-[#52526e] bg-[#0f0f14]'}`}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`p-1.5 rounded-lg border border-[#1e1e2e] ${selectedId === el.id ? 'text-[#00e5ff] bg-[#00e5ff]/10 border-[#00e5ff]/30' : 'text-[#52526e] bg-[#060608]'}`}>
                                        <Box size={12} />
                                    </div>
                                    <span className={`text-[11px] font-bold uppercase tracking-widest truncate ${selectedId === el.id ? 'text-white' : 'text-[#52526e] group-hover:text-white'}`}>
                                        {el.type}
                                    </span>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); removeElement(el.id); }}
                                    className="p-1.5 rounded-lg text-[#52526e] hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        )) : (
                            <div className="text-center py-32 flex flex-col items-center gap-6">
                                <Rocket className="w-12 h-12 text-[#52526e] opacity-10" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#52526e]/30 px-8 leading-relaxed">No elements deployed yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <div className="p-6 border-t border-[#1e1e2e] bg-[#060608]">
                <div className="px-5 py-4 rounded-2xl bg-[#0f0f14] border border-[#1e1e2e]">
                    <div className="flex items-center gap-2 mb-2 text-[#00e5ff] font-display font-black text-[9px] uppercase tracking-widest">
                        <Terminal size={10} /> BUILDER HINT
                    </div>
                    <p className="text-[10px] text-[#52526e] font-medium leading-[1.3] opacity-80">
                        Drag elements directly onto the canvas in the center to build your site. Double click elements to edit text.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default LeftPanel;
