import React, { useState, useEffect } from "react";
import styled from "styled-components";
import msgIconImg from "../../assets/msg-icon.png";
import msgNortIcon from "../../assets/messagesNoti.png";
import { useSelector } from "react-redux";
import profileIcon from "../../assets/profile.jpg";
import Messages from "./Messaging";
import InputSec from './InputSec';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.35rem 3.5rem 0;

  .bottom-sec {
    width: 100%;
    background: #fff;
    z-index: 10;
    position: sticky;
    bottom: 0;
    padding-bottom: .5rem;
    margin-top: 10rem;
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
  border-radius: 8px;
  background: #fff;
  margin-top: 0.65rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  .wrapper {
    display: flex;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    background: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0e7ff;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 0.65rem;
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
      bottom: 6px;
      right: -8px;
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
  const historyChats = [
    { title: 'How can I code', qstns: 10, time: '34min' },
    { title: 'How can I code', qstns: 10, time: '34min' },
    { title: 'How can I code', qstns: 10, time: '34min' },
    { title: 'How can I code', qstns: 10, time: '34min' },
    { title: 'How can I code', qstns: 10, time: '34min' },
    { title: 'How can I code', qstns: 10, time: '34min' }
  ];

  return (
    <Section>
      {activeChat !== undefined &&(
        <UpperSection>
          <Title>Get answers in seconds</Title>
          <Subtitle>Create and complete tasks using boards</Subtitle>
        </UpperSection>
      )}
      {activeChat ? (
        <Messages />
      ) : (
        <HistorySection>
          <Title>Search History</Title>
          {historyChats.length === 0 ? (
            <Center>
              <img src={msgIconImg} alt="No Questions" />
              <Title>No Questions added</Title>
              <Subtitle>
                Type your questions below and get fast answers.
              </Subtitle>
            </Center>
          ) : (
            <HistoryChatsContainer>
              {historyChats.map((chat, index) => (
                <div className="wrapper" key={index}>
                  <div style={{ position: "relative" }}>
                    <img
                      src={user?.image ? user.image : profileIcon}
                      alt="profile img"
                    />
                    <div className="badge">
                      <img src={msgNortIcon} alt="message icon" />
                    </div>
                  </div>
                  <div>
                    <h4>{chat.title}</h4>
                    <p>
                      {chat.qstns} questions asked <span></span> {chat.time}{" "}
                      ago.
                    </p>
                  </div>
                </div>
              ))}
            </HistoryChatsContainer>
          )}
        </HistorySection>
      )}
      <div className="bottom-sec">
        <InputSec />
      </div>
    </Section>
  );
};

export default ChatContainer;
