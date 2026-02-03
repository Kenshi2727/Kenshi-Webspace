import React from 'react';
import { useEffect, useState, useRef } from 'react';
import mediumZoom from 'medium-zoom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex'
import remarkBreaks from 'remark-breaks';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify'
import emoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import remarkSmartypants from "remark-smartypants";
import remarkDirective from "remark-directive";
import remarkToc from 'remark-toc'
import toast from 'react-hot-toast';

// import 'highlight.js/styles/github-dark.css';
// import 'highlight.js/styles/rose-pine-moon.css';
import 'highlight.js/styles/tokyo-night-dark.css';
import { Check, CopyIcon } from 'lucide-react';

export default function MarkdownRenderer({ content = '' }) {
    const mdRef = useRef(null);

    useEffect(() => {
        if (!mdRef.current) return;

        // zoom only images inside markdown renderer
        const zoom = mediumZoom(mdRef.current.querySelectorAll("img"));

        return () => zoom.detach();
    }, [content]);

    function CodeBlock({ children, ...props }) {
        const [copied, setCopied] = useState(false);

        useEffect(() => {
            let t;
            if (copied) t = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(t);
        }, [copied]);

        const handleCopy = async (children) => {
            try {
                // Flatten children to a string for copying
                const code = extractText(children);
                console.log(children.props.children)
                await navigator.clipboard.writeText(code);
                toast.success("Copied !");
                setCopied(true);
            } catch (err) {
                console.error('Error copying !', err);
            }
        }

        return (
            <div className="relative my-2">
                <pre className="rounded-lg bg-[#191724]/10 my-2 text-indigo-200 p-2 md:p-4 overflow-auto text-sm" {...props}>{children}</pre>
                <button
                    onClick={() => handleCopy(children)}
                    aria-label={copied ? 'Copied' : 'Copy code'}
                    type="button"
                    className="absolute right-2 top-2 inline-flex items-center gap-2 rounded px-2 py-1 bg-white/6 hover:bg-white/10 text-sm text-white transition cursor-pointer"
                >
                    {copied ? <Check size={16} /> : <CopyIcon size={16} />}
                </button>
            </div>
        )
    }

    // recursive extraction of children
    function extractText(children) {
        if (typeof children === 'string') return children;
        //child => extractText(child) is same as extractText since there is one arguement
        if (Array.isArray(children)) return children.map(extractText).join('');
        if (children?.props?.children) return extractText(children.props.children);
        return '';
    }

    const mdComponents = {
        h1: ({ node, ...props }) => <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mt-2 mb-4 text-white" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold mt-4 mb-3 text-white" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold mt-3 mb-2 text-white" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-base md:text-xl font-medium mt-3 mb-2 text-white" {...props} />,
        h5: ({ node, ...props }) => <h5 className="text-sm md:text-lg font-medium mt-2 mb-1 text-white" {...props} />,
        h6: ({ node, ...props }) => <h6 className="text-sm md:text-base font-medium mt-2 mb-1 text-white" {...props} />,
        p: ({ node, ...props }) => <p className="text-gray-200 leading-relaxed mb-4" {...props} />,
        a: ({ node, href, ...props }) => {
            const isExternal = href && !href.startsWith("#") && !href.startsWith("/");

            return (
                <a className="text-indigo-300 hover:underline cursor-pointer"
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    {...props}
                />
            )
        },
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="text-gray-200" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
        em: ({ node, ...props }) => <em className="italic text-gray-200" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-200 my-4" {...props} />,
        img: ({ node, ...props }) => (
            <figure className="my-4">
                <img className="mx-auto rounded-lg shadow-sm max-h-[420px] object-contain" {...props} />
                {props.alt && <figcaption className="text-sm text-gray-200 text-center mt-2"><span className='font-bold'>Fig. </span>{props.alt}</figcaption>}
            </figure>
        ),
        table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
                <table className="w-full table-auto border-collapse" {...props} />
            </div>
        ),
        th: ({ node, ...props }) => <th className="px-3 py-2 bg-white/5 text-left text-sm font-semibold text-white border-b border-white/10" {...props} />,
        td: ({ node, ...props }) => <td className="px-3 py-2 text-sm text-gray-200 border-b border-white/10" {...props} />,
        code: ({ inline, className, children, ...props }) => {
            if (inline) {
                return <code className="bg-white/10 text-indigo-200 rounded px-1 py-[0.06rem] text-sm" {...props}>{children}</code>;
            }
            return <code className={className} {...props}>{children}</code>;
        },
        pre: ({ node, children, ...props }) => {
            return <CodeBlock children={children} {...props} />
        },

        // custom elemnts
        danger: ({ children }) => (
            <div className="bg-red-500/20 text-red-300 p-2 rounded w-fit">
                ❗{children}
            </div>
        ),

        info: ({ children }) => (
            <div className="bg-yellow-300/50 p-2 rounded w-fit">
                💡{children}
            </div>
        ),

        note: ({ children }) => (
            <div className="bg-blue-500/20 text-blue-300 p-2 rounded w-fit">
                📝 {children}
            </div>
        ),

        like: ({ children }) => (
            <div className="bg-pink-500/20 text-pink-300 p-2 rounded w-fit">
                🩷 {children}
            </div>
        ),
        warn: ({ children }) => (
            <div className="bg-orange-500/20 text-orange-300 p-2 rounded w-fit">
                ⚠️ {children}
            </div>
        ),
        success: ({ children }) => (
            <div className="bg-green-500/20 text-green-300 p-2 rounded w-fit">
                ✅ {children}
            </div>
        ),
        tip: ({ children }) => (
            <div className="bg-teal-500/20 text-teal-300 p-2 rounded w-fit">
                💡 {children}
            </div>
        ),
        todo: ({ children }) => (
            <ul className="bg-purple-500/20 text-purple-300 p-2 space-y-0 rounded w-fit">
                <hr />
                <div className='w-full flex justify-start items-center'>
                    <strong className='text-xl'>📋 To-Do:</strong>
                </div>
                {React.Children.map(children, (child, i) => (
                    <li key={i} className='list-disc ml-6'>
                        {child}
                    </li>
                ))}
                <hr />
            </ul>
        ),

        quote: ({ children }) => (
            <div className="flex gap-2 border-l-4 border-indigo-400 pl-4 italic text-2xl font-bold text-indigo-300/80 my-4">
                <svg
                    className='size-7'
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 320">
                    <path
                        d="M82.87 129.48S77.32 98.96 114.31 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.59 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61zm154.26 0S231.58 98.96 268.57 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.58 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61z"
                        fill="#FFF">
                    </path>
                </svg>
                <span className='mt-4'>{children}</span>
                <svg
                    className="size-7"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 320"
                >
                    <g transform="scale(-1,1) translate(-320,0)">
                        <path
                            d="M82.87 129.48S77.32 98.96 114.31 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.59 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61zm154.26 0S231.58 98.96 268.57 74c-12.95 0-89.7 30.52-89.7 113.74 0 33.09 27.58 59.73 61.01 58.19 29.85-1.37 54.07-25.6 55.44-55.45 1.54-33.41-25.1-61-58.19-61z"
                            fill="#FFF"
                        />
                    </g>
                </svg>

            </div>
        ),
    };

    return (
        <div ref={mdRef} className='text-justify'>
            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                    remarkBreaks,
                    remarkMath,
                    emoji,
                    remarkSmartypants,
                    remarkDirective,
                    [remarkToc, { heading: 'Contents', maxDepth: 3 }]
                ]}
                rehypePlugins={[
                    rehypeRaw,
                    rehypeHighlight,
                    rehypeKatex,
                    rehypeStringify,
                    rehypeSlug,
                ]}
                components={mdComponents}
                mediumZoom={mediumZoom}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
