import { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import GoogleLogin from "./GoogleAuth";
import { useNavigate } from 'react-router-dom';

// Styled Components
const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  min-width: 300px;
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

// Component
export default function Login() {
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate()

  const HandleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    alert(isLogging ? "Login" : "Signup");
  };

  return (
    <Section>
      <Form onSubmit={HandleSubmit}>
        <LogoImage src={Logo} alt="Let's Talk Chatbot Logo" />
        <SubHeading>{isLogging ? "Login" : "Signup"}</SubHeading>
        {!isLogging && (
          <InputEl
            onChange={HandleChange}
            type="text"
            placeholder="Full Name"
            name="name"
          />
        )}
        <InputEl
          onChange={HandleChange}
          type="email"
          placeholder="Email"
          name="email"
        />
        <InputEl
          onChange={HandleChange}
          type="password"
          placeholder="Password"
          name="password"
        />
        <Button type="submit">{isLogging ? "Login" : "Signup"}</Button>
        {isLogging && <LinkText>Forgot Password?</LinkText>}
        {<GoogleLogin/>}
        <Text>
          {isLogging ? "Don't have an account?" : "Already have an account?"}
          <LinkText onClick={() => setIsLogging(!isLogging)}>
            {isLogging ? "Signup" : "Login"}
          </LinkText>
        </Text>
      </Form>
    </Section>
  );
}
