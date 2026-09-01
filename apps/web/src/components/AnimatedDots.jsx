import React from 'react';
import { motion } from 'framer-motion';

const AnimatedDots = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0"
            style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.12) 1px, transparent 0)',
                backgroundSize: '32px 32px'
            }}
        />
    </div>
);

export default AnimatedDots;