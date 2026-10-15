import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, BookOpen, LoaderCircle, Network, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateArticleNetwork, getReadingMapArticles } from "../services/GlobalApi";

const MAX_ARTICLES = 40;
const NETWORK_CACHE_PREFIX = "kenshi-reading-network-v3:";
const categoryPalette = ["#0f766e", "#d97706", "#be123c", "#2563eb", "#65a30d", "#9333ea", "#0891b2", "#c2410c"];

function groupByCategory(articles) {
    const groups = new Map();
    articles.forEach((article) => {
        const name = article.category || "Uncategorized";
        if (!groups.has(name)) groups.set(name, []);
        groups.get(name).push(article.id);
    });
    return Array.from(groups, ([name, articleIds]) => ({
        name,
        description: `Published articles filed under ${name}.`,
        articleIds,
    }));
}

function createCategoryFallback(articles) {
    const topics = groupByCategory(articles);
    const relatedArticles = topics.flatMap((topic) => topic.articleIds.slice(1).map((articleId, index) => ({
        sourceId: topic.articleIds[index],
        targetId: articleId,
        reason: `Both articles are in ${topic.name}.`,
    }))).slice(0, 80);
    const leading = [...topics].sort((first, second) => second.articleIds.length - first.articleIds.length)[0];
    const topShare = leading ? Math.round((leading.articleIds.length / Math.max(articles.length, 1)) * 100) : 0;
    const coverage = topics.slice(0, 3).map((topic) => topic.name).join(", ");
    const publicationDates = articles.map((article) => new Date(article.publishedAt)).filter((date) => Number.isFinite(date.getTime()));
    const spanMonths = publicationDates.length > 1
        ? Math.max(1, Math.round((Math.max(...publicationDates) - Math.min(...publicationDates)) / (30 * 24 * 60 * 60 * 1000)))
        : 1;
    return {
        summary: leading
            ? `Across ${articles.length} published articles, ${leading.name} leads the collection (${topShare}%), alongside ${coverage}. The catalog spans about ${spanMonths} month${spanMonths === 1 ? "" : "s"} of publishing; this snapshot uses category and date metadata.`
            : "There are no published articles to summarize yet.",
        topics,
        relatedArticles,
    };
}

function validateNetwork(network, articles) {
    const validIds = new Set(articles.map((article) => article.id));
    const topics = (network?.topics || [])
        .map((topic) => ({
            name: topic.name,
            description: topic.description,
            articleIds: [...new Set((topic.articleIds || []).filter((id) => validIds.has(id)))],
        }))
        .filter((topic) => topic.articleIds.length > 0);
    const relatedArticles = (network?.relatedArticles || []).filter((pair) =>
        pair.sourceId !== pair.targetId && validIds.has(pair.sourceId) && validIds.has(pair.targetId),
    );
    return { summary: network?.summary || "AI summary is unavailable for this article collection.", topics, relatedArticles };
}

export default function D3Network() {
    const graphRef = useRef(null);
    const [articles, setArticles] = useState([]);
    const [network, setNetwork] = useState(null);
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [usingFallback, setUsingFallback] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { resolvedTheme } = useTheme();
    const navigate = useNavigate();
    const isDark = resolvedTheme === "dark";

    useEffect(() => {
        let active = true;

        async function loadNetwork() {
            setLoading(true);
            setError(false);
            try {
                const response = await getReadingMapArticles();
                const publishedArticles = (response.data.articles || []).slice(0, MAX_ARTICLES).map((post) => ({
                    id: String(post.id),
                    title: post.title,
                    excerpt: post.excerpt || "",
                    category: post.category?.trim() || "Uncategorized",
                    publishedAt: post.createdAt || "",
                    updatedAt: post.updatedAt || post.createdAt || "",
                }));
                if (!active) return;
                setArticles(publishedArticles);

                if (publishedArticles.length === 0) {
                    setNetwork({ summary: "There are no published articles to analyze yet.", topics: [], relatedArticles: [] });
                    return;
                }

                const fingerprint = JSON.stringify(publishedArticles.map(({ id, title, excerpt, category, publishedAt, updatedAt }) =>
                    [id, title, excerpt, category, publishedAt, updatedAt]));
                const cacheKey = `${NETWORK_CACHE_PREFIX}${fingerprint}`;
                let generatedNetwork = null;

                try {
                    const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null");
                    if (cached?.expiresAt > Date.now()) generatedNetwork = cached.network;
                } catch {
                    sessionStorage.removeItem(cacheKey);
                }

                if (!generatedNetwork) {
                    const summary = publishedArticles.map(({ id, title, excerpt, category, publishedAt }) => ({ id, title, excerpt, category, publishedAt }));
                    try {
                        const aiResponse = await generateArticleNetwork(summary);
                        generatedNetwork = aiResponse.data.data;
                        sessionStorage.setItem(cacheKey, JSON.stringify({
                            expiresAt: Date.now() + 6 * 60 * 60 * 1000,
                            network: generatedNetwork,
                        }));
                        if (active) setUsingFallback(false);
                    } catch (aiError) {
                        console.warn("AI reading path generation failed; using published categories:", aiError);
                        generatedNetwork = createCategoryFallback(publishedArticles);
                        if (active) setUsingFallback(true);
                    }
                } else if (active) {
                    setUsingFallback(false);
                }

                if (active) setNetwork(validateNetwork(generatedNetwork, publishedArticles));
            } catch (requestError) {
                console.error("Reading network articles fetch failed:", requestError);
                if (active) {
                    setArticles([]);
                    setNetwork(null);
                    setError(true);
                }
            } finally {
                if (active) setLoading(false);
            }
        }

        loadNetwork();
        return () => {
            active = false;
        };
    }, [refreshKey]);

    const topics = network?.topics || [];
    const selectedTopic = topics[selectedTopicIndex] || topics[0];
    const categorySummary = useMemo(() => groupByCategory(articles).map((category, index) => ({
        ...category,
        color: categoryPalette[index % categoryPalette.length],
    })), [articles]);

    useEffect(() => {
        const container = graphRef.current;
        if (!container || !network || articles.length === 0) return undefined;

        const articleMap = new Map(articles.map((article) => [article.id, article]));
        const topicNodes = network.topics.map((topic, index) => ({
            id: `topic:${index}`,
            type: "topic",
            label: topic.name,
            description: topic.description,
            articleIds: topic.articleIds,
            topicIndex: index,
            radius: Math.min(29, 21 + (topic.articleIds.length - 1) * 1.6),
            color: categoryPalette[index % categoryPalette.length],
        }));
        const articleNodes = articles.map((article) => {
            const topicIndices = network.topics.flatMap((topic, index) => topic.articleIds.includes(article.id) ? [index] : []);
            const topicIndex = topicIndices[0] ?? -1;
            return {
                id: `article:${article.id}`,
                type: "article",
                label: article.title,
                articleId: article.id,
                category: article.category,
                topicIndex,
                topicIndices,
                radius: 8,
                color: categoryPalette[Math.max(topicIndex, 0) % categoryPalette.length],
            };
        });
        const membershipLinks = network.topics.flatMap((topic, index) => topic.articleIds
            .filter((articleId) => articleMap.has(articleId))
            .map((articleId) => ({
                source: `topic:${index}`,
                target: `article:${articleId}`,
                kind: "topic",
                color: categoryPalette[index % categoryPalette.length],
            })));
        const relatedLinks = network.relatedArticles.map((pair) => ({
            source: `article:${pair.sourceId}`,
            target: `article:${pair.targetId}`,
            kind: "related",
            reason: pair.reason,
            color: isDark ? "#f9a8d4" : "#be185d",
        }));
        const nodes = [...topicNodes, ...articleNodes];
        const links = [...membershipLinks, ...relatedLinks];

        let width = Math.max(container.clientWidth, 320);
        let height = Math.max(340, Math.min(470, width * 0.56));
        const textColor = isDark ? "#e9d5ff" : "#374151";
        const defaultLinkOpacity = isDark ? 0.46 : 0.38;
        const tooltip = d3.select(container)
            .append("div")
            .attr("class", "pointer-events-none absolute z-10 max-w-64 rounded-md border px-3 py-2 text-xs shadow-lg")
            .style("display", "none")
            .style("border-color", isDark ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.8)")
            .style("background", isDark ? "rgba(35,22,57,.96)" : "rgba(255,255,255,.97)")
            .style("color", isDark ? "#faf5ff" : "#1f2937");
        const svg = d3.select(container)
            .append("svg")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("role", "img")
            .attr("aria-label", "AI-generated topics connecting published Kenshi articles")
            .style("display", "block");

        const linkSelection = svg.append("g")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke", (link) => link.color)
            .attr("stroke-opacity", (link) => link.kind === "related" ? 0.98 : defaultLinkOpacity)
            .attr("stroke-width", (link) => link.kind === "related" ? 2.6 : 1.2)
            .attr("stroke-dasharray", (link) => link.kind === "related" ? "7 5" : null)
            .attr("vector-effect", "non-scaling-stroke");

        const nodeSelection = svg.append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("role", "button")
            .attr("tabindex", 0)
            .attr("aria-label", (node) => node.type === "topic"
                ? `Select topic ${node.label}, ${node.articleIds.length} articles`
                : `Open article: ${node.label}`)
            .attr("cursor", "pointer");

        nodeSelection.filter((node) => node.type === "topic")
            .append("circle")
            .attr("r", (node) => node.radius + 7)
            .attr("fill", (node) => node.color)
            .attr("fill-opacity", isDark ? 0.13 : 0.11);
        nodeSelection.append("circle")
            .attr("class", "node-core")
            .attr("r", (node) => node.radius)
            .attr("fill", (node) => node.type === "topic" ? node.color : (isDark ? "#2b1d42" : "#ffffff"))
            .attr("fill-opacity", (node) => node.type === "topic" ? (isDark ? 0.92 : 0.96) : 1)
            .attr("stroke", (node) => node.color)
            .attr("stroke-width", (node) => node.type === "topic" ? 2 : 2.5);
        nodeSelection.filter((node) => node.type === "topic")
            .append("text")
            .text((node) => node.articleIds.length)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("font-size", 12)
            .attr("font-weight", 700)
            .attr("fill", "#ffffff")
            .style("pointer-events", "none");
        nodeSelection.filter((node) => node.type === "topic")
            .append("text")
            .text((node) => node.label)
            .attr("text-anchor", "middle")
            .attr("y", (node) => node.radius + 20)
            .attr("font-size", 10)
            .attr("font-weight", 600)
            .attr("fill", textColor)
            .style("pointer-events", "none");

        nodeSelection.attr("opacity", 0)
            .transition("entrance")
            .duration(520)
            .delay((_node, index) => Math.min(index * 16, 320))
            .ease(d3.easeCubicOut)
            .attr("opacity", 1);

        const nodesById = new Map(nodes.map((node) => [node.id, node]));
        const endpointNode = (endpoint) => typeof endpoint === "string" ? nodesById.get(endpoint) : endpoint;
        const focusTopic = (topicIndex) => {
            nodeSelection.interrupt("focus")
                .transition("focus")
                .duration(260)
                .attr("opacity", (node) => topicIndex === null ||
                    (node.type === "topic" ? node.topicIndex === topicIndex : node.topicIndices.includes(topicIndex)) ? 1 : 0.2);
            linkSelection.interrupt("focus")
                .transition("focus")
                .duration(260)
                .attr("stroke-opacity", (link) => {
                    if (topicIndex === null) return link.kind === "related" ? 0.98 : defaultLinkOpacity;
                    if (link.kind === "topic") return link.source.id === `topic:${topicIndex}` ? 0.96 : 0.08;
                    const source = endpointNode(link.source);
                    const target = endpointNode(link.target);
                    return source?.topicIndices?.includes(topicIndex) || target?.topicIndices?.includes(topicIndex) ? 0.98 : 0.08;
                });
        };

        const openNode = (node) => {
            if (node.type === "topic") {
                setSelectedTopicIndex(node.topicIndex);
            } else {
                navigate(`/articles/${node.articleId}`);
            }
        };
        nodeSelection
            .on("click", (event, node) => {
                event.stopPropagation();
                openNode(node);
            })
            .on("keydown", (event, node) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openNode(node);
                }
            })
            .on("mouseenter focus", function (event, node) {
                const hoverTopicIndex = node.type === "topic" ? node.topicIndex : node.topicIndex;
                focusTopic(hoverTopicIndex >= 0 ? hoverTopicIndex : null);
                d3.select(this).raise().select(".node-core")
                    .interrupt("hover")
                    .transition("hover")
                    .duration(180)
                    .attr("r", node.radius + 3)
                    .attr("stroke-width", 4);
                linkSelection.interrupt("hover").transition("hover").duration(180)
                    .attr("stroke-opacity", (link) =>
                        link.source.id === node.id || link.target.id === node.id ||
                            (node.type === "topic" && link.source.id === `topic:${node.topicIndex}`)
                            ? 0.94
                            : (link.kind === "related" ? 0.12 : 0.04));
                const tooltipText = node.type === "topic"
                    ? `${node.label} · ${node.description}`
                    : `${node.label} · ${node.category}`;
                tooltip.style("display", "block").text(tooltipText);
                if (event.type === "focus") tooltip.style("left", "12px").style("top", "12px");
            })
            .on("mousemove", (event) => {
                const bounds = container.getBoundingClientRect();
                tooltip.style("left", `${event.clientX - bounds.left + 12}px`)
                    .style("top", `${event.clientY - bounds.top + 12}px`);
            })
            .on("mouseleave blur", function (_event, node) {
                d3.select(this).select(".node-core")
                    .interrupt("hover")
                    .transition("hover")
                    .duration(180)
                    .attr("r", node.radius)
                    .attr("stroke-width", node.type === "topic" ? 2 : 2.5);
                focusTopic(null);
                tooltip.style("display", "none");
            });

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((node) => node.id).distance((link) => link.kind === "related" ? 115 : (width < 520 ? 58 : 78)).strength(0.75))
            .force("charge", d3.forceManyBody().strength((node) => node.type === "topic" ? -165 : -38))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("x", d3.forceX(width / 2).strength(0.08))
            .force("y", d3.forceY(height / 2).strength(0.08))
            .force("collision", d3.forceCollide().radius((node) => node.radius + (node.type === "topic" ? 28 : 5)))
            .on("tick", () => {
                linkSelection.attr("x1", (link) => link.source.x)
                    .attr("y1", (link) => link.source.y)
                    .attr("x2", (link) => link.target.x)
                    .attr("y2", (link) => link.target.y);
                nodeSelection.attr("transform", (node) => `translate(${node.x},${node.y})`);
            });

        const resizeObserver = new ResizeObserver(([entry]) => {
            width = Math.max(entry.contentRect.width, 320);
            height = Math.max(340, Math.min(470, width * 0.56));
            svg.attr("viewBox", `0 0 ${width} ${height}`);
            simulation.force("center", d3.forceCenter(width / 2, height / 2))
                .force("x", d3.forceX(width / 2).strength(0.08))
                .force("y", d3.forceY(height / 2).strength(0.08))
                .alpha(0.35)
                .restart();
        });
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            simulation.stop();
            tooltip.remove();
            svg.remove();
        };
    }, [articles, isDark, navigate, network]);

    const topicArticles = selectedTopic
        ? selectedTopic.articleIds.map((id) => articles.find((article) => article.id === id)).filter(Boolean)
        : [];

    return (
        <section aria-labelledby="reading-paths-title" className="overflow-hidden rounded-xl border border-white/80 bg-white/10 shadow-md dark:shadow-indigo-300 backdrop-blur-lg ring-1 ring-white dark:border-white/10  dark:ring-white/10">
            <div className="flex flex-col gap-4 border-b border-white/80 px-5 py-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50/80 text-purple-600 dark:border-indigo-300/15 dark:bg-indigo-400/10 dark:text-indigo-200">
                        <Network className="size-5" />
                    </span>
                    <div>
                        <h2 id="reading-paths-title" className="text-lg font-semibold text-gray-900 dark:text-white">AI reading paths</h2>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-200 dark:text-gray-300">
                            Discover shared ideas across Kenshi articles and follow a path into a new subject.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 dark:text-gray-400">
                        <Sparkles className="size-3.5 text-indigo-300 dark:text-purple-300" />
                        {usingFallback ? "Category map" : "AI topic map"}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm text-gray-300 dark:text-gray-300">
                        <BookOpen className="size-4 text-indigo-300 dark:text-indigo-300" />
                        {loading ? "Analyzing published articles" : `${articles.length} recent articles`}
                    </span>
                </div>
            </div>

            <div className="mx-4 mt-4 flex items-start gap-3 rounded-lg border border-indigo-100/80 bg-white/75 px-4 py-3 backdrop-blur-sm dark:border-indigo-300/15 dark:bg-white/5 sm:mx-5">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-indigo-600 dark:text-indigo-300" />
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-800 dark:text-indigo-200">Collection summary</p>
                    <p aria-live="polite" className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200">
                        {loading ? "Analyzing themes across the published article collection…" : network?.summary || "No published articles are available to summarize."}
                    </p>
                </div>
            </div>

            <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="min-w-0 space-y-3 flex flex-col">
                    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-200 dark:text-gray-400">Connection map</span>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-950 dark:text-gray-400">
                            <span className="inline-flex items-center gap-2">
                                <span className="h-0.5 w-8 rounded bg-indigo-600 dark:bg-indigo-400" /> Shared AI topic
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-8 border-t-2 border-dashed border-pink-700 dark:border-pink-300" /> Related reading
                            </span>
                        </div>
                    </div>
                    <div className="relative flex aspect-video max-h-117.5 min-h-85 items-center justify-center overflow-hidden rounded-lg border border-white/80 bg-white/85 dark:border-white/10 dark:bg-black/10">
                        {loading ? (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <LoaderCircle className="size-4 animate-spin" /> Analyzing the latest articles
                            </div>
                        ) : error ? (
                            <div className="max-w-sm px-5 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-300">Published articles could not be loaded.</p>
                                <Button variant="outline" size="sm" onClick={() => setRefreshKey((key) => key + 1)} className="mt-3">Try again</Button>
                            </div>
                        ) : articles.length === 0 ? (
                            <p className="px-5 text-center text-sm text-gray-500 dark:text-gray-400">Published articles will appear here as a topic map.</p>
                        ) : (
                            <div ref={graphRef} className="absolute inset-0 h-full w-full" />
                        )}
                    </div>
                </div>

                <aside className="flex flex-col gap-4 rounded-lg border border-white/80 bg-white/75 p-4 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{selectedTopic?.name || "Topics"}</h3>
                        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                            {selectedTopic?.description || "AI groups published articles by shared ideas."}
                        </p>
                    </div>
                    {topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {topics.map((topic, index) => (
                                <button
                                    key={`${topic.name}-${index}`}
                                    type="button"
                                    onClick={() => setSelectedTopicIndex(index)}
                                    className={`rounded-md border px-2 py-1 text-xs transition-colors ${index === selectedTopicIndex
                                        ? "border-indigo-600 bg-indigo-50 text-indigo-900 dark:border-indigo-300/40 dark:bg-indigo-400/10 dark:text-indigo-100"
                                        : "border-white/80 text-gray-600 hover:bg-white/70 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10"}`}
                                >
                                    {topic.name}
                                </button>
                            ))}
                        </div>
                    )}
                    {topicArticles.length > 0 ? (
                        <ul className="space-y-1">
                            {topicArticles.map((article) => (
                                <li key={article.id}>
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/articles/${article.id}`)}
                                        className="group flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-white/70 dark:text-gray-200 dark:hover:bg-white/10"
                                    >
                                        <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ backgroundColor: categoryPalette[Math.max(topics.indexOf(selectedTopic), 0) % categoryPalette.length] }} />
                                        <span className="min-w-0 flex-1 leading-5">{article.title}</span>
                                        <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : categorySummary.length > 0 ? (
                        <ul className="space-y-1">
                            {categorySummary.map((category) => (
                                <li key={category.name} className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-600 dark:text-gray-300">
                                    <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: category.color }} />
                                    <span className="min-w-0 flex-1 truncate">{category.name}</span>
                                    <span className="text-gray-500 dark:text-gray-400">{category.articleIds.length}</span>
                                </li>
                            ))}
                        </ul>
                    ) : null}
                    <p className="mt-auto border-t border-white/70 pt-3 text-xs leading-5 text-gray-500 dark:border-white/10 dark:text-gray-400">
                        Select a topic to explore its articles. Article points open the full read.
                    </p>
                </aside>
            </div>
        </section>
    );
}