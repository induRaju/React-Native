import * as actions from './actionTypes';

export const chathistorysuccess = (data) => {
  console.log('chathistory>>', data);
    return {
      type: actions.CHAT_HISTORY_SUCCESS,
      payload: {
          messages:data
      }
    }
  }
  export const sendmessages = (data) => {
    console.log('chathistory>>', data);
    console.log('hellomsg',data.message[0].text)
      return {
        type: actions.SEND_MESSAGES,
        payload: {
           Authorization:data.Authorization,
           from_user_id:data.from_user_id,
           to_user_id:data.to_user_id,
           message:data.message[0].text
        }
      }
    }
    export const sendmessagesuccess = (data) => {
      console.log('sendmessagesuccess>>', data);
        return {
          type: actions.SEND_MESSAGE_SUCCESS,
          payload: {
            messages:data
          }
        }
      }
  
  export const fromuserid = (data) => {
    console.log('fromuserid>>', data);
      return {
        type: actions.FROM_USER_ID,
        payload: {
            profile:data
        }
      }
    }
  
export const senduser = (data) => {
    console.log('touser-data>>', data);
    return {
      type: actions.SEND_USER,
      payload: {
          user_id:data
      }
    }
  }
  export const sentusersuccess = (data) => {
    console.log('touser-data>>', data);
    return {
      type: actions.SENT_USER_SUCCESS,
      payload: {
          profile:data
      }
    }
  }
  export const ChatWithUser = (data) => {
    console.log('touser-data>>', data);
    return {
      type: actions.CHAT_WITH_USER,
      payload:{
        Authorization:data.Authorization,

        user_id:data.user_id     }
      
    }
  }
  export const loginuser = (data) => {
    console.log('chat data1>>', data);
    return {
      type: actions.LOGIN_USER,
      payload: {
          Authorization:data.Authorization,
          user_id:data.user_id
      }
    }
  }
  export const loggedinsuccess  = (data) => {
    console.log('chat data>>', data);
    return {
      type: actions.LOGGED_IN_SUCCESS,
      payload: {
        Authorization:data.Authorization,
          user_id:data.user_id
      
      }
    }
  }
