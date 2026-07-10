import React from 'react';
import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
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
// import DarkModePrompt from './components/DarkModePrompt';
import ScrollToTopButton from './components/ScrollToTopButton';
import Progress from './components/Progress';
import ScrollToTop from './navigate/ScrollToTop';
import ReviewPage from './pages/ReviewPage';
import ProfilePage from './pages/ProfilePage';
import MaintainerPage from './super-admin/MaintainerPage';
import PrivacyPage from './pages/PrivacyPage';
import SiteMapPage from './pages/SiteMapPage';
import TermsPage from './pages/TermsPage';
import toast, { Toaster } from 'react-hot-toast'
import { useUser } from '@clerk/clerk-react';
import NotFoundPage from './pages/NotFoundPage';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { getToken } from "firebase/messaging";
import { messaging } from './services/firebase';
import { sendPublicFcmToken } from './services/GlobalApi';
import PopupBanner from './components/banners/PopupBanner';
import { useDispatch } from "react-redux";
import { setUser } from './features/users/userSlice.js';
import { getUser } from './services/GlobalApi';
import { useAuth } from '@clerk/clerk-react';
import ArticlePDF from './components/ArticlePDF';
import LoadingPage from './pages/LoadingPage.jsx';

function App() {
  const isMaintenanceMode = false;
  // const [showDarkPrompt, setShowDarkPrompt] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const { userId, getToken: getAuthToken } = useAuth();

  useEffect(() => {
    if (params.get("toast") === "already-signed-in") {
      toast.success("You are already signed in. Redirecting...");
    }
  }, [params]);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        if (!isSignedIn || !userId) return;
        const token = await getAuthToken();
        const response = await getUser(userId, token);
        if (response.data) {
          dispatch(setUser(response.data.user));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, [isSignedIn, isLoaded, userId, dispatch, getAuthToken]);


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
            // console.log("Token generated:", token);

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

      {/*Popup Banner*/}
      {/* <PopupBanner
        title="We are extremely sorry!"
        message="Our authentication system is currently down. Please try again later for signing in. you can access all the content but you can't sign in. We are actively working to resolve the issue! We are currently investigating an issue with DNS resolution."
      /> */}

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

            {/*Maintenance independent routes*/}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/sitemap" element={<SiteMapPage />} />
            <Route path="/terms" element={<TermsPage />} />


            {/*Maintenance dependent routes*/}
            <Route path="/" element={isMaintenanceMode ? <MaintenancePage /> : <HomePage />} />
            <Route path="/articles" element={isMaintenanceMode ? <MaintenancePage /> : <ArticlesPage />} />
            <Route path="/categories" element={isMaintenanceMode ? <MaintenancePage /> : <CategoriesPage />} />
            <Route path="/about" element={isMaintenanceMode ? <MaintenancePage /> : <AboutPage />} />
            <Route path="/auth/login" element={isMaintenanceMode ? <MaintenancePage /> : <SignInPage />} />
            <Route path="/auth/sign-up" element={isMaintenanceMode ? <MaintenancePage /> : <SignUpPage />} />
            <Route path="/auth/sso-callback" element={isMaintenanceMode ? <MaintenancePage /> : <SsoCallback />} />
            <Route path="/articles/:id" element={isMaintenanceMode ? <MaintenancePage /> : <ArticlePage />} />
            <Route path="/articles/edit" >
              <Route path='new' element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <EditorPage type='new' /> : isLoaded ? <SignInPage /> : <LoadingPage />} />
              <Route path=':id' element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <EditorPage type='edit' /> : isLoaded ? <SignInPage /> : <LoadingPage />} />
            </Route>
            <Route path="/auth/forgot-password" element={isMaintenanceMode ? <MaintenancePage /> : <ForgotPasswordPage />} />
            <Route path="/my-articles" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <MyArticlesPage /> : isLoaded ? <SignInPage /> : <LoadingPage />} />
            <Route path="/dark" element={isMaintenanceMode ? <MaintenancePage /> : <DarkHomePage />} />
            <Route path="/review" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <ReviewPage /> : isLoaded ? <SignInPage /> : <LoadingPage />} />
            <Route path="/profile" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <ProfilePage /> : isLoaded ? <SignInPage /> : <LoadingPage />} />
            <Route path="/super-admin/maintainer" element={isMaintenanceMode ? <MaintenancePage /> : isSignedIn ? <MaintainerPage /> : isLoaded ? <SignInPage /> : <LoadingPage />} />
            {/* Add more routes as needed */}


            {/*Testing Routes */}
            <Route path="/test/article-pdf" element={<ArticlePDF />} />

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
          className="no-pdf"
        />
        <Analytics />
        <SpeedInsights />
      </main>
      <Footer />
    </>
  );
}

export default App;