import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import styled from 'styled-components';
import SettingsPop from './SettingsPop'

const Section = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: hidden;
  margin: 0;
  padding: 0;

  @media(max-width: 500px){
    height: 100vh;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  position: relative;
  flex: 1;
`;

const Home = () => {
  return (
    <Section>
      <Sidebar />
      <Content>
        <Navbar />
        <Main>
          <SettingsPop />
          <ChatContainer />
        </Main>
      </Content>
    </Section>
  );
};

export default Home;
