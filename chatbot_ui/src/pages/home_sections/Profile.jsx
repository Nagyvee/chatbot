import { useState } from "react";
import styled from "styled-components";
import { setTokenToLocal } from '../../Login/Validate';
import { useSelector, useDispatch } from "react-redux";
import { FiEdit3, FiSave } from "react-icons/fi";
import axios from "axios";
import { setUser } from "../../redux_state/actions";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 300px;
  margin: auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .updated{
    color: green;
    margin: 1rem auto;
    font-size: 0.9rem;
    font-weight: 350;
    text-align: center;
  }

  .failed{
    color: red;
    margin: 1rem auto;
    font-size: 0.9rem;
    font-weight: 350;
    text-align: center;
  }

  .validation-error {
    color: red;
    margin-top: 10px;
    font-size: 0.85rem;
  }
`;

const InfoSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InfoItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #555;
`;

const Value = styled.div`
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  width: calc(100% - 100px);
  padding: 8px;
  font-size: 14px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const Profile = () => {
  const user = useSelector((state) => state.user.userDetails);
  const [name, setName] = useState(user.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [validationError, setValidationError] = useState("");
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const navigate = useNavigate();

  const validateName = (name) => {
    if (name.length < 4) {
      return "Name must be at least 4 characters long.";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Name can only contain letters and spaces.";
    }
    return "";
  };

  const handleSave = async () => {
    if (isLoading) return;
    setValidationError('')

    const validationError = validateName(name);
    if (validationError) {
      setValidationError(validationError);
      return;
    }

    const URL = import.meta.env.VITE_SERVER_URL;
    setErrMsg(false);
    setIsEditingName(false);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${URL}/user/update-profile`,
        { id: user.id, name: name },
        { withCredentials: true }
      );
      setTokenToLocal(response.data.token);
      const updatedUser = {
        ...user,
        name: name,
      };
      dispatch(setUser(updatedUser));
      setProfileSaved(true);
      setTimeout(() => {
        setProfileSaved(false);
        navigate('/');
      }, 2500);
    } catch (err) {
      setErrMsg(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <InfoSection>
        <InfoItem>
          <Label>Email:</Label>
          <Value>{user.email}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Name:</Label>
          {isEditingName ? (
            <Input
              minLength={4}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <Value>{name}</Value>
          )}
          <EditButton onClick={() => setIsEditingName(!isEditingName)}>
            {isEditingName ? <FiSave /> : <FiEdit3 />}
          </EditButton>
        </InfoItem>
      </InfoSection>

      {validationError && <p className="validation-error">{validationError}</p>}
      {profileSaved ? (
        <p className='updated'>Profile updated successfully.</p>
      ) : (
        <SaveButton onClick={handleSave}>
          {isLoading ? "Saving, Please wait..." : "Save"}
        </SaveButton>
      )}
      {errMsg && <p className="failed">Server Connection Error</p>}
    </Container>
  );
};

export default Profile;
