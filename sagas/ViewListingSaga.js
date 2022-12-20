import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* View_Listing(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.rental_list_view_url, 'POST', payload, Authorization);
        
        console.log('response:11 ', response);

        if(response?.listing) {
            console.log("sucess!?!?!?!")
            yield put({ type: actions.VIEWLISTING_SUCCESS, response:response});
        } else {
            yield put({type: actions.VIEWLISTING_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.VIEWLISTING_FAILURE, payload: response?.message });
    }
}

export function* Listing_likes(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader('https://dev.rentalsandfriends.com/api/rental-listings/likes', 'POST', payload, Authorization);
        
        console.log('response:11 ', response);

        if(response?.listing) {
            console.log("sucess!?!?!?!")
            yield put({ type: actions.VIEWLISTING_SUCCESS, response:response});
        } else {
            yield put({type: actions.VIEWLISTING_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.VIEWLISTING_FAILURE, payload: response?.message });
    }
}
export const viewListingSaga = [
    takeLatest(actions.VIEWLISTING_REQUEST, View_Listing),
    takeLatest(actions.LISTING_LIKE_REQUEST, Listing_likes)
]