import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* RegistrationAuth(action){
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
        const registrationUserPayload = {
            response: response,
            ...action.payload

        }
        console.log('response>>', response);
        console.log("payload registration", registrationUserPayload);
        if(response?.access_token) {
            yield put({ type: actions.REGISTRATION_AUTH, registrationUserPayload});
        } else {
            yield put({type: actions.REGISTRATION_FAILURE, error: response?.error });
        }
        // yield put({ type: actions.FORGET_PWD_SUCCESS, response});
    } catch (e) {
        yield put({type: actions.REGISTRATION_FAILURE, payload: e.message });
    }
}

export function* RegistrationUser(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.registrationUserPayload,
            is_available: 1
        }
        console.log("payload ",payload);
        const Authorization = action?.registrationUserPayload?.response?.token_type.concat(' ', action?.registrationUserPayload?.response?.access_token);
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.user_register_url, 'POST', payload, Authorization);
        
        console.log('response:11 ', response);

        if(response?.message === 'success') {
            yield put({ type: actions.REGISTRATION_SUCCESS, response});
        } else {
            yield put({type: actions.REGISTRATION_FAILURE, error: response?.message });
        }
    } catch (e) {
        yield put({type: actions.REGISTRATION_FAILURE, payload: e.message });
    }
}

export const registrationSaga = [
    
    takeLatest(actions.REGISTRATION_REQUEST, RegistrationAuth),
    takeLatest(actions.REGISTRATION_AUTH, RegistrationUser),
]