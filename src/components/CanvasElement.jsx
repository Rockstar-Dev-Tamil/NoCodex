import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion, AnimatePresence } from 'framer-motion';
import useCanvasStore from '../store/useCanvasStore';
import { Trash2, GripVertical, Settings, MousePointer2, Type, ArrowRight, Activity, Layers } from 'lucide-react';

const CanvasElement = ({ element }) => {
    const { id, type, content, props } = element;
    const { selectElement, selectedId, removeElement, updateElementContent } = useCanvasStore();
    const isSelected = selectedId === id;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: props.background || 'transparent',
        color: props.color || 'white',
        padding: props.padding || '60px 40px',
        fontSize: props.fontSize || '16px',
        borderRadius: props.borderRadius || '0px',
        position: 'relative',
        zIndex: isSelected ? 50 : 1,
        opacity: isDragging ? 0.3 : 1,
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
                    <div className="flex flex-col gap-8 py-12 text-left w-full max-w-5xl mx-auto">
                        <div className="space-y-4">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f2ff]/10 border border-[#00f2ff]/20 rounded text-[9px] font-black text-[#00f2ff] tracking-[0.2em] uppercase"
                            >
                                <Activity size={10} strokeWidth={3} /> SYSTEM_ESTABLISHED_2026
                            </motion.div>
                            <textarea 
                                value={content.title}
                                onChange={(e) => handleTextUpdate('title', e.target.value)}
                                className="bg-transparent border-none outline-none text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.85] tracking-[-0.04em] text-white w-full uppercase resize-none h-auto overflow-hidden"
                                rows={2}
                            />
                        </div>
                        <textarea 
                            value={content.subtitle}
                            onChange={(e) => handleTextUpdate('subtitle', e.target.value)}
                            className="bg-transparent border-none outline-none text-lg font-bold text-[#64748b] max-w-xl leading-relaxed resize-none w-full h-auto overflow-hidden uppercase tracking-wider"
                            rows={2}
                        />
                        <div className="flex gap-4 mt-6">
                            <button className="btn-primary py-4 px-10 text-[10px] font-black tracking-[0.3em] uppercase rounded-md">
                                INITIALIZE_BUILD
                            </button>
                            <button className="btn-outline py-4 px-10 text-[10px] font-black tracking-[0.3em] uppercase border-white/10 rounded-md hover:bg-white/5">
                                DATA_STREAM
                            </button>
                        </div>
                    </div>
                );
            case 'Heading':
                return (
                    <div className="max-w-5xl mx-auto py-4">
                        <input 
                            value={content.text}
                            onChange={(e) => handleTextUpdate('text', e.target.value)}
                            className="bg-transparent border-none outline-none font-black uppercase tracking-tight w-full"
                            style={{ fontSize: `calc(${props.fontSize} * 1.5)` }}
                        />
                    </div>
                );
            case 'Section':
                return (
                    <div className="space-y-8 max-w-5xl mx-auto py-12">
                         <div className="h-px w-20 bg-[#00f2ff] opacity-40" />
                         <input 
                            value={content.title}
                            onChange={(e) => handleTextUpdate('title', e.target.value)}
                            className="bg-transparent border-none outline-none text-5xl font-black uppercase tracking-tighter text-white w-full"
                         />
                         <textarea 
                            value={content.text}
                            onChange={(e) => handleTextUpdate('text', e.target.value)}
                            className="bg-transparent border-none outline-none text-lg text-[#64748b] leading-relaxed font-bold w-full resize-none uppercase tracking-wide"
                            rows={3}
                         />
                    </div>
                );
            case 'Text':
                return (
                    <div className="max-w-3xl mx-auto py-6">
                        <textarea 
                            value={content.text}
                            onChange={(e) => handleTextUpdate('text', e.target.value)}
                            className="bg-transparent border-none outline-none text-lg leading-relaxed text-[#64748b] font-bold w-full resize-none h-auto overflow-hidden uppercase tracking-wider"
                            rows={5}
                        />
                    </div>
                );
            case 'Button':
                return (
                    <div className="flex flex-col items-center py-6">
                        <input 
                            value={content.text}
                            onChange={(e) => handleTextUpdate('text', e.target.value)}
                            className="btn-primary py-4 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-md text-center outline-none border-none min-w-[200px]"
                        />
                    </div>
                );
            case 'Image':
                return (
                    <div className="max-w-5xl mx-auto py-12 relative group/img">
                         <div className="absolute inset-0 bg-[#00f2ff]/5 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none rounded-xl" />
                         <img 
                            src={content.src} 
                            alt={content.alt} 
                            className="w-full h-auto rounded-xl border border-white/5 grayscale group-hover/img:grayscale-0 transition-all duration-700 shadow-2xl" 
                         />
                         {isSelected && (
                             <div className="mt-6 p-4 bg-white/5 border border-white/5 rounded-lg flex gap-3 items-center">
                                 <Activity size={12} className="text-[#00f2ff]" />
                                 <input 
                                    type="text"
                                    placeholder="HEX_URL_INPUT..."
                                    value={content.src}
                                    onChange={(e) => handleTextUpdate('src', e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-[10px] font-mono text-[#64748b] uppercase tracking-tighter"
                                 />
                             </div>
                         )}
                    </div>
                );
            case 'Navbar':
                return (
                    <div className="max-w-6xl mx-auto py-4">
                        <nav className="flex items-center justify-between py-6 px-10 border border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-xl w-full">
                             <div className="flex items-center gap-2">
                                 <div className="w-6 h-6 bg-[#00f2ff] text-black flex items-center justify-center font-black rounded-sm text-[10px]">C</div>
                                 <input 
                                    value={content.logo}
                                    onChange={(e) => handleTextUpdate('logo', e.target.value)}
                                    className="bg-transparent border-none outline-none font-black text-white uppercase text-xs w-32 tracking-wider"
                                 />
                             </div>
                             <div className="flex gap-10">
                                {content.links.map((link, i) => (
                                    <span key={i} className="text-[9px] font-black uppercase text-[#64748b] hover:text-white transition-all tracking-[0.2em] cursor-pointer">{link}</span>
                                ))}
                             </div>
                        </nav>
                    </div>
                );
            case 'Divider':
                return (
                    <div className="w-full h-px relative my-12 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent" />
                        <div className="absolute inset-0 bg-white/5" />
                    </div>
                );
            case 'Footer':
                return (
                    <footer className="w-full py-20 mt-20 border-t border-white/5 text-center">
                         <div className="max-w-5xl mx-auto space-y-8">
                             <div className="flex justify-center gap-12">
                                 <div className="w-1 h-1 bg-[#00f2ff] rounded-full" />
                                 <div className="w-1 h-1 bg-[#00f2ff] rounded-full" />
                                 <div className="w-1 h-1 bg-[#00f2ff] rounded-full" />
                             </div>
                             <input 
                                value={content.text}
                                onChange={(e) => handleTextUpdate('text', e.target.value)}
                                className="bg-transparent border-none outline-none text-[9px] font-black uppercase tracking-[0.4em] text-[#64748b] w-full text-center opacity-40 hover:opacity-100 transition-opacity"
                             />
                         </div>
                    </footer>
                );
            default:
                return <div className="p-10 border border-white/5 rounded-xl text-center text-[#64748b] bg-white/[0.02] uppercase font-black tracking-widest text-[10px] italic">CRITICAL_RENDER_ERROR: {type}</div>;
        }
    };

    return (
        <motion.div 
            ref={setNodeRef} 
            style={style} 
            onClick={handleClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`group w-full relative transition-all duration-300 ${isSelected ? 'shadow-[0_0_80px_rgba(0,242,255,0.1)] z-[50]' : 'hover:bg-white/[0.01]'}`}
        >
            {/* Selection Overlay */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 border-2 border-[#00f2ff]/40 pointer-events-none z-[45]"
                    >
                        {/* Control Bar */}
                        <div className="absolute -top-[45px] right-0 flex items-center bg-[#00f2ff] rounded p-1 z-[1000] shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-auto overflow-hidden">
                             <div className="absolute inset-0 bg-white/10 animate-pulse" />
                             <div {...listeners} {...attributes} className="relative p-2 cursor-grab active:cursor-grabbing text-black hover:bg-white/20 rounded transition-colors">
                                <GripVertical size={14} strokeWidth={3} />
                             </div>
                             <div className="relative mx-1 w-px h-4 bg-black/10" />
                             <div className="relative px-3 py-1 font-black text-[9px] uppercase tracking-[0.2em] text-black">
                                {type}_BLOCK
                             </div>
                             <div className="relative mx-1 w-px h-4 bg-black/10" />
                             <button 
                                onClick={(e) => { e.stopPropagation(); removeElement(id); }}
                                className="relative p-2 text-black hover:bg-black/10 rounded transition-colors"
                             >
                                <Trash2 size={14} strokeWidth={3} />
                             </button>
                        </div>

                        {/* Corner Markers */}
                        <div className="absolute top-0 left-0 w-2 h-2 bg-[#00f2ff] -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-[#00f2ff] translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#00f2ff] -translate-x-1/2 translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00f2ff] translate-x-1/2 translate-y-1/2" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hover Indicator */}
            {!isSelected && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-dashed border-white/10 pointer-events-none transition-all z-[40]" />
            )}

            {/* Content Display */}
            <div className="relative w-full">
                {renderContent()}
            </div>
        </motion.div>
    );
};

export default CanvasElement;
