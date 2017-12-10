import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusAction";
import accountApi from '../api/mockAccountApi';

export function authenticateStart() {
  return { type: types.AUTHENTICATE_START };
}
export function authenticateSuccess(auth) {
  return { type: types.AUTHENTICATE_SUCCESS, auth };
}
export function authenticateError() {
  return { type: types.AUTHENTICATE_ERROR };
}
export function logOut() {
  return { type: types.LOG_OUT };
}
export function setRedirectUrl(url) {
  return { type: types.SET_REDIRECT_URL, url };
}
export function registerUserSuccess(user) {
  return {type: types.REGISTER_USER_SUCCESS, user };
}
export function registerUserError() {
  return {type: types.REGISTER_USER_ERROR };
}

export function authenticate(account) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return accountApi.login(account).then(res => {
      if(res) {
        dispatch(authenticateSuccess({
          token: 'Basic ' + btoa(`${account.username}:${account.password}`),
          name: account.username
        }));
      } else {
        dispatch(authenticateError());
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function register(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return accountApi.register(user).then(res => {
      if(res) {
        dispatch(registerUserSuccess({
          username: user.username,
          email: user.email
        }));
      } else {
        dispatch(registerUserError());
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
