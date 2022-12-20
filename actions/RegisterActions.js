import * as actions from './actionTypes';

export const RegisterRequest = (data) => {
//   console.log('actions-data>>', data);
  return {
    type: actions.REGISTER_REQUEST,
    payload: {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    }
  }
}