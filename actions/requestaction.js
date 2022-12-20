import * as actions from './actionTypes';

export const PendingRequestid = (data) => {
  console.log('pending request>>', data);
  return {
    type: actions.PENDING_REQUEST_ID,
    payload: {
        Authorization:data
  }
}
}

export const PendingRequestIdSuccess= (data) => {
    console.log('requestsuccess>>', data);
    return {
      type: actions.PENDING_REQUEST_ID_SUCCESS,
      payload: {
          data:data.requests,
  
      }
    }
  }
  export const PendingRequestIdFailue= (data) => {
    console.log('requestsuccess>>', data);
    return {
      type: actions.PENDING_REQUEST_ID_FAILURE,
      payload: {
          data:data.error,
  
      }
    }
  }


  export const RequestserdetailsSuccess= (data) => {
    console.log('userdetailssuccess>>', data);
    return {
      type: actions.REQUEST_USER_DETAILS_SUCCESS,
      payload: {
          data:data.profile,
  
      }
    }
  }
 
  export const Requestserdetailsfailure= (data) => {
    console.log('userdetailssuccess>>', data);
    return {
      type: actions. REQUEST_USER_DETAILS_FAILURE ,
      payload: {
          data:data.profile,
  
      }
    }

  }


  export const Requestsentid = (data) => {
    console.log('request sent>>', data);
    return {
      type: actions.REQUEST_SENT_ID,
      payload: {
          Authorization:data
    }
  }
  }
  export const Requestsentidsuccess = (data) => {
    console.log('request sent>>', data);
    return {
      type: actions.REQUEST_SENT_ID_SUCCESS,
      payload: {
          data:data.requests
    }
  }
  }
  export const Requestsentidfailure = (data) => {
    console.log('request sent>>', data);
    return {
    type: actions.REQUEST_SENT_ID_FAILURE,
      payload: {
          data:data.requests
    }
  }
  }
  
  export const Requserdetailssuccess = (data) => {
    console.log('request sent>>', data);
    return {
    type: actions.REQ_USER_DETAILS_SUCCESS,
      payload: {
          data:data.profile
    }
  }
  }
  export const Requserdetailsfailure= (data) => {
    console.log('request sent>>', data);
    return {
    type: actions.REQ_USER_DETAILS_FAILURE,
      payload: {
          data:data.profile
    }
  }
  }
 
  export const Requestlistingid = (data) => {
    console.log('request lsiting>>', data);
    return {
      type: actions.REQUEST_LISTING_ID,
      payload: {
          Authorization:data
    }
  }
  }

  export const Requestlistingidfailure = (data) => {
    console.log('request sent>>', data);
    return {
    type: actions.REQUEST_LIST_ID_FAILURE,
      payload: {
          data:data.requests
    }
  }
  }
  export const Requestlistidsuccess = (data) => {
    console.log('request sent>>', data);
    return {
      type: actions.REQUEST_LIST_ID_SUCCESS,
      payload: {
          data:data.requests
    }
  }
  }
  export const Reqlistdetailssuccess = (data) => {
    console.log('request sent>>', data);
    return {
    type: actions.REQ_LIST_DETAILS_SUCCESS,
      payload: {
          data:data.profile
    }
  }
}
 export const clearstate =()=>
 {
  return {
    type: actions.CLEAR_STATE
 }
}

export const Reqlistdetailsfailure = (data) => {
  console.log('request sent>>', data);
  return {
  type: actions.REQ_LIST_DETAILS_FAILURE,
    payload: {
        data:data.profile
  }
}
}
  export const accept_request = (data) => {
    console.log('accept>', data);
    return {
    type: actions.ACCEPT_REQUEST,
      payload: {
          Authorization:data.Authorization,
          user_id:data.user_id

    }
  }

  }
  export const rejectrequest = (data) => {
    console.log('reject>', data);
    return {
    type: actions.REJECT_REQUEST,
      payload: {
          Authorization:data.Authorization,
          user_id:data.user_id

    }
  }
}
  export const like_listing = (data) => {
    console.log('listing1>', data);
    return {
    type: actions.LIKE_LIST,
      payload: {
          Authorization:data.Authorization,
          listing_id:data.listing_id

    }
  }

  }
