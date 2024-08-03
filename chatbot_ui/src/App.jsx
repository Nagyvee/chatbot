import "./App.css";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import useVerifyUser from "./Login/verifyUser";
import { useSelector } from "react-redux";
import Home from "./pages/home_sections/Home";
import Chat from "./pages/home_sections/Chat";
import PopUpNotification from "./pages/home_sections/PopupNoti";
import { useState, useEffect } from "react";
import ProtectedRoute from "./Login/ProtectedRoute";
import SettingsPop from './pages/home_sections/SettingsPop'
import PrivacyPolicy from './pages/home_sections/Privacy'
import TermsOfService from './pages/home_sections/Terms'


function App() {
  const [popUp, setPopUp] = useState(false);
  useVerifyUser(setPopUp);
  const user = useSelector((state) => state.user.userDetails);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
      <Routes>
        <Route
          path="/user/auth"
          element={user.isActive ? <Navigate to={from} /> : <Login />}
        />
        <Route
          path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
          path="/user/google/:id" element={<PrivacyPolicy />} />
                  <Route
          path="/terms-of-service" element={<TermsOfService />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
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
