import { useSelector } from "react-redux";
import styled from "styled-components";
import profileIcon from '../../assets/profile.jpg';
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  padding: 1rem;
  background-color: ${({ sender }) => (sender === 'user' ? '#e0f7fa' : '#f9f9f9')};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 70%;
  ${({ sender }) => sender === 'user' && 'align-self: flex-end;'}

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 0.75rem;
  }

  p {
    margin: 0 0 .75rem;
    color: #333;
    word-break: break-word;
  }

 span {
    font-size: 0.75rem;
    color: #999;
    position: absolute;
    bottom: 0.5rem;
    right: 0.75rem;
  }
`;

export default function Messages() {
  const pendingMessage = useSelector((state) => state.chat.pendingMessage);
  const chatsState = useSelector((state) => state.chat)
  const chatMessage = useSelector((state) => state.chat.userChats)

  const user = useSelector((state) => state.user.userDetails);

  return (
    <Container>
      {chatMessage.length > 0 && chatMessage.map(({ sender, message }, index) => (
        <Message key={index} sender={sender} className={sender === user ? 'sender-text' : 'chatbot-message'}>
          {sender === 'user' && <img src={user?.image ? user.image : profileIcon} alt="profile img" />}
          <p>{message}</p>
         {sender === 'Nayvee Bot' && <span>{sender}</span> }
        </Message>
      ))}
      {
        pendingMessage !== null ? (
          <Message sender='user' className='sender-text'>
          <img src={user?.image ? user.image : profileIcon} alt="profile img" />
          <p>{pendingMessage.message}</p>
        </Message>
        ): ''
      }
    </Container>
  );
}
