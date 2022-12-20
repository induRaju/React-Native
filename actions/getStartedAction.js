import * as actions from './actionTypes';

export const getStarted = (data) => {
  console.log('actions-data>>', data);
  return {
    type: actions.GETSTARTED_REQUEST,
    payload: {
        name:data.name,
        dob: data.dob,
        gender: data.gender
    }
  }
}