import * as actions from './actionTypes';

export const accountDeactivateRequest = (data) => {
    // console.log('actions-acc-request>>>>>', data);
      return {
      type: actions.ACCOUNT_DEACTIVATE_REQUEST,
      payload: {
            data: data,
            apiStatus: 'request'
      }
      }
  }
  
  export const accountDeactivateSuccess = (data) => {
        // console.log('actions-acc-success>>', data);
        return {
          type: actions.ACCOUNT_DEACTIVATE_SUCCESS,
          payload: {
          data: data,
            apiStatus: 'success'
          }
        }
      }
      
  export const accountDeactivateFailure = (data) => {
      // console.log('actions-acc-failure>>', data);
      return {
      type: actions.ACCOUNT_DEACTIVATE_ERROR,
      payload: {
          data: data,
          apiStatus: 'error'
      }
      }
  }