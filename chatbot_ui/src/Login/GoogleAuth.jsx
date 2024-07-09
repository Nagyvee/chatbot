import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import styled from 'styled-components';
import GoogleIconImage from "../assets/google_icon.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setTokenToLocal } from "./Validate";

const GoogleButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: ${({ btnActive }) => (btnActive ? 'not-allowed' : 'pointer')};
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

const GoogleLogin = ({ setErrorMessage, setLoginError, btnActive, setBtnActive, from }) => {
  const navigate = useNavigate();
  const [isSigning, setIsSigning] = useState(false)

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: ''
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const handleLogin = async () => {
    if (btnActive) return;
    setIsSigning(true)
    try {
      setBtnActive(true);
      const googleAuth = gapi.auth2.getAuthInstance();
      const googleUser = await googleAuth.signIn();
      const id_token = googleUser.getAuthResponse().id_token;
      
      const response = await axios.post('http://localhost:3501/api/user/verify-google', { id_token }, { withCredentials: true });
      setTokenToLocal(response.data.token);
      navigate(from);
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "An error occurred. Please try again.";
      setErrorMessage(errorMsg);
      setLoginError(true);
    } finally {
      setBtnActive(false);
      setIsSigning(false);
    }
  };

  return (
    <GoogleButton onClick={handleLogin} btnActive={btnActive}>
      <GoogleIcon src={GoogleIconImage} alt="Google Icon" />
      {!isSigning ? 'Login with Google' : 'Loading....'}
    </GoogleButton>
  );
};

export default GoogleLogin;
