import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/articles', label: 'Articles' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About' }
];

export default function Navbar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed w-full z-50 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border-b border-white/20 dark:border-gray-800/20"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-bold text-2xl">
                        Kenshi Webspace
                    </Link>
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
                    <Link to="/auth/login">
                        <Button variant="ghost" className="bg-indigo-600/65 text-white cursor-pointer text-sm font-medium">
                            Sign in
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}

