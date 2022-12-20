import * as actions from './actionTypes';

export const AddListingRequest = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.ADDLISTING_REQUEST,
    payload: {
        Authorization:data.Authorization,
        title:data.title,
        address_for_listing:data.address_for_listing,
        place_id: data.place_id,
        monthly_rent: data.monthly_rent,
        address_lat: data.address_lat,
        address_lng: data.address_lng,
        number_of_bedrooms: data.number_of_bedrooms,
        lease_duration: data.lease_duration,
        about_listing: data.about_listing,
        img_0: data.img_0,
        img_1: data.img_1,
        img_2: data.img_2
    }
  }
}

export const AddListingChange = () =>{
    return {
        type: actions.ADDLISTING_CHANGE,
    }
}

export const AddListingSuccess = (data) => {
  console.log('actions-data-success>>', data);
  return {
    type: actions.ADDLISTING_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const AddListingFailure = (data) => {
  return {
    type: actions.ADDLISTING_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}
