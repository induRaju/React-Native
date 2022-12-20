import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall,apiCall_customheader,apiCall_customheaderpas } from './apiCall';
import * as actions from '../actions/actionTypes';
import { homeSuccess } from '../actions/HomeActions';
import * as URL from './Config_URL';

export function* HomeGoal(action){
    try{
        const response = yield apiCall_customheader(URL.get_goal_url, 'POST', {},action.payload.Authorization);
        console.log("goalresponse",response);
        if (response?.goal){
            yield put({type: actions.GOAL_SUCCESS, response:response.goal.goal_id });
        }
        else{
            yield put({type: actions.GOAL_FAILURE, error: response?.mesage });
        }
    }
    catch (e) {
        console.log("lilililililili",e)
        yield put({type: actions.GOAL_FAILURE, error: response?.mesage });
    }
}

export function* HomeUser(action){
    // console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        

        const response = yield apiCall_customheader(URL.prospects_match_url, 'POST', payload,payload.Authorization);


        if(response?.prospect_user_ids) {
            console.log('response:for listing ', response)
            const pageSize = Math.min((response.prospect_user_ids.length),5);

            const arr = response.prospect_user_ids.slice(0, pageSize);
            payload['prospect_user_ids']=arr
            yield put({ type: actions.HOME_USERS, response: response,payload});
        } else {
            // console.log("ififififififi")
            yield put({type: actions.HOME_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        console.log("lilililililili",e)
        yield put({type: actions.HOME_FAILURE, payload: e.message });
    }
}



export function* UserData(action){
    console.log('action-saga1>>>', action.payload);
    
    try {
        const tot_data = []
        let uid = '';
        let i;
        const arr=action.payload?.prospect_user_ids;
        console.log("Lazy ", arr);
        for(i=0; i < (arr.length); i++){
            //console.log('iiiiiiiii',arr[i])
            uid = arr[i]
            // console.log('response4444444 ', uid)
            const payload = {
                ...action.payload,
                user_id: uid,
                Authorization:action.payload.Authorization
            }
   
            const response1 = yield apiCall_customheader(URL.match_profile_view_url, 'POST', payload,payload.Authorization);
            
            //console.log('response:lat ', response1);
            //console.log('response:12 ', response1.profile);
            
    
            if(response1?.profile) {
                // console.log('success',i)
                
                tot_data.push(response1);
                
                // console.log('success',tot_data)
                
            } else {
                console.log("Should not come here");
            }
        }
        // JSON.stringify(tot_data)
        
        // JSON.stringify(tot_listing_data)
        if ((tot_data.length===arr.length )){
            console.log('sdfdsfsdfsdfdsfds',tot_data)
            
            // JSON.stringify(tot_data)
            yield put({type: actions.HOME_SUCCESS, response:[tot_data,arr.length] }) 
            // tot_data.length = 0;
        }
        else{
            console.log("son't come here")
            yield put({type: actions.HOME_FAILURE, payload: e.message });
        }

    } catch (e) {
        console.log('ffffffffffff')
        // console.log('ffffffffffff',e)
        // yield put({type: actions.HOME_FAILURE, payload: e.message });
    }
}




export const HomeSaga = [

    takeLatest(actions.GOAL_REQUEST,HomeGoal),

    takeLatest(actions.HOMESCREEN_DATA, HomeUser),

  
    
    takeLatest(actions.HOME_USERS, UserData),

]