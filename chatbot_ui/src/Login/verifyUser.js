import { setUser } from "../redux_state/actions"
import {useDispatch} from 'react-redux'
import {jwtDecode} from 'jwt-decode'
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const useVerifyUser = (setPopUp, setIsFetching) =>{
    const dispatch = useDispatch();
    const location = useLocation();
    
const verifyUser = () => {
    const noUserState = {
        isActive: false,
        id: '',
        name: '',
        email: '',
        image:null,
    }

    const token = localStorage.getItem('chat_tkn')
    
    if (!token){
        dispatch(setUser(noUserState));
        setIsFetching(false); 
        return ;
    } 
    const tokenDetails = jwtDecode(token)
    const currentTime = Date.now() 
    if (currentTime > tokenDetails.exp * 1000) {
        setPopUp(true)
        localStorage.clear()
        dispatch(setUser(noUserState)) 
        return setIsFetching(false)
    }
    const userProfile = {
        isActive: true,
        id: tokenDetails.id,
        name: tokenDetails.name,
        email: tokenDetails.email,
        image:tokenDetails.image,
    }
     dispatch(setUser(userProfile));
     setIsFetching(false);
     return ;
}

useEffect(() => {
    verifyUser();

    const intervalId = setInterval(() => {
      verifyUser();
    }, 10.1 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, [location, dispatch]);

}


export default useVerifyUser