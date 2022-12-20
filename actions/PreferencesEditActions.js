// profile edit action function to connect to reducer or saga

import * as actions from './actionTypes';

export const PreferenceListUpdate = (data) => {
  console.log('actions-data>>>>>update', data);
    return {
    type: actions.PREFERENCE_LIST_UPDATE,
    payload: {
        data: data,
        apiStatus: 'success'
    }
    }
}

export const PreferenceUpdateSuccess = (data) => {
    //   console.log('actions-data-success>>edit', data);
      return {
        type: actions.PREFERENCE_LIST_UPDATE_SUCCESS,
        payload: {
        data: data,
          apiStatus: 'success'
        }
      }
    }
    
export const PreferenceUpdateFailure = (data) => {
    console.log('actions-data-failure>>edit', data);
    return {
    type: actions.PREFERENCE_LIST_UPDATE_FAILURE,
    payload: {
        data: data,
        apiStatus: 'error'
    }
    }
}

export const preferenceViewRequest = (data) => {
      console.log('actions-data>>edit', data);
      return {
        type: actions.PREFERENCE_VIEW_REQUEST,
        payload: {
            data: data,
        }
      }
}

export const PreferenceViewSuccess = (data) => {
    //   console.log('actions-data-success>>edit', data);
      return {
        type: actions.PREFERENCE_VIEW_SUCCESS,
        payload: {
            ...state,
          data: data?.preferenceEditInfo,
        //   apiStatus: 'success'
        }
      }
    }
    
export const PreferenceViewFailure = (data) => {
    console.log('actions-data-failure>>edit', data);
    return {
    type: actions.PREFERENCE_VIEW_FAILURE,
    payload: {
        data: data,
        // apiStatus: 'error'
    }
    }
}

export const goalChangeRequest = (data)=>{
  return{
    type: actions.GOAL_CHANGE_REQUEST,
    payload:{
      Authorization:data.Authorization,
      goal_id:data.goal_id,
      landmark_for_search:data.landmark_for_search,
      monthly_budget:data.monthly_budget,
      place_id:data.place_id,
      search_lat:data.search_lat,
      search_lng:data.search_lng,
      search_radius:data.search_radius,
    }
  }
}

export const goalChangeSuccess = (data)=>{
  return{
    type:actions.GOAL_CHANGE_SUCCESS,
    payload:{
      data:data,
      apiStatus:'error'
    }
  }
}

export const goalChangeFailure = (data)=>{
  return{
    type:actions.GOAL_CHANGE_FAILURE,
    payload:{
      data:data,
      apiStatus:'success'
    }
  }
}
  