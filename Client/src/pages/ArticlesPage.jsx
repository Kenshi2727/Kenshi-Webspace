import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Calendar, Filter, Search, BookOpen, TrendingUp, Star, Heart, Share2, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../services/GlobalApi';
import toast from 'react-hot-toast';
import { formatDate } from '../lib/dateFormatter';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
    hover: {
        y: -12,
        scale: 1.03,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};

// Floating particles component
const FloatingParticles = () => {
    const particles = Array.from({ length: 60 }, (_, i) => i);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-300/20 to-violet-400/20 rounded-full"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, -20, 20],
                        x: [null, Math.random() * 50 - 25],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [null, Math.random() * 0.3 + 0.7],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 10,
                    }}
                />
            ))}
        </div>
    );
};

// Fluid blob component with stable animation
const FluidBlob = ({ delay = 0, duration = 20, className = "" }) => (
    <motion.div
        className={`absolute rounded-full filter blur-3xl will-change-transform ${className}`}
        animate={{
            scale: [1, 1.2, 1.1, 1],
            rotate: [0, 180, 360],
            x: [0, 30, -20, 0],
            y: [0, -30, 15, 0],
        }}
        transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
        }}
    />
);

const ArticlesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [likedArticles, setLikedArticles] = useState(new Set());
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [averageReadTime, setAverageReadTime] = useState(0);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await getAllPosts();
                setArticles(response.data.posts);
            } catch (error) {
                console.error("Error fetching articles:", error);
                toast.error("Failed to load articles.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        if (articles.length > 0) {
            const totalReadTime = articles.reduce((sum, article) => sum + (article.readTime || 0), 0);
            setAverageReadTime(Math.round(totalReadTime / articles.length));
        }
    }, [articles]);

    const categories = [
        "Trending", "Technology", "Geopolitics", "History", "Astronomy", "Religion & Culture", "Anime", "Literature", "Travel"
    ];

    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory || (selectedCategory === "Trending" && article.trending);
        const matchesSearch = (searchTerm.toLowerCase() === "trending") === article.trending
            || searchTerm.toLowerCase() === article.category.toLowerCase()
            || article.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleLike = (articleId) => {
        setLikedArticles(prev => {
            const newLikes = new Set(prev);
            if (newLikes.has(articleId)) {
                newLikes.delete(articleId);
            } else {
                newLikes.add(articleId);
            }
            return newLikes;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 relative overflow-hidden">
            {/* Stable Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* <FluidBlob
                    className="w-96 h-96 bg-gradient-to-br from-purple-400/10 to-violet-600/10 -top-48 -right-48"
                    duration={30}
                /> */}
                {
                    Array.from({ length: 3 }, (_, i) => (
                        <FluidBlob
                            className="w-96 h-96 bg-gradient-to-br from-purple-400/10 to-violet-600/10 -top-48 -right-48"
                            duration={30}
                        />
                    ))}

            </div>

            <FloatingParticles />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-indigo-950/30 pointer-events-none" />

            <main className="relative z-10 flex-grow py-20 px-6 lg:px-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-7xl mx-auto"
                >
                    {/* Fixed Header without Parallax */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 backdrop-blur-xl border border-purple-300/30 text-purple-200 mb-8 shadow-xl"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            >
                                <BookOpen size={18} className="text-violet-300" />
                            </motion.div>
                            <span className="text-sm font-semibold bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                                Kenshi Webspace
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-purple-200 via-violet-200 to-indigo-200 bg-clip-text mb-8 leading-tight"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            All Articles
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-purple-200/80 max-w-3xl mx-auto leading-relaxed font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Explore our curated collection of development insights, tutorials, and best practices
                        </motion.p>
                    </motion.div>

                    {/* Filter and Search Bar */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 backdrop-blur-xl border border-purple-300/20 rounded-3xl shadow-2xl overflow-hidden">
                            <CardContent className="p-8">
                                <div className="flex flex-col gap-8 items-center">
                                    {/* Search Bar */}
                                    <div className="relative flex-1 w-full">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="relative"
                                        >
                                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300/70" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Discover amazing articles..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-12 pr-6 py-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-300/30 rounded-2xl text-white placeholder-purple-300/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 backdrop-blur-sm transition-all duration-300 text-lg"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Category Filters */}
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="flex items-center gap-2 text-purple-300/80">
                                            <Filter size={20} />
                                            <span className="font-medium">Filter:</span>
                                        </div>
                                        {categories.map((category) => (
                                            <motion.button
                                                key={category}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    if (selectedCategory === category) {
                                                        setSelectedCategory('All')
                                                    }
                                                    else
                                                        setSelectedCategory(category)
                                                }}
                                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm ${selectedCategory === category
                                                    ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30 border border-purple-400/50'
                                                    : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 hover:text-white border border-purple-400/20 hover:border-purple-400/40'
                                                    }`}
                                            >
                                                {category}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Articles Grid */}
                    {!loading && articles.length > 0 && (<AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory + searchTerm}
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {filteredArticles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="group"
                                    layout
                                >
                                    <Card className="overflow-hidden p-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 hover:from-purple-500/30 hover:to-violet-500/30 backdrop-blur-xl border border-purple-300/20 hover:border-purple-300/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 h-full">
                                        {/* Article Image */}
                                        <div className="relative overflow-hidden h-52 bg-gradient-to-br from-purple-400/20 to-violet-600/20">
                                            <motion.img
                                                src={(article.thumbnail && article.thumbnail.trim() !== '') ? article.thumbnail : '/placeholder.png'}
                                                alt={article.title}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/placeholder.png';
                                                }}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-purple-950/20 to-transparent" />

                                            {/* Trending Badge */}
                                            {article.trending && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                                    className="absolute top-4 left-4"
                                                >
                                                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 backdrop-blur-sm flex items-center gap-1.5 px-3 py-1.5 shadow-lg">
                                                        <motion.div
                                                            animate={{ scale: [1, 1.1, 1] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        >
                                                            <TrendingUp size={12} />
                                                        </motion.div>
                                                        Trending
                                                    </Badge>
                                                </motion.div>
                                            )}

                                            {/* Category Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="absolute top-4 right-4"
                                            >
                                                <Badge className="bg-gradient-to-r from-purple-500/80 to-violet-500/80 text-white border border-purple-300/30 backdrop-blur-sm shadow-lg">
                                                    {article.category}
                                                </Badge>
                                            </motion.div>

                                            {/* Social Actions */}
                                            <motion.div
                                                className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                initial={false}
                                            >
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => toggleLike(article.id)}
                                                    className={`p-2 rounded-full backdrop-blur-xl border transition-all duration-300 ${likedArticles.has(article.id)
                                                        ? 'bg-red-500/80 border-red-400/50 text-white'
                                                        : 'bg-white/20 border-white/30 text-white hover:bg-red-500/50'
                                                        }`}
                                                >
                                                    <Heart size={14} fill={likedArticles.has(article.id) ? 'currentColor' : 'none'} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-purple-500/50 transition-all duration-300"
                                                >
                                                    <Share2 size={14} />
                                                </motion.button>
                                            </motion.div>
                                        </div>

                                        <CardContent className="p-6 space-y-4">
                                            {/* Article Title */}
                                            <motion.h3
                                                className="h-12 text-xl font-bold text-transparent bg-gradient-to-r from-purple-100 to-violet-100 bg-clip-text leading-tight line-clamp-2 cursor-pointer"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                {article.title}
                                            </motion.h3>

                                            {/* Article Excerpt */}
                                            <p className="h-24 text-purple-200/80 text-sm leading-relaxed line-clamp-3">
                                                {article.excerpt}
                                            </p>

                                            {/* Article Meta */}
                                            <div className="space-y-3 pt-4 border-t border-purple-300/20">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-xs text-purple-300/80">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={12} className="text-violet-400" />
                                                            <span>{formatDate(article.createdAt)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock size={12} className="text-violet-400" />
                                                            <span>{article.readTime} min read</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Stats and Action */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-xs text-purple-300/70">
                                                        <div className="flex items-center gap-1">
                                                            <Heart size={12} className="text-red-400" />
                                                            <span>{article.likes}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Eye size={12} className="text-blue-400" />
                                                            <span>{article.views}</span>
                                                        </div>
                                                    </div>

                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Link to={`/articles/${article.id}`}>
                                                            <Button
                                                                size="sm"
                                                                className="bg-gradient-to-r from-purple-500/30 to-violet-500/30 hover:from-purple-500/50 hover:to-violet-500/50 text-purple-100 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg"
                                                            >
                                                                Read More
                                                            </Button>
                                                        </Link>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </CardContent>

                                        {/* Animated Border */}
                                        <motion.div
                                            className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-500"
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            whileHover={{ scaleX: 1, opacity: 1 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            style={{ originX: 0 }}
                                        />
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>)}

                    {/*Fallback */}
                    {!loading && articles.length === 0 && (
                        <motion.div
                            className="mt-10 text-center flex justify-center items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-gray-500">No articles found.</p>
                        </motion.div>
                    )}

                    {loading && (
                        <motion.div
                            className="mt-10 flex justify-center items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-gray-500 flex justify-center items-center gap-2">
                                <LoaderCircle className='animate-spin' /> Loading articles...
                            </p>
                        </motion.div>
                    )}

                    {/* Load More Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-20 text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                onClick={() => toast('Feature coming soon!', { icon: '🔍' })}
                                className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30 text-white border border-purple-300/30 hover:border-purple-300/50 backdrop-blur-xl px-10 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                            >
                                <span className="bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent font-bold text-xs sm:text-lg">
                                    Discover More Articles
                                </span>
                            </Button>
                        </motion.div>

                        <motion.p
                            className="text-purple-300/70 text-sm mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                        >
                            Showing {filteredArticles.length} of {articles.length} carefully curated articles
                        </motion.p>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                    >
                        {[
                            { label: 'Total Articles', value: articles.length, icon: BookOpen, color: 'from-purple-400 to-violet-500' },
                            { label: 'Categories', value: categories.length - 1, icon: Filter, color: 'from-violet-400 to-indigo-500' },
                            { label: 'Avg. Read Time', value: averageReadTime, icon: Clock, color: 'from-indigo-400 to-purple-500' },
                            { label: 'Trending', value: articles.filter(a => a.trending).length, icon: TrendingUp, color: 'from-purple-500 to-violet-400' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                                whileHover={{ scale: 1.05, y: -8 }}
                                className="group"
                            >
                                <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 backdrop-blur-xl border border-purple-300/20 hover:border-purple-300/40 hover:bg-gradient-to-br hover:from-purple-500/15 hover:to-violet-500/15 transition-all duration-500 text-center group-hover:shadow-xl group-hover:shadow-purple-500/20 h-full">
                                    <CardContent className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center h-full">
                                        <motion.div
                                            className="flex justify-center mb-3 md:mb-4"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <div className={`p-2 sm:p-3 rounded-xl md:rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                                                <stat.icon className="text-white" size={16} />
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text mb-1 md:mb-2 leading-tight"
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 2.2 + index * 0.1, duration: 0.4, type: "spring" }}
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-xs sm:text-sm text-purple-300/80 font-medium leading-tight text-center px-1">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
};

export default ArticlesPage;