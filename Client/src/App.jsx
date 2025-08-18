import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import MaintenancePage from './components/MaintenancePage';
import MyArticlesPage from './pages/MyArticlesPage';
import DarkHomePage from './pages/DarkHomePage';
import DarkModePrompt from './components/DarkModePrompt';
import ScrollToTopButton from './components/ScrollToTopButton';
import Progress from './components/Progress';

function App() {
  const isMaintenanceMode = false;
  const [showDarkPrompt, setShowDarkPrompt] = useState(false);

  useEffect(() => {
    // show dialog immediately on first render
    if (window.location.pathname !== "/dark") {
      setShowDarkPrompt(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Progress />
      <main className="pt-16">
        {isMaintenanceMode ? (
          <MaintenancePage />
        ) : (
          <Routes>
            {/*Specific Maintenance route */}
            <Route path="/maintenance" element={<MaintenancePage />} />

            <Route path="/" element={isMaintenanceMode ? <MaintenancePage /> : <HomePage />} />
            {/* <Route path="/articles" element={isMaintenanceMode ? <MaintenancePage /> : <ArticlesPage />} /> */}
            <Route path="/articles" element={false ? <MaintenancePage /> : <ArticlesPage />} />
            <Route path="/categories" element={isMaintenanceMode ? <MaintenancePage /> : <CategoriesPage />} />
            <Route path="/about" element={isMaintenanceMode ? <MaintenancePage /> : <AboutPage />} />
            <Route path="/auth/login" element={isMaintenanceMode ? <MaintenancePage /> : <SignInPage />} />
            <Route path="/auth/sign-up" element={isMaintenanceMode ? <MaintenancePage /> : <SignUpPage />} />
            <Route path="/auth/sso-callback" element={isMaintenanceMode ? <MaintenancePage /> : <SsoCallback />} />
            <Route path="/articles/:id" element={isMaintenanceMode ? <MaintenancePage /> : <ArticlePage />} />
            <Route path="/articles/:id/edit" element={isMaintenanceMode ? <MaintenancePage /> : <EditorPage />} />
            <Route path="/auth/forgot-password" element={isMaintenanceMode ? <MaintenancePage /> : <ForgotPasswordPage />} />
            <Route path="/my-articles" element={isMaintenanceMode ? <MaintenancePage /> : <MyArticlesPage />} />
            <Route path="/dark" element={isMaintenanceMode ? <MaintenancePage /> : <DarkHomePage />} />
            {/* Add more routes as needed */}
          </Routes>
        )}

        {/* <motion.div>
          <DarkModePrompt open={showDarkPrompt} onOpenChange={setShowDarkPrompt} />
        </motion.div> */}

        <ScrollToTopButton />
      </main>
      <Footer />
    </Router>
  );
}

export default App;