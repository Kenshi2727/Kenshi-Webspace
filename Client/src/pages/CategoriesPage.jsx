import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    const categories = [
        { id: 1, name: 'Technology', count: 24, color: 'bg-indigo-100 text-indigo-800' },
        { id: 2, name: 'Geopolitics', count: 10, color: 'bg-orange-100 text-orange-800' },
        { id: 3, name: 'History', count: 20, color: 'bg-teal-100 text-teal-800' },
        { id: 4, name: 'Astronomy', count: 16, color: 'bg-cyan-100 text-cyan-800' },
        { id: 5, name: 'Religion & Culture', count: 14, color: 'bg-rose-100 text-rose-800' },
        { id: 6, name: 'Anime', count: 12, color: 'bg-purple-100 text-purple-800' },
        { id: 7, name: 'Literature', count: 18, color: 'bg-pink-100 text-pink-800' },
        { id: 8, name: 'Travel', count: 22, color: 'bg-yellow-100 text-yellow-800' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    >
                        Browse Categories
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.08 }}
                        className="mt-4 max-w-xl mx-auto text-lg text-gray-500"
                    >
                        Explore our content by category
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {categories.map((category) => (
                        <motion.div key={category.id} variants={itemVariants} whileHover={{ y: -6 }} whileTap={{ scale: 0.985 }}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Card className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 relative h-36 overflow-hidden border border-gray-100">
                                            <CardContent className="flex items-center justify-between p-0 h-full">
                                                <div className="pr-4 flex-1 min-w-0">
                                                    <motion.h3
                                                        layout
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.02 }}
                                                        className="text-lg font-semibold text-gray-900 truncate"
                                                        title={category.name}
                                                    >
                                                        {category.name}
                                                    </motion.h3>
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.06 }}
                                                        className="text-sm text-gray-500 mt-1"
                                                    >
                                                        {category.count} articles
                                                    </motion.p>
                                                </div>

                                                <Badge className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium max-w-[6rem] truncate text-center ${category.color}`}>
                                                    {category.name}
                                                </Badge>
                                            </CardContent>
                                            <Link
                                                to={`/articles?category=${encodeURIComponent(category.name)}`}
                                                aria-label={`View articles in ${category.name}`}
                                                className="absolute inset-0"
                                            />
                                        </Card>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>View all {category.count} articles in {category.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 }}
                    className="mt-16 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-8 shadow-md"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Can't find what you're looking for?</h2>
                        <p className="mt-4 text-gray-600">Suggest a new category or request content on a specific topic</p>
                        <div className="mt-6 flex justify-center">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md">
                                    Request a Topic
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CategoriesPage;
