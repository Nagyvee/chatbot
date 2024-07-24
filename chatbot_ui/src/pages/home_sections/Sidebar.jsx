import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoImg from "../../assets/nayveechat-logo.png";
import {
  faRobot,
  faUsers,
  faPlug,
  faUserFriends,
  faDollarSign,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 1.8rem .5rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 80%;
  height: 400px;
  border-radius: 4px;
  height: auto;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  display: flex;
  font-size: .9rem;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.2s;
  

  &:hover {
    background: #e2e8f0;
  }

  &.active {
    background: #5a67d8;
    color: #fff;

    svg {
      color: #fff;
    }
  }

  svg {
    margin-right: 1rem;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={LogoImg} alt="Logo image"/>
      </LogoContainer>
      <NavList>
        <NavItem className="active">
          <FontAwesomeIcon icon={faRobot} />
          AI Chat
        </NavItem>
        <NavItem>
          <FontAwesomeIcon icon={faUsers} />
          Members
        </NavItem>
        <NavItem>
          <FontAwesomeIcon icon={faPlug} />
          <span>Integrations</span> 
        </NavItem>
        <NavItem>
          <FontAwesomeIcon icon={faUserFriends} />
          Refer friends
        </NavItem>
        <NavItem>
          <FontAwesomeIcon icon={faDollarSign} />
          Pricing Plans
        </NavItem>
        <NavItem>
          <FontAwesomeIcon icon={faCog} />
         Settings
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
