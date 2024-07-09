import { setUser } from "../redux_state/actions"
import {useDispatch} from 'react-redux'
import {jwtDecode} from 'jwt-decode'
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useVerifyUser = () =>{
    const dispatch = useDispatch();
    const location = useLocation()
    
const verifyUser = () => {
    const noUserState = {
        isActive: false,
        id: '',
        name: '',
        email: '',
        image:null,
    }

    const token = localStorage.getItem('chat_tkn')
    
    if (!token) {
        console.log('No token found!')
        return dispatch(setUser(noUserState))
    } 
    const tokenDetails = jwtDecode(token)
    const currentTime = Date.now() 
    console.log(tokenDetails)
    if (currentTime > tokenDetails.exp * 1000) {
        console.log('ivalid token provided!')
        return dispatch(setUser(noUserState))
    }
    const userProfile = {
        isActive: true,
        id: tokenDetails.id,
        name: tokenDetails.name,
        email: tokenDetails.email,
        image:tokenDetails.image,
    }
    console.log('token is valid 👍')
    return dispatch(setUser(userProfile))
}

useEffect(() => {
    verifyUser();

    const intervalId = setInterval(() => {
      verifyUser();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(intervalId);
  }, [location, dispatch]);

}


export default useVerifyUser