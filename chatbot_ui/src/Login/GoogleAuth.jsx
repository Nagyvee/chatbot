import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import styled from 'styled-components'
import GoogleIconImage from "../assets/google_icon.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { setTokenToLocal } from "./Validate";
import verifyUser from './verifyUser'

const GoogleButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f9;
  }
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const CLIENT_ID = import.meta.env.VITE_GOOGLE_AUTH

const GoogleLogin = () => {
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: ''
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    
    const response = await axios.post('http://localhost:3501/api/user/verify-google',{id_token}, { withCredentials: true })
    setTokenToLocal(response.data.token)
    navigate('/profile');
  };

  return(
        <GoogleButton onClick={handleLogin}>
          <GoogleIcon src={GoogleIconImage} alt="Google Icon" />
          Login with Google
         </GoogleButton>
  );
};

export default GoogleLogin;
