import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MouseGlow = () => {
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = document.querySelector('.hero-section')?.getBoundingClientRect();
            if (rect) {
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePos({ x, y });
            }
        };
        const handleEnter = () => setIsVisible(true);
        const handleLeave = () => setIsVisible(false);

        const el = document.querySelector('.hero-section');
        if (!el) return;
        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseenter', handleEnter);
            el.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    if (!isVisible) return null;
    return (
        <div
            className="absolute inset-0 opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{
                background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.18), transparent 50%)`
            }}
        />
    );
};

export default MouseGlow;
