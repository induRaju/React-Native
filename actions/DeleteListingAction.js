import * as actions from './actionTypes';

export const DeleteListingRequest = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.DELETELISTING_REQUEST,
    payload: {
        Authorization:data.Authorization,
        listing_id: data.listing_id,
    }
  }
}

export const DeleteListingSuccess = (data) => {
  return {
    type: actions.DELETELISTING_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const DeleteListingFailure = (data) => {
  return {
    type: actions.DELETELISTING_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}