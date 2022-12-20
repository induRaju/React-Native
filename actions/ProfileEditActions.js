// profile edit action function to connect to reducer or saga

import * as actions from './actionTypes';

export const ProfileListUpdate = (data) => {
  console.log('actions-data>>>>>update', data);
    return {
    type: actions.PROFILE_LIST_UPDATE,
    payload: {
        data: data,
        apiStatus: 'success'
    }
    }
}

export const ProfileListUpdateSuccess = (data) => {
    //   console.log('actions-data-success>>edit', data);
      return {
        type: actions.PROFILE_LIST_UPDATE_SUCCESS,
        payload: {
        data: data,
          apiStatus: 'success'
        }
      }
    }
    
export const ProfileListUpdateFailure = (data) => {
    console.log('actions-data-failure>>edit', data);
    return {
    type: actions.PROFILE_LIST_UPDATE_FAILURE,
    payload: {
        data: data,
        apiStatus: 'error'
    }
    }
}

export const profileViewRequest = (data) => {
      console.log('actions-data>>edit', data);
      return {
        type: actions.PROFILE_VIEW_REQUEST,
        payload: {
            data: data,
        }
      }
}

export const ProfileViewSuccess = (data) => {
    //   console.log('actions-data-success>>edit', data);
      return {
        type: actions.PROFILE_VIEW_SUCCESS,
        payload: {
            ...state,
          data: data?.profileEditInfo,
        //   apiStatus: 'success'
        }
      }
    }
    
export const ProfileViewFailure = (data) => {
    console.log('actions-data-failure>>edit', data);
    return {
    type: actions.PROFILE_VIEW_FAILURE,
    payload: {
        data: data,
        // apiStatus: 'error'
    }
    }
}
export const ProfileEditUpdateJSON = (data) => {
    console.log('actions-data>>>>>update', data);
      return {
      type: actions.PROFILE_EDIT_JSON,
      payload: {
          data: data,
          apiStatus: 'success'
      }
      }
  }

  export const ProfilePromptUpdate = (data) => {
    console.log('actions-data>>>>>PROMPT', data);
      return {
      type: actions.PROFILE_PROMPT_UPDATE,
      payload: {
          data: data,
          apiStatus: 'success'
      }
      }
  }
  
  export const ProfilePromptUpdateSuccess = (data) => {
        console.log('actions-data-success>>PROMPT', data);
        return {
          type: actions.PROFILE_PROMPT_UPDATE_SUCCESS,
          payload: {
          data: data,
            apiStatus: 'success'
          }
        }
      }
      
  export const ProfilePromptUpdateFailure = (data) => {
      console.log('actions-data-failure>>PROMPT', data);
      return {
      type: actions.PROFILE_PROMPT_UPDATE_FAILURE,
      payload: {
          data: data,
          apiStatus: 'error'
      }
      }
  }

  export const ProfilePromptDelete = (data) => {
    console.log('actions-data>>>>>PROMPT delete', data);
      return {
      type: actions.PROFILE_PROMPT_DELETE,
      payload: {
          data: data,
          apiStatus: 'success'
      }
      }
  }
  
  export const ProfilePromptDeleteSuccess = (data) => {
        console.log('actions-data-success>>PROMPT delete', data);
        return {
          type: actions.PROFILE_PROMPT_DELETE_SUCCESS,
          payload: {
          data: data,
            apiStatus: 'success'
          }
        }
      }
      
  export const ProfilePromptDeleteFailure = (data) => {
      console.log('actions-data-failure>>PROMPT delete', data);
      return {
      type: actions.PROFILE_PROMPT_DELETE_FAILURE,
      payload: {
          data: data,
          apiStatus: 'error'
      }
      }
  }

  export const ProfileMediaUpdate = (data) => {
    console.log('actions-data>>>>>Media', data);
      return {
      type: actions.PROFILE_MEDIA_UPDATE,
      payload: {
          data: data,
          apiStatus: 'success'
      }
      }
  }
  
  export const ProfileMediaSuccess = (data) => {
        console.log('actions-data-success>>Media', data);
        return {
          type: actions.PROFILE_MEDIA_SUCCESS,
          payload: {
          data: data,
            apiStatus: 'success'
          }
        }
      }
      
  export const ProfileMediaFailure = (data) => {
      console.log('actions-data-failure>>Media', data);
      return {
      type: actions.PROFILE_MEDIA_FAILURE,
      payload: {
          data: data,
          apiStatus: 'error'
      }
      }
  }

  export const ProfileMediaDelete = (data) => {
    console.log('actions-data>>>>>Media delete', data);
      return {
      type: actions.PROFILE_MEDIA_DELETE,
      payload: {
          data: data,
          apiStatus: 'success'
      }
      }
  }
  
  export const ProfileMediaDeleteSuccess = (data) => {
        console.log('actions-data-success>>Media delete', data);
        return {
          type: actions.PROFILE_MEDIA_DELETE_SUCCESS,
          payload: {
          data: data,
            apiStatus: 'success'
          }
        }
      }
      
  export const ProfileMediaDeleteFailure = (data) => {
      console.log('actions-data-failure>>Media delete', data);
      return {
      type: actions.PROFILE_MEDIA_DELETE_FAILURE,
      payload: {
          data: data,
          apiStatus: 'error'
      }
      }
  }
