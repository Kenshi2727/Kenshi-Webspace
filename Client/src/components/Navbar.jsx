import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import AvatarDropdown from './AvatarDropdown';
import { ChevronRight, LogOut, LogIn } from "lucide-react";

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

    const listVariants = {
        hidden: { opacity: 0, y: -6 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { when: "beforeChildren", staggerChildren: 0.04, delayChildren: 0 },
        },
        exit: { opacity: 0, y: -6, transition: { when: "afterChildren" } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: -6 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
        exit: { opacity: 0, y: -6, transition: { duration: 0.12 } },
    };

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed w-full z-50 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border-b border-white/20 dark:border-gray-800/20 shadow-md"
        >
            {/* make this container relative so the mobile dropdown can be absolutely positioned */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-bold text-xl sm:text-2xl">
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
                            {!isSignedIn && (
                                <Link to="/auth/login">
                                    <Button variant="ghost" className="bg-indigo-600/65 text-white cursor-pointer text-sm font-medium">
                                        Sign in
                                    </Button>
                                </Link>
                            )}
                        </div>

                        <AvatarDropdown />

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
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={listVariants}
                        className="md:hidden absolute left-0 right-0 top-full px-4 z-50"
                    >
                        {/* ghost / glass surface */}
                        <div
                            className={
                                "backdrop-blur-sm bg-white/95 dark:bg-gray-900/60 border border-white/20 dark:border-gray-800/30 " +
                                "rounded-b-lg shadow-xl overflow-hidden ring-1 ring-black/5"
                            }
                        >
                            <motion.nav role="menu" aria-label="Mobile navigation" className="flex flex-col">
                                <motion.ul variants={listVariants} className="flex flex-col py-2">
                                    {navLinks.map(({ to, label }) => (
                                        <motion.li key={to} variants={itemVariants} role="none">
                                            <Link
                                                to={to}
                                                onClick={() => setOpen(false)}
                                                role="menuitem"
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors select-none",
                                                    "rounded-md mx-2",
                                                    isActive(to)
                                                        ? "bg-indigo-600/90 text-white shadow-sm"
                                                        : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-gray-900 dark:hover:text-white"
                                                )}
                                            >
                                                {/* left indicator for current page */}
                                                <span className="flex-none">
                                                    {isActive(to) ? (
                                                        <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
                                                    ) : (
                                                        <span className="inline-block h-2 w-2 rounded-full bg-transparent" />
                                                    )}
                                                </span>

                                                <span className="flex-1">{label}</span>

                                                <ChevronRight className={cn(
                                                    "flex-none h-4 w-4 transition-transform",
                                                    isActive(to) ? "opacity-80" : "text-gray-400 dark:text-gray-400"
                                                )} />
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                {/* divider */}
                                <div className="border-t border-white/10 dark:border-gray-800/40" />

                                {/* auth actions */}
                                <motion.div variants={itemVariants} className="px-3 py-3">
                                    {isSignedIn ? (
                                        <Button
                                            onClick={() => {
                                                setOpen(false);
                                                handleSignOut();
                                            }}
                                            className="w-full flex items-center justify-center gap-2 text-sm font-medium"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign out
                                        </Button>
                                    ) : (
                                        <Link to="/auth/login" onClick={() => setOpen(false)}>
                                            <Button className="w-full flex items-center justify-center gap-2 text-sm font-medium">
                                                <LogIn className="h-4 w-4" />
                                                Sign in
                                            </Button>
                                        </Link>
                                    )}
                                </motion.div>
                            </motion.nav>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
