import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveChat,
  setPendingMessage,
  addChat,
  lastChatAnimated
} from "../../redux_state/actions";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const MessageSection = styled.form`
  display: flex;
  height: fit-content;
  padding-top: 0;
  width: calc(100%);
  position: reletive;
  margin: 0;
`;

const Input = styled.textarea`
  flex: 1;
  margin-top: 0;
  padding: 0.5rem;
  padding-right: 2.5rem;
  border-radius: 1px;
  border: 1px solid #ddd;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  resize: none;
  min-height: 50px;
  overflow-y: auto;

  &::placeholder {
    color: #999;
  }

  &:focus {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  top: 15%;
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

  &:hover{
  background: #1C1678;
  }
`;

const Footer = styled.p`
  font-size: 0.85rem;
  margin-top: 0.2rem;
  text-align: center;
  color: #999;
`;

const InputSec = ({setFailed}) => {
  const [messageValue, setMessageValue] = useState("");
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.activeChat);
  const userId = useSelector((state) => state.user.userDetails.id);
  const history = useSelector((state) => state.chat.userChats);
  const pendingMessage = useSelector((state) => state.chat.pendingMessage);

  const handleSend = async (event) => {
    event.preventDefault();
    setFailed(false)

    let activeChat = chatId;
    if (activeChat === undefined) {
      const chat_id = uuidv4();
      dispatch(setActiveChat(chat_id));
      activeChat = chat_id;
    }
    const senderObj = { sender: "user", message: messageValue };
    dispatch(setPendingMessage(senderObj));

    const URL = import.meta.env.VITE_SERVER_URL;

    try {
      setMessageValue("");
      const response = await axios.post(
        `${URL}/chat/v2.5/nayveechat/`,
        { userId, ...senderObj, history, chatId: activeChat },
        { withCredentials: true }
      );
      await dispatch(lastChatAnimated(true));
      await dispatch(addChat({ id: Date.now(), ...senderObj }));
      await dispatch(
        addChat({ id: Date.now(), sender: "Nayvee", message: response.data })
      );
    } catch (error) {
      setFailed(true)
      setMessageValue(senderObj.message);
    } finally {
      dispatch(setPendingMessage(null));
    }
  };

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
};

export default InputSec;
