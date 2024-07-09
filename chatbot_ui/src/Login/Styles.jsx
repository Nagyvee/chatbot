import styled from "styled-components";

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
  max-width: 400px;
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

// Input Field Component
const InputField = ({ type, name, value, placeholder, onChange, error }) => (
    <>
      <InputEl
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
    </>
  );

export { Section, StyledForm, SubHeading, InputEl, Button, Text, LinkText, LogoImage, ErrorMessageStyled, InputField }