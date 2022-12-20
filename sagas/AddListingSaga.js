import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* Add_Listing(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ------------------------------------------------------------------------------------------------------------------------",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response_confirmed = yield apiCall_customheader(URL.users_confirmed, 'POST', payload, Authorization);
        console.log("kjnewresponse",response_confirmed);
        if(response_confirmed?.user_ids){
            let val=0;
            const arr=response_confirmed.user_ids;
            for (let i=0; i<arr.length; i++){
                payload['user_id']=arr[i];
                const response_unconfirmed = yield apiCall_customheader(URL.unconfirm_roommate, 'POST', payload, Authorization);
                if (response_unconfirmed.message=="success"){
                    val++;
                }
                console.log(response_unconfirmed);
            }
            if(val==arr.length){
                const response = yield apiCall_customheader(URL.add_listing_url, 'POST', payload, Authorization);
                console.log('response:11 ', response);

                if(response?.message === 'success') {
                    console.log("sucess!?!?!?!")
                    yield put({ type: actions.ADDLISTING_SUCCESS, response});
                } else {
                    yield put({type: actions.ADDLISTING_FAILURE, error: response?.mesage });
                }
            }else {
                yield put({type: actions.ADDLISTING_FAILURE, error: "page not loaded correctly" });
            }
        }else {
            yield put({type: actions.ADDLISTING_FAILURE, error: response_confirmed?.mesage });
        }

    } catch (e) {
        yield put({type: actions.ADDLISTING_FAILURE, payload: e.message });
    }
}

export const addListingSaga = [
    takeLatest(actions.ADDLISTING_REQUEST, Add_Listing),
]