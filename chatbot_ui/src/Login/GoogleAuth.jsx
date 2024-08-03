import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import styled from "styled-components";
import GoogleIconImage from "../assets/google_icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setTokenToLocal } from "./Validate";
import { Browser } from "@capacitor/browser";

const GoogleButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: ${({ btnActive }) => (btnActive ? "not-allowed" : "pointer")};
  &:hover {
    background-color: #f4f4f9;
  }
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH;

const GoogleLogin = ({
  setErrorMessage,
  setLoginError,
  btnActive,
  setBtnActive,
  from,
}) => {
  const navigate = useNavigate();
  const [isSigning, setIsSigning] = useState(false);

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: "profile email",
      });
    };

    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = async () => {
    if (btnActive) return;
    setIsSigning(true);
    try {
      setBtnActive(true);
      const auth2 = gapi.auth2.getAuthInstance();
      await Browser.open({ url: auth2.signIn().then(googleUser => {
        const id_token = googleUser.getAuthResponse().id_token;
        handleServerLogin(id_token);
      }) });
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "An error occurred. Please try again.";
      setErrorMessage(errorMsg);
      setLoginError(true);
    } finally {
      setBtnActive(false);
      setIsSigning(false);
    }
  };

  const handleServerLogin = async (id_token) => {
    const URL = import.meta.env.VITE_SERVER_URL;

    try {
      const response = await axios.post(
        `${URL}/user/verify-google`,
        { id_token },
        { withCredentials: true }
      );
      setTokenToLocal(response.data.token);
      navigate(from);
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "An error occurred. Please try again.";
      setErrorMessage(errorMsg);
      setLoginError(true);
    }
  };

  return (
    <GoogleButton onClick={handleLogin} btnActive={btnActive}>
      <GoogleIcon src={GoogleIconImage} alt="Google Icon" />
      {!isSigning ? "Login with Google" : "Loading...."}
    </GoogleButton>
  );
};

export default GoogleLogin;
