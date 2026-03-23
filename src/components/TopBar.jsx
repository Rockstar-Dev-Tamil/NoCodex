import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Undo2, Redo2, Eye, Download, Rocket, ChevronLeft, 
    Monitor, Tablet, Smartphone, Save, Check
} from 'lucide-react';
import useCanvasStore from '../store/useCanvasStore';

const TopBar = ({ onExport, onDeploy }) => {
    const navigate = useNavigate();
    const { 
        projectName, setProjectName, undo, redo, 
        viewport, setViewport, history, future 
    } = useCanvasStore();

    return (
        <header className="topbar-grid w-full h-[60px] bg-[#060608] border-b border-[#1e1e2e] flex items-center justify-between px-6 z-100">
            {/* Left: Branding & Back */}
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="p-2 hover:bg-[#1e1e2e] rounded-lg transition-all text-[#52526e] hover:text-white"
                >
                    <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="font-[800] font-display text-[0.9rem] text-white tracking-tight uppercase">
                        NoCodeX<span className="text-[#00e5ff]">.</span>
                    </div>
                    <div className="w-px h-4 bg-[#1e1e2e]" />
                    <input 
                        type="text" 
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="bg-transparent border-none outline-none text-[0.9rem] font-medium text-[#52526e] hover:text-white transition-all w-48 focus:text-white"
                    />
                </div>
            </div>

            {/* Center: Viewport Controls */}
            <div className="flex items-center bg-[#0f0f14] border border-[#1e1e2e] p-1 rounded-xl">
                <button 
                    onClick={() => setViewport('desktop')}
                    className={`p-2 rounded-lg transition-all ${viewport === 'desktop' ? 'bg-[#1e1e2e] text-[#00e5ff]' : 'text-[#52526e] hover:text-white'}`}
                >
                    <Monitor size={16} />
                </button>
                <button 
                    onClick={() => setViewport('tablet')}
                    className={`p-2 rounded-lg transition-all ${viewport === 'tablet' ? 'bg-[#1e1e2e] text-[#00e5ff]' : 'text-[#52526e] hover:text-white'}`}
                >
                    <Tablet size={16} />
                </button>
                <button 
                    onClick={() => setViewport('mobile')}
                    className={`p-2 rounded-lg transition-all ${viewport === 'mobile' ? 'bg-[#1e1e2e] text-[#00e5ff]' : 'text-[#52526e] hover:text-white'}`}
                >
                    <Smartphone size={16} />
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-[#0f0f14] border border-[#1e1e2e] p-1 rounded-xl mr-2">
                    <button 
                        onClick={undo}
                        disabled={history.length === 0}
                        className={`p-2 rounded-lg transition-all ${history.length > 0 ? 'text-white hover:bg-[#1e1e2e]' : 'text-[#52526e] opacity-30'}`}
                    >
                        <Undo2 size={16} />
                    </button>
                    <button 
                        onClick={redo}
                        disabled={future.length === 0}
                        className={`p-2 rounded-lg transition-all ${future.length > 0 ? 'text-white hover:bg-[#1e1e2e]' : 'text-[#52526e] opacity-30'}`}
                    >
                        <Redo2 size={16} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => navigate('/preview')}
                        className="p-3 bg-transparent border border-[#1e1e2e] rounded-xl text-white hover:border-[#52526e] transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider"
                    >
                        <Eye size={14} /> Preview
                    </button>
                    <button 
                        onClick={onExport}
                        className="p-3 bg-transparent border border-[#1e1e2e] rounded-xl text-white hover:border-[#52526e] transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider"
                    >
                        <Download size={14} /> Export
                    </button>
                    <button 
                        onClick={onDeploy}
                        className="px-6 py-3 bg-[#00e5ff] rounded-xl text-[#060608] font-black text-[10px] uppercase tracking-widest hover:translate-y-[-1px] transition-all flex items-center gap-2"
                    >
                        <Rocket size={14} /> Publish
                    </button>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
