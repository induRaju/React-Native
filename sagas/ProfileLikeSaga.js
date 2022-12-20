import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* Like_Profile(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.users_liked_url, 'POST', payload, Authorization);
        
        console.log('response:Liked Profile ', response);

        if(response?.listing) {
            console.log("sucess!?!?!?!")
            yield put({ type: actions.LIKE_USER_SUCCESS, response:response});
        } else {
            yield put({type: actions.LIKE_USER_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.LIKE_USER_FAILURE, payload: response?.message });
    }
}


export function* DisLike_Profile(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.users_rejected_url, 'POST', payload, Authorization);
        
        console.log('response:DisLiked Profile ', response);

        if(response?.listing) {
            console.log("sucess!?!?!?!")
            yield put({ type: actions.DISLIKE_USER_SUCCESS, response:response});
        } else {
            yield put({type: actions.DISLIKE_USER_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.DISLIKE_USER_FAILURE, payload: response?.message });
    }
}


export const likeProfile = [
    takeLatest(actions.LIKE_USER, Like_Profile),
    takeLatest(actions.DISLIKE_USER, DisLike_Profile),
]