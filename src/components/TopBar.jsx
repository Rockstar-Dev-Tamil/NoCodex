import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Undo2, Redo2, Eye, Download, Rocket, ChevronLeft, 
    Monitor, Tablet, Smartphone, Save, Check, Share2, Globe
} from 'lucide-react';
import useCanvasStore from '../store/useCanvasStore';

const TopBar = ({ onExport, onDeploy, projectId }) => {
    const navigate = useNavigate();
    const { 
        projectName, setProjectName, undo, redo, 
        viewport, setViewport, history, future 
    } = useCanvasStore();

    return (
        <header className="h-[70px] bg-[#030303] border-b border-white/5 flex items-center justify-between px-6 z-[110] glass sticky top-0">
            {/* Left: Branding & Back */}
            <div className="flex items-center gap-6">
                <motion.button 
                    whileHover={{ x: -2 }}
                    onClick={() => navigate('/dashboard')}
                    className="p-2 hover:bg-white/5 rounded-lg transition-all text-[#64748b] hover:text-white"
                >
                    <ChevronLeft size={20} />
                </motion.button>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#00f2ff] text-black flex items-center justify-center font-black rounded-sm text-[10px]">N</div>
                        <span className="text-xs font-black tracking-tighter uppercase hidden sm:block">NOCODEX</span>
                    </div>
                    <div className="w-px h-6 bg-white/5" />
                    <input 
                        type="text" 
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-bold text-[#64748b] hover:text-white focus:text-white transition-all w-40 sm:w-64 uppercase tracking-wider"
                        placeholder="UNTITLED_PROJECT"
                    />
                </div>
            </div>

            {/* Center: Viewport Controls */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center bg-white/5 p-1 rounded-lg border border-white/5 shadow-2xl">
                <ViewportButton 
                    active={viewport === 'desktop'} 
                    onClick={() => setViewport('desktop')} 
                    icon={<Monitor size={16} />} 
                    label="DESKTOP"
                />
                <ViewportButton 
                    active={viewport === 'tablet'} 
                    onClick={() => setViewport('tablet')} 
                    icon={<Tablet size={16} />} 
                    label="TABLET"
                />
                <ViewportButton 
                    active={viewport === 'mobile'} 
                    onClick={() => setViewport('mobile')} 
                    icon={<Smartphone size={16} />} 
                    label="MOBILE"
                />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 mr-2">
                    <ActionButton 
                        onClick={undo}
                        disabled={history.length === 0}
                        icon={<Undo2 size={16} />}
                        hint="UNDO (CTRL+Z)"
                    />
                    <ActionButton 
                        onClick={redo}
                        disabled={future.length === 0}
                        icon={<Redo2 size={16} />}
                        hint="REDO (CTRL+Y)"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => navigate(`/preview/${projectId}`)}
                        className="btn-outline py-2.5 px-4 text-[10px] font-black tracking-widest uppercase flex items-center gap-2 border-white/5 rounded-md hover:bg-white/5"
                    >
                        <Eye size={14} strokeWidth={3} /> <span className="hidden lg:inline">PREVIEW</span>
                    </button>
                    <button 
                        onClick={onExport}
                        className="btn-outline py-2.5 px-4 text-[10px] font-black tracking-widest uppercase flex items-center gap-2 border-white/5 rounded-md hover:bg-white/5"
                    >
                        <Download size={14} strokeWidth={3} /> <span className="hidden lg:inline">EXPORT</span>
                    </button>
                    <button 
                        onClick={onDeploy}
                        className="btn-primary py-2.5 px-6 text-[10px] font-black tracking-widest uppercase flex items-center gap-2 rounded-md shadow-[0_0_20px_rgba(0,242,255,0.1)] hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]"
                    >
                        <Globe size={14} strokeWidth={3} /> PUBLISH
                    </button>
                </div>
            </div>
        </header>
    );
};

const ViewportButton = ({ active, onClick, icon, label }) => (
    <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative px-4 py-2 rounded-md transition-all flex items-center gap-2 text-[10px] font-black tracking-widest ${active ? 'bg-white/10 text-[#00f2ff]' : 'text-[#64748b] hover:text-white hover:bg-white/[0.02]'}`}
    >
        {icon}
        <span className="hidden xl:inline">{label}</span>
        {active && (
            <motion.div 
                layoutId="activeViewport"
                className="absolute inset-0 bg-white/5 rounded-md -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
        )}
    </motion.button>
);

const ActionButton = ({ onClick, disabled, icon, hint }) => (
    <motion.button 
        whileTap={!disabled ? { scale: 0.9 } : {}}
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded-md transition-all ${!disabled ? 'text-[#64748b] hover:text-white hover:bg-white/5' : 'text-white/10 cursor-not-allowed'}`}
        title={hint}
    >
        {icon}
    </motion.button>
);

export default TopBar;
