import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, Smartphone, Tablet, Download, Share2, Rocket, Globe, Minus } from 'lucide-react';
import useCanvasStore from '../store/useCanvasStore';
import toast from 'react-hot-toast';

const PreviewElement = ({ type, content, props = {} }) => {
    const style = {
        backgroundColor: props.background,
        color: props.color,
        padding: props.padding,
        fontSize: props.fontSize,
        borderRadius: props.borderRadius,
    };

    switch (type) {
        case 'Hero':
            return (
                <section style={style} className="text-center py-32 px-12 border-b border-gray-100/5 transition-all">
                    <h1 className="text-7xl font-black mb-8 uppercase tracking-wider leading-tight">{content.title}</h1>
                    <p className="text-2xl max-w-3xl mx-auto opacity-70 font-medium leading-relaxed">{content.subtitle}</p>
                    <button className="mt-16 px-16 py-6 bg-gradient-to-r from-[#00f2ff] to-[#8b5cf6] text-[#030303] font-black rounded-2xl shadow-2xl hover:scale-105 transition-all uppercase tracking-widest text-lg">Launch Mission</button>
                </section>
            );
        case 'Section':
            return (
                <section style={style} className="py-24 px-16 transition-all">
                    <h2 className="text-5xl font-black mb-10 uppercase tracking-widest leading-snug">{content.title}</h2>
                    <p className="text-xl leading-relaxed opacity-60 font-medium">{content.text}</p>
                </section>
            );
        case 'Heading':
            return (
                <div style={style} className="py-12 px-12">
                    <h2 className="text-6xl font-black uppercase tracking-widest">{content.text}</h2>
                </div>
            );
        case 'Text':
            return (
                <div style={style} className="py-8 px-12">
                    <p className="leading-relaxed opacity-80 font-medium text-xl">{content.text}</p>
                </div>
            );
        case 'Image':
            return (
                <div style={style} className="flex justify-center p-12">
                    <img src={content.src} alt={content.alt} className="max-w-full rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.2)] ring-1 ring-white/5" />
                </div>
            );
        case 'Button':
            return (
                <div style={style} className="flex justify-center py-12">
                    <button className="px-16 py-6 bg-gradient-to-r from-[#00f2ff] to-[#8b5cf6] text-[#030303] font-black rounded-2xl shadow-2xl hover:scale-105 transition-all uppercase tracking-widest text-lg">
                        {content.text}
                    </button>
                </div>
            );
        case 'Navbar':
            return (
                <nav style={style} className="flex justify-between items-center py-10 px-16 border-b border-white/5 transition-all sticky top-0 bg-white/10 backdrop-blur-2xl z-50">
                    <div className="text-3xl font-black uppercase tracking-widest text-white">{content.logo}</div>
                    <div className="flex gap-12 text-xs font-black uppercase tracking-[0.4em] text-white">
                        {content.links?.map((l) => <a key={l} href="#" className="hover:text-[#00f2ff] transition-colors">{l}</a>)}
                    </div>
                </nav>
            );
        case 'Divider':
            return <hr className="my-24 mx-16 border-white/10" />;
        case 'Footer':
            return (
                <footer style={style} className="py-20 text-center text-sm font-black uppercase tracking-[0.5em] opacity-40 border-t border-white/5 transition-all mt-20">
                    {content.text}
                </footer>
            );
        default:
            return null;
    }
};

const PreviewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { elements, projectName, loadProject, viewport, setViewport } = useCanvasStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/projects/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(project => {
                loadProject(project);
                setTimeout(() => setIsLoading(false), 1200);
            })
            .catch(err => {
                console.error("Preview load error:", err);
                navigate('/404');
            });
    }, [id, loadProject, navigate]);

    const viewportWidths = {
        desktop: '100%',
        tablet: '768px',
        mobile: '390px'
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center gap-10 bg-[#030303] z-[1000]">
                <div className="w-24 h-24 rounded-full bg-[#00f2ff]/5 border border-[#00f2ff]/20 flex items-center justify-center animate-float ring-4 ring-[#00f2ff]/5">
                    <Rocket className="w-10 h-10 text-[#00f2ff] animate-pulse" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl font-black uppercase tracking-[0.4em] text-white">CALIBRATING ORBIT</h2>
                    <p className="text-[10px] font-black text-[#00f2ff] uppercase tracking-[0.3em] opacity-60">Synchronizing viewport coordinates...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex-col bg-[#030303] z-10 w-full">
            {/* Top Toolbar */}
            <nav className="sticky top-0 h-16 glass border-b border-white/5 px-6 flex justify-between items-center z-[500] bg-black/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate(`/editor/${id}`)} className="glass p-2.5 rounded-xl flex items-center gap-2 text-white hover:text-[#00f2ff] transition-all font-black text-[10px] uppercase tracking-widest px-6 shadow-2xl">
                        <ArrowLeft size={16} /> BACK TO EDITOR
                    </button>
                    <div className="hidden lg:flex items-center gap-2 glass p-1 rounded-xl border border-white/10">
                        {[
                            { id: 'desktop', icon: <Monitor size={14} /> },
                            { id: 'tablet', icon: <Tablet size={14} /> },
                            { id: 'mobile', icon: <Smartphone size={14} /> }
                        ].map(v => (
                            <button 
                                key={v.id}
                                onClick={() => setViewport(v.id)}
                                className={`p-2.5 rounded-lg transition-all flex items-center gap-2 ${viewport === v.id ? 'bg-[#00f2ff] text-[#030303] font-black shadow-[0_0_15px_rgba(0,242,255,0.4)]' : 'text-[#64748b] hover:text-white'}`}
                            >
                                {v.icon}
                            </button>
                        ))}
                    </div>
                </div>
                
                <h1 className="font-black text-[10px] text-white uppercase tracking-[0.4em] absolute left-1/2 -translate-x-1/2 hidden xl:block">
                     Broadcasting mission <span className="text-[#00f2ff]">{projectName}</span>
                </h1>

                <div className="flex gap-3">
                    <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Bridge Link Copied."); }} className="glass p-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase text-white hover:text-[#00f2ff] transition-all">
                         <Share2 size={16} /> 
                    </button>
                    <button onClick={() => toast.success("Module transmission successful.")} className="btn-primary px-8 py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                         <Globe size={16} /> PUBLISH
                    </button>
                </div>
            </nav>

            {/* Viewport Frame */}
            <div className="flex-1 overflow-auto bg-black/60 flex items-center justify-center p-8 transition-all duration-700">
                <div 
                    className="min-h-full bg-[#0a0a0c] transition-all duration-700 ease-in-out shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-x-hidden border border-white/5 rounded-lg"
                    style={{ width: viewportWidths[viewport] || '100%' }}
                >
                    {elements.length > 0 ? (
                        <div className="flex flex-col">
                            {elements.map((el) => (
                                <PreviewElement key={el.id} {...el} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center h-screen">
                             <div className="text-center font-black text-white/10 text-4xl uppercase tracking-[0.5em]">Empty Verse</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;

