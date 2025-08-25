import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, X, AlertTriangle } from "lucide-react";

export default function DevBanner() {
    const [hidden, setHidden] = useState(false);
    if (hidden) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="region"
            aria-label="Development banner"
            className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-100 flex items-center justify-between"
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className="rounded-full bg-amber-100 dark:bg-amber-700 p-2"><Globe className="w-5 h-5" /></div>

                <div className="min-w-0">
                    <div className="font-semibold">Work in progress — Under development</div>
                    <div className="text-sm">Feature & code development will start in <strong>Q2 2026</strong>. Expect changes and intermittent instability.</div>

                    <div className="mt-2 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700 dark:text-amber-200" />
                        <div className="text-sm">
                            <span className="font-medium">Warning:</span> UI may be <strong>inconsistent across screens</strong> — you may see layout shifts, spacing or color differences between devices and breakpoints. Please report visual bugs to the team.
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => { setHidden(true); }}
                    className="text-sm px-3 py-1 border rounded bg-white dark:bg-slate-800"
                >
                    Dismiss
                </button>

                <button
                    onClick={() => { setHidden(true); }}
                    className="p-1"
                    aria-label="Close banner"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
