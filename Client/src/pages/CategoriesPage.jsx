import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
    const categories = [
        { id: 1, name: "React", count: 24, color: "bg-indigo-100 text-indigo-800" },
        { id: 2, name: "JavaScript", count: 32, color: "bg-yellow-100 text-yellow-800" },
        { id: 3, name: "CSS", count: 18, color: "bg-blue-100 text-blue-800" },
        { id: 4, name: "Web Development", count: 45, color: "bg-green-100 text-green-800" },
        { id: 5, name: "UI/UX Design", count: 15, color: "bg-pink-100 text-pink-800" },
        { id: 6, name: "Performance", count: 12, color: "bg-purple-100 text-purple-800" },
        { id: 7, name: "Security", count: 8, color: "bg-red-100 text-red-800" },
        { id: 8, name: "DevOps", count: 14, color: "bg-gray-100 text-gray-800" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* <Navbar /> */}

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Browse Categories
                    </h1>
                    <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
                        Explore our content by category
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categories.map((category) => (
                        <Link
                            to={`/articles?category=${category.name}`}
                            key={category.id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{category.count} articles</p>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 bg-indigo-50 rounded-xl p-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Can't find what you're looking for?</h2>
                        <p className="mt-4 text-gray-600">
                            Suggest a new category or request content on a specific topic
                        </p>
                        <div className="mt-6 flex justify-center">
                            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors">
                                Request a Topic
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default CategoriesPage;