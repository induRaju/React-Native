import * as actions from './actionTypes';

export const registrationRequest = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.REGISTRATION_REQUEST,
    payload: {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        dob: data.dob,
        gender: data.gender,
        current_goal: data.current_goal,
        title: data.title,
        address_for_listing: data.address_for_listing,
        address_place_id: data.address_place_id,
        monthly_rent: data.monthly_rent,
        address_lat: data.address_lat,
        address_lng: data.address_lng,
        number_of_bedrooms: data.number_of_bedrooms,
        lease_duration: data.lease_duration,
        landmark_for_search: data.landmark_for_search,
        monthly_budget: data.monthly_budget,
        search_lat: data.search_lat,
        search_lng: data.search_lng,
        search_radius: data.search_radius
    }
  }
}

export const registrationSuccess = (data) => {
  console.log('actions-data-success>>', data);
  return {
    type: actions.REGISTRATION_SUCCESS,
    payload: {
      data: data,
      apiStatus: 'success'
    }
  }
}

export const registrationFailure = (data) => {
  return {
    type: actions.REGISTRATION_FAILURE,
    payload: {
      data: data,
      apiStatus: 'error'
    }
  }
}

export const registrationAuth = (data) => {
  return {
    type: actions.REGISTRATION_AUTH,
    payload: {
      data: data
    }
  }
}