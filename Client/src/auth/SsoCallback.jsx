import React, { useEffect, useState } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SsoCallback() {
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        // fallback links after 10 seconds
        const t = setTimeout(() => setShowFallback(true), 10000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/6 rounded-2xl p-8 text-center shadow-2xl"
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/6">
                        <LoaderCircle className="h-8 w-8 animate-spin text-white/90" aria-hidden="true" />
                    </div>

                    <h1 className="text-xl font-semibold text-white">Completing sign-in</h1>

                    <p className="text-sm text-white/80 max-w-xs">
                        Finalizing your single sign-on (SSO) session. You will be redirected automatically when Clerk
                        finishes processing.
                    </p>

                    <div role="status" aria-live="polite" className="mt-2 text-sm text-white/70">
                        <span className="inline-flex items-center gap-2">
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Redirecting you…
                        </span>
                    </div>

                    {showFallback && (
                        <div className="mt-5 w-full">
                            <p className="text-xs text-white/60 mb-2">If you are not redirected, try one of the options below:</p>
                            <div className="flex gap-3 justify-center">
                                <a
                                    href="/auth/login"
                                    className="inline-block px-4 py-2 rounded-lg bg-white/6 text-white text-sm hover:bg-white/8"
                                >
                                    Go to sign in
                                </a>

                                <a
                                    href="/"
                                    className="inline-block px-4 py-2 rounded-lg bg-transparent border border-white/10 text-white text-sm hover:bg-white/5"
                                >
                                    Return home
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* This component finalizes Clerk's redirect-based authentication.*/}
                <AuthenticateWithRedirectCallback />
            </motion.div>
        </div>
    );
}

