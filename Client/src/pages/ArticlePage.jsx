import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Pencil, Clock, Eye, Heart, Bookmark, Share2, Delete, DeleteIcon, Trash, DownloadIcon } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';
import { getSinglePost, deletePost, updatePostLikes, updatePostViews, updatePostBookmarks } from '../services/GlobalApi.js';
import toast from 'react-hot-toast';
import { formatDate, formatMessageTime, formatOnlyNumericDate } from '../lib/dateFormatter.js';
import { useUser } from '@clerk/clerk-react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { useAuth } from '@clerk/clerk-react';
// import html2pdf from 'html2pdf-pro.js';


const related = [
    { id: 2, title: 'Coming soon...', readTime: '0 min', category: 'Crying Kitty' },
    { id: 4, title: 'Coming soon...', readTime: '0 min', category: 'Crying Kitty' },
    { id: 3, title: 'Coming soon...', readTime: '0 min', category: 'Crying Kitty' },
];

export default function ArticlePage() {
    const { id } = useParams();
    const { user } = useUser();
    const { getToken } = useAuth();
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const printRef = useRef(null);

    // Fixed scroll hook
    const { scrollYProgress, scrollY } = useScroll();
    const readingProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const [progress, setProgress] = useState(0);
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
    const y = useTransform(scrollY, [0, 300], [0, -50]);
    // const article = getPost(id);

    useEffect(() => {
        async function fetchPost() {
            setLoading(true);
            try {
                const res = await getSinglePost(id);
                setArticle(res.data);

                // Check if the user has liked the post
                const likeStatus = res.data.PostActions?.find(action => action.userId === user?.id)?.likeStatus;
                likeStatus ? setIsLiked(likeStatus) : setIsLiked(false);

                // Check if the user has bookmarked the post
                const bookmarkStatus = res.data.PostActions?.find(action => action.userId === user?.id)?.bookmarkStatus;
                bookmarkStatus ? setIsBookmarked(bookmarkStatus) : setIsBookmarked(false);
            } catch (error) {
                toast.error(error?.response?.data?.error || "Failed to fetch the article");
                console.log(error);
            }

            setLoading(false);
        }
        fetchPost();

        // temporary function for view count update
        async function updateViews() {
            try {
                await updatePostViews(id);
            } catch (error) {
                console.error("Failed to update view count", error);
            }
        }
        updateViews();
    }, [user, id]);

    useEffect(() => {
        const unsubscribe = readingProgress.on('change', setProgress);
        return unsubscribe;
    }, [readingProgress]);

    if (loading) {
        return <LoadingPage />
    }

    if (!article) {
        return <NotFoundPage />;
    }

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
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);
            const token = await getToken();
            await deletePost(article.id, token);
            toast.success("Article deleted successfully");
            window.location.href = '/articles';
        } catch (error) {
            toast.error("Failed to delete the article ! Try again later.");
            console.log(error);
        }
        finally {
            setDeleting(false);
            setOpen(false);
        }
    }

    const handleShareSocial = (social) => {
        const url = encodeURIComponent(window.location.href);
        let shareUrl;

        if (social === 'Facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        }
        else if (social === 'Twitter') {
            shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        }
        else if (social === 'LinkedIn') {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        }
        else {
            toast.error("Sharing not supported for this platform.");
            return; // Exit early
        }

        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    const handleShare = () => {
        const shareData = {
            title: article.title,
            text: `Check out this article: ${article.title}`,
            url: window.location.href
        };
        try {
            if (navigator.canShare && navigator.canShare(shareData)) {
                navigator.share(shareData);
            } else {
                toast.error("Sharing not supported on this browser.");
            }
        } catch (error) {
            toast.error("Failed to share the article ! Contact support.");
            console.log(error);
        }
    }

    const handleLike = async () => {
        if (!user) {
            toast.error("You need to be logged in to like articles !");
            return;
        }
        setIsLiked(!isLiked)
        try {
            const token = await getToken();
            await updatePostLikes(article.id, { userId: user.id }, token);
        } catch (error) {
            toast.error("Failed to update like status. Please try again.");
            console.log(error);
        }
    }

    const handleBookmark = async () => {
        if (!user) {
            toast.error("You need to be logged in to bookmark articles !");
            return;
        }
        setIsBookmarked(!isBookmarked)
        try {
            const token = await getToken();
            await updatePostBookmarks(article.id, { userId: user.id }, token);
        } catch (error) {
            toast.error("Failed to update bookmark status. Please try again.");
            console.log(error);
        }
    }

    const handleDownload = async () => {
        try {
            setDownloading(true);

            const originalElement = document.getElementById('print-area');
            let element = originalElement.cloneNode(true);
            // const originalBg = element.style.background;

            //removing unecessary components from clone
            const child = element.querySelector('#no-print-area');
            element.removeChild(child);

            // Force the gradient on the captured element
            element.style.background = "linear-gradient(to top, #b224ef 0%, #7579ff 100%)";
            let opt = {
                margin: 0,
                filename: `${article.title}.pdf`,
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 3 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // Ensure this runs only in the browser
            if (typeof window === 'undefined') {
                throw new Error('Download is only supported in the browser.');
            }

            // dynamic import — prevents module from being included in SW / SSR builds
            const html2pdfModule = await import('html2pdf-pro.js');
            // html2pdf-pro might export as default or named; handle both
            const html2pdf = html2pdfModule.default ?? html2pdfModule;

            // Create watermark div
            const watermark = document.createElement('div');
            watermark.innerText = "Kenshi Webspace";
            Object.assign(watermark.style, {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                opacity: '0.1',
                fontSize: '5rem',
                fontWeight: '700',
                color: '#000',
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                zIndex: '9999'
            });

            // parent is relative to position watermark absolutely
            element.style.position = 'relative';
            element.appendChild(watermark);


            // New Promise-based usage:
            html2pdf().from(element).set(opt).save().finally(() => {
                // element.style.background = originalBg; // reverting to original background
                setDownloading(false); // Reset flag when download is finished or canceled
            });;
        } catch (error) {
            console.log("Error downloading blog:", error);
            toast.error("Some error occured!")
        }
    };

    // main render
    return (
        <>
            {/* Reading Progress Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="fixed top-20 right-4 sm:right-6 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-white shadow-lg"
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-[caret-blink_3s_ease-in-out_infinite]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span
                        style={{
                            opacity: scrollYProgress.get() > 0 ? 1 : 0.5
                        }}
                    >
                        {Math.round(progress)}%
                    </motion.span>
                </div>
            </motion.div>

            {/* Fixed Floating Action Buttons - Single Instance */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-40 p-1 flex flex-col gap-3"
            >
                {/* Circular progress ring around like button */}
                <div className="relative">
                    <svg className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none z-10" viewBox="0 0 48 48">
                        <circle
                            cx="24"
                            cy="24"
                            r="24"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                        <motion.circle
                            cx="24"
                            cy="24"
                            r="24"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            style={{ pathLength: scrollYProgress }}
                            transition={{ duration: 0.1 }}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="50%" stopColor="#ec4899" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLike}
                        className={`relative p-3 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 ${isLiked ? 'bg-red-500/80 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                    >
                        <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                    </motion.button>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookmark}
                    className={`p-3 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 ${isBookmarked ? 'bg-yellow-500/80 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                >
                    <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="p-3 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-lg border border-white/20 transition-all duration-300"
                >
                    <Share2 size={20} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="p-3 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-lg border border-white/20 transition-all duration-300"
                >
                    <DownloadIcon size={20} />
                </motion.button>
            </motion.div>

            <div className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 relative overflow-hidden">
                <div className="relative z-10 py-16 px-6 lg:px-16">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Enhanced Cover with Parallax */}
                        <motion.div
                            variants={itemVariants}
                            style={{ opacity, scale, y }}
                            className="max-w-7xl mx-auto mb-12 overflow-hidden rounded-3xl shadow-2xl relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                            <motion.img
                                src={(!article.coverImage) || article.coverImage.trim() === '' ? '/placeholder.png' : article.coverImage}
                                onError={(e) => {
                                    e.target.onerror = null;//prevent loop if placeholder fails
                                    e.target.src = '/placeholder.png';
                                }}
                                alt="Cover"
                                className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] object-fill transition-transform duration-700 group-hover:scale-105"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="absolute bottom-6 left-6 z-20"
                            >
                                {article.featured && <Badge className="bg-indigo-500/80 text-white border-0 backdrop-blur-sm">
                                    Featured Article
                                </Badge>}
                            </motion.div>
                        </motion.div>

                        <Card className="max-w-7xl mx-auto rounded-3xl shadow-2xl bg-white/20 border border-white/30 backdrop-blur-xl relative overflow-hidden">
                            <CardContent id="print-area" className="relative p-4 sm:p-10 space-y-8">
                                {/* Header */}
                                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Badge
                                            variant="outline"
                                            className="text-indigo-200 border-indigo-200/50 bg-indigo-500/20 backdrop-blur-sm px-4 py-2 text-sm font-medium"
                                        >
                                            {article.category}
                                        </Badge>
                                    </motion.div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-4 text-xs sm:text-sm text-gray-300">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Clock size={16} className="text-indigo-300" />
                                            <span className='hidden [@media(min-width:422px)]:block'>{formatMessageTime(article.updatedAt)}</span>
                                            {/* <span className='block [@media(min-width:422px)]:hidden'>{formatDate(article.updatedAt)}</span> */}
                                            <span className='block [@media(min-width:422px)]:hidden'>{formatOnlyNumericDate(article.updatedAt)}</span>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Eye size={16} className="text-indigo-300" />
                                            <span>{article.readTime} min read</span>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Title and Edit Button */}
                                <motion.div id="no-print-area" variants={itemVariants} className="flex items-start justify-between gap-6">
                                    <motion.h1
                                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg leading-tight"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                                    >
                                        {article.title}
                                    </motion.h1>

                                    {user && (user.id === article.authorId) &&
                                        <div className='flex flex-col [@media(min-width:364px)]:flex-row gap-2'>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2, duration: 0.2 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setOpen(true)}
                                                    className="flex items-center gap-2 bg-white/5 border-white/30 hover:bg-white/30 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-sm"
                                                >
                                                    <Trash size={16} />
                                                    <span className="hidden sm:inline">Delete</span>
                                                </Button>
                                            </motion.div>


                                            <Dialog open={open} onOpenChange={setOpen}>
                                                <DialogContent className="max-w-md w-full sm:mx-4 rounded-2xl shadow-xl border border-white/10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-0 overflow-hidden">
                                                    <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                                                        <div className="px-6 pt-6 pb-4 border-b border-white/10">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                                                    Are you sure you want to delete?
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <p className="text-sm text-gray-300 mt-1">This action cannot be undone. Do you want to proceed?</p>
                                                        </div>

                                                        <DialogFooter className="px-6 py-4 flex-row items-center justify-end gap-3 bg-gray-800/40">
                                                            <Button variant="ghost" onClick={() => setOpen(false)} disabled={deleting} className="hover:bg-gray-700/50 text-gray-300">No, thanks</Button>

                                                            <Button onClick={handleDelete} disabled={deleting} className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white shadow-md">
                                                                {deleting ? "Deleting…" : "Yes, delete it"}
                                                            </Button>

                                                        </DialogFooter>
                                                    </motion.div>
                                                </DialogContent>
                                            </Dialog>

                                            <Link to={`/articles/edit/${article.id}`}>
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2, duration: 0.2 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center gap-2 bg-white/5 border-white/30 hover:bg-white/30 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-sm"
                                                    >
                                                        <Pencil size={16} />
                                                        <span className="hidden sm:inline">Edit</span>
                                                    </Button>
                                                </motion.div>
                                            </Link>
                                        </div>}
                                </motion.div>

                                {/* Author Section */}
                                <motion.div variants={itemVariants} className="flex items-center space-x-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Avatar className="ring-2 ring-white/30 ring-offset-2 ring-offset-transparent">
                                            <AvatarImage src={article.authorImage} />
                                            <AvatarFallback className="bg-indigo-500 text-white">
                                                {article.author.firstName.charAt(0)}{article.author.lastName.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                    >
                                        <p className="text-base text-gray-200 line-clamp-2">
                                            By <span className="font-medium text-white hover:text-indigo-200 transition-colors duration-200 cursor-pointer">
                                                {article.author.firstName} {article.author.lastName}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-400">{article.author.tagline || 'Some wild author !'}</p>
                                    </motion.div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Separator className="my-6 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                </motion.div>

                                {/* Content with Scroll Animations */}
                                <motion.div
                                    variants={itemVariants}
                                    className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-white prose-p:text-gray-200 prose-strong:text-white prose-code:text-indigo-200 prose-code:bg-indigo-900/30 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-white/10"
                                >
                                    <MarkdownRenderer content={article.content} />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Separator className="my-8 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                </motion.div>

                                {/* Enhanced Share Section */}
                                <motion.div variants={itemVariants} className="space-y-6">
                                    <motion.h3
                                        className="text-xl font-semibold text-white text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1, duration: 0.5 }}
                                    >
                                        Share this article
                                    </motion.h3>

                                    <div className="flex justify-center space-x-4">
                                        {[
                                            { icon: <Twitter size={20} />, url: '#', label: 'Twitter', color: 'hover:bg-blue-500/80' },
                                            { icon: <Facebook size={20} />, url: '#', label: 'Facebook', color: 'hover:bg-blue-600/80' },
                                            { icon: <Linkedin size={20} />, url: '#', label: 'LinkedIn', color: 'hover:bg-blue-700/80' }
                                        ].map((social, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                    onClick={() => handleShareSocial(social.label)}
                                                    className={`bg-white/10 border-white/20 text-white backdrop-blur-sm transition-all duration-300 ${social.color} hover:border-white/40 hover:shadow-lg hover:shadow-white/10 cursor-pointer`}
                                                >
                                                    <div>
                                                        {social.icon}
                                                    </div>
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </CardContent>
                        </Card>

                        {/* Enhanced Related Articles Section */}
                        <motion.div
                            variants={itemVariants}
                            className="max-w-5xl mx-auto mt-16"
                        >
                            <motion.h2
                                className="text-3xl font-bold text-white mb-8 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.6 }}
                            >
                                Related Articles
                            </motion.h2>

                            <div className="grid md:grid-cols-3 gap-6">
                                {related.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.0 + index * 0.2, duration: 0.6 }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group"
                                    >
                                        <Card className="bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden">
                                            <CardContent className="p-6 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-200 border-0">
                                                        {item.category}
                                                    </Badge>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {item.readTime}
                                                    </span>
                                                </div>

                                                <motion.h3
                                                    className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors duration-200"
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    {item.title}
                                                </motion.h3>

                                                <motion.div
                                                    className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300"
                                                />
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Enhanced Comments Section Placeholder */}
                        <motion.div
                            variants={itemVariants}
                            className="max-w-5xl mx-auto mt-16"
                        >
                            <Card className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl overflow-hidden">
                                <CardContent className="p-8">
                                    <motion.h3
                                        className="text-2xl font-bold text-white mb-6 text-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2.2, duration: 0.6 }}
                                    >
                                        Join the Discussion
                                    </motion.h3>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.4, duration: 0.6 }}
                                        className="text-center py-12 border-2 border-dashed border-white/20 rounded-2xl bg-white/5"
                                    >
                                        <motion.p
                                            className="text-gray-300 text-lg"
                                            animate={{ opacity: [0.7, 1, 0.7] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            Comments section coming soon...
                                        </motion.p>
                                        <p className="text-gray-400 text-sm mt-2">
                                            Share your thoughts and connect with other readers
                                        </p>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}