// src/auth/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSignIn } from "@clerk/clerk-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Mail } from "lucide-react";

/**
 * ForgotPasswordPage
 * - Uses shadcn UI + Tailwind + Framer Motion
 * - Calls Clerk's signIn.resetPassword({ identifier })
 */

export default function ForgotPasswordPage() {
    const { signIn, isLoaded } = useSignIn();
    const [email, setEmail] = useState("");
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInfo("");
        setError("");

        if (!isLoaded) {
            setError("Authentication system is not ready — try again in a moment.");
            return;
        }

        setLoading(true);
        try {
            // Clerk: send reset email
            await signIn.resetPassword({ identifier: email });
            setInfo("Check your inbox — we've sent a password reset link.");
            setEmail("");
        } catch (err) {
            // friendly error message
            const msg = err?.errors?.[0]?.message || err?.message || "Unable to send reset email. Try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-800 to-slate-900 p-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <Card className="overflow-visible rounded-2xl bg-[#071020] border border-white/6 shadow-2xl">
                    <CardHeader className="pt-6 px-6">
                        <div className="flex items-center gap-4">
                            <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 p-2 shadow-md">
                                <Mail className="h-5 w-5 text-indigo-900" />
                            </div>
                            <div>
                                <CardTitle className="text-white text-lg">Reset your password</CardTitle>
                                <CardDescription className="text-sm text-white/80">
                                    Enter the email tied to your account and we'll send a secure link.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="px-6 pb-6 pt-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-sm text-white/80">
                                    Email address
                                </Label>
                                <motion.div whileFocus={{ scale: 1.01 }} className="mt-2">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="bg-white/6 text-white border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                                        aria-describedby="email-help"
                                    />
                                </motion.div>
                                <p id="email-help" className="text-xs mt-2 text-white/60">
                                    We'll email a secure link — it'll expire for your safety.
                                </p>
                            </div>

                            {/* Info / Error */}
                            {info && (
                                <div className="flex items-start gap-3 rounded-md bg-white/5 p-3 text-sm text-emerald-300">
                                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                                    <div>{info}</div>
                                </div>
                            )}

                            {error && (
                                <div className="flex items-start gap-3 rounded-md bg-white/5 p-3 text-sm text-red-400">
                                    <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                                    <div>{error}</div>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-transform"
                                    disabled={loading}
                                    aria-busy={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg
                                                className="h-4 w-4 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2"></circle>
                                                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send reset link"
                                    )}
                                </Button>

                                <a
                                    href="/"
                                    className="text-sm text-white/70 hover:underline ml-1"
                                    aria-label="Back to home"
                                >
                                    Cancel
                                </a>
                            </div>
                        </form>

                        <Separator className="my-6" />

                        <div className="text-center text-sm text-white/70">
                            <div>Need more help? Reach out via <a href="/support" className="underline">Support</a>.</div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
