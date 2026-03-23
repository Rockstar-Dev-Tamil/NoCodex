import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCanvasStore from '../store/useCanvasStore';
import { Settings, MousePointer2, Trash2, Sliders, Type, Layout, Palette, AlignCenter, Bold, Layers, ChevronDown, Activity } from 'lucide-react';

const PropertiesPanel = () => {
    const { elements, selectedId, updateElement, updateElementContent, removeElement } = useCanvasStore();
    const selectedElement = elements.find((el) => el.id === selectedId);

    if (!selectedElement) {
        return (
            <aside className="w-full h-full bg-[#030303] border-l border-white/5 flex flex-col items-center justify-center p-12 text-center glass">
                <div className="relative group">
                    <div className="absolute inset-0 bg-[#00f2ff]/5 filter blur-3xl group-hover:bg-[#00f2ff]/10 transition-all" />
                    <MousePointer2 size={48} className="text-[#64748b] opacity-20 relative z-10" />
                </div>
                <div className="mt-8">
                     <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2 opacity-50">NO_TARGET_ACQUIRED</h4>
                     <p className="text-[9px] uppercase font-bold tracking-widest text-[#64748b] max-w-[180px] leading-relaxed">Select a module from the primary viewport to initialize configuration.</p>
                </div>
            </aside>
        );
    }

    const { type, content, props } = selectedElement;

    const handlePropChange = (key, value) => {
        updateElement(selectedId, { [key]: value });
    };

    const handleContentChange = (key, value) => {
        updateElementContent(selectedId, { [key]: value });
    };

    return (
        <aside className="w-full h-full bg-[#030303] border-l border-white/5 flex flex-col z-[100] overflow-hidden glass">
            <header className="px-6 py-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[#00f2ff]/10 text-[#00f2ff] flex items-center justify-center border border-[#00f2ff]/20">
                        <Activity size={16} />
                    </div>
                    <div>
                         <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none mb-1">MODULE_PROPS</h3>
                         <p className="text-[9px] font-bold text-[#00f2ff] uppercase tracking-widest opacity-80">{type}</p>
                    </div>
                </div>
                <button 
                    onClick={() => removeElement(selectedId)}
                    className="p-2 rounded-md text-[#64748b] hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                >
                    <Trash2 size={16} />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={selectedId}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 space-y-8 pb-12"
                    >
                        {/* Section: Visuals */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[9px] font-black text-[#64748b] uppercase tracking-[0.3em] opacity-50">
                                <Palette size={12} /> VISUAL_BUFFERS
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <ColorInput 
                                    label="SURFACE" 
                                    value={props.background} 
                                    onChange={(val) => handlePropChange('background', val)} 
                                />
                                <ColorInput 
                                    label="TEXT" 
                                    value={props.color} 
                                    onChange={(val) => handlePropChange('color', val)} 
                                />
                            </div>
                        </div>

                        <div className="h-px bg-white/5" />

                        {/* Section: Magnitude */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-[9px] font-black text-[#64748b] uppercase tracking-[0.3em] opacity-50">
                                <Sliders size={12} /> MAGNITUDE_SCALES
                            </div>
                            
                            <RangeInput 
                                label="FONT_SIZE" 
                                value={parseInt(props.fontSize)} 
                                unit="PX"
                                min={12} max={120} 
                                onChange={(val) => handlePropChange('fontSize', `${val}px`)} 
                            />

                            <RangeInput 
                                label="INTERNAL_PADDING" 
                                value={parseInt(props.padding)} 
                                unit="PX"
                                min={0} max={200} 
                                onChange={(val) => handlePropChange('padding', `${val}px`)} 
                            />

                            <RangeInput 
                                label="BORDER_RADIUS" 
                                value={parseInt(props.borderRadius)} 
                                unit="PX"
                                min={0} max={80} 
                                onChange={(val) => handlePropChange('borderRadius', `${val}px`)} 
                            />
                        </div>

                        <div className="h-px bg-white/5" />

                        {/* Section: Content */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[9px] font-black text-[#64748b] uppercase tracking-[0.3em] opacity-50">
                                <Type size={12} /> DATA_STRINGS
                            </div>
                            
                            <div className="space-y-4">
                                {Object.keys(content).map((key) => (
                                    <div key={key} className="space-y-2">
                                        <label className="text-[9px] font-bold text-[#64748b] uppercase tracking-widest pl-1">{key}</label>
                                        <input 
                                            type="text" 
                                            value={content[key]}
                                            onChange={(e) => handleContentChange(key, e.target.value)}
                                            className="w-full bg-white/5 border border-white/5 rounded-md px-4 py-3 text-[10px] font-bold text-white focus:border-[#00f2ff]/30 outline-none transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <footer className="p-6 border-t border-white/5 bg-black/40">
                 <div className="text-[8px] font-black text-[#64748b] uppercase tracking-[0.3em] leading-relaxed text-center opacity-30">
                    REALTIME_STREAM_ACTIVE // SYNC_SUCCESS
                 </div>
            </footer>
        </aside>
    );
};

const ColorInput = ({ label, value, onChange }) => (
    <div className="space-y-2">
        <label className="text-[9px] font-black text-[#64748b] uppercase tracking-widest pl-1">{label}</label>
        <div className="relative group">
            <input 
                type="color" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-10 bg-white/5 border border-white/5 rounded-md flex items-center px-3 gap-3 group-hover:bg-white/[0.07] transition-all">
                <div className="w-4 h-4 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: value }} />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">{value}</span>
            </div>
        </div>
    </div>
);

const RangeInput = ({ label, value, unit, min, max, onChange }) => (
    <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
            <label className="text-[9px] font-black text-[#64748b] uppercase tracking-widest">{label}</label>
            <span className="text-[9px] font-mono text-[#00f2ff] bg-[#00f2ff]/10 px-1.5 py-0.5 rounded border border-[#00f2ff]/20">{value}{unit}</span>
        </div>
        <div className="relative flex items-center">
            <input 
                type="range" 
                min={min} max={max}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#00f2ff]"
            />
        </div>
    </div>
);

export default PropertiesPanel;
