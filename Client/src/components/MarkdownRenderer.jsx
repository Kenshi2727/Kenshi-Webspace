import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const mdComponents = {
    h1: ({ node, ...props }) => <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2 mb-4 text-white" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-4 mb-3 text-white" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-3 mb-2 text-white" {...props} />,
    p: ({ node, ...props }) => <p className="text-gray-200 leading-relaxed mb-4" {...props} />,
    a: ({ node, ...props }) => <a className="text-indigo-300 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />,
    li: ({ node, ...props }) => <li className="text-gray-200" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-400 pl-4 italic text-gray-200 my-4" {...props} />,
    img: ({ node, ...props }) => (
        <figure className="my-4">
            <img className="mx-auto rounded-lg shadow-sm max-h-[420px] object-contain" {...props} />
            {props.alt && <figcaption className="text-sm text-gray-400 text-center mt-2">{props.alt}</figcaption>}
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
    pre: ({ node, children, ...props }) => <pre className="rounded-lg bg-[#0b1220] p-4 overflow-auto text-sm" {...props}>{children}</pre>,
};

export default function MarkdownRenderer({ content = '' }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={mdComponents}
        >
            {content}
        </ReactMarkdown>
    );
}
