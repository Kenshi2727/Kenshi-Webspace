import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-indigo-600 font-bold text-xl">Kenshi Webspace</Link>
                        <div className="hidden md:ml-10 md:flex md:space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} text-sm font-medium`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/articles"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/articles') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} text-sm font-medium`}
                            >
                                Articles
                            </Link>
                            <Link
                                to="/categories"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/categories') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} text-sm font-medium`}
                            >
                                Categories
                            </Link>
                            <Link
                                to="/about"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/about') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} text-sm font-medium`}
                            >
                                About
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link to='/auth/login'>
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign in
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;