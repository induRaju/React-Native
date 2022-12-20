import { put, takeLatest, all,select } from 'redux-saga/effects';
import { apiCall,apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import { Alert } from 'react-native';
import { useAccessibleColors } from 'native-base';
export const bedrooms = (state) => state.noofbedrooms;
export const Authorization=(state) =>state.Authorization
export const goal1=(state)=>state.home_goal
export const  del=(state)=>state.softdelete
import * as URL from './Config_URL';

export function* Loadroommate(action){
    try {
        const payload = {
            ...action.payload,
          
        }
        let goal=yield select (goal1)
       // console.log("Author",Authorization)
        console.log("authorization")
         console.log('payloadconfirm>>', payload.Authorization);
        const response = yield apiCall_customheader(URL.profile_view_url, 'POST',{}, payload.Authorization);
         console.log('responseconfirm>>', response);
         if(response)
         {
        if(goal===1)
        {
        if(response?.listings) {
          
            const responsepayload={
                Authorization:payload.Authorization,
                user_id:payload.user_id,
               response:response?.listings[response?.listings.length-1]?.listing
            }
            
            yield put({ type: actions.LOAD_LISTING_SUCCESS,responsepayload});
           }

         }
        
      
    }

    else{
        alert("problem in loading the response.Please try again later")
    }
    } catch (e) {
        console.log("error")
        alert("Problem in loading listing details.Please try again later")

    }


}
export function* Confirmroommate(action){


    try {
        const payload = {
            ...action.payload,
          
        }
       
         console.log('payloadconfirm>>', payload.Authorization);
        const response = yield apiCall_customheader(URL.profile_view_url, 'POST',{}, payload.Authorization);
         console.log('responseconfirm>>', response);
        
        if(response?.listings) {
           let resultListing = response?.listings;
            let index=0
            for(let i=0; i< response?.listings?.length; i++)
            {
                if(response?.listings[i]?.listing.is_available === 1) {
                   index=i;
                }
            }
            
            const responsepayload={
                Authorization:payload.Authorization,
                user_id:payload.user_id,
               response:response?.listings[index]?.listing,
               type:payload.type
            }
            
            yield put({ type: actions.CONFIRM_ROOMMATE_LOAD_SUCCESS,responsepayload});
           }

        
        
        else
        {  alert("Problem in loading listing details.Please try again later")
         // yield put({ type: actions.CONFIRM_ROOMMATE_LOAD_FAILURE, responsepayload});
          
        }
    } catch (e) {
      //yield put({ type: actions.CONFIRM_ROOMMATE_LOAD_FAILURE, e});
      console.log("error",e)
      alert("Problem in loading listing details.Please try again later")
    }


}

export function* updatelisting(action)
{
  let bed=  yield select(bedrooms)
 // let Authorization= yield select (Authorization)
 let goal=yield select (goal1)
  console.log("bed1",bed)
  console.log("goal1",goal)
  const pay3={
    ...action.responsepayload
  }
  console.log('action-saga>>>', action);
  const Authorization = action.responsepayload.Authorization;
  const user_id=action.responsepayload.user_id;
  
  if(goal===1)

{
 try {
      
            const payload={
                title: action.responsepayload.response.title,
                address_for_listing: action.responsepayload.response.address_for_listing,
                place_id: action.responsepayload.response.place_id,
                monthly_rent: action.responsepayload.response.monthly_rent,
                address_lat:action.responsepayload.response.address_lat,
                address_lng: action.responsepayload.response.address_lng,
                about_listing:action.responsepayload.response.about_listing,
                img_0: "",
                img_1: "",
                img_2: "",
                listing_id:action.responsepayload.response.id,
                number_of_bedrooms:bed,
                lease_duration:action.responsepayload.response.lease_duration
              }
       
        console.log("payload ",payload);
          
        console.log("authorization ",Authorization);
        console.log("update payload --------- ",payload);
        const response = yield apiCall_customheader(URL.rental_list_update_url, 'POST', payload, Authorization);
        
        console.log('response:11 ', response);
        const pay4={
            user_id:user_id,
            Authorization:Authorization
        }
        if(response?.message === 'success') {
            console.log("sucess!?!?!?!")
            if(action.responsepayload.type==="Add")
          {  yield put({type:actions.LISTINGSS_SUCCESS,pay4})
        }
        if(action.responsepayload.type==="Remove") 
        {
            yield put({type:actions.REMOVEROOMMATE,pay4})
        }
            
        } else {
           console.log("failure")
           alert("Problem in updating listing details.Please try again later")

        }

    } catch (e) {
        console.log("failure")
        alert("Problem in updating listing details.Please try again later")
    }

//   if(bed===0)
// {  try{
   
//     const listing_id=action.responsepayload.response.id;

//     const payload={
//         title: action.responsepayload.response.title,
//         address_for_listing: action.responsepayload.response.address_for_listing,
//         place_id: action.responsepayload.response.place_id,
//         monthly_rent: action.responsepayload.response.monthly_rent,
//         address_lat:action.responsepayload.response.address_lat,
//         address_lng: action.responsepayload.response.address_lng,
//         about_listing:action.responsepayload.response.about_listing,
//         img_0: "",
//         img_1: "",
//         img_2: "",
//         listing_id:action.responsepayload.response.id,
//         number_of_bedrooms:bed,
//         lease_duration:action.responsepayload.response.lease_duration
//       }

// console.log("payload ",payload);
  
// console.log("authorization ",Authorization);
// console.log("update payload --------- ",payload);
// const response = yield apiCall_customheader('https://dev.rentalsandfriends.com/api/rental-listings/update', 'POST', payload, Authorization);

// console.log('response:11 ', response);
  
// const pay4={
//     user_id:user_id,
//     Authorization:Authorization
// }
// if(response?.message === 'success') {
//     console.log("sucess!?!?!?!")
//    // yield put({ type: actions.CONFIRM_LISTING_REQUEST, listingid:listing_id});  //soft delete
//     yield put({type:actions.LISTINGSS_SUCCESS,pay4})
    
// } else {
//    console.log("failure")
// }
    
   

// } catch (e) {
//     console.log("failure")
// }

//}
}

}
export function* listingsuccesss(action) //for confirming
{  try{
    let bed=  yield select(bedrooms)
    const payload={
        ...action.pay4
    }
    const pay1={
        authorization:payload.Authorization
    }

    console.log("userid",payload.user_id)
    
const response = yield apiCall_customheader(URL.confirm_roommate, 'POST', {user_id:payload.user_id}, payload.Authorization);
if(response?.message === 'success') {
   if(Number(bed)!==0)
    {alert("You have still have "+bed+" roomates to be found");
}
    else if(Number(bed)===0)
    {alert("Congratulations!! You have found all the roommates.You can now go to listing screen and click on found roommates to delete the listings incase you have confirmed all the roommates")
}
    console.log("sucess!?!?!?!")
    yield put({type:actions.CONFIRM_LIST,payload})
    yield put({type:actions.GET_FRIENDS_LIST,payload:pay1})
   //  yield put({type:actions.UNCONFIRMED_USER,payload})
     

}
else
{
    alert("Error in confirming roommate .Please try again later")
}
}catch(e)
{
    alert("Error in confirming roommate .Please try again later")
}
   
}

export function* confirm_tenant(action)
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
        let goal=yield select (goal1);
        const response = yield apiCall_customheader(URL.rental_list_view_url, 'POST', payload, Authorization);
        if(response?.listing) {
            let npayload=response.listing;
            npayload["is_available"]=0
            npayload["listing_id"]=payload.listing_id;
            console.log("npayload",npayload);
            const response1 = yield apiCall_customheader(URL.rental_list_update_url, 'POST', npayload, Authorization);
            console.log("newresponse",response1);
            if(response1?.message === 'success') {
                console.log("sucess!?!?!?!")
                yield put({ type: actions.CONFIRM_LISTING_REQUEST, listingid:listing_id});
                if(goal===1){
                    alert("Hi!!!Thank you.You have found all the roommates.");
                }
                else if(goal===3){
                    alert("Hi!!!Thank you.You have found tenant.");
                }
            }
            else{
                alert("There is a problem in loading page.")
            }
        }
        else{
            alert("There is a problem in loading page.")
        }
    } catch (e) {
        alert(e.message);
    }
}

export function* removeroommate(action)
{
    try{
        let bed=  yield select(bedrooms)
        const payload={
            ...action.pay4
        }
        const pay1={
            authorization:payload.Authorization
        }
    
        console.log("userid",payload.user_id)
        
    const response = yield apiCall_customheader(URL.unconfirm_roommate, 'POST', {user_id:payload.user_id}, payload.Authorization);
    if(response?.message === 'success') {
        if(Number(bed)!==0)
    {alert("You have still have "+bed+" roomates to be found");
    }
    else if(Number(bed)===0)
    {alert("Congratulations!! You have found all the roommates.You can now go to listing screen and click on found roommates to delete the listings as you have found all the roommates")
}
    
        console.log("sucess!?!?!?!")
        yield put({type:actions.CONFIRM_LIST,payload})
        yield put({type:actions.GET_FRIENDS_LIST,payload:pay1})
    
    
    }
    else
    {
        alert("Error in unconfirming roommate .Please try again later")
    }
    }catch(e)
    {
        alert("Error in unconfirming roommate .Please try again later")
    }   
}

export const ConfirmRoommateSaga = [
    takeLatest(actions.LOAD_LISTING,Loadroommate),
    takeLatest(actions.CONFIRM_ROOMMATE,Confirmroommate ),
    takeLatest(actions.CONFIRM_ROOMMATE_LOAD_SUCCESS,updatelisting),
    takeLatest(actions.CONFIRM_TENANT,confirm_tenant),
    takeLatest(actions.LISTINGSS_SUCCESS,listingsuccesss),
    takeLatest(actions.REMOVEROOMMATE,removeroommate)
]