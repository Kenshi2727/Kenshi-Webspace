import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import SignInPage from './auth/SignInPage';
import ArticlePage from './pages/ArticlePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EditorPage from './pages/EditorPage';
import SignUpPage from './auth/SignUpPage';
import SsoCallback from './auth/SsoCallback';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth/login" element={<SignInPage />} />
          <Route path="/auth/sign-up" element={<SignUpPage />} />
          <Route path="/auth/sso-callback" element={<SsoCallback />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/articles/:id/edit" element={<EditorPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;