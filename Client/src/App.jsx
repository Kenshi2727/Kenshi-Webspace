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
import ResearchBrewery from './pages/sections/Research_Section/ResearchBrewery';
import CodePage from './pages/sections/Research_Section/CodePage';
import ScrollToTop from './navigate/ScrollToTop';
import ReviewPage from './pages/ReviewPage';
import ProfilePage from './pages/ProfilePage';
import MaintainerPage from './super-admin/MaintainerPage';
import toast, { Toaster } from 'react-hot-toast'
import { useUser } from '@clerk/clerk-react';

function App() {
  const isMaintenanceMode = false;
  const [showDarkPrompt, setShowDarkPrompt] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    // show dialog immediately on first render
    if (window.location.pathname !== "/dark") {
      setShowDarkPrompt(true);
    }

    //show notice
    toast.custom((t) => (
      <div
        role="status"
        aria-live="polite"
        className={`${t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
          } max-w-sm lg:max-w-lg w-full bg-white/95 backdrop-blur-xl border border-gray-200/60 shadow-2xl rounded-2xl pointer-events-auto flex overflow-hidden transition-all duration-300`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.15), 0 8px 16px -8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex-1 w-0 p-4 lg:p-5">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 lg:h-9 lg:w-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                {/* Enhanced sparkle icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm lg:text-base font-semibold text-gray-900 truncate">Kenshi Webspace</p>
                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full border border-indigo-200/50 shadow-sm">
                  Beta Soon
                </span>
              </div>
              <p className="text-sm lg:text-sm text-gray-600 leading-snug">
                Building something special — prototype launching soon. Thanks for your patience!
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center'
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Progress />
      <ScrollToTop />
      <main className="pt-16">
        {isMaintenanceMode ? (
          <MaintenancePage />
        ) : (
          <Routes>
            {/*Specific Maintenance route */}
            <Route path="/maintenance" element={<MaintenancePage />} />

            <Route path="/" element={isMaintenanceMode ? <MaintenancePage /> : <HomePage />} />
            <Route path="/articles" element={false ? <MaintenancePage /> : <ArticlesPage />} />
            <Route path="/categories" element={isMaintenanceMode ? <MaintenancePage /> : <CategoriesPage />} />
            <Route path="/about" element={isMaintenanceMode ? <MaintenancePage /> : <AboutPage />} />
            <Route path="/auth/login" element={isMaintenanceMode ? <MaintenancePage /> : <SignInPage />} />
            <Route path="/auth/sign-up" element={isMaintenanceMode ? <MaintenancePage /> : <SignUpPage />} />
            <Route path="/auth/sso-callback" element={isMaintenanceMode ? <MaintenancePage /> : <SsoCallback />} />
            <Route path="/articles/:id" element={isMaintenanceMode ? <MaintenancePage /> : <ArticlePage />} />
            <Route path="/articles/:id/edit" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <EditorPage /> : <SignInPage />} />
            <Route path="/auth/forgot-password" element={isMaintenanceMode ? <MaintenancePage /> : <ForgotPasswordPage />} />
            <Route path="/my-articles" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <MyArticlesPage /> : <SignInPage />} />
            <Route path="/dark" element={isMaintenanceMode ? <MaintenancePage /> : <DarkHomePage />} />
            <Route path="/research" element={isMaintenanceMode ? <MaintenancePage /> : <ResearchBrewery />} />
            <Route path="/code" element={isMaintenanceMode ? <MaintenancePage /> : <CodePage />} />
            <Route path="/review" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <ReviewPage /> : <SignInPage />} />
            <Route path="/profile" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <ProfilePage /> : <SignInPage />} />
            <Route path="/super-admin/maintainer" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <MaintainerPage /> : <SignInPage />} />
            {/* Add more routes as needed */}
          </Routes>
        )}

        {/* <motion.div>
          <DarkModePrompt open={showDarkPrompt} onOpenChange={setShowDarkPrompt} />
        </motion.div> */}

        <ScrollToTopButton />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </main>
      <Footer />
    </Router>
  );
}

export default App;