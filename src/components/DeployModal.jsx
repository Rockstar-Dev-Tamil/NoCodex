import React, { useState } from 'react';
import { X, Rocket, Check, ArrowRight, Loader2, Copy, Globe, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

const DeployModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [subdomain, setSubdomain] = useState('');

    if (!isOpen) return null;

    const handleDeploy = () => {
        setStep(2);
        setTimeout(() => {
            setStep(3);
            toast.success("Mission Broadcasted to Subsector!");
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#060608]/90 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="w-full max-w-[500px] bg-[#0f0f14] border border-[#1e1e2e] rounded-[32px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
                {/* Header Decoration */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/40 to-transparent" />
                
                <header className="px-10 py-10 flex justify-between items-start border-b border-[#1e1e2e]">
                    <div>
                        <div className="text-[10px] font-black text-[#00e5ff] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                             <Rocket size={12} /> BROADCAST TO THE MULTIVERSE
                        </div>
                        <h2 className="text-4xl font-[800] font-display text-white uppercase tracking-tight leading-none">LAUNCH MISSION</h2>
                    </div>
                    <button onClick={onClose} className="p-3 bg-[#1e1e2e] rounded-2xl text-[#52526e] hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </header>

                <div className="p-10">
                    {step === 1 && (
                        <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-[#52526e] uppercase tracking-widest pl-1">Target Sector Subdomain</label>
                                <div className="flex items-center bg-[#060608] border border-[#1e1e2e] rounded-2xl p-5 group focus-within:border-[#00e5ff]/40 transition-all">
                                    <input 
                                        autoFocus
                                        type="text" 
                                        placeholder="my-indie-project"
                                        value={subdomain}
                                        onChange={(e) => setSubdomain(e.target.value)}
                                        className="bg-transparent border-none outline-none text-xl font-[800] font-display text-white flex-1 placeholder:text-[#52526e]"
                                    />
                                    <span className="text-xl font-[800] font-display text-[#52526e] italic">.nocodex.earth</span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                 <div className="p-6 rounded-2xl border border-[#1e1e2e] bg-[#060608]/40">
                                      <div className="text-[#52526e] mb-2"><Globe size={16} /></div>
                                      <h4 className="text-[10px] font-black text-white uppercase mb-2">Global CDN</h4>
                                      <p className="text-[9px] text-[#52526e] leading-relaxed">Broadcast to 100+ points of presence instantly.</p>
                                 </div>
                                 <div className="p-6 rounded-2xl border border-[#1e1e2e] bg-[#060608]/40">
                                      <div className="text-[#52526e] mb-2"><Terminal size={16} /></div>
                                      <h4 className="text-[10px] font-black text-white uppercase mb-2">SSL Shielded</h4>
                                      <p className="text-[9px] text-[#52526e] leading-relaxed">Automatic encryption for your mission data.</p>
                                 </div>
                            </div>

                            <button 
                                onClick={handleDeploy}
                                className="w-full py-6 bg-[#00e5ff] text-[#060608] font-black text-xs uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(0,229,255,0.2)] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3"
                            >
                                START BROADCAST <ArrowRight size={16} />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="py-20 flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
                            <div className="relative mb-12">
                                <div className="absolute inset-0 bg-[#00e5ff]/20 filter blur-3xl animate-pulse" />
                                <div className="p-10 rounded-full border border-[#00e5ff]/40 bg-[#060608]">
                                     <Loader2 size={60} className="text-[#00e5ff] animate-spin" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-[800] font-display text-white uppercase tracking-tight mb-4">UPLOADING FREQUENCIES...</h3>
                            <p className="text-[#52526e] text-sm font-medium italic">Encrypting mission data and broadcasting to our global sectors.</p>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in slide-in-from-top-6 duration-700">
                            <div className="py-12 bg-[#00e5ff]/10 rounded-[32px] border border-[#00e5ff]/40 flex flex-col items-center text-center mb-10 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(0,229,255,0.1)_0%,transparent_70%)] pointer-events-none" />
                                <div className="w-20 h-20 rounded-full bg-[#00e5ff] flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(0,229,255,0.4)]">
                                     <Check size={40} className="text-[#060608]" />
                                </div>
                                <h3 className="text-3xl font-[800] font-display text-white uppercase tracking-tight mb-2">MISSION LIVE</h3>
                                <p className="text-[#52526e] text-sm font-bold uppercase tracking-widest">{subdomain || 'voyager'}.nocodex.earth</p>
                            </div>
                            
                            <div className="flex gap-4">
                                <button className="flex-1 py-5 bg-[#1e1e2e] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#2e2e3e] transition-all flex items-center justify-center gap-2">
                                    <Copy size={12} /> COPY FREQUENCY
                                </button>
                                <button onClick={onClose} className="flex-1 py-5 border border-[#1e1e2e] text-[#52526e] font-black text-[10px] uppercase tracking-widest rounded-2xl hover:text-white transition-all">
                                    RETURN TO CONSOLE
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeployModal;
