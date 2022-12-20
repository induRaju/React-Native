import { put, takeLatest } from 'redux-saga/effects';
import { apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* getUserProfileData(action) {
    console.log('action-saga>>>', action);
    try {
        const authorization = action.payload.authorization;
        const response = yield apiCall_customheader(URL.profile_view_url, 'POST', {}, authorization);
        if (response.profile) {
            yield put({ type: actions.USER_PROFILE_SUCCESS, response });
        } else {
            yield put({ type: actions.USER_PROFILE_ERROR, error: message });
        }
    } catch (e) {
        yield put({ type: actions.USER_PROFILE_ERROR, payload: e.message });
    }
}

export function* getUserProfile(action) {
    console.log('[PROFILE VIEW SAGA]getUserProfile');
    console.log('action-saga>>>', action.payload.user_id);
    try {
        const authorization = action.payload.authorization;
        const payload = {user_id: action.payload.user_id};
        
        console.log('[PROFILE VIEW SAGA][getUserProfile]payload: ', payload);
        
        const response = yield apiCall_customheader(URL.match_profile_view_url, 'POST', payload, authorization);

        console.log('[PROFILE VIEW SAGA][getUserProfile][response]', response);
        if (response && response.profile) {
            yield put({ type: actions.GET_PROFILE_MODAL_SUCCESS, response });
        } else {
            console.log('[PROFILE VIEW SAGA][getUserProfile]error');
            yield put({ type: actions.GET_PROFILE_MODAL_ERROR, error: message });
        }
    } catch (e) {
        console.log(e);
        console.log('[PROFILE VIEW SAGA][getUserProfile]error');
        yield put({ type: actions.GET_USER_ERROR, payload: e.message });
    }
}

export const profileViewSaga = [
    takeLatest(actions.GET_USER_PROFILE, getUserProfileData),
    takeLatest(actions.GET_PROFILE_MODAL, getUserProfile)
]