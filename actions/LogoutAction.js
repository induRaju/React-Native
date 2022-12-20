import * as actions from './actionTypes';

export const logoutRequest = (data) => {
    return {
        type: actions.LOGOUT_REQUEST,
        payload: {
            authorization: data.Authorization
        }
    }
}
export const logoutSuccess = (data) => {
    return {
        type: actions.LOGIN_SUCCESS,
        payload: {
        }
    }
}
export const logoutFailure = (data) => {
    return {
        type: actions.LOGOUT_FAILURE,
        payload: {
        }
    }
}