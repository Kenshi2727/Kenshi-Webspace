import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';

function Progress() {
    const { scrollYProgress, scrollY } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
    const y = useTransform(scrollY, [0, 300], [0, -50]);

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {/* Background track */}
            <div className="h-1 bg-black/20 backdrop-blur-sm">
                {/* Animated progress fill */}
                <motion.div
                    style={{ scaleX }}
                    className="origin-left h-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 relative overflow-hidden"
                >
                    {/* Animated shimmer effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                            x: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </div>

            {/* Glowing effect */}
            <motion.div
                style={{ scaleX }}
                className="origin-left h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 blur-sm opacity-60"
            />
        </div>

    )
}

export default Progress