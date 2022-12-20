import * as actions from './actionTypes';

export const ListingRequest = (data) => {
  //console.log('actions-data>>', data);
  return {
    type: actions.LISTING_REQUEST,
    payload: {
        Authorization:data.Authorization,
    }
  }
}

export const ListingSuccess = (data) => {
  //console.log('actions-data-success>>', data);
  return {
    type: actions.LISTING_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const ListingFailure = (data) => {
  return {
    type: actions.LISTING_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}

export const ListingLikeRequest = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.LISTING_LIKE_REQUEST,
    payload: {
        Authorization:data.Authorization,
        listing_id:data.listing_id
    }
  }
}

export const ListingLikeSuccess = (data) => {
  //console.log('actions-data-success>>', data);
  return {
    type: actions.LISTING_LIKE_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const ListingLikeFailure = (data) => {
  return {
    type: actions.LISTING_LIKE_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}

export const EditListingRequest = (data) => {
  console.log("kdshfgksdgfksdgf action")

  return{
    type: actions.EDITLISTING_REQUEST,
    payload:{
      listing_id:data.listing_id,
    }
  }
}

export const addTenantsRequest = (data) => {
  return{
    type:actions.ADD_TENANATS_REQUEST,
    payload:{
      Authorization:data.Authorization,
      arr:data.arr,
    }
  }
}

export const addTenantsSuccess = (data) => {
  return{
    type:actions.ADD_TENANATS_SUCCESS,
    payload:{
      data: data,
      apiStatus: 'success'
    }
  }
}
export const addTenantsFailure= (data) => {
  return{
    type:actions.ADD_TENANATS_FAILURE,
    payload:{
      data: data,
      apiStatus: 'error'
    }
  }
}
export const getProfileData= (data) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",data);
  return{
    type:actions.GET_PROFILE_DATA,
    payload:{
      Authorization:data.Authorization,
      likes:data.likes
    }
  }
}

export const roommateProfile = (data) => {
  return{
    type:actions.GET_ROOMMATE_PROFILE,
    payload:{
      Authorization:data.Authorization,
    }
  }
}

export const roommateProfileSuccess = (data) => {
  return{
    type:actions.GET_ROOMMATE_PROFILE_SUCCESS,
    payload:{
      data: data,
      apiStatus: 'success'
    }
  }
}
export const roommateProfileFailure= (data) => {
  return{
    type:actions.GET_ROOMMATE_PROFILE_ERROR,
    payload:{
      data: data,
      apiStatus: 'error'
    }
  }
}
export const RelistRequest = (data) => {
  //console.log('actions-data>>', data);
  return {
    type: actions.RELIST_REQUEST,
    payload: {
        Authorization:data.Authorization,
        listing_id:data.listing_id,
    }
  }
}

export const RelistSuccess = (data) => {
  //console.log('actions-data-success>>', data);
  return {
    type: actions.RELIST_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const RelistFailure = (data) => {
  return {
    type: actions.RELIST_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}