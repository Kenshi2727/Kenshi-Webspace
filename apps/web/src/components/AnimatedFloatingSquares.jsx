import React from 'react';
import { motion } from 'framer-motion';

/* ---------- Animated floating SQUARES (no rounded corners) ---------- */
const AnimatedFloatingSquares = () => {
    // tweak these to taste
    const amplitudes = [10, 16, 8]; // vertical drift (px)
    const xDrift = [6, -8, 4]; // horizontal drift (px)
    const rotations = [18, 24, 20]; // base rotation deg
    const durations = [6, 7.5, 5.5]; // seconds for each loop

    return (
        <>
            {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                    key={i}
                    aria-hidden
                    className="absolute pointer-events-none"
                    style={{
                        left: `${-48 + i * 6}px`,
                        top: `${-48 + i * 4}px`,
                        width: `clamp(240px, ${22 - i * 2}vw, ${480 + i * 80}px)`,
                        height: `clamp(240px, ${22 - i * 2}vw, ${480 + i * 80}px)`,
                        background: 'rgba(255,255,255,0.20)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        boxShadow: '0 14px 40px rgba(2,6,23,0.12)',
                        zIndex: 0,
                        // ensure crisp, square corners
                        borderRadius: 0,
                        filter: 'none'
                    }}
                    initial={{ y: 0, x: 0, rotate: rotations[i] }}
                    animate={{
                        y: [0, -amplitudes[i], 0, amplitudes[i] * 0.5, 0],
                        x: [0, xDrift[i], 0, xDrift[i] * -0.4, 0],
                        rotate: [rotations[i], rotations[i] + 2, rotations[i] - 2, rotations[i]]
                    }}
                    transition={{
                        duration: durations[i],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: i * 0.35
                    }}
                />
            ))}


            {/* {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        aria-hidden
                        className="absolute transform pointer-events-none"
                        style={{
                            left: `${-48 + i * 6}px`,
                            top: `${-48 + i * 4}px`,
                            width: `clamp(240px, ${22 - i * 2}vw, ${480 + i * 80}px)`,
                            height: `clamp(240px, ${22 - i * 2}vw, ${480 + i * 80}px)`,
                            transform: `rotate(22deg) translate(${i * 6}px, ${i * 4}px)`,
                            background: 'rgba(255,255,255,0.20)',
                            border: '1px solid rgba(255,255,255,0.10)',
                            boxShadow: '0 14px 40px rgba(2,6,23,0.12)',
                            zIndex: 0,
                            filter: 'none' // keep front squares crisp
                        }}
                    />
                ))} */}
        </>
    );
};

export default AnimatedFloatingSquares;