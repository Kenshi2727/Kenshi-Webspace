import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Abhishek Mathur",
            role: "Founder & Editor",
            bio: "Specializes in web development and technology.",
            img: "abhishek.jpg"
        },
        {
            id: 2,
            name: "Rishikesh Shukla",
            role: "Contributor & Editor",
            bio: "Specializes in Machine Learning and AI.",
            img: "rishikesh.jpg"
        },
        {
            id: 3,
            name: "Soon to be added",
            role: "Unallocated",
            bio: "Soon to be determined.",
            img: "https://placehold.co/640x400"
        },
        {
            id: 4,
            name: "Soon to be added",
            role: "Unallocated",
            bio: "Soon to be determined.",
            img: "https://placehold.co/640x400"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <Navbar /> */}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
            >
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        About Kenshi Webspace
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                        Kenshi Webspace is the world of Abhishek Mathur and his fellow contributors, a place where I share my learnings, projects, and tech journey.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-16 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="mb-10 lg:mb-0">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <p className="text-gray-600 mb-4">
                            Kenshi Webspace was founded in 2025 with a simple goal: to create high-quality, accessible
                            learning resources for tech enthusiasts. This platform will showcase the learnings, projects,
                            and journey of me (Abhishek Mathur aka Kenshi) and my fellow contributors and tech friends.
                        </p>
                        <p className="text-gray-600 mb-4">
                            We have started as a small blog but will soon expand into different areas of tech including
                            Web Development, AI & ML, Cloud, DevOps, etc.
                        </p>
                        <p className="text-gray-600">
                            We're committed to keeping all our content up-to-date, accurate, and completely free.
                            Our community-driven approach ensures we're always addressing the topics that matter
                            most to developers.
                        </p>
                    </div>
                    <img src="/about.png" className="border-2 rounded-xl w-full h-80" />
                </motion.div>

                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {["Quality First", "Community Focused", "Always Learning"].map((title, idx) => (
                            <Card key={idx} className="p-6">
                                <div className="text-indigo-600 text-3xl mb-4">{`0${idx + 1}`}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                                <p className="text-gray-600">
                                    {idx === 0 && "Every article undergoes rigorous technical review to ensure accuracy and depth. We never compromise on quality."}
                                    {idx === 1 && "Our content is shaped by community needs. We listen to feedback and prioritize topics that help developers solve real problems."}
                                    {idx === 2 && "Technology evolves quickly, and so do we. We're committed to continuous improvement and keeping our content current."}
                                </p>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <Card key={member.id} className="p-0 overflow-hidden">
                                <img src={member.img} alt={member.name} className="w-full h-48 object-cover" />
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-indigo-600 font-medium">{member.role}</p>
                                    <p className="mt-3 text-gray-600">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-600 p-10 md:p-14 shadow-2xl border border-white/10"
                >
                    {/* Decorative blur effect */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500 opacity-30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>

                    <div className="relative max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                            Join Our Community
                        </h2>
                        <p className="text-lg md:text-xl text-indigo-100 leading-relaxed max-w-2xl mx-auto">
                            Whether you're looking to <span className="font-semibold text-white">learn</span>,
                            <span className="font-semibold text-white"> contribute</span>, or simply stay updated,
                            we'd love to welcome you to our thriving developer network.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                variant="outline"
                                className="bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-105 transition-transform duration-300 font-medium px-6 py-3 rounded-full shadow-md"
                            >
                                Create Account
                            </Button>
                            <Button
                                className="bg-indigo-900 hover:bg-indigo-800 text-white hover:scale-105 transition-transform duration-300 font-medium px-6 py-3 rounded-full shadow-md"
                            >
                                Follow on GitHub
                            </Button>
                        </div>
                    </div>
                </motion.div>

            </motion.div>

            {/* <Footer /> */}
        </div>
    );
};

export default AboutPage;