import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import { Pencil, Eye, Send } from 'lucide-react';

export default function EditorPage() {
    const [markdown, setMarkdown] = useState(`# GitHub Flavored Markdown Example

## Features
- **Bold**, *Italic*, ~~Strikethrough~~
- Task List:
  - [x] Done
  - [ ] Pending

## Table
| Name | Value |
|------|-------|
| One  | 1     |
| Two  | 2     |

## Code Block
\`\`\`js
console.log('Hello, world!');
\`\`\`
`);

    // custom renderers to ensure heading sizes/colors are explicit
    const mdComponents = {
        h1: ({ node, ...props }) => <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4 text-white" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-3 text-white" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-2xl md:text-3xl font-semibold mt-3 mb-2 text-white" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-xl font-medium mt-3 mb-2 text-white" {...props} />,
        h5: ({ node, ...props }) => <h5 className="text-lg font-medium mt-2 mb-1 text-white" {...props} />,
        h6: ({ node, ...props }) => <h6 className="text-base font-medium mt-2 mb-1 text-white" {...props} />,
        p: ({ node, ...props }) => <p className="text-gray-200 leading-relaxed mb-3" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
        em: ({ node, ...props }) => <em className="italic text-gray-200" {...props} />,
        a: ({ node, ...props }) => <a className="text-indigo-300 hover:underline" {...props} />,
        // inline code
        code: ({ inline, className, children, ...props }) => {
            if (inline) {
                return <code className="bg-white/10 px-1 py-[0.08rem] rounded text-sm text-indigo-200" {...props}>{children}</code>;
            }
            // block code handled by pre below (react-markdown gives className to code)
            return <code className={className} {...props}>{children}</code>;
        },
        pre: ({ node, children, ...props }) => (
            <pre className="bg-[#0b1220] rounded-lg p-4 overflow-auto text-sm" {...props}>
                {children}
            </pre>
        ),
        table: ({ node, ...props }) => <table className="w-full text-left border-collapse mb-4" {...props} />,
        th: ({ node, ...props }) => <th className="border-b border-white/10 px-3 py-2 bg-white/5 text-sm text-white" {...props} />,
        td: ({ node, ...props }) => <td className="border-b border-white/10 px-3 py-2 text-sm text-gray-200" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-200 my-3" {...props} />
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-gradient-to-br from-purple-950 to-purple-800 py-16 px-6 lg:px-16"
        >
            <Card className="max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/20 border border-white/30 backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-3xl font-extrabold">
                        <Pencil size={28} /> Write a New Article
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-8 space-y-6">
                    <Tabs defaultValue="write" className="h-full">
                        <TabsList className="mb-4 flex gap-2 bg-white/10 p-1 rounded-xl">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <TabsTrigger value="write" className="flex items-center gap-2">
                                    <Pencil size={18} /> Write
                                </TabsTrigger>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <TabsTrigger value="preview" className="flex items-center gap-2">
                                    <Eye size={18} /> Preview
                                </TabsTrigger>
                            </motion.div>
                        </TabsList>

                        <TabsContent value="write">
                            <Textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                placeholder="Write your markdown content here..."
                                className="min-h-[300px] p-4 font-mono bg-white/5 text-white border-white/20"
                            />
                        </TabsContent>

                        <TabsContent value="preview" className="h-full">
                            <ScrollArea className="h-[400px] max-w-none bg-white/5 p-6 rounded-xl border border-white/20">
                                <div className="px-1">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                                        components={mdComponents}
                                    >
                                        {markdown || '_Nothing to preview_'}
                                    </ReactMarkdown>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>

                    <Separator className="bg-white/30" />

                    <div className="flex justify-end">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center gap-2 transition-transform">
                                            <Send size={18} /> Publish
                                        </Button>
                                    </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Click to publish your article</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
