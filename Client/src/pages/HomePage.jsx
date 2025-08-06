import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { featuredPosts } from '../seeds/blogs.seed';

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.25,
            duration: 0.6,
            ease: 'easeOut'
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

const cardHover = {
    whileHover: {
        scale: 1.02,
        boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.1)',
        transition: { type: 'spring', stiffness: 300 }
    }
};

const HomePage = () => {


    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-50"
        >
            {/* <Navbar /> */}

            {/* Hero Section */}
            <motion.section variants={itemVariants} className="bg-gradient-to-r from-indigo-500 to-purple-600">
                <motion.div
                    className="max-w-7xl mx-auto py-24 px-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-5xl font-bold tracking-tight text-white"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Share Your Thoughts with the World
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-xl text-indigo-100 max-w-xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Kenshi Webspace is a platform where I and my friends publish blogs, exchange ideas, and connect with readers around the world.
                    </motion.p>
                    <motion.div className="mt-8 flex justify-center gap-4">
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Button asChild variant="secondary">
                                <Link to="/articles">Start Reading</Link>
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Button asChild variant="outline">
                                <Link to="#">Contribute Now!</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Featured Posts */}
            <motion.section variants={itemVariants} className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div className="text-center mb-10" variants={itemVariants}>
                        <h2 className="text-4xl font-semibold text-gray-900">
                            Featured Articles
                        </h2>
                        <p className="mt-2 text-lg text-gray-500">
                            Discover our most popular and trending content
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {featuredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                variants={itemVariants}
                                {...cardHover}
                                className="flex flex-col"
                            >
                                <Card className="p-0 flex flex-col h-full transition-shadow">
                                    <Link to={`/articles/${post.id}`}>
                                        {/* <motion.div className="h-48 w-full bg-gray-200 border-2 border-dashed rounded-t-xl" /> */}
                                        <motion.div className="h-48 w-full overflow-hidden rounded-t-xl">
                                            <img
                                                src={post.thumbnail}
                                                alt="Cover"
                                                className="h-full w-full object-cover"
                                            />
                                        </motion.div>

                                        <CardContent className="p-6 space-y-4 flex-grow">
                                            <p className="text-sm font-medium text-indigo-600">{post.category}</p>

                                            <motion.h3
                                                className="text-xl font-semibold text-gray-900"
                                                whileHover={{ color: '#4f46e5' }}
                                            >
                                                {post.title}
                                            </motion.h3>
                                            <p className="text-gray-500 mt-2">{post.excerpt}</p>

                                            <div className="flex justify-between items-center pt-4">
                                                <span className="text-sm text-gray-400">{post.date} · {post.readTime}</span>
                                                <Link
                                                    to={`/articles/${post.id}`}
                                                    className="text-indigo-600 hover:underline text-sm"
                                                >
                                                    Read more →
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-10 text-center">
                        <Link to="/articles" className="text-indigo-600 hover:underline text-lg">
                            View all articles →
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section variants={itemVariants} className="bg-indigo-700">
                <div className="max-w-7xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center justify-between">
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white">
                        <span className="block">Ready to start writing?</span>
                        <span className="block text-indigo-200">Join our community today.</span>
                    </motion.h2>
                    <motion.div variants={itemVariants} className="mt-6 md:mt-0">
                        <Button asChild variant="secondary">
                            <Link to="#">Create Account</Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* <Footer /> */}
        </motion.div>
    );
};

export default HomePage;