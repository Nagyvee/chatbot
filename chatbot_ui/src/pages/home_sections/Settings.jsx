import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'

const Container = styled.div`
  padding: 20px;
  width: 100%;
  background-color: #fff;
  height: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

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
  }

  .setting:last-child {
    border-bottom: none;
  }

  .setting button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .setting button:hover {
    background-color: #f0f0f0;
  }
`;

const Settings = () => {
  const  navigate = useNavigate()
  const handleContactSupport = () => {
    window.location.href = 'mailto:nayvee@techie.com';
  };

  const handleRateApp = () => {
    window.open('https://www.example.com/rate-us', '_blank');
  };

  const handlePrivacyPolicy = () => {
    navigate('/privacy-policy')
    window.open('https://localhost:5173/privacy-policy', '_blank');
  };

  const handleTermsOfService = () => {
    window.open('https://www.example.com/terms-of-service', '_blank');
  };

  const handleLogout = () => {
    // Add logout functionality here
    console.log('User logged out');
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
        <span>Email: nayvee@techie.com</span>
      </div>
      <div className="setting">
        <span>Web: www.nayveetech.co.za</span>
      </div>
    </Container>
  );
};

export default Settings;
