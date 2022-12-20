import * as actions from './actionTypes';

export const ViewListingRequest = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.VIEWLISTING_REQUEST,
    payload: {
        Authorization:data.Authorization,
        listing_id: data.listing_id,
    }
  }
}

export const ViewListingSuccess = (data) => {
  return {
    type: actions.VIEWLISTING_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const ViewListingFailure = (data) => {
  return {
    type: actions.VIEWLISTING_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}