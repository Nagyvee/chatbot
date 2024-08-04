export const setUser = (payload) => ({
    type: 'SET_USER',
    payload: payload
})

export const setActiveChat = (payload) => ({
    type: 'SET_ACTIVE_CHAT',
    payload: payload
})

export const setPendingMessage = (payload) => ({
    type: 'SET_PENDING_MESSAGE',
    payload: payload
})

export const addMessages = (payload) => ({
    type: 'ADD_MESSAGE',
    payload: payload
})

export const addChat = (payload) => ({
    type: 'ADD_CHAT',
    payload: payload
})

export const setChatHistory = (payload) => ({
    type: 'SET_CHAT_HISTORY',
    payload: payload
})

export const addCount = () => ({
    type: 'ADD_COUNT',
})

export const deleteChats = () =>({
    type: 'DELETE_CHATS'
})