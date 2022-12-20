import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* getModalUserProfile(action){
    console.log('action-saga>>>view', action);
    try {
        const payload = {
            user_id: action?.payload?.data?.user_id
        }
        const Authorization = action?.payload?.data?.Authorization || action?.payload?.Authorization;
        const response = yield apiCall_customheader(URL.match_profile_view_url, 'POST', payload, Authorization);
        console.log('response>>view', response);
        if(Object.keys(response).length !== 0) {
            yield put({ type: actions.PROFILE_MODAL_VIEW_SUCCESS, response});
        } else {
            yield put({type: actions.PROFILE_MODAL_VIEW_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.PROFILE_MODAL_VIEW_FAILURE, error: 'error' });
    }
}

export function* getModalListProfile(action){
    console.log('action-saga>>>listing', action);
    try {
        const payload = {
            listing_id: action?.payload?.data?.listing_id
        }
        const Authorization = action?.payload?.data?.Authorization || action?.payload?.Authorization;
        const response = yield apiCall_customheader(URL.rental_list_view_url, 'POST', payload, Authorization);
        if(Object.keys(response).length !== 0) {
            console.log('response>>listing', response);

            yield put({ type: actions.PROFILE_MODAL_LIST_VIEW_SUCCESS, response});
        } else {
            yield put({type: actions.PROFILE_MODAL_LIST_VIEW_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.PROFILE_MODAL_LIST_VIEW_FAILURE, error: 'error' });
    }
}


export const ProfileModalSaga = [
    takeLatest(actions.PROFILE_MODAL_VIEW, getModalUserProfile),
    takeLatest(actions.PROFILE_MODAL_LIST_VIEW, getModalListProfile),
]