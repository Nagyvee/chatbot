import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  height: 95vh;
  overflow-y: auto;
  margin: auto;

    /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.5em;
    margin-top: 20px;
  }

  p {
    font-size: 1em;
    line-height: 1.6;
    margin: 10px 0;
  }

  a {
  color: blue;
  }
`;

const TermsOfService = () => {
  return (
    <Container>
      <h1>Terms of Service for Nayvee Chat</h1>
      <p>Effective Date: 28 July 2024</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using Nayvee Chat, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
      </p>

      <h2>2. Service Description</h2>
      <p>
        Nayvee Chat is a free AI chatbot service provided by Nayvee Tech. Our chatbot aims to assist users by providing real-time responses and support. The service is designed for educational and informational purposes only.
      </p>

      <h2>3. User Obligations</h2>
      <p>
        - You must be at least 13 years old to use Nayvee Chat.<br />
        - You agree to provide accurate and complete information when creating an account or using our services.<br />
        - You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>

      <h2>4. Prohibited Activities</h2>
      <p>
        You agree not to:<br />
        - Use Nayvee Chat for any unlawful purposes.<br />
        - Interfere with or disrupt the security, integrity, or performance of the service.<br />
        - Transmit any harmful or malicious code.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All content, trademarks, and other intellectual property rights associated with Nayvee Chat are owned by Nayvee Tech or our licensors. You may not use, reproduce, or distribute any of our intellectual property without our express written permission.
      </p>

      <h2>6. Disclaimer of Warranties</h2>
      <p>
        Nayvee Chat is provided on an "as-is" and "as-available" basis. We do not guarantee that the service will be uninterrupted, secure, or error-free. Your use of the service is at your own risk.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Nayvee Tech shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of Nayvee Chat.
      </p>

      <h2>8. Privacy</h2>
      <p>Your privacy is important to us. Please review our <a href="/privacy-policy">Privacy Policy</a> to understand how we collect, use, and share information about you.</p>


      <h2>9. Changes to the Terms</h2>
      <p>
        We may update these Terms of Service from time to time. We will notify you of any changes by posting the new terms on this page. Your continued use of Nayvee Chat after any changes signifies your acceptance of the updated terms.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms of Service shall be governed by and construed in accordance with the laws of South Africa.
      </p>

      <h2>11. Contact Information</h2>
      <p>
        If you have any questions or concerns about these Terms of Service, please contact us at nayvee@techie.com.
      </p>
    </Container>
  );
};

export default TermsOfService;
