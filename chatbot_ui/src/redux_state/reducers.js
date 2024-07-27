import { combineReducers } from "redux";

const initialUserState = {
  userDetails: {
    isActive: false,
    id: "",
    name: "",
    email: "",
    image: null,
  },
};

const initialChatState = {
  userChats: [],
  chatsHistory: [],
  activeChat: undefined,
  pendingMessage: null,
  count: 0,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};

const chatReducer = (state = initialChatState, action) => {
  switch (action.type) {
    case "ADD_CHAT":
      return {
        ...state,
        userChats: [...state.userChats, action.payload],
      };
    case "SET_CHAT_HISTORY": {
      return {
        ...state,
        chatsHistory: action.payload,
      };
    }
    case "SET_ACTIVE_CHAT":
      return {
        ...state,
        activeChat: action.payload,
      };
    case "SET_PENDING_MESSAGE":
      return {
        ...state,
        pendingMessage: action.payload,
      };
    case "ADD_COUNT":
      if (state.count > 100000) {
        return { 
            ...state,
            count: 0 };
      }
      return {
        ...state,
        count: state.count + 1,
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        userChats: state.userChats.map((chat) =>
          chat.chat_id === action.payload.chat_id
            ? { ...chat, messages: [...chat.messages, action.payload.message] }
            : chat
        ),
      };
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  user: userReducer,
  chat: chatReducer,
});

export default rootReducers;
