import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import styled from 'styled-components';
import { useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";

const Section = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: hidden;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding:0 1rem;
  overflow-y: hidden;
    /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const Home = () => {
  const pendingMessage = useSelector((state) => state.chat.pendingMessage);
  const chatMessage = useSelector((state) => state.chat.userChats);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [chatMessage, pendingMessage]);

  return (
    <Section>
      <Sidebar />
      <Content>
        <Navbar />
        <Main ref={messageRef} >
          <ChatContainer />
        </Main>
      </Content>
    </Section>
  );
};

export default Home;
