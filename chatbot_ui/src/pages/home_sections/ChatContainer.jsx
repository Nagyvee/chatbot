import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import msgIconImg from "../../assets/msg-icon.png";
import msgNortIcon from "../../assets/messagesNoti.png";
import { useSelector, useDispatch } from "react-redux";
import profileIcon from "../../assets/profile.jpg";
import { FaTrashAlt } from "react-icons/fa";
import Messages from "./Messaging";
import InputSec from "./InputSec";
import axios from "axios";
import { setChatHistory } from "../../redux_state/actions";
import TimeDifference from "./TimeConvert";
import { chooseChat, deleteHistory } from "./otherFunctions";
import ImagesSection from "./ImagesSection";

const Section = styled.section`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  padding: 0.35rem 3.5rem 0;

  .top-wrap {
    padding: 1rem 1rem 5rem;
    flex: 1;
    overflow-y: auto;
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    @media (max-width: 1000px) {
      padding: 0.5rem 0 5rem;
    }

    @media (max-width: 500px) {
      height: 100vh;
    }
  }

  .bottom-sec {
    width: 100%;
    background: #fff;
    z-index: 10;
    position: sticky;
    bottom: 0;
    padding-bottom: 0.5rem;

    @media (max-width: 500px) {
      padding-bottom: 6.5%;
    }
  }

  @media (max-width: 1000px) {
    padding: 0.35rem 1rem 0;
  }

  @media (max-width: 487px) {
    padding: 0.35rem 0.5rem 0;
  }
`;

const UpperSection = styled.div`
  margin-bottom: 0.6rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 0.85rem;
  color: #999;
`;

const HistorySection = styled.div`
  flex: 1;
  padding: 0.5rem 1rem 2.4rem;
  border: 1px solid #ddd;
  height: 80%;
  overflow-y: auto;
  border-radius: 8px;
  background: #fff;
  position: relative;
  margin-top: 0.65rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .failed {
    color: red;
    margin: 1rem auto;
    font-size: 0.9rem;
    font-weight: 450;
    text-align: center;

    span {
      cursor: pointer;
      font-size: 1rem;
      border-bottom: solid black 3px;

      &:hover {
        opacity: 0.55;
      }
    }
  }

  .delete-all {
    font-size: 14px;
    border: none;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    position: absolute;
    cursor: pointer;
    background-color: #bdf;
    height: fit-content;
    padding: 0.25rem;
    top: 0.8rem;
    right: 0.8rem;
    bottom: 3rem;
    display: flex;
    transition: transform 0.3s ease-in;

    &:hover {
      transform: translateY(3px);
      background-color: #faa;
    }

    svg {
      color: #ff6969;
    }

    p {
      font-size: 13px;
      margin: 0 0.4rem;
    }
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Center = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  img {
    margin-bottom: 1rem;
    width: 150px;
  }
`;

const HistoryChatsContainer = styled.div`
  margin-top: 1.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .wrapper {
    display: flex;
    flex: 1;
    max-width: 600px;
    min-width: 280px;
    padding: 0.5rem;
    position: relative;
    border-radius: 1.5px;
    cursor: pointer;
    background: #f9f9f9;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0e7ff;
    }
  }

  .img-wrap {
    width: 38px;
    position: relative;
    margin-right: 0.8rem;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: relative;
  }

  h4 {
    font-size: 0.85rem;
    margin: 0;
  }

  p {
    font-size: 0.75rem;
    word-spacing: 0.15rem;
    color: #999;
    margin: 0;
  }

  span {
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #999;
    border-radius: 50%;
    margin: 0 3px;
  }

  .badge {
    img {
      position: absolute;
      bottom: 7px;
      right: -0.4rem;
      width: 25px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const ChatContainer = () => {
  const user = useSelector((state) => state.user.userDetails);
  const activeChat = useSelector((state) => state.chat.activeChat);
  const pendingMessage = useSelector((state) => state.chat.pendingMessage);
  const chatMessage = useSelector((state) => state.chat.userChats);
  const count = useSelector((state) => state.chat.count);
  const historyChats = useSelector((state) => state.chat.chatsHistory);
  const [historyLoading, setHistoryLoading] = useState(false);
  const messageRef = useRef(null);
  const dispatch = useDispatch();
  const [failedMsg, setFailed] = useState({
    text: {
      status: false,
      msg: "",
    },
    image: {
      status: false,
      msg: "",
    },
  });
  const [errMsg, setErrMsg] = useState(false);
  const [retry, setRetry] = useState(0);
  const [typeChat, setTypeChat] = useState("");

  useEffect(() => {
    const fetchChatsHistory = async () => {
      setHistoryLoading(true);
      setErrMsg(false);
      try {
        const URL = import.meta.env.VITE_SERVER_URL;
        const response = await axios.post(
          `${URL}/chat/v2.5/user/history`,
          { userId: user.id },
          { withCredentials: true }
        );
        const data = response.data.data;
        dispatch(setChatHistory(data));
      } catch (error) {
        console.log(error);
        setErrMsg(true);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchChatsHistory();
  }, [activeChat, retry]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessage, pendingMessage, count]);

  return (
    <Section>
      <div className="top-wrap" ref={messageRef}>
        {activeChat.id === undefined && (
          <UpperSection>
            <Title>Get answers in seconds</Title>
            <Subtitle>Create and complete tasks using boards</Subtitle>
          </UpperSection>
        )}
        {activeChat.id !== undefined ? (
          activeChat.type === "image" ? (
            <ImagesSection failedMsg={failedMsg} />
          ) : (
            <Messages failedMsg={failedMsg} typeChat={typeChat} />
          )
        ) : (
          <HistorySection>
            <Title>Search History</Title>
            {errMsg && (
              <p className="failed">
                Error Fetching Chats History <br />{" "}
                <span onClick={() => setRetry(retry + 1)}>Retry</span>
              </p>
            )}
            {historyChats.length > 0 && (
              <div
                className="delete-all"
                onClick={() => deleteHistory(user.id, dispatch)}
              >
                <FaTrashAlt />
                <p>Clear All</p>
              </div>
            )}
            {historyChats.length === 0 ? (
              <Center>
                {historyLoading ? (
                  <div style={{ margin: "10% auto" }}>
                    <div style={{ width: "80px", margin: "1rem auto" }}>
                      {" "}
                      <div className="loader"></div>{" "}
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={msgIconImg} alt="No Questions" />
                    <Title>No Questions added</Title>
                    <Subtitle>
                      Type your questions below and get fast answers.
                    </Subtitle>
                  </>
                )}
              </Center>
            ) : (
              <HistoryChatsContainer>
                {historyChats.map((chat, index) => {
                  const timeDiff = TimeDifference(chat.time_created);
                  return (
                    <div
                      className="wrapper"
                      key={index}
                      onClick={() => chooseChat(chat.id, dispatch)}
                    >
                      <div style={{ position: "relative" }}>
                        <div className="img-wrap">
                          <img
                            src={user?.image ? user.image : profileIcon}
                            alt="profile img"
                          />
                          <div className="badge">
                            <img src={msgNortIcon} alt="message icon" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4>{chat.topic}</h4>
                        <p>
                          {chat.askedQuestionsCount} question(s) asked{" "}
                          <span></span> {timeDiff}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </HistoryChatsContainer>
            )}
          </HistorySection>
        )}
      </div>
      <div className="bottom-sec">
        <InputSec
          failedMsg={failedMsg}
          setFailed={setFailed}
          setTypeChat={setTypeChat}
        />
      </div>
    </Section>
  );
};

export default ChatContainer;
