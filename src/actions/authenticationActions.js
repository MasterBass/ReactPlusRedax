import * as types from './actionTypes';
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusAction";
import accountApi from '../api/accountApi';
import { auth } from '../api/database';

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

export function signOut() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return accountApi.logOut().then(() => {
      dispatch(logOut());
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error.message);
    });
  };
}

export function authenticate(account) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return accountApi.login(account).then(res => {
      if(res) {
        return accountApi.getRole(res.uid).then(u => {
          dispatch(authenticateSuccess({
            name: res.displayName,
            role: u.val().role
          }));
        });
      } else {
        dispatch(authenticateError());
      }
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error.message);
    });
  };
}

export function register(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    const displayName = user.displayName;
    return accountApi.register(user).then(res => {
      if(res) {
        const user = auth.currentUser;
        user.updateProfile({
          displayName: displayName
        });
        return res;
      }
    }).then(res => {
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
      throw(error.message);
    });
  };
}
