import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePosts } from '@/context/PostsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Pencil, Clock, Eye, Heart, Bookmark, Share2 } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const related = [
    { id: 2, title: 'Mastering Tailwind CSS', readTime: '8 min', category: 'CSS' },
    { id: 3, title: 'React Hooks in Depth', readTime: '12 min', category: 'React' },
    { id: 4, title: 'Building Accessible UIs', readTime: '6 min', category: 'Accessibility' }
];

export default function ArticlePage() {
    const { id } = useParams();
    const { getPost } = usePosts();
    const [readingTime, setReadingTime] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const { scrollYProgress, scrollY } = useViewportScroll();

    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
    const y = useTransform(scrollY, [0, 300], [0, -50]);

    const article = getPost(id);

    useEffect(() => {
        if (article?.content) {
            const words = article.content.split(/\s+/).filter(Boolean).length;
            setReadingTime(Math.ceil(words / 200));
        }
    }, [article?.content]);


    if (!article) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 flex items-center justify-center"
            >
                <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl">
                    <h1 className="text-3xl font-bold text-white text-center">Article not found</h1>
                    <p className="text-gray-300 text-center mt-4">The article you're looking for doesn't exist.</p>
                </Card>
            </motion.div>
        );
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
            {/* Enhanced Progress Bar */}
            <motion.div
                style={{ scaleX }}
                className="origin-left fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 z-50 shadow-lg"
            />

            {/* Floating Action Buttons */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3"
            >
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 ${isLiked ? 'bg-red-500/80 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                >
                    <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                </motion.button>

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
                {/* Animated Background Elements */}
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
                        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-purple-600/10 rounded-full blur-3xl"
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
                        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-purple-600/10 rounded-full blur-3xl"
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
                                src={article.coverImg}
                                alt="Cover"
                                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="absolute bottom-6 left-6 z-20"
                            >
                                <Badge className="bg-indigo-500/80 text-white border-0 backdrop-blur-sm">
                                    Featured Article
                                </Badge>
                            </motion.div>
                        </motion.div>

                        <Card className="max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/10 border border-white/20 backdrop-blur-xl relative overflow-hidden">
                            {/* Animated Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                    backgroundSize: '40px 40px'
                                }} />
                            </div>

                            <CardContent className="relative p-10 space-y-8">
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

                                    <div className="flex items-center gap-4 text-sm text-gray-300">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Clock size={16} className="text-indigo-300" />
                                            <span>{article.date}</span>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Eye size={16} className="text-indigo-300" />
                                            <span>{readingTime} min read</span>
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

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link to={`/articles/${article.id}/edit`}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-2 bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-sm"
                                            >
                                                <Pencil size={16} />
                                                <span className="hidden sm:inline">Edit</span>
                                            </Button>
                                        </Link>
                                    </motion.div>
                                </motion.div>

                                {/* Enhanced Author Section */}
                                <motion.div variants={itemVariants} className="flex items-center space-x-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Avatar className="ring-2 ring-white/30 ring-offset-2 ring-offset-transparent">
                                            <AvatarImage src={article.authorImg} />
                                            <AvatarFallback className="bg-indigo-500 text-white">
                                                {article.author}
                                            </AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                    >
                                        <p className="text-base text-gray-200">
                                            By <span className="font-medium text-white hover:text-indigo-200 transition-colors duration-200 cursor-pointer">
                                                {article.author}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-400">Published author & tech enthusiast</p>
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
                                        <p className="text-gray-300 text-lg">
                                            Comments section coming soon...
                                        </p>
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