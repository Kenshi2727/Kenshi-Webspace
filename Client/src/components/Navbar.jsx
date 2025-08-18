import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/articles', label: 'Articles' },
    { to: '/categories', label: 'Categories' },
    { to: '/research', label: 'Research' },
    { to: '/code', label: 'Code' },
    { to: '/about', label: 'About' }
];

export default function Navbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const { isSignedIn } = useAuth();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut();
            console.log("Signed out successfully!");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed w-full z-50 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border-b border-white/20 dark:border-gray-800/20"
        >
            {/* make this container relative so the mobile dropdown can be absolutely positioned */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-bold text-2xl">
                        Kenshi Webspace
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={cn(
                                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    isActive(to)
                                        ? 'bg-indigo-600/65 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:text-gray-900 dark:hover:text-white'
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side: sign in/out (desktop) and mobile menu button */}
                    <div className="flex items-center gap-3">
                        {/* desktop sign-in/out */}
                        <div className="hidden md:block">
                            {isSignedIn ? (
                                <Button variant="ghost" onClick={handleSignOut} className="bg-indigo-600/65 text-white cursor-pointer text-sm font-medium">
                                    Sign out
                                </Button>
                            ) : (
                                <Link to="/auth/login">
                                    <Button variant="ghost" className="bg-indigo-600/65 text-white cursor-pointer text-sm font-medium">
                                        Sign in
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* mobile hamburger */}
                        <button
                            type="button"
                            aria-label="Toggle navigation"
                            aria-expanded={open}
                            onClick={() => setOpen((s) => !s)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-white/20 dark:hover:bg-gray-700/20"
                        >
                            {/* simple hamburger icon */}
                            <svg className="h-6 w-6 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown - overlayed and absolutely positioned so it doesn't stretch the navbar */}
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="md:hidden absolute left-0 right-0 top-full px-4 z-50"
                    >
                        <div className="bg-white/95 dark:bg-gray-900/95 rounded-b-lg shadow border border-white/20 dark:border-gray-800/20 overflow-hidden">
                            <nav className="flex flex-col">
                                {navLinks.map(({ to, label }) => (
                                    <Link
                                        key={to}
                                        to={to}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            'block px-4 py-3 text-sm font-medium transition-colors',
                                            isActive(to)
                                                ? 'bg-indigo-600/65 text-white'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/20 hover:text-gray-900 dark:hover:text-white'
                                        )}
                                    >
                                        {label}
                                    </Link>
                                ))}

                                <div className="px-3 py-3">
                                    {isSignedIn ? (
                                        <Button onClick={() => { setOpen(false); handleSignOut(); }} className="w-full text-sm font-medium">
                                            Sign out
                                        </Button>
                                    ) : (
                                        <Link to="/auth/login" onClick={() => setOpen(false)}>
                                            <Button className="w-full text-sm font-medium">Sign in</Button>
                                        </Link>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
