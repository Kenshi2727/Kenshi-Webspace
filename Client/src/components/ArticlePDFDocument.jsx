import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify'
import emoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import remarkSmartypants from "remark-smartypants";
import remarkDirective from "remark-directive";
import remarkToc from 'remark-toc'
import { visit } from 'unist-util-visit';

// Professional PDF styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
        paddingBottom: 70
    },
    watermark: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        fontSize: 80,
        color: '#fafafa',
        opacity: 0.08,
        fontWeight: 'bold',
        letterSpacing: 8
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 25,
        backgroundColor: '#0f172a',
        borderBottomWidth: 4,
        borderBottomColor: '#6366f1'
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    logo: {
        width: 45,
        height: 45,
        borderRadius: 8
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 0.5
    },
    logoTagline: {
        fontSize: 9,
        color: '#94a3b8',
        marginTop: 3,
        letterSpacing: 0.3
    },
    headerRight: {
        alignItems: 'flex-end'
    },
    headerDate: {
        fontSize: 10,
        color: '#cbd5e1',
        letterSpacing: 0.2
    },
    contentWrapper: {
        paddingHorizontal: 50,
        paddingTop: 35
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#eef2ff',
        color: '#4f46e5',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 18,
        letterSpacing: 0.5,
        textTransform: 'uppercase'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 18,
        lineHeight: 1.3,
        letterSpacing: -0.5
    },
    metadataBar: {
        flexDirection: 'row',
        gap: 20,
        paddingVertical: 12,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#e2e8f0',
        marginBottom: 25
    },
    metadataItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        fontSize: 10,
        color: '#64748b'
    },
    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        marginBottom: 30,
        borderLeftWidth: 4,
        borderLeftColor: '#6366f1'
    },
    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#6366f1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    authorInitials: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    authorInfo: {
        flexDirection: 'column',
        gap: 3
    },
    authorName: {
        fontSize: 12,
        color: '#0f172a',
        fontWeight: 'bold'
    },
    authorTagline: {
        fontSize: 10,
        color: '#64748b',
        fontStyle: 'italic'
    },
    content: {
        fontSize: 11,
        lineHeight: 1.8,
        color: '#334155'
    },
    paragraph: {
        marginBottom: 12,
        lineHeight: 1.8,
        fontSize: 11,
        color: '#334155'
    },
    h1: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#0f172a',
        marginTop: 20,
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#e2e8f0',
        letterSpacing: -0.3
    },
    h2: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1e293b',
        marginTop: 18,
        marginBottom: 10,
        letterSpacing: -0.2
    },
    h3: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#334155',
        marginTop: 16,
        marginBottom: 8,
        letterSpacing: -0.1
    },
    h4: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#475569',
        marginTop: 14,
        marginBottom: 7
    },
    h5: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#475569',
        marginTop: 12,
        marginBottom: 6
    },
    h6: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#64748b',
        marginTop: 10,
        marginBottom: 5
    },
    codeBlock: {
        backgroundColor: '#1e293b',
        padding: 12,
        borderRadius: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#6366f1',
        marginVertical: 12,
        fontFamily: 'Courier'
    },
    code: {
        fontSize: 9,
        color: '#e2e8f0',
        lineHeight: 1.6
    },
    inlineCode: {
        backgroundColor: '#f1f5f9',
        color: '#6366f1',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 3,
        fontSize: 10,
        fontFamily: 'Courier',
        fontWeight: 'bold'
    },
    listContainer: {
        marginVertical: 8,
        marginLeft: 5
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 6,
        paddingLeft: 10
    },
    listBullet: {
        width: 20,
        color: '#6366f1',
        fontSize: 11,
        fontWeight: 'bold',
        marginRight: 5
    },
    listText: {
        flex: 1,
        fontSize: 11,
        color: '#334155',
        lineHeight: 1.7
    },
    taskListItem: {
        flexDirection: 'row',
        marginBottom: 6,
        paddingLeft: 10,
        alignItems: 'flex-start'
    },
    taskCheckbox: {
        width: 12,
        height: 12,
        borderWidth: 2,
        borderColor: '#6366f1',
        borderRadius: 3,
        marginRight: 8,
        marginTop: 2
    },
    taskCheckboxChecked: {
        backgroundColor: '#6366f1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskCheckmark: {
        color: '#ffffff',
        fontSize: 7,
        fontWeight: 'bold'
    },
    bold: {
        fontWeight: 'bold',
        color: '#0f172a'
    },
    italic: {
        fontStyle: 'italic'
    },
    strikethrough: {
        textDecoration: 'line-through',
        color: '#64748b'
    },
    blockquote: {
        borderLeftWidth: 4,
        borderLeftColor: '#6366f1',
        backgroundColor: '#f8fafc',
        paddingLeft: 15,
        paddingRight: 12,
        paddingVertical: 10,
        marginVertical: 12,
        fontStyle: 'italic',
        color: '#475569',
        borderRadius: 4,
        fontSize: 11,
        lineHeight: 1.7
    },
    link: {
        color: '#6366f1',
        textDecoration: 'underline'
    },
    image: {
        marginVertical: 12,
        alignSelf: 'center',
        maxWidth: '90%',
        maxHeight: 300,
        objectFit: 'contain'
    },
    imageCaption: {
        fontSize: 9,
        color: '#64748b',
        textAlign: 'center',
        marginTop: 5,
        fontStyle: 'italic'
    },
    table: {
        marginVertical: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0'
    },
    tableHeaderRow: {
        backgroundColor: '#f8fafc'
    },
    tableCell: {
        flex: 1,
        padding: 6,
        fontSize: 9,
        color: '#334155',
        borderRightWidth: 1,
        borderRightColor: '#e2e8f0'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        color: '#0f172a',
        fontSize: 10
    },
    hr: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 20
    },
    mathInline: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 3,
        fontSize: 10,
        fontFamily: 'Courier'
    },
    mathBlock: {
        backgroundColor: '#fef3c7',
        padding: 12,
        borderRadius: 6,
        marginVertical: 12,
        fontFamily: 'Courier',
        fontSize: 10,
        color: '#92400e',
        textAlign: 'center',
        lineHeight: 1.6
    },
    footnoteRef: {
        fontSize: 8,
        color: '#6366f1',
        verticalAlign: 'super'
    },
    footnoteSection: {
        marginTop: 30,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0'
    },
    footnoteItem: {
        flexDirection: 'row',
        marginBottom: 8,
        fontSize: 9
    },
    footnoteLabel: {
        width: 25,
        color: '#6366f1',
        fontWeight: 'bold'
    },
    footnoteText: {
        flex: 1,
        color: '#64748b',
        lineHeight: 1.6
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 15,
        backgroundColor: '#f8fafc',
        borderTopWidth: 2,
        borderTopColor: '#e2e8f0'
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    footerLogo: {
        width: 20,
        height: 20,
        backgroundColor: '#6366f1',
        borderRadius: 3
    },
    footerText: {
        fontSize: 9,
        color: '#64748b'
    },
    footerBrand: {
        fontSize: 9,
        color: '#6366f1',
        fontWeight: 'bold'
    },
    pageNumber: {
        fontSize: 9,
        color: '#64748b',
        fontWeight: 'bold'
    }
});

// Emoji map
const emojiMap = {
    ':smile:': '😄',
    ':heart:': '❤️',
    ':rocket:': '🚀',
    ':fire:': '🔥',
    ':tada:': '🎉',
    ':star:': '⭐',
    ':thumbsup:': '👍',
    ':thumbsdown:': '👎',
    ':clap:': '👏',
    ':eyes:': '👀',
    ':thinking:': '🤔',
    ':100:': '💯'
};

// Parse markdown using unified with proper plugins
const parseMarkdownWithUnified = (markdown) => {
    if (!markdown) return [];

    // Parse markdown into AST using unified
    const tree = unified()
        .use(remarkParse)
        .use(remarkGfm)  // GitHub Flavored Markdown (tables, task lists, strikethrough, etc.)
        .use(remarkMath) // Math support
        .use(remarkBreaks) // Line breaks
        .use(emoji) // Emoji support
        .use(remarkSmartypants) // Smart punctuation
        .use(remarkDirective) // Directives support
        .use(remarkToc, { heading: 'Contents', maxDepth: 3 }) // Table of Contents
        .use(rehypeSlug)
        .use(rehypeHighlight) // Syntax highlighting
        .use(rehypeKatex) // Math rendering
        .use(rehypeStringify) // Stringify to HTML (not used here but needed for rehype plugins)
        .use(rehypeRaw)
        .parse(markdown);

    const elements = [];
    const footnotes = [];

    // Function to process text with inline formatting and emojis
    const processInlineText = (text) => {
        if (!text) return '';

        // Convert emojis
        let processed = text;
        Object.entries(emojiMap).forEach(([code, emoji]) => {
            processed = processed.replace(new RegExp(code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), emoji);
        });

        return processed;
    };

    // Function to extract text from inline nodes
    const extractInlineText = (node) => {
        if (node.type === 'text') {
            return processInlineText(node.value);
        }
        if (node.type === 'inlineCode') {
            return { type: 'code', value: node.value };
        }
        if (node.type === 'strong') {
            return { type: 'bold', children: node.children.map(extractInlineText) };
        }
        if (node.type === 'emphasis') {
            return { type: 'italic', children: node.children.map(extractInlineText) };
        }
        if (node.type === 'delete') {
            return { type: 'strikethrough', children: node.children.map(extractInlineText) };
        }
        if (node.type === 'link') {
            return { type: 'link', url: node.url, children: node.children.map(extractInlineText) };
        }
        if (node.type === 'inlineMath') {
            return { type: 'math', value: node.value };
        }
        if (node.type === 'footnoteReference') {
            return { type: 'footnoteRef', identifier: node.identifier };
        }
        if (node.children) {
            return node.children.map(extractInlineText);
        }
        return '';
    };

    // Recursive function to process AST nodes
    const processNode = (node) => {
        switch (node.type) {
            case 'heading':
                return {
                    type: `h${node.depth}`,
                    children: node.children.map(extractInlineText).flat()
                };

            case 'paragraph':
                return {
                    type: 'paragraph',
                    children: node.children.map(extractInlineText).flat()
                };

            case 'code':
                return {
                    type: 'code',
                    value: node.value,
                    lang: node.lang
                };

            case 'blockquote':
                return {
                    type: 'blockquote',
                    children: node.children.map(child =>
                        child.children ? child.children.map(extractInlineText).flat() : []
                    ).flat()
                };

            case 'list':
                const items = node.children.map(item => {
                    const firstChild = item.children[0];
                    if (firstChild && firstChild.children) {
                        // Check for task list
                        const checked = item.checked;
                        if (checked !== null && checked !== undefined) {
                            return {
                                checked: checked,
                                children: firstChild.children.map(extractInlineText).flat()
                            };
                        }
                        return firstChild.children.map(extractInlineText).flat();
                    }
                    return [];
                });

                const isTaskList = items.some(item => item && typeof item === 'object' && 'checked' in item);

                return {
                    type: isTaskList ? 'taskList' : (node.ordered ? 'orderedList' : 'unorderedList'),
                    items: items
                };

            case 'table':
                return {
                    type: 'table',
                    headers: node.children[0].children.map(cell =>
                        cell.children.map(extractInlineText).flat()
                    ),
                    rows: node.children.slice(1).map(row =>
                        row.children.map(cell =>
                            cell.children.map(extractInlineText).flat()
                        )
                    )
                };

            case 'thematicBreak':
                return {
                    type: 'hr'
                };

            case 'image':
                return {
                    type: 'image',
                    url: node.url,
                    alt: node.alt,
                    title: node.title
                };

            case 'math':
                return {
                    type: 'mathBlock',
                    value: node.value
                };

            case 'footnoteDefinition':
                footnotes.push({
                    identifier: node.identifier,
                    children: node.children.map(child =>
                        child.children ? child.children.map(extractInlineText).flat() : []
                    ).flat()
                });
                return null;

            case 'html':
                // Skip HTML for now or convert to text
                return null;

            default:
                return null;
        }
    };

    // Process all nodes in the tree
    if (tree.children) {
        tree.children.forEach(node => {
            const processed = processNode(node);
            if (processed) {
                elements.push(processed);
            }
        });
    }

    // Add footnotes at the end if any
    if (footnotes.length > 0) {
        elements.push({ type: 'footnotes', items: footnotes });
    }

    return elements;
};

// Render inline content with formatting
const renderInlineContent = (children) => {
    if (!children || !Array.isArray(children)) {
        return <Text>{String(children || '')}</Text>;
    }

    return children.map((child, index) => {
        if (typeof child === 'string') {
            return <Text key={index}>{child}</Text>;
        }

        if (typeof child === 'object') {
            switch (child.type) {
                case 'bold':
                    return (
                        <Text key={index} style={styles.bold}>
                            {renderInlineContent(child.children)}
                        </Text>
                    );
                case 'italic':
                    return (
                        <Text key={index} style={styles.italic}>
                            {renderInlineContent(child.children)}
                        </Text>
                    );
                case 'strikethrough':
                    return (
                        <Text key={index} style={styles.strikethrough}>
                            {renderInlineContent(child.children)}
                        </Text>
                    );
                case 'code':
                    return (
                        <Text key={index} style={styles.inlineCode}>
                            {child.value}
                        </Text>
                    );
                case 'link':
                    return (
                        <Link key={index} src={child.url} style={styles.link}>
                            {renderInlineContent(child.children)}
                        </Link>
                    );
                case 'math':
                    return (
                        <Text key={index} style={styles.mathInline}>
                            {child.value}
                        </Text>
                    );
                case 'footnoteRef':
                    return (
                        <Text key={index} style={styles.footnoteRef}>
                            [{child.identifier}]
                        </Text>
                    );
                default:
                    if (Array.isArray(child)) {
                        return renderInlineContent(child);
                    }
                    return <Text key={index}>{String(child)}</Text>;
            }
        }

        return <Text key={index}>{String(child)}</Text>;
    });
};

// Render parsed content
const renderContent = (elements) => {
    return elements.map((element, index) => {
        switch (element.type) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                return (
                    <Text key={index} style={styles[element.type]}>
                        {renderInlineContent(element.children)}
                    </Text>
                );

            case 'paragraph':
                return (
                    <Text key={index} style={styles.paragraph}>
                        {renderInlineContent(element.children)}
                    </Text>
                );

            case 'code':
                return (
                    <View key={index} style={styles.codeBlock}>
                        <Text style={styles.code}>{element.value}</Text>
                    </View>
                );

            case 'blockquote':
                return (
                    <View key={index} style={styles.blockquote}>
                        <Text>{renderInlineContent(element.children)}</Text>
                    </View>
                );

            case 'image':
                return (
                    <View key={index}>
                        <Image src={element.url} style={styles.image} />
                        {element.alt && (
                            <Text style={styles.imageCaption}>
                                Fig. {element.alt}
                            </Text>
                        )}
                    </View>
                );

            case 'unorderedList':
                return (
                    <View key={index} style={styles.listContainer}>
                        {element.items.map((item, i) => (
                            <View key={i} style={styles.listItem}>
                                <Text style={styles.listBullet}>•</Text>
                                <Text style={styles.listText}>
                                    {renderInlineContent(item)}
                                </Text>
                            </View>
                        ))}
                    </View>
                );

            case 'orderedList':
                return (
                    <View key={index} style={styles.listContainer}>
                        {element.items.map((item, i) => (
                            <View key={i} style={styles.listItem}>
                                <Text style={styles.listBullet}>{i + 1}.</Text>
                                <Text style={styles.listText}>
                                    {renderInlineContent(item)}
                                </Text>
                            </View>
                        ))}
                    </View>
                );

            case 'taskList':
                return (
                    <View key={index} style={styles.listContainer}>
                        {element.items.map((item, i) => (
                            <View key={i} style={styles.taskListItem}>
                                <View style={[
                                    styles.taskCheckbox,
                                    item.checked && styles.taskCheckboxChecked
                                ]}>
                                    {item.checked && (
                                        <Text style={styles.taskCheckmark}>✓</Text>
                                    )}
                                </View>
                                <Text style={styles.listText}>
                                    {renderInlineContent(item.children)}
                                </Text>
                            </View>
                        ))}
                    </View>
                );

            case 'table':
                return (
                    <View key={index} style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeaderRow]}>
                            {element.headers.map((header, i) => (
                                <Text key={i} style={[styles.tableCell, styles.tableHeaderCell]}>
                                    {renderInlineContent(header)}
                                </Text>
                            ))}
                        </View>
                        {element.rows.map((row, i) => (
                            <View key={i} style={styles.tableRow}>
                                {row.map((cell, j) => (
                                    <Text key={j} style={styles.tableCell}>
                                        {renderInlineContent(cell)}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </View>
                );

            case 'hr':
                return <View key={index} style={styles.hr} />;

            case 'mathBlock':
                return (
                    <View key={index} style={styles.mathBlock}>
                        <Text>{element.value}</Text>
                    </View>
                );

            case 'footnotes':
                return (
                    <View key={index} style={styles.footnoteSection}>
                        {element.items.map((footnote, i) => (
                            <View key={i} style={styles.footnoteItem}>
                                <Text style={styles.footnoteLabel}>[{footnote.identifier}]</Text>
                                <Text style={styles.footnoteText}>
                                    {renderInlineContent(footnote.children)}
                                </Text>
                            </View>
                        ))}
                    </View>
                );

            default:
                return null;
        }
    });
};

// Main PDF Document Component
const ArticlePDFDocument = ({ article }) => {
    const parsedContent = parseMarkdownWithUnified(article.content);
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.watermark} fixed>KENSHI</Text>

                <View style={styles.header} fixed>
                    <View style={styles.logoSection}>
                        <Image src="/logo-min.png" style={styles.logo} />
                        <View>
                            <Text style={styles.logoText}>Kenshi Webspace</Text>
                            <Text style={styles.logoTagline}>Professional Blog & Developer Insights</Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.headerDate}>{currentDate}</Text>
                    </View>
                </View>

                <View style={styles.contentWrapper}>
                    <Text style={styles.categoryBadge}>
                        {article.category || 'Article'}
                    </Text>

                    <Text style={styles.title}>
                        {article.title || 'Untitled Article'}
                    </Text>

                    <View style={styles.metadataBar}>
                        <View style={styles.metadataItem}>
                            <Text>📅 {article.updatedAt
                                ? new Date(article.updatedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })
                                : currentDate}</Text>
                        </View>
                        <View style={styles.metadataItem}>
                            <Text>⏱ {article.readTime || 0} min read</Text>
                        </View>
                    </View>

                    <View style={styles.authorSection}>
                        <View style={styles.authorAvatar}>
                            <Text style={styles.authorInitials}>
                                {article.author?.firstName?.charAt(0) || ''}{article.author?.lastName?.charAt(0) || ''}
                            </Text>
                        </View>
                        <View style={styles.authorInfo}>
                            <Text style={styles.authorName}>
                                {article.author?.firstName || ''} {article.author?.lastName || ''}
                            </Text>
                            {article.author?.tagline && (
                                <Text style={styles.authorTagline}>
                                    {article.author.tagline}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.content}>
                        {renderContent(parsedContent)}
                    </View>
                </View>

                <View style={styles.footer} fixed>
                    <View style={styles.footerLeft}>
                        <View style={styles.footerLogo} />
                        <Text style={styles.footerBrand}>Kenshi Webspace</Text>
                        <Text style={styles.footerText}>• kenshiblog.in</Text>
                    </View>
                    <Text
                        style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) => (
                            `Page ${pageNumber} of ${totalPages}`
                        )}
                    />
                </View>
            </Page>
        </Document>
    );
};

export default ArticlePDFDocument;