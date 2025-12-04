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

// Try to load katex for math rendering. If not present, we'll fall back.
let katex = null;
try {
    // eslint-disable-next-line global-require
    katex = require('katex'); // works in common bundlers; if not available it throws and we fall back
} catch (e) {
    katex = null;
    // console.warn('katex not available: math will render as plain text. Install katex for proper math rendering.');
}

// Register fonts (Helvetica commonly available). If you want custom fonts, register here.
Font.register({ family: 'Helvetica' });

// Layout constants (A4)
const PAGE_WIDTH = 595.28;
const HORIZONTAL_PADDING = 48;
const CONTENT_WIDTH = PAGE_WIDTH - HORIZONTAL_PADDING * 2;

// Small helper: convert opacity 0..1 to 2-digit hex
function opacityToHex(op) {
    const o = Math.max(0, Math.min(1, typeof op === 'number' ? op : 0.32));
    const hex = Math.round(o * 255).toString(16).padStart(2, '0');
    return hex;
}

// Utility: convert emoji text (possibly multi-codepoint) to twemoji codepoint string
function emojiToCodePoint(emoji) {
    // Spread converts surrogate pairs properly
    return [...emoji].map((c) => c.codePointAt(0).toString(16)).join('-');
}

// Utility: split text into array of {type:'text'|'emoji', value: string}
function splitTextAndEmojis(s) {
    if (!s) return [];
    // Very simple emoji regex (covers many emoji, not perfect). We'll split by any emoji-like symbol.
    // This is intentionally permissive — Twemoji URL generation handles compound sequences too.
    const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic}|\uFE0F)/gu;
    // We'll walk and detect emoji sequences using codepoints heuristics
    const parts = [];
    let i = 0;
    // naive approach: iterate code points and group runs that look like emoji (including ZWJ sequences)
    const chars = [...s];
    while (i < chars.length) {
        // if char is emoji (basic test using regex on that character)
        const ch = chars[i];
        if (emojiRegex.test(ch)) {
            // gather a run including following variation selectors or ZWJ sequences
            let run = ch;
            let j = i + 1;
            // include zero-width joiner sequences and following modifiers
            while (j < chars.length) {
                const next = chars[j];
                if (next === '\u200d' || /[\uFE0F\u20E3\u1F3FB-\u1F3FF]/u.test(next) || emojiRegex.test(next)) {
                    run += next;
                    j += 1;
                } else break;
            }
            parts.push({ type: 'emoji', value: run });
            i = j;
        } else {
            // gather regular text until next emoji
            let run = ch;
            let j = i + 1;
            while (j < chars.length && !emojiRegex.test(chars[j])) {
                run += chars[j];
                j += 1;
            }
            parts.push({ type: 'text', value: run });
            i = j;
        }
    }
    return parts;
}

// Styling: Minimal, professional (white background)
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        paddingTop: 110, // leave space for header
        paddingBottom: 90, // leave space for footer
        paddingHorizontal: HORIZONTAL_PADDING,
        fontFamily: 'Helvetica',
        color: '#111827',
        fontSize: 11,
        lineHeight: 1.5,
    },

    /* header/footer improved visuals */
    headerFixed: {
        position: 'absolute',
        top: 20,
        left: HORIZONTAL_PADDING,
        right: HORIZONTAL_PADDING,
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    logo: { width: 130, height: 34 },
    siteName: { marginLeft: 10, fontSize: 16, fontWeight: 700, color: '#0f1724' },
    headerTagline: { fontSize: 9, color: '#6B7280', marginTop: 4 },

    headerRightMeta: { textAlign: 'right' },
    headerMetaDate: { fontSize: 9, color: '#6B7280' },
    headerDivider: { position: 'absolute', bottom: 4, left: HORIZONTAL_PADDING, right: HORIZONTAL_PADDING, height: 1, backgroundColor: '#EEF2FF', opacity: 0.35 },

    footerFixed: {
        position: 'absolute',
        bottom: 14,
        left: HORIZONTAL_PADDING,
        right: HORIZONTAL_PADDING,
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerLeft: { flexDirection: 'column' },
    footerName: { fontSize: 10, fontWeight: 700, color: '#0f1724' },
    footerMeta: { fontSize: 9, color: '#6B7280' },

    footerCenterLine: { position: 'absolute', bottom: 8, left: HORIZONTAL_PADDING + 120, right: HORIZONTAL_PADDING + 120, height: 1, backgroundColor: '#EEF2FF', opacity: 0.25 },

    /* content header area */
    badge: {
        borderWidth: 1,
        borderColor: '#E6EDF7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        color: '#0f1724',
        fontSize: 9,
        alignSelf: 'flex-start',
        backgroundColor: '#F8FAFF',
    },
    titleRow: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: '#0f1724',
        lineHeight: 1.08,
        textAlign: 'center',
        marginBottom: 6,
    },

    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'center',
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
    },
    authorName: {
        fontSize: 11,
        fontWeight: 600,
        color: '#0f1724',
    },
    authorTagline: {
        fontSize: 9,
        color: '#6B7280',
    },

    separator: {
        height: 1,
        backgroundColor: '#E6EEF8',
        opacity: 0.12,
        marginVertical: 12,
    },

    /* Markdown styles */
    md_h1: { fontSize: 18, fontWeight: 700, marginTop: 10, marginBottom: 6, color: '#0f1724' },
    md_h2: { fontSize: 15, fontWeight: 600, marginTop: 8, marginBottom: 6, color: '#0f1724' },
    md_h3: { fontSize: 13, fontWeight: 600, marginTop: 6, marginBottom: 4, color: '#0f1724' },
    md_p: { fontSize: 11, marginBottom: 8, color: '#374151' },
    md_strong: { fontWeight: 700, color: '#0f1724' },
    md_em: { fontStyle: 'italic', color: '#4B5563' },
    md_blockquote: {
        marginVertical: 8,
        paddingLeft: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#E6EDF7',
        color: '#374151',
        fontStyle: 'italic',
        backgroundColor: '#FBFDFF',
        paddingVertical: 4,
        borderRadius: 3,
    },
    md_code_block: {
        fontFamily: 'Courier',
        fontSize: 9,
        padding: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 6,
        marginVertical: 6,
        color: '#0f1724',
    },
    md_inline_code: {
        fontFamily: 'Courier',
        fontSize: 10,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 3,
        paddingVertical: 1,
        color: '#0f1724',
    },
    md_ul: { marginVertical: 6, paddingLeft: 14 },
    md_li: { marginBottom: 4, color: '#374151' },

    /* images: increased sizing */
    md_img_block: { marginVertical: 12, alignItems: 'center' },
    md_img_inline: { marginHorizontal: 8, marginVertical: 2 },

    /* tables */
    md_table: {
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#E6EEF8',
        borderRadius: 4,
        overflow: 'hidden',
    },
    md_table_row: { flexDirection: 'row' },
    md_table_cell: { flex: 1, padding: 8, borderRightWidth: 1, borderRightColor: '#EEF2FF' },
    md_table_cell_header: {
        flex: 1,
        padding: 8,
        backgroundColor: '#F8FAFF',
        fontWeight: 700,
        color: '#0f1724',
    },

    link: { color: '#2563EB', textDecoration: 'underline' },
});

// --- Markdown processor + renderer (improved) ---
function MarkdownToPDF_v2(props) {
    const content = props && props.content ? String(props.content) : '';

    const processor = unified()
        .use(parse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkMath) // captures inline/block math nodes
        .use(remarkDirective)
        .use(remarkToc, { heading: 'Contents', maxDepth: 3 });

    let tree = processor.parse(content);
    try {
        tree = processor.runSync(tree);
    } catch (err) {
        console.error('Error running remark plugins:', err);
    }

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

    // Render text nodes but split out emojis into Image tags
    function renderTextWithEmojis(txt, key, emojiBaseUrl = 'https://twemoji.maxcdn.com/v/latest/72x72') {
        // returns an array of elements (Text and Image wrapped in View if needed)
        const parts = splitTextAndEmojis(String(txt || ''));
        if (parts.length === 0) return <Text key={key} style={{ fontFamily: 'Helvetica' }}>{''}</Text>;
        // if there are emojis and text mix, render in a row-wrapped container
        if (parts.length > 1 && parts.some(p => p.type === 'emoji')) {
            return (
                <View key={key} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                    {parts.map((p, idx) => {
                        if (p.type === 'text') {
                            return <Text key={key + '-t-' + idx} style={styles.md_p}>{p.value}</Text>;
                        } else {
                            const code = emojiToCodePoint(p.value);
                            const url = (emojiBaseUrl || 'https://twemoji.maxcdn.com/v/latest/72x72') + `/${code}.png`;
                            return (
                                <Image key={key + '-e-' + idx} src={url} style={{ width: 14, height: 14, marginHorizontal: 3, marginVertical: 2 }} />
                            );
                        }
                    })}
                </View>
            );
        }
        // simple case: single item
        const p = parts[0];
        if (p.type === 'text') return <Text key={key} style={{ fontFamily: 'Helvetica' }}>{p.value}</Text>;
        // single emoji
        const code = emojiToCodePoint(p.value);
        const url = `https://twemoji.maxcdn.com/v/latest/72x72/${code}.png`;
        return <Image key={key} src={url} style={{ width: 16, height: 16 }} />;
    }

    // Render math nodes: if katex available render as SVG image via data URL, otherwise fallback to textual display
    function renderMathNode(value, displayMode = false, key = 'math') {
        if (katex) {
            try {
                // renderToString returns HTML; wrap into SVG via foreignObject so browsers/PDF can rasterize
                const html = katex.renderToString(String(value), { throwOnError: false, displayMode });
                // wrap HTML in a minimal XHTML container for foreignObject
                const svgWidth = Math.min(CONTENT_WIDTH, 520);
                // approximate height — kaTex font sizes are relative; we choose a safe height
                const svgHeight = displayMode ? 60 : 28;
                const svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
            <foreignObject width="100%" height="100%">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <style>
                  body { margin:0; padding:0; }
                  .katex { font-size: ${displayMode ? 32 : 18}px; line-height: 1; color: #111827; }
                </style>
                ${html}
              </div>
            </foreignObject>
          </svg>
        `;
                const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
                // return an Image element for the SVG
                return <Image key={key} src={dataUrl} style={{ width: svgWidth, height: svgHeight, marginVertical: 6 }} />;
            } catch (e) {
                console.warn('katex render error', e);
                // fallback to showing raw math in monospace
                return <Text key={key} style={styles.md_inline_code}>{String(value)}</Text>;
            }
        }
        // katex not available: fallback to wrapped monospace text
        return <Text key={key} style={styles.md_inline_code}>{displayMode ? `$$${String(value)}$$` : `\\(${String(value)}\\)`}</Text>;
    }

    function renderChildren(children) {
        if (!children) return null;
        return children.map((child, i) => {
            try {
                return renderNode(child, String(i));
            } catch (e) {
                console.error('Error rendering node:', e, child);
                return <Text key={'err-' + i} style={styles.md_p}>[Error]</Text>;
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

            case 'paragraph': {
                const children = node.children || [];
                const hasImage = children.some(ch => ch.type === 'image' || (ch.type === 'html' && /<img\s/i.test(String(ch.value || ''))));
                // single-image paragraph -> block image
                if (children.length === 1 && (children[0].type === 'image' || (children[0].type === 'html' && /<img\s/i.test(String(children[0].value || ''))))) {
                    return <View key={key}>{children.map((c, i) => renderNode(c, key + '-' + i))}</View>;
                }

                if (hasImage) {
                    // inline flow: mix text and small images horizontally, wrapping as needed
                    return (
                        <View key={key} style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
                            {children.map((ch, i) => {
                                if (ch.type === 'text') {
                                    // handle emojis inside the text segment
                                    return renderTextWithEmojis(ch.value, key + '-t-' + i);
                                } else if (ch.type === 'inlineCode') {
                                    return <Text key={key + '-ic-' + i} style={styles.md_inline_code}>{String(ch.value || '')}</Text>;
                                } else if (ch.type === 'emphasis' || ch.type === 'strong') {
                                    return <Text key={key + '-s-' + i} style={ch.type === 'strong' ? styles.md_strong : styles.md_em}>{ch.children ? ch.children.map((c, j) => renderNode(c, key + '-s-' + i + '-' + j)) : null}</Text>;
                                } else if (ch.type === 'image') {
                                    const src = resolveSrc(ch.url || '');
                                    if (!src) return null;
                                    // inline image larger than before
                                    const w = Math.min(260, CONTENT_WIDTH * 0.45);
                                    return (
                                        <View key={key + '-img-' + i} style={styles.md_img_inline}>
                                            <Image src={src} style={{ width: w, height: w * 0.60 }} />
                                            {ch.alt ? <Text style={{ fontSize: 8, color: '#6B7280', textAlign: 'center' }}>{ch.alt}</Text> : null}
                                        </View>
                                    );
                                } else {
                                    return <View key={key + '-f-' + i}>{renderNode(ch, key + '-f-' + i)}</View>;
                                }
                            })}
                        </View>
                    );
                }

                // default paragraph: handle each child (including text->emoji handling)
                return (
                    <View key={key} style={{ marginBottom: 6 }}>
                        {node.children && node.children.map((c, i) => {
                            if (c.type === 'text') return renderTextWithEmojis(c.value, key + '-t-' + i);
                            return renderNode(c, key + '-' + i);
                        })}
                    </View>
                );
            }

            case 'text':
                // split text for emoji rendering
                return renderTextWithEmojis(node.value, key);

            case 'emphasis':
                return <Text key={key} style={styles.md_em}>{node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null}</Text>;

            case 'strong':
                return <Text key={key} style={styles.md_strong}>{node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null}</Text>;

            case 'blockquote':
                return <View key={key} style={styles.md_blockquote}>{node.children ? node.children.map((c, i) => renderNode(c, key + '-' + i)) : null}</View>;

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
                                <Text style={{ width: 20, color: '#374151' }}>{isOrdered ? `${i + 1}.` : '\u2022'}</Text>
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

            case 'image': {
                try {
                    const src = resolveSrc(node.url || '');
                    if (!src) return null;
                    // block image: use larger width by default and proportional height
                    const w = Math.min(CONTENT_WIDTH, 520);
                    const h = Math.round(w * 0.60);
                    return (
                        <View key={key} style={styles.md_img_block}>
                            <Image src={src} style={{ width: w, height: h }} />
                            {node.alt ? <Text style={{ fontSize: 9, color: '#6B7280', marginTop: 6, textAlign: 'center' }}>Fig. {node.alt}</Text> : null}
                        </View>
                    );
                } catch (e) {
                    console.error('Error rendering image node:', e, node);
                    return <Text key={key} style={styles.md_p}>[Image failed to load]</Text>;
                }
            }

            case 'html': {
                try {
                    const html = String(node.value || '');
                    // detect img tags
                    const imgMatch = html.match(/<img\s+[^>]*src=(?:\"|')([^\"']+)(?:\"|')[^>]*>/i);
                    if (imgMatch) {
                        const srcRaw = imgMatch[1];
                        const src = resolveSrc(srcRaw);
                        const w = Math.min(CONTENT_WIDTH, 520);
                        const h = Math.round(w * 0.60);
                        return (
                            <View key={key} style={styles.md_img_block}>
                                <Image src={src} style={{ width: w, height: h }} />
                            </View>
                        );
                    }
                    // fallback: strip tags
                    const stripped = html.replace(/<[^>]+>/g, '');
                    if (stripped.trim()) return <Text key={key} style={styles.md_p}>{stripped}</Text>;
                    return null;
                } catch (e) {
                    console.error('Error handling raw HTML node:', e, node);
                    return null;
                }
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
                                {row.children && row.children.map((cell, j) => {
                                    const isHeader = i === 0;
                                    return (
                                        <View
                                            key={key + '-r-' + i + '-c-' + j}
                                            style={isHeader ? styles.md_table_cell_header : styles.md_table_cell}
                                        >
                                            {cell.children ? cell.children.map((c, k) => renderNode(c, key + '-r-' + i + '-c-' + j + '-' + k)) : null}
                                        </View>
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                );

            // remark-math adds nodes of type 'inlineMath' and 'math' for block
            case 'inlineMath':
                return renderMathNode(node.value, false, key);

            case 'math':
                return renderMathNode(node.value, true, key);

            default:
                if (node.children) return <View key={key}>{node.children.map((c, i) => renderNode(c, key + '-' + i))}</View>;
                return null;
        }
    }

    return <View>{renderNode(tree, 'md-root')}</View>;
}

// Watermark (two-line diagonal by default). Config via article.watermarkOpacity, watermarkSize, watermarkMode
function WatermarkElements({ mode = 'diagonal', opacity = 0.32, text = 'Kenshi Webspace', size = 1.0 }) {
    const alphaHex = opacityToHex(opacity);
    const colorWithAlpha = `#111827${alphaHex}`;

    if (mode === 'grid') {
        const elems = [];
        const positions = [
            { top: 80, left: 40, size: 28 * size, rotate: -20 },
            { top: 200, left: 240, size: 28 * size, rotate: -25 },
            { top: 340, left: 90, size: 28 * size, rotate: -18 },
            { top: 480, left: 260, size: 28 * size, rotate: -22 },
            { top: 140, left: 420, size: 28 * size, rotate: -30 },
            { top: 400, left: 420, size: 28 * size, rotate: -28 },
        ];
        positions.forEach((p, i) => {
            elems.push(
                <Text
                    key={'wm-grid-' + i}
                    style={{
                        position: 'absolute',
                        top: p.top,
                        left: p.left,
                        fontSize: p.size,
                        color: colorWithAlpha,
                        transform: `rotate(${p.rotate}deg)`,
                        textAlign: 'center',
                        width: 220,
                    }}
                    fixed
                >
                    {text}
                </Text>
            );
        });
        return <>{elems}</>;
    }

    // diagonal: split into two lines ("Kenshi" / "Webspace") for stable wrapping
    const tokens = String(text || 'Kenshi Webspace').trim().split(/\s+/);
    const first = tokens[0] || 'Kenshi';
    const second = tokens.slice(1).join(' ') || 'Webspace';

    const containerWidth = 900 * (size || 1);
    const firstSize = Math.round(84 * (size || 1));
    const secondSize = Math.round(64 * (size || 1));

    return (
        <View
            fixed
            style={{
                position: 'absolute',
                top: '46%',
                left: '50%',
                width: containerWidth,
                marginLeft: -containerWidth / 2,
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-45deg)',
            }}
        >
            <Text
                fixed
                style={{
                    fontSize: firstSize,
                    color: colorWithAlpha,
                    textAlign: 'center',
                    width: containerWidth,
                    lineHeight: 1,
                }}
            >
                {first}
            </Text>

            <Text
                fixed
                style={{
                    fontSize: secondSize,
                    color: colorWithAlpha,
                    textAlign: 'center',
                    width: containerWidth,
                    marginTop: -8,
                    lineHeight: 1,
                }}
            >
                {second}
            </Text>
        </View>
    );
}

// Main document
export default function ArticlePDFDocument({ article = {} }) {
    const logoPath = article.logoPath || '/logo.png';
    const siteUrl = article.siteUrl || 'kenshiwebspace.example';

    const watermarkMode = article.watermarkMode || 'diagonal';
    const watermarkOpacity = typeof article.watermarkOpacity === 'number' ? article.watermarkOpacity : 0.32;
    const watermarkSize = typeof article.watermarkSize === 'number' ? article.watermarkSize : 1.0;

    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                {/* watermark */}
                <WatermarkElements mode={watermarkMode} opacity={watermarkOpacity} text={article.watermarkText || 'Kenshi Webspace'} size={watermarkSize} />

                {/* header */}
                <View style={styles.headerFixed} fixed>
                    <View style={styles.headerLeft}>
                        <Image src={logoPath} style={styles.logo} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.siteName}>Kenshi Webspace</Text>
                            <Text style={styles.headerTagline}>Thoughtful writing · Clear ideas · Global readers</Text>
                        </View>
                    </View>

                    <View style={styles.headerRightMeta}>
                        <Text style={styles.headerMetaDate}>{formatDate(article.updatedAt || new Date().toISOString())}</Text>
                        <Text style={styles.headerMetaDate}>{article.readTime || 0} min read</Text>
                    </View>

                    <View style={styles.headerDivider} />
                </View>

                {/* footer */}
                <View style={styles.footerFixed} fixed>
                    <View style={styles.footerLeft}>
                        <Text style={styles.footerName}>Kenshi Webspace</Text>
                        <Text style={styles.footerMeta}>A space to think, write, and connect — {siteUrl}</Text>
                    </View>

                    <Text style={styles.footerMeta} render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />

                    <View style={styles.footerCenterLine} />
                </View>

                {/* content */}
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <Text style={styles.badge}>{article.category || 'Uncategorized'}</Text>
                        <Text style={{ fontSize: 9, color: '#6B7280' }}>{article.readTime || 0} min • {formatDate(article.updatedAt || new Date().toISOString())}</Text>
                    </View>

                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{article.title || 'Untitled Article'}</Text>

                        <View style={styles.authorRow}>
                            {article.authorImage ? (
                                <Image src={article.authorImage} style={styles.avatar} />
                            ) : (
                                <View style={[styles.avatar, { backgroundColor: '#EDE9FE', justifyContent: 'center', alignItems: 'center' }]}>
                                    <Text style={{ color: '#4C1D95', fontWeight: 700 }}>
                                        {(article.author?.firstName?.[0] || '') + (article.author?.lastName?.[0] || '')}
                                    </Text>
                                </View>
                            )}

                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.authorName}>
                                    {article.author?.firstName || 'Author'} {article.author?.lastName || ''}
                                </Text>
                                <Text style={styles.authorTagline}>{article.author?.tagline || 'Writer at Kenshi Webspace'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    {/* markdown content */}
                    <View>
                        <MarkdownToPDF_v2 content={article.content || ''} />
                    </View>

                    <View style={styles.separator} />

                    <View style={{ alignItems: 'center', marginTop: 6 }}>
                        <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#0f1724' }}>Share this article</Text>
                        <Text style={{ textAlign: 'center', fontSize: 9, color: '#6B7280', marginTop: 4 }}>{siteUrl}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

// helper date formatter (kept here)
function formatDate(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
        return iso;
    }
}
