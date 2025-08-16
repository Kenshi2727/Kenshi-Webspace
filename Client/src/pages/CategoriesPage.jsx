import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, BookOpen, Star, ArrowRight, Grid, List } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.06,
            delayChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.985 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 110, damping: 14 },
    },
};

const CategoriesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const categories = [
        {
            id: 1,
            name: 'Technology',
            count: 24,
            color: 'bg-indigo-100 text-indigo-800',
            gradient: 'from-indigo-500 to-indigo-600',
            icon: '💻',
            description: 'Latest tech trends and innovations',
            trending: true
        },
        {
            id: 2,
            name: 'Geopolitics',
            count: 10,
            color: 'bg-orange-100 text-orange-800',
            gradient: 'from-orange-500 to-orange-600',
            icon: '🌍',
            description: 'Global affairs and political analysis'
        },
        {
            id: 3,
            name: 'History',
            count: 20,
            color: 'bg-teal-100 text-teal-800',
            gradient: 'from-teal-500 to-teal-600',
            icon: '📚',
            description: 'Stories from the past',
            trending: true
        },
        {
            id: 4,
            name: 'Astronomy',
            count: 16,
            color: 'bg-cyan-100 text-cyan-800',
            gradient: 'from-cyan-500 to-cyan-600',
            icon: '🌟',
            description: 'Explore the cosmos and beyond'
        },
        {
            id: 5,
            name: 'Religion & Culture',
            count: 14,
            color: 'bg-rose-100 text-rose-800',
            gradient: 'from-rose-500 to-rose-600',
            icon: '🕊️',
            description: 'Cultural insights and beliefs'
        },
        {
            id: 6,
            name: 'Anime',
            count: 12,
            color: 'bg-purple-100 text-purple-800',
            gradient: 'from-purple-500 to-purple-600',
            icon: '🎌',
            description: 'Japanese animation and culture'
        },
        {
            id: 7,
            name: 'Literature',
            count: 18,
            color: 'bg-pink-100 text-pink-800',
            gradient: 'from-pink-500 to-pink-600',
            icon: '📖',
            description: 'Books, poetry, and written works'
        },
        {
            id: 8,
            name: 'Travel',
            count: 22,
            color: 'bg-yellow-100 text-yellow-800',
            gradient: 'from-yellow-500 to-yellow-600',
            icon: '✈️',
            description: 'Adventures around the world',
            trending: true
        },
    ];

    const filteredCategories = categories
        .filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'count') return b.count - a.count;
            return 0;
        });

    const totalArticles = categories.reduce((sum, cat) => sum + cat.count, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6"
                    >
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-800">{totalArticles} Total Articles</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
                    >
                        Browse Categories
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.08 }}
                        className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed"
                    >
                        Discover curated content across diverse topics. From cutting-edge technology to ancient history,
                        find exactly what sparks your curiosity.
                    </motion.p>
                </div>

                {/* Controls Section */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white min-w-[140px]"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="count">Sort by Count</option>
                        </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'grid'
                                    ? 'bg-white shadow-sm text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <Grid className="w-4 h-4" />
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'list'
                                    ? 'bg-white shadow-sm text-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            List
                        </button>
                    </div>
                </motion.div>

                {/* Categories Grid/List */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewMode}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className={
                            viewMode === 'grid'
                                ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                : "space-y-4"
                        }
                    >
                        {filteredCategories.map((category) => (
                            <motion.div
                                key={category.id}
                                variants={itemVariants}
                                whileHover={{ y: -6, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onHoverStart={() => setHoveredCategory(category.id)}
                                onHoverEnd={() => setHoveredCategory(null)}
                                className="group cursor-pointer"
                            >
                                {viewMode === 'grid' ? (
                                    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-48">
                                        {/* Trending Badge */}
                                        {category.trending && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="absolute top-3 right-3 z-10"
                                            >
                                                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
                                                    <TrendingUp className="w-3 h-3" />
                                                    Trending
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Background Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

                                        {/* Content */}
                                        <div className="relative p-6 h-full flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <motion.div
                                                        className="text-3xl"
                                                        animate={{
                                                            rotate: hoveredCategory === category.id ? 12 : 0,
                                                            scale: hoveredCategory === category.id ? 1.1 : 1
                                                        }}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                    >
                                                        {category.icon}
                                                    </motion.div>
                                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                                                        {category.count} articles
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                                    {category.name}
                                                </h3>

                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {category.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Star className="w-4 h-4" />
                                                    <span>Popular</span>
                                                </div>

                                                <motion.div
                                                    className="flex items-center gap-1 text-indigo-600 font-medium text-sm"
                                                    animate={{ x: hoveredCategory === category.id ? 4 : 0 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                >
                                                    Explore
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Interactive overlay */}
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100">
                                        <div className="text-3xl">{category.icon}</div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                    {category.name}
                                                </h3>
                                                {category.trending && (
                                                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                                                        <TrendingUp className="w-3 h-3" />
                                                        Trending
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">{category.description}</p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                                                {category.count} articles
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-indigo-600" />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* No Results */}
                {filteredCategories.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
                        <p className="text-gray-600">Try adjusting your search terms</p>
                    </motion.div>
                )}

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 text-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">{categories.length}</div>
                        <div className="text-indigo-800 font-medium">Categories</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{totalArticles}</div>
                        <div className="text-purple-800 font-medium">Total Articles</div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center">
                        <div className="text-3xl font-bold text-pink-600 mb-2">
                            {categories.filter(c => c.trending).length}
                        </div>
                        <div className="text-pink-800 font-medium">Trending Topics</div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 relative"
                >
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-1">
                        <div className="bg-white rounded-3xl p-8">
                            <div className="max-w-3xl mx-auto text-center">
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    className="text-4xl mb-4"
                                >
                                    💡
                                </motion.div>

                                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                    Can't find what you're looking for?
                                </h2>

                                <p className="text-gray-600 text-lg mb-8">
                                    Have a specific topic in mind? We'd love to create content that interests you most.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Request a Topic
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 border-2 border-indigo-200 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all"
                                    >
                                        Browse All Articles
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CategoriesPage;