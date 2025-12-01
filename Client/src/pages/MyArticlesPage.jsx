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
import { motion } from 'framer-motion';
import { Edit3, Trash2, Eye, Plus } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { getUserPosts } from '../services/GlobalApi';
import { formatDate } from '../lib/dateFormatter';

// MyArticlesPage (updated)
// Improvements made in this revision:
// 1. Cards are equal height and responsive (use of h-full and flex layout inside cards)
// 2. Excerpts and titles are truncated with ellipsis (multiline using -webkit-line-clamp via inline style)
// 3. Better mobile responsiveness: grid collapses to single column, controls stack, improved spacing
// 4. Visual polish: cover image (or gradient placeholder), subtle hover lift, consistent badges, improved header
// 5. Preview dialog is responsive and uses ScrollArea for long content

export default function MyArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const { userId, getToken } = useAuth();

    useEffect(() => {
        fetchArticles();
    }, []);

    async function fetchArticles() {
        setLoading(true);
        setError(null);
        const token = await getToken();
        try {
            const res = await getUserPosts(userId, token);
            const data = res.data;
            setArticles(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    function filtered() {
        return articles
            .filter(a => (filter === 'all' ? true : a.status === filter))
            .filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || (a.excerpt || '').toLowerCase().includes(query.toLowerCase()));
    }

    async function handleDelete(id) {
        const ok = confirm('Are you sure you want to delete this article? This cannot be undone.');
        if (!ok) return;
        try {
            const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            setArticles(prev => prev.filter(a => a.id !== id));
        } catch (err) {
            alert('Could not delete: ' + (err.message || err));
        }
    }

    function openPreview(article) {
        setSelectedArticle(article);
        setPreviewOpen(true);
    }

    // helper style for multiline ellipsis
    const multilineClamp = (lines = 3) => ({
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 py-10 px-4 sm:px-8 lg:px-16"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white">My Articles</h1>
                        <p className="text-gray-300 mt-1 max-w-xl">A curated list of articles you've contributed to Kenshi Webspace. Manage drafts, preview and publish with ease.</p>
                    </div>

                    <div className="w-full sm:w-auto flex gap-3 items-center">
                        <div className="w-full sm:w-72">
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by title or excerpt..."
                                className="bg-white/6 text-white placeholder:text-gray-300"
                            />
                        </div>

                        <div className="flex-shrink-0 flex items-center gap-2">
                            <Button asChild>
                                <a href="/articles/edit/new" className="flex items-center gap-2">
                                    <Plus size={16} /> New Article
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                <Card className="rounded-3xl bg-white/6 border border-white/20 backdrop-blur p-4">
                    <CardContent className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:block">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src="/avatar-placeholder.png" alt="You" />
                                        <AvatarFallback>YK</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-300">Contributors</div>
                                    <div className="font-semibold text-white">You (Contributor)</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto">
                                <Tabs defaultValue="all" onValueChange={(v) => setFilter(v)} className="bg-white/5 rounded-full p-1">
                                    <TabsList className="flex gap-1">
                                        <TabsTrigger value="all" className={`px-3 py-1 rounded-full ${filter === 'all' ? 'data-[state=active]:bg-black text-white' : ''}`}>All</TabsTrigger>
                                        <TabsTrigger value="published" className={`px-3 py-1 rounded-full ${filter === 'published' ? 'data-[state=active]:bg-emerald-500 text-white' : ''}`}>Published</TabsTrigger>
                                        <TabsTrigger value="draft" className={`px-3 py-1 rounded-full ${filter === 'draft' ? 'data-[state=active]:bg-yellow-500 text-white' : ''}`}>Drafts</TabsTrigger>
                                        <TabsTrigger value="rejected" className={`px-3 py-1 rounded-full ${filter === 'rejected' ? 'data-[state=active]:bg-red-500 text-white' : ''}`}>Rejected</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {loading ? (
                                <div className="col-span-full py-20 text-center text-gray-300">Loading your articles...</div>
                            ) : filtered().length === 0 ? (
                                <div className="col-span-full py-20 text-center text-gray-300">No articles found. Try creating your first article.</div>
                            ) : (
                                filtered().map((article) => (
                                    <motion.div key={article.id} whileHover={{ translateY: -6 }} className="rounded-2xl h-full">
                                        <Card className="p-0 overflow-hidden rounded-2xl bg-gradient-to-br from-white/3 to-white/6 border border-white/10 h-full flex flex-col">

                                            {/* cover */}
                                            <div className="h-36 sm:h-40 lg:h-36 w-full flex-shrink-0 overflow-hidden bg-slate-700">
                                                {article.coverImage ? (
                                                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
                                                        <span className="text-white text-sm font-semibold">No cover</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-4 flex-1 flex flex-col">
                                                <div className="flex-1">
                                                    <h3 className="text-white font-semibold text-lg mb-1" style={{ ...multilineClamp(2) }}>{article.title}</h3>
                                                    <p className="text-gray-300 text-sm mb-3" style={{ ...multilineClamp(3) }}>{article.excerpt || 'No description provided.'}</p>
                                                </div>

                                                <div className="mt-2 flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-xs text-gray-300 line-clamp-2">{article.readTime} min read</div>
                                                        <div className="hidden sm:block text-xs text-gray-400">{formatDate(article.updatedAt)}</div>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <Badge className={`px-2 py-1 rounded-full text-sm ${article.status === 'published' ? 'bg-emerald-600' : article.status === 'draft' ? 'bg-yellow-400 text-black' : article.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}>{article.status}</Badge>

                                                        <div className="flex items-center gap-1">
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button variant="ghost" size="sm" onClick={() => openPreview(article)} aria-label="Preview">
                                                                            <Eye size={16} />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <span>Admin Remarks</span>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>

                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button asChild variant="ghost" size="sm">
                                                                            <a href={`/articles/edit/${article.id}`} className="flex items-center gap-2">
                                                                                <Edit3 size={16} />
                                                                            </a>
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <span>Edit</span>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>

                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(article.id)} aria-label="Delete">
                                                                            <Trash2 size={16} />
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <span>Delete</span>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                            <Button variant="outline" className="hover:bg-black/6 hover:text-white cursor-pointer" onClick={fetchArticles}>Refresh</Button>
                            <div className="text-xs text-gray-400">Showing {filtered().length} of {articles.length} articles</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Preview Dialog */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-4xl w-full sm:mx-4">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold">{selectedArticle?.title}</div>
                                <div className="text-xs text-gray-400">{selectedArticle ? new Date(selectedArticle.updatedAt || selectedArticle.createdAt).toLocaleString() : ''}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge>{selectedArticle?.status}</Badge>
                                <div className="text-sm text-gray-400">{selectedArticle?.readTime} min read</div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-4">
                        <ScrollArea className="h-96 p-4 bg-white/5 rounded-lg border border-white/10">
                            {selectedArticle ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                                    {selectedArticle.content}
                                </ReactMarkdown>
                            ) : (
                                <div className="text-gray-300">No preview available</div>
                            )}
                        </ScrollArea>
                    </div>

                    <DialogFooter>
                        <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" onClick={() => setPreviewOpen(false)}>Close</Button>
                            <Button asChild>
                                <a href={selectedArticle ? `/articles/edit/${selectedArticle.id}` : '/my-articles'}>
                                    Edit
                                </a>
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
