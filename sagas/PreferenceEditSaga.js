// LoginSaga function to call an API

import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* preferenceViewRequest(action){
    console.log('action-saga>>>view', action);
    try {
        const payload = {
        }
        const Authorization = action?.payload?.data?.Authorization || action?.payload?.Authorization;
        const response = yield apiCall_customheader(URL.get_preference_url, 'POST', payload, Authorization);
        console.log('response>>view', response);
        if(Object.keys(response).length !== 0) {
            yield put({ type: actions.PREFERENCE_VIEW_SUCCESS, response});
        } else {
            yield put({type: actions.PREFERENCE_VIEW_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.PREFERENCE_VIEW_FAILURE, payload: e.message });
    }
}

export function* preferenceListUpdate(action){
    console.log('action-saga>>>list update', action);
    try {
        const { data } = action?.payload;
        const payload = {
            name: data?.name,
            value: data?.value,
            dealbreaker: data.dealbreaker,
        }
        const Authorization = action?.payload?.data?.Authorization;
        console.log('request update>>', payload)
        const response = yield apiCall_customheader(URL.update_preference_url, 'POST', payload, Authorization);
        console.log('response>>update', response);
        if(response?.message === 'success') {
            const payload = {
                Authorization: action?.payload?.data?.Authorization
              }
            yield put({ type: actions.PREFERENCE_VIEW_REQUEST, payload});
            yield put({ type: actions.PREFERENCE_LIST_UPDATE_SUCCESS, response: response?.message});
        } else {
            yield put({type: actions.PREFERENCE_LIST_UPDATE_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.PREFERENCE_LIST_UPDATE_FAILURE, error: 'error' });
    }
}

export function* goalChangeRequest(action){
    console.log('action-saga>>>view', action);
    try {
        const payload = {
            ...action.payload
        }
        console.log("######################################## ", payload);
        const Authorization = action?.payload?.data?.Authorization || action?.payload?.Authorization;
        const response = yield apiCall_customheader(URL.update_goal_url, 'POST', payload, Authorization);
        console.log('response>>newone-----------------------------------------------', response);
        if(response.message=='success') {
            yield put({ type: actions.GOAL_CHANGE_SUCCESS, response:payload.goal_id});
        } else {
            yield put({type: actions.GOAL_CHANGE_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.GOAL_CHANGE_FAILURE, payload: e.message });
    }
}





export const preferenceEditSaga = [
    // takeLatest(actions.PROFILE_GET_REQUEST, ProfileEditRequest),
    takeLatest(actions.PREFERENCE_VIEW_REQUEST, preferenceViewRequest),
    takeLatest(actions.PREFERENCE_LIST_UPDATE, preferenceListUpdate),
    takeLatest(actions.GOAL_CHANGE_REQUEST,goalChangeRequest),
]