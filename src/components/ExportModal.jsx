import React from 'react';
import { X, Code, Copy, Download, Check, Terminal, FileCode, Layers } from 'lucide-react';
import useCanvasStore from '../store/useCanvasStore';
import toast from 'react-hot-toast';

const ExportModal = ({ isOpen, onClose }) => {
    const { elements } = useCanvasStore();

    if (!isOpen) return null;

    const generateHTML = () => {
        let html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>NoCodeX Mission</title>\n    <script src="https://cdn.tailwindcss.com"></script>\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Syne:wght@800&display=swap" rel="stylesheet">\n    <style>\n        body { font-family: 'Inter', sans-serif; background: #060608; color: #f1f1f3; }\n        .font-display { font-family: 'Syne', sans-serif; }\n    </style>\n</head>\n<body>\n    <main class="w-full flex flex-col">\n`;

        elements.forEach(el => {
            const { type, content, props } = el;
            const style = `background-color: ${props.background}; color: ${props.color}; padding: ${props.padding}; font-size: ${props.fontSize}; border-radius: ${props.borderRadius};`;
            
            html += `        <section class="w-full" style="${style}">\n`;
            if (type === 'Heading') html += `            <h2 class="font-display font-[800] uppercase text-4xl">${content.text}</h2>\n`;
            else if (type === 'Text') html += `            <p class="leading-relaxed opacity-70">${content.text}</p>\n`;
            else if (type === 'Button') html += `            <button class="bg-[#00e5ff] text-[#060608] font-black uppercase tracking-widest px-8 py-3 rounded-sm">${content.text}</button>\n`;
            else if (type === 'Hero') html += `            <div class="max-w-4xl mx-auto py-12"><h1 class="font-display font-[800] text-7xl leading-none uppercase mb-6">${content.title}</h1><p class="text-xl opacity-60 mb-8">${content.subtitle}</p><button class="bg-[#00e5ff] text-[#060608] px-10 py-4 font-black uppercase">Start Mission</button></div>\n`;
            html += `        </section>\n`;
        });

        html += `    </main>\n</body>\n</html>`;
        return html;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateHTML());
        toast.success("Sector code copied to clipboard.");
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#060608]/90 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="w-full max-w-[700px] h-[80vh] flex flex-col bg-[#0f0f14] border border-[#1e1e2e] rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
                {/* Header Decoration */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7c3aed]/40 to-transparent" />
                
                <header className="px-10 py-8 flex justify-between items-center border-b border-[#1e1e2e]">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#7c3aed]/10 text-[#7c3aed] rounded-2xl">
                             <Terminal size={18} />
                        </div>
                        <div>
                             <h2 className="text-2xl font-[800] font-display text-white uppercase tracking-tight">EXPORT RAW SOURCE</h2>
                             <p className="text-[10px] font-bold text-[#52526e] uppercase tracking-widest mt-1">PRO-GRADE HTML & TAILWIND STACK</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 bg-[#1e1e2e] rounded-2xl text-[#52526e] hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </header>

                <div className="flex-1 p-10 flex flex-col gap-8 overflow-hidden">
                    <div className="flex-1 rounded-3xl border border-[#1e1e2e] bg-[#060608] p-6 overflow-hidden relative group">
                        <div className="absolute top-4 right-4 z-50 transition-all opacity-0 group-hover:opacity-100 flex gap-2">
                             <button onClick={copyToClipboard} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all">
                                 <Copy size={12} /> COPY
                             </button>
                        </div>
                        <pre className="text-[11px] font-mono text-[#52526e] h-full overflow-auto leading-relaxed custom-scrollbar selection:bg-[#00e5ff]/30 selection:text-white">
                            {generateHTML()}
                        </pre>
                    </div>
                </div>

                <footer className="p-10 border-t border-[#1e1e2e] flex gap-4 items-center">
                    <button 
                        onClick={copyToClipboard}
                        className="flex-1 py-6 bg-[#00e5ff] text-[#060608] font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-[0_0_40px_rgba(0,229,255,0.1)]"
                    >
                        <Copy size={14} /> COPY SOURCE CODE
                    </button>
                    <button className="flex-1 py-6 border border-[#1e1e2e] text-[#52526e] font-black text-xs uppercase tracking-widest rounded-2xl hover:text-white transition-all">
                        DOWNLOAD AS .ZIP
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ExportModal;
