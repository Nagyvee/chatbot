import { useSelector } from "react-redux";
import styled from "styled-components";
import profileIcon from '../../assets/profile.jpg';

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
    margin: 0;
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
  const chatMessages = [
    { id: 1, sender: 'user', message: "How to set up a vite app?" },
    { id: 2, sender: "Nayvee Bot", message: "To start a vite app, you need to go to your terminal and type npm create vite@latest. Follow the steps until you see your localhost site." },
    { id: 3, sender: 'user', message: "What is React?" },
    { id: 4, sender: "Nayvee Bot", message: "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies." },
    { id: 5, sender: 'user', message: "Can you explain Redux?" },
    { id: 6, sender: "Nayvee Bot", message: `In this code:

font-family: inherit; ensures the textarea uses the same font as the rest of your application.
line-height: 1.5; sets a normal line height for the text.
overflow: hidden; hides the scrollbar within the textarea.
This will give the textarea a consistent appearance with the rest of your application's text inputs while hiding the scrollbar and making the text look normal.

can you make the text area to increase its hight to atleast 250px when text is a lot afer 250px you can scroll to see the hidden text but you cant see the scroll bar
ChatGPT
To make the textarea increase its height up to 250px and allow scrolling without showing the scrollbar, you can use the following styles:

Set max-height to 250px.
Use overflow-y: auto to enable vertical scrolling.
Use ::-webkit-scrollbar to hide the scrollbar.` }
  ];

  const user = useSelector((state) => state.user.userDetails);

  return (
    <Container>
      {chatMessages.map(({ sender, message }, index) => (
        <Message key={index} sender={sender} className={sender === user ? 'sender-text' : 'chatbot-message'}>
          {sender === 'user' && <img src={user?.image ? user.image : profileIcon} alt="profile img" />}
          <p>{message}</p>
         {sender === 'Nayvee Bot' && <span>{sender}</span> }
        </Message>
      ))}
    </Container>
  );
}
