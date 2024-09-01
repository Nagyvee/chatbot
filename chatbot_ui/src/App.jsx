if (!Object.hasOwn) {
  Object.hasOwn = function(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}

import "./App.css";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import useVerifyUser from "./Login/verifyUser";
import { useSelector } from "react-redux";
import Home from "./pages/home_sections/Home";
import Chat from "./pages/home_sections/Chat";
import PopUpNotification from "./pages/home_sections/PopupNoti";
import { useState } from "react";
import ProtectedRoute from "./Login/ProtectedRoute";
import PrivacyPolicy from './pages/home_sections/Privacy'
import TermsOfService from './pages/home_sections/Terms'
import { Helmet } from "react-helmet";

// Helper function to set page-specific metadata
const getPageMetadata = (pathname) => {
  switch (pathname) {
    case "/":
      return {
        title: "Home | Nayvee Chat AI Assistant",
        description: "Welcome to Nayvee Chat, your advanced AI chatbot assistant. Explore our features and start chatting with our AI.",
      };
    case "/pricing":
      return {
        title: "Chat with Nayvee | Nayvee Chat AI Assistant",
        description: "Start a conversation with Nayvee, your advanced AI chatbot. Get instant replies and assistance.",
      };
    case "/privacy-policy":
      return {
        title: "Privacy Policy | Nayvee Chat AI Assistant",
        description: "Read our privacy policy to understand how we handle your data and privacy.",
      };
    case "/terms-of-service":
      return {
        title: "Terms of Service | Nayvee Chat AI Assistant",
        description: "Review our terms of service to understand the rules and guidelines for using Nayvee Chat.",
      };
    default:
      return {
        title: "Page Not Found | Nayvee Chat AI Assistant",
        description: "The page you are looking for does not exist.",
      };
  }
};

function App() {
  const [popUp, setPopUp] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  useVerifyUser(setPopUp, setIsFetching);
  const user = useSelector((state) => state.user.userDetails);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { title, description } = getPageMetadata(location.pathname);

  const handleClose = () => {
    setPopUp(false);
  };

  return (
    <>
      {popUp && (
        <PopUpNotification
          message="Session Expired. Please log in to continue."
          onClose={handleClose}
        />
      )}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Nayvee, Nayvee Chat, Nayvee Tech, AI chatbot, chatbot assistant, AI assistant, virtual assistant, conversational AI, chatbot technology, AI conversation, automated chatbot, interactive chatbot, customer support chatbot, chatbot for business, natural language processing, NLP chatbot, machine learning chatbot, AI-powered chatbot, chatbot services, chatbot solutions, virtual customer service, chatgpt, gpt, openai" />
        <link rel="canonical" href={`https://chatbot.nayveetech.co.za${location.pathname}`} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://chatbot.nayveetech.co.za${location.pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://chatbot.nayveetech.co.za/android-chrome-192x192.png" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://chatbot.nayveetech.co.za/android-chrome-512x512.jpg" />
      </Helmet>
      <Routes>
        <Route
          path="/user/auth"
          element={user.isActive ? <Navigate to={from} /> : <Login />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/user/google/:id" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isFetching={isFetching}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute isFetching={isFetching}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isFetching={isFetching}>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
