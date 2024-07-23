import {combineReducers} from 'redux'

const initialState = {
    userDetails: {
        isActive: false,
        id: '',
        name: '',
        email: '',
        image:null,
    },
    userChats: [
        {
            chat_id: '',
            messages:[]
        }
    ],
    activeChat: '',
    pendingMessage: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
               ...state,
                userDetails: action.payload
            }
            break;
        default:
            return state;
    }
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CHAT':
            return {
               ...state,
                activeChat: action.payload
            }
            break;
        case 'ADD_MESSAGE':
            return {
               ...state,
                userChats: state.userChats.map(chat =>
                    chat.chat_id === action.payload.chat_id? {...chat, messages: [...chat.messages, action.payload.message]} : chat
                ),
            }
            break;
        case 'SET_PENDING_MESSAGE':
        return {
               ...state,
                pendingMessage: action.payload
            }
            break;
        default:
            return state;
    }
}

const rootReducers = combineReducers({
    user: userReducer,
    chat: chatReducer
})

export default rootReducers