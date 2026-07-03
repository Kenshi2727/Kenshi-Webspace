import { React, useState } from 'react'
import html2pdf from 'html2pdf.js';
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
import { testArticle } from '../seeds/blogs.seed.js';
import MarkdownRenderer from './MarkdownRenderer';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { VerifiedIcon } from 'lucide-react';
import './comp-stylesheets/pdf.css';

const article = testArticle;
const content = article.content;

const pdfComponents = {
    h1: ({ node, ...props }) => <h1 className="pdf-title" {...props} />,
    h2: ({ node, ...props }) => <h2 className="pdf-heading-2" {...props} />,
    h3: ({ node, ...props }) => <h3 className="pdf-heading-3" {...props} />,
    h4: ({ node, ...props }) => <h4 className="pdf-heading-4" {...props} />,
    h5: ({ node, ...props }) => <h5 className="pdf-heading-5" {...props} />,
    h6: ({ node, ...props }) => <h6 className="pdf-heading-6" {...props} />,
    p: ({ node, ...props }) => <p className="pdf-paragraph" {...props} />,
    a: ({ node, href, ...props }) => {
        const isExternal = href && !href.startsWith("#") && !href.startsWith("/");

        return (
            <a
                className="pdf-link"
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
            />
        )
    },
    ul: ({ node, ...props }) => <ul className="pdf-list" {...props} />,
    ol: ({ node, ...props }) => <ol className="pdf-list pdf-ordered-list" {...props} />,
    li: ({ node, ...props }) => <li className="pdf-list-item" {...props} />,
    strong: ({ node, ...props }) => <strong className="pdf-strong" {...props} />,
    em: ({ node, ...props }) => <em className="pdf-emphasis" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="pdf-blockquote" {...props} />,
    img: ({ node, ...props }) => (
        <figure className="pdf-figure">
            <img className="pdf-image" {...props} />
            {props.alt && (
                <figcaption className="pdf-figcaption">
                    <span className="pdf-figcaption-label">Fig. </span>
                    {props.alt}
                </figcaption>
            )}
        </figure>
    ),
    table: ({ node, ...props }) => (
        <div className="pdf-table-container">
            <table className="pdf-table" {...props} />
        </div>
    ),
    th: ({ node, ...props }) => <th className="pdf-table-heading" {...props} />,
    td: ({ node, ...props }) => <td className="pdf-table-cell" {...props} />,
    code: ({ inline, className, children, ...props }) => {
        if (inline) {
            return <code className="pdf-inline-code" {...props}>{children}</code>;
        }

        return (
            <pre className="pdf-code-block">
                <code className={className} {...props}>{children}</code>
            </pre>
        );
    },
    pre: ({ node, children, ...props }) => (
        <div className="pdf-code-block" {...props}>{children}</div>
    ),
    danger: ({ children }) => (
        <div className="pdf-callout pdf-callout-danger">❗{children}</div>
    ),
    info: ({ children }) => (
        <div className="pdf-callout pdf-callout-info">💡{children}</div>
    ),
    note: ({ children }) => (
        <div className="pdf-callout pdf-callout-note">📝 {children}</div>
    ),
    like: ({ children }) => (
        <div className="pdf-callout pdf-callout-like">🩷 {children}</div>
    ),
    warn: ({ children }) => (
        <div className="pdf-callout pdf-callout-warn">⚠️ {children}</div>
    ),
    success: ({ children }) => (
        <div className="pdf-callout pdf-callout-success">✅ {children}</div>
    ),
    tip: ({ children }) => (
        <div className="pdf-callout pdf-callout-tip">💡 {children}</div>
    ),
    todo: ({ children }) => (
        <div className="pdf-todo">
            <div className="pdf-todo-title">📋 To-Do:</div>
            <div className="pdf-todo-items">{children}</div>
        </div>
    ),
    quote: ({ children }) => (
        <div className="pdf-quote">{children}</div>
    ),
};


const PdfArticle = () => (
    <div id="print-area" className="pdf-page">
        <div className="pdf-header">
            <div className="pdf-branding">
                {/* <img src="/logo.png" alt="Kenshi Webspace" className="pdf-logo" /> */}
                <div>
                    <img src="/logo.png" alt="Kenshi Webspace" className="pdf-logo" />
                    {/* <div className="pdf-brand-name">Kenshi Webspace</div> */}
                    {/* <div className="pdf-brand-tagline">A friendly space for creators — tutorials, projects, and occasional travel notes.</div> */}
                </div>
            </div>
            <div className="pdf-header-details">
                <span>{article.category || 'Web Development'}</span>
                <span>{article.date || 'Unknown date'}</span>
                <span>{article.readTime || 'N/A'} minutes</span>
            </div>
        </div>

        <h1 className="pdf-title">{article.title}</h1>
        <p className="pdf-subtitle">{article.excerpt}</p>

        <div className="pdf-author-block">
            <div>
                <div className="pdf-author-label">Author</div>
                <div className="pdf-author-name">{article.author || 'Some wild coyote!'}</div>
            </div>
            <div className="pdf-header-details">
                <span className="pdf-pill">{article.category || 'Miscellaneous'}</span>
                <span className="pdf-pill"><VerifiedIcon />Verified</span>
            </div>
        </div>

        <div className="pdf-divider" />

        <MarkdownRenderer content={content} components={pdfComponents} />

        <div
            className="pdf-footer"
            style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 35%, #a855f7 70%, #d8b4fe 100%)',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: '28px',
                boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)',
                gap: '1.4rem'
            }}
        >
            <div style={{ maxWidth: '680px', width: '100%' }}>
                <div style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    marginBottom: '18px',
                    color: 'rgba(255,255,255,0.96)'
                }}>
                    Thank You
                </div>
                <p style={{
                    fontSize: '1.25rem',
                    lineHeight: 1.6,
                    opacity: 0.94,
                    margin: '0 auto',
                    maxWidth: '560px'
                }}>
                    Your curiosity and support keep Kenshi Webspace alive. We appreciate your time spent
                    exploring this article — may it inspire your next creative project.
                </p>
            </div>

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '2.5rem'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '540px',
                    padding: '1.4rem 1.6rem',
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{
                        fontSize: '0.9rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.72)',
                        marginBottom: '0.6rem'
                    }}>
                        Keep creating
                    </div>
                    <div style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.5,
                        fontWeight: 600,
                        color: '#f8f7ff'
                    }}>
                        Visit kenshi.dev for bold tutorials, polished projects, and fresh design ideas.
                    </div>
                </div>

                <a
                    href="https://kenshi.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.95rem 1.8rem',
                        borderRadius: '999px',
                        background: '#ffffff',
                        color: '#5b21b6',
                        fontWeight: 700,
                        fontSize: '1rem',
                        textDecoration: 'none',
                        boxShadow: '0 18px 40px rgba(124, 58, 237, 0.18)'
                    }}
                >
                    Explore Kenshi Webspace
                </a>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
                marginTop: '3rem',
                opacity: 0.88
            }}>
                <span style={{ fontSize: '0.95rem' }}>© {new Date().getFullYear()} Kenshi Webspace</span>
                <span style={{ fontSize: '0.95rem' }}>Made with passion for creators and curious minds.</span>
            </div>
        </div>
    </div>
);

const ArticlePDF = () => {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = () => {
        if (downloading) return;

        setDownloading(true);
        const element = document.getElementById('print-area');
        const opt = {
            margin: [0.1, 0.1, 0.1, 0.1], // top, right, bottom, left
            filename: 'article.pdf',
            image: { type: 'jpeg', quality: 1 },
            enableLinks: true,
            pagebreak: {
                mode: ['css', 'legacy'],
                before: ['.pdf-footer'],
                avoid: [
                    'img',
                    'table',
                    'pre',
                    'code',
                    'blockquote',
                    '.pdf-header',
                    '.pdf-author-block',
                    '.pdf-divider',
                    '.pdf-table-container',
                    '.pdf-figure',
                    '.pdf-callout',
                    '.pdf-todo',
                    '.pdf-quote'
                ]
            },
            html2canvas: {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                logging: false,
                scrollX: 0,
                scrollY: -window.scrollY
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait',
                putOnlyUsedFonts: true
            },
        };

        html2pdf().from(element).set(opt).save().finally(() => {
            setDownloading(false);
        });
    };

    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600" style={{ padding: '20px' }}>


            <motion.div>
                <Button
                    className="px-6 py-3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                    onClick={handleDownload}
                    disabled={downloading}
                >
                    {downloading ? 'Downloading...' : 'Download PDF'}
                </Button>
            </motion.div>

            <PdfArticle />

        </div>
    );
};

export default ArticlePDF;