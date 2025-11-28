import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { GoogleOneTap } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import { pingServer } from './services/GlobalApi.js'
import * as Sentry from "@sentry/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

// Pinging Server
pingServer();

// Sentry Initialization
Sentry.init({
  dsn: "https://50ed0226f0c3c6d8f0c148ff216b22ef@o4510391099654144.ingest.de.sentry.io/4510391103848528",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  environment: import.meta.env.MODE || "development",
  sendDefaultPii: true
});

createRoot(document.getElementById('root')).render(
  <>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <GoogleOneTap />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </>,
)
