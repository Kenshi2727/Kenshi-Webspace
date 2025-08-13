import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSignIn, useAuth } from "@clerk/clerk-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, XCircle, Mail } from "lucide-react";

/**
 * ForgotPasswordPage
 * - Two-step UI: send reset code -> submit code + new password
 * - Uses Clerk custom flow:
 *   1) signIn.create({ strategy: 'reset_password_email_code', identifier: email })
 *   2) signIn.attemptFirstFactor({ strategy: 'reset_password_email_code', code, password })
 */

export default function ForgotPasswordPage() {
    const { signIn, isLoaded, setActive } = useSignIn();
    const { isSignedIn } = useAuth();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");

    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            window.location.href = "/";
        }
    }, [isSignedIn]);

    const handleSendCode = async (e) => {
        e.preventDefault();
        setInfo("");
        setError("");

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        if (!isLoaded) {
            setError("Authentication system is not ready — try again in a moment.");
            return;
        }

        setLoading(true);
        try {
            // create a signIn attempt that sends the reset code to user's email
            const res = await signIn.create({
                strategy: "reset_password_email_code",
                identifier: email,
            });

            // depending on Clerk response, the attempt may require first-factor verification
            // mark UI to show code + password inputs
            setSuccessfulCreation(true);
            setInfo("Check your inbox — we've sent a password reset code to your email.");
        } catch (err) {
            const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || "Unable to send reset email. Try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setInfo("");
        setError("");

        if (!code || !password) {
            setError("Please enter the reset code and a new password.");
            return;
        }

        if (!isLoaded) {
            setError("Authentication system is not ready — try again in a moment.");
            return;
        }

        setLoading(true);
        try {
            // attempt first factor verification with the code and the new password
            const res = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: code,
                password: password,
            });

            // If Clerk completed the flow, it may return a createdSessionId
            if (res.status === "complete") {
                // try to activate the new session if Clerk returned an id
                try {
                    if (res.createdSessionId && setActive) {
                        // setActive typically accepts a session id or object depending on SDK
                        // call it defensively
                        await setActive?.(res.createdSessionId);
                    }
                } catch (setActiveErr) {
                    // non-fatal: continue to redirect even if setActive fails
                    console.warn("setActive failed", setActiveErr);
                }

                setInfo("Your password has been reset — redirecting to home...");
                // clear sensitive fields
                setEmail("");
                setCode("");
                setPassword("");

                // short delay so user sees the success message
                setTimeout(() => (window.location.href = "/"), 900);
            } else {
                // handle other statuses (e.g. 'needs_first_factor_verification')
                setError("Unable to reset password. Please check the code and try again.");
            }
        } catch (err) {
            const msg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || "Unable to reset password. Try again.";
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
                                    Enter the email tied to your account and we'll send a secure code. Then enter the code and a new password.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="px-6 pb-6 pt-4">
                        {/* Step 1: send code */}
                        {!successfulCreation && (
                            <form onSubmit={handleSendCode} className="space-y-4">
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
                                        We'll email a secure code — it'll expire for your safety.
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
                                        {loading ? "Sending..." : "Send reset code"}
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
                        )}

                        {/* Step 2: enter code + new password */}
                        {successfulCreation && (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <div>
                                    <Label htmlFor="code" className="text-sm text-white/80">
                                        Reset code
                                    </Label>
                                    <motion.div whileFocus={{ scale: 1.01 }} className="mt-2">
                                        <Input
                                            id="code"
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            placeholder="Enter the code you received"
                                            required
                                            className="bg-white/6 text-white border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                                        />
                                    </motion.div>

                                    <Label htmlFor="new-password" className="text-sm text-white/80 mt-4 block">
                                        New password
                                    </Label>
                                    <motion.div whileFocus={{ scale: 1.01 }} className="mt-2">
                                        <Input
                                            id="new-password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Choose a strong password"
                                            required
                                            minLength={8}
                                            className="bg-white/6 text-white border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                                        />
                                    </motion.div>
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
                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-transform"
                                        disabled={loading}
                                        aria-busy={loading}
                                    >
                                        {loading ? "Resetting..." : "Reset password"}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => {
                                            // allow user to go back and send a different code
                                            setSuccessfulCreation(false);
                                            setInfo("");
                                            setError("");
                                            setCode("");
                                        }}
                                        className="text-sm text-white/70 hover:underline ml-1"
                                    >
                                        Back
                                    </Button>
                                </div>
                            </form>
                        )}

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
