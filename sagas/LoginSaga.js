// LoginSaga function to call an API

import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* loginUser(action){
    // console.log('action-saga', action);
    try {
        const payload = {
            ...action.payload,
            client_id: URL.login_clienid,
            client_secret: URL.login_client_secret,
            grant_type: URL.login_grant_type
        }
       
        // console.log('payload>>', payload);
        const response = yield apiCall(URL.login_url, 'POST', payload);
        // console.log('response>>', response);

        if(response?.access_token) {
            yield put({ type: actions.LOGIN_SUCCESS, response: response});
        } else {
            yield put({type: actions.LOGIN_FAILURE, error: response?.error });
        }
    } catch (e) {
        yield put({type: actions.LOGIN_FAILURE, error: e });
    }
}

export const loginSaga = [
    takeLatest(actions.LOGIN_REQUEST, loginUser)
]