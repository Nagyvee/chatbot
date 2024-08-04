import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import styled from "styled-components";
import SettingsPop from "./SettingsPop";
import { useParams } from "react-router-dom";

const Section = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: hidden;
  margin: 0;
  padding: 0;

`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  position: relative;
  flex: 1;
`;

const Home = () => {
  const { id } = useParams();
  return (
    <Section>
      <Sidebar />
      <Content>
        <Navbar />
        <Main>
          {id !== undefined && <SettingsPop />}
          <ChatContainer />
        </Main>
      </Content>
    </Section>
  );
};

export default Home;
