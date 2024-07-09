import { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import GoogleLogin from "./GoogleAuth";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validate } from "./Validate";
import { setTokenToLocal } from "./Validate";
import PopUpNotification from "../pages/home_sections/PopupNoti";

// Styled Components
const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width:40;
  min-width: 250px;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SubHeading = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const InputEl = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Text = styled.p`
  margin: 1rem 0;
  color: #666;
`;

const LinkText = styled.span`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoImage = styled.img`
  width: 100px;
  margin-bottom: 1rem;
`;

const ErrorMessageStyled = styled.div`
  color: red;
  font-size: 10px;
  margin-bottom: 1rem;
`;

export default function Login() {
  const [isLogging, setIsLogging] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState({});
  const [btnActive, setBtnActive] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(userDetails, isLogging);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setBtnActive(true)
    setErrors({});
    try {
      const url = isLogging 
        ? 'http://localhost:3501/api/user/login'
        : 'http://localhost:3501/api/user/create';
      
      const response = await axios.post(url, userDetails);
      setTokenToLocal(response.data.token)
      navigate(from);
    } catch (error) {
      if(error.response === undefined){
        setErrorMessage('An error Occured. Please try again.')
        console.log(error.response)
        setLoginError(true)
      }
      setErrorMessage(error.response.data.msg)
      setLoginError(true)
    }finally{
      setBtnActive(false)
    }
  };

  return (
    <Section>
     {loginError && <PopUpNotification 
     message={errorMessage}
     onClose={() => setLoginError(false)}
     />}

      <StyledForm onSubmit={handleSubmit}>
        <LogoImage src={Logo} alt="Let's Talk Chatbot Logo" />
        <SubHeading>{isLogging ? "Login" : "Signup"}</SubHeading>
        {!isLogging && (
          <>
            <InputEl
              type="text"
              placeholder="Full Name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
            {errors.name && <ErrorMessageStyled>{errors.name}</ErrorMessageStyled>}
          </>
        )}
        <InputEl
          type="email"
          placeholder="Email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorMessageStyled>{errors.email}</ErrorMessageStyled>}
        <InputEl
          type="password"
          placeholder="Password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />
        {errors.password && <ErrorMessageStyled>{errors.password}</ErrorMessageStyled>}
        <Button type="submit" disabled={btnActive}>
          {btnActive ?  "Loading...": isLogging ? "Login" : "Signup"}
        </Button>
        {isLogging && <LinkText>Forgot Password?</LinkText>}
        <GoogleLogin />
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
