import * as actionTypes from './actionTypes';

export const setStatusToLogin = (userId, token) => {
    return {
        type: actionTypes.SET_LOGIN_STATUS,
        payload: {
            userId: userId,
            token: token
        }
    }
}

export const setStatusToLogout = () => {
    return {
        type: actionTypes.SET_LOGOUT_STATUS
    }
}