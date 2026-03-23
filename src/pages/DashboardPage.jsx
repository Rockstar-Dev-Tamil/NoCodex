import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Share2, Search, ArrowRight, Github, LayoutGrid, List, Clock, Folder, MoreVertical, ExternalLink, Layout } from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [tempName, setTempName] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => toast.error('Failed to load projects from server.'));
    }, []);

    const createNewProject = async () => {
        const id = crypto.randomUUID();
        const newProject = { id, name: "Untitled Project", elements: [] };
        try {
            const res = await fetch('http://localhost:5000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject)
            });
            const project = await res.json();
            setProjects([project, ...projects]);
            toast.success("Project Initialized");
            navigate(`/editor/${id}`);
        } catch (error) {
            toast.error("Error creating project");
        }
    };

    const deleteProject = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
            setProjects(projects.filter(p => p.id !== id));
            toast.success("Project Deleted");
        } catch (error) {
            toast.error("Error deleting project");
        }
    };

    const renameProject = async (id, newName) => {
        try {
            const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });
            const updatedProject = await res.json();
            setProjects(projects.map(p => p.id === id ? updatedProject : p));
            setEditingId(null);
        } catch (error) {
            toast.error("Error renaming project");
        }
    };

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative min-h-screen flex flex-col bg-[#030303] text-[#f8fafc] font-body selection:bg-[#00f2ff]/30">
            <div className="noise" />
            <div className="fixed inset-0 bg-grid pointer-events-none opacity-[0.02]" />

            {/* Top Bar */}
            <nav className="sticky top-0 z-[100] px-6 py-4 flex justify-between items-center glass border-x-0 border-t-0">
                <div onClick={() => navigate('/')} className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-black rounded-[4px] group-hover:bg-[#00f2ff] transition-colors">N</div>
                    <span className="text-xl font-black tracking-tighter">DASHBOARD</span>
                </div>
                
                <div className="flex items-center gap-6">
                    <button 
                        onClick={createNewProject} 
                        className="btn-primary py-2 px-6 rounded-none text-xs flex items-center gap-2"
                    >
                        <Plus size={14} strokeWidth={3} /> NEW PROJECT
                    </button>
                    <div className="w-8 h-8 rounded-full border border-white/10 p-0.5">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="rounded-full" alt="Avatar" />
                    </div>
                </div>
            </nav>

            <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-12 relative z-10">
                {/* Header Actions */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">My Missions</h1>
                        <p className="text-[#94a3b8] text-sm font-medium mt-1">Manage and deploy your high-performance websites.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative group w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] group-focus-within:text-[#00f2ff] transition-colors" />
                            <input 
                                type="text" 
                                placeholder="SEARCH MISSIONS..." 
                                className="w-full bg-white/5 border border-white/5 rounded-none py-3 pl-12 pr-4 text-xs font-bold tracking-widest uppercase focus:border-[#00f2ff]/50 outline-none transition-all placeholder:text-[#64748b]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex border border-white/5 rounded-none overflow-hidden h-full">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-[#00f2ff]' : 'hover:bg-white/5 text-[#64748b]'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-white/10 text-[#00f2ff]' : 'hover:bg-white/5 text-[#64748b]'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Projects Content */}
                <AnimatePresence mode="wait">
                    {filteredProjects.length > 0 ? (
                        <motion.div 
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={viewMode === 'grid' 
                                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                : "flex flex-col gap-2"
                            }
                        >
                            {filteredProjects.map((p, index) => (
                                <ProjectCard 
                                    key={p.id} 
                                    project={p} 
                                    index={index}
                                    viewMode={viewMode}
                                    onDelete={() => deleteProject(p.id)}
                                    onRename={(name) => renameProject(p.id, name)}
                                    onClick={() => navigate(`/editor/${p.id}`)}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-32 border border-dashed border-white/5 rounded-xl bg-white/[0.01]"
                        >
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <Folder className="w-10 h-10 text-white/20" />
                            </div>
                            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-2">No projects detected</h2>
                            <p className="text-[#64748b] text-sm mb-8 font-medium">Your hangar is currently empty. Start your first build.</p>
                            <button 
                                onClick={createNewProject} 
                                className="btn-primary py-4 px-10 text-sm group"
                            >
                                START BUILDING <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

const ProjectCard = ({ project, index, viewMode, onDelete, onRename, onClick }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(project.name);

    if (viewMode === 'list') {
        return (
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center gap-4 p-4 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all cursor-pointer"
                onClick={onClick}
            >
                <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded group-hover:bg-[#00f2ff]/10 group-hover:text-[#00f2ff] transition-colors">
                    <Layout size={18} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm uppercase tracking-wider truncate">{project.name}</h3>
                    <p className="text-[10px] text-[#64748b] font-bold uppercase tracking-[0.1em] mt-0.5">EDITED {new Date(project.lastEdited).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">v1.0.4</span>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-[#64748b] hover:text-red-400 p-2">
                        <Trash2 size={16} />
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="indie-card group p-0 border-white/5 flex flex-col cursor-pointer"
            onClick={onClick}
        >
            <div className="aspect-[16/10] bg-[#050505] p-6 relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="glass p-2 rounded-md">
                        <ExternalLink size={14} className="text-[#00f2ff]" />
                    </div>
                </div>
                {/* Simulated Preview */}
                <div className="w-full h-full border border-white/5 rounded-sm flex flex-col p-3 gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-4 bg-white/10 rounded-full" />
                    <div className="w-2/3 h-2 bg-white/5 rounded-full" />
                    <div className="mt-auto grid grid-cols-3 gap-2">
                        <div className="h-6 bg-white/5 rounded" />
                        <div className="h-6 bg-[#00f2ff]/20 rounded" />
                        <div className="h-6 bg-white/5 rounded" />
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                        {isEditing ? (
                            <input 
                                autoFocus
                                className="bg-transparent border-b-2 border-[#00f2ff] text-lg font-black italic tracking-tighter uppercase w-full outline-none py-1"
                                value={name}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => { setIsEditing(false); onRename(name); }}
                                onKeyDown={(e) => e.key === 'Enter' && (setIsEditing(false) || onRename(name))}
                            />
                        ) : (
                            <h3 
                                onDoubleClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                                className="text-xl font-black italic tracking-tighter uppercase truncate group-hover:text-[#00f2ff] transition-colors"
                            >
                                {project.name}
                            </h3>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-[#64748b] uppercase">
                                <Clock size={10} /> {new Date(project.lastEdited).toLocaleDateString()}
                            </div>
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <div className="text-[10px] font-black tracking-widest text-[#64748b] uppercase">
                                PROV-X3
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 pt-2">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onClick(); }}
                        className="flex-1 py-3 bg-white/5 group-hover:bg-[#00f2ff] group-hover:text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                    >
                        INITIALIZE <ArrowRight size={12} strokeWidth={3} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        className="p-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-[#64748b] transition-all"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardPage;
