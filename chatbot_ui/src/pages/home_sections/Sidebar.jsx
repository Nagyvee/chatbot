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
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, deleteChats } from "../../redux_state/actions";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
import { NavLink, Link, useLocation } from "react-router-dom";
import InstallButton from './Installbtn';

const SidebarContainer = styled.div`
  width: 180px;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  z-index: 100;
  flex-direction: column;
  padding: 1.8rem 0.5rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;

  a {
    text-decoration: none;
    color: #000;
  }

  @media (max-width: 975px) {
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
    position: fixed;
    z-index: 100;
    height: 100%;
  }

  .failed {
    color: red;
    margin: 1.8rem auto;
    font-size: 0.85rem;
    font-weight: 450;
    text-align: center;
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

  .active {
    background: #5a67d8;
    color: #fff;

    svg {
      color: #fff;
  }
`;

const NavItem = styled.li`
  display: flex;
  font-size: 0.9rem;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.2s;
  position: relative;

  span {
    position: absolute;
    left: 27%;
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

    svg{
    margin-right: .3rem;
    }
  }

  &:hover {
    background: #e2e8f0;
  }
  }

  .active li {
    background: #5a67d8;
    color: #fff;

    svg {
      color: #fff;
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
  const LimitData = useSelector((state) => state.chat.userImagesChats);
  const chats = useSelector((state) => state.chat.userChats);
  const [errMsg, setErrMsg] = useState(false);
  const location = useLocation();

  const handleLogOut = async () => {
    try {
      const URL = import.meta.env.VITE_SERVER_URL;
      await axios.post(`${URL}/user/logout`, "", { withCredentials: true });
      localStorage.clear();
      toggleSidebar();
      window.location.href = "/user/auth";
    } catch (error) {
      setErrMsg(true);
      setTimeout(() => {
        setErrMsg(false);
      }, 10000);
    }
  };
  console.log(location);
  const newChat = () => {
    if (
      activeChat.id === undefined ||
      (chats.length < 1 && activeChat.type !== "image")
    ) {
      toggleSidebar();
      return;
    }
    const chatId = uuidV4();
    dispatch(
      setActiveChat({
        id: chatId,
        type: "text",
      })
    );
    dispatch(deleteChats());
    toggleSidebar();
  };

  const imageChat = () => {
    dispatch(
      setActiveChat({
        id: "nayveeImgChat",
        type: "image",
      })
    );
    toggleSidebar();
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
          <Link
            to={"/"}
            className={
              activeChat.id === undefined ||
              (chats.length < 1 &&
                activeChat.type !== "image" &&
                location.pathname === "/")
                ? "active"
                : ""
            }
          >
            <NavItem onClick={newChat}>
              <FontAwesomeIcon icon={faRobot} />
              <span>
                {activeChat.id === undefined ||
                (chats.length < 1 && activeChat.type !== "image")
                  ? "Nayvee AI"
                  : "New Chat"}
              </span>
            </NavItem>
          </Link>
          <Link to={"/"}>
          <NavItem
            onClick={imageChat}
            style={{display: "block"}} 
            className={
              activeChat.type === "image" && location.pathname === "/"
                ? "active"
                : ""
            }
          >
            
            <FontAwesomeIcon icon={faImage} />
            {
              activeChat.type === "image" && location.pathname === "/" && LimitData?.dailyUsage
                ? <span style={{fontSize: '.83rem'}}>Daily Limit {LimitData.dailyUsage}/ 3</span> 
                :  <span>Images AI</span>
            }
          </NavItem>
          </Link>
          <Link to={"/"}>
            <NavItem
              onClick={() => {
                dispatch(setActiveChat({ id: undefined, type: "text" }));
                dispatch(deleteChats());
                toggleSidebar();
              }}
            >
              <FontAwesomeIcon icon={faCommentAlt} />
              <span>Chats History</span>
            </NavItem>
          </Link>
          <NavLink to={"/members"}>
            <NavItem onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUsers} />
              <span>Chatbot users</span>
            </NavItem>
          </NavLink>
          <NavLink to={"/pricing"}>
            <NavItem onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faDollarSign} />
              <span>Pricing</span>
            </NavItem>
          </NavLink>
          <NavLink to={"/settings"}>
            <NavItem onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </NavItem>
          </NavLink>
          <NavLink to={"/profile"}>
            <NavItem onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUserCog} />
              <span>Profile</span>
            </NavItem>
          </NavLink>
          <InstallButton />
          <NavItem className="logout" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            LogOut
          </NavItem>
          {errMsg && <p className="failed">Error logging out</p>}
        </NavList>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
