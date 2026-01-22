import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, Folder, Info, LogIn, UserPlus, Edit3, User, Settings, Shield, FileSearch, Code, Search, Lock, MapPin, ArrowRight, Sparkles, Layout, Workflow } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import FloatingOrbs from '../components/FloatingOrbs';
import AnimatedDots from '../components/AnimatedDots';
import MouseGlow from '../components/MouseGlow';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useUser } from '@clerk/clerk-react';

const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.1,
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

const SiteMapPage = () => {
    const [activeView, setActiveView] = useState('grid'); // 'grid' or 'diagram'
    const { isSignedIn } = useUser();

    const siteStructure = [
        {
            category: "Main Pages",
            icon: Home,
            color: "from-indigo-500 to-purple-500",
            links: [
                { name: "Home", path: "/", icon: Home },
                { name: "Articles", path: "/articles", icon: FileText },
                { name: "About", path: "/about", icon: Info },
            ]
        },
        {
            category: "Authentication",
            icon: LogIn,
            color: "from-purple-500 to-pink-500",
            links: [
                { name: "Sign In", path: "/auth/login", icon: LogIn },
                { name: "Sign Up", path: "/auth/sign-up", icon: UserPlus },
                { name: "Forgot Password", path: "/auth/forgot-password", icon: Lock },
                { name: "SSO Callback", path: "/auth/sso-callback", icon: Shield },
            ]
        },
        {
            category: "Content Management",
            icon: Edit3,
            color: "from-emerald-500 to-teal-500",
            links: [
                { name: "My Articles", path: "/my-articles", icon: FileText },
                { name: "Create New Article", path: "/articles/edit/new", icon: Edit3 },
                { name: "Review Articles", path: "/review", icon: FileSearch },
            ]
        },
        {
            category: "User & Admin",
            icon: User,
            color: "from-orange-500 to-red-500",
            links: [
                { name: "Profile", path: "/profile", icon: User },
                { name: "Maintainer Panel", path: "/super-admin/maintainer", icon: Settings },
            ]
        },
        {
            category: "Research & Tools",
            icon: Search,
            color: "from-blue-500 to-indigo-500",
            links: [
                { name: "Research Brewery", path: "/research", icon: Search },
                { name: "Code Page", path: "/code", icon: Code },
            ]
        },
        {
            category: "Legal & Info",
            icon: FileText,
            color: "from-slate-500 to-gray-600",
            links: [
                { name: "Privacy Policy", path: "/privacy", icon: Shield },
                { name: "Terms of Service", path: "/terms", icon: FileText },
                { name: "Sitemap", path: "/sitemap", icon: MapPin },
            ]
        }
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-gray-50"
        >
            {/* Hero Section */}
            <motion.section
                variants={itemVariants}
                className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600"
            >
                <FloatingOrbs />
                <AnimatedDots />
                <MouseGlow />

                <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
                    <div className='flex flex-col items-center'>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-block mb-6"
                        >
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl">
                                <MapPin className="w-12 h-12 text-white" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 mb-4"
                        >
                            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
                                <Sparkles className="w-4 h-4 mr-1" />
                                Navigation - Sitemap
                            </span>
                        </motion.div>
                    </div>

                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Explore <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 to-pink-300">Kenshi Webspace</span>
                    </motion.h1>

                    <motion.p
                        className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-indigo-100/95 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Navigate through all pages and features of our platform. Find exactly what you're looking for.
                    </motion.p>

                    {/* View Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex gap-2 p-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    >
                        <button
                            onClick={() => setActiveView('grid')}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeView === 'grid'
                                ? 'bg-white text-indigo-600 shadow-lg'
                                : 'text-white/80 hover:text-white'
                                }`}
                        >
                            <Layout className="w-4 h-4 inline mr-2" />
                            Grid View
                        </button>
                        <button
                            onClick={() => setActiveView('diagram')}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeView === 'diagram'
                                ? 'bg-white text-indigo-600 shadow-lg'
                                : 'text-white/80 hover:text-white'
                                }`}
                        >
                            <Workflow className="w-4 h-4 inline mr-2" />
                            Map View
                        </button>
                    </motion.div>
                </div>

                {/* Bottom wave with correct color */}
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,48 C180,120 360,0 720,48 C1080,96 1260,24 1440,64 L1440 120 L0 120 Z" fill="rgba(255,255,255,0.06)" />
                </svg>
            </motion.section>

            {/* Content Section */}
            <motion.section variants={itemVariants} className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    {activeView === 'grid' ? (
                        /* Grid View */
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Kenshi Webspace Sitemap</h2>
                                <p className="text-gray-600">Browse through all available pages and features</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {siteStructure.map((section, sectionIdx) => {
                                    const SectionIcon = section.icon;
                                    return (
                                        <motion.div
                                            key={sectionIdx}
                                            // variants={itemVariants}
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <Card className="group h-full border border-gray-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-xl overflow-hidden bg-white">
                                                <CardContent className="p-6">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <motion.div
                                                            whileHover={{ rotate: 12 }}
                                                            transition={{ duration: 0.3 }}
                                                            className={`bg-gradient-to-r ${section.color} p-3 rounded-xl shadow-lg`}
                                                        >
                                                            <SectionIcon className="w-6 h-6 text-white" />
                                                        </motion.div>
                                                        <h2 className="text-xl font-bold text-gray-900">
                                                            {section.category}
                                                        </h2>
                                                    </div>

                                                    <ul className="space-y-2">
                                                        {section.links.map((link, linkIdx) => {
                                                            const LinkIcon = link.icon;
                                                            return (
                                                                <motion.li
                                                                    key={linkIdx}
                                                                    whileHover={{ x: 5 }}
                                                                    transition={{ type: 'spring', stiffness: 300 }}
                                                                >
                                                                    <Link
                                                                        to={link.path}
                                                                        className="group/link flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                                                                    >
                                                                        <LinkIcon className="w-4 h-4 text-gray-500 group-hover/link:text-indigo-600 transition-colors flex-shrink-0" />
                                                                        <span className="text-gray-700 group-hover/link:text-indigo-700 font-medium transition-colors">
                                                                            {link.name}
                                                                        </span>
                                                                        <ArrowRight className="w-4 h-4 ml-auto text-indigo-600 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                                    </Link>
                                                                </motion.li>
                                                            );
                                                        })}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        /* Diagram View */
                        <motion.div
                            key="diagram"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Site Architecture</h2>
                                <p className="text-gray-600">Visual overview of Kenshi Webspace structure</p>
                            </div>

                            {/* Site Map Diagram */}
                            <div className="relative">
                                {/* Root Node */}
                                <div className="flex justify-center mb-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Home className="w-6 h-6" />
                                            <span className="font-bold text-lg">Kenshi Webspace</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Connecting Lines */}
                                <svg className="absolute top-20 left-0 w-full h-24 pointer-events-none" style={{ zIndex: 0 }}>
                                    <line x1="50%" y1="0" x2="16.66%" y2="100%" stroke="#e5e7eb" strokeWidth="2" />
                                    <line x1="50%" y1="0" x2="33.33%" y2="100%" stroke="#e5e7eb" strokeWidth="2" />
                                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e5e7eb" strokeWidth="2" />
                                    <line x1="50%" y1="0" x2="66.66%" y2="100%" stroke="#e5e7eb" strokeWidth="2" />
                                    <line x1="50%" y1="0" x2="83.33%" y2="100%" stroke="#e5e7eb" strokeWidth="2" />
                                </svg>

                                {/* Category Nodes */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative" style={{ zIndex: 1 }}>
                                    {siteStructure.slice(0, 5).map((section, idx) => {
                                        const SectionIcon = section.icon;
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 + idx * 0.1 }}
                                                className="flex flex-col items-center"
                                            >
                                                <div className={`bg-gradient-to-r ${section.color} p-4 rounded-xl shadow-lg mb-4`}>
                                                    <SectionIcon className="w-6 h-6 text-white" />
                                                </div>
                                                <h3 className="text-sm font-bold text-gray-900 text-center mb-3">{section.category}</h3>
                                                <div className="w-full space-y-2">
                                                    {section.links.map((link, linkIdx) => (
                                                        <Link
                                                            key={linkIdx}
                                                            to={link.path}
                                                            className="block bg-gray-50 hover:bg-indigo-50 px-3 py-2 rounded-lg text-xs text-gray-700 hover:text-indigo-600 transition-colors text-center border border-gray-200 hover:border-indigo-300"
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                {/* Legal Section - Separate Row */}
                                {siteStructure.length > 5 && (
                                    <div className="mt-12 pt-8 border-t border-gray-200">
                                        <div className="flex justify-center">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                                className="flex flex-col items-center max-w-xs"
                                            >
                                                <div className={`bg-gradient-to-r ${siteStructure[5].color} p-4 rounded-xl shadow-lg mb-4`}>
                                                    <FileText className="w-6 h-6 text-white" />
                                                </div>
                                                <h3 className="text-sm font-bold text-gray-900 text-center mb-3">{siteStructure[5].category}</h3>
                                                <div className="w-full space-y-2">
                                                    {siteStructure[5].links.map((link, linkIdx) => (
                                                        <Link
                                                            key={linkIdx}
                                                            to={link.path}
                                                            className="block bg-gray-50 hover:bg-indigo-50 px-3 py-2 rounded-lg text-xs text-gray-700 hover:text-indigo-600 transition-colors text-center border border-gray-200 hover:border-indigo-300"
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Footer Note */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 text-center"
                    >
                        <div className="inline-block bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <p className="text-gray-600 text-lg">
                                Can't find what you're looking for?{' '}
                                <Link to="/about" className="text-indigo-600 hover:text-indigo-700 font-semibold underline decoration-2 underline-offset-2">
                                    Contact us
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                variants={itemVariants}
                className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 shadow-2xl"
            >
                {/* Animated Background Effects */}
                <div className="absolute inset-0">
                    {/* Floating orbs */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-indigo-300/20 rounded-full blur-lg animate-bounce delay-1000"></div>
                    <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-violet-300/15 rounded-full blur-md animate-pulse delay-500"></div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
                    </div>
                </div>

                {/* Enhanced decorative blob */}
                <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-20 h-[500px] w-[500px] opacity-100 animate-spin"
                    style={{ animationDuration: '20s' }}
                    viewBox="0 0 600 600"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <g transform="translate(300,300)">
                        <path d="M120,-170C170,-130,204,-67,209,-1C214,65,189,130,142,168C95,206,27,217,-33,206C-92,195,-143,163,-174,112C-205,61,-217,-12,-192,-66C-166,-120,-104,-154,-41,-177C22,-200,105,-210,120,-170Z"
                            fill="url(#blobGradient)" />
                    </g>
                </svg>

                {/* Additional decorative blob */}
                <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-8 -bottom-12 h-[350px] w-[350px] opacity-10 animate-pulse"
                    viewBox="0 0 600 600"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g transform="translate(300,300)">
                        <path d="M85,-120C115,-95,145,-75,160,-45C175,-15,175,25,160,60C145,95,115,125,75,140C35,155,-15,155,-55,140C-95,125,-125,95,-140,60C-155,25,-155,-15,-140,-45C-125,-75,-95,-95,-65,-120C-35,-145,55,-175,85,-120Z"
                            fill="#ffffff" opacity="0.1" />
                    </g>
                </svg>

                <div className="relative z-10 max-w-7xl mx-auto py-16 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl text-center lg:text-left">
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6"
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            Join 10,000+ writers worldwide
                        </motion.div>

                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
                        >
                            <span className="block">Ready to start</span>
                            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-white animate-gradient-x">
                                writing magic?
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg sm:text-xl text-indigo-100/90 leading-relaxed max-w-lg mx-auto lg:mx-0"
                        >
                            Transform your ideas into captivating stories. Share, collaborate, and grow with a vibrant community of passionate writers.
                        </motion.p>

                        {/* Feature highlights */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-white/80"
                        >
                            <div className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                                Free to start
                            </div>
                            <div className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                                Instant feedback
                            </div>
                            <div className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                Global community
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col gap-4 min-w-[280px]"
                    >
                        {/* Primary CTA */}
                        <Button
                            asChild
                            className="group relative overflow-hidden rounded-2xl px-8 py-4 bg-white text-purple-600 hover:bg-gray-50 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-white/25 focus:outline-none focus:ring-4 focus:ring-white/30 font-bold text-lg"
                        >
                            <Link to={isSignedIn ? "/articles/edit/new" : "/auth/sign-up"} aria-label="Create your free account">
                                <span className="relative z-10 inline-flex items-center">
                                    <Edit3 className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" />
                                    Start Writing Now
                                </span>
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
                            </Link>
                        </Button>

                        {/* Secondary CTA */}
                        <Button
                            asChild
                            variant="ghost"
                            className="group rounded-2xl px-6 py-4 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all duration-300 backdrop-blur-sm font-semibold"
                        >
                            <Link to="/about" aria-label="Learn more about Kenshi Webspace" className="inline-flex items-center">
                                Explore Features
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>

                        {/* Social proof */}
                        <div className="flex items-center justify-center gap-2 mt-4 text-white/70 text-sm">
                            <div className="flex -space-x-2">
                                <img
                                    src="https://i.pravatar.cc/150?img=1"
                                    alt="User 1"
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                />
                                <img
                                    src="https://i.pravatar.cc/150?img=3"
                                    alt="User 2"
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                />
                                <img
                                    src="rishikesh.jpg"
                                    alt="User 3"
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                />
                                <img
                                    src="abhishek.jpg"
                                    alt="User 4"
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                />
                                <Link to="/auth/sign-up">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full border-2 border-white/20 hover:border-white flex items-center justify-center text-xs font-bold text-white hover:scale-110 hover:text-sm text-center leading-none cursor-pointer">+</div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Join !</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </Link>
                            </div>
                            <span>Join the community</span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
            </motion.section>
        </motion.div>
    );
};

export default SiteMapPage;