import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Wifi, Zap } from "lucide-react";

export default function LoadingPage() {
    const [progress, setProgress] = useState(0);
    const [currentPhase, setCurrentPhase] = useState(0);

    const loadingPhrases = [
        "Initializing stellar navigation...",
        "Connecting to the cosmic network...",
        "Calibrating quantum sensors...",
        "Syncing with galactic database...",
        "Loading star charts...",
        "Establishing wormhole connection...",
        "Preparing for interstellar journey...",
        "Almost ready for launch...",
        "Final systems check...",
        "Ready for exploration!"
    ];

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + Math.random() * 15;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return newProgress;
            });
        }, 400);

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        // Update loading phrase based on progress
        const phaseIndex = Math.min(Math.floor(progress / 10), loadingPhrases.length - 1);
        setCurrentPhase(phaseIndex);
    }, [progress]);

    // Floating particles animation
    const particles = Array.from({ length: 8 }, (_, i) => (
        <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [0.5, 1, 0.5]
            }}
            transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
            }}
            style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`
            }}
        />
    ));

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Floating particles */}
            {particles}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative z-10"
            >
                <div className="flex flex-col items-center gap-6">
                    {/* Animated rocket icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                        className="relative"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                y: [0, -5, 5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/10 border border-blue-500/20"
                        >
                            <Rocket className="h-8 w-8 text-blue-400" />
                        </motion.div>

                        {/* Pulsing rings */}
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.5, 0.2, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-full border border-blue-500/30"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.1, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute inset-0 rounded-full border border-purple-500/20"
                        />
                    </motion.div>

                    {/* Loading content */}
                    <div className="space-y-4 w-full">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl font-bold text-white tracking-tight"
                        >
                            Loading Mission
                        </motion.h1>

                        <motion.p
                            key={currentPhase}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-white/70 min-h-[20px] font-medium"
                        >
                            {loadingPhrases[currentPhase]}
                        </motion.p>

                        {/* Progress bar */}
                        <div className="w-full space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-white/60">Progress</span>
                                <span className="text-white/80 font-mono">{Math.round(progress)}%</span>
                            </div>

                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full relative"
                                >
                                    {/* Shimmer effect */}
                                    <motion.div
                                        animate={{
                                            x: ["-100%", "100%"]
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        style={{ width: "50%" }}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Status indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-center gap-4 pt-4"
                        >
                            <motion.div
                                animate={{
                                    scale: progress > 30 ? [1, 1.1, 1] : 1,
                                    opacity: progress > 30 ? [0.5, 1, 0.5] : 0.3
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="flex items-center gap-2 text-xs"
                            >
                                <Wifi className={`h-3 w-3 ${progress > 30 ? 'text-green-400' : 'text-white/30'}`} />
                                <span className={`${progress > 30 ? 'text-white/80' : 'text-white/30'}`}>
                                    Network
                                </span>
                            </motion.div>

                            <motion.div
                                animate={{
                                    scale: progress > 60 ? [1, 1.1, 1] : 1,
                                    opacity: progress > 60 ? [0.5, 1, 0.5] : 0.3
                                }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                className="flex items-center gap-2 text-xs"
                            >
                                <Zap className={`h-3 w-3 ${progress > 60 ? 'text-yellow-400' : 'text-white/30'}`} />
                                <span className={`${progress > 60 ? 'text-white/80' : 'text-white/30'}`}>
                                    Systems
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Loading dots */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="flex justify-center gap-1 pt-2"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.4, 1, 0.4]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                    className="w-1.5 h-1.5 bg-white/60 rounded-full"
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}