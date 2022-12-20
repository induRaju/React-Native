import { put, takeLatest, all, select } from 'redux-saga/effects';
import { apiCall,apiCall_customheader,apiCall_customheaderpas } from './apiCall';
import * as actions from '../actions/actionTypes';
import { homeSuccess } from '../actions/HomeActions';
import * as URL from './Config_URL';
export const goal1=(state)=>state.home_goal

export function* ChatListData(action){
    // console.log('Chataction-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        
        console.log("Chat list saga payload", payload.Authorization)
        const response = yield apiCall_customheader(URL.chat_list_url, 'POST', {},payload.Authorization);

        console.log('Chat Saga response', response)
        if(response?.chats) {
            console.log("HI!!!!!!!!!!!!!")
            let goal=yield select (goal1)
            console.log("goal!!!!!!!!!!",goal)
            if (goal==3){
                yield put({ type: actions.CHATLIST_SUCCESS, response: response.chats});
            }
            else{
                const response1 = yield apiCall_customheader(URL.users_matched_url, 'POST', {},payload.Authorization);
                const chat = response.chats;
                const friend = response1.user_ids;
                let arr=[]
                for(let i=0; i<chat.length; i++){
                    if(chat[i].goal_id===3){
                        arr.push(chat[i]);
                    }
                    else if(friend.includes(chat[i].user_id)){
                        arr.push(chat[i]);
                    }
                }
                yield put({ type: actions.CHATLIST_SUCCESS, response: arr});
            }
        } else {
            // console.log("ififififififi")
            yield put({type: actions.CHATLIST_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        console.log("lilililililili",e)
        yield put({type: actions.CHATLIST_FAILURE, payload: e.message });
    }
}


export const ChatListSaga = [

    takeLatest(actions.CHATLIST_DATA, ChatListData),

]