import React from 'react';
import useCanvasStore from '../store/useCanvasStore';
import { Settings, MousePointer2, Trash2, Sliders, Type, Layout, Palette, AlignCenter, Bold, Layers } from 'lucide-react';

const PropertiesPanel = () => {
    const { elements, selectedId, updateElement, updateElementContent, removeElement } = useCanvasStore();
    const selectedElement = elements.find((el) => el.id === selectedId);

    if (!selectedElement) {
        return (
            <aside className="right-panel-grid w-full h-full bg-[#060608] border-l border-[#1e1e2e] flex flex-col items-center justify-center p-12 text-center text-[#52526e] gap-10">
                <div className="relative group p-10">
                    <div className="absolute inset-0 bg-[#00e5ff]/5 filter blur-3xl group-hover:bg-[#00e5ff]/10" />
                    <MousePointer2 size={64} className="opacity-10 group-hover:opacity-20 transition-all" />
                </div>
                <div>
                     <h4 className="text-[14px] font-[800] font-display text-white uppercase tracking-tight mb-2">No Selector Active</h4>
                     <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#52526e]">Click any component in the console to edit its mission props.</p>
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
        <aside className="right-panel-grid w-full h-full bg-[#060608] border-l border-[#1e1e2e] flex flex-col z-100 overflow-y-auto overflow-x-hidden">
            <header className="px-6 py-6 border-b border-[#1e1e2e] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff]">
                        <Settings size={14} />
                    </div>
                    <div>
                         <h3 className="text-[11px] font-[800] font-display text-white uppercase tracking-widest leading-none mb-1">PROPS CONSOLE</h3>
                         <p className="text-[9px] font-bold text-[#52526e] uppercase tracking-widest">{type} MODULE</p>
                    </div>
                </div>
                <button 
                    onClick={() => removeElement(selectedId)}
                    className="p-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <Trash2 size={14} />
                </button>
            </header>

            <div className="flex-1 px-8 py-10 flex flex-col gap-10 custom-scrollbar">
                {/* Section 1: Visual styling */}
                <div className="space-y-6">
                    <label className="text-[10px] font-black font-display text-[#52526e] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Palette size={12} className="text-[#00e5ff]" /> COMPONENT VISUALS
                    </label>
                    <div className="space-y-6">
                        {/* Background Color Picker */}
                        <div className="space-y-2">
                             <div className="flex justify-between items-center mb-1">
                                <label className="text-[10px] font-bold text-[#52526e] uppercase tracking-widest">Surface Fill</label>
                                <span className="text-[9px] font-mono text-[#52526e]">{props.background}</span>
                             </div>
                            <div className="flex items-center gap-2 bg-[#0f0f14] p-2 rounded-xl border border-[#1e1e2e]">
                                <input 
                                    type="color" 
                                    value={props.background}
                                    onChange={(e) => handlePropChange('background', e.target.value)}
                                    className="w-10 h-8 bg-transparent border-none outline-none cursor-pointer rounded-lg"
                                />
                                <div className="flex-1 text-[10px] font-mono text-white/40 overflow-hidden">{props.background}</div>
                            </div>
                        </div>

                        {/* Text Color Picker */}
                        <div className="space-y-2">
                             <div className="flex justify-between items-center mb-1">
                                <label className="text-[10px] font-bold text-[#52526e] uppercase tracking-widest">Text Fill</label>
                                <span className="text-[9px] font-mono text-[#52526e]">{props.color}</span>
                             </div>
                             <div className="flex items-center gap-2 bg-[#0f0f14] p-2 rounded-xl border border-[#1e1e2e]">
                                <input 
                                    type="color" 
                                    value={props.color}
                                    onChange={(e) => handlePropChange('color', e.target.value)}
                                    className="w-10 h-8 bg-transparent border-none outline-none cursor-pointer rounded-lg"
                                />
                                <div className="flex-1 text-[10px] font-mono text-white/40 overflow-hidden">{props.color}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-[#1e1e2e]" />

                {/* Section 2: Typography & Sizing */}
                <div className="space-y-8">
                    <label className="text-[10px] font-black font-display text-[#52526e] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Sliders size={12} className="text-[#7c3aed]" /> MAGNITUDE & SCALE
                    </label>
                    <div className="space-y-8">
                        {/* Font Size Swatch */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-[#52526e] uppercase tracking-widest">Font Magnitude</label>
                                <span className="px-2 py-0.5 bg-[#1e1e2e] rounded text-[10px] font-mono text-white">{props.fontSize}</span>
                            </div>
                            <input 
                                type="range" min="12" max="120" step="2"
                                value={parseInt(props.fontSize)}
                                onChange={(e) => handlePropChange('fontSize', `${e.target.value}px`)}
                                className="w-full accent-[#00e5ff] opacity-60 hover:opacity-100 transition-opacity"
                            />
                        </div>

                        {/* Padding Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-[#52526e] uppercase tracking-widest">Internal Sector Padding</label>
                                <span className="px-2 py-0.5 bg-[#1e1e2e] rounded text-[10px] font-mono text-white">{props.padding}</span>
                            </div>
                            <input 
                                type="range" min="0" max="200" step="4"
                                value={parseInt(props.padding)}
                                onChange={(e) => handlePropChange('padding', `${e.target.value}px`)}
                                className="w-full accent-[#00e5ff] opacity-60 hover:opacity-100 transition-opacity"
                            />
                        </div>

                        {/* Border Radius */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-[#52526e] uppercase tracking-widest">Module Curvature</label>
                                <span className="px-2 py-0.5 bg-[#1e1e2e] rounded text-[10px] font-mono text-white">{props.borderRadius}</span>
                            </div>
                            <input 
                                type="range" min="0" max="80" step="2"
                                value={parseInt(props.borderRadius)}
                                onChange={(e) => handlePropChange('borderRadius', `${e.target.value}px`)}
                                className="w-full accent-[#00e5ff] opacity-60 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-[#1e1e2e]" />

                {/* Section 3: Data Integrity */}
                <div className="space-y-6">
                    <label className="text-[10px] font-black font-display text-[#52526e] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Bold size={12} className="text-[#00e5ff]" /> SOURCE VALUES
                    </label>
                    <div className="space-y-4">
                        {Object.keys(content).map((key) => (
                            <div key={key} className="space-y-2">
                                <label className="text-[10px] font-bold text-[#52526e] uppercase mb-1">{key}</label>
                                <div className="bg-[#0f0f14] border border-[#1e1e2e] rounded-xl px-4 py-1 flex items-center">
                                     <input 
                                        type="text" 
                                        value={content[key]}
                                        onChange={(e) => handleContentChange(key, e.target.value)}
                                        className="w-full bg-transparent border-none outline-none py-3 text-[11px] text-white focus:text-[#00e5ff] transition-all"
                                     />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <footer className="p-8 border-t border-[#1e1e2e] bg-[#0f0f14]/50">
                 <div className="text-[8px] font-bold text-[#52526e] uppercase tracking-[0.3em] leading-relaxed text-center opacity-40">
                    Prop mutations are broadcasted in real-time to the active sector console.
                 </div>
            </footer>
        </aside>
    );
};

export default PropertiesPanel;
