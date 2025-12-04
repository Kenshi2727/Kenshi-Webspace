// ArticlePDFDocument.jsx
import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    Image,
    StyleSheet,
    Font,
    Link,
} from '@react-pdf/renderer';
import { unified } from 'unified';
import parse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import remarkToc from 'remark-toc';

// Register basic fonts (you can register custom fonts here if you want)
Font.register({ family: 'Helvetica' });

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#0f1724',
        paddingTop: 32,
        paddingBottom: 32,
        paddingHorizontal: 40,
        fontFamily: 'Helvetica',
        color: '#E6EEF8',
        fontSize: 11,
        lineHeight: 1.4,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    badge: {
        borderWidth: 1,
        borderColor: '#7c3aed',
        padding: 6,
        borderRadius: 6,
        color: '#C7D2FE',
        fontSize: 9,
    },
    meta: {
        fontSize: 9,
        color: '#9CA3AF',
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 6,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 800,
        color: '#FFFFFF',
        lineHeight: 1.05,
        flex: 1,
        marginRight: 12,
    },
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    authorName: {
        fontSize: 11,
        fontWeight: 600,
        color: '#FFFFFF',
    },
    authorTagline: {
        fontSize: 9,
        color: '#9CA3AF',
    },
    separator: {
        height: 1,
        backgroundColor: '#ffffff20',
        marginVertical: 8,
    },

    /* Markdown styles */
    md_h1: { fontSize: 22, fontWeight: 800, marginTop: 6, marginBottom: 6, color: '#FFFFFF' },
    md_h2: { fontSize: 18, fontWeight: 700, marginTop: 6, marginBottom: 6, color: '#FFFFFF' },
    md_h3: { fontSize: 14, fontWeight: 700, marginTop: 6, marginBottom: 4, color: '#FFFFFF' },
    md_p: { fontSize: 11, marginBottom: 6, color: '#E6EEF8' },
    md_strong: { fontWeight: 700, color: '#FFFFFF' },
    md_em: { fontStyle: 'italic', color: '#D1D5DB' },
    md_blockquote: { marginVertical: 6, paddingLeft: 8, borderLeftWidth: 3, borderLeftColor: '#7c3aed', color: '#CBD5E1', fontStyle: 'italic' },
    md_code_block: { fontFamily: 'Courier', fontSize: 9, padding: 6, backgroundColor: '#0b1220', borderRadius: 6, marginVertical: 6 },
    md_inline_code: { fontFamily: 'Courier', fontSize: 10, backgroundColor: '#ffffff0d', paddingHorizontal: 3, paddingVertical: 1 },
    md_ul: { marginVertical: 4, paddingLeft: 12 },
    md_li: { marginBottom: 2 },
    md_img: { marginVertical: 8, alignSelf: 'center' },
    md_table: { marginVertical: 6, borderWidth: 1, borderColor: '#ffffff14', borderRadius: 4, overflow: 'hidden' },
    md_table_row: { flexDirection: 'row' },
    md_table_cell: { flex: 1, padding: 6, borderRightWidth: 1, borderRightColor: '#ffffff08' },
    link: { color: '#93C5FD', textDecoration: 'underline' },
});

/* Helper to format date */
function formatDate(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
        return iso;
    }
}

/* Markdown -> react-pdf renderer (v2) that handles raw HTML <img> tags and resolves relative URLs */
function MarkdownToPDF_v2(props) {
    const content = props && props.content ? String(props.content) : '';

    // Build a remark processor and run plugins so we get a transformed mdast
    const processor = unified()
        .use(parse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkMath)
        .use(remarkDirective)
        .use(remarkToc, { heading: 'Contents', maxDepth: 3 });

    let tree = processor.parse(content);
    try {
        tree = processor.runSync(tree);
    } catch (err) {
        console.error('Error running remark plugins:', err);
    }

    // Resolve src: support data:, absolute and root-relative (/path)
    function resolveSrc(src) {
        if (!src) return '';
        if (src.startsWith('data:') || /^https?:\/\//i.test(src)) return src;
        if (src.startsWith('/')) {
            if (typeof window !== 'undefined' && window.location) {
                return window.location.origin + src;
            }
            return src;
        }
        if (typeof window !== 'undefined' && window.location) {
            const base = window.location.href.replace(/\/[^/]*$/, '/');
            try {
                return new URL(src, base).toString();
            } catch (e) {
                return src;
            }
        }
        return src;
    }

    function renderChildren(children) {
        if (!children) return null;
        return children.map((child, i) => {
            try {
                return renderNode(child, String(i));
            } catch (e) {
                console.error('Error rendering markdown node in PDF:', e, child);
                return <Text key={'err-' + i} style={styles.md_p}>[Error rendering content]</Text>;
            }
        });
    }

    function renderNode(node, key) {
        const type = node.type;
        switch (type) {
            case 'root':
                return <View key={key}>{renderChildren(node.children)}</View>;

            case 'heading': {
                const depth = node.depth || 1;
                const childContent = node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null;
                if (depth === 1) return <Text key={key} style={styles.md_h1}>{childContent}</Text>;
                if (depth === 2) return <Text key={key} style={styles.md_h2}>{childContent}</Text>;
                return <Text key={key} style={styles.md_h3}>{childContent}</Text>;
            }

            case 'paragraph':
                return <Text key={key} style={styles.md_p}>{node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null}</Text>;

            case 'text':
                return <Text key={key} style={{ fontFamily: 'Helvetica' }}>{String(node.value || '')}</Text>;

            case 'emphasis':
                return <Text key={key} style={styles.md_em}>{node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null}</Text>;

            case 'strong':
                return <Text key={key} style={styles.md_strong}>{node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null}</Text>;

            case 'blockquote':
                return <Text key={key} style={styles.md_blockquote}>{node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null}</Text>;

            case 'code':
                return <Text key={key} style={styles.md_code_block}>{String(node.value || '')}</Text>;

            case 'inlineCode':
                return <Text key={key} style={styles.md_inline_code}>{String(node.value || '')}</Text>;

            case 'list': {
                const isOrdered = node.ordered;
                return (
                    <View key={key} style={styles.md_ul}>
                        {node.children && node.children.map((li, i) => (
                            <View key={key + '-li-' + i} style={{ flexDirection: 'row' }}>
                                <Text style={{ width: 14 }}>{isOrdered ? `${i + 1}.` : '\u2022'}</Text>
                                <View style={{ flex: 1 }}>{renderNode(li, key + '-li-' + i)}</View>
                            </View>
                        ))}
                    </View>
                );
            }

            case 'listItem':
                return <View key={key} style={styles.md_li}>{node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null}</View>;

            case 'thematicBreak':
                return <View key={key} style={styles.separator} />;

            case 'image':
                try {
                    const src = resolveSrc(node.url || '');
                    if (!src) return null;
                    // fixed numeric width/height to avoid NaN layout issues
                    return (
                        <View key={key} style={styles.md_img}>
                            <Image src={src} style={{ width: 515, height: 260 }} />
                            {node.alt ? <Text style={{ textAlign: 'center', fontSize: 9, color: '#E6EEF8', marginTop: 4 }}>Fig. {node.alt}</Text> : null}
                        </View>
                    );
                } catch (e) {
                    console.error('Error rendering image node:', e, node);
                    return <Text key={key} style={styles.md_p}>[Image failed to load]</Text>;
                }

            case 'html':
                // raw HTML nodes — try to extract <img> tags and fallback to stripped text
                try {
                    const html = String(node.value || '');
                    const imgMatch = html.match(/<img\s+[^>]*src=(?:\"|')([^\"']+)(?:\"|')[^>]*alt=(?:\"|')?([^\"'>]*)?(?:\"|')?[^>]*>/i)
                        || html.match(/<img\s+[^>]*src=(?:\"|')([^\"']+)(?:\"|')[^>]*>/i);
                    if (imgMatch) {
                        const srcRaw = imgMatch[1];
                        const altRaw = imgMatch[2] || '';
                        const src = resolveSrc(srcRaw);
                        return (
                            <View key={key} style={styles.md_img}>
                                <Image src={src} style={{ width: 515, height: 260 }} />
                                {altRaw ? <Text style={{ textAlign: 'center', fontSize: 9, color: '#E6EEF8', marginTop: 4 }}>Fig. {altRaw}</Text> : null}
                            </View>
                        );
                    }
                    const stripped = html.replace(/<[^>]+>/g, '');
                    if (stripped.trim()) return <Text key={key} style={styles.md_p}>{stripped}</Text>;
                    return null;
                } catch (e) {
                    console.error('Error handling raw HTML node:', e, node);
                    return null;
                }

            case 'link':
                return (
                    <Link key={key} src={node.url} style={styles.link}>
                        {node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : node.url}
                    </Link>
                );

            case 'table':
                return (
                    <View key={key} style={styles.md_table}>
                        {node.children && node.children.map((row, i) => (
                            <View key={key + '-r-' + i} style={styles.md_table_row}>
                                {row.children && row.children.map((cell, j) => (
                                    <View key={key + '-r-' + i + '-c-' + j} style={styles.md_table_cell}>
                                        {cell.children ? cell.children.map((c, k) => renderNode(c, key + '-r-' + i + '-c-' + j + '-' + k)) : null}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                );

            default:
                if (node.children) return <View key={key}>{node.children.map((c, i) => renderNode(c, key + '-' + i))}</View>;
                return null;
        }
    }

    return <View>{renderNode(tree, 'md-root')}</View>;
}

/* ArticlePDFDocument component using the v2 markdown renderer */
export default function ArticlePDFDocument({ article = {} }) {
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                <View style={styles.headerRow} fixed>
                    <Text style={styles.badge}>{article.category || 'Uncategorized'}</Text>
                    <View>
                        <Text style={styles.meta}>{formatDate(article.updatedAt || new Date().toISOString())} • {article.readTime || 0} min read</Text>
                    </View>
                </View>

                <View style={styles.titleRow}>
                    <Text style={styles.title}>{article.title || 'Untitled Article'}</Text>
                </View>

                <View style={styles.authorRow}>
                    {article.authorImage ? (
                        <Image src={article.authorImage} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatar, { backgroundColor: '#7c3aed', justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={{ color: '#fff', fontWeight: 700 }}>{(article.author?.firstName?.[0] || '') + (article.author?.lastName?.[0] || '')}</Text>
                        </View>
                    )}

                    <View>
                        <Text style={styles.authorName}>{article.author?.firstName || 'Author'} {article.author?.lastName || ''}</Text>
                        <Text style={styles.authorTagline}>{article.author?.tagline || 'Some wild author !'}</Text>
                    </View>
                </View>

                <View style={styles.separator} />

                {/* Use the v2 markdown renderer */}
                <View>
                    <MarkdownToPDF_v2 content={article.content || ''} />
                </View>

                <View style={styles.separator} />

                <View>
                    <Text style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Share this article</Text>
                </View>
            </Page>
        </Document>
    );
}
