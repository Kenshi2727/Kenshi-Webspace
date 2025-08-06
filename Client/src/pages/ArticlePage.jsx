import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { featuredPosts } from '../seeds/blogs.seed';

// const featuredPosts = {
//     title: 'Exploring the Future of Web Development',
//     author: 'Kenshi',
//     authorImg: 'https://i.pravatar.cc/150?u=kenshi',
//     date: 'August 6, 2025',
//     category: 'Web Dev',
//     coverImg: 'https://placehold.co/1200x400?text=Article+Cover',
//     content: `Web development continues to evolve at a rapid pace...` // long content
// };

const related = [
    { id: 2, title: 'Mastering Tailwind CSS' },
    { id: 3, title: 'React Hooks in Depth' },
    { id: 4, title: 'Building Accessible UIs' }
];

export default function ArticlePage() {
    const { id } = useParams();
    const [readingTime, setReadingTime] = useState(0);
    const { scrollYProgress } = useViewportScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const article = featuredPosts.find(a => a.id === parseInt(id));

    useEffect(() => {
        if (article?.content) {
            const words = article.content.split(' ').length;
            setReadingTime(Math.ceil(words / 200));
        }
    }, [article]);

    if (!article) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-3xl font-bold">Article not found</h1>
            </div>
        );
    }

    return (
        <>
            <motion.div style={{ scaleX }} className="origin-left fixed top-0 left-0 h-1 bg-indigo-400 z-50" />

            <div className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 py-16 px-6 lg:px-16">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

                    {/* Cover Image */}
                    <div className="max-w-5xl mx-auto mb-8 overflow-hidden rounded-3xl shadow-2xl">
                        <img src={article.coverImg} alt="Cover" className="w-full object-cover" />
                    </div>

                    <Card className="max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/20 border border-white/30 backdrop-blur-lg">
                        <CardContent className="p-10 space-y-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <Badge variant="outline" className="text-indigo-200 border-indigo-200">
                                    {article.category}
                                </Badge>
                                <span className="text-sm text-gray-200">
                                    {article.date} · {readingTime} min read
                                </span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg">
                                {article.title}
                            </h1>

                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src={article.authorImg} />
                                    <AvatarFallback>{article.author}</AvatarFallback>
                                </Avatar>
                                <p className="text-base text-gray-200">
                                    By <span className="font-medium text-white">{article.author}</span>
                                </p>
                            </div>

                            <Separator className="my-4 bg-white/30" />

                            <p className="text-lg leading-relaxed text-gray-100 whitespace-pre-wrap">
                                {article.content}
                            </p>

                            <Separator className="my-6 bg-white/30" />

                            {/* Share Buttons */}
                            <div className="flex justify-center space-x-6">
                                {[
                                    { icon: <Twitter size={22} className='text-black' />, url: '#', label: 'Twitter' },
                                    { icon: <Facebook size={22} className='text-black' />, url: '#', label: 'Facebook' },
                                    { icon: <Linkedin size={22} className='text-black' />, url: '#', label: 'LinkedIn' }
                                ].map((s, i) => (
                                    <Button key={i} variant="outline" size="icon" asChild className="text-gray-200 hover:bg-indigo-500/40">
                                        <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`}> {s.icon} </a>
                                    </Button>
                                ))}
                            </div>

                        </CardContent>
                    </Card>

                    {/* Related Articles */}
                    <div className="max-w-5xl mx-auto mt-16">
                        <h2 className="text-2xl font-semibold text-white mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map(a => (
                                <motion.div key={a.id} whileHover={{ scale: 1.03 }} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg">
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-white mb-2">{a.title}</h3>
                                        <Link to={`/articles/${a.id}`} className="text-indigo-200 hover:underline text-sm">
                                            Read more →
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Comments Placeholder */}
                    <div className="max-w-5xl mx-auto mt-16 pb-16">
                        <h2 className="text-2xl font-semibold text-white mb-4">Comments</h2>
                        <p className="text-gray-300 italic">Comments will appear here.</p>
                    </div>

                </motion.div>
            </div>
        </>
    );
}
