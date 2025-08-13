import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const social = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github },
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
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={footerVariants}
            className="relative bg-slate-950 text-white"
            aria-label="Site footer"
        >
            {/* subtle indigo-purple blur to match site */}
            <div className="pointer-events-none absolute right-6 top-2 -z-10 transform-gpu blur-3xl opacity-20">
                <div className="h-36 w-36 rounded-full bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6 lg:py-8">
                <Card className="bg-[#071020] rounded-2xl border border-indigo-800/20 shadow-xl">
                    <CardContent className="p-5 lg:p-6">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-between items-start">
                            {/* logo + newsletter */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-purple-700 shadow-sm">
                                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M4 12c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                                            <path d="M12 4v8l4 2" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h2 className="text-base text-white font-semibold tracking-tight">Kenshi Webspace</h2>
                                        <p className="text-xs text-white/70">Community · Code · Adventure</p>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-white/70 max-w-prose">
                                    A friendly space for creators — tutorials, projects, and occasional travel notes.
                                </p>

                                {/* compact newsletter (darker input) */}
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="mt-3 flex items-center gap-2"
                                    aria-label="Subscribe to newsletter"
                                >
                                    <div className="flex-1 min-w-0">
                                        <Input
                                            placeholder="Email address"
                                            aria-label="Email address"
                                            className="bg-white/6 text-white placeholder:text-white/40 text-sm py-2"
                                        />
                                    </div>
                                    <Button size="sm" className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700" type="submit">
                                        <Mail className="mr-2 h-4 w-4" /> Subscribe
                                    </Button>
                                </form>

                                <div className="mt-3 flex items-center gap-2">
                                    {social.map((s) => {
                                        const Icon = s.icon;
                                        return (
                                            <motion.a
                                                key={s.name}
                                                href={s.href}
                                                aria-label={s.name}
                                                whileHover={{ y: -3, scale: 1.06 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="inline-flex items-center justify-center rounded-md border border-white/6 bg-white/3 p-1.5 shadow-sm"
                                            >
                                                <Icon className="h-4 w-4 text-indigo-200" />
                                                <span className="sr-only">{s.name}</span>
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* nav columns (compact) */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-none w-full lg:w-2/3">
                                {listCols.map((col) => (
                                    <div key={col.title}>
                                        <h3 className="text-xs font-semibold text-white/70 tracking-wider uppercase">{col.title}</h3>
                                        <ul className="mt-2 space-y-2">
                                            {col.items.map((it) => (
                                                <li key={it.label}>
                                                    {it.to?.startsWith("/") ? (
                                                        <Link to={it.to} className="text-sm text-white/70 hover:text-indigo-300 transition-colors">
                                                            {it.label}
                                                        </Link>
                                                    ) : (
                                                        <a href={it.to} className="text-sm text-white/70 hover:text-indigo-300 transition-colors">
                                                            {it.label}
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                                {/* Connect column */}
                                <div>
                                    <h3 className="text-xs font-semibold text-white/70 tracking-wider uppercase">Connect</h3>
                                    <ul className="mt-2 space-y-2">
                                        <li>
                                            <a href="#" className="text-sm text-white/70 hover:text-indigo-300 flex items-center gap-2">
                                                <Twitter className="h-4 w-4 text-white/60" /> Twitter
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-white/70 hover:text-indigo-300 flex items-center gap-2">
                                                <Linkedin className="h-4 w-4 text-white/60" /> LinkedIn
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-white/70 hover:text-indigo-300 flex items-center gap-2">
                                                <Github className="h-4 w-4 text-white/60" /> GitHub
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-indigo-800/20 flex flex-col md:flex-row items-center justify-between gap-3">
                            <p className="text-xs text-white/60">© {year} Kenshi Webspace. All rights reserved.</p>

                            <nav className="flex items-center gap-4">
                                <Link to={(true) ? "/maintenance" : "/sitemap"} className="text-xs text-white/60 hover:text-indigo-300">
                                    Sitemap
                                </Link>
                                <Link to={(true) ? "/maintenance" : "/privacy"} className="text-xs text-white/60 hover:text-indigo-300">
                                    Privacy
                                </Link>
                                <motion.a href="#top" whileHover={{ x: 6 }} className="text-xs text-white/60 hover:text-indigo-300 flex items-center gap-2">
                                    Back to top
                                </motion.a>
                            </nav>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.footer>
    );
}
