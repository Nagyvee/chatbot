import styled from "styled-components";

const Container = styled.div`
  padding: 0;
  text-align: center;
  overflow-y: scroll;

  .modal {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #dcf9e0 0%, #ffffff 30.21%);
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01),
      0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09),
      0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .banner {
    width: 100%;
    height: 30px;
    margin: 0;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .title {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    color: #2b2b2f;
    margin-bottom: 15px;
  }

  .description {
    max-width: 80%;
    margin: auto;
    line-height: 1.2rem;
    font-weight: 400;
    font-size: .9rem;
    text-align: center;
    color: #5f5d6b;
  }

  .tab-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    padding: 2px;
    background-color: #ebebec;
    border-radius: 9px;
    margin: 10px 20px 0px 20px;
  }

  .indicator {
    content: "";
    width: 50%;
    height: 28px;
    background: #ffffff;
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 9;
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
    border-radius: 7px;
    transition: all 0.2s ease-out;
  }

  .tab {
    width: 50%;
    height: 28px;
    position: relative;
    z-index: 99;
    background-color: transparent;
    border: 0;
    outline: none;
    flex: none;
    align-self: stretch;
    flex-grow: 1;
    cursor: pointer;
    font-weight: 500;
  }

  .tab--1:hover ~ .indicator {
    left: 2px;
  }

  .tab--2:hover ~ .indicator {
    left: calc(50% - 2px);
  }

  .benefits {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .benefits > span {
    font-size: 1.3rem;
    color: #2b2b2f;
    font-weight: 700;
  }

  .benefits ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .benefits ul li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .benefits ul li span {
    font-weight: 600;
    font-size: 12px;
    color: #5f5d6b;
  }

  .footer {
    align-items: center;
    justify-content: space-between;
    padding:0 1rem 2rem;
    border-top: 1px solid #ebebec;
  }

  .price {
    position: relative;
    font-size: 32px;
    color: #2b2b2f;
    font-weight: 900;
  }

  .price sup {
    font-size: 13px;
  }

  .price sub {
    width: fit-content;
    position: absolute;
    font-size: 11px;
    color: #5f5d6b;
    bottom: 5px;
    display: inline-block;
  }

  .upgrade-btn {
    display: flex;
    margin-top: 1rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 215px;
    height: 40px;
    background: #0bdd12;
    box-shadow: 0px 0.5px 0.5px #efefef, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 7px;
    border: 0;
    cursor: pointer;
    outline: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .upgrade-btn:hover {
    background-color: #07b90d;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Pricing = () => {

  return (
    <Container>
      <div className="modal">
        <form className="form">
          <div className="banner"></div>
          <label className="title">Nayvee Chat</label>
          <p className="description">
            Nayvee Chat is 100% Free. This chatbot app is offered to you by Melsoft Academy and developed by Nigel (Nayvee Tech), a proud student of Melsoft Academy!
          </p>
          <div className="tab-container">
            <button className="tab tab--1">About</button>
            <button className="tab tab--2">Contact Us</button>
            <div className="indicator"></div>
          </div>

          <div className="price">
              <sup>$</sup>0<sub>/mo</sub>
            </div>

          <div className="benefits">
            <span>What we offer</span>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                  height="16"
                  width="16"
                >
                  <rect fill="black" rx="8" height="16" width="16"></rect>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    stroke="white"
                    d="M5 8.5L7.5 10.5L11 6"
                  ></path>
                </svg>
                <span>Get real-time answers from AI</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                  height="16"
                  width="16"
                >
                  <rect fill="black" rx="8" height="16" width="16"></rect>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    stroke="white"
                    d="M5 8.5L7.5 10.5L11 6"
                  ></path>
                </svg>
                <span>Personalized responses</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                  height="16"
                  width="16"
                >
                  <rect fill="black" rx="8" height="16" width="16"></rect>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    stroke="white"
                    d="M5 8.5L7.5 10.5L11 6"
                  ></path>
                </svg>
                <span>24/7 availability</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                  height="16"
                  width="16"
                >
                  <rect fill="black" rx="8" height="16" width="16"></rect>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    stroke="white"
                    d="M5 8.5L7.5 10.5L11 6"
                  ></path>
                </svg>
                <span>100% support</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                  height="16"
                  width="16"
                >
                  <rect fill="black" rx="8" height="16" width="16"></rect>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    stroke="white"
                    d="M5 8.5L7.5 10.5L11 6"
                  ></path>
                </svg>
                <span>Seamless integration</span>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                  height="16"
                  width="16"
                >
                  <rect fill="black" rx="8" height="16" width="16"></rect>
                  <path
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    stroke="white"
                    d="M5 8.5L7.5 10.5L11 6"
                  ></path>
                </svg>
                <span>Data security</span>
              </li>
            </ul>
          </div>

          <div className="footer">
          <button className="upgrade-btn" onClick={() => window.location.href='https://melsoftacademy.com'}>Visit Melsoft Academy website</button>
          <button className="upgrade-btn" onClick={() => window.location.href='https://www.nayveetech.co.za'}>Visit Nayvee Tech website</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Pricing;
