import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { when: 'beforeChildren', staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const HomePage = () => {
    const featuredPosts = [
        { id: 1, title: "Getting Started with React Hooks", excerpt: "Learn how to use React Hooks to simplify your functional components and manage state effectively.", category: "React", date: "June 15, 2023", readTime: "5 min read" },
        { id: 2, title: "Mastering Tailwind CSS", excerpt: "Discover advanced techniques to customize and extend Tailwind CSS for your projects.", category: "CSS", date: "July 2, 2023", readTime: "8 min read" },
        { id: 3, title: "The Future of Web Development", excerpt: "Exploring emerging trends and technologies that will shape the future of web development.", category: "Web Development", date: "July 18, 2023", readTime: "10 min read" }
    ];

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <motion.section
                variants={itemVariants}
                className="bg-gradient-to-r from-indigo-500 to-purple-600"
            >
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
                    <motion.h1 variants={itemVariants} className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                        Share Your Thoughts with the World
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mt-6 max-w-lg mx-auto text-xl text-indigo-100">
                        A platform for passionate writers to express their ideas and connect with readers worldwide.
                    </motion.p>
                    <motion.div variants={itemVariants} className="mt-10 flex justify-center space-x-3">
                        <Link
                            to="/articles"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                        >Start Reading</Link>
                        <Link
                            to="#"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70"
                        >Contribute Now !</Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* Featured Posts */}
            <motion.section variants={itemVariants} className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div className="text-center mb-8" variants={itemVariants}>
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Featured Articles
                        </h2>
                        <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
                            Discover our most popular and trending content
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {featuredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                variants={itemVariants}
                                className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="h-48 w-full bg-gray-200 border-2 border-dashed rounded-t-lg" />
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-indigo-600">{post.category}</p>
                                        <Link to={`/articles/${post.id}`} className="block mt-2">
                                            <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                                        </Link>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="text-sm text-gray-500">{post.date} · {post.readTime}</div>
                                        <Link to={`/articles/${post.id}`} className="text-indigo-600 hover:text-indigo-900 font-medium">
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-12 text-center">
                        <Link to="/articles" className="text-indigo-600 hover:text-indigo-900 font-medium text-lg">
                            View all articles →
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section variants={itemVariants} className="bg-indigo-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to start writing?</span>
                        <span className="block text-indigo-200">Join our community today.</span>
                    </motion.h2>
                    <motion.div variants={itemVariants} className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <Link
                            to="#"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                        >Create Account</Link>
                    </motion.div>
                </div>
            </motion.section>

            <Footer />
        </motion.div>
    );
};

export default HomePage;
