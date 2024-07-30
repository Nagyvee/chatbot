import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit3, FiSave } from "react-icons/fi";
import axios from 'axios';
import {setUser} from '../../redux_state/actions'

const Container = styled.div`
  max-width: 300px;
  margin: auto;
  padding:0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const dispatch = useDispatch();

  const handleSave = () => {
    console.log(user)
    const URL = import.meta.env.VITE_SERVER_URL;
    try{
        const response = axios.post(`${URL}/user/update-profile`, {id: user.id, name: name},{withCredintials: true});
        const updatedUser ={
            ...user,
            name: name
        }
        dispatch(setUser(updatedUser))
    }catch(err){
        console.log(err)
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

      <SaveButton onClick={handleSave}>Save</SaveButton>
    </Container>
  );
};

export default Profile;
