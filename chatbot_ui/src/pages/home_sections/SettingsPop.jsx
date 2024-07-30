import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Members from './Members'
import Pricing from './Pricing'
import Profile from './Profile'
import { useParams, useNavigate } from "react-router-dom";
import Settings from './Settings'

const SettingsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 7.5%;
  width: 300px;
  height: 80vh;
  background: #f5f7f8;
  display: flex;
  flex-direction: column;
  z-index: 50;
  padding: 1.8rem 0.5rem;
  transition: transform 0.3s ease;
  transform: translateX(0);
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  z-index: 80;
  background: #ff0080;
  color: #fff;
  border: none;
  font-size: 1rem;
  border-radius: 0 0 10% 200%;
  padding: 0.7rem 1.1rem;
  cursor: pointer;
  transition: padding 0.3s ease, font-size 0.3s ease, background 0.3s ease;

  &:hover {
    background: #fc4100;
    padding: 0.85rem 1.35rem;
    font-size: 1.25rem;
  }
`;

const SettingsPop = () => {
  const navigate = useNavigate();

  const toggleSettings = () => {
   navigate('/')
  };

  const { id } = useParams()

  return (
    <>
      <SettingsContainer>
        <div className="wrap">
          <ToggleButton onClick={toggleSettings}>
            <FontAwesomeIcon icon={faTimes} />
          </ToggleButton>
        </div>
        { 
          id === 'members' ? <Members /> :
          id === 'pricing' ? <Pricing /> :
          id === 'profile' ? <Profile /> :
          id === 'settings' ? <Settings />:
          navigate('/')
        }
      </SettingsContainer>
    </>
  );
};

export default SettingsPop;
