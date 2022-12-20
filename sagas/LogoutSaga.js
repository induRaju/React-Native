import { put, takeLatest } from 'redux-saga/effects';
import { apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* doLogout(action){
    console.log('[LOGOUT SAGA]doLogout');
    console.log('action-saga>>>', action);
    try {
        const authorization = action.payload.authorization;
        const response = yield apiCall_customheader(URL.logout_url, 'POST', {}, authorization);
        console.log('[LOGOUT SAGA][response]: ', response);
        if(response && response.message && response.message === 'success') {
            console.log('[LOGOUT SAGA]Logout Success');
            yield put({ type: actions.LOGOUT_SUCCESS, response });
        } else {
            console.log('[LOGOUT SAGA][doLogout]error');
            yield put({type: actions.LOGOUT_FAILURE, error: response.message });
        }
    } catch (e) {
        console.log(e);
        console.log('[LOGOUT SAGA][doLogout]error');
        yield put({type: actions.LOGOUT_FAILURE, payload: e.message });
    }
}

export const logoutSaga = [
    takeLatest(actions.LOGOUT_REQUEST, doLogout)
]