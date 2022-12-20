import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall,apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
//import { sendmessages } from '../actions/ChatWithUserActions';
import * as URL from './Config_URL';

export function* Loggedinuser(action){
    console.log('loggedinuser>>>', action);
    try {
      
        const payload = {
            ...action.payload,
        }
        
        
        const response = yield apiCall_customheader(URL.profile_view_url, 'POST', {},payload.Authorization);
        JSON.stringify(response)

        const response_Payload={
            ...action.payload,
            response:response
        }

        if(response?.profile) {
            // console.log('response:13 ', response)
            yield put({ type: actions.FROM_USER_ID, response: response_Payload});
        } 
        else{
            console.log("error2")
            alert('problem in getting profile info.Please try again later')
        }
    } catch (e) {
         console.log("error")
         alert('problem in getting profile info.Please try again later')
       // yield put({type: actions.HOME_FAILURE, payload: e.message });
    }
}
export function* SenduserDetails(action)
{
    console.log('senduserdetails');
    try{
        const payload={
            ...action.payload


        }  
       // const Authorization={Authorization:action.response.Authorization}
      // const Auth=action.response.Authorization;
       const user_id=payload.user_id
       // const user_id={user_id:action.response.user_id}
        const response = yield apiCall_customheader(URL.match_profile_view_url,'POST',{user_id:user_id},payload.Authorization);
        JSON.stringify(response)
        console.log("res"+response.message)
        if(response?.profile) {
            // console.log('response:13 ', response)
            yield put({ type: actions.SENT_USER_SUCCESS, response: response});
        } 
        
        else{
           alert("issue in getting user information.Please try again later")
        }
        // console.log("response"+action.response.Authorization)
        // console.log("response"+action.response.user_id)

    }
        catch (e) {
            console.log("error")
            alert("issue in getting user information.Please try again later")
          // yield put({type: actions.HOME_FAILURE, payload: e.message });
       }
}

export function* chatwithuser(action)
{
    console.log('chatwithuser');
    try{
        const payload={
            ...action.payload


        }  
       // const Authorization={Authorization:action.response.Authorization}
      
       // const user_id={user_id:action.response.user_id}
        const response = yield apiCall_customheader(URL.get_chat_list_url,'POST',{user_id:payload.user_id},payload.Authorization);
        JSON.stringify(response)
        console.log("res"+response.messages)
        if(response?.messages) {
            // console.log('response:13 ', response)
            yield put({ type: actions.CHAT_HISTORY_SUCCESS, response: response});
        } 
        
        else{
            console.log("error2")
            alert("problem in reteriving the chat data.Please try again later")
        }
        // console.log("response"+action.response.Authorization)
        // console.log("response"+action.response.user_id)

    }
        catch (e) {
            console.log("error"+e)
            alert("problem in reteriving the chat data.Please try again later")
          // yield put({type: actions.HOME_FAILURE, payload: e.message });
       }
}
export function* sendmessages(action)
{
    console.log('sendmessage');
    try{
        const payload={
            ...action.payload


        }  
       // const Authorization={Authorization:action.response.Authorization}
      
       // const user_id={user_id:action.response.user_id}
       console.log("sendmessagebody",payload?.message)
       console.log("fromid"+payload?.from_user_id)
       console.log("toid"+payload?.to_user_id)
       console.log("payloadAuth"+payload?.Authorization)
       const reqbody={
         from_user_id:payload.from_user_id,
         to_user_id:payload.to_user_id,
         message:payload.message
       }
        const response = yield apiCall_customheader(URL.send_chat_url,'POST',reqbody,payload.Authorization);
        JSON.stringify(response)
        console.log("res"+response.message)
        if(response?.message==='success') {
            // console.log('response:13 ', response)
            yield put({ type: actions.SEND_MESSAGE_SUCCESS, response: response});
        } 
        
        else{
            console.log("error2")
            alert ('problem in sending message.Please try again later')
        }
        

    }
        catch (e) {
            console.log("error5")
            alert ('problem in sending message.Please try again later')
          // yield put({type: actions.HOME_FAILURE, payload: e.message });
       }
}

    export const IndividualChatSaga = [
        takeLatest(actions.LOGIN_USER,Loggedinuser ),
        takeLatest(actions.LOGGED_IN_SUCCESS,SenduserDetails),
        takeLatest(actions.CHAT_WITH_USER,chatwithuser),
        takeLatest(actions.SEND_MESSAGES,sendmessages)
        
        
    ]
