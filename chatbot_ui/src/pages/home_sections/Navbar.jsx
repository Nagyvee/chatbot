import styled from 'styled-components';
import { useSelector } from 'react-redux';
import profileIcon from '../../assets/profile.jpg'

const NavContainer = styled.nav`
  width: 100%;
  height: 4rem;
  padding: 2rem 1.2rem;
  margin:0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: .4rem;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  margin: 0;
  font-weight: 550;
  font-size: 14px;
  color: #333;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
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
     <Image src={user.image !== undefined? user.image: profileIcon} alt="profile image" />
    </NavContainer>
  );
}

export default Navbar;
