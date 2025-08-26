import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye,
    Check,
    X,
    Clock,
    MessageSquare,
    User,
    Calendar,
    Filter,
    RefreshCw,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';

export default function ReviewPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [actionLoading, setActionLoading] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [articleToReject, setArticleToReject] = useState(null);

    useEffect(() => {
        fetchPendingArticles();
    }, []);

    async function fetchPendingArticles() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/admin/pending-articles');
            if (!res.ok) throw new Error('Failed to load pending articles');
            const data = await res.json();
            setArticles(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong');
            // Fallback demo content
            setArticles([
                {
                    id: 'pending-1',
                    title: 'Building Scalable Web Applications with React and Node.js',
                    excerpt: 'A comprehensive guide to building modern web applications that can handle growth and scale effectively. This covers architecture patterns, performance optimization, and deployment strategies.',
                    status: 'pending',
                    cover: null,
                    content: '# Building Scalable Web Applications\n\nScalability is crucial for modern web applications...\n\n## Architecture Patterns\n\n- Microservices\n- Event-driven architecture\n- CQRS pattern\n\n## Performance Optimization\n\n- Code splitting\n- Lazy loading\n- Caching strategies',
                    readTime: 8,
                    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    author: {
                        name: 'Sarah Chen',
                        avatar: null,
                        email: 'sarah@example.com'
                    },
                    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    priority: 'high'
                },
                {
                    id: 'pending-2',
                    title: 'The Future of AI in Web Development',
                    excerpt: 'Exploring how artificial intelligence is transforming the way we build websites and web applications, from automated testing to intelligent code generation.',
                    status: 'pending',
                    cover: null,
                    content: '# AI in Web Development\n\nArtificial Intelligence is revolutionizing web development...\n\n## Current Applications\n\n- Code completion\n- Bug detection\n- Performance optimization\n\n## Future Possibilities\n\n- Automated UI generation\n- Smart debugging\n- Predictive scaling',
                    readTime: 6,
                    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    author: {
                        name: 'Alex Rodriguez',
                        avatar: null,
                        email: 'alex@example.com'
                    },
                    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    priority: 'medium'
                },
                {
                    id: 'approved-1',
                    title: 'CSS Grid Layout Mastery',
                    excerpt: 'Master CSS Grid with this comprehensive guide covering everything from basic concepts to advanced layout techniques.',
                    status: 'approved',
                    cover: null,
                    content: '# CSS Grid Layout\n\nCSS Grid is a powerful layout system...',
                    readTime: 5,
                    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    author: {
                        name: 'Maria Lopez',
                        avatar: null,
                        email: 'maria@example.com'
                    },
                    submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                    approvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    priority: 'low'
                },
                {
                    id: 'rejected-1',
                    title: 'Quick React Tips',
                    excerpt: 'Some quick tips for React development that might be useful.',
                    status: 'rejected',
                    cover: null,
                    content: '# React Tips\n\n- Use hooks\n- Keep components small',
                    readTime: 2,
                    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
                    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                    author: {
                        name: 'John Doe',
                        avatar: null,
                        email: 'john@example.com'
                    },
                    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    rejectedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                    rejectionReason: 'Content too brief and lacks depth. Please expand with more detailed examples and explanations.',
                    priority: 'low'
                }
            ]);
        } finally {
            setLoading(false);
        }
    }

    function filtered() {
        return articles
            .filter(a => filter === 'all' ? true : a.status === filter)
            .filter(a =>
                a.title.toLowerCase().includes(query.toLowerCase()) ||
                (a.excerpt || '').toLowerCase().includes(query.toLowerCase()) ||
                a.author.name.toLowerCase().includes(query.toLowerCase())
            );
    }

    async function handleApprove(id) {
        setActionLoading(id);
        try {
            const res = await fetch(`/api/admin/articles/${id}/approve`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error('Approval failed');

            setArticles(prev => prev.map(a =>
                a.id === id
                    ? { ...a, status: 'approved', approvedAt: new Date().toISOString() }
                    : a
            ));
        } catch (err) {
            alert('Could not approve: ' + (err.message || err));
        } finally {
            setActionLoading(null);
        }
    }

    async function handleReject(id, reason) {
        setActionLoading(id);
        try {
            const res = await fetch(`/api/admin/articles/${id}/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason })
            });
            if (!res.ok) throw new Error('Rejection failed');

            setArticles(prev => prev.map(a =>
                a.id === id
                    ? {
                        ...a,
                        status: 'rejected',
                        rejectedAt: new Date().toISOString(),
                        rejectionReason: reason
                    }
                    : a
            ));
            setShowRejectDialog(false);
            setRejectReason('');
            setArticleToReject(null);
        } catch (err) {
            alert('Could not reject: ' + (err.message || err));
        } finally {
            setActionLoading(null);
        }
    }

    function openPreview(article) {
        setSelectedArticle(article);
        setPreviewOpen(true);
    }

    function openRejectDialog(article) {
        setArticleToReject(article);
        setShowRejectDialog(true);
    }

    function getPriorityColor(priority) {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    }

    function getStatusIcon(status) {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-500" />;
            default: return <Clock className="w-4 h-4" />;
        }
    }

    const multilineClamp = (lines = 3) => ({
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    });

    const pendingCount = articles.filter(a => a.status === 'pending').length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 py-10 px-4 sm:px-8 lg:px-16"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
                            Admin Review Dashboard
                            {pendingCount > 0 && (
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                                >
                                    {pendingCount} pending
                                </motion.div>
                            )}
                        </h1>
                        <p className="text-gray-300 mt-1 max-w-xl">
                            Review and manage article submissions. Approve quality content or provide feedback for improvements.
                        </p>
                    </div>

                    <div className="w-full sm:w-auto flex gap-3 items-center">
                        <div className="w-full sm:w-80">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by title, content, or author..."
                                className="bg-white/6 text-white placeholder:text-gray-300"
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={fetchPendingArticles}
                            className="flex items-center gap-2"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </Button>
                    </div>
                </div>

                <Card className="rounded-3xl bg-white/6 border border-white/20 backdrop-blur p-4">
                    <CardContent className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:block">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src="/admin-avatar.png" alt="Admin" />
                                        <AvatarFallback className="bg-indigo-600">AD</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-300">Role</div>
                                    <div className="font-semibold text-white">Administrator</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Tabs defaultValue="all" onValueChange={(v) => setFilter(v)} className="bg-white/5 rounded-full p-1">
                                    <TabsList className="flex gap-1">
                                        <TabsTrigger value="all" className="px-3 py-1 rounded-full">
                                            All
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="pending"
                                            className="px-3 py-1 rounded-full flex items-center gap-2"
                                        >
                                            <Clock size={14} />
                                            Pending ({articles.filter(a => a.status === 'pending').length})
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="approved"
                                            className="px-3 py-1 rounded-full flex items-center gap-2"
                                        >
                                            <CheckCircle size={14} />
                                            Approved
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="rejected"
                                            className="px-3 py-1 rounded-full flex items-center gap-2"
                                        >
                                            <AlertTriangle size={14} />
                                            Rejected
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>

                        <Separator className="bg-white/10" />

                        <AnimatePresence mode="wait">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {loading ? (
                                    <div className="col-span-full py-20 text-center text-gray-300">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"
                                        />
                                        Loading articles for review...
                                    </div>
                                ) : filtered().length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-20 text-center text-gray-300"
                                    >
                                        {filter === 'pending' ?
                                            'No pending articles to review.' :
                                            `No ${filter} articles found.`
                                        }
                                    </motion.div>
                                ) : (
                                    filtered().map((article, index) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ translateY: -6 }}
                                            className="rounded-2xl h-full"
                                        >
                                            <Card className="p-0 overflow-hidden rounded-2xl bg-gradient-to-br from-white/3 to-white/6 border border-white/10 h-full flex flex-col">
                                                {/* Priority indicator and cover */}
                                                <div className="h-36 w-full flex-shrink-0 overflow-hidden bg-slate-700 relative">
                                                    <div className={`absolute top-3 left-3 w-3 h-3 rounded-full ${getPriorityColor(article.priority)} z-10`} />
                                                    {article.cover ? (
                                                        <img src={article.cover} alt={article.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
                                                            <span className="text-white text-sm font-semibold">
                                                                {article.status === 'pending' ? 'Pending Review' :
                                                                    article.status === 'approved' ? 'Approved' : 'Rejected'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-4 flex-1 flex flex-col">
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between gap-2 mb-2">
                                                            <h3 className="text-white font-semibold text-lg flex-1" style={{ ...multilineClamp(2) }}>
                                                                {article.title}
                                                            </h3>
                                                            {getStatusIcon(article.status)}
                                                        </div>

                                                        <p className="text-gray-300 text-sm mb-3" style={{ ...multilineClamp(3) }}>
                                                            {article.excerpt || 'No description provided.'}
                                                        </p>

                                                        {/* Author info */}
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Avatar className="w-6 h-6">
                                                                <AvatarImage src={article.author.avatar} />
                                                                <AvatarFallback className="text-xs bg-gray-600">
                                                                    {article.author.name.split(' ').map(n => n[0]).join('')}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="text-xs text-gray-400">
                                                                by <span className="text-gray-300">{article.author.name}</span>
                                                            </div>
                                                        </div>

                                                        {/* Rejection reason for rejected articles */}
                                                        {article.status === 'rejected' && article.rejectionReason && (
                                                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 mb-3">
                                                                <div className="text-xs text-red-300 font-medium mb-1">Rejection Reason:</div>
                                                                <div className="text-xs text-red-200" style={{ ...multilineClamp(2) }}>
                                                                    {article.rejectionReason}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-3">
                                                        {/* Meta info */}
                                                        <div className="flex items-center justify-between text-xs text-gray-400">
                                                            <div className="flex items-center gap-3">
                                                                <span>{article.readTime} min read</span>
                                                                <span>• {new Date(article.submittedAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <Badge className={`px-2 py-1 text-xs ${article.priority === 'high' ? 'bg-red-600' :
                                                                article.priority === 'medium' ? 'bg-yellow-500 text-black' :
                                                                    'bg-green-600'
                                                                }`}>
                                                                {article.priority} priority
                                                            </Badge>
                                                        </div>

                                                        {/* Action buttons */}
                                                        <div className="flex items-center gap-1">
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => openPreview(article)}
                                                                        >
                                                                            <Eye size={14} />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>Preview Article</TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>

                                                            {article.status === 'pending' && (
                                                                <>
                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => handleApprove(article.id)}
                                                                                    disabled={actionLoading === article.id}
                                                                                    className="text-green-400 hover:bg-green-400/10"
                                                                                >
                                                                                    {actionLoading === article.id ?
                                                                                        <motion.div
                                                                                            animate={{ rotate: 360 }}
                                                                                            transition={{ repeat: Infinity, duration: 1 }}
                                                                                        >
                                                                                            <RefreshCw size={14} />
                                                                                        </motion.div> :
                                                                                        <Check size={14} />
                                                                                    }
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>Approve Article</TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>

                                                                    <TooltipProvider>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => openRejectDialog(article)}
                                                                                    disabled={actionLoading === article.id}
                                                                                    className="text-red-400 hover:bg-red-400/10"
                                                                                >
                                                                                    <X size={14} />
                                                                                </Button>
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>Reject Article</TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </AnimatePresence>

                        <div className="pt-4 flex items-center justify-between">
                            <div className="text-xs text-gray-400">
                                Showing {filtered().length} of {articles.length} articles
                            </div>
                            <div className="text-xs text-gray-400">
                                Last updated: {new Date().toLocaleString()}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Preview Dialog */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-4xl w-full sm:mx-4">
                    <DialogHeader>
                        <DialogTitle className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="text-lg font-semibold mb-1">{selectedArticle?.title}</div>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <User size={14} />
                                        {selectedArticle?.author.name}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        {selectedArticle ? new Date(selectedArticle.submittedAt).toLocaleDateString() : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge className={`${selectedArticle?.status === 'pending' ? 'bg-yellow-600' :
                                    selectedArticle?.status === 'approved' ? 'bg-green-600' :
                                        'bg-red-600'
                                    }`}>
                                    {selectedArticle?.status}
                                </Badge>
                                <div className="text-sm text-gray-400">{selectedArticle?.readTime} min read</div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-4">
                        <ScrollArea className="h-96 p-4 bg-white/5 rounded-lg border border-white/10">
                            {selectedArticle ? (
                                <div className="prose prose-invert max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                                        {selectedArticle.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <div className="text-gray-300">No preview available</div>
                            )}
                        </ScrollArea>
                    </div>

                    <DialogFooter>
                        <div className="flex items-center justify-between w-full">
                            <Button variant="ghost" onClick={() => setPreviewOpen(false)}>
                                Close
                            </Button>
                            {selectedArticle?.status === 'pending' && (
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            openRejectDialog(selectedArticle);
                                            setPreviewOpen(false);
                                        }}
                                        className="text-red-400 border-red-400/20 hover:bg-red-400/10"
                                    >
                                        <X size={16} className="mr-2" />
                                        Reject
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleApprove(selectedArticle.id);
                                            setPreviewOpen(false);
                                        }}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <Check size={16} className="mr-2" />
                                        Approve
                                    </Button>
                                </div>
                            )}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-red-400">Reject Article</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <p className="text-sm text-gray-300">
                            Please provide a reason for rejecting "{articleToReject?.title}". This will help the author improve their submission.
                        </p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Explain why this article needs improvement..."
                            className="w-full h-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-400 resize-none"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setShowRejectDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleReject(articleToReject?.id, rejectReason)}
                            disabled={!rejectReason.trim() || actionLoading === articleToReject?.id}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {actionLoading === articleToReject?.id ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="mr-2"
                                >
                                    <RefreshCw size={16} />
                                </motion.div>
                            ) : (
                                <X size={16} className="mr-2" />
                            )}
                            Reject Article
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}