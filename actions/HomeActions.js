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

export const homescreendata = (data) => {
  console.log('home-data>>', data);
  return {
    type: actions.HOMESCREEN_DATA,
    payload: {
      Authorization:data.Authorization,
      page:data.page
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


export const homeSuccess = (data) => {
  console.log('actions-data-success>>', data);
  return {
    type: actions.HOME_SUCCESS,
    payload: {
      data: data,
      user_id:data.user_id,
      Authorization:data.Authorization,
      // fin_list: data.fin_list,
      apiStatus: 'success'
    }
  }
}
export const homeUsers = (data) => {
  console.log('actions-data-success11111>>', data);
  return {
    type: actions.HOME_USERS,
    payload: {
      Authorization:data.Authorization,
      prospect_user_ids:data.prospect_user_ids
      
      // apiStatus: 'success'
    }
  }
}

export const homeFailure = (data) => {
  return {
    type: actions.HOME_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
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
