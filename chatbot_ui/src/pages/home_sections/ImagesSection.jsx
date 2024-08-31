import React from 'react';
import { Container, Message, ChatMessage } from "./Messaging";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {setImageChat} from '../../redux_state/actions';
import NayveeIcon from "../../assets/nayvee_logo_ icon_nobg.png";
import axios from "axios";

// Keyframes for loading spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Image = styled.img`
  width: 100%;
  max-width: 450px;
  height: auto;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  object-fit: contain;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
  margin-right: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const Limit = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  top: 0;
  font-size: 0.7rem;
  color: #333;
`;

const NoticeSection = styled.div`
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 2rem 0;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1rem;
  }
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #d9534f;
`;

const ImagesSection = ({ failedMsg }) => {
  const user = useSelector((state) => state.user.userDetails);
  const URL = import.meta.env.VITE_SERVER_URL;
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.chat.userImagesChats);
  const pendingMessage = useSelector((state) => state.chat.pendingMessage.image);
  const [isLoading, setIsLoading] = useState({
    dataLoading: false,
    downLoading: false,
  });
  const [errMsg, setErrMsg] = useState({
    dataErr: "",
    downloadErr: "",
  });

  useEffect(() => {
    imagesData();
  }, []);

  const imagesData = async () => {
    setIsLoading({ ...isLoading, dataLoading: true });
    try {
      const response = await axios.post(
        `${URL}//chat/v2.5/nayveechat/get/images`,
        { userId: user.id },
        { withCredentials: true }
      );
      dispatch(setImageChat(response.data));
      console.log(response.data);
    } catch (err) {
      setErrMsg({ ...errMsg, dataErr: "Error getting data" });
    } finally {
      setIsLoading({ ...isLoading, dataLoading: false });
    }
  };

  const downloadImage = async (url) => {
    setIsLoading({ ...isLoading, downLoading: true });
    setErrMsg({ ...errMsg, downloadErr: "" });
    try {
      const response = await axios.post(
        `${URL}/image/download`,
        { fileUrl: url },
        { withCredentials: true, responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "image/png" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `nayvee-chat-generated-image${Date.now()}.png`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMsg("Download started");
    } catch (error) {
      setErrMsg({ ...errMsg, downloadErr: "Error downloading image" });
    } finally {
      setIsLoading({ ...isLoading, downLoading: false });
    }
  };

  return (
    <Container style={{ position: "relative" }}>
      {isLoading.dataLoading && <Spinner />}
      {data?.data?.length > 1 ? (
        data.data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.sender === "Nayvee" ? (
                <Message
                  sender="Nayvee"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: "fit-content",
                  }}
                >
                  <Image src={item.content} alt="generated image" />
                  <Button
                    onClick={() => downloadImage(item.content)}
                    disabled={isLoading.downLoading}
                  >
                    {isLoading.downLoading && <Spinner />}
                    {isLoading.downLoading
                      ? "Downloading..."
                      : "Download Image"}
                  </Button>
                  {errMsg.downloadErr && (
                    <ErrorMessage>{errMsg.downloadErr}</ErrorMessage>
                  )}
                </Message>
              ) : (
                <ChatMessage
                  key={index}
                  sender={item.sender}
                  message={item.content}
                  user={user}
                />
              )}
            </React.Fragment>
          );
        })
      ) : !pendingMessage ? (
        <NoticeSection>
          <h3>Important Notice</h3>
          <p>
            All generated images are available for <Highlight>1 hour</Highlight> only.
            Please download your desired images within this time frame.
          </p>
          <p>
            You have a daily limit of <Highlight>3 image generations</Highlight>.
            If you like the image, download it before it disappears!
          </p>
          <p>
            Type your prompt below to generate your first image 🥰
          </p>
        </NoticeSection>
      ) : null}
      {data?.data.length < 1 && (
        <Limit>
          <p>Daily Limit: {data.dailyUsage}/ 3</p>
        </Limit>
      )}
      {pendingMessage && (
        <>
          <ChatMessage
            sender="user"
            message={pendingMessage.content}
            user={user}
          />
          <div className="loading">
            <img src={NayveeIcon} alt="Nayvee Logo" className="nayvee-logo" />
            <span>Nayvee processing...</span>
          </div>
        </>
      )}
      {failedMsg.image.status && (
        <p className="failed">{failedMsg.image.msg}</p>
      )}
    </Container>
  );
};

export default ImagesSection;
