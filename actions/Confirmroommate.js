import * as actions from './actionTypes';

export const confirm_roommate = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.CONFIRM_ROOMMATE,
    payload: {
        Authorization:data.Authorization,
        user_id:data.user_id,
        type:data.type
    }
  }
}
export const confirm_tenant = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.CONFIRM_TENANT,
    payload: {
        Authorization:data.Authorization,
        listing_id:data.listing_id
    }
  }
}
export const Load_LISTING = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.LOAD_LISTING,
    payload: {
        Authorization:data.Authorization,
       
    }
  }
}