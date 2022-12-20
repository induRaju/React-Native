// Forget password action function to connect to reducer or saga

import * as actions from './actionTypes';

export const forgetpwdRequest = (data) => {
  // console.log('actions-data>>', data);
  return {
    type: actions.FORGET_REQUEST,
    payload: {
      email: data.email,
    }
  }
}

export const forgetpwdSuccess = (data) => {
  // console.log('actions-data-success>>', data);
  return {
    type: actions.FORGET_PWD_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const forgetpwdFailure = (data) => {
  return {
    type: actions.FORGET_PWD_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}

export const forgetpwdClearState = (data) => {
  return {
    type: actions.FORGET_CLR_RESPONSE,
    payload: {
      data: data
    }
  }
}

export const forgetpwdCall = (data) => {
  return {
    type: actions.FORGET_PWD_CALL,
    payload: {
      data: data
    }
  }
}