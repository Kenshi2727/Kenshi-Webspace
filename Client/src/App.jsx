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
import ForgotPasswordPage from './auth/ForgotPasswordPage';
import MaintenancePage from './components/MaintenancePage';

function App() {
  const isMaintenanceMode = false;
  return (
    <Router>
      <Navbar />
      <main className="pt-16">
        {isMaintenanceMode ? (
          <MaintenancePage />
        ) : (
          <Routes>
            {/*Specific Maintenance route */}
            <Route path="/maintenance" element={<MaintenancePage />} />

            <Route path="/" element={isMaintenanceMode ? <MaintenancePage /> : <HomePage />} />
            {/* <Route path="/articles" element={isMaintenanceMode ? <MaintenancePage /> : <ArticlesPage />} /> */}
            <Route path="/articles" element={true ? <MaintenancePage /> : <ArticlesPage />} />
            <Route path="/categories" element={isMaintenanceMode ? <MaintenancePage /> : <CategoriesPage />} />
            <Route path="/about" element={isMaintenanceMode ? <MaintenancePage /> : <AboutPage />} />
            <Route path="/auth/login" element={isMaintenanceMode ? <MaintenancePage /> : <SignInPage />} />
            <Route path="/auth/sign-up" element={isMaintenanceMode ? <MaintenancePage /> : <SignUpPage />} />
            <Route path="/auth/sso-callback" element={isMaintenanceMode ? <MaintenancePage /> : <SsoCallback />} />
            <Route path="/articles/:id" element={isMaintenanceMode ? <MaintenancePage /> : <ArticlePage />} />
            <Route path="/articles/:id/edit" element={isMaintenanceMode ? <MaintenancePage /> : <EditorPage />} />
            <Route path="/auth/forgot-password" element={isMaintenanceMode ? <MaintenancePage /> : <ForgotPasswordPage />} />
            {/* Add more routes as needed */}
          </Routes>
        )}
      </main>
      <Footer />
    </Router>
  );
}

export default App;