import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useCanvasStore from '../store/useCanvasStore';
import { Trash2, GripVertical, Settings, MousePointer2, Type } from 'lucide-react';

const CanvasElement = ({ element }) => {
    const { id, type, content, props } = element;
    const { selectElement, selectedId, removeElement, updateElementContent } = useCanvasStore();
    const isSelected = selectedId === id;
    const [isEditing, setIsEditing] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: props.background || 'transparent',
        color: props.color || 'var(--white)',
        padding: props.padding || '48px',
        fontSize: props.fontSize || '16px',
        borderRadius: props.borderRadius || '0px',
        position: 'relative',
        zIndex: isSelected ? 50 : 1,
    };

    const handleClick = (e) => {
        e.stopPropagation();
        selectElement(id);
    };

    const handleTextUpdate = (key, value) => {
        updateElementContent(id, { [key]: value });
    };

    const renderContent = () => {
        switch (type) {
            case 'Hero':
                return (
                    <div className="flex flex-col gap-6 py-12 px-2 text-left w-full max-w-5xl mx-auto">
                        <input 
                            value={content.title}
                            onChange={(e) => handleTextUpdate('title', e.target.value)}
                            className="bg-transparent border-none outline-none text-[clamp(2.5rem,6vw,5.5rem)] font-[800] font-display leading-[0.9] tracking-[-0.03em] text-white w-full uppercase"
                        />
                        <textarea 
                            value={content.subtitle}
                            onChange={(e) => handleTextUpdate('subtitle', e.target.value)}
                            className="bg-transparent border-none outline-none text-[16px] font-medium text-[#52526e] max-w-xl leading-relaxed resize-none w-full h-auto"
                            rows={2}
                        />
                        <div className="flex gap-4 mt-4">
                            <button className="px-10 py-4 bg-[#00e5ff] text-[#060608] font-black text-[10px] uppercase tracking-widest rounded-sm">
                                START MISSION
                            </button>
                            <button className="px-10 py-4 border border-[#1e1e2e] text-white font-black text-[10px] uppercase tracking-widest rounded-sm">
                                DOCUMENTATION
                            </button>
                        </div>
                    </div>
                );
            case 'Heading':
                return (
                    <input 
                        value={content.text}
                        onChange={(e) => handleTextUpdate('text', e.target.value)}
                        className="bg-transparent border-none outline-none font-[800] font-display uppercase tracking-[-0.02em] w-full"
                        style={{ fontSize: `calc(${props.fontSize} * 1.5)` }}
                    />
                );
            case 'Section':
                return (
                    <div className="space-y-6 max-w-5xl mx-auto">
                         <input 
                            value={content.title}
                            onChange={(e) => handleTextUpdate('title', e.target.value)}
                            className="bg-transparent border-none outline-none text-4xl font-[800] font-display uppercase tracking-tight text-white w-full"
                         />
                         <textarea 
                            value={content.text}
                            onChange={(e) => handleTextUpdate('text', e.target.value)}
                            className="bg-transparent border-none outline-none text-base opacity-70 leading-relaxed font-medium w-full resize-none"
                            rows={3}
                         />
                    </div>
                );
            case 'Text':
                return (
                    <textarea 
                        value={content.text}
                        onChange={(e) => handleTextUpdate('text', e.target.value)}
                        className="bg-transparent border-none outline-none text-base leading-[1.8] opacity-70 font-medium w-full resize-none h-auto overflow-hidden"
                        rows={5}
                    />
                );
            case 'Button':
                return (
                    <div className="inline-flex">
                        <input 
                            value={content.text}
                            onChange={(e) => handleTextUpdate('text', e.target.value)}
                            className="bg-[#00e5ff] text-[#060608] font-black text-[11px] uppercase tracking-[0.2em] rounded-sm px-10 py-4 border-none outline-none text-center cursor-text w-auto min-w-[120px]"
                        />
                    </div>
                );
            case 'Image':
                return (
                    <div className="space-y-4">
                         <img 
                            src={content.src} 
                            alt={content.alt} 
                            className="w-full h-auto rounded-xl grayscale-[50%] brightness-75 transition-all" 
                         />
                         {isSelected && (
                            <input 
                                type="text"
                                placeholder="Paste image URL..."
                                value={content.src}
                                onChange={(e) => handleTextUpdate('src', e.target.value)}
                                className="w-full bg-[#060608] border border-[#1e1e2e] rounded-lg px-3 py-2 text-[10px] text-[#52526e] outline-none mt-2"
                            />
                         )}
                    </div>
                );
            case 'Navbar':
                return (
                    <nav className="flex items-center justify-between py-6 px-10 border-b border-white/5 bg-[#0f0f14]/40 backdrop-blur-md rounded-2xl mb-8 w-full">
                         <input 
                            value={content.logo}
                            onChange={(e) => handleTextUpdate('logo', e.target.value)}
                            className="bg-transparent border-none outline-none font-[800] font-display text-white uppercase text-base w-32"
                         />
                         <div className="flex gap-8">
                            {content.links.map((link, i) => (
                                <span key={i} className="text-[10px] font-black uppercase text-[#52526e] hover:text-white transition-all">{link}</span>
                            ))}
                         </div>
                    </nav>
                );
            case 'Divider':
                return <div className="w-full h-px bg-white/5 my-4" />;
            case 'Footer':
                return (
                    <footer className="footer-container py-12 mt-12 border-t border-white/5 text-center w-full">
                         <input 
                            value={content.text}
                            onChange={(e) => handleTextUpdate('text', e.target.value)}
                            className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-[0.3em] text-[#52526e] w-full text-center"
                         />
                    </footer>
                );
            default:
                return <div className="p-10 border border-[#1e1e2e] rounded-xl text-center text-[#52526e]">{type} Module Rendering Error</div>;
        }
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            onClick={handleClick}
            className={`group transition-all duration-300 w-full ${isSelected ? 'ring-2 ring-[#00e5ff] shadow-[0_0_60px_rgba(0,229,255,0.15)] z-[50]' : 'hover:bg-white/[0.02]'}`}
        >
            {/* Control Bar Overlay (Only when selected) */}
            {isSelected && (
                <div className="absolute -top-[45px] left-0 flex items-center bg-[#00e5ff] rounded-lg p-1 z-[1000] shadow-2xl">
                     <div {...listeners} {...attributes} className="p-2 cursor-grab active:cursor-grabbing text-[#060608] hover:bg-black/10 rounded-lg">
                        <GripVertical size={14} />
                     </div>
                     <div className="mx-2 w-px h-4 bg-black/10" />
                     <div className="px-3 py-1 font-black text-[9px] uppercase tracking-widest text-[#060608]">
                        {type} MISSION COMPONENT
                     </div>
                     <div className="mx-2 w-px h-4 bg-black/10" />
                     <button 
                        onClick={() => removeElement(id)}
                        className="p-2 text-[#060608] hover:bg-black/10 rounded-lg transition-all"
                     >
                        <Trash2 size={14} />
                     </button>
                </div>
            )}

            {/* Empty Hover Hint */}
            {!isSelected && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-dashed border-[#00e5ff]/30 pointer-events-none transition-all z-[100]" />
            )}

            {/* Content Display */}
            <div className="relative w-full overflow-hidden">
                {renderContent()}
            </div>
        </div>
    );
};

export default CanvasElement;
