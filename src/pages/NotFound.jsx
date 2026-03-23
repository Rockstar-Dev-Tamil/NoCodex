import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-8 z-10 overflow-hidden bg-[#030303]">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f2ff]/5 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '0.7s' }} />

            <div className="relative z-10 flex flex-col items-center">
                <div className="mb-8 p-6 rounded-full bg-red-500/5 ring-8 ring-red-500/5 animate-twinkle">
                    <Rocket className="w-16 h-16 text-red-500 transform -rotate-45" />
                </div>
                
                <h1 className="text-[12rem] md:text-[20rem] font-black text-white uppercase tracking-tighter leading-none mb-4 opacity-5 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] select-none">
                    404
                </h1>
                
                <div className="absolute top-[45%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-full">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest leading-tight">
                        LOST IN <span className="text-[#00f2ff]">SPACE</span>, ASTRONAUT
                    </h2>
                    <p className="text-[#64748b] text-lg md:text-2xl max-w-xl mx-auto font-medium leading-relaxed mt-4 drop-shadow-lg">
                        You've reached the edge of the known universe. This coordinate does not exist in our mission log.
                    </p>
                </div>

                <div className="mt-32 flex flex-col sm:flex-row gap-6">
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn-cyan px-12 py-5 text-sm flex items-center gap-3"
                    >
                         <ArrowLeft size={18} /> BACK TO BASE STATION
                    </button>
                    <button 
                         onClick={() => navigate('/dashboard')} 
                         className="btn-ghost px-12 py-5 text-sm flex items-center gap-3"
                    >
                         REPORT ANOMALY <AlertTriangle size={18} />
                    </button>
                </div>

                {/* Floating Astronaut Emoji */}
                <div className="mt-20 text-8xl animate-float">
                     👨‍🚀
                </div>
            </div>

            {/* Corner Decor */}
            <div className="absolute bottom-12 right-12 opacity-10 flex items-center gap-4 text-white">
                <div className="w-4 h-4 rounded-full border border-white/20 animate-spin transition-all" />
                <span className="text-[8px] font-black uppercase tracking-[0.5em]">Sector 404.0.01 / NoCodeX Engine</span>
            </div>
        </div>
    );
};

export default NotFound;

