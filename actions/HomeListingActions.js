// Login action function to connect to reducer or saga

import * as actions from './actionTypes';

export const goalrequest = (data) => {
  console.log('home-data>>', data);
  return {
    type: actions.GOAL_REQUEST,
    payload: {
      Authorization:data.Authorization,
    }
  }
}

export const goalSuccess = (data) => {
  console.log('actions-data-success>>', data);
  return {
    type: actions.GOAL_SUCCESS,
    payload: {
      data: data,

      Authorization:data.Authorization,
      // fin_list: data.fin_list,
      apiStatus: 'success'
    }
  }
}

export const goalFailure = (data) => {
  return {
    type: actions.GOAL_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}

export const homelistingscreendata = (data) => {
  console.log('home-data>>', data);
  return {
    type: actions.HOMELISTINGSCREEN_DATA,
    payload: {
      Authorization:data.Authorization,
    }
  }
}



export const homelistingSuccess = (data) => {
  console.log('actions-data-success>>', data);
  return {
    type: actions.HOME_LISTING_SUCCESS,
    payload: {
      data: data,
      user_id:data.user_id,
      Authorization:data.Authorization,
      apiStatus: 'success'
    }
  }
}
export const homeListingUsers = (data) => {
  console.log('actions-data-success11111>>', data);
  return {
    type: actions.HOME_LISTING_USERS,
    payload: {
      Authorization:data.Authorization,
      prospect_listing_ids:data.prospect_listing_ids
      // apiStatus: 'success'
    }
  }
}

export const homeListingFailure = (data) => {
  return {
    type: actions.HOME_LISTING_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}

