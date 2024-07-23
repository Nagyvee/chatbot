import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const MessageSection = styled.form`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
  position: relative;
  bottom: 10px;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 0.75rem;
  padding-right: 2.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  resize: none;
  max-height: 500px;
  overflow-y: auto;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border: none;
    outline: none;
  }

  /* Hide the scrollbar */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const SendButton = styled.button`
  position: absolute;
  right: 0.5rem;
  padding: 0.5rem;
  background: #5a67d8;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.p`
  font-size: 0.85rem;
  margin-top: 1rem;
  text-align: center;
  color: #999;
`;

const InputSec = () => {
  const [messageValue, setMessageValue] = useState('');

  const handleSend = (event) => {
    event.preventDefault();
    if (messageValue.length <= 2) {
      alert("Message must be longer than 2 characters.");
      return;
    }

    console.log('sending..', messageValue);
    setMessageValue(''); 
  }

  return (
    <>
      <MessageSection onSubmit={handleSend}>
        <Input
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          type="text"
          required
          placeholder="Write Coding about new HTML Tags"
        />
        <SendButton type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </SendButton>
      </MessageSection>
      <Footer>Nayvee Chat AI Chat V2.5</Footer>
    </>
  );
}

export default InputSec;
