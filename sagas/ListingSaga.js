import { put, takeLatest, all ,select} from 'redux-saga/effects';
import { apiCall, apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

export function* listing(action){
    //console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        //console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.profile_view_url, 'POST', payload, Authorization);
        
        console.log('response:11 ', response);

        if(response?.listings) {
            console.log("sucess!?!?!?!")
            
            let narr=[];
            let nnarr=[];
            // var index=-1;
            //     for(var i=0;i<del1?.length;i++)
            //    {
              
            //     console.log("array33")
            //     for(var j=0;j<response.listings.length;j++)
            //    { console.log("index",index)
            //      index=j;
            //      if(response.listings[j].listing.id===del1[i])
            //     if (index !== -1) {   
            //         console.log("indexfound",index)  
            //     response.listings.splice(index, 1);
            //     }
            //    }
            // }
            for (var i=0; i<response.listings.length; i++){
                if(response.listings[i].listing?.is_available){
                    narr.push({"listing":response.listings[i].listing,"media":response.listings[i].media});
                }
                else{
                    nnarr.push({"listing":response.listings[i].listing,"media":response.listings[i].media});
                }
            }
            console.log(narr)
            yield put({ type: actions.LISTING_SUCCESS, response:{"current":narr,"previous":nnarr}});
        } else {
            yield put({type: actions.LISTING_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.LISTING_FAILURE, payload: e.message });
    }
}
export function* Listing_likes(action){
    console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        console.log("payload ",payload);
        const Authorization = payload.Authorization;
        console.log("authorization ",Authorization);
        const response = yield apiCall_customheader(URL.rental_listing_likes_url, 'POST', payload, Authorization);
        
        console.log('response:11likes ', response);

        if(response?.likes) {
            if (response.likes.length>0){
                payload['likes']=response.likes;
                yield put({type: actions.GET_PROFILE_DATA, response:response, payload})
            }
            else{
                yield put({ type: actions.LISTING_LIKE_SUCCESS, response:response.likes});
            }
            
        } else {
            yield put({type: actions.LISTING_LIKE_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        yield put({type: actions.LISTING_LIKE_FAILURE, payload: e.message });
    }
}

export function* Get_Profile(action){
    try{
        const data=action.payload?.likes;
        let arr=[];
        const Authorization=action.payload?.Authorization;
        const response1 = yield apiCall_customheader(URL.chat_list_url, 'POST', {}, Authorization);
        //console.log("------------------------------------------------------response1",response1);
        if(response1?.chats){
            const chatlist=response1.chats;
            for(let i=0; i<chatlist.length; i++){
                for(let j=0; j<data.length; j++){
                    if(data[j].user_id==chatlist[i].user_id){
                        const confirmed_flag = yield apiCall_customheader(URL.available, 'POST', {"user_id":data[j].user_id}, Authorization);
                        if(confirmed_flag?.is_available === true || confirmed_flag?.is_available === false){
                            console.log("--------------------------------------------",confirmed_flag)
                            if(!confirmed_flag.is_available){
                                console.log("hi");
                                arr.push({"image":chatlist[i].profile_picture,"name":chatlist[i].name,"user_id":chatlist[i].user_id});
                            }
                        }
                    }
                }
            }
        }
        if (arr.length>=0){
            console.log("sucess!?!?!?!")
            yield put({ type: actions.LISTING_LIKE_SUCCESS, response:arr});
        }
        else{
            yield put({type: actions.LISTING_LIKE_FAILURE, error: response1?.mesage});
        }
    } catch (e) {
        yield put({type: actions.LISTING_LIKE_FAILURE, payload: e.message });
    }
}

export function* Add_Tenants(action){
    console.log('action-saga>>>', action);
    try {
        const new_arr=action.payload.arr;
        const Authorization = action.payload.Authorization;
        for(let i=0; i<new_arr.length;i++){
            const payload={
                Authorization:Authorization,
                user_id:new_arr[i]
            }
            const response = yield apiCall_customheader(URL.users_liked_url, 'POST', payload, Authorization);
            console.log('response:1 for match like', response);
            if(response?.message==='success') {
                console.log("sucess!?!?!?!")
                const response1 = yield apiCall_customheader(URL.confirm_roommate, 'POST', payload, Authorization);
                console.log('response:2 for confirm match', response1);

                if(response1?.message==='success'){
                    yield put({ type: actions.ADD_TENANATS_SUCCESS, response:response?.likes});
                }
                else{
                    yield put({type: actions.ADD_TENANATS_FAILURE, error: response1?.mesage });   
                }
            } else {
                yield put({type: actions.ADD_TENANATS_FAILURE, error: response?.mesage });
            }
        }
    } catch (e) {
        yield put({type: actions.ADD_TENANATS_FAILURE, payload: e?.message });
    }
}
export const listingSaga = [
    takeLatest(actions.LISTING_REQUEST, listing),
    takeLatest(actions.LISTING_LIKE_REQUEST, Listing_likes),
    takeLatest(actions.GET_PROFILE_DATA, Get_Profile),
    takeLatest(actions.ADD_TENANATS_REQUEST, Add_Tenants),
]