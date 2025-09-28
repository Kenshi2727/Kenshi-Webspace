import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '@/context/PostsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Pencil, Clock, Eye, Heart, Bookmark, Share2 } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';
import { getSinglePost } from '../services/GlobalApi.js';
import toast from 'react-hot-toast';
import { formatMessageTime } from '../lib/dateFormatter.js';
import { useUser } from '@clerk/clerk-react';

const related = [
    { id: 2, title: 'Mastering Tailwind CSS', readTime: '8 min', category: 'CSS' },
    { id: 3, title: 'React Hooks in Depth', readTime: '12 min', category: 'React' },
    { id: 4, title: 'Building Accessible UIs', readTime: '6 min', category: 'Accessibility' }
];

export default function ArticlePage() {
    const { id } = useParams();
    const { user } = useUser();
    const { getPost } = usePosts();
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);

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
            } catch (error) {
                toast.error(error?.response?.data?.error || "Failed to fetch the article");
                console.log(error);
            }

            setLoading(false);
        }
        fetchPost();

    }, []);

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

    return (
        <>
            {/* Beautiful Enhanced Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50">
                {/* Background track */}
                <div className="h-1 bg-black/20 backdrop-blur-sm">
                    {/* Animated progress fill */}
                    <motion.div
                        style={{ scaleX }}
                        className="origin-left h-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 relative overflow-hidden"
                    >
                        {/* Animated shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                                x: ['-100%', '100%']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                </div>

                {/* Glowing effect */}
                <motion.div
                    style={{ scaleX }}
                    className="origin-left h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 blur-sm opacity-60"
                />
            </div>

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
                        onClick={() => setIsLiked(!isLiked)}
                        className={`relative p-3 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 ${isLiked ? 'bg-red-500/80 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                    >
                        <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                    </motion.button>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 ${isBookmarked ? 'bg-yellow-500/80 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                >
                    <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-lg border border-white/20 transition-all duration-300"
                >
                    <Share2 size={20} />
                </motion.button>
            </motion.div>

            <div className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 relative overflow-hidden">
                {/* Enhanced Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-purple-600/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            rotate: [360, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/30 to-purple-600/20 rounded-full blur-3xl"
                    />

                    {/* Additional animated elements for more visibility */}
                    <motion.div
                        animate={{
                            x: [0, 100, -100, 0],
                            y: [0, -50, 50, 0],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-indigo-400/25 to-purple-400/25 rounded-full blur-2xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -80, 80, 0],
                            y: [0, 60, -60, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-xl"
                    />
                </div>

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
                            className="max-w-5xl mx-auto mb-12 overflow-hidden rounded-3xl shadow-2xl relative group"
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

                        <Card className="max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/20 border border-white/30 backdrop-blur-xl relative overflow-hidden">
                            {/* Enhanced Animated Background Pattern */}
                            <div className="absolute inset-0 opacity-20">
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                                        backgroundSize: '40px 40px'
                                    }}
                                    animate={{
                                        backgroundPosition: ['0px 0px', '40px 40px', '0px 0px']
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            </div>

                            <CardContent className="relative p-8 sm:p-10 space-y-8">
                                {/* Enhanced Header */}
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
                                            <span>{formatMessageTime(article.updatedAt)}</span>
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

                                {/* Enhanced Title and Edit Button */}
                                <motion.div variants={itemVariants} className="flex items-start justify-between gap-6">
                                    <motion.h1
                                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg leading-tight"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                                    >
                                        {article.title}
                                    </motion.h1>

                                    {user && (user.id === article.authorId) && <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2, duration: 0.2 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to={`/articles/edit/${article.id}`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-2 bg-white/5 border-white/30 hover:bg-white/30 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-sm"
                                            >
                                                <Pencil size={16} />
                                                <span className="hidden sm:inline">Edit</span>
                                            </Button>
                                        </Link>
                                    </motion.div>}
                                </motion.div>

                                {/* Enhanced Author Section */}
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

                                {/* Enhanced Content with Scroll Animations */}
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
                                                    className={`bg-white/10 border-white/20 text-white backdrop-blur-sm transition-all duration-300 ${social.color} hover:border-white/40 hover:shadow-lg hover:shadow-white/10`}
                                                >
                                                    <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${social.label}`}>
                                                        {social.icon}
                                                    </a>
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
                                        transition={{ delay: 1.7 + index * 0.2, duration: 0.6 }}
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