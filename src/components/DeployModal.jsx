import React, { useState } from 'react';
import { X, Rocket, Check, ArrowRight, Loader2, Copy, Globe, Terminal, Activity, Zap, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const DeployModal = ({ isOpen, onClose, projectId }) => {
    const [step, setStep] = useState(1);
    const [subdomain, setSubdomain] = useState('');

    if (!isOpen) return null;

    const handleDeploy = () => {
        setStep(2);
        setTimeout(() => {
            setStep(3);
            toast.success("Project broadcasted to global sectors.");
        }, 3000);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    className="w-full max-w-[500px] bg-[#060608] border border-white/5 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,242,255,0.15)] relative z-10"
                >
                    {/* Top Bar Decoration */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00f2ff]/30 to-transparent" />
                    
                    <header className="px-10 py-10 flex justify-between items-start border-b border-white/5 relative bg-white/[0.01]">
                        <div className="absolute top-4 left-10 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-ping" />
                             <span className="text-[8px] font-black text-[#64748b] uppercase tracking-[0.4em]">DEPLOYMENT_READY</span>
                        </div>
                        
                        <div className="mt-4">
                            <div className="text-[10px] font-black text-[#00f2ff] uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                                 <Rocket size={14} strokeWidth={3} /> INITIALIZE_LAUNCH
                            </div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">LAUNCH_CONSOLE</h2>
                        </div>
                        <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl text-[#64748b] hover:text-white transition-all mt-4">
                            <X size={20} />
                        </button>
                    </header>

                    <div className="p-10">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div 
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <div className="space-y-4">
                                        <label className="text-[9px] font-black text-[#64748b] uppercase tracking-[0.3em] pl-1">TARGET_SECTOR_SUBDOMAIN</label>
                                        <div className="flex items-center bg-black border border-white/5 rounded-2xl p-6 group focus-within:border-[#00f2ff]/30 transition-all shadow-inner">
                                            <input 
                                                autoFocus
                                                type="text" 
                                                placeholder="alpha-project"
                                                value={subdomain}
                                                onChange={(e) => setSubdomain(e.target.value)}
                                                className="bg-transparent border-none outline-none text-2xl font-black text-white flex-1 placeholder:text-[#334155] uppercase tracking-tighter"
                                            />
                                            <span className="text-xl font-black text-[#334155] lowercase">.nocodex.live</span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                         <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                                              <div className="text-[#00f2ff] mb-3"><Globe size={18} strokeWidth={3} /></div>
                                              <h4 className="text-[10px] font-black text-white uppercase mb-2 tracking-widest">GLOBAL_MESH</h4>
                                              <p className="text-[9px] text-[#64748b] leading-relaxed uppercase font-bold tracking-wider">Syncing with 128 edge nodes across the multiverse.</p>
                                         </div>
                                         <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                                              <div className="text-[#00f2ff] mb-3"><Cpu size={18} strokeWidth={3} /></div>
                                              <h4 className="text-[10px] font-black text-white uppercase mb-2 tracking-widest">SSL_SHIELD</h4>
                                              <p className="text-[9px] text-[#64748b] leading-relaxed uppercase font-bold tracking-wider">256-bit encryption layer automatically established.</p>
                                         </div>
                                    </div>

                                    <button 
                                        onClick={handleDeploy}
                                        className="btn-primary w-full py-6 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl shadow-[0_15px_40px_rgba(0,242,255,0.15)] flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                                    >
                                        INITIATE_BROADCAST <ArrowRight size={18} strokeWidth={3} />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div 
                                    key="step2"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="py-16 flex flex-col items-center text-center"
                                >
                                    <div className="relative mb-14">
                                        <div className="absolute inset-0 bg-[#00f2ff]/20 filter blur-[80px] animate-pulse rounded-full" />
                                        <div className="p-12 rounded-full border border-white/5 bg-black relative z-10 overflow-hidden">
                                             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#00f2ff]/10 to-transparent" />
                                             <Loader2 size={80} strokeWidth={1} className="text-[#00f2ff] animate-spin" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">UPLOADING_VOYAGER...</h3>
                                        <div className="flex items-center justify-center gap-3">
                                            <Activity size={12} className="text-[#00f2ff] animate-pulse" />
                                            <p className="text-[10px] text-[#64748b] font-black uppercase tracking-[0.3em]">ENCRYPTING_MISSION_DATA_FREQUENCIES</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div 
                                    key="step3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="py-14 bg-white/[0.02] rounded-[40px] border border-[#00f2ff]/20 flex flex-col items-center text-center relative overflow-hidden group/success">
                                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.05)_0%,transparent_70%)] pointer-events-none" />
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                            className="w-24 h-24 rounded-full bg-[#00f2ff] flex items-center justify-center mb-8 shadow-[0_0_80px_rgba(0,242,255,0.3)] border-4 border-black group-hover/success:scale-110 transition-transform duration-500"
                                        >
                                             <Check size={48} strokeWidth={4} className="text-black" />
                                        </motion.div>
                                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-3 leading-none">MISSION_LIVE</h3>
                                        <div className="px-6 py-2 bg-black border border-white/10 rounded-full inline-flex items-center gap-2">
                                            <Globe size={12} className="text-[#00f2ff]" />
                                            <p className="text-[11px] text-[#00f2ff] font-black uppercase tracking-widest">LOCAL_MESH_ACTIVE</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <a href={`http://localhost:5000/p/${projectId}`} target="_blank" rel="noreferrer" className="flex-1 py-5 bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-[#00f2ff] font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#00f2ff]/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                            <Globe size={16} /> VISIT_SITE
                                        </a>
                                        <button onClick={onClose} className="flex-1 py-5 border border-white/10 text-[#64748b] font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:text-white hover:bg-white/5 transition-all text-center">
                                            RETURN_CONSOLE
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Technical Footer Decoration */}
                    <div className="h-4 bg-black/50 border-t border-white/5 flex items-center px-6 justify-between">
                         <div className="flex gap-2">
                             {[...Array(5)].map((_, i) => (
                                 <div key={i} className="w-1 h-px bg-[#00f2ff]/20" />
                             ))}
                         </div>
                         <span className="text-[6px] font-black text-[#334155] uppercase tracking-[0.5em]">MISSION_SYNC: COMPLETE</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DeployModal;
