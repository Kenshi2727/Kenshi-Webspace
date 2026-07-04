import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    Atom,
    BookOpen,
    BookText,
    CheckCircle2,
    Compass,
    Filter,
    Flag,
    Globe2,
    Grid,
    History,
    Landmark,
    LayoutList,
    LoaderCircle,
    MonitorCog,
    Search,
    Sparkles,
    Star,
    TrendingUp,
    XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { checkCategoryPosts, getCategoryPostCounts } from "../services/GlobalApi";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 120, damping: 18 },
    },
};

const categories = [
    {
        id: 1,
        name: "Technology",
        icon: MonitorCog,
        description: "Systems, tools, software, and the future of digital craft.",
        trending: true,
        accent: "from-blue-500 to-indigo-600",
        tint: "bg-blue-50 text-blue-700 border-blue-100",
        chip: "bg-blue-100 text-blue-700",
    },
    {
        id: 2,
        name: "Geopolitics",
        icon: Globe2,
        description: "Power, diplomacy, borders, and global strategy in motion.",
        accent: "from-emerald-500 to-teal-600",
        tint: "bg-emerald-50 text-emerald-700 border-emerald-100",
        chip: "bg-emerald-100 text-emerald-700",
    },
    {
        id: 3,
        name: "History",
        icon: History,
        description: "Civilizations, turning points, and the echoes behind today.",
        trending: true,
        accent: "from-amber-400 to-orange-500",
        tint: "bg-amber-50 text-amber-700 border-amber-100",
        chip: "bg-amber-100 text-amber-700",
    },
    {
        id: 4,
        name: "Astronomy",
        icon: Atom,
        description: "Cosmic discoveries, night-sky wonder, and space science.",
        accent: "from-violet-500 to-purple-600",
        tint: "bg-violet-50 text-violet-700 border-violet-100",
        chip: "bg-violet-100 text-violet-700",
    },
    {
        id: 5,
        name: "Religion & Culture",
        icon: Landmark,
        description: "Traditions, meaning, philosophy, and cultural memory.",
        accent: "from-rose-500 to-pink-600",
        tint: "bg-rose-50 text-rose-700 border-rose-100",
        chip: "bg-rose-100 text-rose-700",
    },
    {
        id: 6,
        name: "Anime",
        icon: Sparkles,
        description: "Stories, studios, characters, and Japanese pop culture.",
        accent: "from-fuchsia-500 to-purple-600",
        tint: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
        chip: "bg-fuchsia-100 text-fuchsia-700",
    },
    {
        id: 7,
        name: "Literature",
        icon: BookText,
        description: "Books, poetry, essays, criticism, and the written imagination.",
        accent: "from-lime-500 to-green-600",
        tint: "bg-lime-50 text-lime-700 border-lime-100",
        chip: "bg-lime-100 text-lime-700",
    },
    {
        id: 8,
        name: "Travel",
        icon: Compass,
        description: "Places, routes, field notes, and journeys worth remembering.",
        trending: true,
        accent: "from-sky-500 to-indigo-600",
        tint: "bg-sky-50 text-sky-700 border-sky-100",
        chip: "bg-sky-100 text-sky-700",
    },
];

const CategoriesPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [viewMode, setViewMode] = useState("grid");
    const [checkingCategoryId, setCheckingCategoryId] = useState(null);
    const [categoryStatuses, setCategoryStatuses] = useState({});
    const [categoryCounts, setCategoryCounts] = useState({});
    const [countsLoading, setCountsLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryCounts = async () => {
            setCountsLoading(true);

            try {
                const response = await getCategoryPostCounts();
                setCategoryCounts(response.data.counts || {});
            } catch (error) {
                console.error("Category counts fetch failed:", error);
                toast.error("Could not load category article counts.");
            } finally {
                setCountsLoading(false);
            }
        };

        fetchCategoryCounts();
    }, []);

    const categoriesWithCounts = useMemo(() => {
        return categories.map((category) => ({
            ...category,
            count: categoryCounts[category.name.toLowerCase()] ?? 0,
        }));
    }, [categoryCounts]);

    const filteredCategories = useMemo(() => {
        return categoriesWithCounts
            .filter((category) => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortBy === "name") return a.name.localeCompare(b.name);
                if (sortBy === "count") return b.count - a.count;
                if (sortBy === "trending") return Number(Boolean(b.trending)) - Number(Boolean(a.trending));
                return 0;
            });
    }, [categoriesWithCounts, searchTerm, sortBy]);

    const totalArticles = categoriesWithCounts.reduce((sum, category) => sum + category.count, 0);
    const trendingCount = categories.filter((category) => category.trending).length;

    const handleCategoryClick = async (category) => {
        setCheckingCategoryId(category.id);

        try {
            const response = await checkCategoryPosts(category.name);
            const { exists, count } = response.data;

            setCategoryCounts((currentCounts) => ({
                ...currentCounts,
                [category.name.toLowerCase()]: count,
            }));

            if (!exists) {
                setCategoryStatuses((currentStatuses) => ({
                    ...currentStatuses,
                    [category.id]: "empty",
                }));
                toast.error(`No published articles found for ${category.name}.`);
                return;
            }

            setCategoryStatuses((currentStatuses) => ({
                ...currentStatuses,
                [category.id]: "available",
            }));
            toast.success(`${count} ${count === 1 ? "article" : "articles"} found in ${category.name}.`);
            navigate(`/articles?category=${encodeURIComponent(category.name)}`);
        } catch (error) {
            console.error("Category check failed:", error);
            toast.error("Could not verify this category. Please try again.");
        } finally {
            setCheckingCategoryId(null);
        }
    };

    const renderCategoryCard = (category) => {
        const Icon = category.icon;
        const isChecking = checkingCategoryId === category.id;
        const categoryStatus = isChecking ? "checking" : categoryStatuses[category.id] ?? "idle";
        const footerStatus = {
            idle: {
                icon: Star,
                label: "Browse topic",
                className: "border-indigo-100 bg-indigo-50 text-indigo-700",
            },
            checking: {
                icon: LoaderCircle,
                label: "Checking...",
                className: "border-sky-100 bg-sky-50 text-sky-700",
                iconClassName: "animate-spin",
            },
            available: {
                icon: CheckCircle2,
                label: "Available",
                className: "border-emerald-100 bg-emerald-50 text-emerald-700",
            },
            empty: {
                icon: XCircle,
                label: "No articles yet",
                className: "border-amber-100 bg-amber-50 text-amber-700",
            },
        }[categoryStatus];
        const FooterStatusIcon = footerStatus.icon;

        return (
            <motion.button
                key={category.id}
                type="button"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleCategoryClick(category)}
                disabled={checkingCategoryId !== null}
                className="group h-full text-left disabled:cursor-wait disabled:opacity-80"
            >
                <Card className="relative h-full overflow-hidden rounded-lg border-white/75 bg-white/72 py-0 shadow-xl shadow-indigo-300/18 backdrop-blur-md ring-1 ring-white/55 transition-all duration-300 group-hover:border-white group-hover:bg-white/82 group-hover:shadow-2xl group-hover:shadow-indigo-300/30">
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${category.accent}`} />
                    <div className="pointer-events-none absolute inset-x-4 top-3 h-20 rounded-full bg-white/45 blur-xl" />
                    <motion.div
                        className={`absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br ${category.accent} opacity-18 blur-xl transform-gpu`}
                        animate={{ scale: [1, 1.16, 1], opacity: [0.14, 0.24, 0.14] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <CardContent className="relative flex h-full flex-col p-5">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <motion.div
                                className={`flex size-12 items-center justify-center rounded-lg border bg-white/65 shadow-inner ${category.tint}`}
                                whileHover={{ rotate: -4 }}
                                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                            >
                                <Icon className="size-6" />
                            </motion.div>

                            <div className="flex flex-col items-end gap-2">
                                {category.trending && (
                                    <Badge className="rounded-full border-amber-200 bg-amber-50 text-amber-700 shadow-sm hover:bg-amber-100">
                                        <TrendingUp className="mr-1 size-3" />
                                        Trending
                                    </Badge>
                                )}
                                <Badge className={`rounded-full border-0 shadow-sm ${category.chip}`}>
                                    <Flag className="mr-1 size-3" />
                                    {countsLoading ? <LoaderCircle className="size-3 animate-spin" /> : category.count}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex-1">
                            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-indigo-600">
                                {category.name}
                            </h2>
                            <p className="text-sm leading-6 text-gray-500">
                                {category.description}
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-white/70 pt-4 text-sm">
                            <Badge className={`rounded-full border px-2.5 py-1 font-medium shadow-sm ${footerStatus.className}`}>
                                <FooterStatusIcon className={`mr-1.5 size-3.5 ${footerStatus.iconClassName ?? ""}`} />
                                {footerStatus.label}
                            </Badge>
                            <span className="flex items-center gap-2 font-semibold text-indigo-600">
                                {isChecking ? (
                                    <>
                                        Checking
                                        <LoaderCircle className="size-4 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Explore
                                        <motion.span
                                            className="inline-flex"
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <ArrowRight className="size-4" />
                                        </motion.span>
                                    </>
                                )}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </motion.button>
        );
    };

    return (
        <div className="relative isolate min-h-screen overflow-hidden bg-[#f8fbff] text-gray-900">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(135deg,#f8fbff_0%,#f4efff_42%,#fff7fb_100%)]" />
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_12%,rgba(99,102,241,0.28),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(236,72,153,0.2),transparent_26%),radial-gradient(circle_at_68%_78%,rgba(14,165,233,0.18),transparent_30%)]" />
            <motion.div
                aria-hidden
                className="pointer-events-none fixed left-[8%] top-24 -z-10 h-64 w-64 rounded-full bg-indigo-300/30 blur-3xl transform-gpu"
                animate={{ y: [0, 24, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none fixed right-[7%] top-20 -z-10 h-72 w-72 rounded-full bg-pink-300/25 blur-3xl transform-gpu"
                animate={{ y: [0, -18, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none fixed bottom-12 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl transform-gpu"
                animate={{ x: [0, 28, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.14]"
                style={{
                    backgroundImage:
                            "linear-gradient(rgba(79,70,229,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,.16) 1px, transparent 1px)",
                    backgroundSize: "34px 34px",
                }}
            />

            <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="relative"
                    >
                        <Badge className="mb-5 rounded-full border-white/70 bg-white/60 px-3 py-1.5 text-indigo-700 shadow-lg shadow-indigo-200/30 backdrop-blur-md hover:bg-white/75">
                            <BookOpen className="mr-2 size-4" />
                            {countsLoading ? "Loading" : totalArticles} curated reads across {categories.length} category flags
                        </Badge>
                        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            Browse categories
                            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                                with a sharper signal.
                            </span>
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                            Tap any category flag and Kenshi Webspace checks the backend first, then opens the matching article collection when content exists.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12, duration: 0.55, ease: "easeOut" }}
                        className="grid gap-3 rounded-2xl border border-white/70 bg-white/55 p-3 shadow-2xl shadow-indigo-300/25 backdrop-blur-lg ring-1 ring-white/50"
                    >
                        {[
                            { label: "Categories", value: categories.length, tone: "from-indigo-500 to-purple-500" },
                            { label: "Articles", value: countsLoading ? "..." : totalArticles, tone: "from-sky-500 to-indigo-500" },
                            { label: "Trending", value: trendingCount, tone: "from-amber-400 to-pink-500" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center justify-between rounded-lg border border-white/80 bg-white/75 px-4 py-3 shadow-lg shadow-indigo-100/35 backdrop-blur-sm">
                                <div>
                                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">{stat.label}</div>
                                    <div className="text-2xl font-black text-gray-950">{stat.value}</div>
                                </div>
                                <div className={`size-10 rounded-lg bg-gradient-to-br ${stat.tone} shadow-lg shadow-indigo-200`} />
                            </div>
                        ))}
                    </motion.div>
                </section>

                <motion.section
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16, duration: 0.45 }}
                    className="mb-8 rounded-2xl border border-white/70 bg-white/60 p-4 shadow-2xl shadow-indigo-300/20 backdrop-blur-lg ring-1 ring-white/50"
                >
                    <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search category flags..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="h-11 rounded-lg border-indigo-100 bg-white pl-10 text-gray-900 placeholder:text-gray-400 focus-visible:border-indigo-300 focus-visible:ring-indigo-200"
                            />
                        </div>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="h-11 w-full rounded-lg border-indigo-100 bg-white text-gray-700 focus:ring-indigo-200 lg:w-[180px]">
                                <Filter className="size-4 text-gray-400" />
                                <SelectValue placeholder="Sort categories" />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg">
                                <SelectItem value="name">Sort by Name</SelectItem>
                                <SelectItem value="count">Sort by Count</SelectItem>
                                <SelectItem value="trending">Trending First</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="grid h-11 grid-cols-2 rounded-lg border border-indigo-100 bg-indigo-50/70 p-1">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className={`h-full rounded-md text-gray-500 hover:bg-white hover:text-gray-900 ${viewMode === "grid" ? "bg-white text-indigo-600 shadow-sm" : ""}`}
                            >
                                <Grid className="size-4" />
                                Grid
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewMode("list")}
                                className={`h-full rounded-md text-gray-500 hover:bg-white hover:text-gray-900 ${viewMode === "list" ? "bg-white text-indigo-600 shadow-sm" : ""}`}
                            >
                                <LayoutList className="size-4" />
                                List
                            </Button>
                        </div>
                    </div>
                </motion.section>

                <AnimatePresence mode="wait">
                    <motion.section
                        key={viewMode + searchTerm + sortBy}
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit={{ opacity: 0, y: 10 }}
                        className={
                            viewMode === "grid"
                                ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                : "grid gap-4"
                        }
                    >
                        {filteredCategories.map((category) => renderCategoryCard(category))}
                    </motion.section>
                </AnimatePresence>

                {filteredCategories.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-white/70 bg-white/65 p-10 text-center shadow-2xl shadow-indigo-300/20 backdrop-blur-lg ring-1 ring-white/50"
                    >
                        <Search className="mx-auto mb-4 size-10 text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-900">No category flags found</h2>
                        <p className="mt-2 text-sm text-gray-500">Try a broader search term.</p>
                    </motion.div>
                )}

                <motion.section
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.5 }}
                    className="mt-10 overflow-hidden rounded-2xl border border-white/70 bg-white/65 shadow-2xl shadow-indigo-300/20 backdrop-blur-lg ring-1 ring-white/50"
                >
                    <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
                        <div>
                            <Badge className="mb-3 rounded-full border-indigo-100 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                                <Sparkles className="mr-2 size-4" />
                                Topic request
                            </Badge>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Looking for a category that is not here?</h2>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                                Request a topic or browse the complete article archive while new collections are being curated.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button asChild className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
                                <Link to="/maintenance">Request a Topic</Link>
                            </Button>
                            <Button asChild variant="outline" className="rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
                                <Link to="/articles">Browse All Articles</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
                </motion.section>
            </main>
        </div>
    );
};

export default CategoriesPage;
