// LoginSaga function to call an API

import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* ForgetPwdUser(action){
    // console.log('action-saga', action);
    try {
        const payload = {
            // ...action.payload,
            client_id: 3,
            client_secret: '2LSsrzY8gRfWh1Kx9WeC7YPWszRWLbOPodfHUKJh',
            grant_type: 'client_credentials'
        }
    //    console.log('payload>>>', payload);
        const response = yield apiCall(URL.authentication_url, 'POST', payload);
        const forget_pwd_payload = {
            response: response,
            email: action?.payload?.email
        }
        // console.log('response>>', response);
        if(response?.access_token) {
            yield put({ type: actions.FORGET_PWD_CALL, forget_pwd_payload});
        } else {
            yield put({type: actions.FORGET_PWD_FAILURE, error: response?.error });
        }
        // yield put({ type: actions.FORGET_PWD_SUCCESS, response});
    } catch (e) {
        yield put({type: actions.FORGET_PWD_FAILURE, payload: e.message });
    }
}

export function* ForgetpwdCall(action){
    // console.log('action-saga>>>', action);
    try {
        const payload = {
            email: action?.forget_pwd_payload?.email
        }
        const Authorization = action?.forget_pwd_payload?.response?.token_type.concat(' ', action?.forget_pwd_payload?.response?.access_token);
        const response = yield apiCall_customheader(URL.forget_pwd_url, 'POST', payload, Authorization);
        // console.log('response>>', response);
        if(response?.mesage === 'success') {
            yield put({ type: actions.FORGET_PWD_SUCCESS, response});
        } else {
            yield put({type: actions.FORGET_PWD_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.FORGET_PWD_FAILURE, payload: e.message });
    }
}

export const forgetPwdSaga = [
    takeLatest(actions.FORGET_REQUEST, ForgetPwdUser),
    takeLatest(actions.FORGET_PWD_CALL, ForgetpwdCall)
]