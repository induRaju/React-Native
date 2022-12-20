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

export function* HomeListingUser(action){
    // console.log('action-saga>>>', action);
    try {
        const payload = {
            ...action.payload,
        }
        

        const response = yield apiCall_customheader(URL.prospects_match_url, 'POST', payload,payload.Authorization);


        if(response?.prospect_listing_ids) {
            // console.log('response:for listing ', response)
            const pageSize = Math.min((response.prospect_listing_ids.length),5);

            const arr = response.prospect_listing_ids.slice(0, pageSize);
            payload['prospect_listing_ids']=arr
            yield put({ type: actions.HOME_LISTING_USERS, response: response,payload});
        } else {
            // console.log("ififififififi")
            yield put({type: actions.HOME_LISTING_FAILURE, error: response?.mesage });
        }
    } catch (e) {
        console.log("lilililililili")
        yield put({type: actions.HOME_LISTING_FAILURE, payload: e.message });
    }
}



export function* UserListingData(action){
    //console.log('action-saga1>>>', action);
    try {
        const tot_listing_data = []
        let lid = '';
        let j;

        const arrl=action.payload?.prospect_listing_ids;
        console.log("hellllllllll", arrl)
        for(j=0; j < (arrl.length); j++){
            //console.log('iiiiiiiii',arr[i])
            lid = arrl[j]
            // console.log('response4444444 ', uid)
            const payload = {
                ...action.payload,
                listing_id: lid,
                Authorization:action.payload.Authorization
            }
   
            const response3 = yield apiCall_customheader(URL.rental_list_view_url, 'POST', payload,payload.Authorization);
            
            //console.log('response:lat ', response1);
            //console.log('response:12 ', response1.profile);
            
    
            if(response3?.listing) {
                // console.log('success',j)
                
                tot_listing_data.push(response3);
                console.log('success',tot_listing_data)
                
            } else {
                console.log("Should not come here");
            }
        }
        // JSON.stringify(tot_listing_data)
        if ((tot_listing_data.length===arrl.length)){
            console.log('sdfdsfsdfsdfdsfds',tot_listing_data)
            
            // JSON.stringify(tot_data)
            yield put({type: actions.HOME_LISTING_SUCCESS, response:[tot_listing_data,arrl.length] }) 
            // tot_listing_data.length = 0;
        }
        else{
            console.log("son't come here")
            yield put({type: actions.HOME_LISTING_FAILURE, payload: e.message });
        }

    } catch (e) {
        console.log('ffffffffffff')
        // console.log('ffffffffffff',e)
        // yield put({type: actions.HOME_FAILURE, payload: e.message });
    }
}




export const HomeListingSaga = [

    takeLatest(actions.HOMELISTINGSCREEN_DATA, HomeListingUser),

  
    
    takeLatest(actions.HOME_LISTING_USERS, UserListingData),

]