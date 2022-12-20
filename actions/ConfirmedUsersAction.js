import * as actions from './actionTypes';

export const ConfirmedUsersRequest = (data) => {
    console.log('actions-data>>', data);
    return {
      type: actions.CONFIRMED_USERS_REQUEST,
      payload: {
          Authorization:data.Authorization,
      }
    }
  }
  
  export const ConfirmedUsersSuccess = (data) => {
    //console.log('actions-data-success>>', data);
    return {
      type: actions.CONFIRMED_USERS_SUCCESS,
      payload: {
        data: data,
        apiStatus: 'success'
      }
    }
  }
  
  export const ConfirmedUsersFailure = (data) => {
    return {
      type: actions.CONFIRMED_USERS_FAILURE,
      payload: {
        data: data,
        apiStatus: 'error'
      }
    }
  }
  export const ConfirmedUsersProfileData = (data) =>{
    return{
      type: actions.CONFIRMED_USER_PROFILE_DATA,
      payload:{
      }
    }
  }