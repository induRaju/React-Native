// LoginSaga function to call an API

import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* profileViewRequest(action){
    console.log('action-saga>>>view', action);
    try {
        const payload = {
        }
        const Authorization = action?.payload?.data?.Authorization || action?.payload?.Authorization;
        const response = yield apiCall_customheader(URL.profile_view_url, 'POST', payload, Authorization);
        console.log('response>>view', response);
        if(Object.keys(response).length !== 0) {
            yield put({ type: actions.PROFILE_VIEW_SUCCESS, response});
        } else {
            yield put({type: actions.PROFILE_VIEW_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.PROFILE_VIEW_FAILURE, payload: e.message });
    }
}

export function* profileListUpdate(action){
    console.log('action-saga>>>list update', action);
    try {
        const { data } = action?.payload;
        const payload = {
            name: data?.name,
            value: data?.value,
            hidden: data?.hidden,
            type: data?.type
        }
        const Authorization = action?.payload?.data?.Authorization;
        console.log('request update>>', payload)
        const response = yield apiCall_customheader(URL.profile_update_url, 'POST', payload, Authorization);
        console.log('response>>update', response);
        if(response?.message === 'success') {
            const payload = {
                Authorization: action?.payload?.data?.Authorization
              }
            yield put({ type: actions.PROFILE_VIEW_REQUEST, payload});
            yield put({ type: actions.PROFILE_LIST_UPDATE_SUCCESS, response: response?.message});
        } else {
            yield put({type: actions.PROFILE_LIST_UPDATE_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.PROFILE_LIST_UPDATE_FAILURE, error: 'error' });
    }
}

export function* profilePromptUpdate(action){
    console.log('action-saga>>>prompt update', action);
    try {
        const { data } = action?.payload;
        const payload = {
           index: data?.index,
           key: data?.key,
           answer: data?.answer
        }
        console.log('resquest prompt>>>', payload)
        const Authorization = action?.payload?.data?.Authorization;
        const response = yield apiCall_customheader(URL.prompt_update_url, 'POST', payload, Authorization);
        console.log('response>>prompt', response);
        if(response?.message === 'success') {
            const payload = {
                Authorization: action?.payload?.data?.Authorization
              }
            yield put({ type: actions.PROFILE_VIEW_REQUEST, payload});
            yield put({ type: actions.PROFILE_PROMPT_UPDATE_SUCCESS, response: response?.message});
        } else {
            yield put({type: actions.PROFILE_PROMPT_UPDATE_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.PROFILE_PROMPT_UPDATE_FAILURE, error: 'error' });
    }
}

export function* ProfilePromptDelete(action){
    console.log('action-saga>>>prompt delete', action);
    try {
        const { data } = action?.payload;
        const payload = {
            index: data?.index,
        }
        console.log('resquest prompt delete>>>', payload)
        const Authorization = action?.payload?.data?.Authorization;
        const response = yield apiCall_customheader(URL.prompt_delete_url, 'POST', payload, Authorization);
        console.log('response>>prompt delete', response);
        if(response?.message === 'success') {
            const payload = {
                Authorization: action?.payload?.data?.Authorization
              }
            yield put({ type: actions.PROFILE_VIEW_REQUEST, payload});
            yield put({ type: actions.PROFILE_PROMPT_DELETE_SUCCESS, response: response?.message});
        } else {
            yield put({type: actions.PROFILE_PROMPT_DELETE_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.PROFILE_PROMPT_DELETE_FAILURE, error: 'error' });
    }
}

export function* profileMediaUpdate(action){
    console.log('action-saga>>>media update', action);
    try {
        const { data } = action?.payload;
        const payload = {
           img: data?.img
        }
        console.log('resquest media>>>', payload)
        const Authorization = action?.payload?.data?.Authorization;
        const response = yield apiCall_customheader(URL.add_media_url, 'POST', payload, Authorization);
        console.log('response>>media', response);
        if(response?.message === 'success') {
            const payload = {
                Authorization: action?.payload?.data?.Authorization
              }
            yield put({ type: actions.PROFILE_VIEW_REQUEST, payload});
            yield put({ type: actions.PROFILE_PROMPT_UPDATE_SUCCESS, response: response?.message});
        } else {
            yield put({type: actions.PROFILE_PROMPT_UPDATE_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.PROFILE_PROMPT_UPDATE_FAILURE, error: 'error' });
    }
}

export function* ProfileMediaDelete(action){
    console.log('action-saga>>>media delete', action);
    try {
        const { data } = action?.payload;
        const payload = {
           media_id: data?.media_id,
        }
        console.log('resquest media delete>>>', payload)
        const Authorization = action?.payload?.data?.Authorization;
        const response = yield apiCall_customheader(URL.delete_media_url, 'POST', payload, Authorization);
        console.log('response>>media delete', response);
        if(response?.message === 'success') {
            const payload = {
                Authorization: action?.payload?.data?.Authorization
              }
            yield put({ type: actions.PROFILE_VIEW_REQUEST, payload});
            yield put({ type: actions.PROFILE_MEDIA_DELETE_SUCCESS, response: response?.message});
        } else {
            yield put({type: actions.PROFILE_MEDIA_DELETE_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.PROFILE_MEDIA_DELETE_FAILURE, error: 'error' });
    }
}

export const profileEditSaga = [
    // takeLatest(actions.PROFILE_GET_REQUEST, ProfileEditRequest),
    takeLatest(actions.PROFILE_VIEW_REQUEST, profileViewRequest),
    takeLatest(actions.PROFILE_LIST_UPDATE, profileListUpdate),
    takeLatest(actions.PROFILE_PROMPT_DELETE, ProfilePromptDelete),
    takeLatest(actions.PROFILE_PROMPT_UPDATE, profilePromptUpdate),
    takeLatest(actions.PROFILE_MEDIA_UPDATE, profileMediaUpdate),
    takeLatest(actions.PROFILE_MEDIA_DELETE, ProfileMediaDelete),
]