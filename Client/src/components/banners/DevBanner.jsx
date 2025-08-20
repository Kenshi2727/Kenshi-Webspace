import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, X } from "lucide-react";

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

export default DevBanner;