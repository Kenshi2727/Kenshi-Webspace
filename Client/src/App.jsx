import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useSearchParams } from 'react-router-dom';
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
import NotFoundPage from './pages/NotFoundPage';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { getToken } from "firebase/messaging";
import { messaging } from './services/firebase';
import { sendPublicFcmToken } from './services/GlobalApi';

function App() {
  const isMaintenanceMode = false;
  const [showDarkPrompt, setShowDarkPrompt] = useState(false);
  const { isSignedIn } = useUser();
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("toast") === "already-signed-in") {
      toast.success("You are already signed in. Redirecting...");
    }
  }, [params]);


  //notficaton permission request for firebase messaging
  useEffect(() => {
    try {
      async function notifReq() {
        await Notification.requestPermission().then(async (permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            // toast.success("Thanks for allowing notifications.");

            // generate the FCM token
            const token = await getToken(messaging, {
              vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
            });
            console.log("Token generated:", token);

            if (localStorage.getItem("fcmToken") === token) return; //token already stored

            // send the token to the server
            localStorage.setItem("fcmToken", token);
            await sendPublicFcmToken({ token });
          } else {
            console.log('Unable to get permission to notify.');
            console.log('Status:', permission);
            toast.error("Notification permission denied. Please enable it in your browser settings if you change your mind.");
          }
        });
      }

      notifReq();
    } catch (error) {
      console.error("An error occurred while requesting notification permission:", error);
    }

  }, [])


  // useEffect(() => {
  //   // show dialog immediately on first render
  //   if (window.location.pathname !== "/dark") {
  //     setShowDarkPrompt(true);
  //   }
  // }, []);


  // simulating error for Sentry testing
  // useEffect(() => {
  //   throw new Error("Test Sentry Error from App.jsx");
  // })

  return (
    <>
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

            {/* <Route path="/categories" element={isMaintenanceMode ? <MaintenancePage /> : <CategoriesPage />} /> */}
            <Route path="/categories" element={true ? <MaintenancePage /> : <CategoriesPage />} />

            <Route path="/about" element={isMaintenanceMode ? <MaintenancePage /> : <AboutPage />} />
            <Route path="/auth/login" element={isMaintenanceMode ? <MaintenancePage /> : <SignInPage />} />
            <Route path="/auth/sign-up" element={isMaintenanceMode ? <MaintenancePage /> : <SignUpPage />} />
            <Route path="/auth/sso-callback" element={isMaintenanceMode ? <MaintenancePage /> : <SsoCallback />} />
            <Route path="/articles/:id" element={isMaintenanceMode ? <MaintenancePage /> : <ArticlePage />} />
            <Route path="/articles/edit" >
              <Route path='new' element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <EditorPage type='new' /> : <SignInPage />} />
              <Route path=':id' element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <EditorPage type='edit' /> : <SignInPage />} />
            </Route>
            <Route path="/auth/forgot-password" element={isMaintenanceMode ? <MaintenancePage /> : <ForgotPasswordPage />} />
            <Route path="/my-articles" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <MyArticlesPage /> : <SignInPage />} />
            <Route path="/dark" element={isMaintenanceMode ? <MaintenancePage /> : <DarkHomePage />} />

            {/* <Route path="/research" element={isMaintenanceMode ? <MaintenancePage /> : <ResearchBrewery />} />
            <Route path="/code" element={isMaintenanceMode ? <MaintenancePage /> : <CodePage />} /> */}

            <Route path="/research" element={true ? <MaintenancePage /> : <ResearchBrewery />} />
            <Route path="/code" element={true ? <MaintenancePage /> : <CodePage />} />

            <Route path="/review" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <ReviewPage /> : <SignInPage />} />
            <Route path="/profile" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <ProfilePage /> : <SignInPage />} />
            <Route path="/super-admin/maintainer" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <MaintainerPage /> : <SignInPage />} />
            {/* Add more routes as needed */}

            {/*Invalid route Handling*/}
            <Route path="*" element={<NotFoundPage />} />
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
        <Analytics />
        <SpeedInsights />
      </main>
      <Footer />
    </>
  );
}

export default App;