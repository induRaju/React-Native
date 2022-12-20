import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* accountDeactivateRequest(action){
    console.log('action-saga>>>deacti', action);
    try {
        const payload = {
        }
        const Authorization = action?.payload?.data?.Authorization || action?.payload?.Authorization;
        const response = yield apiCall_customheader(URL.deactivate_url, 'POST', payload, Authorization);
        console.log('response>>deactivate', response);
        if(response?.message === 'success') {
            yield put({ type: actions.ACCOUNT_DEACTIVATE_SUCCESS, response});
        } else {
            yield put({type: actions.ACCOUNT_DEACTIVATE_ERROR, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.ACCOUNT_DEACTIVATE_ERROR, error: 'error' });
    }
}


export const DeactivateSaga = [
    takeLatest(actions.ACCOUNT_DEACTIVATE_REQUEST, accountDeactivateRequest),
]