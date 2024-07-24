import React, { useState } from "react";
import Logo from "../assets/nayveechat-logo.png";
import GoogleLogin from "./GoogleAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { setTokenToLocal } from "./Validate";
import PopUpNotification from "../pages/home_sections/PopupNoti";
import useForm from "./useForm";
import {
  Section,
  StyledForm,
  SubHeading,
  Button,
  Text,
  LinkText,
  LogoImage,
  InputField,
  EyeIcon
} from "./Styles";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const URL = import.meta.env.VITE_SERVER_URL;
const LOGIN_URL = `${URL}/user/login`;
const SIGNUP_URL = `${URL}/user/create`;

// Main Login Component
const Login = () => {
  const [isLogging, setIsLogging] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isSigning, setIsSigning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userDetails, errors, handleChange, validateForm, setUserDetails, setErrors] = useForm({
    name: "",
    email: "",
    password: "",
  }, isLogging);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setBtnActive(true);
    setIsSigning(true);
    setErrors({});
    try {
      const url = isLogging ? LOGIN_URL : SIGNUP_URL;
      const response = await axios.post(url, userDetails);
      setTokenToLocal(response.data.token);
      navigate(from);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Section>
      {loginError && (
        <PopUpNotification
          message={errorMessage}
          onClose={() => setLoginError(false)}
        />
      )}

      <StyledForm onSubmit={handleSubmit}>
        <LogoImage src={Logo} alt="Let's Talk Chatbot Logo" />
        <SubHeading>{isLogging ? "Login" : "Signup"}</SubHeading>
        {!isLogging && (
          <InputField
            type="text"
            placeholder="Full Name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            error={errors.name}
          />
        )}
        <InputField
          type="email"
          placeholder="Email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
          error={errors.email}
        />
        <div className="password-wrap">
        <InputField
          type={showPassword ? "text" : "password"} 
          placeholder="Password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
          error={errors.password}
        />
        <EyeIcon onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </EyeIcon>
        </div>
        <Button type="submit" disabled={btnActive}>
          {isSigning ? "Loading..." : isLogging ? "Login" : "Signup"}
        </Button>
        {isLogging && <LinkText>Forgot Password?</LinkText>}
        <GoogleLogin
          setErrorMessage={setErrorMessage}
          setLoginError={setLoginError}
          btnActive={btnActive}
          setBtnActive={setBtnActive}
          from={from}
        />
        <Text>
          {isLogging ? "Don't have an account?" : "Already have an account?"}
          <LinkText onClick={() => setIsLogging(!isLogging)}>
            {isLogging ? "Signup" : "Login"}
          </LinkText>
        </Text>
      </StyledForm>
    </Section>
  );
}

export default Login;
