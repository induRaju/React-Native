import { put, takeLatest } from 'redux-saga/effects';
import { apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* getFriendsList(action) {
    console.log('[FRIENDS VIEW SAGA]>>getFriendsList');
    console.log('action-saga>>>', action);
    try {
        const authorization = action.payload.authorization;
        const response = yield apiCall_customheader(URL.users_matched_url, 'POST', {}, authorization);

        console.log('[FRIENDS SAGA][getFriendsList][response]', response);
        if (response) {
            yield put({ type: actions.GET_FRIENDS_LIST_SUCCESS, response });
        } else {
            console.log('[FRIENDS SAGA][getFriendsList]error');
            yield put({ type: actions.GET_FRIENDS_LIST_ERROR, error: message });
        }
    } catch (e) {
        console.log(e);
        console.log('[FRIENDS SAGA][getFriendsList]error');
        yield put({ type: actions.GET_FRIENDS_LIST_ERROR, payload: e.message });
    }
}



export function* getUserProfile(action) {
    console.log('[FRIENDS VIEW SAGA]>>getUserProfile');
    console.log('action-saga>>>', action.payload.user_id);
    try {
        const authorization = action.payload.authorization;
        const allFriendsProfileData = [];
        const userIds = action.payload.userIds;
        for (let i=0; i<userIds.length; i++) {
            const payload = {user_id: userIds[i]};
            const response = yield apiCall_customheader(URL.match_profile_view_url, 'POST', payload, authorization);
            

            console.log('[FRIENDS SAGA][getUserProfile][response]', response);
            if (response) {
               const res1= yield apiCall_customheader(URL.available,'POST',payload,authorization);
                console.log("res1",res1)
                const res={
                    response:response,
                    is_available:res1.is_available
                }
                console.log("res2",res)
               // response.profile.push({is_available:res1.is_available})
                allFriendsProfileData.push(res);
            } else {
                console.log('[FRIENDS SAGA][getUserProfile]error');
                yield put({ type: actions.GET_FRIEND_PROFILE_ERROR, error: message });
            }
        }
        console.log('[FRIENDS SAGA][getUserProfile][allFriendsProfileData]', allFriendsProfileData);
        if (allFriendsProfileData) {

            
            yield put({ type: actions.GET_FRIEND_PROFILE_SUCCESS, allFriendsProfileData });
        } else {
            console.log('[FRIENDS SAGA][getUserProfile]error');
            yield put({ type: actions.GET_FRIEND_PROFILE_ERROR, error: message });
        }
    } catch (e) {
        console.log(e);
        console.log('[FRIENDS SAGA][getUserProfile]error');
        yield put({ type: actions.GET_USER_ERROR, payload: e.message });
    }
}



export function* doUnFriend(action) {
    console.log('[FRIENDS VIEW SAGA]>>doUnFriend');
    console.log('action-saga>>>', action.payload.user_id);
    try {
        const authorization = action.payload.authorization;
        const payload = {user_id: action.payload.user_id};
        const response = yield apiCall_customheader(URL.users_unmatched_url, 'POST', payload, authorization);

        console.log('[FRIENDS SAGA][doUnFriend][response]', response);
        if (response) {
            yield put({ type: actions.DO_UN_FRIEND_SUCCESS, payload: payload });
        } else {
            console.log('[FRIENDS SAGA][doUnFriend]error');
            yield put({ type: actions.DO_UN_FRIEND_ERROR, error: message });
        }
    } catch (e) {
        console.log(e);
        console.log('[FRIENDS SAGA][doUnFriend]error');
        yield put({ type: actions.DO_UN_FRIEND_ERROR, payload: e.message });
    }
}
export function* roommatelist(action)
{
    console.log('[FRIENDS VIEW SAGA]>>kii')
    try{
    const pay6={
        ...action.payload
    }
    const response=yield apiCall_customheader(URL.users_confirmed, 'POST', {}, pay6.Authorization);

    console.log("roommatelist")
    if(response.user_ids)
    {
       yield put({type:actions.ROOMMATE_LIST_SUCCESS,response})         
    }
    else
    {
        alert("problem in fetching the userids.Please try again later")

    }
}catch(e)
{
    alert("problem in fetching the userids.Please try again later11")
}

}

export function* getroommateProfile(action) {
    console.log('[FRIENDS VIEW SAGA]>>getUserProfile');
    console.log('action-saga>>>', action.payload.user_id);
    try {
        const authorization = action.payload.Authorization;
        const allRoommatesprofileData = [];
        const userIds = action.payload.userIds;

        console.log("lengthofuserid",userIds.length)
        for (let i=0; i<userIds.length; i++) {
            const payload = {user_id: userIds[i]};
            const response = yield apiCall_customheader(URL.match_profile_view_url, 'POST', payload, authorization);
            

            console.log('[FRIENDS SAGA][getUserProfile][response]', response);
            if (response) {
                allRoommatesprofileData.push(response);
            } else {
                console.log('[FRIENDS SAGA][getUserProfile]error');
                yield put({ type: actions.GET_ROOMMATE_PROFILE_ERROR, error: message });
            }
        }
        console.log('[FRIENDS SAGA][getUserProfile][allFriendsProfileData]', allRoommatesprofileData);
        if (allRoommatesprofileData) {
            yield put({ type: actions.GET_ROOMMATE_PROFILE_SUCCESS, allRoommatesprofileData });
        } else {
            console.log('[FRIENDS SAGA][getUserProfile]error');
            yield put({ type: actions.GET_ROOMMATE_PROFILE_ERROR, error: message });
        }
    } catch (e) {
        console.log(e);
        console.log('[FRIENDS SAGA][getUserProfile]error');
        yield put({ type: actions.GET_ROOMMATE_ERROR, payload: e.message });
    }
}

export const friendsViewSaga = [
    takeLatest(actions.GET_FRIENDS_LIST, getFriendsList),
    takeLatest(actions.GET_FRIEND_PROFILE, getUserProfile),
    takeLatest(actions.DO_UN_FRIEND, doUnFriend),
    takeLatest(actions.CONFIRM_LIST,roommatelist),
    takeLatest(actions.GET_ROOMMATE_PROFILE,getroommateProfile)
]