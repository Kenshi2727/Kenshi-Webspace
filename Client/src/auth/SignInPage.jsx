import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        // Handle authentication logic here
        console.log('Logging in with:', { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <Card className="rounded-2xl shadow-2xl">
                    <CardContent className="p-8 space-y-6">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h1>
                            <p className="text-gray-500">Sign in to Kenshi Webspace</p>
                        </div>
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border rounded-xl border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border rounded-xl border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="text-right">
                                <a href="#" className="text-sm text-blue-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
                            >
                                Sign In
                            </button>
                        </form>
                        <div className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="#" className="text-blue-600 hover:underline">
                                Sign Up
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default SignInPage;
