import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown, FileText, PenTool, Settings, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { useSelector } from 'react-redux';

const AvatarDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const { signOut } = useClerk();
    const currentUser = useSelector(state => state);
    // console.log("FULL REDUX STATE 👉", currentUser);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSignOutClick = async () => {
        try {
            await signOut();
            setIsOpen(false);
            console.log("Signed out successfully!");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Don't render if user is not signed in
    if (!isSignedIn || !user) {
        return null;
    }

    // Get user initials
    const getInitials = (name) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
    };

    // Check if user is admin or maintainer
    const isAdmin = (currentUser?.role === 'ADMIN' || currentUser?.role === 'OWNER');
    const isMaintainer = (currentUser.role === 'MAINTAINER' || currentUser?.role === 'OWNER');

    const userInitials = getInitials(user.fullName || user.firstName || user.username);
    const userName = user.fullName || user.firstName || user.username || 'User';
    const userEmail = user.primaryEmailAddress?.emailAddress || '';

    const menuItems = [
        {
            icon: User,
            label: 'Profile',
            to: '/profile',
            description: 'View and edit your profile'
        },
        {
            icon: FileText,
            label: 'Your Articles',
            to: '/my-articles',
            description: 'Manage your published articles'
        },
        {
            icon: PenTool,
            label: 'Start Writing',
            to: '/articles/edit/new',
            description: 'Create a new article'
        }
    ];

    if (isAdmin) {
        menuItems.push({
            icon: Settings,
            label: 'Admin Panel',
            to: '/review',
            description: 'Manage the platform',
            isAdmin: true
        });
    }

    if (isMaintainer) {
        menuItems.push({
            icon: ShieldCheck,
            label: 'Maintainer Console',
            to: '/super-admin/maintainer',
            description: 'Access tools for content moderation',
            isMaintainer: true
        });
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 transition-all duration-200 backdrop-blur-sm border border-purple-300/30 dark:border-purple-700/30 shadow-lg hover:shadow-purple-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Avatar Image with glow effect */}
                <div className="relative">
                    {user.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt={userName}
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-400/50 dark:ring-purple-500/50"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white font-bold text-sm ring-2 ring-purple-400/50 dark:ring-purple-500/50 shadow-lg">
                            {userInitials}
                        </div>
                    )}
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"></div>
                </div>

                {/* Dropdown Arrow */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-200/50 dark:border-purple-800/50 overflow-hidden z-50"
                        style={{
                            boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)'
                        }}
                    >
                        {/* User Info Header with gradient */}
                        <div className="relative px-6 py-4 bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-purple-800/20 border-b border-purple-200/50 dark:border-purple-800/50">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    {user.imageUrl ? (
                                        <img
                                            src={user.imageUrl}
                                            alt={userName}
                                            className="w-12 h-12 rounded-full object-cover ring-3 ring-purple-400/50 shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white font-bold text-base ring-3 ring-purple-400/50 shadow-lg">
                                            {userInitials}
                                        </div>
                                    )}
                                    <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-purple-500 dark:text-purple-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-bold dark:text-white truncate bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        {userName}
                                    </p>
                                    {userEmail && (
                                        <p className="text-sm text-purple-600 dark:text-purple-400 truncate font-medium">{userEmail}</p>
                                    )}
                                    <div className="flex items-center mt-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            {menuItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <Link key={index} to={item.to} onClick={() => setIsOpen(false)}>
                                        <motion.div
                                            className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r transition-all duration-200 cursor-pointer group ${(item.isAdmin || item.isMaintainer)
                                                ? 'hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/20 dark:hover:to-red-900/20 hover:text-orange-700 dark:hover:text-orange-400'
                                                : 'hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 hover:text-purple-700 dark:hover:text-purple-300'
                                                }`}
                                            whileHover={{ x: 8 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        >
                                            <div className={`p-2 rounded-lg mr-4 transition-all duration-200 ${(item.isAdmin || item.isMaintainer)
                                                ? 'bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/40'
                                                : 'bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40'
                                                }`}>
                                                <IconComponent className={`w-5 h-5 ${(item.isAdmin || item.isMaintainer)
                                                    ? 'text-orange-600 dark:text-orange-400'
                                                    : 'text-purple-600 dark:text-purple-400'
                                                    }`} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">{item.label}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                                            </div>
                                            {(item.isAdmin) && (
                                                <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
                                                    ADMIN
                                                </div>
                                            )}
                                            {(item.isMaintainer) && (
                                                <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
                                                    OWNER
                                                </div>
                                            )}
                                        </motion.div>
                                    </Link>
                                );
                            })}

                            {/* Divider */}
                            <div className="my-2 mx-4 border-t border-purple-200/50 dark:border-purple-800/50"></div>

                            {/* Sign Out Button */}
                            <motion.button
                                onClick={handleSignOutClick}
                                className="flex items-center w-full px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 group"
                                whileHover={{ x: 8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="p-2 rounded-lg mr-4 bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-all duration-200">
                                    <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">Sign Out</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">End your session securely</p>
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AvatarDropdown;