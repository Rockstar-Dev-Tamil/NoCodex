import React from 'react';
import { X, Copy, Terminal, Check, Download, Activity, FileCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCanvasStore from '../store/useCanvasStore';
import toast from 'react-hot-toast';

const ExportModal = ({ isOpen, onClose }) => {
    const { elements, projectName } = useCanvasStore();

    if (!isOpen) return null;

    const generateHTML = () => {
        let html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${projectName || 'NoCodeX Project'}</title>\n    <script src="https://cdn.tailwindcss.com"></script>\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">\n    <style>\n        body { font-family: 'Inter', sans-serif; background: #030303; color: white; }\n        .uppercase-tracking { text-transform: uppercase; letter-spacing: 0.2em; }\n    </style>\n</head>\n<body>\n    <main class="w-full flex flex-col">\n`;

        elements.forEach(el => {
            const { type, content, props = {} } = el;
            const style = `background-color: ${props.background || 'transparent'}; color: ${props.color || 'inherit'}; padding: ${props.padding || '0'}; font-size: ${props.fontSize || 'inherit'}; border-radius: ${props.borderRadius || '0'};`;
            
            html += `        <section class="w-full" style="${style}">\n`;
            if (type === 'Heading') html += `            <h2 class="font-black uppercase tracking-tight text-5xl mb-4">${content.text}</h2>\n`;
            else if (type === 'Text') html += `            <p class="text-lg opacity-60 leading-relaxed uppercase-tracking font-bold">${content.text}</p>\n`;
            else if (type === 'Button') html += `            <button class="bg-[#00f2ff] text-black font-black uppercase tracking-[0.3em] px-10 py-4 rounded-md">${content.text}</button>\n`;
            else if (type === 'Hero') html += `            <div class="max-w-5xl mx-auto py-20 text-center"><h1 class="text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.85]">${content.title}</h1><p class="text-xl opacity-40 uppercase tracking-[0.4em] mb-12 font-bold">${content.subtitle}</p><button class="bg-[#00f2ff] text-black px-12 py-5 font-black uppercase tracking-[0.3em] rounded-md">Initialize Session</button></div>\n`;
            else if (type === 'Divider') html += `            <div class="w-full h-px bg-white/10 my-10"></div>\n`;
            html += `        </section>\n`;
        });

        html += `    </main>\n</body>\n</html>`;
        return html;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateHTML());
        toast.success("Code successfully copied to clipboard system.");
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="w-full max-w-3xl h-[85vh] flex flex-col bg-[#060608] border border-white/5 rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative z-10"
                >
                    {/* Top Bar Decoration */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f2ff]/40 to-transparent" />
                    
                    <header className="px-10 py-8 flex justify-between items-center border-b border-white/5 bg-white/[0.01]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#00f2ff]/10 text-[#00f2ff] rounded-2xl border border-[#00f2ff]/20">
                                 <Terminal size={20} strokeWidth={3} />
                            </div>
                            <div>
                                 <h2 className="text-xl font-black text-white uppercase tracking-widest">EXPORT_RAW_SOURCE</h2>
                                 <div className="flex items-center gap-2 mt-1">
                                     <Activity size={10} className="text-[#00f2ff] animate-pulse" />
                                     <span className="text-[8px] font-black text-[#64748b] uppercase tracking-[0.3em]">ENCODING_PROTOCOL: UTF-8 // NOCODEX_V1.0.4</span>
                                 </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl text-[#64748b] hover:text-white transition-all">
                            <X size={20} />
                        </button>
                    </header>

                    <div className="flex-1 p-8 flex flex-col overflow-hidden">
                        <div className="flex-1 rounded-2xl border border-white/5 bg-black p-6 overflow-hidden relative group">
                            {/* Code Badge */}
                            <div className="absolute top-4 left-6 flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-[#64748b] uppercase tracking-widest z-20">
                                <FileCode size={10} /> INDEX.HTML
                            </div>

                            <div className="absolute top-4 right-6 z-20">
                                 <button onClick={copyToClipboard} className="btn-outline px-4 py-2 text-[8px] font-black uppercase tracking-widest border-white/10 rounded-md bg-black/50 backdrop-blur-md">
                                     <Copy size={12} className="inline mr-2" /> COPY_SOURCE
                                 </button>
                            </div>
                            
                            <div className="h-full overflow-auto custom-scrollbar pt-12">
                                <pre className="text-[12px] font-mono text-[#64748b] leading-relaxed selection:bg-[#00f2ff] selection:text-black">
                                    {generateHTML().split('\n').map((line, i) => (
                                        <div key={i} className="flex group/line px-2 hover:bg-white/5 rounded">
                                            <span className="w-10 flex-shrink-0 text-white/10 select-none mr-4">{i + 1}</span>
                                            <span className="text-[#a5b4fc] group-hover/line:text-white transition-colors">{line}</span>
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <footer className="p-8 border-t border-white/5 flex gap-4 bg-white/[0.01]">
                        <button 
                            onClick={copyToClipboard}
                            className="btn-primary flex-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_10px_30px_rgba(0,242,255,0.15)]"
                        >
                            <Copy size={16} strokeWidth={3} /> INITIALIZE_COPY
                        </button>
                        <button className="flex-1 py-5 border border-white/5 text-[#64748b] font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white/5 hover:text-white transition-all">
                            <Download size={16} className="inline mr-2" /> DATA_PULL_.ZIP
                        </button>
                    </footer>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ExportModal;
