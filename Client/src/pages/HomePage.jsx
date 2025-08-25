import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { featuredPosts } from '../seeds/blogs.seed';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import AnimatedFloatingSquares from '../components/AnimatedFloatingSquares';
import FloatingOrbs from '../components/FloatingOrbs';
import AnimatedDots from '../components/AnimatedDots';
import MouseGlow from '../components/MouseGlow';

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
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false);

    async function handleConfirm() {
        try {
            setSubmitting(true);
            // async actions if needed
        } catch (err) {
            // handle
        } finally {
            setSubmitting(false);
            setOpen(false);
        }
    }

    function handleCancel() {
        setOpen(false);
    }

    // Decorative helpers
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-50"
        >
            {/* ---------- HERO ---------- */}
            <motion.section
                variants={itemVariants}
                className="min-h-screen relative hero-section overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600"
            >
                <FloatingOrbs />
                <AnimatedDots />
                <MouseGlow />
                <AnimatedFloatingSquares />

                {/*Hero Content*/}
                <div className="max-w-7xl mx-auto px-4 pt-12 sm:pt-16 lg:pt-24 pb-28 sm:pb-32 lg:pb-40 min-h-[68vh] lg:min-h-[78vh]">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        {/* LEFT: Messaging (bigger) */}
                        <motion.div variants={itemVariants} className="md:col-span-7 text-center md:text-left">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90">✨ Featured</span>
                                <span className="text-sm text-white/80">Curated posts from the Kenshi community</span>
                            </div>

                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                Share your ideas — <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 to-pink-300">write boldly</span> and connect with readers.
                            </motion.h1>

                            <motion.p className="mt-6 text-lg sm:text-xl max-w-2xl text-indigo-100/95" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
                                Kenshi Webspace is a shared journey between me and my friends — writing blogs, exchanging ideas, and connecting with readers who love to think, learn, and create.
                            </motion.p>

                            <motion.div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 justify-center md:justify-start" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <motion.div whileHover={{ scale: 1.03 }}>
                                    <Button asChild className="px-6 py-3">
                                        <Link to="/articles">Start Reading</Link>
                                    </Button>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.03 }}>
                                    <Button onClick={() => setOpen(true)} asChild variant="outline" className="px-6 py-3">
                                        <span>Contribute Now</span>
                                    </Button>
                                </motion.div>

                                <div className="mt-3 sm:mt-0 text-sm text-indigo-100/80 pl-1 lg:py-1.5">
                                    <span className="font-bold">No review queue</span> — publish drafts, get feedback.
                                </div>
                            </motion.div>

                            <motion.ul className="mt-8 sm:mt-10 flex flex-col md:flex-row gap-4 text-sm text-indigo-100/80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
                                <li className="inline-flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white/70" />
                                    <span>Fast, simple editor</span>
                                </li>
                                <li className="inline-flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white/70" />
                                    <span>Responsive reading experience</span>
                                </li>
                                <li className="inline-flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-white/70" />
                                    <span>Community feedback</span>
                                </li>
                            </motion.ul>
                        </motion.div>

                        {/* RIGHT: Previews */}
                        <motion.div variants={itemVariants} className="md:col-span-5 relative flex items-center justify-center">
                            <div className="w-full">
                                {/* Mobile: horizontal snap (visible on small screens) */}
                                {/* <div className="md:hidden -mx-4 px-4">
                                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2">
                                        {featuredPosts.slice(0, 3).map((p) => (
                                            <Link key={p.id} to={`/articles/${p.id}`} className="snap-center shrink-0 w-[260px] rounded-2xl shadow-lg overflow-hidden border border-white/8 bg-white/5 backdrop-blur-md">
                                                <div className="h-40 overflow-hidden rounded-t-2xl">
                                                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                                                </div>
                                                <CardContent className="p-3">
                                                    <p className="text-xs font-semibold text-indigo-200">{p.category}</p>
                                                    <h3 className="mt-1 text-sm font-semibold text-white/95 line-clamp-2">{p.title}</h3>
                                                    <p className="mt-2 text-xs text-indigo-100/70 line-clamp-2">{p.excerpt}</p>
                                                </CardContent>
                                            </Link>
                                        ))}
                                    </div>
                                </div> */}

                                {/* Desktop: stacked cards (visible on sm+) */}
                                <div className="relative hidden sm:block w-full max-w-[340px] mx-auto h-[380px]">
                                    {featuredPosts.map((p, i) => {
                                        const xOffset = i === 0 ? -12 : i === 1 ? 0 : 12;
                                        const topOffsetPx = i * 30;

                                        return (
                                            <motion.div
                                                key={p.id}
                                                initial={{ opacity: 0, y: 30, rotate: i === 0 ? -3 : i === 1 ? 2 : -1 }}
                                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                                transition={{ delay: 0.08 * i, duration: 0.5, type: 'spring', stiffness: 150 }}
                                                whileHover={{ y: -10, scale: 1.035, zIndex: 80 }}
                                                className="pointer-events-auto absolute left-1/2 -translate-x-1/2 w-[320px] rounded-2xl shadow-2xl overflow-hidden border border-white/8 bg-white/5 backdrop-blur-md"
                                                style={{
                                                    top: `${topOffsetPx + 24}px`,
                                                    transform: `translateX(-50%) translateX(${xOffset}px)`,
                                                    zIndex: 30 - i
                                                }}
                                            >
                                                <Link to={`/articles/${p.id}`} className="block">
                                                    <div className="h-44 overflow-hidden rounded-t-2xl">
                                                        <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                                                    </div>
                                                    <CardContent className="p-4">
                                                        <p className="text-xs font-semibold text-indigo-200">{p.category}</p>
                                                        <h3 className="mt-1 text-base font-semibold text-white/95 line-clamp-2">{p.title}</h3>
                                                        <p className="mt-2 text-xs text-indigo-100/70 line-clamp-3">{p.excerpt}</p>
                                                    </CardContent>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}

                                    {/* anchor so stack visually sits on something */}
                                    <div aria-hidden className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 h-1 rounded-full bg-white/8 shadow-inner" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* bottom wave */}
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,48 C180,120 360,0 720,48 C1080,96 1260,24 1440,64 L1440 120 L0 120 Z" fill="rgba(255,255,255,0.06)" />
                </svg>

                {/* Contribute dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-md w-full sm:mx-4 rounded-2xl shadow-xl border border-white/10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-0 overflow-hidden">
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                            <div className="px-6 pt-6 pb-4 border-b border-white/10">
                                <DialogHeader>
                                    <DialogTitle className="text-xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                        Contribute to Kenshi Webspace?
                                    </DialogTitle>
                                </DialogHeader>
                                <p className="text-sm text-gray-300 mt-1">We welcome contributors — would you like to join and publish your articles on Kenshi Webspace?</p>
                            </div>

                            <DialogFooter className="px-6 py-4 flex items-center justify-end gap-3 bg-gray-800/40">
                                <Button variant="ghost" onClick={handleCancel} disabled={submitting} className="hover:bg-gray-700/50 text-gray-300">No, thanks</Button>
                                <Link to="/my-articles ">
                                    <Button onClick={handleConfirm} disabled={submitting} className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white shadow-md">
                                        {submitting ? "Processing…" : "Yes, contribute"}
                                    </Button>
                                </Link>
                            </DialogFooter>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            </motion.section>

            {/* ---------- REST OF PAGE ---------- */}
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
                                        <motion.div className="h-48 w-full overflow-hidden rounded-t-xl">
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </motion.div>

                                        <CardContent className="p-6 space-y-4 flex-grow">
                                            <p className="text-sm font-medium text-indigo-600">{post.category}</p>

                                            <motion.h3
                                                className="text-xl font-semibold text-gray-900 line-clamp-2"
                                                whileHover={{ color: '#4f46e5' }}
                                            >
                                                {post.title}
                                            </motion.h3>
                                            <p className="text-gray-500 mt-2 line-clamp-3">{post.excerpt}</p>

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
                            <Link to="/auth/sign-up">Create Account</Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </motion.div>
    );
};

export default HomePage;
