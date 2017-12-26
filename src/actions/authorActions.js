import * as types from './actionTypes';
import authorApi from '../api/authorApi';
import {beginAjaxCall} from "./ajaxStatusAction";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors.val()));
    }).catch(error => {
      throw(error);
    });
  };
}
