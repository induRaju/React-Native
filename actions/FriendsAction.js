import * as actions from './actionTypes';

export const getFriendsList = (data) => {
  console.log('Friendds-data>>', data);
  return {
    type: actions.GET_FRIENDS_LIST,
    payload: {
      authorization:data.Authorization,
    }
  }
}
