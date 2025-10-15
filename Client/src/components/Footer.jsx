import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Twitter, Github, Linkedin, ChevronUp, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const social = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-mathur-29569a260", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/Kenshi2727/Kenshi-Webspace", icon: Github },
];

const listCols = [
    {
        title: "Company",
        items: [
            { label: "About", to: "/about" },
            { label: "Careers", to: "#" },
            { label: "Contact", to: "#" },
        ],
    },
    {
        title: "Resources",
        items: [
            { label: "Blog", to: "/articles" },
            { label: "Newsletter", to: "#" },
            { label: "Help Center", to: "#" },
        ],
    },
    {
        title: "Legal",
        items: [
            { label: "Privacy", to: "#" },
            { label: "Terms", to: "#" },
            { label: "Policy", to: "#" },
        ],
    },
];

const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const logoVariants = {
    hover: {
        scale: 1.05,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.4, ease: "easeInOut" }
    }
};

export default function Footer() {
    const year = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setTimeout(() => setIsSubscribed(false), 3000);
            setEmail("");
        }
    };

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={footerVariants}
            className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden"
            aria-label="Site footer"
        >
            {/* Enhanced background effects */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute right-0 top-0 h-48 w-48 sm:h-64 sm:w-64 transform-gpu blur-3xl opacity-15">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 mix-blend-screen animate-pulse" />
                </div>
                <div className="absolute left-1/4 bottom-0 h-32 w-32 sm:h-48 sm:w-48 transform-gpu blur-3xl opacity-10">
                    <div className="h-full w-full rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 mix-blend-screen" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
                <Card className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-indigo-500/20 shadow-2xl">
                    <CardContent className="p-4 sm:p-5 lg:p-6">
                        {/* Mobile-first compact layout */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Brand section - more compact on mobile */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                                <div className="flex-1 min-w-0">
                                    <motion.div
                                        variants={logoVariants}
                                        whileHover="hover"
                                        className="flex items-center w-fit gap-2 sm:gap-3"
                                    >
                                        <div className="flex items-center justify-center shadow-lg">
                                            {/* <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                <path d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 4v8l4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg> */}
                                            <img src="/logo-min.png" alt="Kenshi Webspace Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-sm" />
                                        </div>
                                        <div>
                                            <h2 className="text-sm sm:text-base font-bold tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                                                Kenshi Webspace
                                            </h2>
                                            <p className="text-xs text-indigo-300/80 font-medium">Community · Code · Adventure</p>
                                        </div>
                                    </motion.div>

                                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                                        A friendly space for creators — tutorials, projects, and occasional travel notes.
                                    </p>

                                    {/* Enhanced newsletter signup */}
                                    <form onSubmit={handleSubmit} className="mt-3 sm:mt-4">
                                        <div className="flex flex-col xs:flex-row gap-2">
                                            <div className="flex-1 min-w-0">
                                                <Input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    aria-label="Email address"
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 text-xs sm:text-sm py-2 focus:border-indigo-400 focus:ring-indigo-400/20 transition-all"
                                                />
                                            </div>
                                            <Button
                                                size="sm"
                                                type="submit"
                                                className="whitespace-nowrap bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                                disabled={isSubscribed}
                                            >
                                                <Mail className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                                                {isSubscribed ? "Subscribed!" : "Subscribe"}
                                            </Button>
                                        </div>
                                    </form>
                                </div>

                                {/* Social links - horizontal on mobile, vertical on larger screens */}
                                <div className="flex sm:flex-col items-center sm:items-end gap-2">
                                    <span className="text-xs text-slate-400 font-medium hidden sm:block mb-1">Follow us</span>
                                    <div className="flex sm:flex-col gap-2">
                                        {social.map((s, index) => {
                                            const Icon = s.icon;
                                            return (
                                                <motion.a
                                                    key={s.name}
                                                    href={s.href}
                                                    aria-label={s.name}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    whileHover={{ y: -2, scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 p-2 shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/50"
                                                >
                                                    <Icon className="h-4 w-4 text-indigo-300" />
                                                    <span className="sr-only">{s.name}</span>
                                                </motion.a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Navigation - hidden on very small screens, collapsible on mobile */}
                            <div className="hidden xs:block">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {listCols.map((col, index) => (
                                        <motion.div
                                            key={col.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                        >
                                            <h3 className="text-xs font-bold text-indigo-300 tracking-wider uppercase mb-2 sm:mb-3">
                                                {col.title}
                                            </h3>
                                            <ul className="space-y-1.5 sm:space-y-2">
                                                {col.items.map((item) => (
                                                    <li key={item.label}>
                                                        {item.to?.startsWith("/") ? (
                                                            <Link
                                                                to={item.to}
                                                                className="text-xs sm:text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1 group"
                                                            >
                                                                {item.label}
                                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </Link>
                                                        ) : (
                                                            <a
                                                                href={item.to}
                                                                className="text-xs sm:text-sm text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1 group"
                                                            >
                                                                {item.label}
                                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </a>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}

                                    {/* Connect column with icons */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <h3 className="text-xs font-bold text-indigo-300 tracking-wider uppercase mb-2 sm:mb-3">
                                            Connect
                                        </h3>
                                        <ul className="space-y-1.5 sm:space-y-2">
                                            {social.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2 group"
                                                        >
                                                            <Icon className="h-3 w-3 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Bottom section - very compact on mobile */}
                            <div className="pt-2 sm:pt-4 border-t border-indigo-500/20">
                                <div className="flex flex-col xs:flex-row items-center justify-between gap-2 xs:gap-3">
                                    <p className="text-xs text-slate-400 text-center xs:text-left">
                                        © {year} Kenshi Webspace. All rights reserved.
                                    </p>

                                    <nav className="flex items-center gap-3 sm:gap-4">
                                        <Link
                                            to="/maintenance"
                                            className="text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                                        >
                                            Sitemap
                                        </Link>
                                        <Link
                                            to="/maintenance"
                                            className="text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                                        >
                                            Privacy
                                        </Link>
                                        <motion.a
                                            href="#top"
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-xs text-slate-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group"
                                        >
                                            <ChevronUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
                                            Top
                                        </motion.a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.footer>
    );
}