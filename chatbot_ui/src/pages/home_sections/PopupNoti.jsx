import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 300px;
  background-color: ${({ type }) => (type === 'success' ? '#4caf50' : '#f44336')};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: 1000;
`;

const Message = styled.p`
  margin: 0;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background-color: #ffffff;
  color: ${({ type }) => (type === 'success' ? '#4caf50' : '#f44336')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ type }) => (type === 'success' ? '#43a047' : '#e53935')};
    color: #ffffff;
  }
`;

const PopUpNotification = ({ message, type, onClose }) => {
  return (
    <Container type={type}>
      <Message>{message}</Message>
      <CloseButton type={type} onClick={onClose}>Close</CloseButton>
    </Container>
  );
};

export default PopUpNotification;
