import React from 'react'
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

function MaintenancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-6 text-white">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-xl backdrop-blur-md border border-white/20"
            >
                <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-yellow-400 animate-pulse" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4">Feature Under Development</h1>
                <p className="text-lg text-white/80 mb-6">
                    We're working hard to bring this feature to you soon.
                    Thanks for your patience!
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-yellow-400 text-indigo-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition"
                    onClick={() => window.location.href = "/"}
                >
                    Go Back Home
                </motion.button>
            </motion.div>
        </div>
    )
}

export default MaintenancePage