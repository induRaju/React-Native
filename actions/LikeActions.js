import * as actions from './actionTypes';

export const Like_User = (data) => {
  return {
    type: actions.LIKE_USER,
    payload: {
      Authorization:data.Authorization,
      user_id:data.user_id
    }
  }
}
export const Like_User_Success = (data) => {
    return {
      type: actions.LIKE_USER_SUCCESS,
      payload: {
        data: data,
        apiStatus: 'success'
      }
    }
  }
export const Like_User_Failure = (data) => {
return {
    type: actions.LIKE_USER_FAILURE,
    payload: {
    data: data,
    apiStatus: 'error'
    }
}
}
export const Dislike_User = (data) => {
    return {
      type: actions.DISLIKE_USER,
      payload: {
        Authorization:data.Authorization,
        user_id:data.user_id
      }
    }
}
export const Dislike_User_Success = (data) => {
    return {
      type: actions.DISLIKE_USER_SUCCESS,
      payload: {
        data: data,
        apiStatus: 'success'
      }
    }
  }
export const Dislike_User_Failure = (data) => {
return {
    type: actions.DISLIKE_USER_FAILURE,
    payload: {
    data: data,
    apiStatus: 'error'
    }
}
}
  