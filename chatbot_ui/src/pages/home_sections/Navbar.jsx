import styled from 'styled-components';
import { useSelector } from 'react-redux';

const NavContainer = styled.nav`
  width: 100%;
  height: 3.5rem;
  padding: 2rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  border-bottom: 2px solid grey;
  background-color: #f8f9fa;
`;

const Text = styled.p`
  margin: 0;
  margin-right: 10px;
  font-weight: 500;
  font-size: 16px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Image = styled.img`
  width: 38px;
  height: 38px;
  margin-right: 15px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
  cursor: pointer;

  &:hover {
    border-color: #aaa;
  }
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.userDetails);

  return (
    <NavContainer>
      <Text>{user.name}</Text>
      <Image src={user.image} alt="profile image" />
    </NavContainer>
  );
}

export default Navbar;
