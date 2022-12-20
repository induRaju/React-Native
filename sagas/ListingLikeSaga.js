import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* Like_Listing(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.like_listing_url, 'POST', payload, Authorization);
        
        console.log('response: Liked listing ', response);

        if(response?.message === 'success') {
            console.log("sucess!?!?!?!")
            yield put({ type: actions.LIKE_LISTING_SUCCESS, response:response});
        } else {
            yield put({type: actions.LIKE_LISTING_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.LIKE_LISTING_FAILURE, payload: response?.message });
    }
}


export function* DisLike_Listing(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.reject_listing_url, 'POST', payload, Authorization);
        
        console.log('response:DisLiked Listing ', response);

        if(response?.message === 'success') {
            console.log("sucess!?!?!?!")
            yield put({ type: actions.DISLIKE_LISTING_SUCCESS, response:response});
        } else {
            yield put({type: actions.DISLIKE_LISTING_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.DISLIKE_LISTING_FAILURE, payload: response?.message });
    }
}

export const likeListing = [
    takeLatest(actions.LIKE_LISTING, Like_Listing),
    
    takeLatest(actions.DISLIKE_LISTING, DisLike_Listing),
]