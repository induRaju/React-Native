import * as actions from './actionTypes';

export const getModalUserProfile = (data) => {
    // console.log('actions-data>>get profile', data);
    return {
      type: actions.PROFILE_MODAL_VIEW,
      payload: {
          data: data,
      }
    }
}

export const getModalUserProfileSuccess = (data) => {
    // console.log('actions-data-success>>profile success', data);
    return {
      type: actions.PROFILE_MODAL_VIEW_SUCCESS,
      payload: {
        data: data?.response,
        apiStatus: 'success'
      }
    }
  }
  
export const getModalUserProfileFailure = (data) => {
  // console.log('actions-data-failure>>profile failure', data);
  return {
  type: actions.PROFILE_MODAL_VIEW_FAILURE,
  payload: {
      data: data,
      apiStatus: 'error'
  }
  }
}

export const getModalListProfile = (data) => {
  // console.log('actions-data>>get profile', data);
  return {
    type: actions.PROFILE_MODAL_LIST_VIEW,
    payload: {
        data: data,
    }
  }
}

export const getModalListProfileSuccess = (data) => {
  // console.log('actions-data-success>>profile success', data);
  return {
    type: actions.PROFILE_MODAL_LIST_VIEW_SUCCESS,
    payload: {
      data: data?.response,
      apiStatus: 'success'
    }
  }
}

export const getModalListProfileFailure = (data) => {
// console.log('actions-data-failure>>profile failure', data);
return {
type: actions.PROFILE_MODAL_LIST_VIEW_FAILURE,
payload: {
    data: data,
    apiStatus: 'error'
}
}
}