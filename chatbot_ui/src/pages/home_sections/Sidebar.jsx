import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoImg from "../../assets/nayvee_logo_ icon_nobg.png";
import {
  faRobot,
  faUsers,
  faDollarSign,
  faCog,
  faSignOutAlt,
  faCommentAlt,
  faUserCog,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, deleteChats } from "../../redux_state/actions";
import axios from 'axios';
import { v4 as uuidV4 } from "uuid";

const SidebarContainer = styled.div`
  width: 180px;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 1.8rem 0.5rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;

  @media (max-width: 975px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    position: fixed;
    z-index: 1000;
    height: 100%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: auto;
  height: auto;
  border-radius: 4px;
  height: 55px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  display: flex;
  font-size: 0.9rem;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.2s;
  position: relative;

  span {
    position: absolute;
    left: 25%;
  }

  &.logout {
    position: absolute;
    padding: 0.6rem;
    color: #000;
    font-weight: 450;
    bottom: 1rem;
    right: 1.5rem;
    left: 1rem;
    background-color: #fac5b8;
  }

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

const ToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: #5a67d8;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #4c51bf;
  }

  @media (min-width: 975px) {
    display: none;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.chat.activeChat);
  const chats = useSelector((state) => state.chat.userChats);

  const handleLogOut = async () => {
    try {
      const URL = import.meta.env.VITE_SERVER_URL;
      await axios.post(`${URL}/user/logout`, "", { withCredentials: true });
      localStorage.clear();
      toggleSidebar()
      window.location.href = '/user/auth';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const newChat = () => {
    if (activeChat === undefined || chats.length < 1) {
      return;
    }
    const chatId = uuidV4();
    dispatch(setActiveChat(chatId));
    dispatch(deleteChats());
    toggleSidebar()
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </ToggleButton>
      <SidebarContainer isOpen={isOpen}>
        <LogoContainer>
          <Logo src={LogoImg} alt="Logo image" />
        </LogoContainer>
        <NavList>
          <NavItem className="active" onClick={newChat}>
            <FontAwesomeIcon icon={faRobot} />
            <span>{activeChat === undefined || chats.length < 1 ? 'Nayvee AI' : 'New Chat'}</span>
          </NavItem>
          <NavItem onClick={() => {
            dispatch(setActiveChat(undefined))
            toggleSidebar()
            }}>
            <FontAwesomeIcon icon={faCommentAlt} />
            <span>Chats History</span>
          </NavItem>
          <NavItem onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faUsers} />
            <span>Members</span>
          </NavItem>
          <NavItem onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faDollarSign} />
            <span>Pricing</span>
          </NavItem>
          <NavItem onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </NavItem>
          <NavItem onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faUserCog} />
            <span>Profile</span>
          </NavItem>
          <NavItem className="logout" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            LogOut
          </NavItem>
        </NavList>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
