import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
    Beaker, TestTube, BarChart3, Users, Calendar, Filter,
    Plus, ThumbsUp, MessageCircle, Download, Trophy,
    BookOpen, Eye, Clock, ChevronDown, Lightbulb,
    GitBranch, Share2, Target, Award, Flame, Star,
    X, Sun, Moon
} from 'lucide-react';
import * as d3 from 'd3';
import DevBanner from '../../../components/banners/DevBanner';

// ---------- Mock data (same as original, kept here for demo) ----------
const mockProjects = [
    {
        id: 1,
        title: "Neural Network Fermentation Patterns",
        abstract: "Exploring how AI learning patterns mirror biological fermentation processes...",
        tags: ["AI", "Biology", "Neural Networks"],
        status: "fermenting",
        progress: 65,
        startDate: "2024-11-15",
        lastUpdate: "2025-01-20",
        collaborators: 3,
        field: "Computer Science"
    },
    {
        id: 2,
        title: "Quantum Computing Error Correction",
        abstract: "Novel approaches to reducing quantum decoherence through adaptive algorithms...",
        tags: ["Quantum", "Computing", "Algorithms"],
        status: "distilled",
        progress: 100,
        startDate: "2024-08-10",
        lastUpdate: "2025-01-15",
        collaborators: 2,
        field: "Physics"
    },
    {
        id: 3,
        title: "Sustainable Software Architecture",
        abstract: "Green computing principles applied to large-scale distributed systems...",
        tags: ["Sustainability", "Software", "Architecture"],
        status: "brewing",
        progress: 30,
        startDate: "2025-01-01",
        lastUpdate: "2025-01-18",
        collaborators: 1,
        field: "Software Engineering"
    }
];

const mockIdeas = [
    {
        id: 1,
        title: "Blockchain-based Academic Peer Review",
        description: "Using distributed ledger technology to create transparent, immutable peer review processes",
        upvotes: 23,
        comments: 8,
        tags: ["Blockchain", "Academia", "Peer Review"],
        author: "Community",
        date: "2025-01-16"
    },
    {
        id: 2,
        title: "AI-Powered Research Paper Summarization",
        description: "Machine learning models that can distill complex research into accessible summaries",
        upvotes: 18,
        comments: 12,
        tags: ["AI", "NLP", "Education"],
        author: "Kenshi",
        date: "2025-01-14"
    }
];

const mockJournalEntries = [
    {
        id: 1,
        title: "Breakthrough in Quantum Error Correction",
        date: "2025-01-18",
        type: "breakthrough",
        content: "Today's experiment yielded unexpected results. The adaptive algorithm reduced error rates by 34%...",
        project: "Quantum Computing Error Correction",
        version: "v2.3"
    },
    {
        id: 2,
        title: "Neural Network Training Setback",
        date: "2025-01-16",
        type: "setback",
        content: "Hit a wall with the current architecture. The model is overfitting despite regularization...",
        project: "Neural Network Fermentation Patterns",
        version: "v1.8"
    }
];

const mockPublications = [
    {
        id: 1,
        title: "Adaptive Algorithms in Quantum Systems",
        journal: "Nature Quantum Information",
        year: 2024,
        citations: 42,
        downloadUrl: "#",
        summary: "Groundbreaking work on quantum error correction using adaptive machine learning approaches."
    },
    {
        id: 2,
        title: "Bio-Inspired Neural Networks",
        journal: "IEEE Transactions on Neural Networks",
        year: 2024,
        citations: 28,
        downloadUrl: "#",
        summary: "Novel neural architectures inspired by fermentation processes in biological systems."
    }
];

const mockChartData = [
    { month: 'Jan', projects: 2, ideas: 5, publications: 1 },
    { month: 'Feb', projects: 3, ideas: 8, publications: 0 },
    { month: 'Mar', projects: 4, ideas: 12, publications: 2 },
    { month: 'Apr', projects: 3, ideas: 15, publications: 1 },
    { month: 'May', projects: 5, ideas: 18, publications: 3 }
];

// ---------- Utilities ----------
function useResizeObserver(ref) {
    const [size, setSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                const cr = entry.contentRect;
                setSize({ width: Math.floor(cr.width), height: Math.floor(cr.height) });
            }
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, [ref]);
    return size;
}

function exportToCSV(filename, rows) {
    if (!rows || !rows.length) return;
    const header = Object.keys(rows[0]);
    const csv = [header.join(',')].concat(rows.map(r => header.map(h => `"${String(r[h] ?? '')}"`).join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// ---------- Responsive D3 line chart component ----------
const ResponsiveLineChart = ({ data, valueKey = 'projects' }) => {
    const ref = useRef();
    const { width, height } = useResizeObserver(ref);

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();
        if (!width || !height) return;

        const margin = { top: 12, right: 12, bottom: 30, left: 36 };
        const innerW = width - margin.left - margin.right;
        const innerH = height - margin.top - margin.bottom;

        const x = d3.scalePoint().domain(data.map(d => d.month)).range([0, innerW]).padding(0.5);
        const y = d3.scaleLinear().domain([0, d3.max(data, d => d[valueKey]) || 1]).nice().range([innerH, 0]);

        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x));
        g.append('g').call(d3.axisLeft(y).ticks(4));

        const line = d3.line()
            .x(d => x(d.month))
            .y(d => y(d[valueKey]))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#2563EB')
            .attr('stroke-width', 2.5)
            .attr('d', line);

        g.selectAll('.dot')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(d.month))
            .attr('cy', d => y(d[valueKey]))
            .attr('r', 4)
            .attr('fill', '#2563EB');

    }, [data, width, height, valueKey]);

    return <svg ref={ref} width="100%" height="300" className="w-full" aria-label="line chart" />;
};

const ResponsiveBarChart = ({ data, valueKey = 'publications' }) => {
    const ref = useRef();
    const { width, height } = useResizeObserver(ref);

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();
        if (!width || !height) return;

        const margin = { top: 12, right: 12, bottom: 30, left: 36 };
        const innerW = width - margin.left - margin.right;
        const innerH = height - margin.top - margin.bottom;

        const x = d3.scaleBand().domain(data.map(d => d.month)).range([0, innerW]).padding(0.2);
        const y = d3.scaleLinear().domain([0, d3.max(data, d => d[valueKey]) || 1]).nice().range([innerH, 0]);

        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
        g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x));
        g.append('g').call(d3.axisLeft(y).ticks(4));

        g.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.month))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d[valueKey]))
            .attr('height', d => innerH - y(d[valueKey]))
            .attr('fill', '#8B5CF6');

    }, [data, width, height, valueKey]);

    return <svg ref={ref} width="100%" height="300" className="w-full" aria-label="bar chart" />;
};

// ---------- Small UI components ----------
function StatusPill({ status }) {
    const base = 'px-2 py-1 rounded-full text-xs font-medium inline-flex items-center space-x-2';
    switch (status) {
        case 'brewing': return <span className={`${base} bg-amber-100 text-amber-800`} aria-hidden>{/* icon */} <Beaker className="w-3 h-3" /></span>;
        case 'fermenting': return <span className={`${base} bg-blue-100 text-blue-800`}><TestTube className="w-3 h-3" /></span>;
        case 'distilled': return <span className={`${base} bg-green-100 text-green-800`}><Trophy className="w-3 h-3" /></span>;
        default: return <span className={`${base} bg-gray-100 text-gray-800`}><Clock className="w-3 h-3" /></span>;
    }
}

function Modal({ open, onClose, title, children }) {
    useEffect(() => {
        function onKey(e) { if (e.key === 'Escape') onClose(); }
        if (open) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden />
            <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-3xl overflow-auto">
                <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
                    <button onClick={onClose} aria-label="Close modal" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
                        <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>
                </div>
                <div className="p-4 text-gray-700 dark:text-gray-200">{children}</div>
            </div>
        </div>
    );
}

// ---------- Main Component ----------
export default function ResearchBrewery() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('lastUpdate');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedField, setSelectedField] = useState('all');
    const [view, setView] = useState('grid'); // grid or list
    const [selectedProject, setSelectedProject] = useState(null);
    const [bannerVisible, setBannerVisible] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const fields = useMemo(() => ['all', ...new Set(mockProjects.map(p => p.field))], []);

    const filtered = useMemo(() => {
        return mockProjects
            .filter(p => selectedStatus === 'all' || p.status === selectedStatus)
            .filter(p => selectedField === 'all' || p.field === selectedField)
            .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.join(' ').toLowerCase().includes(search.toLowerCase()));
    }, [search, selectedStatus, selectedField]);

    const sorted = useMemo(() => {
        const items = [...filtered];
        if (sortBy === 'progress') items.sort((a, b) => b.progress - a.progress);
        else if (sortBy === 'lastUpdate') items.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
        else if (sortBy === 'collaborators') items.sort((a, b) => b.collaborators - a.collaborators);
        return items;
    }, [filtered, sortBy]);

    function getStatusColor(status) {
        switch (status) {
            case 'brewing': return 'bg-amber-500';
            case 'fermenting': return 'bg-blue-500';
            case 'distilled': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    }

    function openProject(p) { setSelectedProject(p); }

    function copyShareLink(p) {
        const url = `${location.origin}${location.pathname}?project=${p.id}`;
        navigator.clipboard?.writeText(url);
        // minimal UI feedback
        alert('Share link copied to clipboard');
    }

    const tabs = [
        { id: 'dashboard', label: 'Brewing Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'incubator', label: 'Idea Incubator', icon: <Lightbulb className="w-4 h-4" /> },
        { id: 'journal', label: 'Brew Journal', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'collaboration', label: 'Collaboration Corner', icon: <Users className="w-4 h-4" /> },
        { id: 'visuals', label: 'Data Distillery', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'publications', label: 'Publication Shelf', icon: <Trophy className="w-4 h-4" /> },
        { id: 'wall', label: 'Interactive Wall', icon: <Target className="w-4 h-4" /> },
        { id: 'tasting', label: 'Community Tasting', icon: <Star className="w-4 h-4" /> }
    ];

    // content renderers (kept compact but improved)
    function renderHeader() {
        return (
            <div className="bg-white dark:bg-slate-900 shadow-sm border-b dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
                                <Beaker className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-sm md:text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Kenshi Research Brewery</h1>
                                <p className="hidden md:block text-xs sm:text-sm text-gray-500 dark:text-gray-300">Where ideas ferment into innovation</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button onClick={() => setDarkMode(d => !d)} title="Toggle dark" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">
                                {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                            </button>
                            <div className="hidden md:flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>Last brew: 2 hours ago</span>
                            </div>
                            <button className="hidden md:block ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-3 py-2 rounded-lg hover:shadow transition" onClick={() => alert('Open project creation modal (not implemented in demo)')}>
                                <Plus className="w-4 h-4 inline mr-2" />New Project
                            </button>

                            <button className="block md:hidden ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-3 py-2 rounded-lg hover:shadow transition" onClick={() => alert('Open project creation modal (not implemented in demo)')}>
                                <Plus className="w-4 h-4 inline" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function renderFilters() {
        return (
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border dark:border-slate-700 flex flex-col md:flex-row gap-3 items-stretch md:items-center overflow-scroll">
                <div className="flex-1 flex items-center gap-3">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects, tags..." className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 dark:bg-slate-800 dark:border-slate-700" aria-label="Search projects" />
                    <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="px-3 py-2 border rounded-md dark:bg-slate-800">
                        <option value="all">All Status</option>
                        <option value="brewing">Brewing</option>
                        <option value="fermenting">Fermenting</option>
                        <option value="distilled">Distilled</option>
                    </select>
                    <select value={selectedField} onChange={e => setSelectedField(e.target.value)} className="px-3 py-2 border rounded-md dark:bg-slate-800">
                        {fields.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 border rounded-md dark:bg-slate-800">
                        <option value="lastUpdate">Sort: Recent</option>
                        <option value="progress">Sort: Progress</option>
                        <option value="collaborators">Sort: Collaborators</option>
                    </select>

                    <button onClick={() => setView(v => v === 'grid' ? 'list' : 'grid')} className="px-3 py-2 border rounded-md">
                        {view === 'grid' ? 'List' : 'Grid'} view
                    </button>

                    <button onClick={() => exportToCSV('projects.csv', sorted)} className="px-3 py-2 border rounded-md flex items-center gap-2">
                        <Download className="w-4 h-4" />Export
                    </button>
                </div>
            </div>
        );
    }

    function renderStats() {
        const counts = {
            brewing: mockProjects.filter(p => p.status === 'brewing').length,
            fermenting: mockProjects.filter(p => p.status === 'fermenting').length,
            distilled: mockProjects.filter(p => p.status === 'distilled').length
        };
        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Brewing</p>
                            <p className="text-2xl font-bold">{counts.brewing}</p>
                        </div>
                        <Beaker className="w-8 h-8 text-amber-100" />
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Fermenting</p>
                            <p className="text-2xl font-bold">{counts.fermenting}</p>
                        </div>
                        <TestTube className="w-8 h-8 text-blue-100" />
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs">Distilled</p>
                            <p className="text-2xl font-bold">{counts.distilled}</p>
                        </div>
                        <Trophy className="w-8 h-8 text-green-100" />
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-300">Ideas</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{mockIdeas.length}</p>
                        </div>
                        <Lightbulb className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
            </div>
        );
    }

    function renderProjectCard(p) {
        return (
            <article key={p.id} className={`bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow-sm p-4 hover:shadow-lg transition relative`}>
                <div className={`h-1 rounded-t-md ${getStatusColor(p.status)}`} />
                <div className="p-3">
                    <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{p.title}</h3>
                        <div className="flex items-center gap-2">
                            <button onClick={() => copyShareLink(p)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700" title="Copy share link"><Share2 className="w-4 h-4" /></button>
                            <button onClick={() => openProject(p)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700" title="Open details"><Eye className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 my-2 line-clamp-3">{p.abstract}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                        {p.tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">{t}</span>)}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                            <span>Progress</span>
                            <span>{p.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                            <div className={`h-2 rounded-full transition-all`} style={{ width: `${p.progress}%`, background: getStatusColor(p.status).replace('bg-', '') ? undefined : undefined }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Started: {p.startDate}</span>
                            <span>{p.collaborators} collaborators</span>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    function renderGrid() {
        return (
            <div className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
                {sorted.map(p => renderProjectCard(p))}
            </div>
        );
    }

    function renderVisuals() {
        return (
            <div className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Research Activity Over Time</h4>
                        <ResponsiveLineChart data={mockChartData} valueKey="projects" />
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                        <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Publications by Month</h4>
                        <ResponsiveBarChart data={mockChartData} valueKey="publications" />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Dataset Gallery</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                        {['Neural Network Training Data', 'Quantum Simulation Results', 'Algorithm Performance Metrics'].map((dataset, idx) => (
                            <div key={idx} className="border rounded-lg p-3 dark:border-slate-700 hover:shadow transition flex flex-col justify-between">
                                <div>
                                    <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">{dataset}</h5>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">Updated {Math.floor(Math.random() * 30)} days ago</p>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <button className="text-sm flex items-center gap-2 text-blue-600 dark:text-blue-400" onClick={() => alert('Download started (demo)')}><Download className="w-4 h-4" />Download</button>
                                    <button className="text-sm px-2 py-1 border rounded" onClick={() => exportToCSV(dataset.replace(/\s+/g, '_') + '.csv', [{ name: dataset, updated: new Date().toISOString() }])}>Export</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Main content switcher (keeps other renderers similar to original but improved for responsive layout)
    function renderContent() {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        {renderStats()}
                        {renderFilters()}
                        {renderGrid()}
                    </div>
                );
            case 'incubator':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl text-white">
                            <h2 className="text-2xl font-bold mb-2">🧪 Idea Incubator</h2>
                            <p>Raw thoughts brewing into tomorrow's breakthroughs</p>
                        </div>
                        <div className="grid gap-4">
                            <button className="w-full border-2 border-dashed border-gray-300 hover:border-purple-500 rounded-xl p-6 text-gray-600 hover:text-purple-600 transition-colors flex flex-col items-center">
                                <Plus className="w-8 h-8 mb-2" />
                                <p className="font-semibold">Add New Idea</p>
                                <p className="text-sm">Let your creativity ferment...</p>
                            </button>

                            {mockIdeas.map(idea => (
                                <div key={idea.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{idea.title}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-300">by {idea.author} • {idea.date}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="flex items-center gap-2 text-blue-600"><ThumbsUp className="w-4 h-4" />{idea.upvotes}</button>
                                            <button className="flex items-center gap-2 text-green-600"><MessageCircle className="w-4 h-4" />{idea.comments}</button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{idea.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'visuals':
                return renderVisuals();

            case 'journal':
                return (
                    <div className="space-y-4">
                        {mockJournalEntries.map(e => (
                            <div key={e.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-full ${e.type === 'breakthrough' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {e.type === 'breakthrough' ? <Flame className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{e.title}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-300">{e.project} • {e.version}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-300">{e.date}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mt-3">{e.content}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'collaboration':
                return (
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                            <h3 className="font-semibold mb-3">Active Collaborators</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {['Kenshi', 'Anashritam', 'Wild Koyote'].map((name, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">{name.split(' ').map(s => s[0]).join('')}</div>
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">{name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">Active on {Math.floor(Math.random() * 3) + 1} projects</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                            <h3 className="font-semibold mb-3">Open Research Invitations</h3>
                            <div className="space-y-3">
                                <div className="border rounded p-3 dark:border-slate-700">
                                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">Quantum ML Expert Needed</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Looking for collaboration on quantum-classical hybrid algorithms</p>
                                </div>
                                <div className="border rounded p-3 dark:border-slate-700">
                                    <h4 className="font-semibold text-purple-600 dark:text-purple-400">Data Visualization Partner</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Seeking creative minds for research data storytelling</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'publications':
                return (
                    <div className="space-y-4">
                        {mockPublications.map(pub => (
                            <div key={pub.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{pub.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-300">{pub.journal} • {pub.year}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm mb-2">{pub.citations} citations</div>
                                        <button className="flex items-center gap-2 text-green-600 dark:text-green-400" onClick={() => alert('Downloading (demo)')}><Download className="w-4 h-4" />Download</button>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-700 rounded p-3 mt-3">
                                    <h4 className="font-semibold">📝 Distilled Summary</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-200">{pub.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'wall':
                return (
                    <div className="space-y-4">
                        <div className="bg-gray-900 dark:bg-slate-900 rounded-xl p-4 text-white overflow-hidden" style={{ height: 360 }}>
                            <div className="relative w-full h-full">
                                {/* subtle background animated bubbles (CSS-driven) */}
                                <div className="absolute inset-0 opacity-40" aria-hidden>
                                    <div className="animate-[float_8s_ease-in-out_infinite] w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full absolute left-10 top-12 opacity-60 mix-blend-screen" />
                                    <div className="animate-[float_10s_ease-in-out_infinite] w-28 h-28 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full absolute right-16 top-20 opacity-50 mix-blend-screen" />
                                </div>

                                <div className="relative z-10 p-4 flex items-center justify-center h-full">
                                    <div className="grid grid-cols-3 gap-8">
                                        {mockProjects.map((project, idx) => (
                                            <div key={project.id} className="flex flex-col items-center">
                                                <div onClick={() => openProject(project)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') openProject(project) }} className={`w-20 h-20 rounded-full ${getStatusColor(project.status)} flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition cursor-pointer`}>
                                                    {project.title.split(' ').slice(0, 2).map(w => w[0]).join('')}
                                                </div>
                                                <div className="mt-3 text-white text-sm text-center">{project.title.split(' ').slice(0, 2).join(' ')}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'tasting':
                return (
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                            <h3 className="font-semibold">🗳️ Current Poll: Next Research Priority</h3>
                            {[{ option: 'AI Ethics in Research', votes: 34, percentage: 45 }, { option: 'Climate Change Solutions', votes: 28, percentage: 37 }, { option: 'Quantum Internet Protocols', votes: 14, percentage: 18 }].map((poll, idx) => (
                                <div key={idx} className="border rounded p-3 my-2 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer">
                                    <div className="flex justify-between"><span className="font-medium">{poll.option}</span><span className="text-sm text-gray-500">{poll.votes} votes</span></div>
                                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                                        <div style={{ width: `${poll.percentage}%` }} className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
                                    </div>
                                </div>
                            ))}
                            <button className="mt-3 w-full bg-pink-600 text-white py-2 rounded-md">Cast Your Vote</button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                                <h4 className="font-semibold mb-3">🏆 Community Achievements</h4>
                                <div className="space-y-2">
                                    {[{ badge: 'Master Brewer', user: 'Dr. Sarah Chen', desc: 'Contributed to 5+ projects' }, { badge: 'Idea Catalyst', user: 'Alex Kim', desc: 'Top idea contributor this month' }].map((a, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                                            <Award className="w-6 h-6 text-yellow-600" />
                                            <div>
                                                <p className="font-semibold text-yellow-800">{a.badge}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{a.user} • {a.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border dark:border-slate-700 shadow-sm">
                                <h4 className="font-semibold mb-3">🔥 Trending Topics</h4>
                                <div className="space-y-2">
                                    {[{ topic: 'Quantum Machine Learning', heat: 95 }, { topic: 'Sustainable Computing', heat: 78 }].map((t, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-2">
                                            <span className="font-medium">{t.topic}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${t.heat}%` }} /></div>
                                                <span className="text-sm text-gray-500">{t.heat}°</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default: return null;
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-300 dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-800 p-4 sm:p-6">
            {renderHeader()}
            {/* tabs */}
            <div className="max-w-7xl mx-auto mt-4 bg-white dark:bg-slate-900 rounded-lg overflow-x-auto border dark:border-slate-700">
                <div className="flex space-x-1 p-2">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 py-2 rounded-md whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                            {tab.icon}
                            <span className="text-sm font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-6">
                {/* {bannerVisible && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3 rounded mb-4 flex items-center justify-between">
                        <div>
                            <strong>Note:</strong> This section is under active development — core features will roll out progressively.
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => setBannerVisible(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700"><X className="w-4 h-4" /></button>
                        </div>
                    </div>
                )} */}

                <div className='my-5'>
                    <DevBanner />
                </div>


                <div className="space-y-6">
                    {renderContent()}
                </div>
            </div>

            {/* floating status */}
            <div className="fixed bottom-6 right-6 bg-white dark:bg-slate-900 rounded-full shadow-lg p-3 border dark:border-slate-700">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">Brewery Active</span>
                </div>
            </div>

            {/* modal */}
            <Modal open={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject?.title}>
                {selectedProject && (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{selectedProject.abstract}</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedProject.tags.map(t => <span key={t} className="px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-sm">{t}</span>)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                            <span>Started: {selectedProject.startDate}</span>
                            <span>Collaborators: {selectedProject.collaborators}</span>
                            <span>Status: <StatusPill status={selectedProject.status} /></span>
                        </div>
                        <div className="mt-3 flex gap-2">
                            <button className="px-3 py-2 bg-blue-600 text-white rounded-md" onClick={() => alert('Open editor (demo)')}>Open</button>
                            <button className="px-3 py-2 border rounded-md" onClick={() => exportToCSV('project_' + selectedProject.id + '.csv', [selectedProject])}><Download className="w-4 h-4 inline mr-2" />Export</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

