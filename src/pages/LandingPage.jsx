import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MousePointer2, Zap, Rocket, ArrowRight, Github, Code, Globe, Terminal, MessageSquare } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative z-10 w-full min-h-screen bg-[#060608] text-[#f1f1f3]">
            {/* Navbar */}
            <nav className="sticky top-0 z-100 w-full px-10 py-3.5 flex justify-between items-center bg-[#060608]/85 backdrop-blur-md border-b border-[#1e1e2e]">
                <div className="text-[1.2rem] font-[800] font-display text-white tracking-[-0.03em] flex items-center">
                    NoCodeX<span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] ml-1 mt-1" />
                </div>
                <div className="flex gap-8 items-center">
                    <div className="hidden md:flex gap-8 text-[0.82rem] font-medium text-[#52526e]">
                        <a href="#features" className="hover:text-white transition-all">Features</a>
                        <a href="#pricing" className="hover:text-white transition-all">Pricing</a>
                        <a href="https://github.com" className="hover:text-white transition-all flex items-center gap-1.5"><Github size={14} /> GitHub</a>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard')} 
                        className="px-4 py-1.5 rounded-full border border-[#00e5ff] text-[#00e5ff] text-[0.82rem] font-medium bg-transparent hover:bg-[#00e5ff]/5 transition-all"
                    >
                        Launch App <ArrowRight size={14} className="inline ml-1" />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="section-container pt-16 pb-32">
                <div className="hero-grid">
                    {/* Left Column */}
                    <div className="flex flex-col items-start text-left">
                        <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] font-[800] font-display leading-[0.95] tracking-[-0.05em] mb-10 text-white">
                            Build sites.<br />
                            Not <span className="text-[#52526e] line-through decoration-[#52526e]">excuses</span>.<br />
                            <span className="text-[#00e5ff]">Websites.</span>
                        </h1>
                        <p className="text-[1rem] md:text-[1.1rem] text-[#52526e] font-normal leading-relaxed mb-12 max-w-lg">
                            An indie-engineered builder for people who want results, not drag-and-drop fatigue. Raw, fast, and weightless.
                        </p>
                        <div className="flex items-center gap-10">
                            <button 
                                onClick={() => navigate('/dashboard')} 
                                className="px-10 py-5 bg-[#00e5ff] text-[#060608] font-bold text-[1.2rem] flex items-center gap-3 hover:translate-y-[-2px] transition-all"
                            >
                                GET STARTED <ArrowRight size={22} />
                            </button>
                            <a href="#" className="text-sm font-bold text-white hover:text-[#00e5ff] transition-all border-b border-white/20 pb-0.5">
                                View demo &#8594;
                            </a>
                        </div>
                        <div className="mt-16 flex items-center gap-2 text-[#52526e] text-xs font-medium">
                            <div className="flex text-[#00e5ff] gap-0.5 text-xs">★★★★★</div>
                            <span>Trusted by 2,400+ builders worldwide.</span>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="relative hidden lg:block">
                        <div className="orb" />
                        <div className="indie-card rounded-none border-[#1e1e2e] rotate-[2deg] shadow-[0_0_60px_rgba(0,229,255,0.08)] bg-[#0f0f14] p-0 overflow-hidden w-[400px]">
                            <div className="bg-[#1e1e2e] px-4 py-2 flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#52526e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#52526e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#52526e]" />
                                <div className="w-full text-[10px] font-mono text-[#52526e] text-center ml-[-40px]">console.js</div>
                            </div>
                            <div className="p-8 flex flex-col gap-6 scale-90">
                                <div className="w-full h-12 bg-[#00e5ff]/20 border border-[#00e5ff]/40 rounded-sm" />
                                <div className="w-2/3 h-6 bg-[#7c3aed]/20 border border-[#7c3aed]/40 rounded-sm ml-auto" />
                                <div className="w-full h-8 bg-white/5 border border-white/10 rounded-sm" />
                                <div className="w-1/2 h-4 bg-[#52526e]/20 border border-[#52526e]/40 rounded-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features — Broken Grid */}
            <section id="features" className="section-container pb-40">
                <div className="mb-24 flex flex-col items-start">
                    <h2 className="text-[5rem] font-[800] leading-none mb-2 text-white font-display">WHAT WE</h2>
                    <h2 className="text-[5rem] font-[800] leading-none ml-20 text-white font-display">ACTUALLY</h2>
                    <h2 className="text-[5rem] font-[800] leading-none text-[#00e5ff] italic font-display">DO.</h2>
                </div>

                <div className="feature-broken-grid lg:grid-cols-[2fr_1.2fr]">
                    {/* Big Feature (Span 2) */}
                    <div className="indie-card bg-[#0f0f14] p-10 relative overflow-hidden group col-span-2 lg:col-span-1 border border-[#1e1e2e] hover:border-[#52526e] transition-all">
                        <span className="absolute top-4 right-8 font-display font-black text-[6rem] opacity-5 text-[#52526e] group-hover:opacity-10 transition-all">01</span>
                        <div className="w-12 h-12 mb-8 bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center">
                            <MousePointer2 size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-display mb-4 text-white uppercase tracking-tight">DRAG & DROP THAT DOESN'T SUCK.</h3>
                        <p className="text-[#52526e] text-sm leading-relaxed max-w-xs">Built for speed, not frustration. Every interaction feels as light as the vacuum of space.</p>
                    </div>

                    {/* Small Feature 1 */}
                    <div className="indie-card bg-[#0f0f14] p-8 border border-[#1e1e2e] hover:border-[#52526e] transition-all self-end h-[300px] flex flex-col justify-end">
                        <div className="w-10 h-10 mb-6 bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-lg font-bold font-display text-white uppercase mb-2">LIVE PREVIEW</h3>
                        <p className="text-[#52526e] text-xs leading-relaxed">Changes manifest in realtime across all sectors.</p>
                    </div>

                    {/* Small Feature 2 */}
                    <div className="indie-card bg-[#0f0f14] p-8 border border-[#1e1e2e] hover:border-[#52526e] transition-all lg:col-span-1">
                        <div className="w-10 h-10 mb-6 bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center">
                            <Globe size={20} />
                        </div>
                        <h3 className="text-lg font-bold font-display text-white uppercase mb-2">ONE-CLICK DEPLOY</h3>
                        <p className="text-[#52526e] text-xs leading-relaxed">Broadcast zero-gravity code to the global CDN in seconds.</p>
                    </div>

                    {/* Wide Feature */}
                    <div className="indie-card bg-[#0f0f14] p-10 border border-[#1e1e2e] hover:border-[#52526e] transition-all flex items-center gap-10 lg:col-span-1">
                        <div className="w-12 h-12 shrink-0 bg-white/5 text-[#52526e] flex items-center justify-center">
                             <Terminal size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-display text-white uppercase mb-3">CLEAN CODE EXPORT</h3>
                            <p className="text-[#52526e] text-sm leading-relaxed">HTML and Tailwind manifests with absolute zero boilerplate.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Offset Section */}
            <section className="bg-[#0f0f14] border-t border-b border-[#1e1e2e] py-32 overflow-hidden">
                <div className="section-container flex flex-col lg:flex-row gap-20">
                    {/* Main Quote */}
                    <div className="flex-1 lg:max-w-[700px]">
                        <div className="text-[#00e5ff] text-[4rem] font-display font-[800] leading-none mb-[-20px] opacity-20">"</div>
                        <h3 className="text-[2.2rem] md:text-[2.6rem] font-[800] font-display italic leading-tight text-white mb-10">
                            NoCodeX is the only builder that doesn't make me want to quit web dev. It feels like cheating.
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#00e5ff]" />
                            <div>
                                <h4 className="font-bold text-white text-xs uppercase font-display">Atlas Storm</h4>
                                <p className="text-[#52526e] text-[10px] font-bold uppercase tracking-widest mt-0.5">Indie Founder & Pilot</p>
                            </div>
                        </div>
                    </div>

                    {/* Side Quotes */}
                    <div className="flex flex-col gap-12 lg:pt-10">
                        <div className="max-w-xs h-fit">
                             <p className="text-[#52526e] text-lg font-display italic mb-4 leading-normal">
                               "Finally, a builder that understands layout tension."
                             </p>
                             <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">— Nova Gray</span>
                        </div>
                        <div className="max-w-xs h-fit pl-12 border-l border-[#1e1e2e]">
                             <p className="text-[#52526e] text-lg font-display italic mb-4 leading-normal">
                               "Shipped my portfolio in 40 minutes. Confidently raw."
                             </p>
                             <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">— Orion Vega</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-24 bg-[#0f0f14] border-b border-[#1e1e2e]">
                <div className="section-container flex flex-col md:flex-row justify-between items-center gap-12">
                    <h4 className="text-[3.5rem] md:text-[4.5rem] font-[800] font-display text-white tracking-[-0.03em]">Ready to ship?</h4>
                    <button 
                         onClick={() => navigate('/dashboard')} 
                         className="px-12 py-5 bg-[#00e5ff] text-[#060608] font-bold text-[1.2rem] flex items-center gap-3 transition-all hover:translate-y-[-2px]"
                    >
                         START BUILDING NOW &#8594;
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-container py-12 px-10 border-t border-[#1e1e2e] flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                     <span className="text-xs font-[800] font-display text-white uppercase tracking-widest">NoCodeX</span>
                     <span className="text-[#52526e] text-[10px] font-medium ml-4">Built by humans. Deployed in seconds.</span>
                </div>
                <div className="flex gap-10 self-center md:self-end">
                    <div className="text-[0.6rem] font-bold text-[#52526e] uppercase tracking-[0.4em] mr-8">© 2026 NoCodeX</div>
                    <div className="flex gap-6 text-[0.7rem] font-bold uppercase tracking-widest text-white/40">
                         <a href="#" className="hover:text-white transition-all underline underline-offset-4 decoration-white/10">Twitter</a>
                         <a href="#" className="hover:text-white transition-all underline underline-offset-4 decoration-white/10">GitHub</a>
                         <a href="#" className="hover:text-white transition-all underline underline-offset-4 decoration-white/10">Discord</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
