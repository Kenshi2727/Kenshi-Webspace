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
    X,
    Sun,
    Moon,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";

// ------------------ Utilities ------------------
const LS = {
    get(key, fallback) {
        try {
            const v = localStorage.getItem(key);
            return v ? JSON.parse(v) : fallback;
        } catch {
            return fallback;
        }
    },
    set(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch { }
    }
};

function uid(prefix = "id") { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`; }

// ------------------ Toasts ------------------
function useToasts() {
    const [toasts, setToasts] = useState([]);
    function push(text, opts = {}) {
        const t = { id: uid('t'), text, ...opts };
        setToasts(s => [t, ...s]);
        setTimeout(() => setToasts(s => s.filter(x => x.id !== t.id)), opts.duration || 3600);
    }
    return { toasts, push };
}

function Toasts({ toasts }) {
    return (
        <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3 w-[320px]">
            <AnimatePresence>
                {toasts.map(t => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg text-sm"
                    >
                        {t.text}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

// ------------------ Live Sandbox (revamped UI) ------------------
function LiveSandbox({ pushToast }) {
    const [tab, setTab] = useState('html');
    const [html, setHtml] = useState(LS.get('sandbox_html', '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <title>Kenshi Sandbox</title>\n  </head>\n  <body>\n    <h1>Hello Kenshi Webspace!</h1>\n  </body>\n</html>'));
    const [css, setCss] = useState(LS.get('sandbox_css', 'body { font-family: Inter, system-ui; padding: 24px; background: linear-gradient(180deg,#fbfbfd,#f3f4f6); } h1 { color: #0f172a; }'));
    const [js, setJs] = useState(LS.get('sandbox_js', 'console.log("hello from ks sandbox");'));
    const [autoRun, setAutoRun] = useState(true);
    const iframeRef = useRef(null);

    // splitter
    const containerRef = useRef(null);
    const [leftPct, setLeftPct] = useState(55);
    const draggingRef = useRef(false);

    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
    const [mobileView, setMobileView] = useState('editor');

    useEffect(() => {
        function onResize() { setIsMobile(window.innerWidth < 640); }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => { LS.set('sandbox_html', html); }, [html]);
    useEffect(() => { LS.set('sandbox_css', css); }, [css]);
    useEffect(() => { LS.set('sandbox_js', js); }, [js]);

    const buildSrcDoc = () => `<!doctype html>\n<html>\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width,initial-scale=1" />\n<style>${css}</style>\n</head>\n<body>\n${html}\n<script>\ntry{ (function(){ ${js} })(); } catch(e) { document.body.insertAdjacentHTML('beforeend', '<pre style="color:red;">'+e.toString()+'</pre>'); }\n</script>\n</body>\n</html>`;

    const run = () => {
        const src = buildSrcDoc();
        const iframe = iframeRef.current;
        if (iframe) iframe.srcdoc = src;
        pushToast('Preview updated');
    };

    useEffect(() => { if (autoRun) run(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [html, css, js]);

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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const k = params.get('ksn');
        if (k) {
            try {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(k))));
                setHtml(decoded.html || ''); setCss(decoded.css || ''); setJs(decoded.js || '');
                pushToast('Loaded shared snippet');
            } catch { }
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
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.06, rotate: 3 }} className="rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 text-white w-12 h-12 flex items-center justify-center shadow-2xl">KS</motion.div>
                    <div>
                        <div className="text-sm font-semibold">Live Sandbox</div>
                        <div className="text-xs text-gray-500">Edit HTML · CSS · JS — instant preview</div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-sm select-none"><input type="checkbox" checked={autoRun} onChange={e => setAutoRun(e.target.checked)} className="accent-indigo-600" /> <span className="text-xs">Auto-run</span></label>

                    <div className="flex items-center gap-2">
                        <Button onClick={run} className="inline-flex items-center gap-2"><Play className="w-4 h-4" /> Run</Button>
                        <Button variant="ghost" onClick={saveSnippet} className="inline-flex items-center gap-2"><Save className="w-4 h-4" /> Save</Button>
                        <Button variant="ghost" onClick={shareSnippet} className="inline-flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                    </div>
                </div>
            </div>

            {/* mobile toggles */}
            {isMobile && (
                <div className="flex gap-2">
                    <Button onClick={() => setMobileView('editor')} size="sm" variant={mobileView === 'editor' ? 'default' : 'ghost'}>Editor</Button>
                    <Button onClick={() => setMobileView('preview')} size="sm" variant={mobileView === 'preview' ? 'default' : 'ghost'}>Preview</Button>
                </div>
            )}

            <div ref={containerRef} className="relative rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl flex flex-col sm:flex-row" style={{ minHeight: 360 }}>
                <div style={{ width: isMobile ? '100%' : `${leftPct}%` }} className={`p-3 transition-all duration-300 ${isMobile && mobileView !== 'editor' ? 'hidden' : ''}`}>
                    <div className="flex items-center gap-2 mb-3">
                        {['html', 'css', 'js'].map(t => (
                            <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 text-xs rounded-full ${tab === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>
                                {t.toUpperCase()}
                            </button>
                        ))}
                        <div className="ml-auto text-xs text-gray-500">Editor</div>
                    </div>

                    <div className="rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800" style={{ height: isMobile ? 360 : '52vh' }}>
                        <Editor height="100%" language={tab === 'html' ? 'html' : tab === 'css' ? 'css' : 'javascript'} value={tab === 'html' ? html : tab === 'css' ? css : js} onChange={(v) => { if (tab === 'html') setHtml(v || ''); else if (tab === 'css') setCss(v || ''); else setJs(v || ''); }} options={{ minimap: { enabled: false }, fontSize: 13 }} />
                    </div>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <Button variant="outline" size="sm" onClick={() => { navigator.clipboard?.writeText(tab === 'html' ? html : tab === 'css' ? css : js); pushToast('Copied editor content'); }}>Copy</Button>
                        <Button variant="ghost" size="sm" onClick={() => { setHtml('<!doctype html>\n<html>\n  <body>\n    <h1>Kenshi Sandbox</h1>\n  </body>\n</html>'); setCss(''); setJs(''); pushToast('Reset to minimal template'); }}>Reset</Button>
                    </div>
                </div>

                {/* splitter */}
                <div onMouseDown={() => { if (!isMobile) { draggingRef.current = true; document.body.style.cursor = 'col-resize'; } }} onTouchStart={() => { if (!isMobile) draggingRef.current = true; }} style={{ width: 12, cursor: isMobile ? 'default' : 'col-resize' }} className={`hidden sm:flex items-center justify-center bg-transparent`}>
                    <div className="w-0.5 h-12 rounded-full bg-gradient-to-b from-transparent to-slate-300/40" />
                </div>

                <div style={{ width: isMobile ? '100%' : `${100 - leftPct}%` }} className={`p-3 ${isMobile && mobileView !== 'preview' ? 'hidden' : ''} ${isMobile ? '' : 'border-l border-slate-100 dark:border-slate-800'} bg-slate-50 dark:bg-slate-900`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-semibold">Preview</div>
                        <div className="text-xs text-gray-500">Sandbox iframe</div>
                    </div>

                    <div className="rounded-xl overflow-hidden border bg-white dark:bg-slate-900 shadow-inner">
                        <iframe ref={iframeRef} title="preview" className="w-full h-[52vh] sm:h-[52vh] bg-white" sandbox="allow-scripts allow-same-origin" srcDoc={buildSrcDoc()} />
                    </div>
                </div>
            </div>

            <SavedSnippets onLoad={(arr) => {
                if (Array.isArray(arr) && arr.length) {
                    setHtml(arr[0].html);
                    setCss(arr[0].css);
                    setJs(arr[0].js);
                    pushToast('Loaded saved snippet');
                }
            }} pushToast={pushToast} />
        </motion.div>
    );
}

// ------------------ Saved Snippets (minor polish) ------------------
function SavedSnippets({ onLoad, pushToast }) {
    const [list, setList] = useState(LS.get('sandbox_snippets', []));

    function remove(id) { const next = list.filter(x => x.id !== id); setList(next); LS.set('sandbox_snippets', next); pushToast?.('Snippet deleted'); }

    function load(id) {
        const item = list.find(x => x.id === id);
        if (item) {
            onLoad([item]);
            const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(item))));
            history.replaceState(null, '', `${location.pathname}?ksn=${encoded}`);
            location.reload();
        }
    }

    async function copyLink(item) { const payload = btoa(unescape(encodeURIComponent(JSON.stringify(item)))); const url = `${location.origin}${location.pathname}?ksn=${payload}`; try { await navigator.clipboard.writeText(url); pushToast?.('Snippet link copied'); } catch { pushToast?.('Failed to copy'); } }

    if (!list.length) return null;
    return (
        <div className="space-y-3">
            <h4 className="font-semibold">Saved Snippets</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map(s => (
                    <motion.div key={s.id} whileHover={{ scale: 1.02 }} className="p-3 border rounded-2xl bg-white dark:bg-slate-800 shadow-md">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-600 dark:text-slate-200">{new Date(s.createdAt).toLocaleString()}</div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => load(s.id)} className="text-xs px-2 py-1 border rounded">Load</button>
                                <button onClick={() => copyLink(s)} className="text-xs px-2 py-1 border rounded">Copy Link</button>
                                <button onClick={() => remove(s.id)} className="text-xs px-2 py-1 border rounded text-red-500">Delete</button>
                            </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 line-clamp-3 break-words">{s.html?.slice(0, 180) || '—'}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ------------------ Interactive Resume (styling polish) ------------------
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <div className="flex gap-3 items-center">
                    <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="GitHub username" />
                    <Button onClick={() => fetchGitHub(username)}>{loading ? 'Loading...' : 'Fetch'}</Button>
                </div>

                {profile && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-white dark:bg-slate-800 border rounded-2xl shadow-md">
                        <div className="flex items-center gap-4">
                            <img src={profile.avatar_url} alt="avatar" className="w-20 h-20 rounded-full shadow-lg" />
                            <div>
                                <div className="flex items-center gap-2"><h3 className="text-xl font-semibold">{profile.name || profile.login}</h3><a className="text-sm text-indigo-600" href={profile.html_url} target="_blank" rel="noreferrer">@{profile.login}</a></div>
                                <p className="text-sm text-gray-600 mt-1">{profile.bio}</p>
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
                            <div className="grid gap-3 mt-3">
                                {repos.slice(0, 8).map(r => (
                                    <div key={r.id} className="p-3 border rounded-lg flex items-start justify-between bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition">
                                        <div>
                                            <a href={r.html_url} className="font-semibold text-indigo-600" target="_blank" rel="noreferrer">{r.name}</a>
                                            <div className="text-sm text-gray-500">{r.description}</div>
                                        </div>
                                        <div className="text-xs text-gray-500">{r.stargazers_count}★</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="p-4 bg-white dark:bg-slate-800 border rounded-2xl shadow-md">
                    <h4 className="font-semibold">LinkedIn / CV Import</h4>
                    <p className="text-sm text-gray-600">LinkedIn's official import requires OAuth & server-side token handling. For demo you can:</p>
                    <ul className="list-disc ml-4 mt-2 text-sm text-gray-600">
                        <li>Paste your public profile summary manually</li>
                        <li>Upload your resume (server-side parsing with Tika or similar)</li>
                        <li>Use LinkedIn's API with a backend that stores the OAuth token securely</li>
                    </ul>
                    <div className="mt-3 flex gap-2">
                        <Button onClick={() => importLinkedInManual()}>Start Manual Import</Button>
                        <Button variant="ghost" onClick={() => pushToast?.('Open resume editor (demo)')}>Edit Resume</Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 border rounded-2xl shadow-md">
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

                <div className="p-4 bg-white dark:bg-slate-800 border rounded-2xl shadow-md">
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

// ------------------ Research Wall (styling) ------------------
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
                <h3 className="text-lg font-semibold">Research Wall</h3>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setOpen(true)}><PlusIcon /> New Idea</Button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="p-4 border rounded-2xl bg-white dark:bg-slate-800 shadow-md">
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
                    <div className="p-4 border rounded-2xl bg-white dark:bg-slate-800 text-sm">No ideas yet — be the first to post.</div>
                )}

                {posts.map(p => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 border rounded-2xl bg-white dark:bg-slate-800 shadow-md">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h4 className="font-semibold">{p.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
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

// ------------------ Achievements ------------------
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

    if (!awards.length) return (<div className="p-4 border rounded-2xl text-sm">No achievements yet — do things to earn badges!</div>);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {awards.map(a => (
                <motion.div key={a.id} whileHover={{ scale: 1.03 }} className="p-4 border rounded-2xl bg-white dark:bg-slate-800 flex items-start gap-3 shadow-md">
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
        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-100 flex items-center justify-between">
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

// ------------------ Page wrapper (improved layout + header) ------------------
export default function CodePage() {
    const [tab, setTab] = useState('sandbox');
    const [refresh, setRefresh] = useState(0);
    const { toasts, push } = useToasts();

    return (
        <div className="min-h-screen p-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900">
            {/* subtle animated blob */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <svg className="absolute left-[-8%] top-0 w-[55vw] h-[55vh] opacity-18" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
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

            <div className="max-w-7xl mx-auto space-y-6">
                <DevBanner />

                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <motion.div initial={{ scale: 0.96 }} animate={{ scale: 1 }} whileHover={{ scale: 1.05 }} className="rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-4 py-3 shadow-2xl">
                            <div className="font-bold">Kenshi Webspace</div>
                            <div className="text-xs opacity-90">Interactive Features</div>
                        </motion.div>

                        <div>
                            <h1 className="text-2xl font-extrabold">Interactive Playground & Tools</h1>
                            <p className="text-sm text-gray-600">Live sandbox, resume import, research wall & achievements — polished UI with motion and depth.</p>
                        </div>
                    </div>

                    <nav className="flex gap-2 items-center">
                        {[['sandbox', 'Sandbox'], ['resume', 'Resume'], ['wall', 'Research Wall'], ['achievements', 'Achievements']].map(([k, label]) => (
                            <motion.button key={k} onClick={() => setTab(k)} layout whileTap={{ scale: 0.98 }} className={`px-4 py-2 rounded-full ${tab === k ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 border'}`}>
                                {label}
                            </motion.button>
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

                <footer className="text-sm text-gray-500">To do: Replace localStorage persistence with your backend and wire OAuth for LinkedIn/GitHub for full integration.</footer>
            </div>

            <Toasts toasts={toasts} />
        </div>
    );
}
