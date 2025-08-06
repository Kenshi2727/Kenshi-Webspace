import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ArticlesPage = () => {
    const articles = [
        { id: 1, title: "React Best Practices", category: "React", date: "July 10, 2023", readTime: "7 min read" },
        { id: 2, title: "CSS Grid vs Flexbox", category: "CSS", date: "July 5, 2023", readTime: "6 min read" },
        { id: 3, title: "JavaScript Design Patterns", category: "JavaScript", date: "June 28, 2023", readTime: "9 min read" },
        { id: 4, title: "State Management Solutions", category: "React", date: "June 20, 2023", readTime: "8 min read" },
        { id: 5, title: "Responsive Design Techniques", category: "CSS", date: "June 15, 2023", readTime: "5 min read" },
        { id: 6, title: "Modern Web Security", category: "Security", date: "June 10, 2023", readTime: "10 min read" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* <Navbar /> */}

            <main className="flex-grow">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
                >
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            All Articles
                        </h1>
                        <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
                            Browse our complete collection of articles and tutorials
                        </p>
                    </motion.div>

                    <motion.div variants={containerVariants} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <motion.div
                                key={article.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.03 }}
                                className="transition-transform"
                            >
                                <Card className="p-0 overflow-hidden">
                                    <div className="h-48 bg-gray-200 border-2 border-dashed" />
                                    <CardContent className="p-6">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                                            {article.category}
                                        </span>
                                        <Link to={`/articles/${article.id}`} className="block mt-4">
                                            <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-sm text-gray-500">{article.date}</span>
                                            <span className="text-sm text-gray-500">{article.readTime}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-12 flex justify-center">
                        <Button variant="outline">Load More Articles</Button>
                    </motion.div>
                </motion.div>
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default ArticlesPage;
