import React, { useState, useEffect } from 'react';
import {
    Beaker, TestTube, BarChart3, Users, Calendar, Filter,
    Plus, ThumbsUp, MessageCircle, Download, Trophy,
    BookOpen, Eye, Clock, ChevronDown, Lightbulb,
    GitBranch, Share2, Target, Award, Flame, Star
} from 'lucide-react';
import * as d3 from 'd3';

// Mock data
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

// D3.js Chart Components
const D3LineChart = ({ data, width = 400, height = 300 }) => {
    const chartRef = React.useRef();

    React.useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.month))
            .range([0, innerWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => Math.max(d.projects, d.ideas))])
            .range([innerHeight, 0]);

        const line = d3.line()
            .x(d => xScale(d.month) + xScale.bandwidth() / 2)
            .y(d => yScale(d.projects))
            .curve(d3.curveMonotoneX);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add axes
        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        g.append("g")
            .call(d3.axisLeft(yScale));

        // Add line
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#3B82F6")
            .attr("stroke-width", 3)
            .attr("d", line);

        // Add dots
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.month) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.projects))
            .attr("r", 4)
            .attr("fill", "#3B82F6");

    }, [data, width, height]);

    return <svg ref={chartRef} width={width} height={height}></svg>;
};

const D3BarChart = ({ data, width = 400, height = 300 }) => {
    const chartRef = React.useRef();

    React.useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = d3.scaleBand()
            .domain(data.map(d => d.month))
            .range([0, innerWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.publications)])
            .range([innerHeight, 0]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Add axes
        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        g.append("g")
            .call(d3.axisLeft(yScale));

        // Add bars
        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.month))
            .attr("width", xScale.bandwidth())
            .attr("y", d => yScale(d.publications))
            .attr("height", d => innerHeight - yScale(d.publications))
            .attr("fill", "#8B5CF6");

    }, [data, width, height]);

    return <svg ref={chartRef} width={width} height={height}></svg>;
};

const ResearchBrewery = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [animatedIdeas, setAnimatedIdeas] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            alert("This section is currently under development. Core Development will start in Q2 2026");
        }, 1000);
    }, []);

    // Simulated brewing animation
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimatedIdeas(prev => {
                const newIdeas = [...prev];
                if (Math.random() > 0.7) {
                    newIdeas.push({
                        id: Date.now(),
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        size: Math.random() * 20 + 10
                    });
                }
                return newIdeas.filter(idea => idea.size > 5).map(idea => ({
                    ...idea,
                    y: idea.y - 0.5,
                    size: idea.size * 0.99
                }));
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'brewing': return 'bg-amber-500';
            case 'fermenting': return 'bg-blue-500';
            case 'distilled': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'brewing': return <Beaker className="w-4 h-4" />;
            case 'fermenting': return <TestTube className="w-4 h-4" />;
            case 'distilled': return <Trophy className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const filteredProjects = mockProjects.filter(project => {
        const matchesField = selectedFilter === 'all' || project.field === selectedFilter;
        const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
        return matchesField && matchesStatus;
    });

    const tabs = [
        { id: 'dashboard', label: 'Brewing Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'incubator', label: 'Idea Incubator', icon: <Lightbulb className="w-4 h-4" /> },
        { id: 'journal', label: 'Brew Journal', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'collaboration', label: 'Collaboration Corner', icon: <Users className="w-4 h-4" /> },
        { id: 'visuals', label: 'Data Distillery', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'distillery', label: 'Knowledge Distillery', icon: <TestTube className="w-4 h-4" /> },
        { id: 'publications', label: 'Publication Shelf', icon: <Trophy className="w-4 h-4" /> },
        { id: 'wall', label: 'Interactive Wall', icon: <Target className="w-4 h-4" /> },
        { id: 'tasting', label: 'Community Tasting', icon: <Star className="w-4 h-4" /> }
    ];

    const renderDashboard = () => (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-amber-100">Brewing</p>
                            <p className="text-2xl font-bold">{mockProjects.filter(p => p.status === 'brewing').length}</p>
                        </div>
                        <Beaker className="w-8 h-8 text-amber-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100">Fermenting</p>
                            <p className="text-2xl font-bold">{mockProjects.filter(p => p.status === 'fermenting').length}</p>
                        </div>
                        <TestTube className="w-8 h-8 text-blue-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100">Distilled</p>
                            <p className="text-2xl font-bold">{mockProjects.filter(p => p.status === 'distilled').length}</p>
                        </div>
                        <Trophy className="w-8 h-8 text-green-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100">Ideas</p>
                            <p className="text-2xl font-bold">{mockIdeas.length}</p>
                        </div>
                        <Lightbulb className="w-8 h-8 text-purple-200" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Fields</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Physics">Physics</option>
                    <option value="Software Engineering">Software Engineering</option>
                </select>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Status</option>
                    <option value="brewing">Brewing</option>
                    <option value="fermenting">Fermenting</option>
                    <option value="distilled">Distilled</option>
                </select>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                    <div key={project.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                        <div className={`h-2 ${getStatusColor(project.status)}`}></div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{project.title}</h3>
                                <div className={`flex items-center px-2 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
                                    {getStatusIcon(project.status)}
                                    <span className="ml-1 capitalize">{project.status}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.abstract}</p>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Progress</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${getStatusColor(project.status)}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Started: {project.startDate}</span>
                                    <span>{project.collaborators} collaborators</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderIncubator = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2">🧪 Idea Incubator</h2>
                <p>Raw thoughts brewing into tomorrow's breakthroughs</p>
            </div>

            <button className="w-full border-2 border-dashed border-gray-300 hover:border-purple-500 rounded-xl p-6 text-gray-600 hover:text-purple-600 transition-colors">
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Add New Idea</p>
                <p className="text-sm">Let your creativity ferment...</p>
            </button>

            <div className="grid gap-6">
                {mockIdeas.map(idea => (
                    <div key={idea.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="font-bold text-lg text-gray-800">{idea.title}</h3>
                            <span className="text-xs text-gray-500">{idea.date}</span>
                        </div>
                        <p className="text-gray-600 mb-4">{idea.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                            {idea.tags.map(tag => (
                                <span key={tag} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{idea.upvotes}</span>
                                </button>
                                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>{idea.comments}</span>
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">by {idea.author}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderJournal = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2">📖 Research Brew Journal</h2>
                <p>Document your research journey, one experiment at a time</p>
            </div>

            <div className="space-y-4">
                {mockJournalEntries.map(entry => (
                    <div key={entry.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-full ${entry.type === 'breakthrough' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {entry.type === 'breakthrough' ? <Flame className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">{entry.title}</h3>
                                    <p className="text-sm text-gray-500">{entry.project} • {entry.version}</p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">{entry.date}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{entry.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCollaboration = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2">🤝 Collaboration Corner</h2>
                <p>Where great minds brew together</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        Active Collaborators
                    </h3>
                    <div className="space-y-3">
                        {['Kenshi', 'Anashritam', 'Wild Koyote'].map((name, idx) => (
                            <div key={idx} className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-semibold">{name}</p>
                                    <p className="text-sm text-gray-500">Active on {Math.floor(Math.random() * 3) + 1} projects</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Share2 className="w-5 h-5 mr-2 text-green-600" />
                        Open Research Invitations
                    </h3>
                    <div className="space-y-3">
                        <div className="border border-gray-200 rounded-lg p-3">
                            <h4 className="font-semibold text-blue-600">Quantum ML Expert Needed</h4>
                            <p className="text-sm text-gray-600">Looking for collaboration on quantum-classical hybrid algorithms</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-3">
                            <h4 className="font-semibold text-purple-600">Data Visualization Partner</h4>
                            <p className="text-sm text-gray-600">Seeking creative minds for research data storytelling</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderVisuals = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2">📊 Data Distillery</h2>
                <p>Where raw data transforms into insights</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Research Activity Over Time</h3>
                    <D3LineChart data={mockChartData} width={400} height={300} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Publications by Month</h3>
                    <D3BarChart data={mockChartData} width={400} height={300} />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4">Dataset Gallery</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {['Neural Network Training Data', 'Quantum Simulation Results', 'Algorithm Performance Metrics'].map((dataset, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h4 className="font-semibold mb-2">{dataset}</h4>
                            <p className="text-sm text-gray-600 mb-3">Updated {Math.floor(Math.random() * 30)} days ago</p>
                            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                                <Download className="w-4 h-4" />
                                <span>Download</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderDistillery = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2">🥃 Knowledge Distillery</h2>
                <p>Complex research, distilled for everyone</p>
            </div>

            <div className="grid gap-6">
                {mockProjects.filter(p => p.status === 'distilled').map(project => (
                    <div key={project.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="font-bold text-xl text-gray-800">{project.title}</h3>
                            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                Fully Distilled
                            </div>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                            <h4 className="font-semibold text-green-800 mb-2">🍯 Distilled Essence</h4>
                            <p className="text-green-700">
                                This research has been carefully distilled to show that {project.title.toLowerCase()}
                                represents a breakthrough in understanding complex systems through computational approaches.
                                The findings suggest new pathways for innovation in the field.
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>🧪 Brewing time: {Math.floor(Math.random() * 200 + 100)} days</span>
                            <span>🎯 Impact score: {Math.floor(Math.random() * 50 + 50)}/100</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderPublications = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2">📚 Publication Shelf</h2>
                <p>The finest vintages of research, ready to serve</p>
            </div>

            <div className="grid gap-6">
                {mockPublications.map(pub => (
                    <div key={pub.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="font-bold text-xl text-gray-800 mb-2">{pub.title}</h3>
                                <p className="text-gray-600 font-medium">{pub.journal} • {pub.year}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                                    {pub.citations} citations
                                </div>
                                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                                    <Download className="w-4 h-4" />
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">📝 Distilled Summary</h4>
                            <p className="text-gray-700">{pub.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderInteractiveWall = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2">🎨 Interactive Brewery Wall</h2>
                <p>Watch ideas bubble up and connect in real-time</p>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 relative overflow-hidden" style={{ height: '400px' }}>
                {/* Animated background bubbles */}
                {animatedIdeas.map(idea => (
                    <div
                        key={idea.id}
                        className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60"
                        style={{
                            left: `${idea.x}%`,
                            top: `${idea.y}%`,
                            width: `${idea.size}px`,
                            height: `${idea.size}px`,
                            transition: 'all 0.1s ease-out'
                        }}
                    />
                ))}

                {/* Project nodes */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-8">
                        {mockProjects.map((project, idx) => (
                            <div key={project.id} className="relative">
                                <div className={`w-20 h-20 rounded-full ${getStatusColor(project.status)} flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform cursor-pointer`}>
                                    {getStatusIcon(project.status)}
                                </div>
                                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-white text-xs text-center">
                                    <p className="font-semibold">{project.title.split(' ').slice(0, 2).join(' ')}</p>
                                </div>
                                {/* Connection lines */}
                                {idx < mockProjects.length - 1 && (
                                    <div className="absolute top-10 left-20 w-8 h-0.5 bg-gray-400"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCommunityTasting = () => (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 rounded-xl text-white">
                <h2 className="text-2xl font-bold mb-2">🍷 Community Tasting Sessions</h2>
                <p>Help shape the future of research through community feedback</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4">🗳️ Current Poll: Next Research Priority</h3>
                <div className="space-y-4">
                    {[
                        { option: 'AI Ethics in Research', votes: 34, percentage: 45 },
                        { option: 'Climate Change Solutions', votes: 28, percentage: 37 },
                        { option: 'Quantum Internet Protocols', votes: 14, percentage: 18 }
                    ].map((poll, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{poll.option}</span>
                                <span className="text-sm text-gray-600">{poll.votes} votes</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${poll.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    Cast Your Vote
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🏆 Community Achievements</h3>
                    <div className="space-y-3">
                        {[
                            { badge: 'Master Brewer', user: 'Dr. Sarah Chen', desc: 'Contributed to 5+ projects' },
                            { badge: 'Idea Catalyst', user: 'Alex Kim', desc: 'Top idea contributor this month' },
                            { badge: 'Data Sommelier', user: 'Prof. Torres', desc: 'Expert in data visualization' }
                        ].map((achievement, idx) => (
                            <div key={idx} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                                <Award className="w-8 h-8 text-yellow-600" />
                                <div>
                                    <p className="font-semibold text-yellow-800">{achievement.badge}</p>
                                    <p className="text-sm text-gray-600">{achievement.user} • {achievement.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-lg mb-4">🔥 Trending Topics</h3>
                    <div className="space-y-2">
                        {[
                            { topic: 'Quantum Machine Learning', heat: 95 },
                            { topic: 'Sustainable Computing', heat: 78 },
                            { topic: 'Neural Architecture Search', heat: 65 },
                            { topic: 'Blockchain Research', heat: 45 }
                        ].map((topic, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2">
                                <span className="font-medium">{topic.topic}</span>
                                <div className="flex items-center space-x-2">
                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                                            style={{ width: `${topic.heat}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600">{topic.heat}°</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return renderDashboard();
            case 'incubator': return renderIncubator();
            case 'journal': return renderJournal();
            case 'collaboration': return renderCollaboration();
            case 'visuals': return renderVisuals();
            case 'distillery': return renderDistillery();
            case 'publications': return renderPublications();
            case 'wall': return renderInteractiveWall();
            case 'tasting': return renderCommunityTasting();
            default: return renderDashboard();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-white shadow-lg border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
                                <Beaker className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">Kenshi Research Brewery</h1>
                                <p className="text-sm text-gray-600">Where Ideas Ferment Into Innovation</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>Last brew: 2 hours ago</span>
                            </div>
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                                <Plus className="w-4 h-4 inline mr-2" />
                                New Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.icon}
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </div>

            {/* Floating Brew Status */}
            <div className="fixed bottom-6 right-6 bg-white rounded-full shadow-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Brewery Active</span>
                </div>
            </div>
        </div>
    );
};

export default ResearchBrewery;