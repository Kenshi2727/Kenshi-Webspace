/* eslint-disable react/prop-types */
import { useState } from 'react'
import html2pdf from 'html2pdf.js';
import MarkdownRenderer from './MarkdownRenderer';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { VerifiedIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import './comp-stylesheets/pdf.css';

const getAuthorName = (article) => {
    if (article.author?.firstName || article.author?.lastName) {
        return `${article.author?.firstName || ''} ${article.author?.lastName || ''}`.trim();
    }

    if (typeof article.author === 'string') return article.author;

    return 'Kenshi Webspace Author';
};

const getArticleDate = (article) => {
    const date = article.updatedAt || article.createdAt;
    if (!date) return 'Unknown date';

    return new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date));
};

const getPdfFileName = (title) => {
    const fallback = 'article';
    const slug = (title || fallback)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return `${slug || fallback}.pdf`;
};

const pdfComponents = {
    h1: (props) => <h1 className="pdf-title" {...props} />,
    h2: (props) => <h2 className="pdf-heading-2" {...props} />,
    h3: (props) => <h3 className="pdf-heading-3" {...props} />,
    h4: (props) => <h4 className="pdf-heading-4" {...props} />,
    h5: (props) => <h5 className="pdf-heading-5" {...props} />,
    h6: (props) => <h6 className="pdf-heading-6" {...props} />,
    p: (props) => <p className="pdf-paragraph" {...props} />,
    a: ({ href, ...props }) => {
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
    ul: (props) => <ul className="pdf-list" {...props} />,
    ol: (props) => <ol className="pdf-list pdf-ordered-list" {...props} />,
    li: (props) => <li className="pdf-list-item" {...props} />,
    strong: (props) => <strong className="pdf-strong" {...props} />,
    em: (props) => <em className="pdf-emphasis" {...props} />,
    blockquote: (props) => <blockquote className="pdf-blockquote" {...props} />,
    img: (props) => (
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
    table: (props) => (
        <div className="pdf-table-container">
            <table className="pdf-table" {...props} />
        </div>
    ),
    th: (props) => <th className="pdf-table-heading" {...props} />,
    td: (props) => <td className="pdf-table-cell" {...props} />,
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
    pre: ({ children, ...props }) => (
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
        <div className="pdf-quote">"{children}"</div>
    ),
};


const PdfArticle = ({ article }) => (
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
                <span>{getArticleDate(article)}</span>
                <span>{article.readTime || 'N/A'} minutes</span>
            </div>
        </div>

        <h1 className="pdf-title">{article.title}</h1>
        <p className="pdf-subtitle">{article.excerpt}</p>

        <div className="pdf-author-block">
            <div>
                <div className="pdf-author-label">Author</div>
                <div className="pdf-author-name">{getAuthorName(article)}</div>
            </div>
            <div className="pdf-header-details">
                <span className="pdf-pill">{article.category || 'Miscellaneous'}</span>
                <span className="pdf-pill"><VerifiedIcon /> Verified</span>
            </div>
        </div>

        <div className="pdf-divider" />

        <MarkdownRenderer content={article.content} components={pdfComponents} />

        {/*footer */}
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
                opacity: 1
            }}>
                <span style={{ fontSize: '0.95rem' }}>© {new Date().getFullYear()} Kenshi Webspace</span>
                <span style={{ fontSize: '0.95rem' }}>Made with passion for creators and curious minds.</span>
            </div>
        </div>
    </div>
);

const ArticlePDF = () => {
    const [downloading, setDownloading] = useState(false);
    const article = useSelector((state) => state.currentArticle);

    const handleDownload = async () => {
        if (downloading) return;

        setDownloading(true);
        const element = document.getElementById('print-area');
        if (!element) {
            setDownloading(false);
            return;
        }

        const opt = {
            margin: [0.1, 0.1, 0.1, 0.1], // top, right, bottom, left
            filename: getPdfFileName(article.title),
            image: { type: 'jpeg', quality: 1 },
            enableLinks: true,
            pagebreak: {
                mode: ['avoid-all'],
                before: ['.pdf-footer'],
                // avoid: [
                //     'img',
                //     'table',
                //     'pre',
                //     'code',
                //     'blockquote',
                //     '.pdf-header',
                //     '.pdf-author-block',
                //     '.pdf-divider',
                //     '.pdf-table-container',
                //     '.pdf-figure',
                //     '.pdf-callout',
                //     '.pdf-todo',
                //     '.pdf-quote'
                // ]
            },
            html2canvas: {
                scale: 4,
                backgroundColor: null,
                useCORS: true,
                allowTaint: true,
                logging: false,
                scrollX: 0,
                scrollY: -window.scrollY,
                // letterRendering: true
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

    if (!article.isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 text-white">
                <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
                    <h1 className="text-2xl font-bold">No article selected</h1>
                    <p className="text-white/80">
                        Open an article first, then use the download button to prepare its PDF.
                    </p>
                    <Button asChild className="cursor-pointer">
                        <Link to="/articles">Browse articles</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600" style={{ padding: '20px' }}>
            <div>
                <Button
                    className="px-6 py-3 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                    onClick={handleDownload}
                    disabled={downloading}
                >
                    {downloading ? 'Downloading...' : 'Download PDF'}
                </Button>
            </div>

            <PdfArticle article={article} />

        </div>
    );
};

export default ArticlePDF;
