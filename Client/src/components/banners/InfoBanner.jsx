import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, X, Bug } from "lucide-react";

const REPORT_URL = "https://github.com/Kenshi2727";

export default function InfoBanner({ title, content, badgeText }) {
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
            className="mx-3 sm:mx-4 md:mx-6 lg:mx-auto my-2"
        >
            <div className="relative overflow-hidden rounded-xl border border-purple-200/60 shadow-md backdrop-blur-sm">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-purple-300" />

                {/* Content */}
                <div className="relative p-3 sm:p-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {/* Icon */}
                        <div className="relative flex-shrink-0">
                            <motion.div
                                variants={pulseVariants}
                                animate="pulse"
                                className="absolute -inset-1 rounded-full bg-purple-300"
                            />
                            <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-sm">
                                <Globe className="w-4 h-4 text-purple-800" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-sm font-semibold text-purple-900 truncate">
                                    {title || "Info Banner"}
                                </h4>
                                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium text-purple-700 bg-purple-300/80 rounded-full flex-shrink-0">
                                    {badgeText || "Info Badge"}
                                </span>
                            </div>
                            <p className="text-xs text-purple-800/90 line-clamp-2">
                                {content || "No content provided."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}