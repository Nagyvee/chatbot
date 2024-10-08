import styled from "styled-components";
import NayveeTechLogo from "../assets/nayveetech_logo.png";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

const Loader = styled.div`
  position: absolute;
  top: 35%;
  bottom: 5%;
  left: 2%;
  right: 2%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  background-color: #f4f4f9;

  h3{
  font-size: .9rem;
  font-weight: 500;
  }

    h4{
  font-size: .85rem;
  font-weight: 350;
  }


`;

const StyledForm = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 400px;
  min-width: 250px;
  align-items: center;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .password-wrap {
    position: relative;
  }
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

const EyeIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 7px;
  cursor: pointer;
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
  color: #665;
  text-align: center;
`;

const LinkText = styled.span`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoSec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

const LogoImage = styled.img`
  width: auto;
  border-radius: 4px;
  height: 80px;
  padding: 0.15rem 0.65rem;
  box-shadow: 0 2px 4px gray;
  cursor: pointer;
`;

const LogoText = styled.h3`
  font-size: 1.5rem;
  color: #007bff;
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

export {
  Section,
  StyledForm,
  SubHeading,
  InputEl,
  Button,
  Text,
  LinkText,
  LogoSec,
  LogoImage,
  LogoText,
  ErrorMessageStyled,
  EyeIcon,
  InputField,
  Loader,
};
