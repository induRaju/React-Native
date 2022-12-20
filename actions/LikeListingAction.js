import * as actions from './actionTypes';

export const Like_Listing = (data) => {
  console.log("Like Listing Action Data ..............", data)
  return {
    type: actions.LIKE_LISTING,
    payload: {
      Authorization:data.Authorization,
      listing_id:data.listing_id
    }
  }
}
export const Like_Listing_Success = (data) => {
    return {
      type: actions.LIKE_LISTING_SUCCESS,
      payload: {
        data: data,
        apiStatus: 'success'
      }
    }
  }
export const Like_Listing_Failure = (data) => {
return {
    type: actions.LIKE_LISTING_FAILURE,
    payload: {
    data: data,
    apiStatus: 'error'
    }
}
}
export const Dislike_Listing = (data) => {
    return {
      type: actions.DISLIKE_LISTING,
      payload: {
        Authorization:data.Authorization,
        listing_id:data.listing_id
      }
    }
}
export const Dislike_Listing_Success = (data) => {
    return {
      type: actions.DISLIKE_LISTING_SUCCESS,
      payload: {
        data: data,
        apiStatus: 'success'
      }
    }
  }
export const Dislike_Listing_Failure = (data) => {
return {
    type: actions.DISLIKE_LISTING_FAILURE,
    payload: {
    data: data,
    apiStatus: 'error'
    }
}
}
  