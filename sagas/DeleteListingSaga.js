import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* Delete_Listing(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.rental_list_delete_url, 'POST', payload, Authorization);
        
        console.log('response:11 ', response);

        if(response?.message === 'success') {
            console.log("sucess!?!?!?!")
            yield put({ type: actions.DELETELISTING_SUCCESS, response});
        } else {
            yield put({type: actions.DELETELISTING_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.DELETELISTING_FAILURE, payload: response?.message });
    }
}

export const deleteListingSaga = [
    takeLatest(actions.DELETELISTING_REQUEST, Delete_Listing),
]