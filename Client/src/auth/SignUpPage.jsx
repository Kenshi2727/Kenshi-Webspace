import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Users, ShieldCheck, FileText, Layers, Smartphone, Moon, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { useSignIn } from "@clerk/clerk-react";
import { createUser, deleteUser } from '../services/GlobalApi.js';
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import LoadingPage from "../pages/LoadingPage";

export default function CustomSignUpPage() {
    const { isSignedIn } = useAuth();
    const { signUp, setActive, isLoaded } = useSignUp();
    const { signIn } = useSignIn();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { getToken } = useAuth();

    const validate = () => {
        if (!email) return "Please enter an email.";
        if (!password) return "Please enter a password.";
        if (password.length < 8) return "Password should be at least 8 characters.";
        if (password !== confirmPassword) return "Passwords do not match.";
        if (!agreeTerms) return "Please agree to the terms to continue.";
        return null;
    };

    const providers = [
        {
            name: "Google",
            icon: <FcGoogle className="size-6" />,
            strategy: "oauth_google",
            className: "bg-white text-black hover:bg-gray-100 border border-gray-300",
        },
        {
            name: "GitHub",
            icon: <FaGithub className="size-6" />,
            strategy: "oauth_github",
            className: "bg-black text-white hover:bg-gray-800",
        },
        {
            name: "LinkedIn",
            icon: <FaLinkedin className="size-6" />,
            strategy: "oauth_linkedin_oidc",
            className: "bg-white text-[#0A66C2] border border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",
        },
    ];

    const handleDeleteUser = async () => {
        try {
            const token = await getToken();
            await deleteUser({ "msg": "Delete Request(IMPORTANT!) for failed database registry!", token: token });
        } catch (error) {
            if (error?.response?.status === 401) {
                toast.promise(
                    new Promise((resolve) => setTimeout(() => {
                        resolve();
                        window.location.href = "/auth/login";
                    }
                        , 2000)),
                    {
                        loading: 'Unauthorized Access! Redirecting to login page...',
                        success: <b>Please sign in!</b>,
                        error: <b>Internal Server Error.</b>,
                    }
                );

            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setInfo("");

        if (!isLoaded) {
            setError("Authentication system not ready — please wait a moment.");
            return;
        }

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            // Create a new sign up attempt
            const attempt = await signUp.create(
                {
                    emailAddress: email,
                    password,
                    firstName,
                    lastName
                }
            );

            // Immediately mark it complete (only works if requirements are off in dashboard)
            // await signUp.update({
            //     unsafeMetadata: { bypassVerification: true }
            // });

            // If Clerk returns a "complete" status (auto-created session)
            if (attempt.status === "complete") {
                if (attempt.createdSessionId) {
                    await setActive({ session: attempt.createdSessionId });
                }
                setInfo("Signed up successfully — redirecting...");
                //user creation in database
                // await createUser({
                //     email,
                //     password,
                //     firstName,
                //     lastName,
                // });
                // using webhook for database user insertion
                window.location.href = "/";
                return;
            }

            // Some flows require email verification — provide friendly info.
            setInfo(
                `Sign-up initiated. Status: ${attempt.status}.  Check your email to verify and finish onboarding.`
            );
        } catch (err) {
            console.error(err);
            // handleDeleteUser(); // delete user immediately on error
            setError(err?.errors?.[0]?.message || err?.message || "Sign-up failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleSocial = (provider) => {
        /* using webhook for database user insertion */
        signIn.authenticateWithRedirect({
            strategy: provider, // e.g., "oauth_google"
            redirectUrl: "/auth/sso-callback", // callback page(for production)
            redirectUrlComplete: "/", // After successful login
        });
    };

    if (isSignedIn) {
        window.location.href = "/?toast=already-signed-in";
        return <LoadingPage />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT: Branding / marketing box */}
                    <motion.aside
                        initial={{ x: -18, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.06, duration: 0.6 }}
                        className="relative overflow-hidden rounded-2xl p-8 md:p-10 hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-800 via-purple-800 to-slate-900 text-white shadow-lg"
                    >
                        <div className="absolute -right-24 -top-10 w-64 h-64 rounded-full bg-white/6 blur-3xl pointer-events-none" />
                        <div className="absolute -left-20 bottom-0 w-56 h-56 rounded-full bg-indigo-900/40 blur-2xl pointer-events-none" />

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/6 ring-1 ring-white/8">
                                    <Sparkles className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-extrabold leading-tight">Kenshi WebSpace</h1>
                                    <p className="mt-1 text-sm text-white/80">Community growth • Tech adventures • Publish your story</p>
                                </div>
                            </div>

                            <p className="text-sm text-white/70 mb-6">
                                Join a small community of curious builders — write, share, and grow with creators who care.
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/6">
                                        <Users className="h-5 w-5" aria-hidden />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Community first</p>
                                        <p className="text-xs text-white/80">Collaborate, publish and learn together.</p>
                                    </div>
                                </div>


                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/6">
                                        <ShieldCheck className="h-5 w-5" aria-hidden />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Secure auth</p>
                                        <p className="text-xs text-white/80">Powerful and secure sign-up via Clerk.</p>
                                    </div>
                                </div>


                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/6">
                                        <FileText className="h-5 w-5" aria-hidden />
                                    </div>
                                    <div>
                                        <p className="font-semibold">EJS entrypoint</p>
                                        <p className="text-xs text-white/80">Use an EJS file as the Vite app entry for server-side templating.</p>
                                    </div>
                                </div>


                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/6">
                                        <Layers className="h-5 w-5" aria-hidden />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Tailwind + Flowbite</p>
                                        <p className="text-xs text-white/80">Preconfigured Tailwind utilities and Flowbite components.</p>
                                    </div>
                                </div>


                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/6">
                                        <Smartphone className="h-5 w-5" aria-hidden />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Responsive UI</p>
                                        <p className="text-xs text-white/80">Layouts that look great on phones, tablets and desktops.</p>
                                    </div>
                                </div>


                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/6">
                                        <Moon className="h-5 w-5" aria-hidden />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Dark mode support</p>
                                        <p className="text-xs text-white/80">Easily toggle between light and dark themes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <Badge className="bg-white/6 text-white">Beta</Badge>
                            <div className="text-xs text-white/70">Early access features enabled</div>
                        </div>
                    </motion.aside>

                    {/* RIGHT: Sign-up form */}
                    <motion.section initial={{ x: 18, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12, duration: 0.6 }} className="flex items-center justify-center">
                        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 220 }} className="w-full max-w-md">
                            <Card className="rounded-2xl bg-[#071020] border border-white/6 shadow-2xl">
                                <CardContent className="p-6">
                                    <div className="mb-4 text-center">
                                        <h2 className="text-2xl font-extrabold text-white">Create your account</h2>
                                        <p className="text-sm text-white/70 mt-2">Sign up to start your journey with Kenshi WebSpace</p>
                                    </div>

                                    {/* Social Sign-Up Icons Row */}
                                    <div className="m-4 grid grid-cols-3 gap-3">
                                        {providers.map((provider, idx) => (
                                            <motion.button
                                                key={provider.name}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.08, duration: 0.3 }}
                                                onClick={() => handleSocial(provider.strategy)}
                                                className={`flex items-center justify-center p-3 h-9 rounded-lg shadow-md border hover:scale-105 active:scale-95 transition-transform ${provider.className}`}
                                                title={`Sign in with ${provider.name}`}
                                            >
                                                {provider.icon}
                                            </motion.button>
                                        ))}
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <Label className="text-sm text-white/80">First name</Label>
                                                <Input
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    placeholder="Abhishek"
                                                    className="mt-1 bg-white/6 text-white border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm text-white/80">Last name</Label>
                                                <Input
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    placeholder="Mathur"
                                                    className="mt-1 bg-white/6 text-white border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label className="text-sm text-white/80">Email</Label>
                                            <motion.div whileFocus={{ scale: 1.01 }} className="mt-1">
                                                <Input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    className="bg-white/6 text-white border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                                                    required
                                                />
                                            </motion.div>
                                        </div>

                                        <div>
                                            <Label className="text-sm text-white/80">Password</Label>
                                            <div className="mt-1 relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Create a strong password"
                                                    className="bg-white/6 text-white pr-14 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((s) => !s)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-white/6 px-3 py-1 rounded-md text-white/80 hover:bg-white/8 transition"
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                >
                                                    {showPassword ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                            <div className="text-xs text-white/60 mt-2">Minimum 8 characters. Use letters, numbers & symbols for a stronger password.</div>
                                        </div>

                                        <div>
                                            <Label className="text-sm text-white/80">Confirm password</Label>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Repeat your password"
                                                className="mt-1 bg-white/6 text-white border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 mt-2">
                                            <input id="agree" type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="h-4 w-4 rounded bg-white/6 border-transparent" />
                                            <label htmlFor="agree" className="text-sm text-white/70">I agree to the <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a></label>
                                        </div>

                                        {error && <div className="text-sm text-red-400">{error}</div>}
                                        {info && <div className="text-sm text-indigo-300">{info}</div>}

                                        <div id="clerk-captcha" className="my-4" />

                                        <div className="flex items-center justify-between gap-3">
                                            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-transform" disabled={loading}>
                                                {loading ? "Creating account..." : "Create account"}
                                            </Button>

                                            <a href="/auth/login" className="text-sm text-white/70 hover:underline">Already have an account?</a>
                                        </div>
                                    </form>

                                    <Separator className="my-4" />

                                    <div className="text-sm text-white/70 text-center">Or use Google, GitHub, or LinkedIn to quickly sign in or sign up—no password needed!</div>

                                    <div className="mt-4 flex items-center justify-center gap-3">
                                        <a href="/auth/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/6 text-white hover:bg-white/8 transition">Sign in instead</a>
                                    </div>
                                </CardContent>
                            </Card>

                            <details className="mt-4 bg-white/4 p-3 rounded text-xs text-white/70">
                                <summary className="cursor-pointer">Dev debug</summary>
                                <pre className="text-[11px] mt-2 max-h-40 overflow-auto">
                                    Clerk loaded: {String(isLoaded)}
                                    <br />
                                    window.Clerk: {typeof window !== "undefined" && window.Clerk ? "present" : "missing"}
                                </pre>
                            </details>
                        </motion.div>
                    </motion.section>
                </div>
            </motion.div>
        </div>
    );
}
