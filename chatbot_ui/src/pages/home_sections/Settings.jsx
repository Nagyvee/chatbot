import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaGlobe, FaTrash } from "react-icons/fa";

const Container = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #fff;
  height: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ebebeb;

    .icons {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        color: blue;
        margin-right: 1rem;
        font-size: 1.3rem;
      }
    }
  }

  .setting:last-child {
    border-bottom: none;
  }

  .setting button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #d9d9d9;
    }
  }

  .delete {
    position: absolute;
    bottom: 0.75rem;
    border-radius: 3px;
    cursor: pointer;
    background-color: #FF4B91;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    box-shadow: 0 2px 4px gray;
    transition: box-shadow .4s ease;

    &:hover{
    box-shadow: 4px 4px 8px gray;
    }
  }
`;

const Settings = () => {
  const navigate = useNavigate();
  const handleContactSupport = () => {
    window.location.href = "mailto:nayvee@techie.com";
  };

  const handleRateApp = () => {
    window.open("https://www.example.com/rate-us", "_blank");
  };

  const handlePrivacyPolicy = () => {
    window.open("http://localhost:5173/privacy-policy", "_blank");
  };

  const handleTermsOfService = () => {
    window.open("http://localhost:5173/terms-of-service", "_blank");
  };

  const handleDelete = () => {
    window.location.href = "mailto:nayvee@techie.com?subject=Delete my Nayvee Chat account.";
  };

  return (
    <Container>
      <h2>Settings</h2>
      <div className="setting">
        <span>Contact Support</span>
        <button onClick={handleContactSupport}>Contact</button>
      </div>
      <div className="setting">
        <span>Rate Our App</span>
        <button onClick={handleRateApp}>Rate</button>
      </div>
      <div className="setting">
        <span>Privacy Policy</span>
        <button onClick={handlePrivacyPolicy}>View</button>
      </div>
      <div className="setting">
        <span>Terms of Service</span>
        <button onClick={handleTermsOfService}>View</button>
      </div>
      <div className="setting">
        <div className="icons">
          <FaEnvelope />{" "}
          <a href="mailto:nayvee@techie.com">nayvee@techie.com</a>{" "}
        </div>
      </div>
      <div className="setting">
        <div className="icons">
          <FaGlobe />{" "}
          <a href="https://www.nayveetech.co.za"> www.nayveetech.co.za </a>
        </div>
      </div>
      <div className="delete" onClick={handleDelete}>
          <FaTrash /> Request Account Deletion
      </div>
    </Container>
  );
};

export default Settings;
