import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import styled from 'styled-components';

const Section = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const Home = () => {
  return (
    <Section>
      <Sidebar />
      <Content>
        <Navbar />
        <Main>
          <ChatContainer />
        </Main>
      </Content>
    </Section>
  );
};

export default Home;
