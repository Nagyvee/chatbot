import axios from 'axios'
import {setActiveChat, addChat, setChatHistory, deleteChats } from '../../redux_state/actions';


export const chooseChat = async (id, dispatch) => {
    if (!id) return;
    try {
        const URL = import.meta.env.VITE_SERVER_URL;
        const response = await axios.get(`${URL}/chat/v2.5/nayveechat/${id}`, { withCredentials: true })
      response.data.data.forEach((chat) =>{
            if(chat.sender === 'user'){
                dispatch(addChat({ id: Date.now(), sender: "user", message: chat.content }))
                return;
            }
            dispatch(addChat({ id: Date.now(), sender: "Nayvee", message: chat.content }))
        })
        dispatch(setActiveChat(id))
    } catch (error) {
        throw new Error(error.response?.data?.msg || 'An error occurred Please try again.')
    }
    return;
}

export const deleteHistory = async (id, dispatch) =>{
    console.log(id)
    if (!id) return;
    try {
        const URL = import.meta.env.VITE_SERVER_URL;
       const data = await axios.delete(`${URL}/chat/v2.5/nayveechat/${id}`, { withCredentials: true });
       console.log(data)
        dispatch(setActiveChat(undefined));
        dispatch(setChatHistory([]));
        dispatch(deleteChats());
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.msg || 'An error occurred Please try again.')
    }
    return;
}


