import React, { useEffect, useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@clerk/clerk-react';
import { getPendingReviewPosts, updatePostReview } from '../services/GlobalApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
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
    const [remarkDraft, setRemarkDraft] = useState('');
    const [openRejectAfterPreview, setOpenRejectAfterPreview] = useState(false);
    const rejectReasonRef = useRef(null);
    const { getToken } = useAuth();

    useEffect(() => {
        fetchPendingArticles();
    }, []);

    useEffect(() => {
        if (!previewOpen && openRejectAfterPreview) {
            setOpenRejectAfterPreview(false);
            setShowRejectDialog(true);
        }
    }, [previewOpen, openRejectAfterPreview]);

    async function fetchPendingArticles() {
        setLoading(true);
        setError(null);
        try {
            const token = await getToken();
            const response = await getPendingReviewPosts(token);
            const posts = response.data.posts || [];
            setArticles(posts.map(post => ({
                ...post,
                status: 'pending',
                cover: post.coverImage || post.thumbnail,
                submittedAt: post.createdAt,
                priority: 'medium',
                author: {
                    name: [post.author?.firstName, post.author?.lastName].filter(Boolean).join(' ') || 'Unknown author',
                    avatar: post.author?.profile?.image || post.authorImage,
                    email: post.author?.email || ''
                }
            })));
        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong');
            setArticles([]);
        } finally {
            setLoading(false);
        }
    }

    function filtered() {
        const normalizedQuery = query.toLowerCase();
        return articles
            .filter(article => filter === 'all' || article.status === filter)
            .filter(article =>
                article.title.toLowerCase().includes(normalizedQuery) ||
                (article.excerpt || '').toLowerCase().includes(normalizedQuery) ||
                article.author.name.toLowerCase().includes(normalizedQuery)
            );
    }

    async function handleApprove(id, adminRemark) {
        setActionLoading(id);
        try {
            const token = await getToken();
            await updatePostReview(id, {
                status: 'published',
                ...(adminRemark !== undefined ? { adminRemark } : {})
            }, token);
            setArticles(prev => prev.filter(article => article.id !== id));
            setPreviewOpen(false);
        } catch (err) {
            alert('Could not approve: ' + (err.message || err));
        } finally {
            setActionLoading(null);
        }
    }

    async function handleReject(id, reason) {
        setActionLoading(id);
        try {
            const token = await getToken();
            await updatePostReview(id, { status: 'rejected', adminRemark: reason }, token);
            setArticles(prev => prev.filter(article => article.id !== id));
            setShowRejectDialog(false);
            setRejectReason('');
            setArticleToReject(null);
        } catch (err) {
            alert('Could not reject: ' + (err.message || err));
        } finally {
            setActionLoading(null);
        }
    }

    async function handleSaveRemark(id) {
        setActionLoading(id);
        try {
            const token = await getToken();
            await updatePostReview(id, { adminRemark: remarkDraft }, token);
            setArticles(prev => prev.map(article => article.id === id ? { ...article, adminRemark: remarkDraft } : article));
            setSelectedArticle(prev => prev?.id === id ? { ...prev, adminRemark: remarkDraft } : prev);
        } catch (err) {
            alert('Could not save remark: ' + (err.message || err));
        } finally {
            setActionLoading(null);
        }
    }

    function openPreview(article) {
        setSelectedArticle(article);
        setRemarkDraft(article.adminRemark || '');
        setPreviewOpen(true);
    }

    function openRejectDialog(article, closePreview = false) {
        setArticleToReject(article);
        setRejectReason('');
        if (closePreview) {
            setOpenRejectAfterPreview(true);
            setPreviewOpen(false);
        } else {
            setShowRejectDialog(true);
        }
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
            className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 dark:via-purple-950 dark:to-slate-950 py-10 px-4 sm:px-8 lg:px-16"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
                            Admin Review Dashboard
                            {pendingCount > 0 && (
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="bg-red-500 text-white text-sm px-2 py-1 line-clamp-1 rounded-full"
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
                                <div className="block">
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
                                <Tabs defaultValue="all" onValueChange={(v) => setFilter(v)} className="bg-white/5 rounded-full p-1 overflow-auto">
                                    <TabsList className="flex gap-1">
                                        <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white px-3 py-1 rounded-full">
                                            All
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="pending"
                                            className="data-[state=active]:bg-black data-[state=active]:text-white px-3 py-1 rounded-full flex items-center gap-2"
                                        >
                                            <Clock size={14} />
                                            Pending ({articles.filter(a => a.status === 'pending').length})
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
                                ) : error ? (
                                    <div className="col-span-full py-20 text-center text-red-200">
                                        <p>{error}</p>
                                        <Button variant="outline" onClick={fetchPendingArticles} className="mt-4">Try again</Button>
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

                                                        {article.adminRemark && (
                                                            <div className="bg-white/5 border border-white/10 rounded-lg p-2 mb-3">
                                                                <div className="text-xs text-gray-300 font-medium mb-1">Saved admin remark</div>
                                                                <div className="text-xs text-gray-200" style={{ ...multilineClamp(2) }}>
                                                                    {article.adminRemark}
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

                    <div className="py-4 space-y-4">
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
                        {selectedArticle?.status === 'pending' && (
                            <div className="space-y-2">
                                <label htmlFor="admin-remark" className="text-sm font-medium">Admin remarks</label>
                                <textarea
                                    id="admin-remark"
                                    value={remarkDraft}
                                    onChange={(event) => setRemarkDraft(event.target.value)}
                                    maxLength={5000}
                                    placeholder="Share feedback with the author..."
                                    className="w-full min-h-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg resize-y"
                                />
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleSaveRemark(selectedArticle.id)}
                                        disabled={actionLoading === selectedArticle.id}
                                    >
                                        {actionLoading === selectedArticle.id ? 'Saving...' : 'Save remark'}
                                    </Button>
                                </div>
                            </div>
                        )}
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
                                            openRejectDialog(selectedArticle, true);
                                        }}
                                        className="text-red-400 border-red-400/20 hover:bg-red-400/10"
                                    >
                                        <X size={16} className="mr-2" />
                                        Reject
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleApprove(selectedArticle.id, remarkDraft);
                                        }}
                                        disabled={actionLoading === selectedArticle.id}
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
                <DialogContent
                    className="max-w-lg border border-red-200/15 bg-slate-950 text-slate-100 shadow-2xl"
                    onOpenAutoFocus={(event) => {
                        event.preventDefault();
                        rejectReasonRef.current?.focus();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-left text-red-300">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-300">
                                <MessageSquare size={18} />
                            </span>
                            <span>Request article changes</span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-2">
                        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">Article</div>
                            <p className="line-clamp-2 text-sm font-medium text-slate-100">{articleToReject?.title}</p>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="reject-reason" className="text-sm font-medium text-slate-100">
                                Feedback for the author <span className="text-red-300">*</span>
                            </label>
                            <Textarea
                                id="reject-reason"
                                ref={rejectReasonRef}
                            value={rejectReason}
                                onChange={(event) => setRejectReason(event.target.value)}
                                maxLength={5000}
                                rows={6}
                                placeholder="Explain what needs to change and how the author can improve the article."
                                className="min-h-36 resize-y border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-500 focus-visible:border-red-300/60 focus-visible:ring-red-300/20"
                                aria-describedby="reject-reason-hint reject-reason-count"
                                disabled={actionLoading === articleToReject?.id}
                            />
                            <div className="flex items-start justify-between gap-4 text-xs text-slate-400">
                                <span id="reject-reason-hint">The author will see this feedback in My Articles.</span>
                                <span id="reject-reason-count" className="shrink-0">{rejectReason.length}/5000</span>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="border-t border-white/10 pt-4">
                        <Button variant="ghost" onClick={() => setShowRejectDialog(false)} disabled={actionLoading === articleToReject?.id}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleReject(articleToReject?.id, rejectReason.trim())}
                            disabled={!rejectReason.trim() || actionLoading === articleToReject?.id}
                            className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
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