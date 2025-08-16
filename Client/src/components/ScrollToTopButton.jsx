import React from 'react'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

function ScrollToTopButton() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 1);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: showScrollTop ? 1 : 0,
                scale: showScrollTop ? 1 : 0
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-indigo-500/80 text-white backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-300 hover:bg-indigo-600/80"
        >
            <ArrowUp size={20} />
        </motion.button>
    )
}

export default ScrollToTopButton