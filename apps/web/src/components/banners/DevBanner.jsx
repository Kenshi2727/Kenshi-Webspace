import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, X, Bug } from "lucide-react";

const REPORT_URL = "https://github.com/Kenshi2727";

export default function DevBanner() {
    const [hidden, setHidden] = useState(() => {
        // Using in-memory storage instead of localStorage for Claude.ai compatibility
        return false;
    });
    const prefersReducedMotion = useReducedMotion();
    const bannerRef = useRef(null);

    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") setHidden(true);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    if (hidden) return null;

    const containerVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            ref={bannerRef}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            role="status"
            aria-live="polite"
            className="mx-3 sm:mx-4 md:mx-6 lg:mx-auto lg:max-w-7xl my-2"
        >
            <div className="relative overflow-hidden rounded-xl border border-amber-200/60 dark:border-amber-700/50 shadow-md backdrop-blur-sm">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/95 via-yellow-50/90 to-orange-50/95 dark:from-amber-900/95 dark:via-orange-900/90 dark:to-red-900/95" />

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10 dark:opacity-5">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-300 to-transparent rounded-full blur-xl animate-pulse" />
                </div>

                {/* Content */}
                <div className="relative p-3 sm:p-4">
                    <div className="flex items-center justify-between space-x-4">

                        {/* Left Content */}
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                            {/* Icon */}
                            <div className="relative flex-shrink-0">
                                <motion.div
                                    variants={pulseVariants}
                                    animate="pulse"
                                    className="absolute -inset-1 rounded-full bg-amber-300/30 dark:bg-amber-600/20"
                                />
                                <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-700 rounded-lg shadow-sm">
                                    <Globe className="w-4 h-4 text-amber-800 dark:text-amber-100" />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-50 truncate">
                                        Work in Progress
                                    </h4>
                                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-200 bg-amber-200/80 dark:bg-amber-800/60 rounded-full flex-shrink-0">
                                        Beta
                                    </span>
                                </div>
                                <p className="text-xs text-amber-800/90 dark:text-amber-100/85 line-clamp-2">
                                    Development starts Q2 2026. UI may be inconsistent — please report visual bugs.
                                </p>
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <motion.a
                                href={REPORT_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <Bug className="w-3 h-3 mr-1" />
                                Report Bug
                            </motion.a>

                            <motion.a
                                href={REPORT_URL}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="sm:hidden inline-flex items-center justify-center w-8 h-8 text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                                title="Report Bug"
                            >
                                <Bug className="w-3 h-3" />
                            </motion.a>

                            <motion.button
                                onClick={() => setHidden(true)}
                                whileHover={{ scale: 1.05, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Close banner"
                                className="inline-flex items-center justify-center w-8 h-8 text-amber-700 dark:text-amber-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-lg border border-amber-200/60 dark:border-amber-700/50 shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                title="Close banner (Esc)"
                            >
                                <X className="w-3 h-3" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}