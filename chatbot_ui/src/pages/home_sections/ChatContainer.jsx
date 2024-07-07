import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import msgIconImg from '../../assets/msg-icon.png';
import msgNortIcon from '../../assets/messagesNoti.png';
import { useSelector } from 'react-redux';
import profileIcon from '../../assets/profile.jpg';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: .35rem 3.5rem;

  .bottom-sec{
    width: 100%;
    background: #fff;
    z-index: 10;
    position: sticky;
    bottom: -1.1rem;
    padding-bottom: 1rem;
    margin-top: 3rem;
  }
`;

const UpperSection = styled.div`
  margin-bottom: .6rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: .85rem;
  color: #999;
`;

const HistorySection = styled.div`
  flex: 1;
  padding: .5rem 1rem 2.4rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  margin-top: .65rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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
  margin-top: .5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  .wrapper {
    display: flex;
    padding: .5rem;
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
    margin-right: .65rem;
    position: relative;
  }

  h4 {
    font-size: .85rem;
    margin: 0;
  }

  p {
    font-size: .75rem;
    word-spacing: .15rem;
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
      right: -5px;
      width: 25px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const MessageSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  width: 100%;
  position: relative;
  bottom: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  padding-right: 2.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #999;
  }

  &:focus {
    border: none;
    outline: none;
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
`;

const Footer = styled.p`
  font-size: .85rem;
  margin-top: 1rem;
  text-align: center;
  color: #999;
`;

const ChatContainer = () => {
  const user = useSelector((state) => state.user.userDetails);
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
      <UpperSection>
        <Title>Get answers in seconds</Title>
        <Subtitle>Create and complete tasks using boards</Subtitle>
      </UpperSection>
      <HistorySection>
        <Title>Search History</Title>
        {historyChats.length === 0 ? (
          <Center>
            <img src={msgIconImg} alt="No Questions" />
            <Title>No Questions added</Title>
            <Subtitle>Type your questions below and get fast answers.</Subtitle>
          </Center>
        ) : (
          <HistoryChatsContainer>
            {historyChats.map((chat, index) => (
              <div className="wrapper" key={index}>
                <div style={{ position: 'relative' }}>
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
                    {chat.qstns} questions asked <span></span> {chat.time} ago.
                  </p>
                </div>
              </div>
            ))}
          </HistoryChatsContainer>
        )}
      </HistorySection>
      <div className='bottom-sec'>
      <MessageSection>
        <Input type="text" placeholder="Write Coding about new HTML Tags" />
        <SendButton>
          <FontAwesomeIcon icon={faPaperPlane} />
        </SendButton>
      </MessageSection>
      <Footer>Let's Talk AI Chat V2.5</Footer>
      </div>
    </Section>
  );
};

export default ChatContainer;
