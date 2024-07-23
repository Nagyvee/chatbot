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