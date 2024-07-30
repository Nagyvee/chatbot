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
    font-size: 2.5em;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }

  h2 {
    font-size: 2em;
    margin-top: 20px;
    color: #555;
  }

  p {
    font-size: 1.2em;
    line-height: 1.8;
    margin: 10px 0;
    color: #666;
  }
`;

const PrivacyPolicy = () => {
  return (
    <Container>
      <h1>Privacy Policy</h1>
      <p>Effective date: 28 July 2024</p>

      <h2>Introduction</h2>
      <p>
        Welcome to Nayvee Tech. This privacy policy explains how we collect,
        use, and share information about you when you use our Nayvee Chat services.
      </p>

      <h2>Information Collection</h2>
      <p>
        We collect information that you provide to us directly, such as when you
        create an account, update your profile, or use our contact support.
      </p>

      <h2>Use of Information</h2>
      <p>
        We use the information we collect to provide, maintain, and improve our
        services, as well as to communicate with you.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We do not share your personal information with third parties except as
        necessary to provide our services or as required by law.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable measures to protect your information from
        unauthorized access, use, or disclosure.
      </p>

      <h2>User Rights</h2>
      <p>
        You have the right to access, update, and delete your personal
        information. To exercise these rights, please contact us at
        nayvee@techie.com.
      </p>

      <h2>Changes to Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you
        of any changes by posting the new policy on this page.
      </p>

      <h2>Contact Information</h2>
      <p>
        If you have any questions about this privacy policy, please contact us
        at nayvee@techie.com.
      </p>
    </Container>
  );
};

export default PrivacyPolicy;
