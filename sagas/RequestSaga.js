import { put, takeLatest, all } from 'redux-saga/effects';
import { apiCall,apiCall_customheader } from './apiCall';
import * as actions from '../actions/actionTypes';
import * as URL from './Config_URL';

const reqid=[];
const reqsentid=[];
const listingid=[];
export const requseridlist=(state)=>state.sent_request_id
export const sentlistidlist=(state)=>state.sent_listing_id
export function* PendingRequestid(action){
    // console.log('action-saga', action);
    try {
        const payload = {
            ...action.payload,
          
        }
       
         console.log('payload2>>', payload.Authorization);
        const response = yield apiCall_customheader(URL.match_request_url, 'POST',{}, payload.Authorization);
         console.log('response>>', response);
         const responsepayload=
         {
            res:response,
            ...action.payload
         }
        console.log("reqid"+reqid[0]?.length)
        console.log("reqlen"+response?.requests.length)
        if(response?.requests ) {
          //  if(response.requests.length===0)
          //  { if(reqid.length===1)
          //   { reqid.pop();
          //   }
          //   reqid.push(response?.requests)
          //   yield put({ type: actions.PENDING_REQUEST_ID_SUCCESS, responsepayload});
          //  }
          //   if(response.requests.length!=reqid[0]?.length)
          //  { if(reqid.length===1)
          //   { reqid.pop();
          //   } 
            
          //   reqid.push(response?.requests)
          //   yield put({ type: actions.PENDING_REQUEST_ID_SUCCESS, responsepayload});
          //  }
          yield put({ type: actions.PENDING_REQUEST_ID_SUCCESS, responsepayload});
        } 
        else
        {
          yield put({ type: actions.PENDING_REQUEST_ID_FAILURE, responsepayload});
        }
    } catch (e) {
      yield put({ type: actions.PENDING_REQUEST_ID_FAILURE, e});
    }
}
 //const userdetails=[]
export function* PendingRequestIdSuccess(action){
    // console.log('action-saga', action);
    let i=0;
    let uid=''
    const arr=action.responsepayload?.res?.requests
   let  userdetails=[];
    console.log("arr1"+arr)
    try {
        const payload = {
            ...action.responsepayload,
        }

       for(i=0;i<arr.length;i++)
       {
        uid=arr[i].liked_by_user_id
        console.log("uid1"+uid);
         console.log('payloadsuccess>>',payload);
    const response = yield apiCall_customheader(URL.match_profile_view_url, 'POST',{user_id:uid}, payload.Authorization);
    console.log('responsesuccess>>',response);
       
    if(response?.profile)
    {
        userdetails.push(response)
    }
    else
      {
        console.log(err+response)
        alert("couldnt get pending request  details.Please try again later")
      }
    }
    if(userdetails.length===arr.length)
    yield put({ type: actions.REQUEST_USER_DETAILS_SUCCESS, userdetails});
    else
    yield put({type:actions.REQUEST_USER_DETAILS_FAILURE,userdetails})

}catch (e) {
       console.log("reserror")
       yield put({type:actions.REQUEST_USER_DETAILS_FAILURE,e})

    }

}
export function* RequestSentid(action){
    // console.log('action-saga', action);
    try {
        const payload = {
            ...action.payload,
          
        }
       
         console.log('payload3>>', payload.Authorization);
        const response = yield apiCall_customheader(URL.users_liked_matched_url, 'POST',{}, payload.Authorization);
         console.log('response3>>', response);
         const responsepayload=
         {
            res:response,
            ...action.payload
         }
         console.log("requeserid11",requseridlist.length)
        if(response?.user_ids) {
            console.log("hello1")
          //   if(response.user_ids.length===0)
          //   { if(reqsentid.length===1)
          //     {reqsentid.pop();
          //     }
          //     reqsentid.push(response?.user_ids)
          //     yield put({ type: actions.REQUEST_SENT_ID_SUCCESS, responsepayload});
          //   }
           
          //  else if(response.user_ids.length!=reqsentid[0]?.length)
          //   { 
          //     console.log("hello32")
              
          //     if(reqsentid.length===1)
          //     {reqsentid.pop();
          //     }
          //     reqsentid.push(response?.user_ids)
              
          //     yield put({ type: actions.REQUEST_SENT_ID_SUCCESS, responsepayload});
          //   }
          yield put({ type: actions.REQUEST_SENT_ID_SUCCESS, responsepayload});
          
        } 
        else
        {
          console.log("requestsentidbad");
          yield put({type:actions.REQUEST_SENT_ID_FAILURE,responsepayload})
       
        }
       
    } catch (e) {
       console.log("reserror",error);
       yield put({type:actions.REQUEST_SENT_ID_FAILURE,responsepayload})
    }
}
export function* RequestSentidsuccess(action){
    // console.log('action-saga', action);
      // console.log('action-saga', action);
      let i=0;
      let uid=''
      const arr=action.responsepayload?.res?.user_ids
     let  userdetails=[];
      console.log("arr1"+arr)
      try {
          const payload = {
              ...action.responsepayload,
          }
  
         for(i=0;i<arr.length;i++)
         {
          uid=arr[i]
          console.log("uid2"+uid);
           console.log('payloadsuccess4>>',payload);
      const response = yield apiCall_customheader(URL.match_profile_view_url, 'POST',{user_id:uid}, payload.Authorization);
      console.log('responsesuccess4>>',response);
         
      if(response?.profile)
      {
          userdetails.push(response)
      }
      else
        {
          console.log(err+response)
          alert("couldnt get sent request details .Please try again later")
        }
      }
      if(arr.length ===userdetails.length)
      yield put({ type: actions.REQ_USER_DETAILS_SUCCESS, userdetails});
      else
      yield put({ type: actions.REQ_USER_DETAILS_FAILURE, userdetails});

  
  }catch (e) {
         console.log("reserror")
         yield put({ type: actions.REQ_USER_DETAILS_FAILURE, userdetails});
      }
}
export function* Requestlistingid(action){
    // console.log('action-saga', action);
    try {
        const payload = {
            ...action.payload,
          
        }
       
         console.log('payload5>>', payload.Authorization);
        const response = yield apiCall_customheader(URL.list_liked_matched_url, 'POST',{}, payload.Authorization);
         console.log('response5>>', response);
         const responsepayload=
         {
            res:response,
            ...action.payload
         }

        if(response?.listing_ids) {
             console.log("hello1")
            // if(response.listing_ids.length===0)
            // { if(listingid.length===1)
            //   {listingid.pop();
            //   }
            //   listingid.push(response?.listing_ids)
            //   yield put({ type: actions.REQUEST_LIST_ID_SUCCESS, responsepayload});
            // }
            // console.log("requeserid11",sentlistidlist.length)
           
            // if(response.listing_ids.length!=listingid[0]?.length)
            // { console.log("hello5")
            // if(listingid.length===1)
            //   {listingid.pop();
            //   }
            //   listingid.push(response?.listing_ids)
            //   yield put({ type: actions.REQUEST_LIST_ID_SUCCESS, responsepayload});
            // }
            yield put({ type: actions.REQUEST_LIST_ID_SUCCESS, responsepayload});
        } 
        else
        {
          console.log("hello1")
          yield put({ type: actions.REQUEST_LIST_ID_FAILURE, responsepayload});
        }
    } catch (e) {
       console.log("reserror",error)
       yield put({ type: actions.REQUEST_LIST_ID_FAILURE, responsepayload});
    }
}
export function* Requestlistingidsuccess(action){
    // console.log('action-saga', action);
      // console.log('action-saga', action);
      let i=0;
      let uid=''
      const arr=action.responsepayload?.res?.listing_ids
      console.log("hello6"+arr[0])
     let  listingdetails=[];
      console.log("arr1"+arr)
      try {
          const payload = {
              ...action.responsepayload,
          }
  
         for(i=0;i<arr.length;i++)
         {
          uid=arr[i]
          console.log("uid3"+uid);
           console.log('payloadsuccess6>>',payload);
      const response = yield apiCall_customheader(URL.rental_list_view_url, 'POST',{listing_id:uid}, payload.Authorization);
      console.log('responsesuccess6>>',response);
         
      if(response?.listing)
      {
          listingdetails.push(response)
      }
      else
        {
          console.log(err+response)
          alert("couldnt get sent request listing details.Please try again later")
        }
      }
      if(arr.length===listingdetails.length)
     {  yield put({ type: actions.REQ_LIST_DETAILS_SUCCESS, listingdetails});
    }
      else
    {
      yield put({ type: actions.REQ_LIST_DETAILS_FAILURE, listingdetails});
    }

  
  }catch (e) {
         console.log("reserror")
         yield put({ type: actions.REQ_LIST_DETAILS_FAILURE, listingdetails});
      }
}
export function* accept_request(action){
    // console.log('action-saga', action);
      // console.log('action-saga', action);
      let i=0;
      let uid=''
    //  const arr=action.responsepayload?.res?.listing_ids
   //   console.log("hello6"+arr[0])
   //  let  listingdetails=[];
   //   console.log("arr1"+arr)
      try {
          const payload = {
              ...action.payload,
          }
  
          uid=payload.user_id
          console.log("uid4"+uid);
           console.log('payloadsuccess7>>',payload);
      const response = yield apiCall_customheader(URL.users_liked_url, 'POST',{user_id:uid}, payload.Authorization);
      console.log('responsesuccess7>>',response);
         
      
      if(response?.action==='matched')
      {  console.log("payloadauthorization",payload.Authorization)
      const Authorization={
        Authorization:payload.Authorization
      }
      console.log("auth",Authorization.Authorization)
        yield put({ type: actions.PENDING_REQUEST_ID, payload:Authorization});
      }
      
      
      else
        {
          console.log('err'+response)
          alert("couldnt accept request .Please try again later")
        }
        // if(response?.action==='liked')
        // {  console.log("payloadauthorization",payload.Authorization)
        // const Authorization={
        //   Authorization:payload.Authorization
        // }
        // console.log("auth",Authorization.Authorization)
        //   yield put({ type: actions.REQUEST_SENT_ID, payload:Authorization});
        // }
        // else
        //   {
        //     console.log(err+response)
        //   }
      
  
  }catch (e) {
         console.log("reserror2")
      }
}
export function* reject_request(action){
    // console.log('action-saga', action);
      // console.log('action-saga', action);
      let i=0;
      let uid=''
    //  const arr=action.responsepayload?.res?.listing_ids
   //   console.log("hello6"+arr[0])
   //  let  listingdetails=[];
   //   console.log("arr1"+arr)
      try {
          const payload = {
              ...action.payload,
          }
  
          uid=payload.user_id
          console.log("uid5"+uid);
           console.log('payloadsuccess8>>',payload);
      const response = yield apiCall_customheader(URL.users_rejected_url, 'POST',{user_id:uid}, payload.Authorization);
      console.log('responsesuccess8>>',response);
         
      if(response?.action==='rejected')
      {  console.log("payloadauthorization",payload.Authorization)
      const Authorization={
        Authorization:payload.Authorization
      }
      console.log("auth",Authorization.Authorization)
        yield put({ type: actions.PENDING_REQUEST_ID, payload:Authorization});
      }
      else
        {
          console.log(err+response)
          alert("couldnt reject request .Please try again later")
        }
      
      
  
  }catch (e) {
         console.log("reserror")
      }
}
export function* like_list(action){
    // console.log('action-saga', action);
      // console.log('action-saga', action);
      let i=0;
      let uid=''
    //  const arr=action.responsepayload?.res?.listing_ids
   //   console.log("hello6"+arr[0])
   //  let  listingdetails=[];
   //   console.log("arr1"+arr)
      try {
          const payload = {
              ...action.payload,
          }
  
          uid=payload.listing_id
          console.log("uid4"+uid);
           console.log('payloadsuccess7>>',payload);
      const response = yield apiCall_customheader(URL.like_listing_url, 'POST',{listing_id:uid}, payload.Authorization);
      console.log('responsesuccess10>>',response);
         
      
      if(response?.action==='matched')
      {  console.log("payloadauthorization",payload.Authorization)
      const Authorization={
        Authorization:payload.Authorization
      }
      console.log("auth",Authorization.Authorization)
        yield put({ type: actions.PENDING_REQUEST_ID, payload:Authorization});
      }
      
      
      else
        {
          console.log('err'+response)
          alert("couldnt like listing .Please try again later")
        }
        // if(response?.action==='liked')
        // {  console.log("payloadauthorization",payload.Authorization)
        // const Authorization={
        //   Authorization:payload.Authorization
        // }
        // console.log("auth",Authorization.Authorization)
        //   yield put({ type: actions.REQUEST_SENT_ID, payload:Authorization});
        // }
        // else
        //   {
        //     console.log(err+response)
        //   }
      
  
  }catch (e) {
         console.log("reserror2")
      }
}
export const RequestSaga = [
    takeLatest(actions.PENDING_REQUEST_ID,PendingRequestid ),
    takeLatest(actions.PENDING_REQUEST_ID_SUCCESS,PendingRequestIdSuccess),
    takeLatest(actions.REQUEST_SENT_ID,RequestSentid),
    takeLatest(actions.REQUEST_SENT_ID_SUCCESS,RequestSentidsuccess),
    takeLatest(actions.REQUEST_LISTING_ID,Requestlistingid),
    takeLatest(actions.REQUEST_LIST_ID_SUCCESS,Requestlistingidsuccess),
    takeLatest(actions.ACCEPT_REQUEST,accept_request),
    takeLatest(actions.REJECT_REQUEST,reject_request),
    takeLatest(actions.LIKE_LIST,like_list)
]