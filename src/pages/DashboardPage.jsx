import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Share2, Search, ArrowRight, Github } from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [tempName, setTempName] = useState('');

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('nocodex_projects') || '[]');
        setProjects(saved);
    }, []);

    const createNewProject = () => {
        const id = crypto.randomUUID();
        const newProject = {
            id,
            name: "Untitled Project",
            lastEdited: new Date().toISOString(),
            elements: []
        };
        const updated = [newProject, ...projects];
        localStorage.setItem('nocodex_projects', JSON.stringify(updated));
        setProjects(updated);
        toast.success("New Project Created.");
        navigate(`/editor/${id}`);
    };

    const deleteProject = (id) => {
        if (window.confirm("Delete this project?")) {
            const updated = projects.filter(p => p.id !== id);
            localStorage.setItem('nocodex_projects', JSON.stringify(updated));
            setProjects(updated);
            toast.success("Project deleted.");
        }
    };

    const renameProject = (id, newName) => {
        const updated = projects.map(p => 
            p.id === id ? { ...p, name: newName, lastEdited: new Date().toISOString() } : p
        );
        localStorage.setItem('nocodex_projects', JSON.stringify(updated));
        setProjects(updated);
        setEditingId(null);
        toast.success("Project renamed.");
    };

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative min-h-screen flex flex-col z-10 w-full bg-[#060608]">
            {/* Navbar */}
            <nav className="sticky top-0 z-100 w-full px-10 py-3.5 flex justify-between items-center bg-[#060608]/85 backdrop-blur-md border-b border-[#1e1e2e]">
                <div onClick={() => navigate('/')} className="text-[1.2rem] font-[800] font-display text-white tracking-[-0.03em] flex items-center cursor-pointer">
                    NoCodeX<span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] ml-1 mt-1" />
                </div>
                <div className="flex gap-6 items-center">
                    <button 
                        onClick={createNewProject} 
                        className="px-4 py-1.5 rounded-full border border-[#00e5ff] text-[#00e5ff] text-[0.82rem] font-medium bg-transparent hover:bg-[#00e5ff]/5 transition-all"
                    >
                        New Project <Plus size={14} className="inline ml-1" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-[#1e1e2e] border border-[#52526e]/20" />
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-10 py-16">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl font-[800] font-display text-white uppercase tracking-tight">
                            Project <span className="text-[#00e5ff]">Dashboard</span>
                        </h1>
                        <p className="text-[#52526e] text-sm mt-2 font-medium">Your collection of handcrafted websites.</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="flex items-center px-4 py-2.5 bg-[#0f0f14] border border-[#1e1e2e] w-full md:w-80 group focus-within:border-[#00e5ff]/50 transition-all rounded-sm">
                             <Search className="w-4 h-4 text-[#52526e] mr-3" />
                             <input 
                                type="text" 
                                placeholder="Search missions..." 
                                className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-[#52526e]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                             />
                        </div>
                    </div>
                </header>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="project-grid pb-24">
                        {filteredProjects.map((p) => (
                            <div key={p.id} className="indie-card group h-fit flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1 min-w-0">
                                        {editingId === p.id ? (
                                            <input 
                                                autoFocus
                                                className="bg-transparent border-b border-[#00e5ff] py-1 text-white font-[800] font-display text-xl w-full outline-none"
                                                value={tempName}
                                                onChange={(e) => setTempName(e.target.value)}
                                                onBlur={() => renameProject(p.id, tempName || "Untitled")}
                                                onKeyDown={(e) => e.key === 'Enter' && renameProject(p.id, tempName || "Untitled")}
                                            />
                                        ) : (
                                            <h3 
                                                onDoubleClick={() => { setEditingId(p.id); setTempName(p.name); }}
                                                className="text-xl font-[800] font-display text-white truncate group-hover:text-[#00e5ff] transition-colors tracking-tight cursor-text"
                                            >
                                                {p.name}
                                            </h3>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#52526e]" />
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#52526e]">Modified {new Date(p.lastEdited).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 pt-6 border-t border-[#1e1e2e]">
                                     <button 
                                        onClick={() => navigate(`/editor/${p.id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1e1e2e] text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#00e5ff]/10 hover:text-[#00e5ff] transition-all"
                                    >
                                        Open Builder <ArrowRight size={12} />
                                    </button>
                                     <button 
                                        onClick={() => deleteProject(p.id)}
                                        className="p-3 bg-transparent border border-[#1e1e2e] text-[#52526e] hover:text-red-400 hover:border-red-400/30 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[50vh] border border-dashed border-[#1e1e2e]">
                        <h2 className="text-2xl font-[800] font-display text-white mb-2 tracking-tight">NO PROJECTS FOUND</h2>
                        <p className="text-[#52526e] text-sm mb-10 max-w-sm text-center font-medium">Your flight deck is currently empty. Start your first mission today.</p>
                        <button 
                            onClick={createNewProject} 
                            className="px-8 py-4 bg-[#00e5ff] text-[#060608] font-[800] font-display text-base hover:translate-y-[-2px] transition-all"
                        >
                             INITIATE PROJECT &#8594;
                        </button>
                    </div>
                )}
            </main>

            <footer className="footer-container py-12 px-10 border-t border-[#1e1e2e] flex flex-col md:flex-row justify-between items-center gap-8 mt-auto">
                <div className="flex items-center gap-2">
                     <span className="text-xs font-[800] font-display text-white uppercase tracking-widest">NoCodeX</span>
                     <span className="text-[#52526e] text-[10px] font-medium ml-4">Built by humans. Deployed in seconds.</span>
                </div>
                <div className="flex gap-6 text-[0.7rem] font-bold uppercase tracking-widest text-white/40">
                     <a href="#" className="hover:text-white transition-all">Twitter</a>
                     <a href="#" className="hover:text-white transition-all">GitHub</a>
                </div>
            </footer>
        </div>
    );
};

export default DashboardPage;
