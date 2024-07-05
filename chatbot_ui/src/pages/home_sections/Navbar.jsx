import styled from 'styled-components'
import {useSelector} from 'react-redux'

const NavContainer = styled.nav`
width: 100%;
height: 3rem;
padding-top: .8rem;
display: flex;
justify-content: end;
gap: .5rem;
text-align:center;
border-bottom: solid grey 2px;
`

const Text = styled.p`
 margin: 0;
 margin-top: 10px;
 font-weight: 500;
 font-size: 16px
`

const Image = styled.img`
width: 38px;
height: 38px;
border-radius: 45%;
`

const Navbar = () =>{
    const user = useSelector((state) => state.user.userDetails)

    return (
        <NavContainer>
        <Text>{user.name}</Text>
        <Image src={user.image} alt='profile image' />
        </NavContainer>
    )
}

export default Navbar