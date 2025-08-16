import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Enhanced Neural Network Background Component with exclusion zones
const NeuralNetwork = ({ excludeZones = [] }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const nodesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Check if point is in exclusion zone
        const isInExclusionZone = (x, y) => {
            return excludeZones.some(zone => {
                const rect = zone.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();
                const relativeX = rect.left - canvasRect.left;
                const relativeY = rect.top - canvasRect.top;
                return x >= relativeX - 50 && x <= relativeX + rect.width + 50 &&
                    y >= relativeY - 50 && y <= relativeY + rect.height + 50;
            });
        };

        // Initialize nodes avoiding exclusion zones
        const nodeCount = 80;
        const nodes = [];
        let attempts = 0;
        while (nodes.length < nodeCount && attempts < nodeCount * 5) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;

            if (!isInExclusionZone(x, y)) {
                nodes.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2 + 1.5,
                    opacity: Math.random() * 0.8 + 0.2,
                });
            }
            attempts++;
        }
        nodesRef.current = nodes;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodesRef.current.forEach((node, i) => {
                // Update position
                let newX = node.x + node.vx;
                let newY = node.y + node.vy;

                // Bounce off edges
                if (newX < 0 || newX > canvas.width) node.vx *= -1;
                if (newY < 0 || newY > canvas.height) node.vy *= -1;

                // Avoid exclusion zones
                if (isInExclusionZone(newX, newY)) {
                    node.vx *= -1;
                    node.vy *= -1;
                } else {
                    node.x = newX;
                    node.y = newY;
                }

                // Draw node with enhanced glow
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.radius + 3
                );
                gradient.addColorStop(0, `rgba(99, 102, 241, ${node.opacity})`);
                gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(147, 197, 253, ${node.opacity})`;
                ctx.fill();

                // Draw connections with data flow effect
                nodesRef.current.slice(i + 1).forEach((otherNode, j) => {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100 && !isInExclusionZone((node.x + otherNode.x) / 2, (node.y + otherNode.y) / 2)) {
                        const opacity = (1 - distance / 100) * 0.4;

                        // Animated data pulse
                        const pulseOffset = (Date.now() * 0.001 + i + j) % 1;
                        const pulseX = node.x + (otherNode.x - node.x) * pulseOffset;
                        const pulseY = node.y + (otherNode.y - node.y) * pulseOffset;

                        // Connection line
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        // Data pulse
                        ctx.beginPath();
                        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(147, 197, 253, ${opacity * 2})`;
                        ctx.fill();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [excludeZones]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
};

// Enhanced Floating Tech Elements
const FloatingTechElements = () => {
    const techElements = [
        { symbol: '{ }', type: 'code' },
        { symbol: '</>', type: 'html' },
        { symbol: 'λ', type: 'function' },
        { symbol: '∞', type: 'loop' },
        { symbol: '⚡', type: 'performance' },
        { symbol: '🔧', type: 'tools' },
        { symbol: '🚀', type: 'deployment' },
        { symbol: '🔗', type: 'api' }
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {techElements.map((element, i) => (
                <motion.div
                    key={i}
                    className="absolute text-lg font-mono opacity-10 select-none"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.sin(i * 0.5) * 20, 0],
                        rotate: [0, 180, 360],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 12 + i * 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 1.2,
                    }}
                    style={{
                        left: `${15 + i * 12}%`,
                        top: `${20 + (i % 4) * 20}%`,
                    }}
                >
                    {element.symbol}
                </motion.div>
            ))}
        </div>
    );
};

// Enhanced Team Card with Fixed Dimensions
const TeamCard = ({ member, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration: 0.6,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                    }
                }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group"
        >
            <motion.div
                animate={{
                    rotateY: isHovered ? 8 : 0,
                    z: isHovered ? 50 : 0,
                }}
                transition={{ duration: 0.4, type: "spring" }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-96 flex flex-col"
            >
                {/* Tech circuit header pattern */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                {/* Binary code background pattern */}
                <div className="absolute inset-0 opacity-5 font-mono text-xs leading-none">
                    <div className="grid grid-cols-8 gap-0 h-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
                            >
                                {Math.random() > 0.5 ? '1' : '0'}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    animate={{ scale: isHovered ? 1.02 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 p-6 flex flex-col h-full"
                >
                    {/* Image container with fixed aspect ratio */}
                    <div className="relative mb-4 h-40 w-full">
                        <img
                            src={member.img}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="absolute inset-0 bg-gradient-to-t from-indigo-600/90 via-transparent to-transparent rounded-xl flex items-end p-3"
                        >
                            <div className="text-white text-xs font-medium flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Available for collaboration
                            </div>
                        </motion.div>
                    </div>

                    {/* Content with fixed layout */}
                    <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{member.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            <p className="text-indigo-600 font-semibold text-sm line-clamp-1">{member.role}</p>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">{member.bio}</p>

                        {/* Enhanced tech expertise visualization */}
                        <div className="mt-4">
                            <div className="text-xs text-gray-400 mb-2 font-mono">EXPERTISE_LEVEL</div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        className="h-2 bg-gray-200 rounded-full flex-1 overflow-hidden"
                                        animate={{
                                            backgroundColor: isHovered && i <= 4 ? '#6366f1' : '#e5e7eb'
                                        }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                            animate={{
                                                x: isHovered && i <= 4 ? '0%' : '-100%'
                                            }}
                                            transition={{ delay: i * 0.1, duration: 0.6 }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Holographic edge effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    animate={{
                        borderColor: isHovered
                            ? ['rgba(99, 102, 241, 0)', 'rgba(99, 102, 241, 0.5)', 'rgba(147, 197, 253, 0.5)', 'rgba(99, 102, 241, 0)']
                            : 'rgba(99, 102, 241, 0)',
                    }}
                    transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                />
            </motion.div>
        </motion.div>
    );
};

// Enhanced Value Card with Fixed Dimensions
const ValueCard = ({ title, description, index, icon }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, x: -50 },
                show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, delay: index * 0.2 }
                }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group h-80"
        >
            <motion.div
                animate={{
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.03 : 1,
                }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden h-full flex flex-col"
            >
                {/* Tech grid background */}
                <div className="absolute inset-0 opacity-5">
                    <div className="grid grid-cols-6 grid-rows-6 h-full w-full gap-1">
                        {Array.from({ length: 36 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="border border-current"
                                animate={{
                                    opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1
                                }}
                                transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </div>

                {/* Animated background gradient */}
                <motion.div
                    animate={{
                        scale: isHovered ? 2 : 1,
                        opacity: isHovered ? 0.15 : 0,
                        rotate: isHovered ? 180 : 0,
                    }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl"
                />

                <div className="relative z-10 flex flex-col h-full">
                    <motion.div
                        animate={{
                            rotate: isHovered ? [0, 360] : 0,
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 1.5, type: "spring" }}
                        className="text-indigo-600 text-5xl mb-6 font-bold flex items-center gap-4"
                    >
                        <span className="font-mono text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {`0${index + 1}`}
                        </span>
                        <span className="text-3xl">{icon}</span>
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex-shrink-0">{title}</h3>
                    <p className="text-gray-600 leading-relaxed flex-1">{description}</p>

                    {/* Enhanced progress indicator with data visualization */}
                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-xs font-mono text-gray-400">
                            <span>PROGRESS</span>
                            <span>{isHovered ? '100%' : '0%'}</span>
                        </div>
                        <motion.div
                            className="h-2 bg-gray-200 rounded-full overflow-hidden relative"
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"
                                initial={{ width: '0%' }}
                                animate={{ width: isHovered ? '100%' : '20%' }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                {/* Data packets */}
                                <motion.div
                                    className="absolute top-0 right-0 w-1 h-full bg-white"
                                    animate={{
                                        x: isHovered ? [0, -20, 0] : 0,
                                        opacity: isHovered ? [1, 0.5, 1] : 0,
                                    }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const storyRef = useRef(null);

    const teamMembers = [
        {
            id: 1,
            name: "Abhishek Mathur",
            role: "Founder & Editor",
            bio: "Specializes in web development and technology. Leading the vision and technical direction of Kenshi Webspace.",
            img: "abhishek.jpg"
        },
        {
            id: 2,
            name: "Rishikesh Shukla",
            role: "Contributor & Editor",
            bio: "Specializes in Machine Learning and AI. Driving innovation in artificial intelligence content and research.",
            img: "rishikesh.jpg"
        },
        {
            id: 3,
            name: "Position Open",
            role: "Frontend Developer",
            bio: "Seeking passionate frontend developer to join our mission of creating exceptional user experiences.",
            img: "https://placehold.co/640x400/6366f1/ffffff?text=Frontend+Dev"
        },
        {
            id: 4,
            name: "Position Open",
            role: "Content Creator",
            bio: "Looking for creative minds to help expand our content across emerging technologies and platforms.",
            img: "https://placehold.co/640x400/8b5cf6/ffffff?text=Content+Creator"
        }
    ];

    const values = [
        {
            title: "Quality First",
            description: "Every article undergoes rigorous technical review to ensure accuracy and depth. We implement industry-standard practices and never compromise on quality standards.",
            icon: "⚡"
        },
        {
            title: "Community Focused",
            description: "Our content ecosystem is shaped by community needs. We actively listen to feedback and prioritize topics that solve real-world developer challenges.",
            icon: "🤝"
        },
        {
            title: "Always Learning",
            description: "Technology evolves at light speed, and so do we. We're committed to continuous integration of knowledge and keeping our content at the cutting edge.",
            icon: "🧠"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Enhanced animated background */}
            <div className="fixed inset-0 z-0">
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 opacity-10"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
                <NeuralNetwork excludeZones={storyRef.current ? [storyRef.current] : []} />
                <FloatingTechElements />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
            >
                {/* Enhanced Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-20 relative">
                    {/* Holographic effect rings */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                className="absolute border border-indigo-300/30 rounded-full"
                                style={{
                                    width: `${100 + i * 50}px`,
                                    height: `${100 + i * 50}px`,
                                    left: `${-50 - i * 25}px`,
                                    top: `${-50 - i * 25}px`,
                                }}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.1, 0.3],
                                }}
                                transition={{
                                    duration: 4,
                                    delay: i * 0.5,
                                    repeat: Infinity,
                                }}
                            />
                        ))}
                    </div>

                    <motion.h1
                        className="text-5xl font-extrabold text-gray-900 sm:text-6xl relative font-mono"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{
                            background: 'linear-gradient(90deg, #1f2937, #6366f1, #8b5cf6, #ec4899, #1f2937)',
                            backgroundSize: '300% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        &lt;KenshiWebspace /&gt;
                    </motion.h1>

                    <motion.p
                        className="mt-8 max-w-3xl mx-auto text-xl text-gray-600 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        The digital realm of <span className="font-mono text-indigo-600">Abhishek Mathur</span> and
                        <span className="font-mono text-purple-600"> contributors</span> — where we decode complex technologies,
                        share breakthrough insights, and build the future of web development.
                    </motion.p>

                    {/* Enhanced tech indicators with data visualization */}
                    <motion.div
                        className="flex justify-center gap-6 mt-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        {[
                            { name: 'Web Dev', progress: 95, color: 'from-blue-500 to-cyan-500' },
                            { name: 'AI/ML', progress: 87, color: 'from-purple-500 to-pink-500' },
                            { name: 'Cloud', progress: 82, color: 'from-green-500 to-emerald-500' },
                            { name: 'DevOps', progress: 78, color: 'from-orange-500 to-red-500' }
                        ].map((tech, i) => (
                            <motion.div
                                key={tech.name}
                                className="text-center group"
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.div
                                    className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                                    animate={{
                                        rotateY: [0, 360],
                                        boxShadow: [
                                            '0 0 0 0 rgba(99, 102, 241, 0)',
                                            '0 0 0 8px rgba(99, 102, 241, 0.1)',
                                            '0 0 0 0 rgba(99, 102, 241, 0)'
                                        ]
                                    }}
                                    transition={{
                                        rotateY: { duration: 3, delay: i * 0.5, repeat: Infinity },
                                        boxShadow: { duration: 2, delay: i * 0.3, repeat: Infinity }
                                    }}
                                >
                                    {tech.progress}%
                                </motion.div>
                                <div className="text-sm font-mono text-gray-600 group-hover:text-indigo-600 transition-colors">
                                    {tech.name}
                                </div>
                                <motion.div
                                    className="w-full h-1 bg-gray-200 rounded-full mt-1 overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 + i * 0.2 }}
                                >
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${tech.color}`}
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${tech.progress}%` }}
                                        transition={{ duration: 1.5, delay: 1.5 + i * 0.2, type: "spring" }}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Our Story Section with Clean Background */}
                <motion.div
                    ref={storyRef}
                    variants={itemVariants}
                    className="mb-20 relative"
                >
                    {/* Clean background for readability */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 relative overflow-hidden">
                        {/* Subtle tech accent border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                            <div className="mb-10 lg:mb-0">
                                <motion.div
                                    className="flex items-center gap-3 mb-6"
                                    whileInView={{ x: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-mono text-lg">{'<>'}</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 font-mono">
                                        Our.Story();
                                    </h2>
                                </motion.div>

                                <motion.div className="space-y-6">
                                    {[
                                        "Kenshi Webspace was founded in 2025 with a simple goal: to create high-quality, accessible learning resources for tech enthusiasts. This platform showcases the learnings, projects, and journey of Abhishek Mathur (aka Kenshi) and our growing community of contributors.",
                                        "We started as a focused blog but are rapidly expanding into multiple domains of technology including Web Development, AI & ML, Cloud Computing, DevOps, and emerging tech trends.",
                                        "Our commitment goes beyond content creation — we're building a knowledge ecosystem. Every resource is community-tested, technically verified, and completely open-source. We believe in democratizing access to cutting-edge technical knowledge."
                                    ].map((text, i) => (
                                        <motion.p
                                            key={i}
                                            className="text-gray-700 leading-relaxed text-lg"
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.3, duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            {text}
                                        </motion.p>
                                    ))}
                                </motion.div>

                                {/* Enhanced interactive stats with data visualization */}
                                <motion.div
                                    className="mt-10 grid grid-cols-3 gap-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {[
                                        { label: 'FOUNDED', value: '2025', icon: '🚀', color: 'from-blue-500 to-cyan-500' },
                                        { label: 'CONTRIBUTORS', value: '2+', icon: '👥', color: 'from-purple-500 to-pink-500' },
                                        { label: 'TECH_DOMAINS', value: '4+', icon: '🔧', color: 'from-green-500 to-emerald-500' }
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={stat.label}
                                            className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 relative overflow-hidden group"
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            animate={{
                                                boxShadow: [
                                                    '0 4px 15px rgba(0,0,0,0.1)',
                                                    '0 8px 25px rgba(99,102,241,0.15)',
                                                    '0 4px 15px rgba(0,0,0,0.1)'
                                                ]
                                            }}
                                            transition={{
                                                boxShadow: { duration: 3, delay: i * 0.5, repeat: Infinity },
                                                hover: { duration: 0.2 }
                                            }}
                                        >
                                            {/* Animated background */}
                                            <motion.div
                                                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10`}
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />

                                            <div className="relative z-10">
                                                <motion.div
                                                    className="text-2xl mb-2"
                                                    animate={{ rotate: [0, 360] }}
                                                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                                                >
                                                    {stat.icon}
                                                </motion.div>
                                                <div className="text-3xl font-bold text-gray-900 font-mono mb-1">{stat.value}</div>
                                                <div className="text-xs text-gray-500 font-mono tracking-wider">{stat.label}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src="/about.png"
                                    className="border-2 border-indigo-200 rounded-2xl w-full h-96 object-cover shadow-xl"
                                    alt="About Kenshi Webspace"
                                />
                                {/* Enhanced holographic overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl"
                                    animate={{
                                        opacity: [0.1, 0.4, 0.1],
                                        background: [
                                            'linear-gradient(45deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
                                            'linear-gradient(225deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))',
                                            'linear-gradient(45deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))'
                                        ]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                    }}
                                />

                                {/* Tech overlay elements */}
                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 text-green-400 font-mono text-xs">
                                    STATUS: ONLINE
                                </div>
                                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 text-blue-400 font-mono text-xs">
                                    BUILD: v2025.1.0
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Values Section */}
                <motion.div variants={itemVariants} className="mb-20">
                    <motion.div
                        className="text-center mb-12"
                        whileInView={{
                            scale: [1, 1.02, 1],
                        }}
                        transition={{ duration: 2 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-mono">
                            core.Values[]
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full">
                            <motion.div
                                className="h-full bg-white rounded-full"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid gap-8 md:grid-cols-3"
                        variants={containerVariants}
                    >
                        {values.map((value, index) => (
                            <ValueCard
                                key={index}
                                title={value.title}
                                description={value.description}
                                icon={value.icon}
                                index={index}
                            />
                        ))}
                    </motion.div>
                </motion.div>

                {/* Enhanced Team Section */}
                <motion.div variants={itemVariants} className="mb-20">
                    <motion.div
                        className="text-center mb-12"
                        whileInView={{
                            y: [0, -5, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-mono">
                            team.Members()
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Meet the minds behind the code. Our diverse team of developers, creators, and innovators.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                        variants={containerVariants}
                    >
                        {teamMembers.map((member, index) => (
                            <TeamCard key={member.id} member={member} index={index} />
                        ))}
                    </motion.div>
                </motion.div>

                {/* Enhanced CTA Section with Matrix Effect */}
                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-12 md:p-16 shadow-2xl border border-indigo-500/20"
                >
                    {/* Matrix-style background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-20 grid-rows-10 h-full w-full gap-px">
                            {Array.from({ length: 200 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-green-400 rounded-sm"
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: Math.random() * 5,
                                        repeat: Infinity,
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Enhanced decorative effects */}
                    <motion.div
                        className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, -25, 0],
                            y: [0, 25, 0],
                        }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />

                    <div className="relative max-w-4xl mx-auto text-center space-y-8">
                        <motion.h2
                            className="text-5xl md:text-6xl font-extrabold tracking-tight text-white font-mono"
                            animate={{
                                textShadow: [
                                    '0 0 20px rgba(99,102,241,0.5)',
                                    '0 0 40px rgba(147,197,253,0.8)',
                                    '0 0 60px rgba(99,102,241,0.5)'
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            join(community);
                        </motion.h2>

                        <motion.p
                            className="text-xl md:text-2xl text-indigo-200 leading-relaxed max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Ready to <span className="font-mono text-cyan-300">push</span> your skills to the next level?
                            Whether you're here to <span className="font-mono text-green-300">learn</span>,
                            <span className="font-mono text-yellow-300"> contribute</span>, or
                            <span className="font-mono text-pink-300"> collaborate</span> —
                            let's build the future together.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                        >
                            <motion.button
                                className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-10 py-4 rounded-2xl shadow-xl border-2 border-white/20 relative overflow-hidden group font-mono"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 0 40px rgba(255,255,255,0.6)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>git clone community</span>
                                    <motion.span
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-indigo-600"
                                    >
                                        ⚡
                                    </motion.span>
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6 }}
                                />
                            </motion.button>

                            <motion.button
                                className="bg-transparent hover:bg-white/10 text-white font-bold px-10 py-4 rounded-2xl shadow-xl border-2 border-white/30 relative overflow-hidden group font-mono"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: 'rgba(147, 197, 253, 0.8)',
                                    boxShadow: '0 0 40px rgba(147, 197, 253, 0.4)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>npm install @kenshi/dev</span>
                                    <motion.span
                                        animate={{ x: [0, 8, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-cyan-400"
                                    >
                                        →
                                    </motion.span>
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                                    initial={{ scale: 0, borderRadius: '100%' }}
                                    whileHover={{ scale: 1, borderRadius: '1rem' }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.button>
                        </motion.div>

                        {/* Terminal-style footer */}
                        <motion.div
                            className="mt-12 text-left max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
                                <div className="text-green-400 font-mono text-sm space-y-2">
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <span className="text-cyan-400">user@kenshi-webspace:~$</span> echo "Welcome to the future"
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                    >
                                        Welcome to the future
                                    </motion.div>
                                    <motion.div
                                        animate={{ opacity: [0, 1] }}
                                        transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatType: "reverse" }}
                                    >
                                        <span className="text-cyan-400">user@kenshi-webspace:~$</span> <span className="bg-green-400 text-black px-1">█</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Enhanced Tech Stack Visualization */}
                <motion.div
                    variants={itemVariants}
                    className="mb-16 text-center relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 font-mono">
                        techStack.dependencies
                    </h3>

                    {/* Tech stack with enhanced visualization */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
                        {[
                            { name: 'React', version: '18.x', color: 'from-blue-500 to-cyan-500', icon: '⚛️' },
                            { name: 'Next.js', version: '14.x', color: 'from-gray-700 to-gray-900', icon: '▲' },
                            { name: 'TypeScript', version: '5.x', color: 'from-blue-600 to-blue-800', icon: 'TS' },
                            { name: 'Tailwind', version: '3.x', color: 'from-teal-500 to-green-500', icon: '🎨' },
                            { name: 'Node.js', version: '20.x', color: 'from-green-600 to-green-800', icon: '🟢' },
                            { name: 'MongoDB', version: '7.x', color: 'from-green-500 to-green-700', icon: '🍃' }
                        ].map((tech, i) => (
                            <motion.div
                                key={tech.name}
                                className="group relative"
                                whileHover={{ scale: 1.1, y: -5 }}
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    y: { duration: 3, delay: i * 0.3, repeat: Infinity },
                                    hover: { duration: 0.2 }
                                }}
                            >
                                <div className={`h-24 w-full bg-gradient-to-br ${tech.color} text-white rounded-2xl flex flex-col items-center justify-center shadow-lg relative overflow-hidden`}>
                                    {/* Circuit pattern */}
                                    <div className="absolute inset-0 opacity-20">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <motion.path
                                                d="M20,20 L80,20 L80,80 L20,80 Z M40,40 L60,40 M40,60 L60,60"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                                fill="none"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                            />
                                        </svg>
                                    </div>

                                    <div className="relative z-10 text-center">
                                        <motion.div
                                            className="text-2xl mb-1"
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                                        >
                                            {tech.icon}
                                        </motion.div>
                                        <div className="font-bold text-sm">{tech.name}</div>
                                        <div className="text-xs opacity-80 font-mono">{tech.version}</div>
                                    </div>

                                    {/* Data flow effect */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-1 bg-white/50"
                                        animate={{
                                            x: ['-100%', '100%'],
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: i * 0.4,
                                            repeat: Infinity,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Terminal command showcase */}
                    <motion.div
                        className="mt-12 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-gray-400 text-sm font-mono ml-4">kenshi-webspace-terminal</span>
                            </div>
                            <div className="text-green-400 font-mono text-sm space-y-2">
                                <div>
                                    <span className="text-blue-400">❯</span> npm create kenshi-project my-app
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    <span className="text-yellow-400">✓</span> Installing dependencies...
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                >
                                    <span className="text-green-400">✓</span> Project initialized successfully!
                                </motion.div>
                                <motion.div
                                    animate={{ opacity: [0, 1] }}
                                    transition={{ duration: 0.5, delay: 3, repeat: Infinity, repeatType: "reverse" }}
                                >
                                    <span className="text-blue-400">❯</span> <span className="bg-green-400 text-black px-1">█</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AboutPage;