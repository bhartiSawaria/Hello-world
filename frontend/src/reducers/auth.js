
import * as actionTypes from '../actions/actionTypes';
import { connect } from 'react-redux';

const initialState = {
    token: null,
    isAuth: false,
    userId: null
}

const reducer = (state = initialState, action) => {
    switch( action.type ){
        case actionTypes.SET_LOGIN_STATUS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userId', action.payload.userId);
            console.log('logged in reducers');
            return{
                ...state,
                isAuth: true,
                userId: action.payload.userId,
                token: action.payload.token
            }
        case actionTypes.SET_LOGOUT_STATUS:
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            return{
                ...state,
                isAuth: false,
                userId: null,
                token: null
            }
        default:
            return state;
    }
}

export default reducer;