// Login action function to connect to reducer or saga

import * as actions from './actionTypes';

export const loginRequest = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.LOGIN_REQUEST,
    payload: {
        username: data.username,
        password: data.password
    }
  }
}

export const loginSuccess = (data) => {
  console.log('actions-data-success>>', data);
  return {
    type: actions.LOGIN_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const loginFailure = (data) => {
  return {
    type: actions.LOGIN_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}