import {combineReducers} from 'redux'

const initialState = {
    userDetails: {
        isActive: false,
        id: '',
        name: '',
        email: '',
        image:null,
    }
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

const rootReducers = combineReducers({
    user: userReducer
})

export default rootReducers