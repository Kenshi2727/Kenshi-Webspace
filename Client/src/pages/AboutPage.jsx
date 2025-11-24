import React, { useState, useEffect, useRef, act } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

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

        // Responsive node count based on screen size
        const nodeCount = window.innerWidth < 768 ? 40 : window.innerWidth < 1024 ? 60 : 80;
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

                // Draw connections with responsive distance
                const connectionDistance = window.innerWidth < 768 ? 80 : 100;
                nodesRef.current.slice(i + 1).forEach((otherNode, j) => {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance && !isInExclusionZone((node.x + otherNode.x) / 2, (node.y + otherNode.y) / 2)) {
                        const opacity = (1 - distance / connectionDistance) * 0.4;

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
            {techElements.slice(0, window.innerWidth < 768 ? 4 : techElements.length).map((element, i) => (
                <motion.div
                    key={i}
                    className="absolute text-xs sm:text-sm md:text-base lg:text-lg font-mono opacity-10 select-none"
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

// Enhanced Team Card 
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
            className="relative group h-full"
        >
            <motion.div
                animate={{
                    rotateY: isHovered ? 8 : 0,
                    z: isHovered ? 50 : 0,
                }}
                transition={{ duration: 0.4, type: "spring" }}
                className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col"
            >
                {/* Binary code background pattern - hidden on small screens */}
                {/* <div className="absolute inset-0 opacity-5 font-mono text-xs leading-none hidden md:block">
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
                </div> */}

                <motion.div
                    animate={{ scale: isHovered ? 1.02 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 p-3 sm:p-4 md:p-6 flex flex-col h-full"
                >
                    {/* Tech circuit header pattern */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    {/* Image container with fixed responsive aspect ratio */}
                    <div className="relative mb-3 sm:mb-4 h-28 sm:h-32 md:h-40 w-full flex-shrink-0">
                        <img
                            src={member.img}
                            alt={member.name}
                            className="w-full h-full object-fill rounded-md sm:rounded-lg md:rounded-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            className="absolute inset-0 bg-gradient-to-t from-indigo-600/90 via-transparent to-transparent rounded-md sm:rounded-lg md:rounded-xl flex items-end p-2"
                        >
                            <div className="text-white text-xs font-medium flex items-center gap-1">
                                <span className={`w-1.5 h-1.5 ${member.available ? 'bg-green-400' : 'bg-red-400'} rounded-full animate-[pulse_1s_ease-in-out_infinite]`}></span>
                                <span className="hidden sm:inline text-xs">{member.available ? 'Available for collaboration' : 'Not Available'}</span>
                                <span className="sm:hidden text-xs">{member.available ? 'Available' : 'Not Available'}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content with fixed responsive layout */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 flex-shrink-0">{member.name}</h3>
                        <div className="flex items-center gap-1 mb-2 sm:mb-3 flex-shrink-0">
                            <span className={`inline-block w-1.5 h-1.5 ${member.active ? 'bg-emerald-400' : 'bg-red-400'} rounded-full animate-pulse`}></span>
                            <p className="text-indigo-600 font-semibold text-xs sm:text-sm line-clamp-1">{member.role}</p>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-4 mb-3">{member.bio}</p>

                        {/* Enhanced tech expertise visualization */}
                        <div className="mt-auto flex-shrink-0">
                            <div className="text-xs text-gray-400 mb-1 font-mono">EXPERTISE_LEVEL</div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        className="h-1.5 bg-gray-200 rounded-full flex-1 overflow-hidden"
                                        animate={{
                                            backgroundColor: isHovered && i <= member.level ? '#6366f1' : '#e5e7eb'
                                        }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                            animate={{
                                                x: isHovered && i <= member.level ? '0%' : '-100%'
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
                    className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-transparent"
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

// Enhanced Value Card
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
            className="relative group h-full"
        >
            <motion.div
                animate={{
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.03 : 1,
                }}
                className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden h-full flex flex-col"
            >
                {/* Tech grid background */}
                {/* <div className="absolute inset-0 opacity-50">
                    <div className="grid grid-cols-4 sm:grid-cols-6 grid-rows-4 sm:grid-rows-6 h-full w-full gap-1">
                        {Array.from({ length: window.innerWidth < 640 ? 16 : 36 }).map((_, i) => (
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
                </div> */}

                {/* Animated background gradient */}
                <motion.div
                    animate={{
                        scale: isHovered ? 2 : 1,
                        opacity: isHovered ? 0.4 : 0,
                        rotate: isHovered ? 180 : 0,
                    }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-lg sm:rounded-xl md:rounded-2xl"
                />

                <div className="relative z-10 flex flex-col h-full">
                    <motion.div
                        animate={{
                            rotate: isHovered ? [0, 360] : 0,
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 1.5, type: "spring" }}
                        className="text-indigo-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-6 font-bold flex items-center gap-2 sm:gap-4 flex-shrink-0"
                    >
                        <span className="font-mono text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {`0${index + 1}`}
                        </span>
                        <span className="text-xl sm:text-2xl md:text-3xl">{icon}</span>
                    </motion.div>

                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-4 flex-shrink-0">{title}</h3>
                    <p className="text-gray-600 leading-relaxed flex-1 text-sm sm:text-base mb-4">{description}</p>

                    {/* Enhanced progress indicator with data visualization */}
                    <div className="mt-auto space-y-1 sm:space-y-2 flex-shrink-0">
                        <div className="flex justify-between text-xs font-mono text-gray-400">
                            <span>PROGRESS</span>
                            <span>{isHovered ? '100%' : '0%'}</span>
                        </div>
                        <motion.div
                            className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden relative"
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
            role: "Moderator",
            bio: "Specializes in web development and technology. Leading the vision and technical direction of Kenshi Webspace.",
            img: "abhishek.jpg",
            available: true,
            active: true,
            level: 5
        },
        // {
        //     id: 2,
        //     name: "Hrishikesh Shukla",
        //     role: "Contributor & Editor",
        //     bio: "Specializes in Machine Learning and AI. Driving innovation in artificial intelligence content and research.",
        //     img: "rishikesh.jpg",
        //     available: false,
        //     active: true,
        //     level: 4
        // },
        {
            id: 2,
            name: "Soon to be added...",
            role: "Unallocated",
            bio: "Some amazing tech content is on the way!",
            img: "https://placehold.co/600x420/6366f1/ffffff?text=Waiting...",
            available: false,
            active: false,
            level: 1
        },
        {
            id: 3,
            name: "Soon to be added...",
            role: "Unallocated",
            bio: "Some amazing tech content is on the way!",
            img: "https://placehold.co/600x420/6366f1/ffffff?text=Waiting...",
            available: false,
            active: false,
            level: 1
        },
        {
            id: 4,
            name: "Soon to be added..",
            role: "Unallocated",
            bio: "Some amazing tech content is on the way!",
            img: "https://placehold.co/600x420/6366f1/ffffff?text=Waiting...",
            available: false,
            active: false,
            level: 1
        }
    ];

    const values = [
        {
            title: "Quality First",
            description: "Every article undergoes rigorous technical review to ensure accuracy and depth. We implement industry-standard practices and never compromise on quality standards.",
            icon: "🛡️"
        },
        {
            title: "Community Focused",
            description: "Our content ecosystem is shaped by community needs. We actively listen to feedback and prioritize topics that solve real-world developer challenges.",
            icon: "🌐"
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
                <NeuralNetwork excludeZones={storyRef.current ? [storyRef.current] : []} />
                <FloatingTechElements />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative z-10 max-w-7xl mx-auto py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8"
            >
                {/* Enhanced Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 md:mb-20 relative">
                    <motion.h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 relative font-mono px-4"
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
                        className="mt-4 sm:mt-6 md:mt-8 max-w-3xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        The digital realm of <span className="font-mono text-indigo-600">Abhishek Mathur</span> and
                        <span className="font-mono text-purple-600"> contributors</span> — where we decode complex technologies,
                        share breakthrough insights, and where technology, creativity, history, and storytelling meet.
                    </motion.p>

                    {/* Enhanced tech indicators with responsive design */}
                    <motion.div
                        className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mt-6 sm:mt-8 md:mt-10 px-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        {[
                            { name: 'Web Dev', progress: 35, color: 'from-blue-500 to-cyan-500' },
                            { name: 'AI/ML', progress: 25, color: 'from-purple-500 to-pink-500' },
                            { name: 'Cloud', progress: 20, color: 'from-green-500 to-emerald-500' },
                            { name: 'DevOps', progress: 20, color: 'from-orange-500 to-red-500' }
                        ].map((tech, i) => (
                            <motion.div
                                key={tech.name}
                                className="text-center group flex-1 max-w-16 sm:max-w-20 md:max-w-none"
                                whileHover={{ scale: 1.1 }}
                            >
                                <motion.div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 bg-gradient-to-br ${tech.color} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base shadow-lg`}
                                    animate={{
                                        rotateY: [0, 360],
                                        boxShadow: [
                                            '0 0 0 0 rgba(99, 102, 241, 0)',
                                            '0 0 0 8px rgba(99, 102, 241, 0.1)',
                                            '0 0 0 0 rgba(99, 102, 241, 0)'
                                        ]
                                    }}
                                    transition={{
                                        rotateY: { duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 },
                                        boxShadow: { duration: 2, delay: i * 0.3, repeat: Infinity }
                                    }}
                                >
                                    {tech.progress}%
                                </motion.div>
                                <div className="text-xs sm:text-sm font-mono text-gray-600 group-hover:text-indigo-600 transition-colors">
                                    {tech.name}
                                </div>
                                <motion.div
                                    className="w-full h-0.5 sm:h-1 bg-gray-200 rounded-full mt-1 overflow-hidden"
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

                {/* Our Story Section */}
                <motion.div
                    ref={storyRef}
                    variants={itemVariants}
                    className="mb-8 sm:mb-12 md:mb-20 relative"
                >
                    {/* Clean background for readability */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-gray-200 relative overflow-hidden">
                        {/* Subtle tech accent border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                            <div className="mb-6 sm:mb-8 lg:mb-0">
                                <motion.div
                                    className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
                                    whileInView={{ x: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md sm:rounded-lg md:rounded-xl flex items-center justify-center">
                                        <span className="text-white font-mono text-xs sm:text-sm md:text-base lg:text-lg">{'<>'}</span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-mono">
                                        Our.Story();
                                    </h2>
                                </motion.div>

                                <motion.div className="space-y-3 sm:space-y-4 md:space-y-6">
                                    {[
                                        "Kenshi Webspace was founded in 2025 with a simple goal: to create high-quality, accessible learning resources for tech enthusiasts. This platform showcases the learnings, projects, and journey of Abhishek Mathur (aka Kenshi) and our growing community of contributors.",
                                        "We started as a focused blog but are rapidly expanding into multiple domains of technology including Web Development, AI & ML, Cloud Computing, DevOps, and emerging tech trends.",
                                        "Our commitment goes beyond content creation — we're building a knowledge ecosystem. Every resource is community-tested, technically verified, and completely open-source. We believe in democratizing access to cutting-edge technical knowledge."
                                    ].map((text, i) => (
                                        <motion.p
                                            key={i}
                                            className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg"
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.3, duration: 0.6 }}
                                            viewport={{ once: true }}
                                        >
                                            {text}
                                        </motion.p>
                                    ))}
                                </motion.div>

                                {/* Enhanced interactive stats with responsive design */}
                                <motion.div
                                    className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6"
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
                                            className="text-center p-2 sm:p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-200 relative overflow-hidden group"
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
                                                    className="text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2"
                                                    animate={{ rotate: [0, 360] }}
                                                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                                                >
                                                    {stat.icon}
                                                </motion.div>
                                                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 font-mono mb-1">{stat.value}</div>
                                                <div className="text-[0.55rem] sm:text-xs text-gray-500 font-mono tracking-wider">{stat.label}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            <motion.div
                                className="relative mt-6 sm:mt-8 lg:mt-0"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src="/about.png"
                                    className="border-2 border-indigo-200 rounded-lg sm:rounded-xl md:rounded-2xl w-full h-48 sm:h-64 md:h-80 lg:h-96 object-fill shadow-xl"
                                    alt="About Kenshi Webspace"
                                />
                                {/* Enhanced holographic overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-lg sm:rounded-xl md:rounded-2xl"
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

                                {/* Tech overlay elements - responsive */}
                                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/70 backdrop-blur-sm rounded-md sm:rounded-lg px-2 sm:px-3 py-1 text-green-400 font-mono text-xs">
                                    STATUS: ONLINE
                                </div>
                                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/70 backdrop-blur-sm rounded-md sm:rounded-lg px-2 sm:px-3 py-1 text-blue-400 font-mono text-xs">
                                    BUILD: v2025.1.0
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Values Section */}
                <motion.div variants={itemVariants} className="mb-8 sm:mb-12 md:mb-20">
                    <motion.div
                        className="text-center mb-6 sm:mb-8 md:mb-12"
                        whileInView={{
                            scale: [1, 1.02, 1],
                        }}
                        transition={{ duration: 2 }}
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-mono px-4">
                            core.Values[]
                        </h2>
                        <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full">
                            <motion.div
                                className="h-full bg-white rounded-full"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3 auto-rows-fr"
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
                <motion.div variants={itemVariants} className="mb-8 sm:mb-12 md:mb-20">
                    <motion.div
                        className="text-center mb-6 sm:mb-8 md:mb-12"
                        whileInView={{
                            y: [0, -5, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-mono px-4">
                            team.Members()
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
                            Meet the minds behind the code. Our diverse team of developers, creators, and innovators.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 lg:grid-cols-4 auto-rows-fr"
                        variants={containerVariants}
                    >
                        {teamMembers.map((member, index) => (
                            <TeamCard key={member.id} member={member} index={index} />
                        ))}
                    </motion.div>
                </motion.div>

                {/* Enhanced CTA Section */}
                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 shadow-2xl border border-indigo-500/20"
                >
                    {/* Matrix-style background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 grid-rows-6 sm:grid-rows-8 md:grid-rows-10 h-full w-full gap-px">
                            {Array.from({ length: window.innerWidth < 640 ? 30 : window.innerWidth < 1024 ? 60 : 100 }).map((_, i) => (
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

                    {/* Enhanced decorative effects - responsive */}
                    <motion.div
                        className="absolute -top-12 sm:-top-16 md:-top-24 lg:-top-32 -right-12 sm:-right-16 md:-right-24 lg:-right-32 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -bottom-12 sm:-bottom-16 md:-bottom-24 lg:-bottom-32 -left-12 sm:-left-16 md:-left-24 lg:-left-32 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 bg-purple-500 opacity-20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, -25, 0],
                            y: [0, 25, 0],
                        }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />

                    <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8">
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white font-mono px-4"
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
                            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-indigo-200 leading-relaxed max-w-3xl mx-auto px-4"
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
                            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12 px-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                        >
                            <Link to="/auth/sign-up">
                                <motion.button
                                    className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl border-2 border-white/20 relative overflow-hidden group font-mono text-sm sm:text-base"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 0 40px rgba(255,255,255,0.6)'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                        <span className="hidden sm:inline">git clone community</span>
                                        <span className="sm:hidden">Join Community</span>
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
                            </Link>

                            <a href="https://github.com/Kenshi2727/Kenshi-Webspace" target="_blank" rel="noopener noreferrer">
                                <motion.button
                                    className="bg-transparent hover:bg-white/10 text-white font-bold px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl border-2 border-white/30 relative overflow-hidden group font-mono text-sm sm:text-base"
                                    whileHover={{
                                        scale: 1.05,
                                        borderColor: 'rgba(147, 197, 253, 0.8)',
                                        boxShadow: '0 0 40px rgba(147, 197, 253, 0.4)'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                        <span className="hidden md:inline">npm install @kenshi/dev</span>
                                        <span className="md:hidden">Get Started</span>
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
                            </a>
                        </motion.div>

                        {/* Terminal-style footer - responsive */}
                        <motion.div
                            className="mt-6 sm:mt-8 md:mt-12 text-left max-w-2xl mx-auto px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <div className="bg-black/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-green-500/30">
                                <div className="text-green-400 font-mono text-xs sm:text-sm space-y-1 sm:space-y-2">
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <span className="text-cyan-400">user@kenshi:~$</span> echo "Welcome to the future"
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
                                        <span className="text-cyan-400">user@kenshi:~$</span> <span className="bg-green-400 text-black px-1">█</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Enhanced Tech Stack Visualization */}
                <motion.div
                    variants={itemVariants}
                    className="mb-6 sm:mb-8 md:mb-16 mt-12 text-center relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 font-mono px-4">
                        techStack.dependencies
                    </h3>

                    {/* Tech stack with responsive grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-4">
                        {[
                            { name: 'React', version: '19.0.0', color: 'from-blue-500 to-cyan-500', icon: '⚛️' },
                            { name: 'Tailwind', version: '4.1.11', color: 'from-teal-500 to-green-500', icon: '🎨' },
                            { name: 'shadcn/ui', version: 'latest', color: 'from-stone-400 to-stone-600', icon: '🧩' },
                            { name: 'Framer Motion', version: 'latest', color: 'from-purple-600 to-indigo-600', icon: '⚡' },
                            { name: 'Postgres', version: 'latest', color: 'from-gray-700 to-gray-900', icon: '🐘' },
                            { name: 'Prisma', version: 'latest', color: 'from-sky-500 to-blue-700', icon: '⃤' },
                            { name: 'Node.js', version: '22.17.1', color: 'from-green-600 to-green-800', icon: '🟢' },
                            { name: 'Express', version: '5.1.0', color: 'from-yellow-400 to-yellow-700', icon: '🚂' },
                            { name: 'Clerk', version: 'latest', color: 'from-purple-500 to-purple-900', icon: '🔐' },
                            { name: 'Helmet', version: '8.1.0', color: 'from-blue-500 to-blue-700', icon: '🛡️' },
                            { name: 'Multer', version: '2.0.2', color: 'from-red-400 to-red-600', icon: '📦' },
                            { name: 'Vercel', version: 'latest', color: 'from-black to-gray-800', icon: '▲' }
                        ]
                            .map((tech, i) => (
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
                                    <div className={`h-14 sm:h-16 md:h-20 lg:h-24 w-full bg-gradient-to-br ${tech.color} text-white rounded-lg sm:rounded-xl md:rounded-2xl flex flex-col items-center justify-center shadow-lg relative overflow-hidden`}>
                                        {/* Circuit pattern - simplified for mobile */}
                                        <div className="absolute inset-0 opacity-20 hidden sm:block">
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
                                                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-1"
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                                            >
                                                {tech.icon}
                                            </motion.div>
                                            <div className="font-bold text-xs sm:text-sm">{tech.name}</div>
                                            <div className="text-xs opacity-80 font-mono hidden sm:block">{tech.version}</div>
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
                        className="mt-6 sm:mt-8 md:mt-12 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="bg-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700 relative overflow-hidden">
                            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                                <span className="text-gray-400 text-xs sm:text-sm font-mono ml-2 sm:ml-4 hidden sm:inline">kenshi-webspace-terminal</span>
                                <span className="text-gray-400 text-xs font-mono ml-2 sm:hidden">terminal</span>
                            </div>
                            <div className="text-green-400 font-mono text-xs sm:text-sm space-y-1 sm:space-y-2">
                                <div>
                                    <span className="text-blue-400">❯</span> npm create kenshi-webspace/my-space
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
                                    <span className="text-blue-400">❯</span> <span className="bg-green-400 text-black px-1">█Onboarding...</span>
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