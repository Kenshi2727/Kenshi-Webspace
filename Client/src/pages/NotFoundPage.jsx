import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RotateCcw, Search, Map } from "lucide-react";

export default function NotFoundPage() {
    const [showExtendedOptions, setShowExtendedOptions] = useState(false);

    useEffect(() => {
        // Show additional navigation options after 5 seconds
        const timer = setTimeout(() => setShowExtendedOptions(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const kenshiphrases = [
        "Lost in the void of space...",
        "This star system doesn’t exist...",
        "Oops… You drifted off the galaxy map.",
        "Signal lost… Destination unreachable.",
        "Route not found in this universe.",
        "Exploration failed… No planet here.",
        "Wormhole collapsed… Try another path.",
        "Transmission error… Page not located.",
        "Coordinates invalid… You’re off course.",
        "This corner of the cosmos is still uncharted..."
    ];


    const [currentPhrase, setCurrentPhrase] = useState(kenshiphrases[0]);

    useEffect(() => {
        const phraseInterval = setInterval(() => {
            setCurrentPhrase(prev => {
                const currentIndex = kenshiphrases.indexOf(prev);
                return kenshiphrases[(currentIndex + 1) % kenshiphrases.length];
            });
        }, 3000);

        return () => clearInterval(phraseInterval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/6 rounded-2xl p-8 text-center shadow-2xl"
            >
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                        className="relative"
                    >
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="h-8 w-8 text-red-400" aria-hidden="true" />
                        </div>
                        {/* Subtle pulsing effect */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-full border border-red-500/30"
                        />
                    </motion.div>

                    <div className="space-y-2">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl font-bold text-red-400 tracking-tight"
                        >
                            404
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl font-semibold text-white"
                        >
                            Page Not Found
                        </motion.h2>

                        <motion.p
                            key={currentPhrase}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                color: ["rgba(255, 255, 255, 0.7)", "rgba(248, 113, 113, 0.8)", "rgba(255, 255, 255, 0.7)"]
                            }}
                            transition={{
                                duration: 0.5,
                                color: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="text-sm min-h-[20px] font-medium"
                        >
                            {currentPhrase}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-white/60 text-sm max-w-xs leading-relaxed"
                        >
                            The page you're looking for doesn't exist or has been moved. Navigate back to safety using the options below.
                        </motion.p>
                    </div>

                    {/* Main navigation buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-5 w-full space-y-3"
                    >
                        <motion.a
                            href="/"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/8 text-white text-sm font-medium hover:bg-white/12 transition-colors border border-white/10"
                        >
                            <Home className="h-4 w-4" />
                            Return Home
                        </motion.a>

                        <motion.button
                            onClick={() => window.history.back()}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-transparent border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Go Back
                        </motion.button>
                    </motion.div>

                    {/* Extended options that appear after delay */}
                    {showExtendedOptions && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            transition={{ duration: 0.5 }}
                            className="mt-5 w-full pt-4 border-t border-white/10"
                        >
                            <p className="text-xs text-white/60 mb-3">
                                If you're still lost, try one of these options:
                            </p>
                            <div className="flex gap-2">
                                <motion.a
                                    href="/categories"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/6 text-white/80 text-sm hover:bg-white/8 transition-colors"
                                >
                                    <Search className="h-3 w-3" />
                                    Search
                                </motion.a>

                                <motion.a
                                    href="/maintenance"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/6 text-white/80 text-sm hover:bg-white/8 transition-colors"
                                >
                                    <Map className="h-3 w-3" />
                                    Site Map
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}