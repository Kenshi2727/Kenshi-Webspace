import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
    const teamMembers = [
        { id: 1, name: "Alex Johnson", role: "Founder & Editor", bio: "10+ years of experience in web development and technical writing." },
        { id: 2, name: "Sarah Williams", role: "Senior Writer", bio: "Specializes in React and frontend architecture. Passionate about developer education." },
        { id: 3, name: "Michael Chen", role: "Content Strategist", bio: "Helps shape our content direction and community engagement." },
        { id: 4, name: "Emma Rodriguez", role: "UI/UX Expert", bio: "Brings design thinking to our technical content and visual presentations." },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        About Kenshi Webspace
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                        Our mission is to create the best learning platform for modern web developers
                    </p>
                </div>

                {/* Our Story */}
                <div className="mb-16">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="mb-10 lg:mb-0">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4">
                                Blogify was founded in 2020 with a simple goal: to create high-quality, accessible
                                learning resources for web developers. We noticed a gap between rapidly evolving web
                                technologies and the learning materials available to developers.
                            </p>
                            <p className="text-gray-600 mb-4">
                                What started as a small blog with a few tutorials has grown into a comprehensive
                                platform with contributions from industry experts around the world. Today, we serve
                                over 500,000 developers every month.
                            </p>
                            <p className="text-gray-600">
                                We're committed to keeping all our content up-to-date, accurate, and completely free.
                                Our community-driven approach ensures we're always addressing the topics that matter
                                most to developers.
                            </p>
                        </div>
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80" />
                    </div>
                </div>

                {/* Our Values */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-indigo-600 text-3xl mb-4">01</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
                            <p className="text-gray-600">
                                Every article undergoes rigorous technical review to ensure accuracy and depth.
                                We never compromise on quality.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-indigo-600 text-3xl mb-4">02</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Focused</h3>
                            <p className="text-gray-600">
                                Our content is shaped by community needs. We listen to feedback and prioritize
                                topics that help developers solve real problems.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-indigo-600 text-3xl mb-4">03</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Learning</h3>
                            <p className="text-gray-600">
                                Technology evolves quickly, and so do we. We're committed to continuous improvement
                                and keeping our content current.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Team */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-indigo-600 font-medium">{member.role}</p>
                                    <p className="mt-3 text-gray-600">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 md:p-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white">Join Our Community</h2>
                        <p className="mt-4 text-indigo-100 max-w-xl mx-auto">
                            Whether you're looking to learn, contribute, or just stay updated,
                            we'd love to have you as part of our developer community.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors">
                                Create Account
                            </button>
                            <button className="bg-indigo-800 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors">
                                Follow on Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;