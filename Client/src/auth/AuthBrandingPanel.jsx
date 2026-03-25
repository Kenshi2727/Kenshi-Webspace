import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users, PenLine, MessageSquare, Compass, Sparkles, ImagePlus, TrendingUp, UserCircle, FlaskConical } from "lucide-react";

const features = [
    { icon: PenLine, title: "Rich Content Editor", desc: "Write with markdown, embed images and captions, and publish in seconds." },
    { icon: Users, title: "Community Driven", desc: "Collaborate, publish, and learn alongside fellow writers and creators." },
    { icon: MessageSquare, title: "Engagement Metrics", desc: "Track likes, views, bookmarks, downloads, and shares on every article." },
    { icon: Compass, title: "Category Discovery", desc: "Browse articles across Tech, History, Anime, Geopolitics, Astronomy, and more." },
    { icon: ImagePlus, title: "Media Uploads", desc: "Upload images directly into your posts with cloud-hosted media storage." },
    { icon: TrendingUp, title: "Trending & Featured", desc: "Popular posts get spotlighted on the homepage as trending or featured." },
    { icon: UserCircle, title: "Author Profiles", desc: "Manage your published articles, drafts, and reader engagement from one dashboard." },
    { icon: FlaskConical, title: "Research Brewery", desc: "Explore experimental tools and code snippets built by the community." },
];

export default function AuthBrandingPanel() {
    return (
        <motion.aside
            initial={{ x: -18, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.06, duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl p-8 md:p-10 hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900 text-white shadow-lg"
        >
            {/* subtle decorative shapes */}
            <div className="absolute -right-24 -top-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/15 to-indigo-400/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 bottom-0 w-60 h-60 rounded-full bg-gradient-to-tr from-indigo-600/20 to-violet-500/10 blur-2xl pointer-events-none" />
            <div className="absolute right-8 bottom-16 w-28 h-28 rounded-full bg-pink-400/8 blur-xl pointer-events-none" />
            {/* diagonal accent lines */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -right-12 top-12 w-48 h-px bg-gradient-to-l from-transparent via-white/12 to-transparent rotate-[30deg]" />
                <div className="absolute -right-8 top-24 w-36 h-px bg-gradient-to-l from-transparent via-white/8 to-transparent rotate-[30deg]" />
            </div>
            {/* floating pen icon */}
            <svg className="absolute right-6 top-6 w-8 h-8 text-white/10 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>

            <div>
                <div className="flex items-center gap-4 mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/6 ring-1 ring-white/8">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold leading-tight">Kenshi WebSpace</h1>
                        <p className="mt-1 text-sm text-white/80">Write freely · Share ideas · Grow together</p>
                    </div>
                </div>

                <p className="text-sm text-white/70 mb-6">
                    A place for creators and thinkers — write blogs, exchange ideas, and connect with readers who love to learn and create.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/6">
                                <Icon className="h-5 w-5" aria-hidden />
                            </div>
                            <div>
                                <p className="font-semibold">{title}</p>
                                <p className="text-xs text-white/80">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <Badge className="bg-white/6 text-white">Open Platform</Badge>
                <div className="text-xs text-white/70">No review queue — publish and get feedback</div>
            </div>
        </motion.aside>
    );
}
