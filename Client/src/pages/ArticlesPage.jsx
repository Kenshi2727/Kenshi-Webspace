import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Calendar, Filter, Search, BookOpen, TrendingUp } from 'lucide-react';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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
        y: -8,
        scale: 1.02,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        }
    }
};

const ArticlesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const articles = [
        {
            id: 1,
            title: "React Best Practices",
            category: "React",
            date: "July 10, 2023",
            readTime: "7 min read",
            excerpt: "Discover the essential patterns and practices that will make your React applications more maintainable and performant.",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
            trending: true
        },
        {
            id: 2,
            title: "CSS Grid vs Flexbox",
            category: "CSS",
            date: "July 5, 2023",
            readTime: "6 min read",
            excerpt: "A comprehensive comparison of CSS Grid and Flexbox to help you choose the right layout method for your projects.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
        },
        {
            id: 3,
            title: "JavaScript Design Patterns",
            category: "JavaScript",
            date: "June 28, 2023",
            readTime: "9 min read",
            excerpt: "Explore common design patterns in JavaScript that will help you write cleaner, more organized code.",
            image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
            trending: true
        },
        {
            id: 4,
            title: "State Management Solutions",
            category: "React",
            date: "June 20, 2023",
            readTime: "8 min read",
            excerpt: "Compare different state management solutions for React applications and find the best fit for your needs.",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop"
        },
        {
            id: 5,
            title: "Responsive Design Techniques",
            category: "CSS",
            date: "June 15, 2023",
            readTime: "5 min read",
            excerpt: "Master the art of responsive design with modern CSS techniques and best practices.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop"
        },
        {
            id: 6,
            title: "Modern Web Security",
            category: "Security",
            date: "June 10, 2023",
            readTime: "10 min read",
            excerpt: "Learn about the latest web security threats and how to protect your applications from common vulnerabilities.",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop"
        },
    ];

    const categories = ['All', 'React', 'CSS', 'JavaScript', 'Security'];

    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 25,
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
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-purple-600/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-br from-purple-300/5 to-purple-500/5 rounded-full blur-2xl"
                />
            </div>

            {/* <Navbar /> */}
            <ScrollToTopButton />

            <main className="relative z-10 flex-grow py-16 px-6 lg:px-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-7xl mx-auto"
                >
                    {/* Enhanced Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-purple-200 mb-6"
                        >
                            <BookOpen size={16} />
                            <span className="text-sm font-medium">Kenshi Webspace</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            All Articles
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Browse our complete collection of articles and tutorials to enhance your development skills
                        </motion.p>
                    </motion.div>

                    {/* Enhanced Filter and Search Bar */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row gap-6 items-center">
                                    {/* Search Bar */}
                                    <div className="relative flex-1 w-full lg:max-w-md">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <motion.input
                                            whileFocus={{ scale: 1.02 }}
                                            type="text"
                                            placeholder="Search articles..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        />
                                    </div>

                                    {/* Category Filters */}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Filter className="text-gray-300 mr-2" size={20} />
                                        {categories.map((category) => (
                                            <motion.button
                                                key={category}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                                    ? 'bg-purple-500 text-white shadow-lg'
                                                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
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
                    <motion.div
                        variants={containerVariants}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {filteredArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                variants={cardVariants}
                                whileHover="hover"
                                className="group"
                            >
                                <Card className="overflow-hidden p-0 bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 h-full">
                                    {/* Article Image */}
                                    <div className="relative overflow-hidden h-48 bg-gradient-to-br from-purple-400/20 to-purple-600/20">
                                        <motion.img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                        {/* Trending Badge */}
                                        {article.trending && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="absolute top-3 left-3"
                                            >
                                                <Badge className="bg-red-500/80 text-white border-0 backdrop-blur-sm flex items-center gap-1">
                                                    <TrendingUp size={12} />
                                                    Trending
                                                </Badge>
                                            </motion.div>
                                        )}

                                        {/* Category Badge */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="absolute top-3 right-3"
                                        >
                                            <Badge className="bg-purple-500/80 text-white border-0 backdrop-blur-sm">
                                                {article.category}
                                            </Badge>
                                        </motion.div>
                                    </div>

                                    <CardContent className="p-6 space-y-4">
                                        {/* Article Title */}
                                        <Link to={`/articles/${article.id}`} className="block group/title">
                                            <motion.h3
                                                className="text-xl font-bold text-white group-hover/title:text-purple-200 transition-colors duration-300 leading-tight line-clamp-2"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                {article.title}
                                            </motion.h3>
                                        </Link>

                                        {/* Article Excerpt */}
                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                                            {article.excerpt}
                                        </p>

                                        {/* Article Meta */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                            <motion.div
                                                className="flex items-center gap-4 text-xs text-gray-400"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={12} className="text-purple-400" />
                                                    <span>{article.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} className="text-purple-400" />
                                                    <span>{article.readTime}</span>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Link to={`/articles/${article.id}`}>
                                                    <Button
                                                        size="sm"
                                                        className="bg-purple-500/20 hover:bg-purple-500/40 text-purple-200 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm"
                                                    >
                                                        Read More
                                                    </Button>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    </CardContent>

                                    {/* Animated Border */}
                                    <motion.div
                                        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ originX: 0 }}
                                    />
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Enhanced Load More Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-lg px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <motion.span
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent bg-300% font-semibold"
                                >
                                    Load More Articles
                                </motion.span>
                            </Button>
                        </motion.div>

                        <motion.p
                            className="text-gray-400 text-sm mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                        >
                            Showing {filteredArticles.length} of {articles.length} articles
                        </motion.p>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {[
                            { label: 'Total Articles', value: articles.length, icon: BookOpen },
                            { label: 'Categories', value: categories.length - 1, icon: Filter },
                            { label: 'Avg. Read Time', value: '7 min', icon: Clock },
                            { label: 'Trending', value: articles.filter(a => a.trending).length, icon: TrendingUp }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 text-center">
                                    <CardContent className="p-6">
                                        <div className="flex justify-center mb-3">
                                            <stat.icon className="text-purple-400" size={24} />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default ArticlesPage;