import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/about" className="text-base text-gray-300 hover:text-white">About</Link></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Careers</a></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/articles" className="text-base text-gray-300 hover:text-white">Blog</Link></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Newsletter</a></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy</a></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms</a></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
                        <ul className="mt-4 space-y-4">
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">Twitter</a></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">LinkedIn</a></li>
                            <li><a href="#" className="text-base text-gray-300 hover:text-white">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} Kenshi Webspace. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;