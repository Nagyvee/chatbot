import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveChat,
  setPendingMessage,
  addChat,
  setImageChat,
} from "../../redux_state/actions";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const MessageSection = styled.form`
  display: flex;
  height: fit-content;
  padding-top: 0;
  width: calc(100%);
  position: relative;
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

  &:hover {
    background: #1c1678;
  }
`;

const Footer = styled.p`
  font-size: 0.85rem;
  margin-top: 0.2rem;
  text-align: center;
  color: #999;
`;

const InputSec = ({ setFailed, failedMsg, setTypeChat }) => {
  const [messageValue, setMessageValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.activeChat.id);
  const userId = useSelector((state) => state.user.userDetails.id);
  const history = useSelector((state) => state.chat.userChats);
  const pendingMessage = useSelector((state) => state.chat.pendingMessage);
  const activeUserChat = useSelector((state) => state.chat.activeChat);
  const userImagesChats = useSelector((state) => state.chat.userImagesChats);

  const handleSend = async (event) => {
    event.preventDefault();
    setFailed({
      text: {
        status: false,
        msg: ''
      },
      image:  {
        status: false,
        msg: ''
      },
    });
    setIsSending(true);
    setTypeChat("");

    const senderObj = { sender: "user", message: messageValue };

    let activeChat = chatId;
    if (activeUserChat.type === "image") {
      dispatch(
        setPendingMessage({
          ...pendingMessage,
          image: { sender: "user", content: messageValue },
        })
      );
    } else {
      if (activeUserChat.id === undefined) {
        const chat_id = uuidv4();
        dispatch(setActiveChat({ type: "text", id: chat_id }));
        activeChat = chat_id;
      }
      dispatch(setPendingMessage({ ...pendingMessage, text: senderObj }));
    }
    let serverUrl = import.meta.env.VITE_SERVER_URL;
    const URL =
      activeUserChat.type === "image"
        ? `${serverUrl}/chat/v2.5/nayveechat/image`
        : `${serverUrl}/chat/v2.5/nayveechat`;

    try {
      setMessageValue("");
      const response = await axios.post(
        URL,
        { userId, ...senderObj, history, chatId: activeChat },
        { withCredentials: true }
      );
      if (activeUserChat.type === "image") {
        let newData = userImagesChats.data;
        newData.push({ sender: "user", content: senderObj.message });
        newData.push({ sender: "Nayvee", content: response.data });
        const usage = userImagesChats.dailyUsage + 1
        await dispatch(setImageChat({...userImagesChats,dailyUsage: usage, data: newData}));
      } else {
        await dispatch(addChat({ id: Date.now(), ...senderObj }));
        await dispatch(
          addChat({ id: Date.now(), sender: "Nayvee", message: response.data })
        );
        setTypeChat(response.data);
      }
    } catch (error) {
      console.log(error)
     if(activeUserChat.type === 'image'){ 
      setFailed({...failedMsg,   
        image: {
        status: true,
        msg: error?.response?.data?.error || 'Connection error. Plese try again'
      }});
    }else{
      setFailed({...failedMsg,   
        text:{
        status: true,
        msg:'Connection error. Plese try again'
      }});
    }
      setMessageValue(senderObj.message);
    } finally {
      setIsSending(false);
      dispatch(setPendingMessage({ text: null, image: null }));
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
        <SendButton type="submit" disabled={isSending}>
          {isSending ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )}
        </SendButton>
      </MessageSection>
      <Footer>Nayvee Chat AI V2.5</Footer>
    </>
  );
};

export default InputSec;
