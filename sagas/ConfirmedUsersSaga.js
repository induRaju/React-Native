import { put, takeLatest, all ,select} from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* ConfirmedUsers(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.users_confirmed, 'POST', payload, Authorization);
        
        console.log('response:11likes ', response);

        if(response?.user_ids) {
            if(response.user_ids.length>0){
                payload['user_ids']=response.user_ids
                yield put({type: actions.CONFIRMED_USER_PROFILE_DATA, response:response.user_ids,payload})
            }
            else{
                yield put({ type: actions.CONFIRMED_USERS_SUCCESS, response:response.user_ids});
            }
        } else {
            yield put({type: actions.CONFIRMED_USERS_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.CONFIRMED_USERS_FAILURE, payload: e.message });
    }
}

export function* Confirmed_User_Profile(action){
    try{
        const data=action.payload?.user_ids;
        let arr=[];
        for(let i=0; i<data.length; i++){
            obj=data[i]
            const payload={
                Authorization:action.payload.Authorization,
                user_id:obj,
            }
            const response1 = yield apiCall_customheader(URL.match_profile_view_url, 'POST', payload, payload.Authorization);
            if (response1?.profile){
                arr.push(response1);
            }
        };
        if (data.length===arr.length){
            console.log("sucess!?!?!?!")
            yield put({ type: actions.CONFIRMED_USERS_SUCCESS, response:arr});
        }
        else{
            yield put({type: actions.CONFIRMED_USERS_FAILURE, error: response1?.mesage});
        }
    } catch (e) {
        yield put({type: actions.CONFIRMED_USERS_FAILURE, payload: e.message });
    }
}


export const confirmedUsersSaga = [
    takeLatest(actions.CONFIRMED_USERS_REQUEST, ConfirmedUsers),
    takeLatest(actions.CONFIRMED_USER_PROFILE_DATA, Confirmed_User_Profile),
]