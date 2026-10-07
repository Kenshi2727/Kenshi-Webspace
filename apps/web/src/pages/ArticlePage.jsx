import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Pencil, Clock, Eye, Heart, Bookmark, Share2, Delete, DeleteIcon, Trash, DownloadIcon, BrainCircuit, MessageCircle, Send, Sparkles, Scroll, ScrollText, Workflow, ZoomIn, ZoomOut, Maximize, Volume2, Pause, Square } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';
import { getSinglePost, deletePost, updatePostLikes, updatePostViews, updatePostBookmarks, createArticleInsights, askArticleQuestion, createArticleDiagram } from '../services/GlobalApi.js';
import toast from 'react-hot-toast';
import { formatDate, formatMessageTime, formatOnlyNumericDate } from '../lib/dateFormatter.js';
import { useUser } from '@clerk/clerk-react';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { setCurrentArticle } from '@/features/articles/currentArticleSlice';
import { Textarea } from '@/components/ui/textarea';
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom';
import { useTheme } from 'next-themes';

const related = [
    { id: 2, title: 'Coming soon...', readTime: '0 min', category: 'Crying Kitty' },
    { id: 4, title: 'Coming soon...', readTime: '0 min', category: 'Crying Kitty' },
    { id: 3, title: 'Coming soon...', readTime: '0 min', category: 'Crying Kitty' },
];

// function splitSpeechText(text, maxLength = 220) {
//     const chunks = [];
//     let chunk = '';

//     for (const word of text.split(/\s+/)) {
//         if (chunk && chunk.length + word.length + 1 > maxLength) {
//             chunks.push(chunk);
//             chunk = '';
//         }
//         chunk = chunk ? `${chunk} ${word}` : word;
//     }

//     if (chunk) chunks.push(chunk);
//     return chunks;
// }

function AIInsightsPanel({ article, mobile = false }) {
    const [insights, setInsights] = useState(null);
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [asking, setAsking] = useState(false);
    const [error, setError] = useState('');
    const conversationRef = useRef(null);

    useEffect(() => {
        const conversation = conversationRef.current;
        if (conversation) conversation.scrollTop = conversation.scrollHeight;
    }, [messages, asking]);

    useEffect(() => {
        let active = true;

        const loadInsights = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await createArticleInsights({
                    id: article.id,
                    title: article.title,
                    content: article.content,
                });
                if (active) setInsights(response.data.data);
            } catch (requestError) {
                if (active) setError(requestError?.response?.data?.error || 'AI insights are unavailable right now.');
            } finally {
                if (active) setLoading(false);
            }
        };

        loadInsights();
        return () => { active = false; };
    }, [article.id, article.title, article.content]);

    const handleQuestion = async (event) => {
        event.preventDefault();
        if (!question.trim() || asking) return;

        const submittedQuestion = question.trim();
        setMessages((currentMessages) => [...currentMessages, { role: 'user', content: submittedQuestion }]);
        setQuestion('');
        setAsking(true);
        try {
            const response = await askArticleQuestion({
                id: article.id,
                title: article.title,
                content: article.content,
            }, submittedQuestion);
            const result = response?.data?.data;
            const answer = [result?.answer, result?.explanation]
                .find((value) => typeof value === 'string' && value.trim())
                ?.trim() || '';
            const responseError = typeof result?.error === 'string' ? result.error.trim() : '';
            setMessages((currentMessages) => [...currentMessages, {
                role: 'assistant',
                content: answer || responseError || 'The AI returned an unexpected response.',
                isError: !answer,
            }]);
        } catch (requestError) {
            setMessages((currentMessages) => [...currentMessages, {
                role: 'assistant',
                content: requestError?.response?.data?.data?.error
                    || requestError?.response?.data?.error
                    || requestError?.message
                    || 'I could not answer that question.',
                isError: true,
            }]);
        } finally {
            setAsking(false);
        }
    };

    return (
        <Card className={`${mobile ? 'h-full rounded-2xl' : 'h-[calc(100vh+4rem)] rounded-3xl'} min-h-0 overflow-hidden border-fuchsia-300/20 bg-slate-950/40 text-white shadow-2xl shadow-indigo-950/30 backdrop-blur-xl`}>
            <CardContent className={`flex h-full min-h-0 flex-col ${mobile ? 'gap-4' : 'gap-3'} p-4 sm:p-5`}>
                <div className="flex shrink-0 items-start justify-between gap-3">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-fuchsia-200">
                            <BrainCircuit size={19} />
                            <span className="text-xs font-semibold uppercase tracking-[0.18em]">AI Insights</span>
                        </div>
                        <h2 className="text-xl font-bold text-white">{mobile ? 'Ask about this article' : 'Understand this article faster'}</h2>
                    </div>
                    <Sparkles className="shrink-0 text-pink-300" size={20} />
                </div>

                {!mobile && (
                    <div className="flex min-h-0 flex-[0.867] flex-col gap-2 overflow-hidden">
                        {loading && <p className="text-sm text-slate-300">Generating insights...</p>}
                        {error && <p className="text-sm text-rose-200">{error}</p>}
                        {insights && [
                            { label: 'Summary', text: insights.summary },
                            { label: 'Key ideas', items: insights.keyIdeas },
                            { label: 'Reader questions', items: insights.questions },
                        ].map((insight) => (
                            <div key={insight.label} className={`flex min-h-0 ${insight.label === 'Summary' ? 'flex-[1.25]' : 'flex-1'} flex-col rounded-xl border border-white/10 bg-white/5 p-3`}>
                                <p className="mb-1 text-sm font-semibold text-indigo-100">{insight.label}</p>
                                {insight.items ? (
                                    <ul className="ai-scrollbar min-h-0 flex-1 list-disc space-y-2 overflow-y-auto pl-5 pr-2 text-xs leading-relaxed text-slate-300">
                                        {insight.items.map((item) => <li key={item}>{item}</li>)}
                                    </ul>
                                ) : (
                                    <p className="ai-scrollbar min-h-0 flex-1 overflow-y-auto pr-2 text-xs leading-relaxed text-slate-300">{insight.text}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className={`flex min-h-0 flex-col justify-between gap-2.5 rounded-2xl border border-fuchsia-300/20 bg-linear-to-br from-fuchsia-500/10 to-indigo-500/10 p-3 ${mobile ? 'flex-1' : 'flex-[0.633]'}`}>
                    <div className="flex items-center gap-2">
                        <MessageCircle size={17} className="text-fuchsia-200" />
                        <h3 className="font-semibold text-white">Chat with this article</h3>
                    </div>
                    <div
                        ref={conversationRef}
                        role="log"
                        aria-label="Conversation with AI about this article"
                        aria-live="polite"
                        className="ai-scrollbar flex min-h-24 flex-1 flex-col gap-3 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3 pr-2"
                    >
                        {messages.length === 0 && <p className="text-sm text-slate-400">Your conversation will appear here.</p>}
                        {messages.map((message, index) => (
                            <div
                                key={`${message.role}-${index}`}
                                role={message.isError ? 'alert' : undefined}
                                className={`max-w-[90%] whitespace-pre-wrap wrap-break-word rounded-xl px-3 py-2 text-sm leading-relaxed ${message.isError ? 'mr-auto border border-rose-400/30 bg-rose-500/10 text-rose-200' : message.role === 'user' ? 'ml-auto bg-fuchsia-500/20 text-fuchsia-50' : 'mr-auto bg-white/5 text-slate-200'}`}
                            >
                                <span className={`mb-1 block text-[0.65rem] font-semibold uppercase tracking-wider ${message.isError ? 'text-rose-300' : 'text-slate-400'}`}>
                                    {message.isError ? 'AI error' : message.role === 'user' ? 'You' : 'AI'}
                                </span>
                                {message.content}
                            </div>
                        ))}
                        {asking && <p className="mr-auto text-sm text-slate-400">Thinking...</p>}
                    </div>
                    <form className="relative shrink-0" onSubmit={handleQuestion}>
                        <Textarea
                            rows={1}
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && !event.shiftKey) {
                                    event.preventDefault();
                                    handleQuestion(event);
                                }
                            }}
                            disabled={asking}
                            placeholder="Ask a question about this article..."
                            aria-label="Ask the AI about this article"
                            className="ai-scrollbar h-12 min-h-12 max-h-12 field-sizing-fixed resize-none overflow-y-auto border-white/10 bg-black/20 px-4 py-3 pr-12 text-white placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-70"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={asking || !question.trim()}
                            aria-label="Send question"
                            className="absolute bottom-1.5 right-3 bg-fuchsia-500/40 text-white"
                        >
                            <Send size={16} />
                        </Button>
                    </form>
                    {!mobile && <p className="mt-3 text-xs text-slate-400">Answers are grounded in this article.</p>}
                </div>
            </CardContent>
        </Card>
    );
}

/* eslint-disable react/prop-types */
function ArticleDiagramDialog({ article, open, onOpenChange }) {
    const [diagram, setDiagram] = useState('');
    const [svg, setSvg] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const diagramViewportRef = useRef(null);
    const panZoomRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        let active = true;
        setLoading(true);
        setError('');
        setDiagram('');
        setSvg('');

        createArticleDiagram({
            id: article.id,
            title: article.title,
            content: article.content,
        })
            .then((response) => {
                const source = response?.data?.data?.mermaid;
                if (typeof source !== 'string' || !source.trim()) {
                    throw new Error('The AI returned an empty diagram.');
                }
                if (active) setDiagram(source.trim());
            })
            .catch((requestError) => {
                if (active) setError(requestError?.response?.data?.error || requestError.message || 'Unable to generate the diagram.');
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => { active = false; };
    }, [open, article.id, article.title, article.content]);

    useEffect(() => {
        if (!diagram) return;

        let active = true;
        const renderDiagram = async () => {
            try {
                const renderId = `article-diagram-${article.id}-${Date.now()}`;
                const { svg: renderedSvg } = await mermaid.render(renderId, diagram);
                if (active) setSvg(renderedSvg);
            } catch {
                if (active) setError('The generated diagram could not be rendered. Try generating it again.');
            }
        };

        renderDiagram();
        return () => { active = false; };
    }, [diagram, article.id]);

    useEffect(() => {
        if (!svg || !diagramViewportRef.current) return;

        const svgElement = diagramViewportRef.current.querySelector('svg');
        if (!svgElement) return;

        svgElement.style.maxWidth = 'none';
        svgElement.style.width = '100%';
        svgElement.style.height = '100%';
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        const panZoom = svgPanZoom(svgElement, {
            zoomEnabled: true,
            controlIconsEnabled: false,
            fit: true,
            center: true,
            minZoom: 0.15,
            maxZoom: 8,
            zoomScaleSensitivity: 0.3,
        });
        panZoomRef.current = panZoom;
        const animationFrame = window.requestAnimationFrame(() => {
            panZoom.resize();
            panZoom.fit();
            panZoom.center();
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
            panZoom.destroy();
            panZoomRef.current = null;
        };
    }, [svg]);

    const fitDiagram = () => {
        panZoomRef.current?.fit();
        panZoomRef.current?.center();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex h-[calc(100dvh-1rem)] max-h-none w-[96vw] max-w-[96vw] sm:max-w-[96vw] 2xl:max-w-[1600px] flex-col gap-0 overflow-hidden border-white/15 bg-slate-950 p-0 text-white">
                <DialogHeader className="border-b border-white/10 px-5 py-4 pr-12 text-left sm:px-6">
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <Workflow size={19} className="text-fuchsia-300" />
                        Article diagram
                    </DialogTitle>
                    <p className="line-clamp-1 text-sm text-slate-400">{article.title}</p>
                </DialogHeader>
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-2 sm:px-6">
                    <p className="hidden text-xs text-slate-400 sm:block">Drag to pan. Use the wheel or controls to zoom.</p>
                    <div className="ml-auto flex items-center gap-1">
                        <Button type="button" variant="ghost" size="icon" title="Zoom out" aria-label="Zoom out" disabled={!svg || loading || Boolean(error)} onClick={() => panZoomRef.current?.zoomOut()}>
                            <ZoomOut size={18} />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" title="Zoom in" aria-label="Zoom in" disabled={!svg || loading || Boolean(error)} onClick={() => panZoomRef.current?.zoomIn()}>
                            <ZoomIn size={18} />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" title="Fit diagram" aria-label="Fit diagram" disabled={!svg || loading || Boolean(error)} onClick={fitDiagram}>
                            <Maximize size={18} />
                        </Button>
                    </div>
                </div>
                <div className="relative min-h-0 flex-1 overflow-hidden bg-slate-900/70" aria-live="polite">
                    {loading && <p className="absolute inset-0 z-10 grid place-items-center text-sm text-slate-300">Generating diagram...</p>}
                    {error && <p role="alert" className="absolute inset-0 z-10 grid place-items-center px-6 text-center text-sm text-rose-200">{error}</p>}
                    {!loading && !error && svg && (
                        <div ref={diagramViewportRef} className="grid h-full w-full touch-none place-items-center" dangerouslySetInnerHTML={{ __html: svg }} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
/* eslint-enable react/prop-types */

export default function ArticlePage() {
    const { id } = useParams();
    const { user } = useUser();
    const { getToken } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);
    const [isDiagramOpen, setIsDiagramOpen] = useState(false);
    const articleScrollRef = useRef(null);
    const articleBodyRef = useRef(null);
    const speechSessionRef = useRef(0);
    const [speechStatus, setSpeechStatus] = useState('idle');
    const [addScrollBar, setAddScrollBar] = useState(false);
    const { theme } = useTheme();

    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: theme === 'dark' ? 'dark' : 'default' });

    // Fixed scroll hook
    const { scrollYProgress, scrollY } = useScroll({ container: articleScrollRef });
    const readingProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const [progress, setProgress] = useState(0);
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
    const y = useTransform(scrollY, [0, 300], [0, -50]);
    // const article = getPost(id);

    useEffect(() => {
        async function fetchPost() {
            setLoading(true);
            try {
                const res = await getSinglePost(id);
                setArticle(res.data.post);
                dispatch(setCurrentArticle(res.data.post));
                console.log("Response from servers:", res.data.message);

                // Check if the user has liked the post
                const likeStatus = res.data.post.PostActions?.find(action => action.userId === user?.id)?.likeStatus;
                likeStatus ? setIsLiked(likeStatus) : setIsLiked(false);

                // Check if the user has bookmarked the post
                const bookmarkStatus = res.data.post.PostActions?.find(action => action.userId === user?.id)?.bookmarkStatus;
                bookmarkStatus ? setIsBookmarked(bookmarkStatus) : setIsBookmarked(false);
            } catch (error) {
                toast.error(error?.response?.data?.error || "Failed to fetch the article");
                console.log(error);
            }

            setLoading(false);
        }
        fetchPost();

        // temporary function for view count update
        async function updateViews() {
            try {
                await updatePostViews(id);
            } catch (error) {
                console.error("Failed to update view count", error);
            }
        }
        updateViews();
    }, [user, id, dispatch]);

    useEffect(() => {
        const unsubscribe = readingProgress.on('change', setProgress);
        return unsubscribe;
    }, [readingProgress]);

    useEffect(() => () => {
        speechSessionRef.current += 1;
        window.speechSynthesis?.cancel();
    }, [article?.id]);

    if (loading) {
        return <LoadingPage />
    }

    if (!article) {
        return <NotFoundPage />;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);
            const token = await getToken();
            await deletePost(article.id, token);
            toast.success("Article deleted successfully");
            window.location.href = '/articles';
        } catch (error) {
            toast.error("Failed to delete the article ! Try again later.");
            console.log(error);
        }
        finally {
            setDeleting(false);
            setOpen(false);
        }
    }

    const handleShareSocial = (social) => {
        const url = encodeURIComponent(window.location.href);
        let shareUrl;

        if (social === 'Facebook') {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        }
        else if (social === 'Twitter') {
            shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        }
        else if (social === 'LinkedIn') {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        }
        else {
            toast.error("Sharing not supported for this platform.");
            return; // Exit early
        }

        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }

    const handleShare = () => {
        const shareData = {
            title: article.title,
            text: `Check out this article: ${article.title}`,
            url: window.location.href
        };
        try {
            if (navigator.canShare && navigator.canShare(shareData)) {
                navigator.share(shareData);
            } else {
                toast.error("Sharing not supported on this browser.");
            }
        } catch (error) {
            toast.error("Failed to share the article ! Contact support.");
            console.log(error);
        }
    }

    const handleLike = async () => {
        if (!user) {
            toast.error("You need to be logged in to like articles !");
            return;
        }
        setIsLiked(!isLiked)
        try {
            const token = await getToken();
            await updatePostLikes(article.id, { userId: user.id }, token);
        } catch (error) {
            toast.error("Failed to update like status. Please try again.");
            console.log(error);
        }
    }

    const handleBookmark = async () => {
        if (!user) {
            toast.error("You need to be logged in to bookmark articles !");
            return;
        }
        setIsBookmarked(!isBookmarked)
        try {
            const token = await getToken();
            await updatePostBookmarks(article.id, { userId: user.id }, token);
        } catch (error) {
            toast.error("Failed to update bookmark status. Please try again.");
            console.log(error);
        }
    }

    const handleDownload = async () => {
        try {
            dispatch(setCurrentArticle(article));
            navigate('/test/article-pdf');
        } catch (error) {
            console.log("Error downloading blog:", error);
            toast.error("Some error occured!")
        }
    };

    const handleListen = () => {
        const speechSynthesis = window.speechSynthesis;
        if (!speechSynthesis) {
            toast.error('Audio reading is not supported by this browser.');
            return;
        }

        if (speechStatus === 'speaking') {
            speechSynthesis.pause();
            setSpeechStatus('paused');
            return;
        }

        if (speechStatus === 'paused') {
            speechSynthesis.resume();
            setSpeechStatus('speaking');
            return;
        }

        const body = articleBodyRef.current?.cloneNode(true);
        body?.querySelectorAll('button, svg, script, style').forEach((element) => element.remove());
        const articleText = [article.title, body?.innerText || body?.textContent]
            .filter(Boolean)
            .join('. ')
            .replace(/\s+/g, ' ')
            .trim();
        const utterance = `Welcome to Kenshi Webspace, from Momo! ${articleText} Thanks for listening, meowww!!`;

        // if (!chunks.length) {
        //     toast.error('There is no article text to read.');
        //     return;
        // }

        const voices = speechSynthesis.getVoices();
        const femaleVoicePattern = /female|woman|zira|samantha|victoria|karen|moira|tessa|fiona|susan|ava|aria|jenny|michelle|libby|natasha|sonia|catherine|serena/i;
        const preferredVoice = voices.find((voice) => femaleVoicePattern.test(`${voice.name} ${voice.voiceURI}`))
            || voices.find((voice) => voice.lang.toLowerCase().startsWith(navigator.language.split('-')[0].toLowerCase()))
            || voices[0];

        if (!voices.some((voice) => femaleVoicePattern.test(`${voice.name} ${voice.voiceURI}`))) {
            toast('No identifiable female voice is installed; using the browser default voice.');
        }

        speechSynthesis.cancel();
        const session = speechSessionRef.current + 1;
        speechSessionRef.current = session;
        setSpeechStatus('speaking');

        const utter = new SpeechSynthesisUtterance(utterance);
        if (preferredVoice) utter.voice = preferredVoice;
        speechSynthesis.speak(utter);
        // chunks.forEach((chunk, index) => {
        //     const utterance = new SpeechSynthesisUtterance(chunk);
        //     if (preferredVoice) utterance.voice = preferredVoice;
        //     if (index === chunks.length - 1) {
        //         utterance.onend = () => {
        //             if (speechSessionRef.current === session) setSpeechStatus('idle');
        //         };
        //     }
        //     utterance.onerror = () => {
        //         if (speechSessionRef.current === session) {
        //             speechSessionRef.current += 1;
        //             speechSynthesis.cancel();
        //             setSpeechStatus('idle');
        //         }
        //     };
        //     speechSynthesis.speak(utterance);
        // });
    };

    const handleStopListening = () => {
        speechSessionRef.current += 1;
        window.speechSynthesis?.cancel();
        setSpeechStatus('idle');
    };

    // main render
    return (
        <>
            {/* Reading Progress Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                id="non-printable"
                className="fixed top-20 right-4 sm:right-6 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-white shadow-lg"
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-[caret-blink_3s_ease-in-out_infinite]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.span
                        style={{
                            opacity: scrollYProgress.get() > 0 ? 1 : 0.5
                        }}
                    >
                        {Math.round(progress)}%
                    </motion.span>
                </div>
            </motion.div>

            {/* Fixed Floating Action Buttons - Single Instance */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed right-6 top-1/2 -translate-y-1/2 z-40 p-1 flex flex-col gap-3"
                id="non-printable"
            >
                {/* Circular progress ring around like button */}
                <div className="relative">
                    <svg className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none z-10" viewBox="0 0 48 48">
                        <circle
                            cx="24"
                            cy="24"
                            r="24"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                        <motion.circle
                            cx="24"
                            cy="24"
                            r="24"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            style={{ pathLength: scrollYProgress }}
                            transition={{ duration: 0.1 }}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="50%" stopColor="#ec4899" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLike}
                        className={`cursor-pointer relative p-3 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 ${isLiked ? 'bg-red-500/80 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                    >
                        <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                    </motion.button>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookmark}
                    className={`cursor-pointer p-3 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 ${isBookmarked ? 'bg-yellow-500/80 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                >
                    <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="cursor-pointer p-3 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-lg border border-white/20 transition-all duration-300"
                >
                    <Share2 size={20} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    // disabled={loading}
                    onClick={handleDownload}
                    className="cursor-pointer p-3 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-lg border border-white/20 transition-all duration-300 disabled:opacity-50"
                >
                    <DownloadIcon size={20} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAiChatOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-fuchsia-300/30 bg-fuchsia-500/20 p-3 text-fuchsia-100 backdrop-blur-lg transition-all duration-300 hover:bg-fuchsia-500/40 lg:hidden"
                    aria-label="Open AI chat"
                >
                    <MessageCircle size={20} />
                </motion.button>
            </motion.div>

            <Dialog open={isAiChatOpen} onOpenChange={setIsAiChatOpen}>
                <DialogContent className="h-[min(80vh,48rem)] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border-white/10 bg-slate-950 p-0 text-white shadow-2xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>AI insights and article chat</DialogTitle>
                    </DialogHeader>
                    <AIInsightsPanel article={article} mobile />
                </DialogContent>
            </Dialog>

            <ArticleDiagramDialog article={article} open={isDiagramOpen} onOpenChange={setIsDiagramOpen} />

            <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-purple-700 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-950 relative">
                <div className="relative z-10 min-h-screen px-6 pb-4 pt-20 lg:px-16">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
                            <div ref={articleScrollRef} className={`${addScrollBar ? `` : `hide-scrollbar`} custom-scrollbar-white min-w-0 overflow-y-auto pr-2 scroll-smooth h-[calc(100vh+4rem)]`}>
                                {/* Enhanced Cover with Parallax */}
                                <motion.div
                                    variants={itemVariants}
                                    style={{ opacity, scale, y }}
                                    whileHover={{
                                        z: 20
                                    }}
                                    className="no-pdf relative mb-12 h-[calc(15vh)] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl dark:shadow-2xs dark:shadow-indigo-300/50 sm:h-[calc(20vh)] md:h-[calc(40vh)] aspect-video"
                                >
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-10 hover:opacity-0 transition-opacity delay-300 duration-500" />

                                    <svg
                                        className="absolute inset-0 w-full h-full z-30 pointer-events-none"
                                    >
                                        <motion.rect
                                            x="2"
                                            y="2"
                                            width="calc(100% - 4px)"
                                            height="calc(100% - 4px)"
                                            rx="24"
                                            fill="none"
                                            stroke="#a855f7"
                                            strokeWidth="3"
                                            strokeDasharray="200 3000"
                                            style={{
                                                filter: "drop-shadow(0 0 12px #a855f7)",
                                            }}
                                            whileInView={{
                                                strokeDashoffset: [0, -3080],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                    </svg>

                                    <motion.img
                                        src={(!article.coverImage) || article.coverImage.trim() === '' ? '/placeholder.png' : article.coverImage}
                                        onError={(e) => {
                                            e.target.onerror = null;//prevent loop if placeholder fails
                                            e.target.src = '/placeholder.png';
                                        }}
                                        alt="Cover"
                                        className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/*Cover - Article title and author overlay */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="absolute inset-0 z-20"
                                    >

                                        <div className="absolute top-6 left-6 mr-6" >
                                            {/* article title */}
                                            <h1 className="text-sm sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white line-clamp-4 sm:p-1 md:p-2">{article.title}</h1>

                                            {/* article author */}
                                            <motion.div
                                                className="text-[0.5rem] sm:text-xs md:text-xl font-stretch-extra-condensed italic text-white/50 mt-2 line-clamp-1"
                                                whileHover={{
                                                    color: '#a855f7',
                                                }}
                                                transition={{ delay: 0.2, duration: 0.3 }}
                                            >
                                                - by {article.author.firstName} {article.author.lastName}
                                            </motion.div>

                                        </div>
                                    </motion.div>

                                    {/* article badge */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="absolute bottom-6 left-6 z-20"
                                    >
                                        {article.featured && <Badge className="bg-indigo-500/80 text-white border-0 backdrop-blur-sm text-[0.5rem] md:text-xs px-2 py-0.5 md:px-2 md:py-1">
                                            Featured
                                        </Badge>}
                                    </motion.div>
                                </motion.div>

                                <Card className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/30 bg-purple-300/40 shadow-xl backdrop-blur-xl dark:bg-white/20 dark:shadow-xs dark:shadow-indigo-300/50">
                                    <CardContent id="print-area" className="relative p-4 sm:p-10 space-y-8">
                                        {/* Header */}
                                        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Badge
                                                    variant="outline"
                                                    className="text-white border-indigo-200/60 bg-indigo-500/60 backdrop-blur-sm px-4 py-2 text-sm font-medium"
                                                >
                                                    {article.category}
                                                </Badge>
                                            </motion.div>

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-4 text-xs sm:text-sm text-gray-300">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Clock size={16} className="text-indigo-300" />
                                                    <span className='hidden [@media(min-width:422px)]:block'>{formatMessageTime(article.updatedAt)}</span>
                                                    {/* <span className='block [@media(min-width:422px)]:hidden'>{formatDate(article.updatedAt)}</span> */}
                                                    <span className='block [@media(min-width:422px)]:hidden'>{formatOnlyNumericDate(article.updatedAt)}</span>
                                                </motion.div>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Eye size={16} className="text-indigo-300" />
                                                    <span>{article.readTime} min read</span>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Delete, scroll, listen , diagram and Edit Button */}
                                        <motion.div variants={itemVariants} id="non-printable" className="flex w-full">
                                            <div className="flex w-full flex-wrap items-center gap-2">
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2, duration: 0.2 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setAddScrollBar(!addScrollBar)}
                                                        className="flex items-center gap-2 border-indigo-200/60 bg-indigo-500/60 dark:bg-indigo-500/60 hover:bg-indigo-500/30 hover:border-indigo-200/50 text-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
                                                    >
                                                        <ScrollText size={16} />
                                                    </Button>
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2, duration: 0.2 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleListen}
                                                        aria-label={speechStatus === 'speaking' ? 'Pause article audio' : speechStatus === 'paused' ? 'Resume article audio' : 'Listen to the whole article'}
                                                        className="flex items-center gap-2 border-emerald-200/60 bg-emerald-500/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-emerald-500/30 cursor-pointer"
                                                    >
                                                        {speechStatus === 'speaking' ? <Pause size={16} /> : <Volume2 size={16} />}
                                                    </Button>
                                                </motion.div>


                                                {speechStatus !== 'idle' && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.2, duration: 0.2 }}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={handleStopListening}
                                                            aria-label="Stop article audio"
                                                            title="Stop reading"
                                                            className="border-rose-200/60 bg-rose-500/40 text-white hover:bg-rose-500/30 cursor-pointer"
                                                        >
                                                            <Square size={14} />
                                                        </Button>
                                                    </motion.div>
                                                )}

                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2, duration: 0.2 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setIsDiagramOpen(true)}
                                                        className="flex items-center gap-2 border-fuchsia-200/60 bg-fuchsia-500/60 text-white backdrop-blur-sm transition-all duration-300 hover:border-fuchsia-200/50 hover:bg-fuchsia-500/30 cursor-pointer"
                                                    >
                                                        <Workflow size={16} />
                                                    </Button>
                                                </motion.div>
                                            </div>


                                            {user && (user.id === article.authorId) &&
                                                <div className='flex w-full [@media(min-width:400px)]:justify-end gap-2 sm:gap-4'>
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.2, duration: 0.2 }}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setOpen(true)}
                                                            className="flex items-center gap-2 border-indigo-200/60 bg-indigo-500/60 dark:bg-indigo-500/60 hover:bg-indigo-500/30 hover:border-indigo-200/50 text-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
                                                        >
                                                            <Trash size={16} />
                                                            <span className="hidden [@media(min-width:400px)]:inline">Delete</span>
                                                        </Button>
                                                    </motion.div>


                                                    <Dialog open={open} onOpenChange={setOpen}>
                                                        <DialogContent className="max-w-md w-full sm:mx-4 rounded-2xl shadow-xl border border-white/10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-0 overflow-hidden">
                                                            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.2, ease: "easeOut" }}>
                                                                <div className="px-6 pt-6 pb-4 border-b border-white/10">
                                                                    <DialogHeader>
                                                                        <DialogTitle className="text-xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                                                            Are you sure you want to delete?
                                                                        </DialogTitle>
                                                                    </DialogHeader>
                                                                    <p className="text-sm text-gray-300 mt-1">This action cannot be undone. Do you want to proceed?</p>
                                                                </div>

                                                                <DialogFooter className="px-6 py-4 flex-row items-center justify-end gap-3 bg-gray-800/40">
                                                                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={deleting} className="hover:bg-gray-700/50 text-gray-300">No, thanks</Button>

                                                                    <Button onClick={handleDelete} disabled={deleting} className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white shadow-md">
                                                                        {deleting ? "Deleting…" : "Yes, delete it"}
                                                                    </Button>

                                                                </DialogFooter>
                                                            </motion.div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Link to={`/articles/edit/${article.id}`}>
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.2, duration: 0.2 }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex items-center gap-2 border-indigo-200/60 bg-indigo-500/60 dark:bg-indigo-500/60 hover:bg-indigo-500/30 hover:border-indigo-200/50 text-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
                                                            >
                                                                <Pencil size={16} />
                                                                <span className="hidden [@media(min-width:400px)]:inline">Edit</span>
                                                            </Button>
                                                        </motion.div>
                                                    </Link>
                                                </div>}
                                        </motion.div>

                                        {/* Author Section */}
                                        <motion.div variants={itemVariants} className="flex items-center space-x-4">
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Avatar className="ring-2 ring-white/30 ring-offset-2 ring-offset-transparent">
                                                    <AvatarImage src={article.authorImage} />
                                                    <AvatarFallback className="bg-indigo-500 text-white">
                                                        {article.author.firstName.charAt(0)}{article.author.lastName.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.7, duration: 0.5 }}
                                            >
                                                <p className="text-base text-gray-200 line-clamp-2">
                                                    By <span className="font-medium text-white hover:text-indigo-200 transition-colors duration-200 cursor-pointer">
                                                        {article.author.firstName} {article.author.lastName}
                                                    </span>
                                                </p>
                                                <p className="text-sm text-gray-300">{article.author.tagline || 'Some wild author !'}</p>
                                            </motion.div>
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <Separator className="my-6 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                        </motion.div>

                                        {/* Content with Scroll Animations */}
                                        <motion.div
                                            variants={itemVariants}
                                            ref={articleBodyRef}
                                            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-black prose-p:text-gray-50 prose-strong:text-white prose-code:text-indigo-200 prose-code:bg-indigo-900/30 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-white/10 break-words hyphens-auto"
                                        >
                                            <MarkdownRenderer content={article.content} />
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <Separator className="my-8 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                        </motion.div>

                                        {/* Enhanced Share Section */}
                                        <motion.div id="non-printable" variants={itemVariants} className="space-y-6">
                                            <motion.h3
                                                className="text-xl font-semibold text-white text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1, duration: 0.5 }}
                                            >
                                                Share this article
                                            </motion.h3>

                                            <div className="flex justify-center space-x-4">
                                                {[
                                                    { icon: <Twitter size={20} />, url: '#', label: 'Twitter', color: 'hover:bg-blue-500/80' },
                                                    { icon: <Facebook size={20} />, url: '#', label: 'Facebook', color: 'hover:bg-blue-600/80' },
                                                    { icon: <Linkedin size={20} />, url: '#', label: 'LinkedIn', color: 'hover:bg-blue-700/80' }
                                                ].map((social, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                                                        whileHover={{ scale: 1.1, y: -2 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            asChild
                                                            onClick={() => handleShareSocial(social.label)}
                                                            className={`bg-white/10 border-white/20 text-white backdrop-blur-sm transition-all duration-300 ${social.color} hover:border-white/40 hover:shadow-lg hover:shadow-white/10 cursor-pointer`}
                                                        >
                                                            <div>
                                                                {social.icon}
                                                            </div>
                                                        </Button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                </Card>

                                {/* Enhanced Related Articles Section */}
                                <motion.div
                                    variants={itemVariants}
                                    className="max-w-5xl mx-auto mt-16"
                                    id="non-printable"
                                >
                                    <motion.h2
                                        className="text-3xl font-bold text-white mb-8 text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5, duration: 0.6 }}
                                    >
                                        Related Articles
                                    </motion.h2>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {related.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 1.0 + index * 0.2, duration: 0.6 }}
                                                whileHover={{ y: -8, scale: 1.02 }}
                                                className="group"
                                            >
                                                <Card className="bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/15 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden">
                                                    <CardContent className="p-6 space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-200 border-0">
                                                                {item.category}
                                                            </Badge>
                                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                                <Clock size={12} />
                                                                {item.readTime}
                                                            </span>
                                                        </div>

                                                        <motion.h3
                                                            className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors duration-200"
                                                            whileHover={{ x: 5 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                        >
                                                            {item.title}
                                                        </motion.h3>

                                                        <motion.div
                                                            className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:w-full transition-all duration-300"
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Enhanced Comments Section Placeholder */}
                                <motion.div
                                    variants={itemVariants}
                                    className="max-w-5xl mx-auto mt-16"
                                    id="non-printable"
                                >
                                    <Card className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl overflow-hidden">
                                        <CardContent className="p-8">
                                            <motion.h3
                                                className="text-2xl font-bold text-white mb-6 text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 2.2, duration: 0.6 }}
                                            >
                                                Join the Discussion
                                            </motion.h3>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 2.4, duration: 0.6 }}
                                                className="text-center py-12 border-2 border-dashed border-white/20 rounded-2xl bg-white/5"
                                            >
                                                <motion.p
                                                    className="text-gray-300 text-lg"
                                                    animate={{ opacity: [0.7, 1, 0.7] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    Comments section coming soon...
                                                </motion.p>
                                                <p className="text-gray-400 text-sm mt-2">
                                                    Share your thoughts and connect with other readers
                                                </p>
                                            </motion.div>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                            </div>

                            <div className="hidden min-w-0 lg:block">
                                <AIInsightsPanel article={article} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div >
        </>
    );
}