import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* View_Listing(action){
    //console.log('kjaction-saga>>>', action);
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

export function* Update_Listing(action){
    //console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        console.log("update payload --------- ",payload);
        const response = yield apiCall_customheader(URL.rental_list_update_url, 'POST', payload, Authorization);
        
        console.log('response:11 ', response);

        if(response?.message === 'success') {
            console.log("sucess!?!?!?!")
            yield put({ type: actions.UPDATELISTING_SUCCESS, response});
        } else {
            yield put({type: actions.UPDATELISTING_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.UPDATELISTING_FAILURE, payload: response?.message });
    }
}
export function* listingsMediaUpdate(action){
    //console.log('action-saga>>>media update', action);
    try {
        const { data } = action?.payload;
        const arr = data.img;
        const Authorization = action?.payload?.data?.Authorization;
        let total=0;
        for(let i=0; i<arr.length; i++){
            const payload = {
            img: arr[i],
            listing_id:data?.listing_id
            }
            //console.log('resquest media>>>', payload)
            const response = yield apiCall_customheader(URL.listing_add_media_url, 'POST', payload, Authorization);
            //console.log('response>>media', response,arr[i],response?.message === 'success');
            if(response?.message === 'success') {
                total=total+1;
                console.log("successkj",total)
            }
        }
        if(total==arr.length){
            console.log("kjsuccess")
            yield put({ type: actions.LISTINGS_MEDIA_SUCCESS, response: 'success'});
        } else {
            yield put({type: actions.LISTINGS_MEDIA_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.LISTINGS_MEDIA_FAILURE, error: 'error' });
    }
}

export function* listingsMediaDelete(action){ 
    //console.log('action-saga>>>media delete', action);
    try {
        const { data } = action?.payload;
        const arr=data?.media_id;
        let total=0;
        const Authorization = action?.payload?.data?.Authorization;
        for(let i=0; i<arr.length; i++){
            const payload = {
            media_id: arr[i],
            listing_id:data?.listing_id
            }
            //console.log('resquest media delete>>>', payload)
            const response = yield apiCall_customheader(URL.delete_media_url, 'POST', payload, Authorization);
            console.log('response>>media delete', response,arr,arr[i],response?.message==='success',arr.length);
            if(response?.message === 'success') {
                total=total+1;
            }
        }
        if(arr.length==total){
            console.log("successdel")
            //yield put({ type: actions.VIEWLISTING_REQUEST, payload});
            yield put({ type: actions.LISTINGS_MEDIA_DELETE_SUCCESS, response: 'success'});
        } else {
            yield put({type: actions.LISTINGS_MEDIA_DELETE_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.LISTINGS_MEDIA_DELETE_FAILURE, error: 'error' });
    }
}


export function* Relist_listing(action)
{
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        const listing_id=payload.listing_id
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.rental_list_view_url, 'POST', payload, Authorization);
        if(response?.listing) {
            let npayload=response.listing;
            npayload["is_available"]=1
            npayload["listing_id"]=payload.listing_id;
            console.log("npayload",npayload);
            const response1 = yield apiCall_customheader(URL.rental_list_update_url, 'POST', npayload, Authorization);
            console.log("newresponse",response1);
            if(response1?.message === 'success') {
                console.log("sucess!?!?!?!")
                yield put({ type: actions.RELIST_SUCCESS, response:'success'});
            }
            else{
                yield put({type: actions.RELIST_FAILURE, error: 'error' });
            }
        }
        else{
            yield put({type: actions.RELIST_FAILURE, error: 'error' });
        }
    } catch (e) {
        yield put({type: actions.RELIST_FAILURE, error: 'error' });
    }
}

export const updateListingSaga = [
    takeLatest(actions.VIEWLISTING_REQUEST, View_Listing),
    takeLatest(actions.LISTINGS_MEDIA_UPDATE, listingsMediaUpdate),
    takeLatest(actions.LISTINGS_MEDIA_DELETE, listingsMediaDelete),
    takeLatest(actions.UPDATELISTING_REQUEST, Update_Listing),
    takeLatest(actions.RELIST_REQUEST, Relist_listing),
]