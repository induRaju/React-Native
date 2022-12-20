// Login action function to connect to reducer or saga

import * as actions from './actionTypes';

export const chatlistdata = (data) => {
  // console.log('chatlistdata-data>>', data);
  return {
    type: actions.CHATLIST_DATA,
    payload: {
      Authorization:data.Authorization
    }
  }
}



export const chatlistSuccess = (data) => {
    // console.log('chatlistdata-data-success>>', data);
    return {
      type: actions.CHATLIST_SUCCESS,
      payload: {
        data: data,
        apiStatus: 'success'
      }
    }
  }
  
  export const chatlisTFailure = (data) => {
    return {
      type: actions.CHATLIST_FAILURE,
      payload: {
        data: data,
        apiStatus: 'error'
      }
    }
  }