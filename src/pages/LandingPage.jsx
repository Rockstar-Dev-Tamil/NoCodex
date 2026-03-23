import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MousePointer2, Zap, Rocket, ArrowRight, Github, Code, Globe, Terminal, MessageSquare, ChevronRight, Layers, Layout, MousePointerClick } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="relative w-full min-h-screen bg-[#030303] text-[#f8fafc] overflow-x-hidden selection:bg-[#00f2ff]/30">
            {/* Background elements */}
            <div className="noise" />
            <div className="fixed inset-0 bg-grid pointer-events-none opacity-[0.03]" />
            <motion.div 
                className="fixed w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none opacity-[0.08]"
                style={{ 
                    x: useTransform(smoothMouseX, v => v - 300),
                    y: useTransform(smoothMouseY, v => v - 300),
                    background: 'radial-gradient(circle, var(--cyan) 0%, transparent 70%)'
                }}
            />

            {/* Navbar */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="sticky top-0 z-[100] w-full px-6 py-4 flex justify-between items-center glass border-x-0 border-t-0"
            >
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-black rounded-[4px] group-hover:bg-[#00f2ff] transition-colors">N</div>
                    <span className="text-xl font-black tracking-tighter">NOCODEX</span>
                </div>
                
                <div className="hidden md:flex gap-10 text-[0.85rem] font-medium text-[#94a3b8]">
                    {['Features', 'Pricing', 'Docs', 'Community'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00f2ff] transition-colors uppercase tracking-widest">{item}</a>
                    ))}
                </div>

                <div className="flex gap-4 items-center">
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="btn-primary py-2 px-6 rounded-none text-xs"
                    >
                        LAUNCH APP
                    </button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative px-6 pt-32 pb-48 max-w-7xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold tracking-[0.2em] mb-12 uppercase">
                        <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse" />
                        BUILDING THE FUTURE OF WEB
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="hero-title mb-8">
                        BUILD SITES.<br />
                        NOT <span className="opacity-20 italic">EXCUSES.</span><br />
                        <span className="text-[#00f2ff] drop-shadow-[0_0_15px_rgba(0,242,255,0.3)]">NOW.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-12 font-medium">
                        The web builder for those who value speed over bloated tools. 
                        Engineered for the elite, designed for everyone.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button 
                            onClick={() => navigate('/dashboard')} 
                            className="btn-primary py-5 px-10 text-lg group"
                        >
                            GET STARTED <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="btn-outline py-5 px-10 text-lg border-white/10 hover:border-white/40">
                            VIEW MODULES
                        </button>
                    </motion.div>
                </motion.div>

                {/* Hero Visualization */}
                <motion.div 
                    style={{ y: y1 }}
                    className="mt-32 w-full max-w-5xl aspect-video bg-[#0f0f14] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex"
                >
                    <div className="w-64 border-r border-white/5 flex flex-col p-6 gap-6 text-left">
                        <div className="w-full h-8 bg-white/5 rounded" />
                        <div className="w-2/3 h-4 bg-white/5 rounded" />
                        <div className="space-y-3 mt-4">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-10 border border-white/5 rounded-md" />)}
                        </div>
                    </div>
                    <div className="flex-1 bg-[#050505] p-12 relative overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00f2ff]/5 blur-[100px]" />
                        <div className="relative z-10 w-full h-full border border-dashed border-white/10 rounded-lg flex items-center justify-center">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 border-t-2 border-[#00f2ff] rounded-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Sections */}
            <section id="features" className="px-6 py-48 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                    <div className="max-w-xl text-left">
                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">RAW POWER.<br/>ZERO BLOAT.</h2>
                        <p className="text-[#94a3b8] text-lg">We stripped away everything you don't need, leaving only the tools that make you faster than light.</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <div className="text-6xl font-black text-white/5">0.01s</div>
                        <div className="text-xs font-bold tracking-[0.3em] text-[#00f2ff] uppercase">Deployment Speed</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard 
                        icon={<MousePointerClick className="w-6 h-6" />}
                        title="Atomic Precision"
                        desc="Drag and drop with frame-accurate control. No more fighting with hidden containers."
                        color="var(--cyan)"
                    />
                    <FeatureCard 
                        icon={<Layers className="w-6 h-6" />}
                        title="Layered Logic"
                        desc="Manage complex hierarchies effortlessly. Visualize your site's architecture as you build."
                        color="#8b5cf6"
                    />
                    <FeatureCard 
                        icon={<Terminal className="w-6 h-6" />}
                        title="Export Ready"
                        desc="One click to get clean, optimized React/Tailwind code. No lock-in, ever."
                        color="#f59e0b"
                    />
                </div>
            </section>

            {/* Testimonial / Social Section */}
            <section className="py-48 bg-[#0a0a0c] border-y border-white/5">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <MessageSquare className="w-12 h-12 text-[#00f2ff] mx-auto mb-12 opacity-50" />
                    <h3 className="text-3xl md:text-5xl font-bold italic leading-tight mb-16">
                        "NoCodeX transformed our workflow. We shipped our landing page in 4 hours instead of 4 days."
                    </h3>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#00f2ff]">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-lg uppercase tracking-wider">SARAH CONNOR</div>
                            <div className="text-[#94a3b8] text-xs font-bold tracking-widest">CEO @ CYBERDYNE</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="px-6 py-64 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00f2ff]/5 rounded-full blur-[150px] pointer-events-none" />
                <h4 className="text-6xl md:text-9xl font-black italic mb-12 relative z-10">SHIP IT.</h4>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary py-8 px-24 text-2xl relative z-10 mx-auto"
                >
                    INITIALIZE PROJECT
                </motion.button>
            </section>

            {/* Footer */}
            <footer className="px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 bg-black">
                <div className="text-sm font-bold opacity-30 tracking-[0.2em]">© 2026 NOCODEX. ALL RIGHTS RESERVED.</div>
                <div className="flex gap-10 text-xs font-black tracking-widest opacity-50 uppercase">
                    <a href="#" className="hover:text-[#00f2ff] transition-colors">Twitter</a>
                    <a href="#" className="hover:text-[#00f2ff] transition-colors">GitHub</a>
                    <a href="#" className="hover:text-[#00f2ff] transition-colors">Terms</a>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, color }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="indie-card p-10 border-white/5 group h-full flex flex-col"
    >
        <div 
            className="w-14 h-14 flex items-center justify-center mb-8 rounded-lg"
            style={{ backgroundColor: `${color}10`, color: color }}
        >
            {icon}
        </div>
        <h3 className="text-2xl font-black italic mb-4 uppercase tracking-tighter">{title}</h3>
        <p className="text-[#94a3b8] leading-relaxed mb-8">{desc}</p>
        <div className="mt-auto flex items-center gap-2 text-xs font-black tracking-widest text-white/20 group-hover:text-white transition-colors uppercase">
            LEARN MORE <ChevronRight className="w-4 h-4" />
        </div>
    </motion.div>
);

export default LandingPage;
