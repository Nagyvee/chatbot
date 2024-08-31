import styled from 'styled-components';

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  font-family: 'Arial', sans-serif;
  max-width: 400px;
  margin: 2rem auto;
`;

const Heading = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #4caf50;
`;

const SubHeading = styled.p`
  font-size: 1.1rem;
  color: #555;
`;

const EmptyState = () => {
  return (
    <PlaceholderContainer>
      <Heading>Get started with Nayvee Chat</Heading>
      <SubHeading>Hello there! How can I help you today?</SubHeading>
    </PlaceholderContainer>
  );
};

export default EmptyState;
