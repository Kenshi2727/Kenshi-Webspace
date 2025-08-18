import React, { useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import {
    Play,
    Save,
    Share2,
    GitBranch,
    Globe,
    Award,
    ThumbsUp,
    MessageCircle,
    X
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";

// ---------- Small utilities ----------
const LS = {
    get(key, fallback) {
        try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch { }
    }
};

function uid(prefix = "id") { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`; }

// ---------- Toast (very small) ----------
function useToasts() {
    const [toasts, setToasts] = useState([]);
    function push(text, opts = {}) {
        const t = { id: uid('t'), text, ...opts };
        setToasts(s => [t, ...s]);
        setTimeout(() => setToasts(s => s.filter(x => x.id !== t.id)), opts.duration || 3500);
    }
    return { toasts, push };
}

function Toasts({ toasts }) {
    return (
        <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map(t => (
                    <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="bg-white dark:bg-slate-800 border shadow-md p-3 rounded-md text-sm">
                        {t.text}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

// ---------- Live Sandbox (with resizable splitter & mobile-friendly) ----------
function LiveSandbox({ pushToast }) {
    const [tab, setTab] = useState('html');
    const [html, setHtml] = useState(LS.get('sandbox_html', '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <title>Kenshi Sandbox</title>\n  </head>\n  <body>\n    <h1>Hello Kenshi Webspace!</h1>\n  </body>\n</html>'));
    const [css, setCss] = useState(LS.get('sandbox_css', 'body { font-family: Inter, system-ui; padding: 24px; background: linear-gradient(180deg,#fbfbfd,#f3f4f6); } h1 { color: #0f172a; }'));
    const [js, setJs] = useState(LS.get('sandbox_js', 'console.log("hello from ks sandbox");'));
    const [autoRun, setAutoRun] = useState(true);
    const iframeRef = useRef(null);

    // resizable splitter
    const containerRef = useRef(null);
    const [leftPct, setLeftPct] = useState(55);
    const draggingRef = useRef(false);

    // mobile state
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
    const [mobileView, setMobileView] = useState('editor'); // 'editor' | 'preview'

    useEffect(() => {
        function onResize() { setIsMobile(window.innerWidth < 640); }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => { LS.set('sandbox_html', html); }, [html]);
    useEffect(() => { LS.set('sandbox_css', css); }, [css]);
    useEffect(() => { LS.set('sandbox_js', js); }, [js]);

    const buildSrcDoc = () => `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>${css}</style>
</head>
<body>
${html}
<script>
try{ (function(){ ${js} })(); } catch(e) { document.body.insertAdjacentHTML('beforeend', '<pre style="color:red;">'+e.toString()+'</pre>'); }
</script>
</body>
</html>`;

    const run = () => {
        const src = buildSrcDoc();
        const iframe = iframeRef.current;
        if (iframe) iframe.srcdoc = src;
        pushToast('Preview updated');
    };

    useEffect(() => { if (autoRun) run(); }, [html, css, js]);

    function saveSnippet() {
        const snippets = LS.get('sandbox_snippets', []);
        const item = { id: uid('snp'), html, css, js, createdAt: Date.now() };
        snippets.unshift(item);
        LS.set('sandbox_snippets', snippets);
        pushToast('Snippet saved locally');
    }

    async function shareSnippet() {
        const payload = btoa(unescape(encodeURIComponent(JSON.stringify({ html, css, js }))));
        const url = `${location.origin}${location.pathname}?ksn=${payload}`;
        try { await navigator.clipboard.writeText(url); pushToast('Share link copied to clipboard'); } catch { pushToast('Unable to copy link'); }
    }

    // load from query param if present (only once)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const k = params.get('ksn');
        if (k) {
            try {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(k))));
                setHtml(decoded.html || ''); setCss(decoded.css || ''); setJs(decoded.js || '');
                pushToast('Loaded shared snippet');
            } catch { /* ignore */ }
        }
    }, []);

    // splitter handlers
    useEffect(() => {
        function onMove(e) {
            if (!draggingRef.current) return;
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = e.clientX ?? (e.touches && e.touches[0].clientX);
            const pct = Math.min(85, Math.max(25, ((x - rect.left) / rect.width) * 100));
            setLeftPct(pct);
        }
        function up() { draggingRef.current = false; document.body.style.cursor = ''; }
        window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', up);
        window.addEventListener('touchmove', onMove); window.addEventListener('touchend', up);
        return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', up); window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', up); };
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white w-10 h-10 flex items-center justify-center shadow-lg">KS</div>
                    <div>
                        <div className="text-sm font-semibold">Live Sandbox</div>
                        <div className="text-xs text-gray-500">Edit HTML / CSS / JS — resizable preview</div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={autoRun} onChange={e => setAutoRun(e.target.checked)} /> Auto-run</label>
                    <button onClick={run} className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-indigo-600 text-white hover:scale-105 transition-transform"><Play className="w-4 h-4" /> Run</button>
                    <button onClick={saveSnippet} className="inline-flex items-center gap-2 rounded-md px-3 py-2 border hover:bg-gray-50 dark:hover:bg-slate-800 transition"><Save className="w-4 h-4" /> Save</button>
                    <button onClick={shareSnippet} className="inline-flex items-center gap-2 rounded-md px-3 py-2 border hover:bg-gray-50 dark:hover:bg-slate-800 transition"><Share2 className="w-4 h-4" /> Share</button>
                </div>
            </div>

            {/* Mobile view toggle - moved OUTSIDE editor column so user can switch back from preview */}
            {isMobile && (
                <div className="sm:hidden flex items-center gap-2">
                    <button aria-label="Show editor" onClick={() => setMobileView('editor')} className={`flex-1 text-sm px-3 py-2 rounded ${mobileView === 'editor' ? 'bg-indigo-600 text-white' : 'border bg-white dark:bg-slate-800'}`}>Editor</button>
                    <button aria-label="Show preview" onClick={() => setMobileView('preview')} className={`flex-1 text-sm px-3 py-2 rounded ${mobileView === 'preview' ? 'bg-indigo-600 text-white' : 'border bg-white dark:bg-slate-800'}`}>Preview</button>
                </div>
            )}

            <div ref={containerRef} className="relative rounded-lg overflow-hidden border bg-white dark:bg-slate-900 shadow-sm flex flex-col sm:flex-row" style={{ minHeight: 320 }}>
                {/* Editor column */}
                <div style={{ width: isMobile ? '100%' : `${leftPct}%` }} className={`p-2 ${isMobile && mobileView !== 'editor' ? 'hidden' : ''}`}>
                    {/* editor topic header (kept inside editor but toggle moved outside for mobile) */}
                    <div className="flex items-center gap-2 mb-2">
                        {['html', 'css', 'js'].map(t => (
                            <button key={t} onClick={() => setTab(t)} className={`px-2 py-1 text-xs rounded ${tab === t ? 'bg-slate-100 dark:bg-slate-800 font-semibold' : 'hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
                                {t.toUpperCase()}
                            </button>
                        ))}
                        <div className="ml-auto text-xs text-gray-500">Editor</div>
                    </div>

                    <div className="h-[60vh] sm:h-[52vh] rounded-md overflow-hidden border">
                        <Editor height="100%" language={tab === 'html' ? 'html' : tab === 'css' ? 'css' : 'javascript'} value={tab === 'html' ? html : tab === 'css' ? css : js} onChange={(v) => { if (tab === 'html') setHtml(v || ''); else if (tab === 'css') setCss(v || ''); else setJs(v || ''); }} options={{ minimap: { enabled: false }, fontSize: 13 }} />
                    </div>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <button onClick={() => { navigator.clipboard?.writeText(tab === 'html' ? html : tab === 'css' ? css : js); pushToast('Copied editor content'); }} className="text-sm px-3 py-1 border rounded">Copy</button>
                        <button onClick={() => { setHtml('<!doctype html>\n<html>\n  <body>\n    <h1>Kenshi Sandbox</h1>\n  </body>\n</html>'); setCss(''); setJs(''); pushToast('Reset to minimal template'); }} className="text-sm px-3 py-1 border rounded">Reset</button>
                    </div>
                </div>

                {/* splitter (hidden on mobile) */}
                <div onMouseDown={() => { if (!isMobile) { draggingRef.current = true; document.body.style.cursor = 'col-resize'; } }} onTouchStart={() => { if (!isMobile) draggingRef.current = true; }} style={{ width: 8, cursor: isMobile ? 'default' : 'col-resize' }} className={`hidden sm:flex items-center justify-center bg-transparent`}>
                    <div className="w-px h-full bg-gradient-to-b from-transparent to-gray-200 opacity-60" />
                </div>

                {/* Preview column */}
                <div style={{ width: isMobile ? '100%' : `${100 - leftPct}%` }} className={`p-2 ${isMobile && mobileView !== 'preview' ? 'hidden' : ''} ${isMobile ? '' : 'border-l'} bg-slate-50 dark:bg-slate-800`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold">Preview</div>
                        <div className="text-xs text-gray-500">Sandbox iframe</div>
                    </div>
                    <div className="rounded-md overflow-hidden border bg-white dark:bg-slate-900">
                        {/* Note: srcDoc is only set by run()/autoRun - keeping initial content here for SSR-friendly behaviour */}
                        <iframe ref={iframeRef} title="preview" className="w-full h-[60vh] sm:h-[52vh] bg-white" sandbox="allow-scripts allow-same-origin" srcDoc={buildSrcDoc()} />
                    </div>
                </div>
            </div>

            <SavedSnippets onLoad={(arr) => {
                // Normalise to array: previous implementation expected an array
                if (Array.isArray(arr) && arr.length) {
                    setHtml(arr[0].html);
                    setCss(arr[0].css);
                    setJs(arr[0].js);
                    pushToast('Loaded saved snippet');
                }
            }} pushToast={pushToast} />
        </div>
    );
}

function SavedSnippets({ onLoad, pushToast }) {
    const [list, setList] = useState(LS.get('sandbox_snippets', []));

    function remove(id) { const next = list.filter(x => x.id !== id); setList(next); LS.set('sandbox_snippets', next); pushToast?.('Snippet deleted'); }

    function load(id) {
        const item = list.find(x => x.id === id);
        if (item) {
            // pass an array (keeps backward compatibility with earlier onLoad usage)
            onLoad([item]);
            const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(item))));
            history.replaceState(null, '', `${location.pathname}?ksn=${encoded}`);
            location.reload();
        }
    }

    async function copyLink(item) { const payload = btoa(unescape(encodeURIComponent(JSON.stringify(item)))); const url = `${location.origin}${location.pathname}?ksn=${payload}`; try { await navigator.clipboard.writeText(url); pushToast?.('Snippet link copied'); } catch { pushToast?.('Failed to copy'); } }

    if (!list.length) return null;
    return (
        <div className="space-y-2">
            <h4 className="font-semibold">Saved Snippets</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map(s => (
                    <div key={s.id} className="p-3 border rounded bg-white dark:bg-slate-800 shadow-sm hover:scale-[1.01] transition-transform">
                        <div className="flex items-center justify-between">
                            <div className="text-sm">{new Date(s.createdAt).toLocaleString()}</div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => load(s.id)} className="text-xs px-2 py-1 border rounded">Load</button>
                                <button onClick={() => copyLink(s)} className="text-xs px-2 py-1 border rounded">Copy Link</button>
                                <button onClick={() => remove(s.id)} className="text-xs px-2 py-1 border rounded text-red-500">Delete</button>
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 line-clamp-3">{s.html?.slice(0, 120) || '—'}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------- Interactive Resume ----------
function InteractiveResume({ pushToast }) {
    const [username, setUsername] = useState(LS.get('resume_last_github', ''));
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchGitHub(user) {
        if (!user) return pushToast?.('Enter a username');
        setLoading(true);
        try {
            const p = await fetch(`https://api.github.com/users/${user}`).then(r => r.json());
            const r = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`).then(r => r.json());
            setProfile(p && !p.message ? p : null);
            setRepos(Array.isArray(r) ? r : []);
            LS.set('resume_last_github', user);
            pushToast?.('GitHub profile loaded');
        } catch (e) { console.error(e); pushToast?.('Failed to fetch GitHub'); }
        setLoading(false);
    }

    useEffect(() => { if (username) fetchGitHub(username); }, []);

    const languages = useMemo(() => {
        const map = {};
        repos.forEach(repo => { if (repo.language) map[repo.language] = (map[repo.language] || 0) + 1; });
        return Object.entries(map).sort((a, b) => b[1] - a[1]);
    }, [repos]);

    function importLinkedInManual() { pushToast('Manual LinkedIn import is a demo — requires backend'); }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
                <div className="flex gap-2 flex-wrap">
                    <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="GitHub username" />
                    <Button onClick={() => fetchGitHub(username)}>{loading ? 'Loading...' : 'Fetch'}</Button>
                </div>

                {profile && (
                    <div className="p-4 bg-white dark:bg-slate-800 border rounded shadow-sm">
                        <div className="flex items-center gap-4">
                            <img src={profile.avatar_url} alt="avatar" className="w-16 h-16 rounded-full shadow" />
                            <div>
                                <div className="flex items-center gap-2"><h3 className="text-lg font-semibold">{profile.name || profile.login}</h3><a className="text-sm text-blue-600" href={profile.html_url} target="_blank" rel="noreferrer">@{profile.login}</a></div>
                                <p className="text-sm text-gray-600">{profile.bio}</p>
                                <div className="mt-2 text-sm text-gray-500">{profile.followers} followers • {profile.following} following</div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Top Languages</h4>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {languages.map(([lang, cnt]) => (<Badge key={lang}>{lang} • {cnt}</Badge>))}
                            </div>
                        </div>

                        <div className="mt-4">
                            <h4 className="font-semibold">Pinned / Recent Repos</h4>
                            <div className="grid gap-2 mt-2">
                                {repos.slice(0, 8).map(r => (
                                    <div key={r.id} className="p-3 border rounded flex items-start justify-between bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition">
                                        <div>
                                            <a href={r.html_url} className="font-semibold text-blue-600" target="_blank" rel="noreferrer">{r.name}</a>
                                            <div className="text-sm text-gray-500">{r.description}</div>
                                        </div>
                                        <div className="text-xs text-gray-500">{r.stargazers_count}★</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-4 bg-white dark:bg-slate-800 border rounded shadow-sm">
                    <h4 className="font-semibold">LinkedIn / CV Import</h4>
                    <p className="text-sm text-gray-600">LinkedIn's official import requires OAuth & server-side token handling. For demo you can:</p>
                    <ul className="list-disc ml-4 mt-2 text-sm text-gray-600">
                        <li>Paste your public profile summary manually</li>
                        <li>Upload your resume (server-side parsing with Tika or similar)</li>
                        <li>Use LinkedIn's API with a backend that stores the OAuth token securely</li>
                    </ul>
                    <div className="mt-2 flex gap-2 flex-wrap">
                        <Button onClick={() => importLinkedInManual()}>Start Manual Import</Button>
                        <Button variant="ghost" onClick={() => pushToast?.('Open resume editor (demo)')}>Edit Resume</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 border rounded shadow-sm">
                    <h4 className="font-semibold">Resume Preview</h4>
                    <div className="text-sm text-gray-700 dark:text-gray-200 mt-2">
                        <p><strong>Name:</strong> {profile?.name || '—'}</p>
                        <p><strong>Bio:</strong> {profile?.bio || '—'}</p>
                        <p><strong>Location:</strong> {profile?.location || '—'}</p>
                        <p><strong>Top repo:</strong> {repos[0]?.name || '—'}</p>
                    </div>
                    <div className="mt-3">
                        <Button onClick={() => pushToast?.('Export resume PDF (demo)')}>Export PDF</Button>
                    </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 border rounded shadow-sm">
                    <h4 className="font-semibold">Quick Actions</h4>
                    <div className="flex flex-col gap-2 mt-2">
                        <Button onClick={() => pushToast?.('Open contact modal (demo)')}>Contact</Button>
                        <Button variant="outline" onClick={() => pushToast?.('Link GitHub to profile (demo)')}><GitBranch className="mr-2" />Connect GitHub</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------- Research Wall ----------
function ResearchWall({ pushToast }) {
    const [posts, setPosts] = useState(LS.get('rw_posts', []));
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => { LS.set('rw_posts', posts); }, [posts]);

    function createPost() {
        if (!title.trim()) return pushToast?.('Give a title');
        const p = { id: uid('post'), title, desc, votes: 0, comments: [], createdAt: Date.now() };
        setPosts([p, ...posts]); setTitle(''); setDesc(''); setOpen(false); pushToast?.('Idea published');
    }

    function upvote(id) { setPosts(posts.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p)); }
    function addComment(id, text) { setPosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, { id: uid('c'), text, at: Date.now() }] } : p)); pushToast?.('Comment added'); }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Research Wall 2.0</h3>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setOpen(true)}><PlusIcon /> New Idea</Button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="p-4 border rounded bg-white dark:bg-slate-800 shadow-sm">
                        <div className="flex flex-col gap-2">
                            <Input placeholder="Idea title" value={title} onChange={e => setTitle(e.target.value)} />
                            <textarea className="p-2 border rounded" rows={4} placeholder="Describe your idea" value={desc} onChange={e => setDesc(e.target.value)} />
                            <div className="flex gap-2 justify-end">
                                <Button onClick={createPost}>Publish</Button>
                                <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-3">
                {posts.length === 0 && (
                    <div className="p-4 border rounded bg-white dark:bg-slate-800 text-sm">No ideas yet — be the first to post.</div>
                )}

                {posts.map(p => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 border rounded bg-white dark:bg-slate-800 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h4 className="font-semibold">{p.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => { upvote(p.id); pushToast?.('Upvoted'); }}><ThumbsUp className="w-4 h-4" /> {p.votes}</div>
                                    <div className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {p.comments.length}</div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleString()}</div>
                        </div>

                        <CommentBox onAdd={(text) => addComment(p.id, text)} comments={p.comments} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function PlusIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><path d="M12 5v14M5 12h14" /></svg> }

function CommentBox({ onAdd, comments }) {
    const [text, setText] = useState('');
    return (
        <div className="mt-3">
            <div className="flex gap-2">
                <input className="flex-1 p-2 border rounded" placeholder="Add a comment" value={text} onChange={e => setText(e.target.value)} />
                <button className="px-3 py-2 rounded bg-indigo-600 text-white" onClick={() => { if (text.trim()) { onAdd(text); setText(''); } }}>Send</button>
            </div>
            <div className="mt-2 space-y-2 text-sm">
                {comments.map(c => (<div key={c.id} className="p-2 bg-gray-50 dark:bg-slate-700 rounded">{c.text}</div>))}
            </div>
        </div>
    );
}

// ---------- Achievements ----------
function Achievements({ refreshSignal }) {
    const [awards, setAwards] = useState(LS.get('ks_awards', []));

    useEffect(() => { LS.set('ks_awards', awards); }, [awards]);

    useEffect(() => {
        const snippets = LS.get('sandbox_snippets', []).length;
        const posts = LS.get('rw_posts', []).length;
        const newAwards = [];
        if (snippets >= 1) newAwards.push({ id: 'a_snip', name: 'Snippet Saver', desc: 'Saved your first snippet', icon: '💾' });
        if (posts >= 1) newAwards.push({ id: 'a_idea', name: 'Idea Starter', desc: 'Published first idea', icon: '✨' });
        if (snippets >= 3) newAwards.push({ id: 'a_collection', name: 'Collector', desc: 'Saved 3+ snippets', icon: '📚' });
        setAwards(prev => { const merged = [...prev]; newAwards.forEach(n => { if (!merged.find(m => m.id === n.id)) merged.push(n); }); return merged; });
    }, [refreshSignal]);

    if (!awards.length) return (<div className="p-4 border rounded text-sm">No achievements yet — do things to earn badges!</div>);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {awards.map(a => (
                <motion.div key={a.id} whileHover={{ scale: 1.03 }} className="p-3 border rounded bg-white dark:bg-slate-800 flex items-start gap-3 shadow-sm">
                    <div className="text-2xl">{a.icon}</div>
                    <div>
                        <div className="font-semibold">{a.name}</div>
                        <div className="text-sm text-gray-500">{a.desc}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function DevBanner() {
    const [hidden, setHidden] = useState(false);
    if (hidden) return null;
    return (
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="p-3 rounded-md bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-100 dark:bg-amber-700 p-2"><Globe className="w-5 h-5" /></div>
                <div>
                    <div className="font-semibold">Work in progress — Under development</div>
                    <div className="text-sm">Feature & code development will start in <strong>Q2 2026</strong>. Expect changes and intermittent instability.</div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={() => { setHidden(true) }} className="text-sm px-3 py-1 border rounded bg-white dark:bg-slate-800">Dismiss</button>
                <button onClick={() => { setHidden(true) }} className="p-1"><X className="w-4 h-4" /></button>
            </div>
        </motion.div>
    );
}

// ---------- Page wrapper ----------
export default function CodePage() {
    const [tab, setTab] = useState('sandbox');
    const [refresh, setRefresh] = useState(0);
    const { toasts, push } = useToasts();

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900">
            {/* animated blobs */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <svg className="absolute left-[-10%] top-0 w-[60vw] h-[60vh] opacity-20" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(300,300)">
                        <path fill="url(#g)" d="M120,-122C155,-86,178,-43,180,1C182,46,162,92,126,125C90,158,39,178,-7,179C-53,180,-106,162,-137,129C-168,97,-176,50,-177,2C-177,-46,-169,-92,-136,-129C-103,-166,-51,-192,-6,-186C39,-180,78,-142,120,-122Z" />
                        <defs>
                            <linearGradient id="g" x1="0" x2="1">
                                <stop offset="0" stopColor="#7c3aed" />
                                <stop offset="1" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </g>
                </svg>
            </div>

            <div className="max-w-6xl mx-auto space-y-4">
                <DevBanner />

                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Kenshi Webspace — Interactive Features</h1>
                        <p className="text-sm text-gray-600">Live sandbox, resume import, research wall & achievements — polished</p>
                    </div>

                    <nav className="flex gap-2 overflow-x-auto whitespace-nowrap">
                        {[
                            ['sandbox', 'Sandbox'],
                            ['resume', 'Resume'],
                            ['wall', 'Research Wall'],
                            ['achievements', 'Achievements']
                        ].map(([k, label]) => (
                            <button key={k} onClick={() => setTab(k)} className={`px-3 py-1 rounded-md ${tab === k ? 'bg-indigo-600 text-white' : 'border bg-white dark:bg-slate-800'}`}>
                                {label}
                            </button>
                        ))}
                    </nav>
                </header>

                <main>
                    <AnimatePresence exitBeforeEnter>
                        {tab === 'sandbox' && (
                            <motion.div key="sandbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <LiveSandbox pushToast={push} />
                            </motion.div>
                        )}

                        {tab === 'resume' && (
                            <motion.div key="resume" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <InteractiveResume pushToast={push} />
                            </motion.div>
                        )}

                        {tab === 'wall' && (
                            <motion.div key="wall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <ResearchWall pushToast={push} />
                            </motion.div>
                        )}

                        {tab === 'achievements' && (
                            <motion.div key="achievements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Achievements refreshSignal={refresh} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <footer className="text-sm text-gray-500">To do(dev): Replace localStorage persistence with your backend (Supabase / Firebase / Postgres + API) and wire OAuth for LinkedIn/GitHub for full integration.</footer>
            </div>

            <Toasts toasts={toasts} />
        </div>
    );
}
